// =============================================================================
// PROLOG ENGINE WRAPPER (Tau Prolog) — CLIENT ONLY
// =============================================================================
// Tau Prolog's npm package does `require('fs')` at module scope which breaks
// browser bundling (and any SSR pass) with "fs is not defined". We side-step
// the bundler entirely by loading Tau Prolog from a CDN at runtime in the
// browser only. All reasoning still lives in the .pl knowledge base.
// =============================================================================

import { KNOWLEDGE_BASE } from "./knowledgeBase";

export interface Recommendation {
  rank: number;
  name: string;
  brand: string;
  price: number;
  score: number;
  reasons: string[];
}

export type DeviceType = "laptop" | "mobile";
export type UserPrefs = Record<string, string | number>;

let plPromise: Promise<any> | null = null;

function loadScript(src: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const existing = document.querySelector(`script[data-src="${src}"]`);
    if (existing) {
      if ((existing as any)._loaded) return resolve();
      existing.addEventListener("load", () => resolve());
      existing.addEventListener("error", () => reject(new Error("Failed to load " + src)));
      return;
    }
    const s = document.createElement("script");
    s.src = src;
    s.async = true;
    s.dataset.src = src;
    s.onload = () => {
      (s as any)._loaded = true;
      resolve();
    };
    s.onerror = () => reject(new Error("Failed to load " + src));
    document.head.appendChild(s);
  });
}

async function loadProlog(): Promise<any> {
  if (typeof window === "undefined") {
    throw new Error("Prolog engine is only available in the browser");
  }
  if (plPromise) return plPromise;
  plPromise = (async () => {
    const CDN = "https://cdn.jsdelivr.net/npm/tau-prolog@0.3.4";
    await loadScript(`${CDN}/modules/core.js`);
    await loadScript(`${CDN}/modules/lists.js`);
    const pl = (window as any).pl;
    if (!pl) throw new Error("Tau Prolog failed to initialise");
    return pl;
  })();
  return plPromise;
}

function quoteAtom(value: string): string {
  if (/^[a-z][a-zA-Z0-9_]*$/.test(value)) return value;
  return `'${value.replace(/'/g, "\\'")}'`;
}

function prefsToFacts(prefs: UserPrefs): string {
  return Object.entries(prefs)
    .filter(([, v]) => v !== undefined && v !== null && v !== "")
    .map(([k, v]) => {
      const val = typeof v === "number" ? String(v) : quoteAtom(String(v));
      return `user_pref(${k}, ${val}).`;
    })
    .join("\n");
}

function termToJs(term: any): any {
  if (term == null) return null;
  if (typeof term.value === "number") return term.value;
  if (term.args && term.args.length === 0 && term.id !== undefined) return term.id;
  if (typeof term.toString === "function") {
    let s = term.toString();
    if (s.startsWith("'") && s.endsWith("'")) s = s.slice(1, -1);
    return s;
  }
  return term;
}

function consult(session: any, program: string): Promise<void> {
  return new Promise((resolve, reject) => {
    session.consult(program, {
      success: () => resolve(),
      error: (err: any) => reject(new Error("Prolog consult error: " + String(err))),
    });
  });
}

function runQuery(session: any, goal: string): Promise<Record<string, any>[]> {
  return new Promise((resolve, reject) => {
    session.query(goal, {
      success: () => {
        const results: Record<string, any>[] = [];
        const next = () => {
          session.answer({
            success: (answer: any) => {
              const row: Record<string, any> = {};
              const links = answer.links || {};
              for (const key of Object.keys(links)) row[key] = termToJs(links[key]);
              results.push(row);
              next();
            },
            fail: () => resolve(results),
            error: (err: any) => reject(new Error("Prolog query error: " + String(err))),
            limit: () => resolve(results),
          });
        };
        next();
      },
      error: (err: any) => reject(new Error("Prolog goal error: " + String(err))),
    });
  });
}

export async function getRecommendations(
  type: DeviceType,
  prefs: UserPrefs,
): Promise<Recommendation[]> {
  if (typeof window === "undefined") return [];
  const pl = await loadProlog();
  const session = pl.create(2_000_000);
  const program = `${KNOWLEDGE_BASE}\n${prefsToFacts(prefs)}\n`;
  await consult(session, program);
  const rows = await runQuery(
    session,
    `recommend(${type}, Rank, Name, Brand, Price, Score, Why).`,
  );
  return rows
    .map((r) => ({
      rank: Number(r.Rank),
      name: String(r.Name),
      brand: String(r.Brand),
      price: Number(r.Price),
      score: Number(r.Score),
      reasons: String(r.Why || "")
        .split("||")
        .map((s) => s.trim())
        .filter(Boolean),
    }))
    .sort((a, b) => a.rank - b.rank);
}

export interface CatalogItem {
  name: string;
  brand: string;
  price: number;
  a: number;
  b: number;
  c: number;
}

export async function getCatalog(type: DeviceType): Promise<CatalogItem[]> {
  if (typeof window === "undefined") return [];
  const pl = await loadProlog();
  const session = pl.create(2_000_000);
  await consult(session, `${KNOWLEDGE_BASE}\n`);
  const rows = await runQuery(
    session,
    `catalog(${type}, Name, Brand, Price, A, B, C).`,
  );
  return rows
    .map((r) => ({
      name: String(r.Name),
      brand: String(r.Brand),
      price: Number(r.Price),
      a: Number(r.A),
      b: Number(r.B),
      c: Number(r.C),
    }))
    .sort((x, y) => x.price - y.price);
}
