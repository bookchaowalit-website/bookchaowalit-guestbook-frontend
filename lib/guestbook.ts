export type Entry = { id: string; name: string; message: string; at: number };

export const MAX_ENTRIES = 40;
export const MAX_NAME = 60;
export const MAX_MESSAGE = 500;

const INVISIBLE = /[\u200B-\u200D\u2060\uFEFF\u00AD]/g;

/** Cut to `max` UTF-16 units without leaving half of a surrogate pair (emoji) behind. */
export function clipText(value: string, max: number): string {
  if (value.length <= max) return value;
  const end = /[\uD800-\uDBFF]/.test(value[max - 1]) ? max - 1 : max;
  return value.slice(0, end);
}

function hasVisibleText(value: string): boolean {
  return value.replace(INVISIBLE, "").trim() !== "";
}

/** Largest |timestamp| a JS Date accepts; beyond it toISOString() throws. */
const MAX_DATE_MS = 8.64e15;

/** "entry" / "entries" for the device counter. */
export function entriesNoun(count: number): string {
  return count === 1 ? "entry" : "entries";
}

export function signEntry(entries: Entry[], name: string, message: string, id: string, at: number): Entry[] | { error: string } {
  const cleanName = clipText(name.trim(), MAX_NAME);
  const cleanMessage = clipText(message.trim(), MAX_MESSAGE);
  if (!hasVisibleText(cleanName) || !hasVisibleText(cleanMessage)) return { error: "Add both a name and a note before pressing the seal." };
  return [{ id, name: cleanName, message: cleanMessage, at }, ...entries].slice(0, MAX_ENTRIES);
}

export function parseEntries(raw: string | null): Entry[] | null {
  if (!raw) return null;
  try {
    const data: unknown = JSON.parse(raw.replace(/^\uFEFF/, ""));
    if (!Array.isArray(data)) return null;
    const seen = new Set<string>();
    return data.filter((item): item is Entry => {
      if (typeof item !== "object" || item === null) return false;
      const entry = item as Record<string, unknown>;
      // `at` must be a real Date (1e20 is finite but toISOString() throws on it);
      // a repeated id would collide as a React key and be removed twice.
      const ok = typeof entry.id === "string" && !seen.has(entry.id) && typeof entry.name === "string" && typeof entry.message === "string" && typeof entry.at === "number" && Number.isFinite(entry.at) && Math.abs(entry.at) <= MAX_DATE_MS;
      if (ok) seen.add(entry.id as string);
      return ok;
    }).slice(0, MAX_ENTRIES);
  } catch {
    return null;
  }
}

/** Remove one entry by id (every entry lives on this device, so any may be removed). */
export function removeEntry(entries: Entry[], id: string): Entry[] {
  return entries.filter((entry) => entry.id !== id);
}
