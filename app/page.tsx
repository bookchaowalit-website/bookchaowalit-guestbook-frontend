"use client";

import { useState, type FormEvent } from "react";
import { MAX_ENTRIES, MAX_MESSAGE, MAX_NAME, parseEntries, signEntry, type Entry } from "@/lib/guestbook";
import { useStoredState } from "@/lib/use-stored-state";

const EMPTY: Entry[] = [];

export default function Home() {
  const [entries, setEntries] = useStoredState("guestbook-v2", EMPTY, parseEntries);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [saved, setSaved] = useState(false);

  function sign(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const next = signEntry(entries, name, message, crypto.randomUUID(), Date.now());
    if ("error" in next) { setError(next.error); return; }
    setEntries(next);
    setName(""); setMessage(""); setError(""); setSaved(true);
    window.setTimeout(() => setSaved(false), 2200);
  }

  return (
    <main className="ledger-shell">
      <header className="ledger-header">
        <div className="seal" aria-hidden="true">B</div>
        <div>
          <p className="eyebrow">BOOKCHAOWALIT · VISITOR REGISTER</p>
          <h1>Leave a trace.</h1>
          <p className="lede">A small local guestbook for notes, hellos, and passing thoughts.</p>
        </div>
        <div className="header-note"><span>REGISTER 02</span><strong>{String(entries.length).padStart(2, "0")}</strong><span>entries on this device</span></div>
      </header>
      <div className="ledger-rule" />
      <section className="ledger-grid" aria-label="Guestbook register">
        <form className="signing-page" onSubmit={sign}>
          <div className="page-heading"><span>Folio 01</span><span>Today&apos;s page</span></div>
          <h2>Sign the book</h2>
          <p className="muted">Your entry stays in this browser. No account, inbox, or shared wall.</p>
          <label><span>Your name</span><input value={name} onChange={(e) => setName(e.target.value)} placeholder="How should we remember you?" maxLength={MAX_NAME} autoComplete="name" required /></label>
          <label><span>Your note</span><textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Leave a sentence worth finding later..." rows={5} maxLength={MAX_MESSAGE} required /></label>
          <div className="form-footer"><button className="ink-button" type="submit">Press the seal <span aria-hidden="true">↗</span></button><span className={saved ? "saved-note" : "form-hint"} role="status">{error || (saved ? "Filed on this device." : `Required fields · local only · newest ${MAX_ENTRIES} kept`)}</span></div>
        </form>
        <section className="entries-page" aria-labelledby="entries-heading">
          <div className="page-heading"><span>Folio 02—{String(Math.max(2, entries.length + 1)).padStart(2, "0")}</span><span>Most recent first</span></div>
          <div className="entries-heading-row"><h2 id="entries-heading">The visitors</h2><span className="entry-count">{entries.length} / {MAX_ENTRIES}</span></div>
          {entries.length === 0 ? <div className="empty-register"><span className="empty-mark" aria-hidden="true">—</span><p>The first line is still waiting.</p><span>Sign the left-hand page to open the register.</span></div> : <ol className="entry-list">{entries.map((entry, index) => <li key={entry.id}><span className="entry-index">{String(entries.length - index).padStart(2, "0")}</span><div><div className="entry-meta"><strong>{entry.name}</strong><time dateTime={new Date(entry.at).toISOString()}>{new Date(entry.at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</time></div><p>{entry.message}</p></div></li>)}</ol>}
        </section>
      </section>
      <footer className="ledger-footer"><span>PRIVATE DEVICE REGISTER</span><span>Nothing leaves this tab.</span></footer>
    </main>
  );
}
