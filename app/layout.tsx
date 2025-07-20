import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ThemeProvider } from "next-themes";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "高考倒计时 - 为梦想而努力",
  description: "专为高考学生设计的倒计时应用，提供精确倒计时、每日励志语录和考试时间管理功能。",
  keywords: ["高考", "倒计时", "学习", "励志", "考试"],
  authors: [{ name: "高考倒计时团队" }],
  creator: "高考倒计时团队",
  publisher: "高考倒计时团队",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://gaokao-countdown.vercel.app'),
  openGraph: {
    title: "高考倒计时 - 为梦想而努力",
    description: "专为高考学生设计的倒计时应用，陪伴你走过备考的每一天。",
    url: 'https://gaokao-countdown.vercel.app',
    siteName: '高考倒计时',
    locale: 'zh_CN',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: "高考倒计时 - 为梦想而努力",
    description: "专为高考学生设计的倒计时应用，陪伴你走过备考的每一天。",
  },
  manifest: '/manifest.json',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#0a0a0a' },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased font-sans`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
