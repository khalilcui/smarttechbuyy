// =============================================================================
// PROLOG ENGINE WRAPPER (Tau Prolog)
// =============================================================================
// This file ONLY: loads the Prolog program, asserts the user's answers as
// Prolog facts, runs Prolog queries and parses the results. It contains NO
// recommendation logic — all reasoning happens inside the Prolog program.
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

// User answers -> Prolog `user_pref/2` facts.
export type UserPrefs = Record<string, string | number>;

let plModule: any | null = null;

async function loadProlog() {
  if (plModule) return plModule;
  const mod: any = await import("tau-prolog");
  const pl = mod.default ?? mod;
  // Load the standard library modules the KB relies on.
  const lists: any = await import("tau-prolog/modules/lists.js");
  (lists.default ?? lists)(pl);
  plModule = pl;
  return pl;
}

function quoteAtom(value: string): string {
  // single-quote atoms that aren't simple lowercase identifiers
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
  if (typeof term.value === "number") return term.value; // Num
  if (term.args && term.args.length === 0 && term.id !== undefined) return term.id; // atom
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
              for (const key of Object.keys(links)) {
                row[key] = termToJs(links[key]);
              }
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
  a: number; // laptop: gaming  | mobile: camera
  b: number; // laptop: ai      | mobile: gaming
  c: number; // battery
}

// Lists the full device catalog with headline scores — computed by Prolog.
export async function getCatalog(type: DeviceType): Promise<CatalogItem[]> {
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
