import type { ReactNode } from "react";
import type { Problem } from "../types";
import Bubbles from "./Bubbles";

interface Props {
  problem: Problem;
  note?: string;
  children?: ReactNode;
}

export default function ProblemCard({ problem, note, children }: Props) {
  const { title, url, platform, difficulty, tags, notes, stage } = problem;
  return (
    <article className="card">
      <div className="card__head">
        <h3>
          {url ? (
            <a href={url} target="_blank" rel="noreferrer">{title}</a>
          ) : (
            title
          )}
        </h3>
        <Bubbles stage={stage} />
      </div>
      <p className="chips">
        <span className="chip chip--solid">{platform}</span>
        <span className="chip chip--solid">{difficulty}</span>
        {tags.map((t) => (
          <span key={t} className="chip">{t}</span>
        ))}
      </p>
      {notes && <p className="card__notes">{notes}</p>}
      {note && <p className="card__note">{note}</p>}
      {children && <div className="card__actions">{children}</div>}
    </article>
  );
}
