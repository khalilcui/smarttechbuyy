import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

// Lightweight client-side demo auth (Remember Me + session + profile).
// NOTE: For production-grade auth (Gmail login, secure passwords, reset email),
// enable Lovable Cloud. This keeps the UI fully functional in the meantime.
export interface User {
  name: string;
  email: string;
}

interface AuthCtx {
  user: User | null;
  signup: (name: string, email: string, password: string, remember: boolean) => void;
  login: (email: string, password: string, remember: boolean) => boolean;
  loginWithGoogle: () => void;
  logout: () => void;
}

const Ctx = createContext<AuthCtx | null>(null);

interface StoredUser extends User {
  password: string;
}

function readUsers(): Record<string, StoredUser> {
  try {
    return JSON.parse(localStorage.getItem("stb-users") || "{}");
  } catch {
    return {};
  }
}

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem("stb-session") || sessionStorage.getItem("stb-session");
    if (raw) {
      try {
        setUser(JSON.parse(raw));
      } catch {
        /* ignore */
      }
    }
  }, []);

  function persist(u: User, remember: boolean) {
    setUser(u);
    const store = remember ? localStorage : sessionStorage;
    store.setItem("stb-session", JSON.stringify(u));
  }

  const value: AuthCtx = {
    user,
    signup(name, email, password, remember) {
      const users = readUsers();
      users[email] = { name, email, password };
      localStorage.setItem("stb-users", JSON.stringify(users));
      persist({ name, email }, remember);
    },
    login(email, password, remember) {
      const users = readUsers();
      const found = users[email];
      if (found && found.password === password) {
        persist({ name: found.name, email }, remember);
        return true;
      }
      return false;
    },
    loginWithGoogle() {
      persist({ name: "Google User", email: "user@gmail.com" }, true);
    },
    logout() {
      setUser(null);
      localStorage.removeItem("stb-session");
      sessionStorage.removeItem("stb-session");
    },
  };

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useAuth() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
