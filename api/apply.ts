import type { VercelRequest, VercelResponse } from "@vercel/node";
import nodemailer from "nodemailer";
import { createClient } from "@supabase/supabase-js";

function getSupabase() {
  const url = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_ANON_KEY;
  return createClient(url!, key!);
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const {
    full_name, email, phone, address, date_of_birth,
    course, funding_type, when_to_start, additional_info,
  } = req.body;

  if (!full_name || !email || !phone || !funding_type) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  // Save to Supabase
  try {
    const supabase = getSupabase();
    await supabase.from("applications").insert({
      full_name,
      email,
      phone,
      address: address || null,
      date_of_birth: date_of_birth || null,
      course: course || "Dental Nursing - 1 Year",
      funding_type,
      when_to_start: when_to_start || null,
      additional_info: additional_info || null,
      is_read: false,
      status: "New",
    });
  } catch (err: any) {
    console.error("Supabase insert error:", err.message);
    // Don't block email sending if DB fails
  }

  // Send email
  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

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
        <p><strong>Additional Info:</strong><br/>${String(additional_info || "").replace(/\n/g, "<br/>")}</p>
      `,
    });
    return res.status(200).json({ success: true });
  } catch (err: any) {
    console.error("Email error:", err.message);
    return res.status(500).json({ error: "Failed to send email." });
  }
}
