import { NavLink } from "react-router-dom";
import { todayISO } from "../dates";
import { useProblems } from "../store";

export default function Navbar() {
  const { problems } = useProblems();
  const today = todayISO();
  const dueCount = problems.filter((p) => p.nextDue !== null && p.nextDue <= today).length;

  const cls = ({ isActive }: { isActive: boolean }) =>
    isActive ? "nav-link nav-link--active" : "nav-link";

  return (
    <header className="navbar">
      <div className="container navbar__inner">
        <NavLink to="/" className="brand">
          <span className="brand__bubble" aria-hidden="true" />
          Redo
        </NavLink>
        <nav aria-label="Main">
          <ul className="nav-list">
            <li>
              <NavLink to="/" end className={cls}>
                Today
                {dueCount > 0 && <span className="badge">{dueCount}</span>}
              </NavLink>
            </li>
            <li>
              <NavLink to="/add" className={cls}>Add</NavLink>
            </li>
            <li>
              <NavLink to="/library" className={cls}>Library</NavLink>
            </li>
            <li>
              <NavLink to="/insights" className={cls}>Insights</NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
