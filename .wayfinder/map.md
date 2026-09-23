# DevPath multi-track expansion

## Destination

ข้อกำหนดพร้อมพัฒนาสำหรับเปลี่ยน PyPath เป็น DevPath และเพิ่มสายเรียน Node.js กับ Next.js แยกจาก Python & AI โดยระบุโครงสร้างหลักสูตร ประสบการณ์เลือกสาย การย้ายข้อมูลเดิม และขอบเขตการเปลี่ยนชื่อครบถ้วน

## Notes

- ผู้เรียนและข้อความบนหน้าจอยังคงเป็นภาษาไทย
- แอปปัจจุบันเป็น Next.js แบบ static export ไม่มี backend หรือบัญชีผู้ใช้
- ความคืบหน้าและหลักฐานการประเมินอยู่ใน localStorage; ข้อมูลเดิมต้องไม่สูญหายโดยไม่ตั้งใจ
- ชื่อผลิตภัณฑ์ใหม่คือ DevPath และชื่อโฟลเดอร์เป้าหมายคือ `devpath`
- ใช้ `grilling` ตัดสินใจร่วมกับผู้ใช้ และใช้ `domain-modeling` แยกคำว่า สายเรียน คอร์ส บทเรียน และเทคโนโลยีของตัวแอป

## Decisions so far

- [ตั้งชื่อผลิตภัณฑ์และโฟลเดอร์ใหม่](tickets/0001-product-identity.md): ใช้ DevPath และ `devpath`
- [กำหนดความสัมพันธ์ของสามสายเรียน](tickets/0002-track-relationship.md): สามสายเริ่มแยกกันได้ โดย Node.js และ Next.js ใช้พื้นฐาน JavaScript/TypeScript ร่วมกันและไม่มีการล็อกข้ามสาย
- [วางสัญญาความเข้ากันได้ของข้อมูลผู้เรียนเดิม](tickets/0003-existing-progress-compatibility.md): รักษา localStorage และ URL ของ Python เดิม พร้อมใช้ namespace และ URL ใหม่แยกสำหรับ Node.js กับ Next.js
- [กำหนดพื้นฐาน JavaScript และ TypeScript ที่ใช้ร่วมกัน](tickets/0008-javascript-typescript-foundation.md): ใช้คอร์สพื้นฐาน 8 บทพร้อมแบบประเมินข้ามบท ก่อนเลือกต่อ Node.js หรือ Next.js โดยไม่ล็อกเส้นทาง
- [กำหนดขอบเขตหลักสูตร Node.js](tickets/0004-nodejs-curriculum.md): ใช้ 8 บทบน Node.js 24 LTS, TypeScript และ Fastify จบด้วย Task Management API ที่มี database, auth และ tests
- [กำหนดขอบเขตหลักสูตร Next.js](tickets/0005-nextjs-curriculum.md): ใช้ 8 บทบน Next.js 16, React 19, TypeScript และ App Router จบด้วย Task Dashboard ที่ต่อ Node.js API หรือ API ตัวอย่างได้
- [ออกแบบการเลือกสายและการนำทาง](tickets/0006-learning-navigation.md): ใช้ Variant B แบบแผนที่ แสดง Python แยกอิสระและพื้นฐาน JavaScript/TypeScript แตกไป Node.js หรือ Next.js พร้อม full-stack เป็นปลายทางเสริม
- [ล็อกขอบเขต release และการเปลี่ยนชื่อทางเทคนิค](tickets/0007-release-and-rename-scope.md): release แรกมี 64 บทครบสามสาย ใช้แบรนด์ DevPath รวมทั้งชื่อ package, โฟลเดอร์, GitHub repository และ Cloudflare Pages โดยคง static export ไป `out`

## Not yet specified

แผนตัดสินใจจบแล้ว ไม่มีคำถามค้างก่อนเริ่ม build

## Out of scope

- ระบบบัญชีผู้ใช้ การซิงก์หลายอุปกรณ์ และ backend สำหรับเก็บความคืบหน้า
- การรันโค้ด Node.js, Next.js หรือ Python ภายในเบราว์เซอร์
