import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { LogIn } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

export const Route = createFileRoute("/login")({
  head: () => ({ meta: [{ title: "Login — Smart Tech Buy Advisor" }, { name: "description", content: "Sign in to your Smart Tech Buy account." }] }),
  component: Login,
});

function Login() {
  const { login, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);
  const [error, setError] = useState("");

  function submit(e: React.FormEvent) {
    e.preventDefault();
    if (login(email, password, remember)) navigate({ to: "/dashboard" });
    else setError("Invalid email or password. New here? Create an account.");
  }

  return (
    <main className="relative grid min-h-screen place-items-center grid-bg px-6 py-12">
      <div className="glass w-full max-w-md rounded-2xl p-8">
        <h1 className="font-display flex items-center gap-2 text-2xl font-black">
          <LogIn className="h-6 w-6 text-primary" /> Welcome back
        </h1>
        {error && <p className="mt-3 rounded-lg border border-destructive/50 bg-destructive/10 p-3 text-sm text-destructive">{error}</p>}
        <form onSubmit={submit} className="mt-6 space-y-3">
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none focus:border-primary" />
          <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none focus:border-primary" />
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /> Remember me
          </label>
          <button type="submit" className="bg-gradient-hero w-full rounded-xl px-6 py-3 font-semibold text-primary-foreground glow">Sign in</button>
        </form>
        <button onClick={() => { loginWithGoogle(); navigate({ to: "/dashboard" }); }} className="mt-3 w-full rounded-xl border border-border bg-background/40 px-6 py-3 text-sm font-medium hover:border-primary">
          Continue with Google
        </button>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          No account? <Link to="/signup" className="text-primary hover:underline">Sign up</Link>
        </p>
      </div>
    </main>
  );
}
