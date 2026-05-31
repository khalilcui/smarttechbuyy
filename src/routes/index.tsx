import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { Cpu, Smartphone, Sparkles, BrainCircuit, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Smart Tech Buy Advisor — AI Laptop & Mobile Expert System" },
      {
        name: "description",
        content:
          "Answer 20 questions and our Prolog-powered expert system recommends the perfect laptop or phone for your budget and career — with reasons.",
      },
    ],
  }),
  component: Home,
});

const features = [
  { icon: BrainCircuit, title: "Prolog Reasoning", text: "Every recommendation is computed by a real Prolog inference engine, not guesswork." },
  { icon: Cpu, title: "Laptop Advisor", text: "Ranks laptops on gaming, AI, programming, battery & portability scores." },
  { icon: Smartphone, title: "Mobile Advisor", text: "Finds your ideal phone across camera, gaming, battery and value." },
  { icon: Sparkles, title: "Why this product?", text: "Clear, explainable reasons behind every single suggestion." },
];

function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden grid-bg">
      {/* floating particles */}
      <div className="pointer-events-none absolute inset-0">
        {Array.from({ length: 18 }).map((_, i) => (
          <span
            key={i}
            className="absolute block h-1.5 w-1.5 rounded-full bg-primary/70"
            style={{
              left: `${(i * 53) % 100}%`,
              top: `${(i * 37) % 100}%`,
              animation: `float-up ${6 + (i % 5)}s linear ${i * 0.4}s infinite`,
            }}
          />
        ))}
      </div>

      <section className="relative mx-auto flex max-w-5xl flex-col items-center px-6 pt-24 pb-16 text-center">
        <motion.span
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass mb-6 rounded-full px-4 py-1.5 text-xs font-medium text-primary"
        >
          ⚡ AI Knowledge-Based Expert System · Powered by Prolog
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.05 }}
          className="font-display text-4xl font-black leading-tight sm:text-6xl"
        >
          Choose the <span className="text-gradient">perfect device</span>
          <br /> with real AI reasoning
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.12 }}
          className="mt-5 max-w-2xl text-base text-muted-foreground sm:text-lg"
        >
          Answer 20 quick questions. Our SWI-Prolog inference engine scores 100+ attributes
          and recommends the best laptop or phone for your budget, career and needs.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18 }}
          className="mt-9 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            to="/advisor"
            className="bg-gradient-hero inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-primary-foreground glow transition-transform hover:scale-[1.03]"
          >
            Start the Advisor <ArrowRight className="h-4 w-4" />
          </Link>
          <a
            href="#features"
            className="glass inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold transition-colors hover:text-primary"
          >
            See how it works
          </a>
        </motion.div>

        {/* glowing device mockup */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotateX: 40 }}
          animate={{ opacity: 1, scale: 1, rotateX: 0 }}
          transition={{ delay: 0.25, duration: 0.7 }}
          className="mt-16 w-full max-w-3xl"
        >
          <div className="glass animate-pulse-glow rounded-2xl p-2">
            <div className="bg-gradient-hero rounded-xl p-[1px]">
              <div className="rounded-xl bg-card/90 p-8">
                <div className="grid gap-4 sm:grid-cols-3">
                  {[
                    { k: "AI Score", v: "94" },
                    { k: "Gaming Score", v: "88" },
                    { k: "Battery Score", v: "76" },
                  ].map((s) => (
                    <div key={s.k} className="rounded-lg border border-border bg-background/40 p-4">
                      <div className="font-display text-3xl font-bold text-gradient">{s.v}</div>
                      <div className="mt-1 text-xs text-muted-foreground">{s.k}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section id="features" className="relative mx-auto max-w-6xl px-6 pb-28">
        <h2 className="font-display mb-10 text-center text-2xl font-bold sm:text-3xl">
          Built like a <span className="text-gradient">premium AI platform</span>
        </h2>
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06 }}
              className="glass rounded-2xl p-6 transition-transform hover:-translate-y-1"
            >
              <f.icon className="h-8 w-8 text-primary" />
              <h3 className="font-display mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.text}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}
