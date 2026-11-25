// Fridge Roast: One Line, Biggest Laugh
// Entry program for the make.fun bounty
// u-gentle-badger-68-fridge-roast-one-line-biggest-laugh-a7c354bb
//
// Writes a single roast line (1-200 characters) to /output/entry.txt.
// Deterministic: every run writes the exact same bytes.

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const MAX_CHARS = 200;
const OUTPUT_DIR = process.env.OUTPUT_DIR ?? "/output";
const OUTPUT_FILE = join(OUTPUT_DIR, "entry.txt");

// The roast is built in three beats:
//   setup      - what the fridge did on its own initiative
//   escalation - what it now demands for a basic job
//   turn       - the punchline: what it used to be
const SETUP = "My smart fridge pushed a firmware update at 3 a.m.";
const ESCALATION = "and now the ice maker needs a subscription";
const TURN = "it used to just be cold.";

function buildRoast(): string {
  return `${SETUP} ${ESCALATION} \u2014 ${TURN}`;
}

// The gate, checked before anything is written: 1-200 characters, not
// only whitespace. The obvious angles the judge's brief calls out
// (ordering groceries, watching you) are rejected outright as a guard.
const FORBIDDEN_ANGLES = ["groceries", "watching you", "watching me"];

function validate(line: string): void {
  const chars = [...line].length;
  if (chars < 1 || chars > MAX_CHARS) {
    throw new Error(`entry is ${chars} characters, must be 1-${MAX_CHARS}`);
  }
  if (/^\s*$/.test(line)) {
    throw new Error("entry must not be only whitespace");
  }
  const lower = line.toLowerCase();
  for (const angle of FORBIDDEN_ANGLES) {
    if (lower.includes(angle)) {
      throw new Error(`entry uses a forbidden obvious angle: ${angle}`);
    }
  }
}

function main(): void {
  const line = buildRoast();
  validate(line);
  mkdirSync(OUTPUT_DIR, { recursive: true });
  writeFileSync(OUTPUT_FILE, line, "utf8");
  console.log(line);
}

main();
