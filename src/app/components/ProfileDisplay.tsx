"use client";

import React from 'react';
import { Edit2 } from 'lucide-react';
import { Profile } from '../utils/profileStorage';

interface ProfileDisplayProps {
  profile: Profile;
  onEdit?: () => void;
}

const ProfileDisplay: React.FC<ProfileDisplayProps> = ({ profile, onEdit }) => {
  return (
    <div className="relative mb-4 animate-fade-in">
      {/* 浮动编辑按钮 */}
      {onEdit && (
        <button 
          onClick={onEdit}
          className="absolute top-1 right-1 bg-gray-100 hover:bg-gray-200 text-gray-500 hover:text-gray-700 p-1.5 rounded-full transition-colors duration-200 z-10 opacity-50 hover:opacity-100"
          aria-label="编辑个人履历"
        >
          <Edit2 size={14} />
        </button>
      )}
      
      {/* 标题 */}
      <div className="text-center">
        <h1 className="text-lg font-bold text-gray-800">{profile.title}</h1>
      </div>
      
      {/* 个人标签 */}
      <div className="flex items-center justify-center flex-wrap gap-2 mt-2">
        <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded-full text-xs tag-appear">
          {profile.background}
        </span>
        <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded-full text-xs tag-appear">
          {profile.major}
        </span>
        <span className="px-2 py-0.5 bg-orange-100 text-orange-700 rounded-full text-xs tag-appear">
          {profile.experience}
        </span>
      </div>
    </div>
  );
};

export default ProfileDisplay; 