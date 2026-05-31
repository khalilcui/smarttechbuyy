import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { motion } from "framer-motion";
import { Loader2, Laptop, Smartphone } from "lucide-react";
import { getCatalog, type CatalogItem, type DeviceType } from "@/lib/prolog/engine";

export const Route = createFileRoute("/browse")({
  head: () => ({
    meta: [
      { title: "Browse Devices — Smart Tech Buy Advisor" },
      { name: "description", content: "Browse all laptops and mobiles with Prolog-computed scores." },
      { property: "og:title", content: "Browse Devices — Smart Tech Buy Advisor" },
      { property: "og:description", content: "All laptops and phones scored by our Prolog expert system." },
    ],
  }),
  component: Browse,
});

function Browse() {
  const [type, setType] = useState<DeviceType>("laptop");
  const { data, isLoading } = useQuery({
    queryKey: ["catalog", type],
    queryFn: () => getCatalog(type),
  });

  return (
    <main className="relative min-h-screen grid-bg px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-display text-2xl font-black sm:text-3xl">
          Browse the <span className="text-gradient">knowledge base</span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Every score below is computed live by the Prolog inference engine.
        </p>

        <div className="mt-6 inline-flex rounded-xl border border-border bg-background/40 p-1">
          <Toggle active={type === "laptop"} onClick={() => setType("laptop")}>
            <Laptop className="h-4 w-4" /> Laptops
          </Toggle>
          <Toggle active={type === "mobile"} onClick={() => setType("mobile")}>
            <Smartphone className="h-4 w-4" /> Mobiles
          </Toggle>
        </div>

        {isLoading ? (
          <div className="mt-16 flex flex-col items-center text-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-3 text-sm text-muted-foreground">Querying Prolog…</p>
          </div>
        ) : (
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {(data ?? []).map((item, i) => (
              <Card key={item.name} item={item} type={type} index={i} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}

function Toggle({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-colors ${
        active ? "bg-gradient-hero text-primary-foreground" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {children}
    </button>
  );
}

function Card({ item, type, index }: { item: CatalogItem; type: DeviceType; index: number }) {
  const labels =
    type === "laptop"
      ? [["Gaming", item.a], ["AI", item.b], ["Battery", item.c]]
      : [["Camera", item.a], ["Gaming", item.b], ["Battery", item.c]];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: Math.min(index * 0.03, 0.3) }}
      className="glass rounded-2xl p-5"
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="text-xs uppercase tracking-wide text-muted-foreground">{item.brand}</div>
          <h3 className="font-display text-base font-semibold">{item.name}</h3>
        </div>
        <div className="font-display text-xl font-bold text-gradient">${item.price}</div>
      </div>
      <div className="mt-4 space-y-2">
        {labels.map(([label, val]) => (
          <div key={String(label)}>
            <div className="mb-1 flex justify-between text-xs text-muted-foreground">
              <span>{label}</span>
              <span>{val}</span>
            </div>
            <div className="h-1.5 w-full overflow-hidden rounded-full bg-secondary">
              <div className="bg-gradient-hero h-full" style={{ width: `${val}%` }} />
            </div>
          </div>
        ))}
      </div>
    </motion.div>
  );
}
