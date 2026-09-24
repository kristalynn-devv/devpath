import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "DevPath — Learn. Build. Grow.",
  description:
    "เส้นทางเรียน Python, JavaScript, Node.js และ Next.js ภาษาไทย ผ่านโปรเจกต์ที่ลงมือทำจริง",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="th">
      <body>{children}</body>
    </html>
  );
}
