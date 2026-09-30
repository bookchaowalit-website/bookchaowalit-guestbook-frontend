import { describe, expect, it } from "vitest";
import { MAX_ENTRIES, MAX_NAME, parseEntries, signEntry, type Entry } from "./guestbook";

describe("signEntry", () => {
  it("rejects blank names or notes", () => {
    expect(signEntry([], " ", "hi", "1", 0)).toHaveProperty("error");
    expect(signEntry([], "Ann", "  ", "1", 0)).toHaveProperty("error");
  });

  it("trims, truncates, and prepends the newest entry", () => {
    const first = signEntry([], " Ann ", " hello ", "1", 10) as Entry[];
    const second = signEntry(first, "x".repeat(MAX_NAME + 20), "again", "2", 20) as Entry[];
    expect(first).toEqual([{ id: "1", name: "Ann", message: "hello", at: 10 }]);
    expect(second[0].id).toBe("2");
    expect(second[0].name).toHaveLength(MAX_NAME);
  });

  it("keeps at most MAX_ENTRIES entries", () => {
    let entries: Entry[] = [];
    for (let i = 0; i < MAX_ENTRIES + 5; i++) entries = signEntry(entries, "A", "B", String(i), i) as Entry[];
    expect(entries).toHaveLength(MAX_ENTRIES);
    expect(entries[0].id).toBe(String(MAX_ENTRIES + 4));
  });
});

describe("parseEntries", () => {
  it("handles missing, corrupt, and partially invalid storage", () => {
    expect(parseEntries(null)).toBeNull();
    expect(parseEntries("nope")).toBeNull();
    expect(parseEntries(JSON.stringify([{ id: "1", name: "A", message: "B", at: 1 }, { id: 2 }]))).toEqual([{ id: "1", name: "A", message: "B", at: 1 }]);
  });
});
