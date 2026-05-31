import { useState } from "react";
import { Palette, Check } from "lucide-react";
import { usePreferences, THEMES, type ThemeId } from "./PreferencesProvider";
import { LANGUAGES } from "@/lib/i18n";

export function ThemeSwitcher() {
  const { theme, setTheme, customColor, setCustomColor } = usePreferences();
  const [open, setOpen] = useState(false);

  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="rounded-lg p-2 text-muted-foreground transition-colors hover:text-foreground"
        aria-label="Theme"
      >
        <Palette className="h-5 w-5" />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="glass absolute right-0 z-50 mt-2 w-52 rounded-xl p-2">
            {THEMES.map((th) => (
              <button
                key={th.id}
                onClick={() => {
                  setTheme(th.id as ThemeId);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-primary/10"
              >
                {th.label}
                {theme === th.id && <Check className="h-4 w-4 text-primary" />}
              </button>
            ))}
            <div className="mt-1 flex items-center justify-between rounded-lg px-3 py-2 text-sm">
              <span>Custom</span>
              <input
                type="color"
                value={customColor}
                onChange={(e) => setCustomColor(e.target.value)}
                className="h-6 w-8 cursor-pointer rounded border-0 bg-transparent"
                aria-label="Custom color"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export function LanguageSwitcher() {
  const { lang, setLang } = usePreferences();
  const [open, setOpen] = useState(false);


  return (
    <div className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="rounded-lg px-2 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
        aria-label="Language"
      >
        🌐
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
          <div className="glass absolute right-0 z-50 mt-2 w-40 rounded-xl p-2">
            {LANGUAGES.map((l) => (
              <button
                key={l.code}
                onClick={() => {
                  setLang(l.code);
                  setOpen(false);
                }}
                className="flex w-full items-center justify-between rounded-lg px-3 py-2 text-sm hover:bg-primary/10"
              >
                {l.label}
                {lang === l.code && <Check className="h-4 w-4 text-primary" />}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}
