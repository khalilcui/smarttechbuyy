import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { useTranslation } from "react-i18next";
import i18n, { dirFor, type LangCode } from "@/lib/i18n";

export const THEMES = [
  { id: "default", label: "Dark Blue" },
  { id: "purple", label: "Purple Neon" },
  { id: "green", label: "Cyber Green" },
  { id: "red", label: "Red Gaming" },
  { id: "orange", label: "Orange" },
  { id: "light", label: "Light" },
] as const;

export type ThemeId = (typeof THEMES)[number]["id"] | "custom";

interface PrefsCtx {
  theme: ThemeId;
  setTheme: (t: ThemeId) => void;
  customColor: string;
  setCustomColor: (c: string) => void;
  lang: LangCode;
  setLang: (l: LangCode) => void;
}

const Ctx = createContext<PrefsCtx | null>(null);

function hexToOklchVars(hex: string) {
  // Apply a custom accent by overriding CSS vars directly with the hex.
  const root = document.documentElement;
  root.style.setProperty("--primary", hex);
  root.style.setProperty("--neon", hex);
  root.style.setProperty("--ring", hex);
  root.style.setProperty("--accent", hex);
  root.style.setProperty("--gradient-hero", `linear-gradient(135deg, ${hex}, ${hex})`);
}

function clearCustomVars() {
  const root = document.documentElement;
  ["--primary", "--neon", "--ring", "--accent", "--gradient-hero"].forEach((v) =>
    root.style.removeProperty(v),
  );
}

export function PreferencesProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeId>("default");
  const [customColor, setCustomColorState] = useState("#22d3ee");
  const [lang, setLangState] = useState<LangCode>("en");
  const { i18n: i18nInstance } = useTranslation();

  // Hydrate from localStorage on mount (client only).
  useEffect(() => {
    const savedTheme = (localStorage.getItem("stb-theme") as ThemeId) || "default";
    const savedColor = localStorage.getItem("stb-color") || "#22d3ee";
    const savedLang = (localStorage.getItem("stb-lang") as LangCode) || "en";
    setThemeState(savedTheme);
    setCustomColorState(savedColor);
    setLangState(savedLang);
  }, []);

  // Apply theme to <html>.
  useEffect(() => {
    const root = document.documentElement;
    if (theme === "custom") {
      root.setAttribute("data-theme", "default");
      hexToOklchVars(customColor);
    } else {
      clearCustomVars();
      root.setAttribute("data-theme", theme);
    }
    localStorage.setItem("stb-theme", theme);
  }, [theme, customColor]);

  // Apply language + direction.
  useEffect(() => {
    i18n.changeLanguage(lang);
    i18nInstance.changeLanguage(lang);
    const dir = dirFor(lang);
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", lang);
    localStorage.setItem("stb-lang", lang);
  }, [lang, i18nInstance]);

  const value: PrefsCtx = {
    theme,
    setTheme: setThemeState,
    customColor,
    setCustomColor: (c) => {
      setCustomColorState(c);
      localStorage.setItem("stb-color", c);
      setThemeState("custom");
    },
    lang,
    setLang: setLangState,
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function usePreferences() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("usePreferences must be used within PreferencesProvider");
  return ctx;
}
