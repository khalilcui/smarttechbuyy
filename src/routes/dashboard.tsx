import { createFileRoute, Link } from "@tanstack/react-router";
import { LayoutDashboard, Laptop, GitCompare, Briefcase, LogIn } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

export const Route = createFileRoute("/dashboard")({
  head: () => ({ meta: [{ title: "Dashboard — Smart Tech Buy Advisor" }, { name: "description", content: "Your Smart Tech Buy dashboard." }] }),
  component: Dashboard,
});

function Dashboard() {
  const { user } = useAuth();

  if (!user) {
    return (
      <main className="relative grid min-h-screen place-items-center grid-bg px-6">
        <div className="glass rounded-2xl p-8 text-center">
          <LogIn className="mx-auto h-10 w-10 text-primary" />
          <p className="mt-3 font-display text-lg font-semibold">Please sign in</p>
          <p className="text-sm text-muted-foreground">Log in to view your dashboard.</p>
          <Link to="/login" className="bg-gradient-hero mt-4 inline-block rounded-xl px-6 py-3 text-sm font-semibold text-primary-foreground glow">Go to login</Link>
        </div>
      </main>
    );
  }

  const cards = [
    { to: "/advisor", icon: Laptop, title: "Run the Advisor", body: "Answer 20 questions for a Prolog recommendation." },
    { to: "/compare", icon: GitCompare, title: "Compare devices", body: "Side-by-side Prolog scores." },
    { to: "/career", icon: Briefcase, title: "Career Advisor", body: "Best devices for your career." },
  ] as const;

  return (
    <main className="relative min-h-screen grid-bg px-6 py-12">
      <div className="mx-auto max-w-5xl">
        <h1 className="font-display flex items-center gap-2 text-2xl font-black sm:text-3xl">
          <LayoutDashboard className="h-7 w-7 text-primary" /> Hi, <span className="text-gradient">{user.name.split(" ")[0]}</span>
        </h1>
        <p className="mt-1 text-sm text-muted-foreground">{user.email}</p>

        <div className="mt-8 grid gap-5 sm:grid-cols-3">
          {cards.map((c) => (
            <Link key={c.to} to={c.to} className="glass rounded-2xl p-6 transition-transform hover:-translate-y-1">
              <c.icon className="h-8 w-8 text-primary" />
              <h3 className="font-display mt-4 text-lg font-semibold">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.body}</p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  );
}
