---
id: 0004
title: กำหนดขอบเขตหลักสูตร Node.js
type: grilling
status: closed
assignee: Codex
blocked_by: [0008]
---

## Question

สาย Node.js ต้องพาผู้เรียนจากระดับใดไปถึงผลลัพธ์ใด ครอบคลุมหัวข้อและโปรเจกต์อะไร และต้องมีจำนวนคอร์สหรือบทเท่าใดใน release แรก?

## Answer

สร้างสาย Node.js Backend จำนวน 8 บท โดยใช้ Node.js 24 LTS, TypeScript และ Fastify:

1. Node.js runtime, npm, ESM และ environment variables
2. Event loop, asynchronous I/O, filesystem และ stream
3. HTTP, REST, routing และ status code ด้วย Fastify
4. Request/response contract, validation และ error handling
5. SQL, SQLite, CRUD และ prepared statement
6. Authentication, authorization และความปลอดภัยพื้นฐาน
7. Automated testing ด้วย `node:test`, logging และ graceful shutdown
8. โปรเจกต์ Task Management API ที่มี CRUD, validation, database, authentication และ tests

ผลลัพธ์ปลายทางคือผู้เรียนสร้างและทดสอบ typed API ได้จริง แต่หลักสูตรไม่กล่าวอ้างว่าผู้เรียนพร้อม production โดยอัตโนมัติ เลือก Node.js รุ่น LTS ตามคำแนะนำการใช้งาน production ของโครงการ Node.js และเลือก Fastify เพราะรองรับ TypeScript, schema validation และการทดสอบเป็นแนวทางหลัก

แหล่งอ้างอิง:

- https://nodejs.org/en/about/previous-releases
- https://nodejs.org/download/release/latest-jod/docs/api/test.html
- https://fastify.dev/docs/latest/Reference/Principles/
- https://fastify.dev/docs/latest/Reference/Validation-and-Serialization/
