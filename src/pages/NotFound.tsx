import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <section className="container page">
      <h1>Page not found</h1>
      <p className="lead">That address doesn't exist in Redo.</p>
      <Link to="/" className="btn btn--primary">Back to today</Link>
    </section>
  );
}
