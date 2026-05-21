
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Globe } from "lucide-react";

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

// Languages supported by the widget
const LANGUAGES = [
  { code: "en", label: "EN", name: "English" },
  { code: "fr", label: "FR", name: "Français" },
  { code: "es", label: "ES", name: "Español" },
  { code: "pt", label: "PT", name: "Português" },
];

const GoogleTranslate = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeLang, setActiveLang] = useState("en");
  const [isReady, setIsReady] = useState(false);

  // Initialise Google Translate widget (hidden)
  useEffect(() => {
    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = () => {
        if (window.google?.translate) {
          new window.google.translate.TranslateElement(
            {
              pageLanguage: "en",
              includedLanguages: "en,fr,es,pt",
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
            },
            "google_translate_element"
          );
          setIsReady(true);
        }
      };
    }
    const scriptId = "google-translate-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      script.onload = () => {
        if (window.googleTranslateElementInit) {
          window.googleTranslateElementInit();
        }
      };
      document.body.appendChild(script);
    }
  }, []);

  // Change language via the hidden select created by Google widget, wait until ready
  const changeLanguage = (code: string) => {
    const attempt = () => {
      const select = document.querySelector('.goog-te-combo') as HTMLSelectElement | null;
      if (select) {
        select.value = code;
        select.dispatchEvent(new Event('change'));
        setActiveLang(code);
        setIsOpen(false);
      }
    };
    if (isReady) {
      attempt();
    } else {
      // retry after a short delay until the widget is ready
      setTimeout(() => changeLanguage(code), 300);
    }
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest('.translate-dropdown')) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleOutside);
    return () => document.removeEventListener('mousedown', handleOutside);
  }, []);

  return (
    <div className="relative translate-dropdown">
      {/* Visible button */}
      <Button
        variant="outline"
        size="sm"
        className="flex items-center gap-2 px-3 py-1.5"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Globe className="w-4 h-4" />
        <span>{LANGUAGES.find(l => l.code === activeLang)?.label}</span>
      </Button>

      {/* Custom dropdown */}
      <div
        className={`absolute right-0 mt-2 w-48 bg-white rounded shadow-md border border-gray-200 transition-opacity duration-200 ${isOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        {LANGUAGES.map(l => (
          <button
            key={l.code}
            onClick={() => changeLanguage(l.code)}
            className={`w-full text-left px-3 py-2 text-sm hover:bg-gray-100 ${activeLang === l.code ? "font-medium" : ""}`}
          >
            {l.name}
          </button>
        ))}
      </div>

      {/* Hidden container required by Google Translate API */}
      <div id="google_translate_element" style={{ position: "absolute", left: "-9999px", top: "-9999px", width: "0", height: "0", overflow: "hidden" }} />
    </div>
  );
};

export default GoogleTranslate;
