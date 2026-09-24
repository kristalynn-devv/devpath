# HANDOFF

updated: 2026-09-17

## Goal

แก้ Cloudflare Pages fail จาก submodule path `python-ai-course` ที่ไม่มี URL ใน `.gitmodules`

## Steps

- [x] ลบ gitlink `python-ai-course` (mode 160000) ออกจาก index
- [x] ลบโฟลเดอร์ว่างซ้อน และกันด้วย `.gitignore`
- [x] commit + push (`77460f2`) แล้วให้ Cloudflare redeploy

## State

repo จริงอยู่ที่ `python-ai-course/` (nested); main = origin/main @ 77460f2
โฟลเดอร์นอก `Documents/GitHub/python-ai-course/.git` เป็น repo ว่าง — อย่าใช้

## Decisions

- ไม่สร้าง `.gitmodules` — path นี้เป็นสำเนาซ้อนโดยไม่ได้ตั้งใจ ไม่ใช่ submodule จริง

## Next action

รอ Cloudflare Pages build จาก 77460f2; Build directory ยังเป็น `out`

## Known limitations

workspace เปิดที่ parent ที่ไม่มีประวัติ git — ควรเปิดโฟลเดอร์ nested เป็น root

## Active work — DevPath release

updated: 2026-09-24

### Goal

เปลี่ยน PyPath เป็น DevPath และส่งมอบ 64 บทในสาย Python & AI, JavaScript/TypeScript, Node.js และ Next.js โดยรักษาข้อมูล Python เดิมและหน้าแผนที่ B

### Steps

- [x] ล็อกแผนหลักสูตร, URL/storage compatibility และ navigation ใน `.wayfinder/`
- [x] เพิ่มข้อมูล Foundation, Node.js และ Next.js รวม 24 บท
- [x] เพิ่ม navigation แบบแผนที่และ route prefixes โดยคง URL Python เดิม
- [x] เปลี่ยนแบรนด์/package/docs ที่อนุมัติ และตรวจ lockfiles
- [x] ตรวจ build, typecheck และ UI จริง; สรุปงาน GitHub/Cloudflare ที่ยังต้องทำ
- [x] ย้ายโฟลเดอร์ repository เป็น `devpath`
- [x] เติมหัวข้อ Node.js/Next.js ตาม ticket, เพิ่มจุดหมาย Full-stack Web และแก้ข้อความ Python ที่หลงในสายใหม่
- [x] อัปเดต `PRD.md` สำหรับรุ่น 1 และเก็บประวัติรุ่น Python
- [x] ตรวจ `npm run typecheck`, `npm run build` และหน้า Node.js/Next.js ในเบราว์เซอร์
- [ ] commit และ push `main`; ตรวจ Cloudflare deployment

### State

branch: `main`; remote README commit ถูก merge ก่อนเริ่มแก้ source
checkout: `/Users/kristalyn/Documents/GitHub/devpath`
uncommitted: DevPath implementation, PRD, README, CLAUDE และ handoff
GitHub repo: `kristalynn-devv/devpath`; local `origin` updated; source changes are pending push
Cloudflare Pages project: `devpath`; existing custom domain and `python-ai-course.pages.dev` hostname retained

### Decisions

- release แรกมี Python & AI 40 บทเดิม + Foundation 8 + Node.js 8 + Next.js 8
- ชื่อผลิตภัณฑ์/โฟลเดอร์/package/GitHub/Cloudflare: DevPath / `devpath`
- คง static export และ output `out`; ข้อมูลและ URL Python เดิมต้องใช้ได้
- พื้นฐานร่วม JS/TS ใช้ก่อน Node/Next ได้ แต่ไม่ล็อกสาย; Variant B เป็นแผนที่หลัก

### Next action

ตรวจ `git fetch origin` และ fast-forward status, commit งานที่ตรวจแล้ว, push `main`, จากนั้นตรวจ Cloudflare deployment

### Blockers

- Cloudflare project ยังแสดง source URL เดิมหลัง GitHub rename; ตรวจผล deployment หลัง push ก่อนเปลี่ยนการเชื่อมต่อ
