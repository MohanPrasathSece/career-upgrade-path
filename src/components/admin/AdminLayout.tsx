import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import {
  Inbox,
  LogOut,
  Menu,
  GraduationCap,
  ClipboardList,
} from "lucide-react";
import { useState } from "react";
import logoImg from "@/assets/icon.png";

const navItems = [
  { to: "/admin/applications", icon: ClipboardList, label: "Applications" },
  { to: "/admin/submissions", icon: Inbox, label: "Enquiry" },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();
  const routerState = useRouterState();
  const currentPath = routerState.location.pathname;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("admin_token");
    navigate({ to: "/admin/login" });
  };

  const Sidebar = () => (
    <aside className="flex h-full flex-col bg-white border-r border-gray-200 shadow-sm">      {/* Logo */}
      <div className="flex items-center gap-3 px-5 py-5 border-b border-gray-200">
        <img src={logoImg} alt="Logo" className="h-9 w-9 rounded-xl" />
        <div>
          <p className="text-gray-900 font-bold text-sm leading-tight">Career Upgrade</p>
          <p className="text-gray-500 text-[10px] uppercase tracking-wider">Admin Panel</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
        {navItems.map(({ to, icon: Icon, label }) => {
          const active = currentPath === to || currentPath.startsWith(to + "/");
          return (
            <Link
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                active
                  ? "bg-primary/10 text-primary font-semibold"
                  : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
              }`}
            >
              <Icon className="h-4 w-4 flex-shrink-0" />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="px-3 py-4 border-t border-gray-200">
        <a
          href="/"
          target="_blank"
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 transition mb-1"
        >
          <GraduationCap className="h-4 w-4" />
          View Website
        </a>
        <button
          onClick={logout}
          className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 hover:text-red-600 hover:bg-red-50 transition"
        >
          <LogOut className="h-4 w-4" />
          Sign Out
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden notranslate">
      {/* Desktop sidebar */}
      <div className="hidden lg:flex lg:w-64 lg:flex-shrink-0">
        <div className="w-full">
          <Sidebar />
        </div>
      </div>

      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div className="absolute inset-0 bg-gray-900/40 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <div className="absolute left-0 top-0 h-full w-64 shadow-2xl">
            <Sidebar />
          </div>
        </div>
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top bar */}
        <header className="flex items-center justify-between px-5 py-3 bg-white border-b border-gray-200 shadow-sm lg:hidden z-10">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 -ml-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg transition"
          >
            <Menu className="h-5 w-5" />
          </button>
          <p className="text-gray-900 font-semibold text-sm">Admin Panel</p>
          <div className="w-9" /> {/* Spacer to center the text */}
        </header>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}
