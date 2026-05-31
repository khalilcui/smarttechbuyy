import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Laptop, Smartphone, GitCompare, Loader2 } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getCatalog, type DeviceType } from "@/lib/prolog/engine";

export const Route = createFileRoute("/compare")({
  head: () => ({
    meta: [
      { title: "Compare Devices — Smart Tech Buy Advisor" },
      { name: "description", content: "Compare two laptops or phones side-by-side with Prolog-computed scores." },
      { property: "og:title", content: "Compare Devices — Smart Tech Buy Advisor" },
      { property: "og:description", content: "Side-by-side device comparison powered by Prolog." },
    ],
  }),
  component: Compare,
});

function Compare() {
  const { t } = useTranslation();
  const [type, setType] = useState<DeviceType>("laptop");
  const { data, isFetching, error } = useQuery({
    queryKey: ["catalog", type],
    queryFn: () => getCatalog(type),
    // Tau Prolog runs only in the browser.
    enabled: typeof window !== "undefined",
    staleTime: 5 * 60_000,
  });
  const items = data ?? [];
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(1);

  // Reset picker indices when catalog changes / loads.
  useEffect(() => {
    if (items.length >= 2) {
      setLeft(0);
      setRight(1);
    }
  }, [type, items.length]);

  const a = items[left];
  const b = items[right];
  const labels =
    type === "laptop"
      ? [t("compare.gaming"), t("compare.ai"), t("compare.battery")]
      : [t("compare.camera"), t("compare.gaming"), t("compare.battery")];

  return (
    <main className="relative min-h-screen grid-bg px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-display flex items-center gap-2 text-2xl font-black sm:text-3xl">
          <GitCompare className="h-7 w-7 text-primary" /> <span className="text-gradient">{t("compare.title")}</span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{t("compare.subtitle")}</p>

        <div className="mt-6 inline-flex rounded-xl border border-border bg-background/40 p-1">
          <Tab active={type === "laptop"} onClick={() => setType("laptop")}>
            <Laptop className="h-4 w-4" /> {t("common.laptops")}
          </Tab>
          <Tab active={type === "mobile"} onClick={() => setType("mobile")}>
            <Smartphone className="h-4 w-4" /> {t("common.mobiles")}
          </Tab>
        </div>

        {isFetching && items.length === 0 && (
          <div className="mt-12 flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-3 text-sm text-muted-foreground">{t("compare.empty")}</p>
          </div>
        )}

        {error && (
          <div className="mt-6 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
            {(error as Error).message}
          </div>
        )}

        {items.length >= 2 && (
          <>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              <Picker label={t("compare.pickLeft")} items={items.map((i) => i.name)} value={left} onChange={setLeft} />
              <Picker label={t("compare.pickRight")} items={items.map((i) => i.name)} value={right} onChange={setRight} />
            </div>

            {a && b && (
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                {[a, b].map((item, idx) => (
                  <motion.div key={`${item.name}-${idx}`} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-5">
                    <div className="text-xs uppercase tracking-wide text-muted-foreground">{item.brand}</div>
                    <h3 className="font-display text-lg font-semibold">{item.name}</h3>
                    <div className="font-display mt-1 text-2xl font-bold text-gradient">${item.price}</div>
                    <div className="mt-4 space-y-3">
                      {[item.a, item.b, item.c].map((val, i) => {
                        const other = idx === 0 ? [b.a, b.b, b.c][i] : [a.a, a.b, a.c][i];
                        const win = val >= other;
                        return (
                          <div key={i}>
                            <div className="mb-1 flex justify-between text-xs">
                              <span className="text-muted-foreground">{labels[i]}</span>
                              <span className={win ? "font-semibold text-primary" : "text-muted-foreground"}>
                                {val}{win ? " ✓" : ""}
                              </span>
                            </div>
                            <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
                              <div className="bg-gradient-hero h-full" style={{ width: `${val}%` }} />
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </main>
  );
}

function Tab({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-1.5 rounded-lg px-4 py-2 text-sm font-medium transition-all ${
        active ? "bg-primary/15 text-primary" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function Picker({
  label,
  items,
  value,
  onChange,
}: {
  label: string;
  items: string[];
  value: number;
  onChange: (n: number) => void;
}) {
  return (
    <label className="block">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="mt-1 w-full rounded-lg border border-border bg-background/60 px-3 py-2 text-sm"
      >
        {items.map((name, idx) => (
          <option key={`${name}-${idx}`} value={idx}>
            {name}
          </option>
        ))}
      </select>
    </label>
  );
}
