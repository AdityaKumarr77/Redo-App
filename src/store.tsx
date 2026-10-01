import { createContext, useContext, useEffect, useMemo, useState } from "react";
import type { ReactNode } from "react";
import { applyReview, firstDue } from "./schedule";
import type { NewProblem, Problem } from "./types";

const KEY = "redo.problems.v1";

const uid = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8);

function load(): Problem[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as Problem[]) : [];
  } catch {
    return [];
  }
}

interface Store {
  problems: Problem[];
  add: (input: NewProblem) => void;
  review: (id: string, remembered: boolean) => void;
  remove: (id: string) => void;
  replaceAll: (next: Problem[]) => void;
}

const Ctx = createContext<Store | null>(null);

export function ProblemsProvider({ children }: { children: ReactNode }) {
  const [problems, setProblems] = useState<Problem[]>(load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(problems));
    } catch {
      /* storage unavailable – keep working in memory */
    }
  }, [problems]);

  const value = useMemo<Store>(
    () => ({
      problems,
      add: (input) =>
        setProblems((prev) => [
          { ...input, id: uid(), stage: 0, nextDue: firstDue(input.solvedOn), reviews: [] },
          ...prev,
        ]),
      review: (id, remembered) =>
        setProblems((prev) => prev.map((p) => (p.id === id ? applyReview(p, remembered) : p))),
      remove: (id) => setProblems((prev) => prev.filter((p) => p.id !== id)),
      replaceAll: (next) => setProblems(next),
    }),
    [problems]
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useProblems(): Store {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useProblems must be used inside ProblemsProvider");
  return ctx;
}
