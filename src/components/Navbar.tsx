import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { Cpu, Menu, X, LogOut, User as UserIcon } from "lucide-react";
import { useTranslation } from "react-i18next";
import { ThemeSwitcher, LanguageSwitcher } from "./Switchers";
import { useAuth } from "./AuthProvider";

export function Navbar() {
  const { t } = useTranslation();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const links = [
    { to: "/", label: t("nav.home"), exact: true },
    { to: "/features", label: t("nav.features"), exact: false },
    { to: "/advisor", label: t("nav.laptop"), exact: false },
    { to: "/compare", label: t("nav.compare"), exact: false },
    { to: "/career", label: t("nav.career"), exact: false },
    { to: "/stores", label: t("nav.stores"), exact: false },
    { to: "/dashboard", label: t("nav.dashboard"), exact: false },
    { to: "/feedback", label: t("nav.feedback"), exact: false },
    { to: "/contact", label: t("nav.contact"), exact: false },
  ] as const;

  return (
    <header className="sticky top-0 z-40 border-b border-border/60 bg-background/70 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-7xl items-center justify-between gap-2 px-5 py-3">
        <Link to="/" className="flex shrink-0 items-center gap-2 font-display text-lg font-bold">
          <Cpu className="h-5 w-5 text-primary" />
          <span className="text-gradient hidden sm:inline">{t("brand")}</span>
        </Link>

        <div className="hidden items-center gap-0.5 xl:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="rounded-lg px-2.5 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              activeProps={{ className: "rounded-lg px-2.5 py-2 text-sm font-medium text-primary" }}
              activeOptions={{ exact: l.exact }}
            >
              {l.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-1">
          <LanguageSwitcher />
          <ThemeSwitcher />
          {user ? (
            <div className="flex items-center gap-2">
              <span className="hidden items-center gap-1 text-sm text-muted-foreground sm:flex">
                <UserIcon className="h-4 w-4" /> {user.name.split(" ")[0]}
              </span>
              <button
                onClick={logout}
                className="glass inline-flex items-center gap-1 rounded-lg px-3 py-2 text-sm font-medium hover:text-primary"
              >
                <LogOut className="h-4 w-4" /> <span className="hidden sm:inline">{t("nav.logout")}</span>
              </button>
            </div>
          ) : (
            <div className="hidden items-center gap-1 sm:flex">
              <Link to="/login" className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                {t("nav.login")}
              </Link>
              <Link to="/signup" className="bg-gradient-hero rounded-lg px-4 py-2 text-sm font-semibold text-primary-foreground glow">
                {t("nav.signup")}
              </Link>
            </div>
          )}
          <button className="xl:hidden" onClick={() => setOpen((v) => !v)} aria-label="Menu">
            {open ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {open && (
        <div className="border-t border-border/60 bg-background/95 px-5 py-3 xl:hidden">
          <div className="grid grid-cols-2 gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground"
                activeProps={{ className: "rounded-lg px-3 py-2 text-sm font-medium text-primary" }}
                activeOptions={{ exact: l.exact }}
              >
                {l.label}
              </Link>
            ))}
            {!user && (
              <>
                <Link to="/login" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground">
                  {t("nav.login")}
                </Link>
                <Link to="/signup" onClick={() => setOpen(false)} className="rounded-lg px-3 py-2 text-sm font-medium text-primary">
                  {t("nav.signup")}
                </Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
