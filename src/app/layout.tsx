"use client";

import "./globals.css";
import { useEffect } from "react";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // 禁用系统暗模式
  useEffect(() => {
    // 添加CSS类以防止颜色模式改变
    document.documentElement.classList.add('light-mode-only');
    document.documentElement.style.colorScheme = 'light';
    
    // 动态设置页面标题
    document.title = "OfferSelect - 就业选择参考";
  }, []);

  return (
    <html lang="zh-CN" className="light-mode-only">
      <head>
        <meta name="color-scheme" content="light only" />
        <meta name="theme-color" content="#ffffff" />
        {/* 禁用手机浏览器中的"深色模式"设置 */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="format-detection" content="telephone=no" />
        <meta name="description" content="为计算机专业学生提供就业选择参考的应用" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
