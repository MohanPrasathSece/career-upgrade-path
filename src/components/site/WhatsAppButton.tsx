import { MessageCircle } from "lucide-react";

export function WhatsAppButton() {
  return (
    <a
      href="https://wa.me/442045381200?text=Hi%20Career%20Upgrade%2C%20I%27m%20interested%20in%20your%20Dental%20Nursing%20course."
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-6 right-6 z-50 grid h-14 w-14 place-items-center rounded-full bg-[oklch(0.72_0.18_150)] text-white shadow-glow transition hover:scale-110"
    >
      <MessageCircle className="h-6 w-6" fill="currentColor" />
      <span className="absolute -top-1 -right-1 h-3 w-3 animate-ping rounded-full bg-lemon" />
    </a>
  );
}
