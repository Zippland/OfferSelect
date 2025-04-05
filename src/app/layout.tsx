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
        <footer className="w-full py-5 mt-8 bg-gray-100">
          <div className="max-w-4xl mx-auto px-4">
            <div className="flex justify-center items-center gap-8 mb-3">
              <a 
                href="https://worthjob.zippland.com/" 
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col items-center"
              >
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-br from-yellow-400/70 to-orange-500/70 shadow-sm transform transition-all duration-200 group-hover:scale-110 group-hover:from-yellow-400 group-hover:to-orange-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </div>
                <span className="text-[10px] mt-1.5 text-gray-500 group-hover:text-gray-700 font-medium">Offer打分</span>
                <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="bg-white rounded-lg shadow-md p-2 max-w-[180px] text-[10px] text-gray-600 border border-gray-200">
                    <p>全面考量，计算薪资之外的工作真实价值</p>
                  </div>
                  <div className="w-2 h-2 bg-white rotate-45 border-b border-r border-gray-200 absolute left-1/2 -bottom-1 -translate-x-1/2"></div>
                </div>
              </a>
              
              <a 
                href="https://citycompare.zippland.com/" 
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col items-center"
              >
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-br from-emerald-500/70 to-blue-500/70 shadow-sm transform transition-all duration-200 group-hover:scale-110 group-hover:from-emerald-500 group-hover:to-blue-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
                  </svg>
                </div>
                <span className="text-[10px] mt-1.5 text-gray-500 group-hover:text-gray-700 font-medium">城市对比</span>
                <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="bg-white rounded-lg shadow-md p-2 max-w-[180px] text-[10px] text-gray-600 border border-gray-200">
                    <p>对比不同城市的生活成本，计算等价薪资</p>
                  </div>
                  <div className="w-2 h-2 bg-white rotate-45 border-b border-r border-gray-200 absolute left-1/2 -bottom-1 -translate-x-1/2"></div>
                </div>
              </a>
              
              <a 
                href="https://snapsolver.zippland.com/" 
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col items-center"
              >
                <div className="w-9 h-9 flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500/70 to-pink-500/70 shadow-sm transform transition-all duration-200 group-hover:scale-110 group-hover:from-purple-500 group-hover:to-pink-500">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-white" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4 5a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V7a2 2 0 00-2-2h-1.586a1 1 0 01-.707-.293l-1.121-1.121A2 2 0 0011.172 3H8.828a2 2 0 00-1.414.586L6.293 4.707A1 1 0 015.586 5H4zm6 9a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd" />
                  </svg>
                </div>
                <span className="text-[10px] mt-1.5 text-gray-500 group-hover:text-gray-700 font-medium">AI笔试</span>
                <div className="absolute bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none">
                  <div className="bg-white rounded-lg shadow-md p-2 max-w-[180px] text-[10px] text-gray-600 border border-gray-200">
                    <p>AI笔试题解答工具，截图上传获取解答</p>
                  </div>
                  <div className="w-2 h-2 bg-white rotate-45 border-b border-r border-gray-200 absolute left-1/2 -bottom-1 -translate-x-1/2"></div>
                </div>
              </a>
            </div>
            <div className="text-center">
              <span className="text-[9px] text-gray-400">更多实用工具 by zippland.com</span>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
