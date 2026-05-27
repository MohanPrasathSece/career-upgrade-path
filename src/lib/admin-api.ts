export type Submission = {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  address: string | null;
  date_of_birth: string | null;
  course: string | null;
  funding_type: string | null;
  when_to_start: string | null;
  additional_info: string | null;
  message: string;
  is_read: boolean;
  status: string;
  notes: string | null;
  created_at: string;
};

export type Application = {
  id: string;
  full_name: string;
  email: string;
  phone: string;
  address: string | null;
  date_of_birth: string | null;
  course: string;
  funding_type: string;
  when_to_start: string | null;
  additional_info: string | null;
  status: string;
  is_read: boolean;
  notes: string | null;
  created_at: string;
};

function getToken() {
  return localStorage.getItem("admin_token") || "";
}

function authHeaders() {
  return {
    "Content-Type": "application/json",
    "x-admin-token": getToken(),
  };
}

async function handleResponse(res: Response) {
  if (res.status === 401) {
    localStorage.removeItem("admin_token");
    window.location.href = "/admin/login";
    throw new Error("Unauthorized");
  }
  if (!res.ok) {
    const data = await res.json().catch(() => ({}));
    throw new Error(data.error || "Request failed");
  }
  return res.json();
}

export const adminApi = {
  // Submissions
  getSubmissions: (): Promise<Submission[]> =>
    fetch("/api/admin/submissions", { headers: authHeaders() }).then(handleResponse),

  updateSubmission: (id: string, updates: Partial<Submission>) =>
    fetch(`/api/admin/submissions/${id}`, {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify(updates),
    }).then(handleResponse),

  markRead: (id: string, is_read: boolean) =>
    fetch(`/api/admin/submissions/${id}/read`, {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify({ is_read }),
    }).then(handleResponse),

  saveNotes: (id: string, notes: string) =>
    fetch(`/api/admin/submissions/${id}/notes`, {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify({ notes }),
    }).then(handleResponse),

  deleteSubmission: (id: string) =>
    fetch(`/api/admin/submissions/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    }).then(handleResponse),

  exportCsv: () => {
    const token = getToken();
    window.open(`/api/admin/submissions/export?token=${token}`, "_blank");
  },

  // Applications
  getApplications: (): Promise<Application[]> =>
    fetch("/api/admin/applications", { headers: authHeaders() }).then(handleResponse),

  updateApplication: (id: string, updates: Partial<Application>) =>
    fetch(`/api/admin/applications/${id}`, {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify(updates),
    }).then(handleResponse),

  markApplicationRead: (id: string, is_read: boolean) =>
    fetch(`/api/admin/applications/${id}/read`, {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify({ is_read }),
    }).then(handleResponse),

  saveApplicationNotes: (id: string, notes: string) =>
    fetch(`/api/admin/applications/${id}/notes`, {
      method: "PATCH",
      headers: authHeaders(),
      body: JSON.stringify({ notes }),
    }).then(handleResponse),

  deleteApplication: (id: string) =>
    fetch(`/api/admin/applications/${id}`, {
      method: "DELETE",
      headers: authHeaders(),
    }).then(handleResponse),

  exportApplicationsCsv: () => {
    const token = getToken();
    window.open(`/api/admin/applications/export?token=${token}`, "_blank");
  },
};
