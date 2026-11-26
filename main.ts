import { chmodSync, mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The single word this entry must produce.
const chosenWord = "doomscroll";

function fail(message: string): never {
  console.error(`error: ${message}`);
  process.exit(1);
}

function checkWord(word: string): void {
  if (word.length < 1 || word.length > 30) {
    fail("word must be between 1 and 30 characters long");
  }
  if (word.trim().length === 0) {
    fail("word must not be only whitespace");
  }
  if (word.includes("\n") || word.includes("\r")) {
    fail("word must not contain newline characters");
  }
}

function main(): void {
  checkWord(chosenWord);
  const outDir = process.env.OUTPUT_DIR ?? "/output";
  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, `${chosenWord}\n`, { mode: 0o644 });
  // Force the mode explicitly so the umask cannot narrow it.
  chmodSync(target, 0o644);
  console.log(`wrote ${target}`);
}

main();
