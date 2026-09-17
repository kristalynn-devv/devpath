import type { Metadata } from "next";
import "./globals.css";
export const metadata: Metadata = {
  title: "PyPath — Python for AI",
  description: "เส้นทางเรียน Python สำหรับ AI ภาษาไทย จากศูนย์สู่โปรเจกต์แรก",
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
