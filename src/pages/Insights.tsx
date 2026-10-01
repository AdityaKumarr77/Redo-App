import { useMemo } from "react";
import { Link } from "react-router-dom";
import { addDays, todayISO } from "../dates";
import { MAX_STAGE } from "../schedule";
import { useProblems } from "../store";

const DAYS = 84; // 12 weeks

export default function Insights() {
  const { problems } = useProblems();

  const stats = useMemo(() => {
    const today = todayISO();
    const perDay = new Map<string, number>();
    const perTag = new Map<string, { total: number; stuck: number }>();
    let reviews = 0;

    for (const p of problems) {
      for (const r of p.reviews) {
        reviews++;
        perDay.set(r.date, (perDay.get(r.date) ?? 0) + 1);
        for (const t of p.tags) {
          const cur = perTag.get(t) ?? { total: 0, stuck: 0 };
          cur.total++;
          if (!r.remembered) cur.stuck++;
          perTag.set(t, cur);
        }
      }
    }

    let streak = 0;
    let cursor = perDay.has(today) ? today : addDays(today, -1);
    while (perDay.has(cursor)) {
      streak++;
      cursor = addDays(cursor, -1);
    }

    const cells = Array.from({ length: DAYS }, (_, i) => {
      const date = addDays(today, i - (DAYS - 1));
      return { date, count: perDay.get(date) ?? 0 };
    });

    const weak = [...perTag.entries()]
      .map(([tag, v]) => ({ tag, ...v, rate: v.stuck / v.total }))
      .filter((t) => t.stuck > 0)
      .sort((a, b) => b.rate - a.rate || b.stuck - a.stuck)
      .slice(0, 5);

    return {
      reviews,
      streak,
      cells,
      weak,
      mastered: problems.filter((p) => p.stage >= MAX_STAGE).length,
    };
  }, [problems]);

  if (problems.length === 0) {
    return (
      <section className="container page">
        <h1>Insights</h1>
        <p className="lead">
          Charts appear once you have revised a few problems. <Link to="/add">Add a problem</Link> to start.
        </p>
      </section>
    );
  }

  return (
    <section className="container page">
      <h1>Insights</h1>

      <dl className="stats">
        <div><dt>Problems logged</dt><dd>{problems.length}</dd></div>
        <div><dt>Mastered</dt><dd>{stats.mastered}</dd></div>
        <div><dt>Revisions done</dt><dd>{stats.reviews}</dd></div>
        <div><dt>Day streak</dt><dd>{stats.streak}</dd></div>
      </dl>

      <h2 className="section-title">Revisions in the last 12 weeks</h2>
      <div className="heat" role="img" aria-label={`${stats.reviews} revisions in total`}>
        {stats.cells.map((c) => (
          <span
            key={c.date}
            title={`${c.date}: ${c.count} revision${c.count === 1 ? "" : "s"}`}
            className={`heat__cell heat__cell--${Math.min(c.count, 3)}`}
          />
        ))}
      </div>

      <h2 className="section-title">Topics you get stuck on</h2>
      {stats.weak.length === 0 ? (
        <p className="muted">No stuck revisions yet. Topics show up here when you miss one.</p>
      ) : (
        <ul className="bars">
          {stats.weak.map((w) => (
            <li key={w.tag}>
              <span className="bars__label">{w.tag}</span>
              <span className="bars__track">
                <span className="bars__fill" style={{ width: `${Math.round(w.rate * 100)}%` }} />
              </span>
              <span className="muted">stuck {w.stuck} of {w.total}</span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
