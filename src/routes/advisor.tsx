import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Loader2, ArrowLeft, RotateCcw, Trophy } from "lucide-react";
import { QUESTIONS } from "@/lib/onboarding";
import { getRecommendations, type Recommendation } from "@/lib/prolog/engine";
import { formatPKR } from "@/lib/format";

export const Route = createFileRoute("/advisor")({
  head: () => ({
    meta: [
      { title: "AI Advisor — Smart Tech Buy Advisor" },
      { name: "description", content: "Answer 20 questions to get Prolog-powered laptop & mobile recommendations." },
    ],
  }),
  component: Advisor,
});

type Answers = Record<string, string | number>;

function Advisor() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [results, setResults] = useState<{ laptops: Recommendation[]; mobiles: Recommendation[] } | null>(null);

  const total = QUESTIONS.length;
  const q = QUESTIONS[step];
  const progress = Math.round((step / total) * 100);

  function pick(value: string | number) {
    const next = { ...answers, [q.key]: value };
    setAnswers(next);
    if (step < total - 1) {
      setStep(step + 1);
    } else {
      finish(next);
    }
  }

  async function finish(finalAnswers: Answers) {
    setLoading(true);
    setError(null);
    try {
      // map light->portability for stronger Prolog signal
      const prefs: Answers = { ...finalAnswers };
      if (prefs.light === "yes" && !prefs.portability) prefs.portability = "portable";
      const device = String(finalAnswers.device || "both");
      const [laptops, mobiles] = await Promise.all([
        device === "mobile" ? Promise.resolve([]) : getRecommendations("laptop", prefs),
        device === "laptop" ? Promise.resolve([]) : getRecommendations("mobile", prefs),
      ]);
      setResults({ laptops, mobiles });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong running the Prolog engine.");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setAnswers({});
    setStep(0);
    setResults(null);
    setError(null);
  }

  if (loading) {
    return (
      <Centered>
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
        <p className="mt-4 font-display text-lg">Running Prolog inference…</p>
        <p className="text-sm text-muted-foreground">Scoring & ranking devices for your profile</p>
      </Centered>
    );
  }

  if (results) {
    return <Results results={results} onReset={reset} />;
  }

  return (
    <main className="relative min-h-screen grid-bg px-6 py-12">
      <div className="mx-auto max-w-2xl">
        <div className="mb-2 flex items-center justify-between text-sm text-muted-foreground">
          <span>Question {step + 1} of {total}</span>
          <span>{progress}%</span>
        </div>
        <div className="mb-8 h-2 w-full overflow-hidden rounded-full bg-secondary">
          <motion.div
            className="bg-gradient-hero h-full"
            animate={{ width: `${((step + 1) / total) * 100}%` }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
          />
        </div>

        {error && (
          <div className="mb-6 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
            {error}
          </div>
        )}

        <AnimatePresence mode="wait">
          <motion.div
            key={q.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.25 }}
            className="glass rounded-2xl p-6 sm:p-8"
          >
            <h1 className="font-display text-xl font-bold sm:text-2xl">{q.title}</h1>
            {q.hint && <p className="mt-1 text-sm text-muted-foreground">{q.hint}</p>}

            <div className="mt-6 grid gap-3">
              {q.options.map((o) => {
                const active = answers[q.key] === o.value;
                return (
                  <button
                    key={String(o.value)}
                    onClick={() => pick(o.value)}
                    className={`flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-all hover:border-primary hover:bg-primary/5 ${
                      active ? "border-primary bg-primary/10 glow" : "border-border bg-background/40"
                    }`}
                  >
                    <span className="font-medium">{o.label}</span>
                    {active && <Check className="h-4 w-4 text-primary" />}
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        <div className="mt-6 flex items-center justify-between">
          <button
            onClick={() => setStep(Math.max(0, step - 1))}
            disabled={step === 0}
            className="inline-flex items-center gap-2 rounded-lg px-4 py-2 text-sm text-muted-foreground transition-colors hover:text-foreground disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" /> Back
          </button>
          <Link to="/" className="text-sm text-muted-foreground hover:text-foreground">
            Cancel
          </Link>
        </div>
      </div>
    </main>
  );
}

function Results({
  results,
  onReset,
}: {
  results: { laptops: Recommendation[]; mobiles: Recommendation[] };
  onReset: () => void;
}) {
  return (
    <main className="relative min-h-screen grid-bg px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <div>
            <h1 className="font-display text-2xl font-black sm:text-3xl">
              Your <span className="text-gradient">recommendations</span>
            </h1>
            <p className="text-sm text-muted-foreground">Reasoned & ranked by the Prolog engine.</p>
          </div>
          <button
            onClick={onReset}
            className="glass inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-semibold hover:text-primary"
          >
            <RotateCcw className="h-4 w-4" /> Start over
          </button>
        </div>

        {results.laptops.length > 0 && (
          <Section title="Best Laptops" items={results.laptops} />
        )}
        {results.mobiles.length > 0 && (
          <Section title="Best Mobiles" items={results.mobiles} />
        )}
        {results.laptops.length === 0 && results.mobiles.length === 0 && (
          <div className="glass rounded-2xl p-8 text-center text-muted-foreground">
            No devices matched your budget. Try increasing the budget and run again.
          </div>
        )}
      </div>
    </main>
  );
}

function Section({ title, items }: { title: string; items: Recommendation[] }) {
  return (
    <section className="mb-12">
      <h2 className="font-display mb-4 text-lg font-bold">{title}</h2>
      <div className="grid gap-4">
        {items.map((r, i) => (
          <motion.div
            key={r.name}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
            className={`glass rounded-2xl p-5 ${i === 0 ? "glow" : ""}`}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                {i === 0 && <Trophy className="h-5 w-5 text-primary" />}
                <div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">
                    #{r.rank} · {r.brand}
                  </div>
                  <h3 className="font-display text-lg font-semibold">{r.name}</h3>
                </div>
              </div>
              <div className="text-right">
                <div className="font-display text-2xl font-bold text-gradient">{formatPKR(r.price)}</div>
                <div className="text-xs text-muted-foreground">Match score {r.score}</div>
              </div>
            </div>

            <div className="mt-4">
              <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Why this product?
              </p>
              <ul className="grid gap-1.5 sm:grid-cols-2">
                {r.reasons.map((reason) => (
                  <li key={reason} className="flex items-start gap-2 text-sm">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                    <span>{reason}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function Centered({ children }: { children: React.ReactNode }) {
  return (
    <main className="grid min-h-screen place-items-center grid-bg px-6">
      <div className="flex flex-col items-center text-center">{children}</div>
    </main>
  );
}
