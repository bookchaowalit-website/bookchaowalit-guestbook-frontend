"use client";

import { useEffect, useState, type FormEvent } from "react";

type Entry = { id: string; name: string; message: string; at: number };

function useEntries() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    try {
      const saved = localStorage.getItem("guestbook-v2");
      if (saved) setEntries(JSON.parse(saved) as Entry[]);
    } catch { /* keep the empty register */ }
    setReady(true);
  }, []);
  useEffect(() => { if (ready) localStorage.setItem("guestbook-v2", JSON.stringify(entries)); }, [entries, ready]);
  return [entries, setEntries] as const;
}

export default function Home() {
  const [entries, setEntries] = useEntries();
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [saved, setSaved] = useState(false);

  function sign(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!name.trim() || !message.trim()) return;
    setEntries((current) => [{ id: crypto.randomUUID(), name: name.trim(), message: message.trim(), at: Date.now() }, ...current].slice(0, 40));
    setName(""); setMessage(""); setSaved(true);
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
          <label><span>Your name</span><input value={name} onChange={(e) => setName(e.target.value)} placeholder="How should we remember you?" required /></label>
          <label><span>Your note</span><textarea value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Leave a sentence worth finding later..." rows={5} required /></label>
          <div className="form-footer"><button className="ink-button" type="submit">Press the seal <span aria-hidden="true">↗</span></button>{saved ? <span className="saved-note" role="status">Filed on this device.</span> : <span className="form-hint">Required fields · local only</span>}</div>
        </form>
        <section className="entries-page" aria-labelledby="entries-heading">
          <div className="page-heading"><span>Folio 02—{String(Math.max(2, entries.length + 1)).padStart(2, "0")}</span><span>Most recent first</span></div>
          <div className="entries-heading-row"><h2 id="entries-heading">The visitors</h2><span className="entry-count">{entries.length} / 40</span></div>
          {entries.length === 0 ? <div className="empty-register"><span className="empty-mark" aria-hidden="true">—</span><p>The first line is still waiting.</p><span>Sign the left-hand page to open the register.</span></div> : <ol className="entry-list">{entries.map((entry, index) => <li key={entry.id}><span className="entry-index">{String(entries.length - index).padStart(2, "0")}</span><div><div className="entry-meta"><strong>{entry.name}</strong><time dateTime={new Date(entry.at).toISOString()}>{new Date(entry.at).toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })}</time></div><p>{entry.message}</p></div></li>)}</ol>}
        </section>
      </section>
      <footer className="ledger-footer"><span>PRIVATE DEVICE REGISTER</span><span>Nothing leaves this tab.</span></footer>
    </main>
  );
}
