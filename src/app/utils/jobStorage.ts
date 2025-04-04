"use client";

import defaultJobsRaw from '../data/defaultJobs.json';

export interface Job {
  company: string;
  // 薪资相关字段
  monthlyBase: string;  // 月基本工资
  monthsPerYear: string; // 年发薪月数
  otherBonuses: string;  // 其他奖金、绩效等
  salaryRating: number;
  benefits: string;
  insurance: string;
  workHours: string;
  wlbRating: number;
  location: string;
  pros: string;
  cons: string;
  color: string;
  borderColor: string;
  rejected: boolean;
}

// 设置一个安全的默认工作数据访问方式
const defaultJobs: Job[] = defaultJobsRaw as Job[];

// 随机颜色生成函数
export const generateRandomColor = (): { color: string, borderColor: string } => {
  const colors = [
    { color: "#4285F4", borderColor: "#2a75f3" },
    { color: "#0F9D58", borderColor: "#0a8c4a" },
    { color: "#DB4437", borderColor: "#c7392d" },
    { color: "#F4B400", borderColor: "#dba100" },
    { color: "#9C27B0", borderColor: "#89219a" },
    { color: "#795548", borderColor: "#654a40" },
    { color: "#607D8B", borderColor: "#546e7a" },
    { color: "#673AB7", borderColor: "#5e35b1" }
  ];
  
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

// 从JSON文件获取默认工作数据
export const getDefaultJobs = async (): Promise<Job[]> => {
  return defaultJobs;
};

// 从localStorage获取保存的工作数据
export const getJobs = async (): Promise<Job[]> => {
  if (typeof window === 'undefined') {
    return defaultJobs;
  }
  
  const savedJobs = localStorage.getItem('offerSelectJobs');
  if (savedJobs) {
    return JSON.parse(savedJobs);
  }
  
  return defaultJobs;
};

// 保存工作数据到localStorage
export const saveJobs = (jobs: Job[]): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('offerSelectJobs', JSON.stringify(jobs));
  }
};

// 重置所有工作数据为默认值
export const resetToDefault = async (): Promise<Job[]> => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('offerSelectJobs');
  }
  return defaultJobs;
};