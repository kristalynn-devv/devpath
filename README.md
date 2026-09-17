# PyPath — Python for AI

เว็บแอปภาษาไทยสำหรับเรียน Python สู่ AI ตั้งแต่พื้นฐานจนถึง AI Engineering

ไม่มีบัญชี ไม่มี backend ไม่รันโค้ดในเบราว์เซอร์ — ความคืบหน้าและผลแบบทดสอบเก็บใน `localStorage` ของเครื่องผู้เรียนเท่านั้น

## สิ่งที่มี

- **5 คอร์ส** รวม 40 บท (พื้นฐาน → ML → Deep Learning → LLM/RAG → AI Engineering)
- อ่านแนวคิด ตัวอย่างโค้ด แบบฝึกหัด และแบบทดสอบความเข้าใจทุกบท
- **Adaptive coach** แนะนำบทจากคำตอบครั้งแรกในคลังประเมิน 3 ระดับต่อคอร์ส
- รองรับมือถือและเดสก์ท็อป ใช้ URL hash เลือกคอร์ส/บท

## เริ่มต้น

ต้องการ Node.js 18+

```bash
npm install
npm run dev
```

เปิด http://localhost:3000

สำหรับ production:

```bash
npm run build
npm run start
```

## สคริปต์

| คำสั่ง | ความหมาย |
| --- | --- |
| `npm run dev` | เซิร์ฟเวอร์พัฒนา |
| `npm run build` | build production (ต้องทำก่อน `npm test`) |
| `npm run start` | เปิด production server |
| `npm run typecheck` | TypeScript แบบ strict |
| `npm test` | Playwright (ต้องมี Chrome และ build ล่าสุด) |
| `npm run format` | Prettier |
| `python3 scripts/check-examples.py` | ตรวจและรันตัวอย่างโค้ดในคอร์ส 2–5 |

## ขอบเขต

ดูรายละเอียดผลิตภัณฑ์ใน [`PRD.md`](PRD.md) สถานะงานล่าสุดใน [`HANDOFF.md`](HANDOFF.md)

## License

[MIT](LICENSE) © 2026 Kristalyn Narongpiyawatha
