import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Check } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Smart Tech Buy Advisor" },
      { name: "description", content: "Get in touch with the Smart Tech Buy Advisor team." },
      { property: "og:title", content: "Contact — Smart Tech Buy Advisor" },
      { property: "og:description", content: "Questions? Reach out to us." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <main className="relative min-h-screen grid-bg px-6 py-12">
      <div className="mx-auto max-w-4xl">
        <h1 className="font-display text-2xl font-black sm:text-3xl">
          Get in <span className="text-gradient">touch</span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">We usually reply within one business day.</p>

        <div className="mt-8 grid gap-6 md:grid-cols-2">
          <div className="space-y-4">
            {[
              { icon: Mail, label: "Email", value: "hello@smarttechbuy.ai" },
              { icon: Phone, label: "Phone", value: "+92 300 1234567" },
              { icon: MapPin, label: "Address", value: "Tech Tower, Karachi, Pakistan" },
            ].map((c) => (
              <div key={c.label} className="glass flex items-center gap-3 rounded-2xl p-4">
                <c.icon className="h-6 w-6 text-primary" />
                <div>
                  <div className="text-xs uppercase tracking-wide text-muted-foreground">{c.label}</div>
                  <div className="font-medium">{c.value}</div>
                </div>
              </div>
            ))}
          </div>

          {sent ? (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="glass grid place-items-center rounded-2xl p-8 text-center">
              <div>
                <Check className="mx-auto h-10 w-10 text-primary" />
                <p className="mt-3 font-display text-lg font-semibold">Message sent!</p>
                <p className="text-sm text-muted-foreground">Thanks for reaching out.</p>
              </div>
            </motion.div>
          ) : (
            <form onSubmit={(e) => { e.preventDefault(); setSent(true); }} className="glass space-y-3 rounded-2xl p-6">
              <input required placeholder="Your name" className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none focus:border-primary" />
              <input required type="email" placeholder="Your email" className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none focus:border-primary" />
              <textarea required rows={4} placeholder="Your message" className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none focus:border-primary" />
              <button type="submit" className="bg-gradient-hero w-full rounded-xl px-6 py-3 font-semibold text-primary-foreground glow">Send message</button>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}
