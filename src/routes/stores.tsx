import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MapPin, Phone, Star, Navigation } from "lucide-react";

export const Route = createFileRoute("/stores")({
  head: () => ({
    meta: [
      { title: "Nearby Stores — Smart Tech Buy Advisor" },
      { name: "description", content: "Find trusted electronics stores near you to buy your recommended device." },
      { property: "og:title", content: "Nearby Stores — Smart Tech Buy Advisor" },
      { property: "og:description", content: "Trusted tech retailers and their details." },
    ],
  }),
  component: Stores,
});

const STORES = [
  { name: "TechHub Electronics", city: "Karachi", phone: "+92 21 1234567", rating: 4.7, tags: ["Laptops", "Mobiles", "Repairs"] },
  { name: "Galaxy Computers", city: "Lahore", phone: "+92 42 7654321", rating: 4.5, tags: ["Gaming PCs", "Laptops"] },
  { name: "Mobile World", city: "Islamabad", phone: "+92 51 2223344", rating: 4.8, tags: ["Flagships", "Accessories"] },
  { name: "Digital Bazaar", city: "Peshawar", phone: "+92 91 5566778", rating: 4.3, tags: ["Budget Phones", "Laptops"] },
  { name: "CyberZone", city: "Faisalabad", phone: "+92 41 9988776", rating: 4.6, tags: ["Gaming", "AI PCs"] },
  { name: "Smart Gadgets", city: "Multan", phone: "+92 61 3344556", rating: 4.4, tags: ["Mobiles", "Wearables"] },
];

function Stores() {
  return (
    <main className="relative min-h-screen grid-bg px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-display flex items-center gap-2 text-2xl font-black sm:text-3xl">
          <MapPin className="h-7 w-7 text-primary" /> <span className="text-gradient">Nearby Stores</span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Trusted retailers where you can buy your recommended device.</p>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {STORES.map((s, i) => (
            <motion.div key={s.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-2xl p-5">
              <div className="flex items-start justify-between">
                <h3 className="font-display text-lg font-semibold">{s.name}</h3>
                <span className="flex items-center gap-1 text-sm text-primary"><Star className="h-4 w-4 fill-current" />{s.rating}</span>
              </div>
              <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground"><MapPin className="h-4 w-4" />{s.city}</p>
              <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground"><Phone className="h-4 w-4" />{s.phone}</p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                {s.tags.map((t) => (
                  <span key={t} className="rounded-full border border-border bg-background/40 px-2.5 py-0.5 text-xs">{t}</span>
                ))}
              </div>
              <a
                href={`https://www.google.com/maps/search/${encodeURIComponent(s.name + " " + s.city)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                <Navigation className="h-4 w-4" /> Get directions
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
