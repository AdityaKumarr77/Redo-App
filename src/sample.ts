import { addDays, todayISO } from "./dates";
import { applyReview, firstDue } from "./schedule";
import type { Difficulty, Platform, Problem } from "./types";

type Spec = {
  title: string;
  platform: Platform;
  difficulty: Difficulty;
  tags: string[];
  solvedAgo: number;
  /** [days ago, remembered] in chronological order */
  reviews: [number, boolean][];
};

const specs: Spec[] = [
  { title: "Two Sum", platform: "LeetCode", difficulty: "Easy", tags: ["hashing", "arrays"], solvedAgo: 40, reviews: [[39, true], [36, true], [29, true], [15, true], [0, true]] },
  { title: "Watermelon", platform: "Codeforces", difficulty: "Easy", tags: ["math"], solvedAgo: 12, reviews: [[11, true], [8, true]] },
  { title: "Longest Increasing Subsequence", platform: "LeetCode", difficulty: "Medium", tags: ["dp", "binary search"], solvedAgo: 20, reviews: [[19, true], [16, false], [15, true], [12, false]] },
  { title: "Knapsack 1", platform: "AtCoder", difficulty: "Medium", tags: ["dp"], solvedAgo: 9, reviews: [[8, false], [7, true]] },
  { title: "Shortest Routes (CSES)", platform: "Other", difficulty: "Medium", tags: ["graphs", "shortest path"], solvedAgo: 6, reviews: [[5, true]] },
  { title: "Segment Tree Range Min", platform: "CodeChef", difficulty: "Hard", tags: ["segment tree", "data structures"], solvedAgo: 3, reviews: [] },
];

export function makeSamples(): Problem[] {
  const today = todayISO();
  return specs.map((s, i) => {
    const solvedOn = addDays(today, -s.solvedAgo);
    let p: Problem = {
      id: `sample-${i}`,
      title: s.title,
      platform: s.platform,
      url: "",
      difficulty: s.difficulty,
      tags: s.tags,
      notes: "",
      solvedOn,
      stage: 0,
      nextDue: firstDue(solvedOn),
      reviews: [],
    };
    for (const [ago, ok] of s.reviews) p = applyReview(p, ok, addDays(today, -ago));
    return p;
  });
}
