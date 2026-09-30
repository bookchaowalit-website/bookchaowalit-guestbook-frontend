export type Entry = { id: string; name: string; message: string; at: number };

export const MAX_ENTRIES = 40;
export const MAX_NAME = 60;
export const MAX_MESSAGE = 500;

export function signEntry(entries: Entry[], name: string, message: string, id: string, at: number): Entry[] | { error: string } {
  const cleanName = name.trim().slice(0, MAX_NAME);
  const cleanMessage = message.trim().slice(0, MAX_MESSAGE);
  if (!cleanName || !cleanMessage) return { error: "Add both a name and a note before pressing the seal." };
  return [{ id, name: cleanName, message: cleanMessage, at }, ...entries].slice(0, MAX_ENTRIES);
}

export function parseEntries(raw: string | null): Entry[] | null {
  if (!raw) return null;
  try {
    const data: unknown = JSON.parse(raw);
    if (!Array.isArray(data)) return null;
    return data.filter((item): item is Entry => {
      if (typeof item !== "object" || item === null) return false;
      const entry = item as Record<string, unknown>;
      return typeof entry.id === "string" && typeof entry.name === "string" && typeof entry.message === "string" && typeof entry.at === "number" && Number.isFinite(entry.at);
    }).slice(0, MAX_ENTRIES);
  } catch {
    return null;
  }
}
