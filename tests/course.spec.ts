import { test, expect } from "@playwright/test";

test("lessons, search and empty filters", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.goto("/");
  await expect(page.locator(".lesson-card")).toHaveCount(8);
  await page.getByRole("textbox", { name: "ค้นหาบทเรียน" }).fill("Regression");
  await expect(page.locator(".lesson-card")).toHaveCount(1);
  await page.getByRole("textbox", { name: "ค้นหาบทเรียน" }).fill("not-found");
  await expect(page.getByText("ไม่พบบทเรียนที่ค้นหา")).toBeVisible();
  await page.getByRole("button", { name: "ดูบทเรียนทั้งหมด" }).click();
  await page
    .locator(".tabs")
    .getByRole("button", { name: "เรียนจบแล้ว", exact: true })
    .click();
  await expect(page.getByText("ยังไม่มีบทเรียนในหมวดนี้")).toBeVisible();
  for (let i = 1; i <= 8; i++) {
    await page.goto(`/#lesson-${i}`);
    await expect(page.locator(".lesson-heading .eyebrow")).toContainText(
      `WEEK 0${i}`,
    );
    await expect(page.locator(".code-window pre")).toBeVisible();
    await expect(page.getByRole("radio")).toHaveCount(3);
  }
  expect(errors).toEqual([]);
});

test("quiz retry, complete, persist and browser history", async ({ page }) => {
  await page.goto("/#lesson-1");
  await expect(
    page.getByRole("button", { name: "เรียนจบและไปบทถัดไป" }),
  ).toBeDisabled();
  await page.getByRole("radio").nth(0).check();
  await page.getByRole("button", { name: "ตรวจคำตอบ" }).click();
  await expect(page.getByText("ลองทำความเข้าใจอีกนิด")).toBeVisible();
  await page.getByRole("button", { name: "ลองตอบอีกครั้ง" }).click();
  await page.getByRole("radio").nth(1).check();
  await page.getByRole("button", { name: "ตรวจคำตอบ" }).click();
  await expect(page.getByText("ถูกต้อง เก่งมาก!")).toBeVisible();
  await page.getByRole("button", { name: "เรียนจบและไปบทถัดไป" }).click();
  await expect(page).toHaveURL(/lesson-2$/);
  await page.reload();
  await page.getByRole("button", { name: "กลับไปหลักสูตร" }).click();
  await expect(page.getByText("1 จาก 8 บทเรียนเสร็จสมบูรณ์")).toBeVisible();
  await page.goBack();
  await expect(page.locator(".lesson-heading h1")).toHaveText(
    "เขียนโค้ดให้เป็นระบบ",
  );
  await page.goto("/#lesson-1");
  await page.getByRole("button", { name: "เรียนจบและไปบทถัดไป" }).click();
  expect(
    await page.evaluate(() =>
      JSON.parse(localStorage.getItem("pypath-progress-v1")!),
    ),
  ).toEqual([0]);
});

test("all eight lessons can be completed", async ({ page }) => {
  await page.goto("/#lesson-1");
  const answers = [1, 0, 2, 0, 1, 1, 1, 0];
  for (const [i, answer] of answers.entries()) {
    await expect(page).toHaveURL(new RegExp(`lesson-${i + 1}$`));
    await expect(page.locator(".lesson-heading .eyebrow")).toContainText(
      `WEEK 0${i + 1}`,
    );
    await page.getByRole("radio").nth(answer).check();
    await page.getByRole("button", { name: "ตรวจคำตอบ" }).click();
    await page
      .getByRole("button", {
        name: i === 7 ? "จบหลักสูตร" : "เรียนจบและไปบทถัดไป",
      })
      .click();
  }
  await expect(page.getByText("คุณทำสำเร็จแล้ว!")).toBeVisible();
  await page.reload();
  await expect(page.getByText("8 จาก 8 บทเรียนเสร็จสมบูรณ์")).toBeVisible();
});

test("damaged storage and invalid deep link do not break the page", async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem("pypath-progress-v1", "{invalid"),
  );
  await page.goto("/#lesson-99");
  await expect(page.locator(".lesson-card")).toHaveCount(8);
  await expect(page.locator(".storage-notice")).toBeVisible();
});

test("stored progress is validated and storage failures are handled", async ({
  page,
}) => {
  await page.addInitScript(() =>
    localStorage.setItem("pypath-progress-v1", '[0,0,-1,8,1.5,"2",null]'),
  );
  await page.goto("/");
  await expect(page.getByText("1 จาก 8 บทเรียนเสร็จสมบูรณ์")).toBeVisible();
  await page.addInitScript(() => {
    Storage.prototype.setItem = () => {
      throw new Error("Storage unavailable");
    };
  });
  await page.reload();
  await expect(page.locator(".storage-notice")).toBeVisible();
  await expect(page.locator(".lesson-card")).toHaveCount(8);
});

test("clipboard success and failure", async ({
  page,
  context,
  browserName,
}) => {
  test.skip(browserName !== "chromium");
  await context.grantPermissions(["clipboard-read", "clipboard-write"]);
  await page.goto("/#lesson-1");
  await page.getByRole("button", { name: "คัดลอกโค้ด" }).click();
  await expect(page.getByRole("button", { name: "คัดลอกแล้ว" })).toBeVisible();
  expect(await page.evaluate(() => navigator.clipboard.readText())).toContain(
    "minutes = 45",
  );
  await page.evaluate(() => {
    navigator.clipboard.writeText = async () => {
      throw new Error("blocked");
    };
  });
  await page.getByRole("button", { name: "คัดลอกแล้ว" }).click();
  await expect(
    page.getByText("คัดลอกอัตโนมัติไม่ได้", { exact: false }),
  ).toBeVisible();
});

test("desktop and mobile layout, menu and screenshots", async ({ page }) => {
  await page.setViewportSize({ width: 1440, height: 1080 });
  await page.goto("/");
  await page.screenshot({
    path: ".leancode/screenshots/desktop.png",
    fullPage: true,
  });
  await page.setViewportSize({ width: 390, height: 844 });
  await expect(page.locator(".hero h2")).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await expect(page.locator(".sidebar")).not.toBeVisible();
  await page.screenshot({
    path: ".leancode/screenshots/mobile.png",
    fullPage: true,
    animations: "disabled",
  });
  await page.getByRole("button", { name: "เปิดเมนู" }).click();
  await expect(page.locator(".sidebar")).toHaveClass(/mobile-open/);
  await page
    .locator(".sidebar")
    .getByRole("button", { name: "เรียนต่อ", exact: true })
    .click();
  await expect(page.locator(".lesson-heading h1")).toBeVisible();
  await expect(page.locator(".sidebar")).not.toHaveClass(/mobile-open/);
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: ".leancode/screenshots/lesson-mobile.png",
    fullPage: true,
  });
});

test("keyboard skip link preserves current lesson", async ({ page }) => {
  await page.goto("/#lesson-3");
  await expect(page.locator(".lesson-heading .eyebrow")).toContainText(
    "WEEK 03",
  );
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "ข้ามไปเนื้อหา" })).toBeFocused();
  await page.keyboard.press("Enter");
  await expect(page.locator("main")).toBeFocused();
  await expect(page).toHaveURL(/lesson-3$/);
});

test("all new courses open every lesson and preserve separate progress", async ({
  page,
}) => {
  await page.addInitScript(() => {
    if (!localStorage.getItem("pypath-progress-v1"))
      localStorage.setItem("pypath-progress-v1", "[0]");
  });
  await page.goto("/");
  await expect(page.locator(".course-option")).toHaveCount(5);
  for (let course = 2; course <= 5; course++) {
    await page.locator(`.course-option[href="#course-${course}"]`).click();
    await expect(page.locator(".course-option.active")).toContainText(
      `COURSE 0${course}`,
    );
    await expect(page.getByText("0 จาก 8 บทเรียนเสร็จสมบูรณ์")).toBeVisible();
    for (let lesson = 1; lesson <= 8; lesson++) {
      await page.goto(`/#course-${course}/lesson-${lesson}`);
      await expect(page.locator(".lesson-heading .eyebrow")).toContainText(
        `WEEK 0${lesson}`,
      );
      await expect(page.locator(".lesson-content .code-window")).toBeVisible();
      await expect(page.getByRole("radio")).toHaveCount(3);
    }
    await page.goto(`/#course-${course}/lesson-1`);
    await expect(page.locator(".lesson-heading .eyebrow")).toContainText(
      "WEEK 01",
    );
    const answers = [1, 0, 0, 1];
    await page
      .getByRole("radio")
      .nth(answers[course - 2])
      .check();
    await page.getByRole("button", { name: "ตรวจคำตอบ" }).click();
    await page.getByRole("button", { name: "เรียนจบและไปบทถัดไป" }).click();
    await expect(page.locator(".lesson-heading .eyebrow")).toContainText(
      "WEEK 02",
    );
    await page.reload();
    await page.getByRole("button", { name: "กลับไปหลักสูตร" }).click();
    await expect(page.getByText("1 จาก 8 บทเรียนเสร็จสมบูรณ์")).toBeVisible();
  }
  await page.locator('.course-option[href="#curriculum"]').click();
  await expect(page.getByText("1 จาก 8 บทเรียนเสร็จสมบูรณ์")).toBeVisible();
  expect(
    await page.evaluate(() =>
      JSON.parse(localStorage.getItem("pypath-progress-v1")!),
    ),
  ).toEqual([0]);
});

test("advanced course mobile layout and deep link history", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/#course-5");
  await expect(page.locator(".course-option.active")).toContainText(
    "COURSE 05",
  );
  await page.screenshot({
    path: ".leancode/screenshots/courses-mobile.png",
    fullPage: true,
    animations: "disabled",
  });
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.locator(".lesson-card").first().click();
  await expect(page.locator(".lesson-heading h1")).toHaveText(
    "ออกแบบสัญญาข้อมูลของระบบ",
  );
  await page.goBack();
  await expect(page.locator(".lesson-card")).toHaveCount(8);
  await page.goForward();
  await expect(page.locator(".lesson-heading h1")).toHaveText(
    "ออกแบบสัญญาข้อมูลของระบบ",
  );
  await page.locator('.course-option[href="#course-3"]').click();
  await expect(page.locator(".lesson-card")).toHaveCount(8);
  await expect(page.locator(".course-option.active")).toContainText(
    "COURSE 03",
  );
});
