import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { motion } from "framer-motion";
import { Laptop, Smartphone, GitCompare } from "lucide-react";
import { getCatalog, type CatalogItem, type DeviceType } from "@/lib/prolog/engine";

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
  const [type, setType] = useState<DeviceType>("laptop");
  const { data } = useQuery({ queryKey: ["catalog", type], queryFn: () => getCatalog(type) });
  const items = data ?? [];
  const [left, setLeft] = useState(0);
  const [right, setRight] = useState(1);

  const a = items[left];
  const b = items[right];
  const labels = type === "laptop" ? ["Gaming", "AI", "Battery"] : ["Camera", "Gaming", "Battery"];

  return (
    <main className="relative min-h-screen grid-bg px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-display flex items-center gap-2 text-2xl font-black sm:text-3xl">
          <GitCompare className="h-7 w-7 text-primary" /> <span className="text-gradient">Compare</span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Scores below are computed by the Prolog engine.</p>

        <div className="mt-6 inline-flex rounded-xl border border-border bg-background/40 p-1">
          <Tab active={type === "laptop"} onClick={() => { setType("laptop"); setLeft(0); setRight(1); }}><Laptop className="h-4 w-4" /> Laptops</Tab>
          <Tab active={type === "mobile"} onClick={() => { setType("mobile"); setLeft(0); setRight(1); }}><Smartphone className="h-4 w-4" /> Mobiles</Tab>
        </div>

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          <Picker items={items} value={left} onChange={setLeft} />
          <Picker items={items} value={right} onChange={setRight} />
        </div>

        {a && b && (
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {[a, b].map((item, idx) => (
              <motion.div key={idx} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className="glass rounded-2xl p-5">
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
                          <span className={win ? "font-semibold text-primary" : "text-muted-foreground"}>{val}{win ? " ✓" : ""}</span>
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
      </div>
    </main>
  );
}

function Tab({ active, onClick, children }: { active: boolean; onClick: () => void; children: React.ReactNode }) {
  return (
    <button onClick={onClick} className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${active ? "bg-gradient-hero text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
      {children}
    </button>
  );
}

function Picker({ items, value, onChange }: { items: CatalogItem[]; value: number; onChange: (n: number) => void }) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(Number(e.target.value))}
      className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none focus:border-primary"
    >
      {items.map((it, i) => (
        <option key={it.name} value={i}>{it.name} — ${it.price}</option>
      ))}
    </select>
  );
}
