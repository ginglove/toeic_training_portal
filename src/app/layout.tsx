import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { MobileNav } from "@/components/MobileNav";
import { ToastProvider } from "@/components/Toast";

export const metadata: Metadata = {
  title: "TOEIC PRO v10.0.0 — Hệ Thống Luyện Thi 30 Ngày Thích Ứng (100% Free)",
  description: "Nền tảng khảo thí TOEIC quốc tế miễn phí trọn vẹn: Khảo thí IRT 2PL, Lộ trình Saga 2.5D, Sổ tay giãn cách SM-2, Thi thử chuẩn hóa ETS.",
};

import { AdaptivePerformanceManager } from "@/components/AdaptivePerformanceManager";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="dark">
      <body className="min-h-[100dvh] bg-slate-950 text-slate-100 antialiased selection:bg-indigo-500 selection:text-white pb-16 md:pb-0">
        <AdaptivePerformanceManager />
        <ToastProvider>
          <Header />
          <main className="relative flex flex-col min-h-[calc(100dvh-64px)]">
            {children}
          </main>
          <MobileNav />
        </ToastProvider>
      </body>
    </html>
  );
}
