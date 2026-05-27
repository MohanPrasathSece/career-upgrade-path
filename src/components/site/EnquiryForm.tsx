import { useState } from "react";
import { Send, CheckCircle2, AlertCircle } from "lucide-react";

export function EnquiryForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    date_of_birth: "",
    course: "",
    funding_type: "",
    when_to_start: "",
    additional_info: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    try {
      const res = await fetch("/api/enquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to send enquiry");
      setStatus("success");
      setFormData({
        name: "", email: "", phone: "", address: "", date_of_birth: "",
        course: "", funding_type: "", when_to_start: "", additional_info: "", message: "",
      });
    } catch {
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  if (status === "success") {
    return (
      <div className="bg-green-500/10 border border-green-500/20 rounded-2xl p-8 text-center">
        <div className="h-12 w-12 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
          <CheckCircle2 className="h-6 w-6 text-green-500" />
        </div>
        <h3 className="text-xl font-semibold text-white mb-2">Enquiry Sent!</h3>
        <p className="text-slate-400">Thank you for getting in touch. We will get back to you shortly.</p>
        <button
          onClick={() => setStatus("idle")}
          className="mt-6 px-6 py-2 bg-slate-800 hover:bg-slate-700 text-white rounded-xl transition text-sm font-medium"
        >
          Send another enquiry
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {status === "error" && (
        <div className="bg-red-500/10 border border-red-500/20 rounded-xl p-4 flex items-center gap-3">
          <AlertCircle className="h-5 w-5 text-red-500" />
          <p className="text-red-400 text-sm">Failed to send enquiry. Please try again.</p>
        </div>
      )}

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-300">Full Name *</label>
          <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 transition" placeholder="John Doe" />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-300">Email Address *</label>
          <input required type="email" name="email" value={formData.email} onChange={handleChange} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 transition" placeholder="john@example.com" />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-300">Phone Number</label>
          <input type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 transition" placeholder="+44 1234 567890" />
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-300">Date of Birth</label>
          <input type="date" name="date_of_birth" value={formData.date_of_birth} onChange={handleChange} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 transition" />
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-300">Full Address</label>
        <input type="text" name="address" value={formData.address} onChange={handleChange} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 transition" placeholder="123 Main St, London, UK" />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-300">Course of Interest</label>
          <select name="course" value={formData.course} onChange={handleChange} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition appearance-none">
            <option value="">Select a course...</option>
            <option value="Dental Nursing - 1 Year">Dental Nursing - 1 Year</option>
            <option value="Government Funded Route">Government Funded Route</option>
            <option value="Other">Other / Not sure</option>
          </select>
        </div>
        <div className="space-y-1.5">
          <label className="text-sm font-medium text-slate-300">Funding Type</label>
          <select name="funding_type" value={formData.funding_type} onChange={handleChange} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition appearance-none">
            <option value="">Select funding type...</option>
            <option value="Self-Funded">Self-Funded</option>
            <option value="Government Funded (AEB/Skills Bootcamp)">Government Funded (AEB/Skills Bootcamp)</option>
            <option value="Employer Funded">Employer Funded</option>
          </select>
        </div>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-300">When would you like to start?</label>
        <select name="when_to_start" value={formData.when_to_start} onChange={handleChange} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-primary/50 transition appearance-none">
          <option value="">Select start time...</option>
          <option value="As soon as possible">As soon as possible</option>
          <option value="Within 1 month">Within 1 month</option>
          <option value="Within 3 months">Within 3 months</option>
          <option value="Just inquiring">Just inquiring</option>
        </select>
      </div>

      <div className="space-y-1.5">
        <label className="text-sm font-medium text-slate-300">Your Message / Additional Info *</label>
        <textarea required name="message" value={formData.message} onChange={handleChange} rows={4} className="w-full bg-slate-900 border border-slate-800 rounded-xl px-4 py-3 text-white placeholder-slate-500 focus:outline-none focus:border-primary/50 transition resize-none" placeholder="Tell us about your background and goals..." />
      </div>

      <button disabled={loading} type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-semibold py-4 rounded-xl transition flex items-center justify-center gap-2 disabled:opacity-70">
        {loading ? "Sending..." : "Send Enquiry"}
        <Send className="h-5 w-5" />
      </button>
    </form>
  );
}
