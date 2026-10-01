import { useState } from "react";
import type { ChangeEvent } from "react";
import { Link } from "react-router-dom";
import ProblemCard from "../components/ProblemCard";
import { formatDay } from "../dates";
import { MAX_STAGE } from "../schedule";
import { useProblems } from "../store";
import { PLATFORMS } from "../types";
import type { Problem } from "../types";

export default function Library() {
  const { problems, remove, replaceAll } = useProblems();
  const [query, setQuery] = useState("");
  const [platform, setPlatform] = useState("All");
  const [status, setStatus] = useState("All");
  const [error, setError] = useState("");

  const shown = problems.filter((p) => {
    const q = query.trim().toLowerCase();
    const matchesQuery =
      !q || p.title.toLowerCase().includes(q) || p.tags.some((t) => t.includes(q));
    const matchesPlatform = platform === "All" || p.platform === platform;
    const mastered = p.stage >= MAX_STAGE;
    const matchesStatus =
      status === "All" || (status === "Mastered" ? mastered : !mastered);
    return matchesQuery && matchesPlatform && matchesStatus;
  });

  const exportJson = () => {
    const blob = new Blob([JSON.stringify(problems, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = "redo-backup.json";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const importJson = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    try {
      const data: unknown = JSON.parse(await file.text());
      const valid =
        Array.isArray(data) &&
        data.every((p) => p && typeof p.id === "string" && typeof p.title === "string");
      if (!valid) throw new Error("bad shape");
      if (window.confirm(`Replace your library with ${data.length} problems from this file?`)) {
        replaceAll(data as Problem[]);
      }
      setError("");
    } catch {
      setError("That file isn't a Redo backup.");
    }
  };

  return (
    <section className="container page">
      <h1>Library</h1>

      <div className="toolbar">
        <input
          type="search"
          placeholder="Search by name or topic"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          aria-label="Search problems"
        />
        <select value={platform} onChange={(e) => setPlatform(e.target.value)} aria-label="Platform">
          <option>All</option>
          {PLATFORMS.map((p) => <option key={p}>{p}</option>)}
        </select>
        <select value={status} onChange={(e) => setStatus(e.target.value)} aria-label="Status">
          <option>All</option>
          <option>Learning</option>
          <option>Mastered</option>
        </select>
      </div>

      {shown.length === 0 ? (
        <p className="lead">
          {problems.length === 0 ? (
            <>No problems yet. <Link to="/add">Add one</Link>.</>
          ) : (
            "No problems match these filters."
          )}
        </p>
      ) : (
        <div className="stack">
          {shown.map((p) => (
            <ProblemCard
              key={p.id}
              problem={p}
              note={p.nextDue ? `Next revision ${formatDay(p.nextDue)}` : "Mastered"}
            >
              <button
                className="btn btn--quiet"
                onClick={() => window.confirm(`Delete "${p.title}"?`) && remove(p.id)}
              >
                Delete
              </button>
            </ProblemCard>
          ))}
        </div>
      )}

      <h2 className="section-title">Backup</h2>
      <p className="muted">Your data stays in this browser. Export it to keep a copy or move devices.</p>
      <div className="actions">
        <button className="btn" onClick={exportJson} disabled={problems.length === 0}>
          Export JSON
        </button>
        <label className="btn file-btn">
          Import JSON
          <input type="file" accept="application/json" onChange={importJson} hidden />
        </label>
      </div>
      {error && <p role="alert" className="error">{error}</p>}
    </section>
  );
}
