---
id: 0003
title: วางสัญญาความเข้ากันได้ของข้อมูลผู้เรียนเดิม
type: grilling
status: closed
assignee: Codex
blocked_by: [0002]
---

## Question

เมื่อเปลี่ยนโครงสร้างเป็นหลายสาย DevPath ต้องรักษา URL, localStorage และความคืบหน้าของ PyPath เดิมในระดับใด และอนุญาตให้เปลี่ยน contract ส่วนใดได้บ้าง?

## Answer

รักษาความเข้ากันได้กับ PyPath เดิมดังนี้:

- เก็บ localStorage key เดิมของ Python ทุก key ไว้ เพื่อรักษาความคืบหน้าและหลักฐานการประเมิน
- สาย Node.js และ Next.js ใช้ key ใหม่ภายใต้ namespace `devpath` และแยกข้อมูลตามสายกับคอร์ส
- URL เดิม เช่น `#lesson-1` และ `#course-2/lesson-1` ต้องยังเปิดบท Python เดิมได้
- URL ใหม่ของสายเพิ่มเติมใช้รูปแบบ `#node/course-1/lesson-1` และ `#nextjs/course-1/lesson-1`
- ไม่ย้ายหรือเปลี่ยนชื่อ key เดิม เพราะเพิ่มความเสี่ยงต่อข้อมูลผู้เรียนโดยไม่มีประโยชน์ด้านผลิตภัณฑ์
