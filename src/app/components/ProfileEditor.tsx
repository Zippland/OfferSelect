"use client";

import React, { useState, useEffect } from 'react';
import { Profile } from '../utils/profileStorage';
import { RefreshCw, X } from 'lucide-react';

interface ProfileEditorProps {
  profile: Profile;
  onSave: (profile: Profile) => void;
  onCancel: () => void;
}

const ProfileEditor: React.FC<ProfileEditorProps> = ({ profile, onSave, onCancel }) => {
  const [formData, setFormData] = useState<Profile>(profile);
  
  // 自动聚焦第一个输入框
  useEffect(() => {
    const firstInput = document.querySelector('input[name="title"]') as HTMLInputElement;
    if (firstInput) {
      firstInput.focus();
      firstInput.select();
    }
  }, []);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };
  
  const resetForm = () => {
    setFormData(profile);
  };

  const hasChanges = () => {
    return JSON.stringify(formData) !== JSON.stringify(profile);
  };
  
  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-lg shadow-md relative animate-slide-up">
      <div className="absolute top-3 right-3 flex items-center space-x-2">
        <button
          type="button"
          onClick={resetForm}
          className={`text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition-colors ${hasChanges() ? '' : 'opacity-50 cursor-not-allowed'}`}
          title="重置更改"
          disabled={!hasChanges()}
        >
          <RefreshCw size={14} />
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          title="取消"
        >
          <X size={14} />
        </button>
      </div>
      
      {/* 标题区域 */}
      <h2 className="text-md font-semibold text-center mb-4 text-gray-800">编辑个人履历</h2>
      
      <div className="space-y-3">
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-1">标题</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="block w-full text-sm rounded-md border-gray-300 shadow-sm px-3 py-2 border focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
            placeholder="例如：校招Offer求帮选（示例标题）"
            maxLength={25}
          />
          <div className="flex justify-end mt-0.5">
            <span className={`text-xs ${formData.title.length > 20 ? 'text-orange-500' : 'text-gray-400'}`}>
              {formData.title.length}/25
            </span>
          </div>
        </div>
        
        <div className="grid grid-cols-1 gap-3 mt-2">
          <div className="relative">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-1.5"></span>
                背景
              </span>
            </label>
            <input
              type="text"
              name="background"
              value={formData.background}
              onChange={handleChange}
              className="block w-full text-sm rounded-md border-gray-300 shadow-sm px-3 py-2 border focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
              placeholder="例如：9本海硕"
              maxLength={10}
            />
            <div className="flex justify-between mt-0.5">
              <span className="text-xs text-gray-500">建议：学历背景</span>
              <span className={`text-xs ${formData.background.length > 8 ? 'text-orange-500' : 'text-gray-400'}`}>
                {formData.background.length}/10
              </span>
            </div>
          </div>
          
          <div className="relative">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-1.5"></span>
                专业
              </span>
            </label>
            <input
              type="text"
              name="major"
              value={formData.major}
              onChange={handleChange}
              className="block w-full text-sm rounded-md border-gray-300 shadow-sm px-3 py-2 border focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
              placeholder="例如：计算机科班"
              maxLength={10}
            />
            <div className="flex justify-between mt-0.5">
              <span className="text-xs text-gray-500">建议：专业方向</span>
              <span className={`text-xs ${formData.major.length > 8 ? 'text-orange-500' : 'text-gray-400'}`}>
                {formData.major.length}/10
              </span>
            </div>
          </div>
          
          <div className="relative">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              <span className="flex items-center">
                <span className="w-2 h-2 bg-orange-500 rounded-full mr-1.5"></span>
                经历
              </span>
            </label>
            <input
              type="text"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              className="block w-full text-sm rounded-md border-gray-300 shadow-sm px-3 py-2 border focus:ring-1 focus:ring-blue-500 focus:border-blue-500 outline-none transition-shadow"
              placeholder="例如：7段实习"
              maxLength={10}
            />
            <div className="flex justify-between mt-0.5">
              <span className="text-xs text-gray-500">建议：实习/项目经验</span>
              <span className={`text-xs ${formData.experience.length > 8 ? 'text-orange-500' : 'text-gray-400'}`}>
                {formData.experience.length}/10
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-4">
        <button
          type="submit"
          className="w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          保存履历
        </button>
      </div>
    </form>
  );
};

export default ProfileEditor; 