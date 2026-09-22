---
id: 0005
title: กำหนดขอบเขตหลักสูตร Next.js
type: grilling
status: closed
assignee: Codex
blocked_by: [0008]
---

## Question

สาย Next.js ต้องพาผู้เรียนจากระดับใดไปถึงผลลัพธ์ใด ครอบคลุม React, App Router, data fetching, deployment และโปรเจกต์ในระดับใดสำหรับ release แรก?

## Answer

สร้างสาย Next.js Web จำนวน 8 บท โดยใช้ Next.js 16, React 19, TypeScript และ App Router:

1. React: component, props, state, event และ form
2. App Router: `layout`, `page`, navigation และ dynamic route
3. Server Components กับ Client Components และการแบ่งขอบเขต
4. Data fetching, loading, error, streaming, caching และ revalidation
5. Form และ mutation ด้วย Server Functions/Actions พร้อม validation
6. Route Handlers, authentication, authorization และการเก็บ secrets
7. Accessibility, metadata, performance และทดสอบด้วย Playwright
8. โปรเจกต์ Task Dashboard ที่เชื่อม Task Management API จากสาย Node.js หรือใช้ API ตัวอย่างหากไม่ได้เรียน Node.js

ผลลัพธ์ปลายทางคือผู้เรียนสร้าง ทดสอบ และ production build เว็บด้วย App Router ได้ เข้าใจความต่างระหว่าง Server/Client Components และเลือกรูปแบบ deployment ให้ตรงกับฟีเจอร์ที่ใช้ โดยไม่กล่าวอ้างว่าการเรียนจบเท่ากับพร้อมดูแล production

แหล่งอ้างอิง:

- https://nextjs.org/docs/app
- https://nextjs.org/docs/app/getting-started/server-and-client-components
- https://nextjs.org/docs/app/getting-started/fetching-data
- https://nextjs.org/docs/app/guides/testing
- https://nextjs.org/docs/app/getting-started/deploying
