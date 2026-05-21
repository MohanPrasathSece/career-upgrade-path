import { useEffect, useState } from "react";
import { Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }
}

const languages = [
  { code: "en", name: "English", label: "EN" },
  { code: "fr", name: "French", label: "FR" },
  { code: "es", name: "Spanish", label: "ES" },
  { code: "pt", name: "Portuguese", label: "PT" },
];

const GoogleTranslate = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [currentLang, setCurrentLang] = useState("en");

  useEffect(() => {
    // Add Google Translate script if not already present
    const scriptId = "google-translate-script";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
      script.async = true;
      document.body.appendChild(script);
    }

    // Initialize Google Translate globally if not already initialized
    if (!window.googleTranslateElementInit) {
      window.googleTranslateElementInit = () => {
        if (window.google && window.google.translate) {
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
    }

    // Close on click outside
    const handleClickOutside = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (!target.closest(".translate-dropdown-container")) {
        setIsVisible(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLanguageChange = (code: string) => {
    const select = document.querySelector(".goog-te-combo") as HTMLSelectElement;
    if (select) {
      select.value = code;
      select.dispatchEvent(new Event("change"));
      setCurrentLang(code);
      setIsVisible(false);
    }
  };

  return (
    <div className="relative translate-dropdown-container flex items-center">
      <Button
        variant="outline"
        size="sm"
        className={`gap-2 px-3 py-2 text-navy transition-all duration-300 border border-navy/10 rounded-xl font-semibold ${isVisible
          ? "bg-primary/20 shadow-md"
          : "hover:bg-primary/20"
          }`}
        onClick={() => setIsVisible(!isVisible)}
      >
        <Globe className="w-4 h-4 text-gold shrink-0 animate-pulse" />
        <span className="font-bold uppercase tracking-tight text-[11px] sm:text-xs">
          {languages.find((l) => l.code === currentLang)?.label || "EN"}
        </span>
        <span className="text-[11px] sm:text-xs font-bold border-l border-navy/20 pl-2 hidden xl:inline">
          Select Language
        </span>
      </Button>

      {/* Custom Dropdown */}
      <div
        className={`absolute top-full right-0 mt-2 w-44 sm:w-48 bg-white rounded-xl shadow-xl border border-border overflow-hidden transition-all duration-300 z-[100] ${isVisible
          ? "opacity-100 translate-y-0 scale-100"
          : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
          }`}
      >
        <div className="p-2 bg-muted/30 border-b border-border">
          <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest px-2 py-1">
            Select Language
          </p>
        </div>
        <div className="py-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              onClick={() => handleLanguageChange(lang.code)}
              className={`w-full flex items-center justify-between px-4 py-2.5 text-sm transition-all duration-200 hover:bg-gold/5 ${currentLang === lang.code ? "text-navy font-bold bg-gold/5" : "text-muted-foreground"
                }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-mono font-bold bg-muted px-1.5 py-0.5 rounded text-navy/80">{lang.label}</span>
                <span>{lang.name}</span>
              </div>
              {currentLang === lang.code && <div className="w-1.5 h-1.5 rounded-full bg-gold" />}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        /* Hide all of Google's native components and overlays */
        .goog-te-banner-frame { display: none !important; }
        body { top: 0 !important; }
        .goog-te-gadget { display: none !important; }
        .goog-te-menu-frame { display: none !important; }
        .goog-tooltip { display: none !important; }
        .goog-tooltip:hover { display: none !important; }
        .goog-text-highlight { background-color: transparent !important; border: none !important; box-shadow: none !important; }
        .VIpgJd-ZVi9od-ORHb-OEVmcd { display: none !important; }
        #goog-gt-tt { display: none !important; }
      `}</style>
    </div>
  );
};

export default GoogleTranslate;
