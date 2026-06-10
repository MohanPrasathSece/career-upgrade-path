import { Phone } from "lucide-react";

export function CallButton() {
  return (
    <a
      href="tel:+447944624039"
      aria-label="Call Admissions"
      className="fixed bottom-[9.5rem] right-6 z-50 grid h-12 w-12 place-items-center rounded-full bg-primary text-white shadow-glow transition hover:scale-110 active:scale-95"
    >
      <Phone className="h-5 w-5" strokeWidth={2.5} fill="currentColor" />
      <span className="absolute -top-1 -right-1 h-3 w-3 animate-ping rounded-full bg-primary opacity-75" />
    </a>
  );
}
