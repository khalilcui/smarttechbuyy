import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { MapPin, Phone, Star, Navigation, Loader2, Crosshair } from "lucide-react";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/stores")({
  head: () => ({
    meta: [
      { title: "Nearby Stores — Smart Tech Buy Advisor" },
      { name: "description", content: "Find trusted electronics stores near you, ranked by distance from your current location." },
      { property: "og:title", content: "Nearby Stores — Smart Tech Buy Advisor" },
      { property: "og:description", content: "Distance-ranked tech retailers based on your current location." },
    ],
  }),
  component: Stores,
});

interface Store {
  name: string;
  city: string;
  phone: string;
  rating: number;
  tags: string[];
  lat: number;
  lng: number;
}

// Real lat/lng for major Pakistani electronics hubs.
const STORES: Store[] = [
  { name: "TechHub Electronics", city: "Karachi", phone: "+92 21 1234567", rating: 4.7, tags: ["Laptops", "Mobiles", "Repairs"], lat: 24.8607, lng: 67.0011 },
  { name: "Saddar Mobile Market", city: "Karachi", phone: "+92 21 9988123", rating: 4.6, tags: ["Mobiles", "Accessories"], lat: 24.8520, lng: 67.0212 },
  { name: "Galaxy Computers", city: "Lahore", phone: "+92 42 7654321", rating: 4.5, tags: ["Gaming PCs", "Laptops"], lat: 31.5204, lng: 74.3587 },
  { name: "Hafeez Center", city: "Lahore", phone: "+92 42 5544332", rating: 4.4, tags: ["Laptops", "Mobiles", "Parts"], lat: 31.5167, lng: 74.3436 },
  { name: "Mobile World", city: "Islamabad", phone: "+92 51 2223344", rating: 4.8, tags: ["Flagships", "Accessories"], lat: 33.6844, lng: 73.0479 },
  { name: "Blue Area Tech", city: "Islamabad", phone: "+92 51 8877665", rating: 4.5, tags: ["Laptops", "Networking"], lat: 33.7167, lng: 73.0667 },
  { name: "Digital Bazaar", city: "Peshawar", phone: "+92 91 5566778", rating: 4.3, tags: ["Budget Phones", "Laptops"], lat: 34.0151, lng: 71.5249 },
  { name: "CyberZone", city: "Faisalabad", phone: "+92 41 9988776", rating: 4.6, tags: ["Gaming", "AI PCs"], lat: 31.4504, lng: 73.1350 },
  { name: "Smart Gadgets", city: "Multan", phone: "+92 61 3344556", rating: 4.4, tags: ["Mobiles", "Wearables"], lat: 30.1575, lng: 71.5249 },
  { name: "Rawalpindi Tech Plaza", city: "Rawalpindi", phone: "+92 51 1122334", rating: 4.5, tags: ["Laptops", "Mobiles"], lat: 33.5651, lng: 73.0169 },
  { name: "Quetta Electronics", city: "Quetta", phone: "+92 81 4455667", rating: 4.2, tags: ["Mobiles", "Repairs"], lat: 30.1798, lng: 66.9750 },
  { name: "Hyderabad Mobile Hub", city: "Hyderabad", phone: "+92 22 5566778", rating: 4.3, tags: ["Mobiles", "Accessories"], lat: 25.3960, lng: 68.3578 },
];

function haversineKm(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
}

function Stores() {
  const { t } = useTranslation();
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null);
  const [status, setStatus] = useState<"idle" | "locating" | "ok" | "denied" | "unsupported">("idle");

  // Auto-request location on mount (non-blocking; falls back gracefully).
  useEffect(() => {
    requestLocation();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function requestLocation() {
    if (typeof window === "undefined") return;
    if (!("geolocation" in navigator)) {
      setStatus("unsupported");
      return;
    }
    setStatus("locating");
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setCoords({ lat: pos.coords.latitude, lng: pos.coords.longitude });
        setStatus("ok");
      },
      () => setStatus("denied"),
      { enableHighAccuracy: false, timeout: 10_000, maximumAge: 5 * 60_000 },
    );
  }

  const ranked = useMemo(() => {
    if (!coords) return STORES.map((s) => ({ ...s, distance: null as number | null }));
    return STORES.map((s) => ({
      ...s,
      distance: haversineKm(coords.lat, coords.lng, s.lat, s.lng),
    })).sort((a, b) => (a.distance ?? 0) - (b.distance ?? 0));
  }, [coords]);

  return (
    <main className="relative min-h-screen grid-bg px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-display flex items-center gap-2 text-2xl font-black sm:text-3xl">
          <MapPin className="h-7 w-7 text-primary" /> <span className="text-gradient">{t("stores.title")}</span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{t("stores.subtitle")}</p>

        <div className="mt-4 flex flex-wrap items-center gap-3">
          <button
            onClick={requestLocation}
            disabled={status === "locating"}
            className="glass inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold hover:text-primary disabled:opacity-50"
          >
            {status === "locating" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Crosshair className="h-4 w-4" />
            )}
            {status === "locating" ? t("stores.locating") : t("stores.locate")}
          </button>
          {status === "denied" && (
            <span className="text-sm text-destructive">{t("stores.denied")}</span>
          )}
          {status === "ok" && coords && (
            <span className="text-xs text-muted-foreground">
              📍 {coords.lat.toFixed(3)}, {coords.lng.toFixed(3)}
            </span>
          )}
          {status === "idle" && (
            <span className="text-xs text-muted-foreground">{t("stores.locationOff")}</span>
          )}
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {ranked.map((s, i) => (
            <motion.div
              key={s.name}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              className={`glass rounded-2xl p-5 ${i === 0 && s.distance !== null ? "glow" : ""}`}
            >
              <div className="flex items-start justify-between">
                <h3 className="font-display text-lg font-semibold">{s.name}</h3>
                <span className="flex items-center gap-1 text-sm text-primary">
                  <Star className="h-4 w-4 fill-current" />
                  {s.rating}
                </span>
              </div>
              <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {s.city}
              </p>
              <p className="mt-1 flex items-center gap-1 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                {s.phone}
              </p>
              {s.distance !== null && (
                <p className="mt-2 text-sm font-medium text-primary">
                  {t("stores.kmAway", { km: s.distance.toFixed(1) })}
                </p>
              )}
              <div className="mt-3 flex flex-wrap gap-1.5">
                {s.tags.map((tg) => (
                  <span
                    key={tg}
                    className="rounded-full border border-border bg-background/40 px-2.5 py-0.5 text-xs"
                  >
                    {tg}
                  </span>
                ))}
              </div>
              <a
                href={
                  coords
                    ? `https://www.google.com/maps/dir/?api=1&origin=${coords.lat},${coords.lng}&destination=${s.lat},${s.lng}`
                    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(s.name + " " + s.city)}`
                }
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
              >
                <Navigation className="h-4 w-4" /> {t("stores.directions")}
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
