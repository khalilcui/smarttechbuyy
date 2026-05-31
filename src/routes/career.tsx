import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { Loader2, Briefcase, ArrowRight } from "lucide-react";
import { getRecommendations } from "@/lib/prolog/engine";

export const Route = createFileRoute("/career")({
  head: () => ({
    meta: [
      { title: "Career Advisor — Smart Tech Buy Advisor" },
      { name: "description", content: "Get Prolog-powered device recommendations tailored to your career." },
      { property: "og:title", content: "Career Advisor — Smart Tech Buy Advisor" },
      { property: "og:description", content: "Pick your career and let Prolog recommend the right laptop & phone." },
    ],
  }),
  component: Career,
});

const CAREERS = [
  { key: "software_engineer", label: "Software Engineer" },
  { key: "ai_engineer", label: "AI Engineer" },
  { key: "data_scientist", label: "Data Scientist" },
  { key: "cyber_security", label: "Cyber Security Analyst" },
  { key: "ethical_hacker", label: "Ethical Hacker" },
  { key: "graphic_designer", label: "Graphic Designer" },
  { key: "video_editor", label: "Video Editor" },
  { key: "architect", label: "Architect" },
  { key: "business", label: "Business Professional" },
];

function Career() {
  const [career, setCareer] = useState<string | null>(null);
  const { data, isFetching } = useQuery({
    queryKey: ["career", career],
    queryFn: () => getRecommendations("laptop", { career: career!, budget: 3500 }),
    enabled: !!career,
  });

  return (
    <main className="relative min-h-screen grid-bg px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-display flex items-center gap-2 text-2xl font-black sm:text-3xl">
          <Briefcase className="h-7 w-7 text-primary" /> <span className="text-gradient">Career Advisor</span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">Pick your career — Prolog reasons about the best laptops for it.</p>

        <div className="mt-6 flex flex-wrap gap-2">
          {CAREERS.map((c) => (
            <button
              key={c.key}
              onClick={() => setCareer(c.key)}
              className={`rounded-full border px-4 py-2 text-sm font-medium transition-all ${career === c.key ? "border-primary bg-primary/10 text-primary glow" : "border-border bg-background/40 hover:border-primary"}`}
            >
              {c.label}
            </button>
          ))}
        </div>

        {isFetching && (
          <div className="mt-12 flex flex-col items-center">
            <Loader2 className="h-8 w-8 animate-spin text-primary" />
            <p className="mt-3 text-sm text-muted-foreground">Running Prolog inference…</p>
          </div>
        )}

        {data && data.length > 0 && (
          <div className="mt-8 grid gap-4">
            {data.map((r, i) => (
              <motion.div key={r.name} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className={`glass rounded-2xl p-5 ${i === 0 ? "glow" : ""}`}>
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <div className="text-xs uppercase tracking-wide text-muted-foreground">#{r.rank} · {r.brand}</div>
                    <h3 className="font-display text-lg font-semibold">{r.name}</h3>
                  </div>
                  <div className="text-right">
                    <div className="font-display text-2xl font-bold text-gradient">${r.price}</div>
                    <div className="text-xs text-muted-foreground">Match {r.score}</div>
                  </div>
                </div>
                <ul className="mt-3 grid gap-1.5 sm:grid-cols-2">
                  {r.reasons.map((reason) => (
                    <li key={reason} className="text-sm text-muted-foreground">• {reason}</li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        )}

        {career && data && data.length === 0 && !isFetching && (
          <p className="mt-8 text-muted-foreground">No matches found. Try the full Advisor for finer control.</p>
        )}

        <div className="mt-10">
          <Link to="/advisor" className="bg-gradient-hero inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-primary-foreground glow">
            Full Advisor <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </main>
  );
}
