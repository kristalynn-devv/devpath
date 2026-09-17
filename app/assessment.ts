import type { DiagnosticQuestion } from "./assessment-bank";
export type AnswerFact = { first: number; latest: number; attempts: number };
export type Evidence = Record<string, AnswerFact>;
export type QuestionKey = { id: string; choices: string[]; answer: number };
export function readEvidence(
  raw: string | null,
  questions: QuestionKey[],
): Evidence {
  if (!raw) return {};
  const parsed: unknown = JSON.parse(raw);
  if (!parsed || typeof parsed !== "object" || Array.isArray(parsed))
    throw new Error("invalid evidence");
  const result: Evidence = {};
  for (const question of questions) {
    const value = (parsed as Record<string, unknown>)[question.id];
    if (!value || typeof value !== "object") continue;
    const row = value as AnswerFact;
    if (
      [row.first, row.latest].every(
        (n) => Number.isInteger(n) && n >= 0 && n < question.choices.length,
      ) &&
      Number.isInteger(row.attempts) &&
      row.attempts >= 1 &&
      row.attempts <= 10000
    )
      result[question.id] = {
        first: row.first,
        latest: row.latest,
        attempts: row.attempts,
      };
  }
  return result;
}
export function recordAnswer(
  evidence: Evidence,
  id: string,
  choice: number,
): Evidence {
  const prior = evidence[id];
  return {
    ...evidence,
    [id]: {
      first: prior?.first ?? choice,
      latest: choice,
      attempts: Math.min((prior?.attempts ?? 0) + 1, 10000),
    },
  };
}
export function analyze(bank: DiagnosticQuestion[], evidence: Evidence) {
  const levels = [1, 2, 3].map((level) => {
    const questions = bank.filter((q) => q.level === level);
    const answered = questions.filter((q) => evidence[q.id]);
    const correct = answered.filter(
      (q) => evidence[q.id].first === q.answer,
    ).length;
    return {
      level,
      total: questions.length,
      answered: answered.length,
      correct,
      passed: questions.length === 4 && answered.length === 4 && correct >= 3,
    };
  });
  let passed = 0;
  for (const level of levels) {
    if (!level.passed) break;
    passed++;
  }
  const targetLevel = Math.min(passed + 1, 3);
  const weak = bank.filter(
    (q) =>
      !levels[targetLevel - 1].passed &&
      q.level === targetLevel &&
      evidence[q.id] &&
      evidence[q.id].first !== q.answer,
  );
  const recommendation = weak.length ? weak[0].lesson : [0, 3, 6, 7][passed];
  return { levels, passed, targetLevel, weak, recommendation };
}
