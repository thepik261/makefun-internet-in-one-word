// The Internet in One Word — make.fun bounty entry.
// Writes one word describing the whole internet to /output/entry.txt.
// The sealed gate requires 1-30 UTF-8 characters, not only whitespace;
// pure Node stdlib, deterministic, no network.
import { mkdirSync, writeFileSync, chmodSync } from "node:fs";
import { join } from "node:path";

// The gate: /output/entry.txt must be UTF-8 text of 1 to 30
// characters, not only whitespace, and a single word.
const MAX_CHARS = 30;

const LINE = "doomscroll";

if (LINE.length < 1 || LINE.length > MAX_CHARS) {
  throw new Error(`LINE must be 1-${MAX_CHARS} characters, got ${LINE.length}`);
}
if (LINE.trim().length === 0) {
  throw new Error("LINE must not be only whitespace");
}
if (LINE.includes("\n") || LINE.includes("\r")) {
  throw new Error("LINE must be a single line");
}

const outDir = process.env.OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE + "\n", "utf8");
try {
  chmodSync(outPath, 0o644);
} catch {
  // best-effort: file is already written
}
