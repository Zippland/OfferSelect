"use client";

export interface Profile {
  title: string;
  background: string;
  major: string;
  experience: string;
}

// 默认的个人履历数据
const defaultProfile: Profile = {
  title: "校招Offer求帮选（示例标题）",
  background: "9本海硕",
  major: "计算机科班",
  experience: "7段实习"
};

// 从localStorage获取保存的个人履历数据
export const getProfile = (): Profile => {
  if (typeof window === 'undefined') {
    return defaultProfile;
  }
  
  const savedProfile = localStorage.getItem('offerSelectProfile');
  if (savedProfile) {
    return JSON.parse(savedProfile);
  }
  
  return defaultProfile;
};

// 保存个人履历数据到localStorage
export const saveProfile = (profile: Profile): void => {
  if (typeof window !== 'undefined') {
    localStorage.setItem('offerSelectProfile', JSON.stringify(profile));
  }
};

// 重置个人履历数据为默认值
export const resetProfileToDefault = (): Profile => {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('offerSelectProfile');
  }
  return defaultProfile;
}; 