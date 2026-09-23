---
id: 0006
title: ออกแบบการเลือกสายและการนำทาง
type: prototype
status: closed
assignee: Codex
blocked_by: [0003, 0004, 0005]
---

## Question

หน้า catalog, ตัวกรอง, roadmap, URL และแบบประเมินควรเปลี่ยนอย่างไรเพื่อให้ผู้เรียนเข้าใจและสลับระหว่างสามสายได้โดยไม่สับสน?

## Answer

เลือก **Variant B — เห็นภาพเป็นแผนที่** เป็นแนวทางหลักสำหรับ DevPath:

- หน้าเริ่มต้นแสดง Python & AI เป็นสายอิสระ
- JavaScript/TypeScript Foundation เป็นจุดร่วมก่อนแตกไป Node.js Backend หรือ Next.js Web
- ผู้เรียนเลือกหนึ่งสายหรือเรียนทั้งคู่ได้โดยไม่มีการล็อก
- Full-stack Project แสดงเป็นปลายทางเสริมที่เชื่อม Task API กับ Task Dashboard
- navigation หลักมี “แผนที่ของฉัน”, “ทุกสายเรียน” และ “ประเมินพื้นฐาน”
- URL ใช้ contract ที่ตัดสินใจไว้: Python รองรับ URL เดิม ส่วน Node.js และ Next.js ใช้ prefix แยกสาย

ต้นแบบต้นทางเก็บบน branch `prototype/devpath-navigation` ที่ commit `b2a730f` และต้องนำแนวคิดมาเขียน production code ใหม่ ไม่ merge โค้ด prototype ตรง ๆ
