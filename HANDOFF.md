# HANDOFF
updated: 2026-09-17

## Goal
แก้ Cloudflare Pages fail จาก submodule path `python-ai-course` ที่ไม่มี URL ใน `.gitmodules`

## Steps
- [x] ลบ gitlink `python-ai-course` (mode 160000) ออกจาก index
- [x] ลบโฟลเดอร์ว่างซ้อน และกันด้วย `.gitignore`
- [ ] commit + push แล้ว redeploy บน Cloudflare

## State
repo จริงอยู่ที่ `python-ai-course/` (nested); staged: `D python-ai-course`, `.gitignore` แก้แล้ว
โฟลเดอร์นอก `Documents/GitHub/python-ai-course/.git` เป็น repo ว่าง — อย่าใช้

## Decisions
- ไม่สร้าง `.gitmodules` — path นี้เป็นสำเนาซ้อนโดยไม่ได้ตั้งใจ ไม่ใช่ submodule จริง

## Next action
commit + push จากโฟลเดอร์ nested แล้วให้ Cloudflare clone ใหม่

## Known limitations
workspace เปิดที่ parent ที่ไม่มีประวัติ git — ควรเปิดโฟลเดอร์ nested เป็น root
