import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bot, Send, X, Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";

interface Msg {
  role: "bot" | "user";
  text: string;
}

// Local knowledge for FAQ/spec explanations. Recommendations themselves stay
// in Prolog (the Advisor); this assistant explains terms & guides navigation.
const KNOWLEDGE: { match: RegExp; answer: string }[] = [
  { match: /how.*(use|work|start)/i, answer: "Click ‘Start the Advisor’, answer 20 quick questions, and the Prolog engine ranks the best devices for you with reasons." },
  { match: /\b(rtx|gpu|graphics)\b/i, answer: "An RTX GPU (e.g. RTX 4060) is a dedicated NVIDIA graphics card — great for gaming, 3D, video editing and AI/ML acceleration." },
  { match: /amoled|oled|display|screen/i, answer: "AMOLED/OLED screens light each pixel individually, giving deep blacks, vivid colors and better battery on dark content." },
  { match: /nvme|ssd|storage/i, answer: "An NVMe SSD is ultra-fast flash storage connected over PCIe — far quicker than SATA SSDs or hard drives for boot and load times." },
  { match: /\bnpu\b|ai (chip|processor|engine)/i, answer: "An NPU (Neural Processing Unit) accelerates on-device AI tasks like image processing and assistants, efficiently and offline." },
  { match: /best.*(ai|ml|machine learning).*laptop|laptop.*ai/i, answer: "For AI/ML, pick a laptop with a strong discrete GPU and 32GB RAM. Run the Advisor and choose ‘AI/ML’ — Prolog will rank the best options." },
  { match: /best.*gaming.*(phone|mobile)|gaming phone/i, answer: "A great gaming phone has a flagship SoC, high-refresh AMOLED and big battery. Try the Advisor and select gaming — Prolog will recommend." },
  { match: /compare/i, answer: "Use the Compare page to put two devices side-by-side with Prolog-computed scores." },
  { match: /theme|color|dark|light/i, answer: "Tap the palette icon in the navbar to switch themes (Dark Blue, Purple, Cyber Green, Red, Orange, Light) or pick a custom color." },
  { match: /language|urdu|arabic|pashto|sindhi|punjabi|translat/i, answer: "Use the globe icon to switch language — English, Urdu, Pashto, Sindhi, Punjabi and Arabic, with full RTL support." },
];

function answerFor(q: string): string {
  for (const k of KNOWLEDGE) if (k.match.test(q)) return k.answer;
  return "I can explain specs (RTX, AMOLED, NVMe, NPU), guide you through the site, or you can run the Advisor for a full Prolog-powered recommendation. Try asking ‘Which laptop is best for AI?’.";
}

export function AIAssistant() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Msg[]>([]);
  const endRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messages.length === 0) {
      setMessages([{ role: "bot", text: t("assistant.greeting") }]);
    }
  }, [open, messages.length, t]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  function send() {
    const q = input.trim();
    if (!q) return;
    setMessages((m) => [...m, { role: "user", text: q }, { role: "bot", text: answerFor(q) }]);
    setInput("");
  }

  return (
    <>
      <button
        onClick={() => setOpen((v) => !v)}
        className="bg-gradient-hero glow fixed bottom-5 right-5 z-50 flex h-14 w-14 items-center justify-center rounded-full text-primary-foreground shadow-lg transition-transform hover:scale-110"
        aria-label="AI Assistant"
      >
        {open ? <X className="h-6 w-6" /> : <Bot className="h-6 w-6" />}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            className="glass fixed bottom-24 right-5 z-50 flex h-[28rem] w-[min(22rem,calc(100vw-2.5rem))] flex-col overflow-hidden rounded-2xl"
          >
            <div className="bg-gradient-hero flex items-center gap-2 px-4 py-3 text-primary-foreground">
              <Sparkles className="h-5 w-5" />
              <span className="font-display font-semibold">{t("assistant.title")}</span>
            </div>

            <div className="flex-1 space-y-3 overflow-y-auto p-4">
              {messages.map((m, i) => (
                <div key={i} className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}>
                  <div
                    className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm ${
                      m.role === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-background/60 text-foreground"
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              <div ref={endRef} />
            </div>

            <div className="flex items-center gap-2 border-t border-border p-3">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && send()}
                placeholder={t("common.askPlaceholder")}
                className="flex-1 rounded-lg border border-border bg-background/50 px-3 py-2 text-sm outline-none focus:border-primary"
              />
              <button
                onClick={send}
                className="bg-gradient-hero rounded-lg p-2 text-primary-foreground"
                aria-label={t("common.send")}
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
