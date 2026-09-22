---
id: 0002
title: กำหนดความสัมพันธ์ของสามสายเรียน
type: grilling
status: closed
assignee: Codex
blocked_by: []
---

## Question

Python & AI, Node.js และ Next.js ควรเป็นสามสายอิสระที่เริ่มเรียนแยกกันได้ หรือเป็นเส้นทางต่อเนื่องที่มี prerequisite และจุดเชื่อมระหว่างสายอย่างไร?

## Answer

ใช้สามสายเรียนอิสระและไม่ล็อกการเข้าถึงข้ามสาย:

- **Python & AI** ใช้หลักสูตรเดิมและเริ่มได้ทันที
- **Node.js Backend** เน้น API, database, authentication และ testing
- **Next.js Web** เน้น React, App Router, frontend และ full-stack

Node.js และ Next.js ใช้บทพื้นฐาน JavaScript/TypeScript ร่วมกันเพื่อลดเนื้อหาซ้ำ แต่ไม่บังคับเรียน Node.js ก่อน Next.js ผู้ที่ต้องการเส้นทาง full-stack จะได้รับคำแนะนำให้เรียน Node.js แล้วต่อ Next.js

ในภาษาของผลิตภัณฑ์เรียกทั้งสามรายการว่า **สายเรียน** ไม่เรียกว่า **ภาษา** เพราะ Python เป็นภาษา, Node.js เป็น runtime และ Next.js เป็น framework
