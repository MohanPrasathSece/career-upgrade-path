import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

const LANGUAGES = [
  { code: "en", label: "EN", name: "English" },
  { code: "fr", label: "FR", name: "Français" },
  { code: "es", label: "ES", name: "Español" },
  { code: "pt", label: "PT", name: "Português" },
];

// Read current lang from cookie without triggering any side effects
function getLangFromCookie(): string {
  const match = document.cookie.match(/googtrans=\/en\/([a-z]+)/);
  return match?.[1] ?? "en";
}

const GoogleTranslate = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLang, setActiveLang] = useState<string>(() => getLangFromCookie());
  const reloading = useRef(false); // guard against reload loop

  // Inject Google Translate widget script once
  useEffect(() => {
    if (typeof window === "undefined") return;

    window.googleTranslateElementInit = () => {
      try {
        if (window.google?.translate) {
          new window.google.translate.TranslateElement(
            { pageLanguage: "en", includedLanguages: "en,fr,es,pt", autoDisplay: false },
            "google_translate_element"
          );
        }
      } catch (_) {
        // silently ignore if blocked by ad blocker
      }
    };

    const scriptId = "google-translate-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.onerror = () => {
        // script blocked by ad blocker — silently ignore
      };
      document.body.appendChild(script);
    }
  }, []);

  const changeLanguage = (code: string) => {
    if (reloading.current) return; // prevent double-trigger
    reloading.current = true;

    const cookieValue = `/en/${code}`;
    document.cookie = `googtrans=${cookieValue}; path=/`;
    document.cookie = `googtrans=${cookieValue}; path=/; domain=${window.location.hostname}`;

    setActiveLang(code);
    setIsOpen(false);

    // Small delay so state settles before reload
    setTimeout(() => {
      window.location.reload();
    }, 50);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".translate-dropdown")) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutside);
    return () => document.removeEventListener("mousedown", handleOutside);
  }, []);

  return (
    <div className="relative translate-dropdown">
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2 px-3 py-1.5"
        onClick={() => setIsOpen((o) => !o)}
      >
        <Globe className="w-4 h-4" />
        <span>{LANGUAGES.find((l) => l.code === activeLang)?.label ?? "EN"}</span>
      </Button>

      {isOpen && (
        <div
          className="absolute right-0 mt-2 w-48 bg-white rounded shadow-md border border-gray-200"
          style={{ zIndex: 1000 }}
        >
          {LANGUAGES.map((l) => (
            <button
              type="button"
              key={l.code}
              onClick={(e) => {
                e.stopPropagation();
                changeLanguage(l.code);
              }}
              className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${
                activeLang === l.code ? "font-medium text-primary" : ""
              }`}
            >
              {l.name}
            </button>
          ))}
        </div>
      )}

      {/* Hidden container required by Google Translate widget */}
      <div
        id="google_translate_element"
        style={{ position: "absolute", left: "-9999px", top: "-9999px", width: 0, height: 0, overflow: "hidden" }}
      />
    </div>
  );
};

export default GoogleTranslate;
