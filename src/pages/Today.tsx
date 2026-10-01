import { Link } from "react-router-dom";
import ProblemCard from "../components/ProblemCard";
import { diffDays, formatDay, todayISO } from "../dates";
import { makeSamples } from "../sample";
import { useProblems } from "../store";

export default function Today() {
  const { problems, review, replaceAll } = useProblems();
  const today = todayISO();

  const due = problems
    .filter((p) => p.nextDue !== null && p.nextDue <= today)
    .sort((a, b) => (a.nextDue! < b.nextDue! ? -1 : 1));
  const upcoming = problems
    .filter((p) => p.nextDue !== null && p.nextDue > today)
    .sort((a, b) => (a.nextDue! < b.nextDue! ? -1 : 1))
    .slice(0, 4);

  if (problems.length === 0) {
    return (
      <section className="container page">
        <h1>You haven't logged a problem yet.</h1>
        <p className="lead">
          Add a problem you solved and Redo will ask you to solve it again after 1, 3, 7, 14 and
          30 days, so the idea sticks.
        </p>
        <div className="actions">
          <Link to="/add" className="btn btn--primary">Add your first problem</Link>
          <button className="btn" onClick={() => replaceAll(makeSamples())}>
            Load sample problems
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="container page">
      <h1>{due.length > 0 ? `${due.length} to redo today` : "Nothing due today"}</h1>
      <p className="lead">
        {due.length > 0
          ? "Solve each one again without looking at your old code, then mark how it went."
          : "You're all caught up. Add what you solved today so it joins the schedule."}
      </p>

      {due.length > 0 && (
        <div className="stack">
          {due.map((p) => {
            const late = diffDays(today, p.nextDue!);
            return (
              <ProblemCard
                key={p.id}
                problem={p}
                note={late > 0 ? `${late} day${late > 1 ? "s" : ""} overdue` : "Due today"}
              >
                <button className="btn btn--primary" onClick={() => review(p.id, true)}>
                  I solved it again
                </button>
                <button className="btn" onClick={() => review(p.id, false)}>
                  I got stuck
                </button>
              </ProblemCard>
            );
          })}
        </div>
      )}

      {upcoming.length > 0 && (
        <>
          <h2 className="section-title">Coming up</h2>
          <ul className="plain-list">
            {upcoming.map((p) => (
              <li key={p.id}>
                <span>{p.title}</span>
                <span className="muted">{formatDay(p.nextDue!)}</span>
              </li>
            ))}
          </ul>
        </>
      )}
    </section>
  );
}
