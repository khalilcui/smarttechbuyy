import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import {
  BrainCircuit, Cpu, Smartphone, Sparkles, Languages, Palette,
  ShieldCheck, GitCompare, MapPin, MessageSquare,
} from "lucide-react";

export const Route = createFileRoute("/features")({
  head: () => ({
    meta: [
      { title: "Features — Smart Tech Buy Advisor" },
      { name: "description", content: "Explore every feature of the Prolog-powered Smart Tech Buy expert system." },
      { property: "og:title", content: "Features — Smart Tech Buy Advisor" },
      { property: "og:description", content: "Prolog reasoning, multi-language, themes, AI assistant and more." },
    ],
  }),
  component: Features,
});

const FEATURES = [
  { icon: BrainCircuit, title: "Prolog Reasoning", body: "All scoring, ranking and explanations come from a real SWI-Prolog knowledge base." },
  { icon: Cpu, title: "Laptop Advisor", body: "Ranks laptops on gaming, AI, programming, battery and portability." },
  { icon: Smartphone, title: "Mobile Advisor", body: "Finds the ideal phone across camera, gaming, battery and value." },
  { icon: GitCompare, title: "Compare", body: "Put two devices side-by-side with Prolog-computed scores." },
  { icon: Sparkles, title: "AI Assistant", body: "Floating chatbot that explains specs and guides you around the site." },
  { icon: Languages, title: "6 Languages + RTL", body: "English, Urdu, Pashto, Sindhi, Punjabi and Arabic with full RTL." },
  { icon: Palette, title: "Theme Customization", body: "Six neon themes plus a custom color picker, saved automatically." },
  { icon: MapPin, title: "Nearby Stores", body: "Trusted retailers with ratings and directions." },
  { icon: ShieldCheck, title: "Accounts", body: "Signup, login, Remember Me and session management." },
  { icon: MessageSquare, title: "Feedback", body: "Rate the system and help it improve." },
];

function Features() {
  return (
    <main className="relative min-h-screen grid-bg px-6 py-12">
      <div className="mx-auto max-w-6xl">
        <h1 className="font-display text-2xl font-black sm:text-4xl">
          Everything in <span className="text-gradient">one platform</span>
        </h1>
        <p className="mt-2 max-w-2xl text-muted-foreground">A premium, explainable expert system — the intelligence lives entirely in Prolog.</p>

        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((f, i) => (
            <motion.div key={f.title} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="glass rounded-2xl p-6 transition-transform hover:-translate-y-1">
              <f.icon className="h-8 w-8 text-primary" />
              <h3 className="font-display mt-4 text-lg font-semibold">{f.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{f.body}</p>
            </motion.div>
          ))}
        </div>

        <div className="mt-10">
          <Link to="/advisor" className="bg-gradient-hero inline-flex items-center gap-2 rounded-xl px-6 py-3 font-semibold text-primary-foreground glow">
            Start the Advisor
          </Link>
        </div>
      </div>
    </main>
  );
}
