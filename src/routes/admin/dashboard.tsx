import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  Inbox, BookOpen, TrendingUp, Clock, CheckCircle2,
  AlertCircle, ArrowRight, RefreshCw, Sparkles, ExternalLink,
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { adminApi, type Submission } from "@/lib/admin-api";
import { Link } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/dashboard")({
  beforeLoad: () => {
    if (!localStorage.getItem("admin_token")) {
      throw redirect({ to: "/admin/login" });
    }
  },
  component: AdminDashboard,
});

function StatCard({
  icon: Icon,
  label,
  value,
  sub,
  color,
}: {
  icon: any;
  label: string;
  value: number | string;
  sub?: string;
  color: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-5 hover:border-gray-300 transition group shadow-sm">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{label}</p>
          <p className="text-gray-900 text-3xl font-bold mt-1 group-hover:scale-105 transition-transform origin-left">{value}</p>
          {sub && <p className="text-gray-400 text-xs mt-1.5 flex items-center gap-1.5">{sub}</p>}
        </div>
        <div className={`h-12 w-12 rounded-2xl grid place-items-center ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}

function AdminDashboard() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const load = async () => {
    setLoading(true);
    setError("");
    try {
      const subs = await adminApi.getSubmissions();
      setSubmissions(subs);
    } catch (e: any) {
      setError(e.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const today = new Date().toDateString();
  const todayEnquiries = submissions.filter(s => new Date(s.created_at).toDateString() === today).length;
  
  const unreadEnquiries = submissions.filter(s => !s.is_read).length;

  const courseBreakdown = submissions.reduce<Record<string, number>>((acc, s) => {
    if (s.course) {
      acc[s.course] = (acc[s.course] || 0) + 1;
    }
    return acc;
  }, {});

  const recentEnquiries = submissions
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, 6);

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-gray-900 text-2xl font-bold flex items-center gap-3">
              Dashboard <Sparkles className="h-5 w-5 text-primary" />
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Welcome back. Here's what's happening today.
            </p>
          </div>
          <button
            onClick={load}
            disabled={loading}
            className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl text-sm font-medium transition active:scale-95 shadow-sm"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            Refresh Data
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-red-600 text-sm flex items-center gap-3 animate-in fade-in slide-in-from-top-4">
            <AlertCircle className="h-5 w-5 flex-shrink-0" />
            {error}
          </div>
        )}

        {/* Primary Stats */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatCard 
            icon={Inbox} 
            label="Enquiries" 
            value={submissions.length} 
            sub={unreadEnquiries > 0 ? `${unreadEnquiries} new enquiries` : "No new messages"}
            color="bg-primary/10 text-primary" 
          />
          <StatCard 
            icon={TrendingUp} 
            label="Today's Activity" 
            value={todayEnquiries} 
            sub={`${todayEnquiries} enq today`}
            color="bg-green-100 text-green-600" 
          />
        </div>

        <div className="grid lg:grid-cols-[1fr_350px] gap-8">
          {/* Recent Activity */}
          <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-gray-900 font-bold text-lg">Recent Enquiries</h2>
              <Link to="/admin/submissions" className="text-primary text-xs font-bold hover:underline">View All</Link>
            </div>

            {loading ? (
              <div className="space-y-4">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="h-16 bg-gray-50 rounded-2xl animate-pulse" />
                ))}
              </div>
            ) : recentEnquiries.length === 0 ? (
              <div className="text-center py-20 bg-gray-50 rounded-2xl border border-dashed border-gray-200">
                <Clock className="h-10 w-10 text-gray-400 mx-auto mb-3" />
                <p className="text-gray-500">No activity recorded yet</p>
              </div>
            ) : (
              <div className="space-y-3">
                {recentEnquiries.map((item) => (
                  <Link
                    key={item.id}
                    to={"/admin/submissions"}
                    className="flex items-center gap-4 p-4 rounded-2xl hover:bg-gray-50 transition border border-transparent hover:border-gray-100 group"
                  >
                    <div className="h-10 w-10 rounded-xl grid place-items-center flex-shrink-0 bg-primary/10 text-primary">
                      <Inbox className="h-5 w-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="text-gray-900 text-sm font-bold truncate">{item.name}</p>
                        {!item.is_read && <span className="h-1.5 w-1.5 rounded-full bg-primary" />}
                      </div>
                      <p className="text-gray-500 text-xs truncate mt-0.5">{item.message}</p>
                    </div>
                    <div className="text-right flex-shrink-0">
                      <p className="text-gray-400 text-[10px] font-medium">
                        {new Date(item.created_at).toLocaleDateString("en-GB", { day: "numeric", month: "short" })}
                      </p>
                      <ArrowRight className="h-3 w-3 text-gray-300 group-hover:text-primary transition ml-auto mt-1" />
                    </div>
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Quick Insights */}
          <div className="space-y-8">
            {/* Top Course */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
              <h2 className="text-gray-900 font-bold mb-5 flex items-center gap-2">
                <BookOpen className="h-4 w-4 text-primary" /> Popular Courses
              </h2>
              <div className="space-y-5">
                {Object.entries(courseBreakdown).length === 0 ? (
                  <p className="text-gray-500 text-sm italic">Waiting for applications...</p>
                ) : (
                  Object.entries(courseBreakdown)
                    .sort((a, b) => b[1] - a[1])
                    .map(([course, count]) => (
                      <div key={course} className="group">
                        <div className="flex justify-between text-sm mb-2">
                          <span className="text-gray-700 font-medium truncate max-w-[180px] group-hover:text-gray-900 transition">{course}</span>
                          <span className="text-primary font-bold">{count}</span>
                        </div>
                        <div className="h-2 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
                          <div
                            className="h-full bg-gradient-to-r from-primary/60 to-primary rounded-full transition-all duration-1000"
                            style={{ width: `${(count / submissions.length) * 100}%` }}
                          />
                        </div>
                      </div>
                    ))
                )}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm relative overflow-hidden">
              <h2 className="text-gray-900 font-bold mb-4 relative z-10">Quick Actions</h2>
              <div className="grid grid-cols-2 gap-3 relative z-10">
                <Link to="/admin/submissions" className="p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl text-center transition group">
                  <Inbox className="h-5 w-5 text-gray-400 mx-auto mb-2 group-hover:text-primary" />
                  <span className="text-xs text-gray-600 group-hover:text-gray-900">Enquiries</span>
                </Link>
                <a href="/" target="_blank" className="p-3 bg-gray-50 hover:bg-gray-100 rounded-2xl text-center transition group">
                  <ExternalLink className="h-5 w-5 text-gray-400 mx-auto mb-2 group-hover:text-primary" />
                  <span className="text-xs text-gray-600 group-hover:text-gray-900">Live Site</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
}
