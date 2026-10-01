import { useState } from "react";
import type { FormEvent } from "react";
import { useNavigate } from "react-router-dom";
import { todayISO } from "../dates";
import { useProblems } from "../store";
import { DIFFICULTIES, PLATFORMS } from "../types";
import type { Difficulty, Platform } from "../types";

export default function Add() {
  const { add } = useProblems();
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [platform, setPlatform] = useState<Platform>("Codeforces");
  const [difficulty, setDifficulty] = useState<Difficulty>("Medium");
  const [url, setUrl] = useState("");
  const [tags, setTags] = useState("");
  const [notes, setNotes] = useState("");
  const [solvedOn, setSolvedOn] = useState(todayISO());

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    add({
      title: title.trim(),
      platform,
      difficulty,
      url: url.trim(),
      tags: tags.split(",").map((t) => t.trim().toLowerCase()).filter(Boolean),
      notes: notes.trim(),
      solvedOn,
    });
    navigate("/library");
  };

  return (
    <section className="container page">
      <h1>Add a solved problem</h1>
      <p className="lead">The first revision is scheduled for the day after you solved it.</p>

      <form className="form" onSubmit={onSubmit}>
        <label>
          Problem name
          <input value={title} onChange={(e) => setTitle(e.target.value)} required />
        </label>

        <div className="form__row">
          <label>
            Platform
            <select value={platform} onChange={(e) => setPlatform(e.target.value as Platform)}>
              {PLATFORMS.map((p) => <option key={p}>{p}</option>)}
            </select>
          </label>
          <label>
            Difficulty
            <select value={difficulty} onChange={(e) => setDifficulty(e.target.value as Difficulty)}>
              {DIFFICULTIES.map((d) => <option key={d}>{d}</option>)}
            </select>
          </label>
        </div>

        <label>
          Link (optional)
          <input type="url" value={url} onChange={(e) => setUrl(e.target.value)} placeholder="https://" />
        </label>
        <label>
          Topics, separated by commas
          <input value={tags} onChange={(e) => setTags(e.target.value)} placeholder="dp, graphs" />
        </label>
        <label>
          Key idea (optional)
          <textarea rows={3} value={notes} onChange={(e) => setNotes(e.target.value)} />
        </label>
        <label>
          Solved on
          <input type="date" value={solvedOn} max={todayISO()} onChange={(e) => setSolvedOn(e.target.value)} required />
        </label>

        <button type="submit" className="btn btn--primary">Save problem</button>
      </form>
    </section>
  );
}
