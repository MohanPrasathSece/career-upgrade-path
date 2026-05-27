import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useState, useMemo } from "react";
import {
  Search, Download, Trash2, Mail, Phone, BookOpen,
  Clock, CheckCircle2, X, RefreshCw, AlertCircle,
  ChevronDown, MessageSquare, Eye, EyeOff, Filter,
  MapPin, Calendar, Wallet, Flag,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { adminApi, type Application } from "@/lib/admin-api";

export const Route = createFileRoute("/admin/applications")({
  beforeLoad: () => {
    if (!localStorage.getItem("admin_token")) {
      throw redirect({ to: "/admin/login" });
    }
  },
  component: AdminApplications,
});

const COURSES = ["All", "Dental Nursing - 1 Year", "Government Funded Route", "Other / Not sure"];
const STATUS = ["All", "Unread", "Read"];
const FUNDING_TYPES = ["All", "Government Funded", "Fee Paying"];

function Badge({ children, color }: { children: React.ReactNode; color: string }) {
  return (
    <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${color}`}>
      {children}
    </span>
  );
}

function AdminApplications() {
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [courseFilter, setCourseFilter] = useState("All");
  const [statusFilter, setStatusFilter] = useState("All");
  const [fundingFilter, setFundingFilter] = useState("All");
  const [selected, setSelected] = useState<Application | null>(null);
  const [notes, setNotes] = useState("");
  const [savingNotes, setSavingNotes] = useState(false);
  const [deleting, setDeleting] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const PER_PAGE = 15;

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const data = await adminApi.getApplications();
      setApplications(data);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const openApplication = async (a: Application) => {
    setSelected(a);
    setNotes(a.notes || "");
    if (!a.is_read) {
      await adminApi.markApplicationRead(a.id, true);
      setApplications((prev) => prev.map((x) => x.id === a.id ? { ...x, is_read: true } : x));
    }
  };

  const toggleRead = async (a: Application, e: React.MouseEvent) => {
    e.stopPropagation();
    await adminApi.markApplicationRead(a.id, !a.is_read);
    setApplications((prev) => prev.map((x) => x.id === a.id ? { ...x, is_read: !x.is_read } : x));
    if (selected?.id === a.id) setSelected({ ...a, is_read: !a.is_read });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this application? This cannot be undone.")) return;
    setDeleting(id);
    try {
      await adminApi.deleteApplication(id);
      setApplications((prev) => prev.filter((a) => a.id !== id));
      if (selected?.id === id) setSelected(null);
    } catch (e: any) {
      setError(e.message || "Failed to delete application.");
    } finally {
      setDeleting(null);
    }
  };

  const handleSaveNotes = async () => {
    if (!selected) return;
    setSavingNotes(true);
    try {
      await adminApi.saveApplicationNotes(selected.id, notes);
      setApplications((prev) =>
        prev.map((a) => a.id === selected.id ? { ...a, notes } : a)
      );
      setSelected({ ...selected, notes });
    } finally {
      setSavingNotes(false);
    }
  };

  const filtered = useMemo(() => {
    return applications.filter((a) => {
      const q = search.toLowerCase();
      const matchSearch =
        !q ||
        a.full_name.toLowerCase().includes(q) ||
        a.email.toLowerCase().includes(q) ||
        (a.phone || "").includes(q) ||
        (a.additional_info || "").toLowerCase().includes(q);
      const matchCourse = courseFilter === "All" || a.course === courseFilter;
      const matchFunding = fundingFilter === "All" || a.funding_type === fundingFilter;
      const matchStatus =
        statusFilter === "All" ||
        (statusFilter === "Unread" && !a.is_read) ||
        (statusFilter === "Read" && a.is_read);
      return matchSearch && matchCourse && matchFunding && matchStatus;
    });
  }, [applications, search, courseFilter, statusFilter, fundingFilter]);

  const totalPages = Math.ceil(filtered.length / PER_PAGE);
  const paginated = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);
  const unreadCount = applications.filter((a) => !a.is_read).length;

  return (
    <AdminLayout>
      <div className="flex gap-6 h-full">
        {/* Left: list */}
        <div className={`flex flex-col min-w-0 ${selected ? "hidden lg:flex lg:flex-1" : "flex-1"}`}>
          {/* Header */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-gray-900 text-2xl font-bold">Applications</h1>
              <p className="text-gray-500 text-sm mt-0.5">
                {applications.length} total · {unreadCount} unread
              </p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={load}
                disabled={loading}
                className="p-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-600 rounded-xl transition shadow-sm"
                title="Refresh"
              >
                <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
              </button>
              <button
                onClick={() => adminApi.exportApplicationsCsv()}
                className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl text-sm transition shadow-sm"
              >
                <Download className="h-4 w-4" />
                Export CSV
              </button>
            </div>
          </div>

          {/* Filters */}
          <div className="space-y-2 mb-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search name, email, message..."
                value={search}
                onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                className="w-full bg-white border border-gray-200 rounded-xl pl-9 pr-4 py-2.5 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary shadow-sm"
              />
              {search && (
                <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
                  <X className="h-3.5 w-3.5" />
                </button>
              )}
            </div>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                <select
                  value={courseFilter}
                  onChange={(e) => { setCourseFilter(e.target.value); setPage(1); }}
                  className="w-full bg-white border border-gray-200 rounded-xl pl-8 pr-8 py-2 text-gray-700 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none shadow-sm"
                >
                  {COURSES.map((c) => <option key={c}>{c}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none" />
              </div>
              <div className="relative flex-1">
                <Wallet className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
                <select
                  value={fundingFilter}
                  onChange={(e) => { setFundingFilter(e.target.value); setPage(1); }}
                  className="w-full bg-white border border-gray-200 rounded-xl pl-8 pr-8 py-2 text-gray-700 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none shadow-sm"
                >
                  {FUNDING_TYPES.map((f) => <option key={f}>{f}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none" />
              </div>
              <div className="relative flex-1">
                <select
                  value={statusFilter}
                  onChange={(e) => { setStatusFilter(e.target.value); setPage(1); }}
                  className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2 text-gray-700 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary appearance-none pr-8 shadow-sm"
                >
                  {STATUS.map((s) => <option key={s}>{s}</option>)}
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-gray-400 pointer-events-none" />
              </div>
            </div>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-xl p-3 text-red-600 text-sm flex items-center gap-2 mb-4">
              <AlertCircle className="h-4 w-4 flex-shrink-0" /> {error}
            </div>
          )}

          {/* Table */}
          <div className="flex-1 bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            {loading ? (
              <div className="p-4 space-y-2">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-50 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : paginated.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-20 text-center">
                <Search className="h-8 w-8 text-gray-400 mb-3" />
                <p className="text-gray-500 font-medium">No applications found</p>
                <p className="text-gray-400 text-sm mt-1">Try adjusting your filters</p>
              </div>
            ) : (
              <div className="divide-y divide-gray-100">
                {paginated.map((a) => (
                  <div
                    key={a.id}
                    onClick={() => openApplication(a)}
                    className={`flex items-start gap-3 p-4 cursor-pointer transition hover:bg-gray-50 ${
                      selected?.id === a.id ? "bg-gray-50 border-l-4 border-l-primary" : "border-l-4 border-l-transparent"
                    }`}
                  >
                    {/* Avatar */}
                    <div className={`h-9 w-9 rounded-full grid place-items-center flex-shrink-0 text-sm font-bold ${
                      a.is_read ? "bg-gray-100 text-gray-500" : "bg-primary/20 text-primary"
                    }`}>
                      {a.full_name.charAt(0).toUpperCase()}
                    </div>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className={`text-sm font-medium ${a.is_read ? "text-gray-600" : "text-gray-900 font-bold"}`}>
                          {a.full_name}
                        </span>
                        {!a.is_read && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                        {a.course && (
                          <Badge color="bg-blue-50 text-blue-600 border border-blue-200">{a.course}</Badge>
                        )}
                        {a.funding_type && (
                          <Badge color="bg-green-50 text-green-600 border border-green-200">{a.funding_type}</Badge>
                        )}
                        {a.notes && (
                          <MessageSquare className="h-3 w-3 text-gray-400" />
                        )}
                      </div>
                      <p className="text-gray-500 text-xs truncate mt-0.5">{a.email}</p>
                      <p className="text-gray-600 text-xs truncate mt-0.5">{a.phone}</p>
                    </div>

                    {/* Right */}
                    <div className="flex flex-col items-end gap-1.5 flex-shrink-0">
                      <span className="text-gray-400 text-xs">
                        {new Date(a.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                      </span>
                      <div className="flex items-center gap-1">
                        <button
                          onClick={(e) => toggleRead(a, e)}
                          className="p-1 rounded hover:bg-gray-200 text-gray-400 hover:text-gray-700 transition"
                          title={a.is_read ? "Mark unread" : "Mark read"}
                        >
                          {a.is_read ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
                        </button>
                        <button
                          onClick={(e) => { e.stopPropagation(); handleDelete(a.id); }}
                          disabled={deleting === a.id}
                          className="p-1 rounded hover:bg-red-50 text-gray-400 hover:text-red-500 transition"
                          title="Delete"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between mt-3">
              <p className="text-gray-500 text-xs">
                {(page - 1) * PER_PAGE + 1}–{Math.min(page * PER_PAGE, filtered.length)} of {filtered.length}
              </p>
              <div className="flex gap-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
                  <button
                    key={p}
                    onClick={() => setPage(p)}
                    className={`h-7 w-7 rounded-lg text-xs font-medium transition ${
                      p === page
                        ? "bg-primary text-primary-foreground"
                        : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Right: detail panel */}
        {selected && (
          <div className="w-full lg:w-[380px] flex-shrink-0 flex flex-col bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            {/* Panel header */}
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200 bg-gray-50/50">
              <h2 className="text-gray-900 font-semibold text-sm">Application Detail</h2>
              <button
                onClick={() => setSelected(null)}
                className="text-gray-500 hover:text-gray-900 transition"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {/* Contact info */}
              <div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="h-12 w-12 rounded-full bg-primary/10 grid place-items-center text-primary font-bold text-lg">
                    {selected.full_name.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="text-gray-900 font-semibold">{selected.full_name}</p>
                    <p className="text-gray-500 text-xs">
                      {new Date(selected.created_at).toLocaleString("en-GB", {
                        day: "numeric", month: "short", year: "numeric",
                        hour: "2-digit", minute: "2-digit",
                      })}
                    </p>
                  </div>
                </div>

                <div className="space-y-2 mt-4">
                  <a
                    href={`mailto:${selected.email}`}
                    className="flex items-center gap-2.5 p-2.5 bg-gray-50 rounded-xl hover:bg-gray-100 transition group border border-transparent hover:border-gray-200"
                  >
                    <Mail className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-gray-700 text-sm truncate group-hover:text-gray-900">{selected.email}</span>
                  </a>
                  <a
                    href={`tel:${selected.phone}`}
                    className="flex items-center gap-2.5 p-2.5 bg-gray-50 rounded-xl hover:bg-gray-100 transition group border border-transparent hover:border-gray-200"
                  >
                    <Phone className="h-4 w-4 text-primary flex-shrink-0" />
                    <span className="text-gray-700 text-sm group-hover:text-gray-900">{selected.phone}</span>
                  </a>
                  {selected.address && (
                    <div className="flex items-center gap-2.5 p-2.5 bg-gray-50 rounded-xl border border-transparent">
                      <MapPin className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{selected.address}</span>
                    </div>
                  )}
                  {selected.date_of_birth && (
                    <div className="flex items-center gap-2.5 p-2.5 bg-gray-50 rounded-xl border border-transparent">
                      <Calendar className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{selected.date_of_birth}</span>
                    </div>
                  )}
                  {selected.course && (
                    <div className="flex items-center gap-2.5 p-2.5 bg-gray-50 rounded-xl border border-transparent">
                      <BookOpen className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{selected.course}</span>
                    </div>
                  )}
                  {selected.funding_type && (
                    <div className="flex items-center gap-2.5 p-2.5 bg-gray-50 rounded-xl border border-transparent">
                      <Wallet className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{selected.funding_type}</span>
                    </div>
                  )}
                  {selected.when_to_start && (
                    <div className="flex items-center gap-2.5 p-2.5 bg-gray-50 rounded-xl border border-transparent">
                      <Flag className="h-4 w-4 text-primary flex-shrink-0" />
                      <span className="text-gray-700 text-sm">{selected.when_to_start}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* Status */}
              <div className="flex items-center justify-between">
                <span className="text-gray-500 text-sm">Status</span>
                <button
                  onClick={(e) => toggleRead(selected, e)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    selected.is_read
                      ? "bg-green-100 text-green-700 hover:bg-green-200"
                      : "bg-amber-100 text-amber-700 hover:bg-amber-200"
                  }`}
                >
                  {selected.is_read ? (
                    <><CheckCircle2 className="h-3.5 w-3.5" /> Read</>
                  ) : (
                    <><Clock className="h-3.5 w-3.5" /> Unread</>
                  )}
                </button>
              </div>

              {/* Additional Info */}
              {selected.additional_info && (
                <div>
                  <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-2">Additional Info</p>
                  <div className="bg-gray-50 border border-gray-100 rounded-xl p-4 text-gray-700 text-sm leading-relaxed whitespace-pre-wrap">
                    {selected.additional_info}
                  </div>
                </div>
              )}

              {/* Quick reply */}
              <div>
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-2">Quick Reply</p>
                <a
                  href={`mailto:${selected.email}?subject=Re: Your Application - Career Upgrade&body=Hi ${selected.full_name},%0D%0A%0D%0AThank you for your application.%0D%0A%0D%0A`}
                  className="flex items-center justify-center gap-2 w-full py-2.5 bg-primary/10 hover:bg-primary/20 text-primary border border-primary/20 rounded-xl text-sm font-medium transition"
                >
                  <Mail className="h-4 w-4" />
                  Reply via Email
                </a>
              </div>

              {/* Notes */}
              <div>
                <p className="text-gray-500 text-xs font-medium uppercase tracking-wider mb-2">Internal Notes</p>
                <textarea
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  rows={3}
                  placeholder="Add private notes about this application..."
                  className="w-full bg-white border border-gray-200 rounded-xl px-3 py-2.5 text-gray-900 text-sm placeholder-gray-400 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary resize-none shadow-sm"
                />
                <button
                  onClick={handleSaveNotes}
                  disabled={savingNotes || notes === (selected.notes || "")}
                  className="mt-2 w-full py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl text-sm font-medium transition disabled:opacity-40 shadow-sm"
                >
                  {savingNotes ? "Saving..." : "Save Notes"}
                </button>
              </div>
            </div>

            {/* Panel footer */}
            <div className="px-5 py-3 border-t border-gray-200 bg-gray-50/50 text-center">
              <span className="text-gray-400 text-xs">Career Upgrade Admin</span>
            </div>
          </div>
        )}
      </div>
    </AdminLayout>
  );
}
