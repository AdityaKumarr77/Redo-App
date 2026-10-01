import { addDays, todayISO } from "./dates";
import type { Problem } from "./types";

/** Days to wait before the next revision, indexed by current stage. */
export const INTERVALS = [1, 3, 7, 14, 30];
export const MAX_STAGE = INTERVALS.length;

export const firstDue = (solvedOn: string) => addDays(solvedOn, INTERVALS[0]);

export function applyReview(p: Problem, remembered: boolean, on: string = todayISO()): Problem {
  const stage = remembered ? Math.min(p.stage + 1, MAX_STAGE) : 0;
  const nextDue = stage >= MAX_STAGE ? null : addDays(on, INTERVALS[stage]);
  return { ...p, stage, nextDue, reviews: [...p.reviews, { date: on, remembered }] };
}
