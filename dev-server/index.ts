import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";
import { config } from "dotenv";

config();

const app = express();
const PORT = process.env.SERVER_PORT || 3001;

app.use(cors({ origin: ["http://localhost:5173", "http://localhost:5174", "http://localhost:5175"] }));
app.use(express.json());

// ── Supabase (service role) ──────────────────────────────────────────────────
function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL || "";
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY || process.env.VITE_SUPABASE_ANON_KEY || "";

  if (!url) throw new Error("SUPABASE_URL is not set in environment");
  if (!key) throw new Error("SUPABASE_SERVICE_ROLE_KEY is not set in environment");

  return createClient(url, key);
}

// ── Nodemailer ───────────────────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
  tls: { rejectUnauthorized: false },
});

transporter.verify((err) => {
  if (err) console.error("❌ SMTP:", err.message);
  else console.log("📧 SMTP ready");
});

// ── Auth middleware ──────────────────────────────────────────────────────────
async function requireAdmin(req: express.Request, res: express.Response, next: express.NextFunction) {
  const token = (req.headers["x-admin-token"] || req.query.token) as string;
  if (!token) {
    res.status(401).json({ error: "Unauthorized" });
    return;
  }
  try {
    // Token is base64 encoded "username:password"
    const decoded = Buffer.from(token, "base64").toString("utf-8");
    const [username, password] = decoded.split(":");
    if (!username || !password) throw new Error("Invalid token");

    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("admin_users")
      .select("id")
      .eq("username", username)
      .eq("password", password)
      .single();

    if (error || !data) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }
    next();
  } catch {
    res.status(401).json({ error: "Unauthorized" });
  }
}

// ── Public Routes ────────────────────────────────────────────────────────────

app.get("/api/public/faqs", async (req, res) => {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("faqs")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.get("/api/public/courses", async (req, res) => {
  const supabase = getSupabase();
  const { data, error } = await supabase
    .from("courses")
    .select("*")
    .eq("is_active", true)
    .order("display_order", { ascending: true });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.get("/api/public/settings", async (req, res) => {
  const supabase = getSupabase();
  const { data, error } = await supabase.from("settings").select("*");
  if (error) return res.status(500).json({ error: error.message });
  const settings = (data || []).reduce((acc: any, s: any) => {
    acc[s.key] = s.value;
    return acc;
  }, {});
  res.json(settings);
});

// ── POST /api/send-email (contact form) ─────────────────────────────────────
app.post("/api/send-email", async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    res.status(400).json({ error: "Missing required fields." });
    return;
  }

  console.log("\n─────────────────────────────────────");
  console.log("📩 New enquiry (contact form)");
  console.log(`   Name:    ${name}`);
  console.log(`   Email:   ${email}`);
  console.log(`   Phone:   ${phone || "N/A"}`);
  console.log(`   Message: ${message}`);
  console.log("─────────────────────────────────────");

  // Save to Supabase — only columns that exist in submissions table
  try {
    const supabase = getSupabase();
    const { error } = await supabase.from("submissions").insert({
      name,
      email,
      phone: phone || null,
      message,
      is_read: false,
    });
    if (error) console.error("⚠️  Supabase insert error:", error.message);
    else console.log("✅ Saved to Supabase");
  } catch (e: any) {
    console.error("⚠️  Supabase error:", e.message);
  }

  // Send email
  try {
    const info = await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      replyTo: email,
      subject: `New Enquiry from ${name}`,
      text: `Name: ${name}\nEmail: ${email}\nPhone: ${phone || "N/A"}\nMessage: ${message}`,
      html: `
        <h2 style="color:#2563eb;">New Enquiry — Career Upgrade</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone || "N/A"}</p>
        <p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>
      `,
    });
    console.log(`✅ Email sent: ${info.messageId}`);
    res.status(200).json({ success: true });
  } catch (err: any) {
    console.error("❌ Email failed:", err.message);
    res.status(500).json({ error: "Failed to send email." });
  }
});

// ── POST /api/enquiries (legacy — same as send-email) ────────────────────────
app.post("/api/enquiries", async (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !message) {
    res.status(400).json({ error: "Missing required fields." });
    return;
  }

  try {
    const supabase = getSupabase();
    const { error } = await supabase.from("submissions").insert({
      name, email, phone: phone || null, message, is_read: false,
    });
    if (error) console.error("⚠️  Supabase insert error:", error.message);
  } catch (e: any) {
    console.error("⚠️  Supabase error:", e.message);
  }

  try {
    await transporter.sendMail({
      from: `"${name}" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      replyTo: email,
      subject: `New Enquiry from ${name}`,
      html: `<h2>New Enquiry</h2><p><strong>Name:</strong> ${name}</p><p><strong>Email:</strong> ${email}</p><p><strong>Phone:</strong> ${phone || "N/A"}</p><p><strong>Message:</strong><br/>${message.replace(/\n/g, "<br/>")}</p>`,
    });
    res.status(200).json({ success: true });
  } catch (err: any) {
    res.status(500).json({ error: "Failed to send email." });
  }
});

// ── Admin Routes ──────────────────────────────────────────────────────────────

// Submissions
app.get("/api/admin/submissions", requireAdmin, async (req, res) => {
  const supabase = getSupabase();
  const { data, error } = await supabase.from("submissions").select("*").order("created_at", { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.patch("/api/admin/submissions/:id", requireAdmin, async (req, res) => {
  const supabase = getSupabase();
  const { error } = await supabase.from("submissions").update(req.body).eq("id", req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

app.patch("/api/admin/submissions/:id/read", requireAdmin, async (req, res) => {
  const supabase = getSupabase();
  const { is_read } = req.body;
  const { error } = await supabase.from("submissions").update({ is_read }).eq("id", req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

app.patch("/api/admin/submissions/:id/notes", requireAdmin, async (req, res) => {
  const supabase = getSupabase();
  const { notes } = req.body;
  const { error } = await supabase.from("submissions").update({ notes }).eq("id", req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

app.delete("/api/admin/submissions/:id", requireAdmin, async (req, res) => {
  const supabase = getSupabase();
  const { error } = await supabase.from("submissions").delete().eq("id", req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

app.get("/api/admin/submissions/export", requireAdmin, async (req, res) => {
  const supabase = getSupabase();
  const { data, error } = await supabase.from("submissions").select("*").order("created_at", { ascending: false });
  if (error) return res.status(500).json({ error: error.message });

  const headers = ["ID", "Name", "Email", "Phone", "Address", "Date of Birth", "Course", "Funding Type", "When to Start", "Additional Info", "Message", "Read", "Status", "Notes", "Date"];
  const rows = (data || []).map((s: any) => [
    s.id, s.name, s.email, s.phone || "", s.address || "", s.date_of_birth || "", s.course || "", s.funding_type || "", s.when_to_start || "", `"${(s.additional_info || "").replace(/"/g, '""')}"`,
    `"${(s.message || "").replace(/"/g, '""')}"`,
    s.is_read ? "Yes" : "No", s.status,
    `"${(s.notes || "").replace(/"/g, '""')}"`,
    new Date(s.created_at).toLocaleString("en-GB"),
  ]);

  const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment; filename=submissions.csv");
  res.send(csv);
});

// ── POST /api/apply (Course Application Form) ───────────────────────────────
app.post("/api/apply", async (req, res) => {
  const {
    full_name, email, phone, address, date_of_birth,
    course, funding_type, when_to_start, additional_info,
  } = req.body;

  if (!full_name || !email || !phone || !funding_type) {
    res.status(400).json({ error: "Missing required fields." });
    return;
  }

  // Save to Supabase
  try {
    const supabase = getSupabase();
    const { error } = await supabase.from("applications").insert({
      full_name, email, phone,
      address: address || null,
      date_of_birth: date_of_birth || null,
      course: course || "Dental Nursing - 1 Year",
      funding_type,
      when_to_start: when_to_start || null,
      additional_info: additional_info || null,
      is_read: false,
      status: "New",
    });
    if (error) console.error("⚠️  Supabase insert error:", error.message);
  } catch (e: any) {
    console.error("⚠️  Supabase error:", e.message);
  }

  // Send email
  try {
    await transporter.sendMail({
      from: `"${full_name}" <${process.env.SMTP_USER}>`,
      to: process.env.CONTACT_EMAIL || process.env.SMTP_USER,
      replyTo: email,
      subject: `New Application from ${full_name}`,
      text: `Name: ${full_name}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address || "N/A"}\nDOB: ${date_of_birth || "N/A"}\nCourse: ${course || "N/A"}\nFunding: ${funding_type}\nWhen to Start: ${when_to_start || "N/A"}\nAdditional Info: ${additional_info || "N/A"}`,
      html: `
        <h2 style="color:#2563eb;">New Application — Career Upgrade</h2>
        <p><strong>Name:</strong> ${full_name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Address:</strong> ${address || "N/A"}</p>
        <p><strong>Date of Birth:</strong> ${date_of_birth || "N/A"}</p>
        <p><strong>Course:</strong> ${course || "N/A"}</p>
        <p><strong>Funding Type:</strong> ${funding_type}</p>
        <p><strong>When to Start:</strong> ${when_to_start || "N/A"}</p>
        <p><strong>Additional Info:</strong><br/>${(additional_info || "").replace(/\n/g, "<br/>")}</p>
      `,
    });
    res.status(200).json({ success: true });
  } catch (err: any) {
    console.error("❌ Email failed:", err.message);
    res.status(500).json({ error: "Failed to send email." });
  }
});

// ── Applications Admin Routes ─────────────────────────────────────────────────
app.get("/api/admin/applications", requireAdmin, async (req, res) => {
  const supabase = getSupabase();
  const { data, error } = await supabase.from("applications").select("*").order("created_at", { ascending: false });
  if (error) return res.status(500).json({ error: error.message });
  res.json(data);
});

app.patch("/api/admin/applications/:id", requireAdmin, async (req, res) => {
  const supabase = getSupabase();
  const { error } = await supabase.from("applications").update(req.body).eq("id", req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

app.patch("/api/admin/applications/:id/read", requireAdmin, async (req, res) => {
  const supabase = getSupabase();
  const { is_read } = req.body;
  const { error } = await supabase.from("applications").update({ is_read }).eq("id", req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

app.patch("/api/admin/applications/:id/notes", requireAdmin, async (req, res) => {
  const supabase = getSupabase();
  const { notes } = req.body;
  const { error } = await supabase.from("applications").update({ notes }).eq("id", req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

app.delete("/api/admin/applications/:id", requireAdmin, async (req, res) => {
  const supabase = getSupabase();
  const { error } = await supabase.from("applications").delete().eq("id", req.params.id);
  if (error) return res.status(500).json({ error: error.message });
  res.json({ success: true });
});

app.get("/api/admin/applications/export", requireAdmin, async (req, res) => {
  const supabase = getSupabase();
  const { data, error } = await supabase.from("applications").select("*").order("created_at", { ascending: false });
  if (error) return res.status(500).json({ error: error.message });

  const headers = ["ID", "Full Name", "Email", "Phone", "Address", "Date of Birth", "Course", "Funding Type", "When to Start", "Additional Info", "Read", "Status", "Notes", "Date"];
  const rows = (data || []).map((a: any) => [
    a.id, a.full_name, a.email, a.phone || "", a.address || "", a.date_of_birth || "", a.course || "", a.funding_type || "", a.when_to_start || "", `"${(a.additional_info || "").replace(/"/g, '""')}"`,
    a.is_read ? "Yes" : "No", a.status,
    `"${(a.notes || "").replace(/"/g, '""')}"`,
    new Date(a.created_at).toLocaleString("en-GB"),
  ]);

  const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
  res.setHeader("Content-Type", "text/csv");
  res.setHeader("Content-Disposition", "attachment; filename=applications.csv");
  res.send(csv);
});

// Auth
app.post("/api/admin/login", async (req, res) => {
  const { username, password } = req.body;
  if (!username || !password) {
    res.status(400).json({ error: "Username and password required." });
    return;
  }
  try {
    const supabase = getSupabase();
    const { data, error } = await supabase
      .from("admin_users")
      .select("id, username, password")
      .eq("username", username)
      .single();

    if (error || !data || data.password !== password) {
      res.status(401).json({ error: "Invalid username or password." });
      return;
    }

    const token = Buffer.from(`${username}:${password}`).toString("base64");
    console.log(`✅ Admin login: ${username}`);
    res.json({ token });
  } catch (e: any) {
    console.error("Login error:", e.message);
    res.status(500).json({ error: "Login failed." });
  }
});

app.listen(PORT, () => {
  console.log(`\n🚀 Server running at http://localhost:${PORT}`);
});
