export const PLATFORMS = ["Codeforces", "LeetCode", "CodeChef", "AtCoder", "Other"] as const;
export const DIFFICULTIES = ["Easy", "Medium", "Hard"] as const;

export type Platform = (typeof PLATFORMS)[number];
export type Difficulty = (typeof DIFFICULTIES)[number];

export interface Review {
  date: string; // YYYY-MM-DD
  remembered: boolean;
}

export interface Problem {
  id: string;
  title: string;
  platform: Platform;
  url: string;
  difficulty: Difficulty;
  tags: string[];
  notes: string;
  solvedOn: string;
  /** Number of successful revisions in a row. 5 = mastered. */
  stage: number;
  nextDue: string | null;
  reviews: Review[];
}

export type NewProblem = Pick<
  Problem,
  "title" | "platform" | "url" | "difficulty" | "tags" | "notes" | "solvedOn"
>;
