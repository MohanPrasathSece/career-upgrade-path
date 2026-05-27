import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/admin/")({
  beforeLoad: () => {
    const token = localStorage.getItem("admin_token");
    if (token) throw redirect({ to: "/admin/submissions" });
    throw redirect({ to: "/admin/login" });
  },
  component: () => null,
});
