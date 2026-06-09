import type { VercelRequest, VercelResponse } from "@vercel/node";
import { getSupabase } from "../_lib/supabase.js";
import { verifyAdmin } from "../_lib/auth.js";

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (!verifyAdmin(req)) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  // Extract slug segments from req.url pathname to ensure 100% robust routing on Vercel
  const url = new URL(req.url || "", `http://${req.headers.host || "localhost"}`);
  const segments = url.pathname.split("/").filter(Boolean);
  const adminIndex = segments.indexOf("admin");
  const slug = adminIndex !== -1 ? segments.slice(adminIndex + 1) : [];

  const resource = slug[0]; // "submissions" or "applications"
  const id = slug[1];
  const action = slug[2];

  const supabase = getSupabase();

  try {
    // ── Analytics ──────────────────────────────────────────────────────────
    if (resource === "analytics") {
      if (req.method !== "GET") {
        return res.status(405).json({ error: "Method not allowed" });
      }

      const prevDays = parseInt(url.searchParams.get("range") || "30", 10);
      const startDate = new Date();
      startDate.setDate(startDate.getDate() - prevDays);

      try {
        // 1. Fetch Form Counts (for conversion rate calculations)
        const [enquiryRes, applicationRes] = await Promise.all([
          supabase.from("submissions").select("id", { count: "exact", head: true }).gte("created_at", startDate.toISOString()),
          supabase.from("applications").select("id", { count: "exact", head: true }).gte("created_at", startDate.toISOString()),
        ]);

        const enquiryCount = enquiryRes.count || 0;
        const applicationCount = applicationRes.count || 0;

        let result: any = null;

        // 2. Try Database RPC first (highly optimized)
        try {
          const { data, error: rpcError } = await supabase.rpc("get_analytics_summary", { prev_days: prevDays });
          if (!rpcError && data) {
            result = data;
          }
        } catch (rpcErr) {
          // Silently catch and fallback to JS
        }

        // 3. JS Aggregation Fallback (runs if RPC fails, is not deployed, or returns error)
        if (!result) {
          const { data: views, error: viewsError } = await supabase
            .from("page_views")
            .select("created_at, path, referrer, ip_hash")
            .gte("created_at", startDate.toISOString());

          if (viewsError) throw new Error(viewsError.message);

          // Process views
          const viewsList = views || [];
          const totalViews = viewsList.length;

          // Unique visitors set
          const uniqueIps = new Set(viewsList.map(v => v.ip_hash));
          const uniqueVisitors = uniqueIps.size;

          // Daily aggregation
          const dailyMap = new Map<string, { views: number; uniques: Set<string> }>();
          // Pre-populate last prevDays to ensure we don't have gaps in the charts
          for (let i = prevDays; i >= 0; i--) {
            const d = new Date();
            d.setDate(d.getDate() - i);
            const dateStr = d.toISOString().split("T")[0];
            dailyMap.set(dateStr, { views: 0, uniques: new Set() });
          }

          // Top paths and referrers aggregators
          const pathMap = new Map<string, { count: number; uniques: Set<string> }>();
          const referrerMap = new Map<string, number>();

          viewsList.forEach(v => {
            const dateStr = new Date(v.created_at).toISOString().split("T")[0];
            
            // Daily stats
            if (dailyMap.has(dateStr)) {
              const dayObj = dailyMap.get(dateStr)!;
              dayObj.views += 1;
              dayObj.uniques.add(v.ip_hash);
            }

            // Path breakdown
            if (!pathMap.has(v.path)) {
              pathMap.set(v.path, { count: 0, uniques: new Set() });
            }
            const pObj = pathMap.get(v.path)!;
            pObj.count += 1;
            pObj.uniques.add(v.ip_hash);

            // Referrer breakdown
            let cleanRef = "Direct / Bookmark";
            if (v.referrer) {
              try {
                const host = new URL(v.referrer).hostname;
                if (host && !host.includes("localhost") && !host.includes("127.0.0.1")) {
                  cleanRef = host;
                }
              } catch {
                cleanRef = v.referrer;
              }
            }
            referrerMap.set(cleanRef, (referrerMap.get(cleanRef) || 0) + 1);
          });

          const dailyStats = Array.from(dailyMap.entries()).map(([date, val]) => ({
            date,
            views: val.views,
            uniques: val.uniques.size,
          }));

          const viewsByPath = Array.from(pathMap.entries()).map(([path, val]) => ({
            path,
            count: val.count,
            unique_count: val.uniques.size,
          })).sort((a, b) => b.count - a.count).slice(0, 15);

          const viewsByReferrer = Array.from(referrerMap.entries()).map(([referrer, count]) => ({
            referrer,
            count,
          })).sort((a, b) => b.count - a.count).slice(0, 10);

          result = {
            total_views: totalViews,
            unique_visitors: uniqueVisitors,
            views_by_path: viewsByPath,
            views_by_referrer: viewsByReferrer,
            daily_stats: dailyStats,
          };
        }

        // Combine summary results with form counts and return
        return res.status(200).json({
          ...result,
          enquiry_count: enquiryCount,
          application_count: applicationCount,
        });
      } catch (e: any) {
        console.error("Admin Analytics API error:", e.message);
        return res.status(500).json({ error: e.message || "Failed to load analytics" });
      }
    }

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
