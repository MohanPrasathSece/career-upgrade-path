import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/other-courses")({
  beforeLoad: () => {
    throw redirect({
      to: "/othercourses",
      replace: true,
    });
  },
});
