---
id: 0007
title: ล็อกขอบเขต release และการเปลี่ยนชื่อทางเทคนิค
type: grilling
status: closed
assignee: Codex
blocked_by: [0003, 0004, 0005, 0006]
---

## Question

release แรกของ DevPath จะส่งมอบสายใดและเนื้อหาเท่าใด พร้อมเปลี่ยนชื่อเฉพาะแบรนด์ โฟลเดอร์ package และ deployment ส่วนใดบ้าง?

## Answer

Release แรกส่งมอบทั้งสามสายรวมพื้นฐานร่วม 64 บท:

- Python & AI: คอร์สเดิม 5 คอร์ส 40 บท รักษาเนื้อหา ความคืบหน้า localStorage และ URL เดิม
- JavaScript/TypeScript Foundation: 8 บท ใช้ร่วมก่อนเลือก Node.js หรือ Next.js
- Node.js Backend: 8 บท ตามหลักสูตรที่ตัดสินใจไว้
- Next.js Web: 8 บท ตามหลักสูตรที่ตัดสินใจไว้
- ใช้ Variant B แบบแผนที่เป็นหน้าเลือกสาย พร้อมพื้นฐานร่วม การแตกสาย และ full-stack เป็นปลายทางเสริม

เปลี่ยนชื่อผลิตภัณฑ์เป็น DevPath ทุกพื้นผิวที่ผู้ใช้และผู้พัฒนาเห็น: metadata, README, package name และโฟลเดอร์เป็น `devpath`; เปลี่ยน GitHub repository slug และ Cloudflare Pages project name ให้เป็น `devpath` ด้วย คง static export และ build directory `out` ไว้

การเปลี่ยนชื่อ GitHub/Cloudflare เป็นขั้นตอนภายนอกที่ทำหลังตรวจ build และความเข้ากันได้ในเครื่องแล้ว โดยปรับ remote URL ให้ตรงกับ repository ใหม่ และตรวจ deployment settings หลังเปลี่ยนชื่อ
