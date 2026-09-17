import { test, expect } from "@playwright/test";
import { diagnosticBank } from "../app/assessment-bank";
import {
  analyze,
  readEvidence,
  recordAnswer,
  type Evidence,
} from "../app/assessment";

test("evidence thresholds, prerequisite ordering and retakes", () => {
  for (const bank of Object.values(diagnosticBank)) {
    expect(bank).toHaveLength(12);
    expect(new Set(bank.map((q) => q.id)).size).toBe(12);
    let evidence: Evidence = {};
    const tier = bank.filter((q) => q.level === 1);
    for (const q of tier.slice(0, 3))
      evidence = recordAnswer(evidence, q.id, q.answer);
    expect(analyze(bank, evidence).passed).toBe(0);
    const last = tier[3];
    evidence = recordAnswer(evidence, last.id, (last.answer + 1) % 4);
    expect(analyze(bank, evidence).passed).toBe(1);
    expect(analyze(bank, evidence).recommendation).toBe(3);
    let failed: Evidence = {};
    for (const [i, q] of tier.entries())
      failed = recordAnswer(
        failed,
        q.id,
        i < 2 ? q.answer : (q.answer + 1) % 4,
      );
    for (const q of tier) failed = recordAnswer(failed, q.id, q.answer);
    expect(analyze(bank, failed).passed).toBe(0);
    expect(analyze(bank, failed).levels[0].correct).toBe(2);
    expect(failed[last.id].attempts).toBe(2);
    for (const q of bank.filter((q) => q.level > 1))
      failed = recordAnswer(failed, q.id, q.answer);
    expect(analyze(bank, failed).passed).toBe(0);
    let all: Evidence = {};
    for (const q of bank) all = recordAnswer(all, q.id, q.answer);
    expect(analyze(bank, all).passed).toBe(3);
    expect(analyze(bank, all).recommendation).toBe(7);
    let boundary: Evidence = {};
    for (const [i, q] of bank.entries())
      boundary = recordAnswer(
        boundary,
        q.id,
        i % 4 === 3 ? (q.answer + 1) % 4 : q.answer,
      );
    expect(analyze(bank, boundary).passed).toBe(3);
    expect(analyze(bank, boundary).recommendation).toBe(7);
    expect(analyze(bank, boundary).weak).toEqual([]);
  }
});

test("stored facts are validated and grades are recomputed", () => {
  const bank = diagnosticBank[1];
  const q = bank[0];
  expect(
    readEvidence(
      JSON.stringify({
        [q.id]: { first: 999, latest: 0, attempts: 1 },
        unknown: { first: 0, latest: 0, attempts: 1 },
      }),
      bank,
    ),
  ).toEqual({});
  expect(() => readEvidence("{bad", bank)).toThrow();
  expect(() => readEvidence("null", bank)).toThrow();
  const facts = readEvidence(
    JSON.stringify({
      [q.id]: { first: q.answer, latest: q.answer, attempts: 1, passed: true },
    }),
    bank,
  );
  expect(analyze(bank, facts).passed).toBe(0);
});

test("adaptive ladder increases difficulty and links to challenge without marking complete", async ({
  page,
}) => {
  await page.goto("/");
  const coach = page.getByRole("region", { name: "ประเมินและปรับระดับ" });
  await coach.getByRole("button", { name: "เริ่มประเมินระดับ" }).click();
  for (let level = 1; level <= 3; level++) {
    for (const q of diagnosticBank[1].filter((q) => q.level === level)) {
      await expect(coach.locator(".diagnostic-question h3")).toHaveText(
        q.prompt,
      );
      await coach.getByRole("radio").nth(q.answer).check();
      await coach.getByRole("button", { name: "บันทึกคำตอบ" }).click();
      await coach
        .getByRole("button", { name: "ข้อต่อไป / ดูผลระดับนี้" })
        .click();
    }
    await expect(coach.locator(".assessment-result h3")).toHaveText(
      `ผลระดับ ${level}: 4/4 ถูกครั้งแรก`,
    );
    if (level < 3)
      await coach
        .getByRole("button", { name: "เพิ่มความยาก: ระดับถัดไป" })
        .click();
  }
  await expect(
    coach.getByRole("link", { name: "ไปประเมินคอร์ส 2" }),
  ).toBeVisible();
  await page.reload();
  await expect(coach.locator(".evidence-count")).toHaveText(
    "หลักฐาน 12/12 ข้อ",
  );
  await expect(page.getByText("0 จาก 8 บทเรียนเสร็จสมบูรณ์")).toBeVisible();
  await coach.getByRole("button", { name: "ไปบทที่แนะนำ: 8" }).click();
  await expect(page).toHaveURL(/#lesson-8$/);
});

test("wrong answers survive reload and practice cannot inflate placement", async ({
  page,
}) => {
  await page.goto("/#course-2");
  const coach = page.getByRole("region", { name: "ประเมินและปรับระดับ" });
  await coach.getByRole("button", { name: "เริ่มประเมินระดับ" }).click();
  const questions = diagnosticBank[2].slice(0, 4);
  for (const q of questions) {
    await coach
      .getByRole("radio")
      .nth((q.answer + 1) % 4)
      .check();
    await coach.getByRole("button", { name: "บันทึกคำตอบ" }).click();
    await coach
      .getByRole("button", { name: "ข้อต่อไป / ดูผลระดับนี้" })
      .click();
  }
  await expect(coach.locator(".assessment-result h3")).toHaveText(
    "ผลระดับ 1: 0/4 ถูกครั้งแรก",
  );
  await coach.locator("summary").click();
  await coach
    .getByRole("button", { name: "ฝึกซ้ำ", exact: true })
    .first()
    .click();
  await coach.getByRole("radio").nth(questions[0].answer).check();
  await coach.getByRole("button", { name: "บันทึกคำตอบ" }).click();
  await page.reload();
  await expect(coach.locator(".level-track strong").first()).toHaveText(
    "0/4 ถูกครั้งแรก",
  );
  const saved = await page.evaluate(() =>
    JSON.parse(localStorage.getItem("pypath-evidence-v1-course-2")!),
  );
  expect(saved[questions[0].id].attempts).toBe(2);
  expect(saved[questions[0].id].first).not.toBe(questions[0].answer);
  await page.locator('.course-option[href="#curriculum"]').click();
  await expect(coach.locator(".evidence-count")).toHaveText("หลักฐาน 0/12 ข้อ");
});

test("regular quiz records first attempt separately and adaptive UI fits mobile", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#lesson-1");
  await page.getByRole("radio").nth(0).check();
  await page.getByRole("button", { name: "ตรวจคำตอบ" }).click();
  await page.getByRole("button", { name: "ลองตอบอีกครั้ง" }).click();
  await page.getByRole("radio").nth(1).check();
  await page.getByRole("button", { name: "ตรวจคำตอบ" }).click();
  await page.getByRole("button", { name: "กลับไปหลักสูตร" }).click();
  const coach = page.getByRole("region", { name: "ประเมินและปรับระดับ" });
  await coach.locator("summary").click();
  await expect(
    coach.getByRole("heading", { name: "แบบทดสอบท้ายบท: 0/1 ถูกครั้งแรก" }),
  ).toBeVisible();
  await expect(coach.locator(".evidence-count")).toHaveText("หลักฐาน 0/12 ข้อ");
  await coach.getByRole("button", { name: "เริ่มประเมินระดับ" }).click();
  await page.screenshot({
    path: ".leancode/screenshots/adaptive-mobile.png",
    fullPage: true,
    animations: "disabled",
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.reload();
  await coach.getByRole("button", { name: "เริ่มประเมินระดับ" }).click();
  await expect(coach.locator(".diagnostic-question")).toBeVisible();
});
