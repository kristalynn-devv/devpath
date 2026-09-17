# HANDOFF
updated: 2026-09-17

## Goal
แก้ Cloudflare Pages deploy ที่ fail เพราะ output directory ผิด

## Steps
- [x] เพิ่ม next.config.mjs ด้วย output: "export" → สร้างโฟลเดอร์ out/
- [x] อัปเดต README เรื่อง Cloudflare Pages (Build directory = out)
- [x] ยืนยัน npm run build สร้าง out/index.html
- [x] ปรับ start/playwright/.gitignore ให้เสิร์ฟและ ignore out/

## State
files: next.config.mjs, README.md, HANDOFF.md, package.json, playwright.config.ts, .gitignore, CLAUDE.md

## Decisions
- ใช้ static HTML export เพราะแอป client-only (localStorage, hash route) ไม่ต้อง SSR/Workers adapter
- Cloudflare Pages ต้องการ asset dir จริง; ค่า "next" / ".next" ใช้กับ Pages static ไม่ได้
- `npm run start` = `python3 -m http.server` เสิร์ฟ `out/` เพราะ `next start` ใช้กับ export ไม่ได้

## Next action
commit แล้วใน Cloudflare dashboard ตั้ง Build directory เป็น `out` แล้ว redeploy

## Known limitations
ต้อง build ก่อน start/test; start ใช้ Python 3 stdlib ไม่มี static server ใน npm deps
