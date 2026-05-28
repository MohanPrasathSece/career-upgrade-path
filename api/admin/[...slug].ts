import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getSupabase } from "../_lib/supabase.js";
import { verifyAdmin } from "../_lib/auth.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!verifyAdmin(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const slug = (req.query.slug || []) as string[];
  const resource = slug[0]; // "submissions" or "applications"
  const id = slug[1];
  const action = slug[2];

  const supabase = getSupabase();

  try {
    // ── Submissions ────────────────────────────────────────────────────────
    if (resource === "submissions") {
      // GET /api/admin/submissions
      if (!id && req.method === "GET") {
        const { data, error } = await supabase.from("submissions").select("*").order("created_at", { ascending: false });
        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json(data);
      }

      // GET /api/admin/submissions/export
      if (id === "export" && req.method === "GET") {
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
        return res.send(csv);
      }

      // DELETE /api/admin/submissions/:id
      if (req.method === "DELETE" && id) {
        const { error } = await supabase.from("submissions").delete().eq("id", id);
        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json({ success: true });
      }

      // PATCH /api/admin/submissions/:id
      if (req.method === "PATCH" && id && !action) {
        const { error } = await supabase.from("submissions").update(req.body).eq("id", id);
        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json({ success: true });
      }

      // PATCH /api/admin/submissions/:id/read
      if (req.method === "PATCH" && id && action === "read") {
        const { error } = await supabase.from("submissions").update({ is_read: req.body.is_read }).eq("id", id);
        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json({ success: true });
      }

      // PATCH /api/admin/submissions/:id/notes
      if (req.method === "PATCH" && id && action === "notes") {
        const { error } = await supabase.from("submissions").update({ notes: req.body.notes }).eq("id", id);
        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json({ success: true });
      }
    }

    // ── Applications ───────────────────────────────────────────────────────
    if (resource === "applications") {
      // GET /api/admin/applications
      if (!id && req.method === "GET") {
        const { data, error } = await supabase.from("applications").select("*").order("created_at", { ascending: false });
        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json(data);
      }

      // GET /api/admin/applications/export
      if (id === "export" && req.method === "GET") {
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
        return res.send(csv);
      }

      // DELETE /api/admin/applications/:id
      if (req.method === "DELETE" && id) {
        const { error } = await supabase.from("applications").delete().eq("id", id);
        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json({ success: true });
      }

      // PATCH /api/admin/applications/:id
      if (req.method === "PATCH" && id && !action) {
        const { error } = await supabase.from("applications").update(req.body).eq("id", id);
        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json({ success: true });
      }

      // PATCH /api/admin/applications/:id/read
      if (req.method === "PATCH" && id && action === "read") {
        const { error } = await supabase.from("applications").update({ is_read: req.body.is_read }).eq("id", id);
        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json({ success: true });
      }

      // PATCH /api/admin/applications/:id/notes
      if (req.method === "PATCH" && id && action === "notes") {
        const { error } = await supabase.from("applications").update({ notes: req.body.notes }).eq("id", id);
        if (error) return res.status(500).json({ error: error.message });
        return res.status(200).json({ success: true });
      }
    }

    return res.status(404).json({ error: "Not found" });
  } catch (e: any) {
    console.error("Admin API error:", e.message);
    return res.status(500).json({ error: "Server error" });
  }
}
