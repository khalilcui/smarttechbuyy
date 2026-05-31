// =============================================================================
// SMART TECH BUY ADVISOR — PROLOG KNOWLEDGE BASE LOADER
// =============================================================================
// The actual intelligence lives in real SWI-Prolog source files:
//   src/prolog/laptops.pl  — laptop facts
//   src/prolog/mobiles.pl  — mobile phone facts
//   src/prolog/rules.pl    — inference engine, scoring, ranking, explanations
// They are imported here as raw text and concatenated into one program that
// the Tau Prolog engine consults. JavaScript contains NO recommendation logic.
// =============================================================================

import laptops from "@/prolog/laptops.pl?raw";
import mobiles from "@/prolog/mobiles.pl?raw";
import rules from "@/prolog/rules.pl?raw";

export const KNOWLEDGE_BASE = `:- use_module(library(lists)).\n\n${laptops}\n${mobiles}\n${rules}\n`;
