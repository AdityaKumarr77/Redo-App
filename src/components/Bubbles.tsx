import { MAX_STAGE } from "../schedule";

export default function Bubbles({ stage }: { stage: number }) {
  return (
    <span
      className="bubbles"
      role="img"
      aria-label={`${stage} of ${MAX_STAGE} revisions completed`}
    >
      {Array.from({ length: MAX_STAGE }, (_, i) => (
        <span key={i} className={i < stage ? "bubble bubble--on" : "bubble"} />
      ))}
    </span>
  );
}
