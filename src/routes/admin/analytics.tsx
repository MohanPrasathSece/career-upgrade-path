import { createFileRoute, redirect } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  BarChart3, Eye, Users, Percent, RefreshCw, 
  ExternalLink, Layout, Navigation
} from "lucide-react";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { adminApi } from "@/lib/admin-api";
import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer
} from "recharts";

export const Route = createFileRoute("/admin/analytics")({
  beforeLoad: () => {
    if (!localStorage.getItem("admin_token")) {
      throw redirect({ to: "/admin/login" });
    }
  },
  component: AdminAnalytics,
});

function MetricCard({
  title,
  value,
  icon: Icon,
  description,
  color,
}: {
  title: string;
  value: string | number;
  icon: any;
  description: string;
  color: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-500 text-sm font-medium">{title}</p>
          <p className="text-gray-900 text-3xl font-extrabold mt-2 tracking-tight">{value}</p>
          <p className="text-gray-400 text-xs mt-2">{description}</p>
        </div>
        <div className={`h-12 w-12 rounded-2xl grid place-items-center ${color}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </div>
  );
}

function AdminAnalytics() {
  const [data, setData] = useState<any>(null);
  const [range, setRange] = useState<number>(30);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");

  const loadData = async (currentRange: number) => {
    setLoading(true);
    setError("");
    try {
      const res = await adminApi.getAnalytics(currentRange);
      setData(res);
    } catch (e: any) {
      setError(e.message || "Failed to load analytics data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData(range);
  }, [range]);

  const refresh = () => loadData(range);

  // Conversion calculations
  const uniqueVisitors = data?.unique_visitors || 0;
  const enquiryCount = data?.enquiry_count || 0;
  const applicationCount = data?.application_count || 0;

  const enquiryConversion = uniqueVisitors > 0 
    ? ((enquiryCount / uniqueVisitors) * 100).toFixed(1) + "%" 
    : "0.0%";

  const applicationConversion = uniqueVisitors > 0 
    ? ((applicationCount / uniqueVisitors) * 100).toFixed(1) + "%" 
    : "0.0%";

  // Formatter for dates in chart
  const formatChartDate = (dateStr: string) => {
    try {
      const date = new Date(dateStr);
      return date.toLocaleDateString("en-GB", { day: "numeric", month: "short" });
    } catch {
      return dateStr;
    }
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-gray-900 text-2xl font-bold flex items-center gap-3">
              Web Analytics <BarChart3 className="h-6 w-6 text-primary" />
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Real-time traffic activity and conversions overview.
            </p>
          </div>

          <div className="flex items-center gap-3 self-end sm:self-auto">
            {/* Range Selector */}
            <div className="flex border border-gray-200 bg-white rounded-xl p-1 shadow-sm">
              {[7, 30, 90].map((days) => (
                <button
                  key={days}
                  onClick={() => setRange(days)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                    range === days
                      ? "bg-primary text-white"
                      : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                  }`}
                >
                  Last {days} Days
                </button>
              ))}
            </div>

            <button
              onClick={refresh}
              disabled={loading}
              className="flex items-center gap-2 px-3 py-2 bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 rounded-xl text-sm font-medium transition active:scale-95 shadow-sm cursor-pointer"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? "animate-spin" : ""}`} />
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-2xl p-4 text-red-600 text-sm flex items-center gap-3">
            <span>⚠️</span>
            {error}
          </div>
        )}

        {/* Loading overlay/skeleton */}
        {loading && !data ? (
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[...Array(4)].map((_, i) => (
                <div key={i} className="h-32 bg-white border border-gray-200 rounded-3xl animate-pulse" />
              ))}
            </div>
            <div className="h-96 bg-white border border-gray-200 rounded-3xl animate-pulse" />
          </div>
        ) : (
          <>
            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <MetricCard
                title="Total Visits"
                value={data?.total_views || 0}
                icon={Eye}
                description={`Total pages loaded over past ${range} days`}
                color="bg-primary/10 text-primary"
              />
              <MetricCard
                title="Unique Visitors"
                value={uniqueVisitors}
                icon={Users}
                description={`Unique users based on anonymous IP hashes`}
                color="bg-blue-50 text-blue-600"
              />
              <MetricCard
                title="Enquiry Conv. Rate"
                value={enquiryConversion}
                icon={Percent}
                description={`${enquiryCount} enquiries submitted`}
                color="bg-purple-50 text-purple-600"
              />
              <MetricCard
                title="Application Conv. Rate"
                value={applicationConversion}
                icon={Percent}
                description={`${applicationCount} applications submitted`}
                color="bg-emerald-50 text-emerald-600"
              />
            </div>

            {/* Main Interactive Chart */}
            <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
              <h2 className="text-gray-900 font-bold text-lg mb-6">Traffic Over Time</h2>
              <div className="h-80 w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={data?.daily_stats || []}
                    margin={{ top: 10, right: 10, left: -20, bottom: 0 }}
                  >
                    <defs>
                      <linearGradient id="colorViews" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#16a34a" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#16a34a" stopOpacity={0.0} />
                      </linearGradient>
                      <linearGradient id="colorUniques" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.2} />
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0.0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                    <XAxis 
                      dataKey="date" 
                      tickFormatter={formatChartDate} 
                      tick={{ fill: "#94a3b8", fontSize: 11 }}
                      axisLine={{ stroke: "#e2e8f0" }}
                      tickLine={false}
                    />
                    <YAxis 
                      tick={{ fill: "#94a3b8", fontSize: 11 }}
                      axisLine={{ stroke: "#e2e8f0" }}
                      tickLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#ffffff",
                        border: "1px solid #e2e8f0",
                        borderRadius: "16px",
                        boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.05)",
                      }}
                      labelFormatter={(label) => {
                        try {
                          return new Date(label).toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long" });
                        } catch {
                          return label;
                        }
                      }}
                    />
                    <Area
                      type="monotone"
                      name="Total Visits"
                      dataKey="views"
                      stroke="#16a34a"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorViews)"
                    />
                    <Area
                      type="monotone"
                      name="Unique Visitors"
                      dataKey="uniques"
                      stroke="#2563eb"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorUniques)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Split breakdown rows */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Visited Pages Breakdown */}
              <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
                <h2 className="text-gray-900 font-bold text-lg mb-6 flex items-center gap-2">
                  <Layout className="h-4 w-4 text-primary" /> Most Visited Pages
                </h2>
                <div className="space-y-4">
                  {(!data?.views_by_path || data.views_by_path.length === 0) ? (
                    <p className="text-gray-500 text-sm italic py-8 text-center">No traffic tracked yet</p>
                  ) : (
                    data.views_by_path.map((item: any, idx: number) => {
                      const percentage = data.total_views > 0 
                        ? ((item.count / data.total_views) * 100).toFixed(0) 
                        : "0";
                      
                      // human friendly paths
                      let pathName = item.path;
                      if (pathName === "/") pathName = "Home Page (/)";
                      else if (pathName === "/courses") pathName = "Courses Page (/courses)";
                      else if (pathName === "/about") pathName = "About Page (/about)";
                      else if (pathName === "/contact") pathName = "Contact Page (/contact)";
                      else if (pathName === "/apply") pathName = "Application Page (/apply)";
                      else if (pathName === "/faq") pathName = "FAQ Page (/faq)";

                      return (
                        <div key={item.path} className="group">
                          <div className="flex justify-between items-center text-sm mb-1.5">
                            <span className="text-gray-700 font-medium truncate max-w-[300px] group-hover:text-primary transition flex items-center gap-1.5">
                              <span className="text-xs text-gray-400 font-mono w-5 inline-block">{idx + 1}.</span>
                              {pathName}
                            </span>
                            <span className="text-gray-500 font-bold text-xs">
                              {item.count} views <span className="text-gray-300 font-normal">({percentage}%)</span>
                            </span>
                          </div>
                          <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden border border-gray-200/50">
                            <div
                              className="h-full bg-gradient-to-r from-primary/70 to-primary rounded-full transition-all duration-1000"
                              style={{ width: `${percentage}%` }}
                            />
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>

              {/* Referrers breakdown */}
              <div className="bg-white border border-gray-200 rounded-3xl p-6 shadow-sm">
                <h2 className="text-gray-900 font-bold text-lg mb-6 flex items-center gap-2">
                  <Navigation className="h-4 w-4 text-primary" /> Traffic Sources (Referrers)
                </h2>
                <div className="divide-y divide-gray-100">
                  {(!data?.views_by_referrer || data.views_by_referrer.length === 0) ? (
                    <p className="text-gray-500 text-sm italic py-8 text-center">No referrers recorded yet</p>
                  ) : (
                    data.views_by_referrer.map((item: any, idx: number) => {
                      const isDirect = item.referrer === "Direct / Bookmark";
                      return (
                        <div key={item.referrer} className="flex justify-between items-center py-3 group">
                          <span className="text-sm text-gray-700 font-medium group-hover:text-primary transition flex items-center gap-2">
                            <span className="text-xs font-mono text-gray-400 w-5 inline-block">{idx + 1}.</span>
                            {item.referrer}
                            {!isDirect && (
                              <a href={`https://${item.referrer}`} target="_blank" rel="noreferrer" className="text-gray-300 hover:text-primary transition">
                                <ExternalLink className="h-3 w-3" />
                              </a>
                            )}
                          </span>
                          <span className="bg-gray-50 text-gray-600 text-xs px-2.5 py-1 rounded-full font-bold">
                            {item.count} sessions
                          </span>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
