import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { MessageSquare, Star, Check } from "lucide-react";

export const Route = createFileRoute("/feedback")({
  head: () => ({
    meta: [
      { title: "Feedback — Smart Tech Buy Advisor" },
      { name: "description", content: "Share your feedback to help improve the Smart Tech Buy expert system." },
      { property: "og:title", content: "Feedback — Smart Tech Buy Advisor" },
      { property: "og:description", content: "Tell us what you think." },
    ],
  }),
  component: Feedback,
});

function Feedback() {
  const [rating, setRating] = useState(0);
  const [sent, setSent] = useState(false);
  const [text, setText] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    const all = JSON.parse(localStorage.getItem("stb-feedback") || "[]");
    all.push({ rating, text, at: Date.now() });
    localStorage.setItem("stb-feedback", JSON.stringify(all));
    setSent(true);
  }

  return (
    <main className="relative grid min-h-screen place-items-center grid-bg px-6 py-12">
      <div className="w-full max-w-lg">
        <h1 className="font-display flex items-center gap-2 text-2xl font-black sm:text-3xl">
          <MessageSquare className="h-7 w-7 text-primary" /> <span className="text-gradient">Feedback</span>
        </h1>

        {sent ? (
          <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass mt-6 rounded-2xl p-8 text-center">
            <Check className="mx-auto h-10 w-10 text-primary" />
            <p className="mt-3 font-display text-lg font-semibold">Thank you!</p>
            <p className="text-sm text-muted-foreground">Your feedback helps the expert system improve.</p>
          </motion.div>
        ) : (
          <form onSubmit={submit} className="glass mt-6 space-y-4 rounded-2xl p-6">
            <div>
              <label className="text-sm text-muted-foreground">Your rating</label>
              <div className="mt-2 flex gap-1">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button key={n} type="button" onClick={() => setRating(n)} aria-label={`${n} stars`}>
                    <Star className={`h-7 w-7 ${n <= rating ? "fill-primary text-primary" : "text-muted-foreground"}`} />
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="text-sm text-muted-foreground">Your message</label>
              <textarea
                required
                value={text}
                onChange={(e) => setText(e.target.value)}
                rows={4}
                className="mt-2 w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none focus:border-primary"
                placeholder="What did you like? What can we improve?"
              />
            </div>
            <button type="submit" className="bg-gradient-hero w-full rounded-xl px-6 py-3 font-semibold text-primary-foreground glow">
              Submit feedback
            </button>
          </form>
        )}
      </div>
    </main>
  );
}
