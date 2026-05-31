import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState } from "react";
import { UserPlus } from "lucide-react";
import { useAuth } from "@/components/AuthProvider";

export const Route = createFileRoute("/signup")({
  head: () => ({ meta: [{ title: "Sign up — Smart Tech Buy Advisor" }, { name: "description", content: "Create your Smart Tech Buy account." }] }),
  component: Signup,
});

function Signup() {
  const { signup, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(true);

  function submit(e: React.FormEvent) {
    e.preventDefault();
    signup(name, email, password, remember);
    navigate({ to: "/dashboard" });
  }

  return (
    <main className="relative grid min-h-screen place-items-center grid-bg px-6 py-12">
      <div className="glass w-full max-w-md rounded-2xl p-8">
        <h1 className="font-display flex items-center gap-2 text-2xl font-black">
          <UserPlus className="h-6 w-6 text-primary" /> Create account
        </h1>
        <form onSubmit={submit} className="mt-6 space-y-3">
          <input required value={name} onChange={(e) => setName(e.target.value)} placeholder="Full name" className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none focus:border-primary" />
          <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none focus:border-primary" />
          <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" className="w-full rounded-xl border border-border bg-background/50 px-4 py-3 text-sm outline-none focus:border-primary" />
          <label className="flex items-center gap-2 text-sm text-muted-foreground">
            <input type="checkbox" checked={remember} onChange={(e) => setRemember(e.target.checked)} /> Remember me
          </label>
          <button type="submit" className="bg-gradient-hero w-full rounded-xl px-6 py-3 font-semibold text-primary-foreground glow">Create account</button>
        </form>
        <button onClick={() => { loginWithGoogle(); navigate({ to: "/dashboard" }); }} className="mt-3 w-full rounded-xl border border-border bg-background/40 px-6 py-3 text-sm font-medium hover:border-primary">
          Continue with Google
        </button>
        <p className="mt-4 text-center text-sm text-muted-foreground">
          Already have an account? <Link to="/login" className="text-primary hover:underline">Sign in</Link>
        </p>
      </div>
    </main>
  );
}
