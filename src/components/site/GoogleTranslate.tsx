import { useEffect, useState } from "react";
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

const GoogleTranslate = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLang, setActiveLang] = useState("en");

  // Inject the hidden Google Translate widget
  useEffect(() => {
    window.googleTranslateElementInit = () => {
      if (window.google?.translate) {
        new window.google.translate.TranslateElement(
          {
            pageLanguage: "en",
            includedLanguages: "en,fr,es,pt",
            autoDisplay: false,
          },
          "google_translate_element"
        );
      }
    };

    const scriptId = "google-translate-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src =
        "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  const changeLanguage = (code: string) => {
    // Set the googtrans cookie that the widget reads
    const cookieValue = code === "en" ? "/en/en" : `/en/${code}`;
    document.cookie = `googtrans=${cookieValue}; path=/`;
    document.cookie = `googtrans=${cookieValue}; path=/; domain=${window.location.hostname}`;

    setActiveLang(code);
    setIsOpen(false);

    // Reload so the widget picks up the new cookie
    window.location.reload();
  };

  // Close dropdown when clicking outside
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

  // Sync active lang from cookie on mount
  useEffect(() => {
    const match = document.cookie.match(/googtrans=\/en\/([a-z]+)/);
    if (match && match[1]) {
      setActiveLang(match[1]);
    }
  }, []);

  return (
    <div className="relative translate-dropdown">
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2 px-3 py-1.5"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Globe className="w-4 h-4" />
        <span>{LANGUAGES.find((l) => l.code === activeLang)?.label ?? "EN"}</span>
      </Button>

      <div
        className={`absolute right-0 mt-2 w-48 bg-white rounded shadow-md border border-gray-200 transition-opacity duration-200 ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
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
              activeLang === l.code ? "font-medium" : ""
            }`}
          >
            {l.name}
          </button>
        ))}
      </div>

      {/* Hidden container required by Google Translate widget */}
      <div
        id="google_translate_element"
        style={{
          position: "absolute",
          left: "-9999px",
          top: "-9999px",
          width: "0",
          height: "0",
          overflow: "hidden",
        }}
      />
    </div>
  );
};

export default GoogleTranslate;
