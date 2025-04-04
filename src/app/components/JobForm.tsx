"use client";

import React, { useState } from 'react';
import { Job, generateRandomColor } from '../utils/jobStorage';
import { DollarSign, Clock, MapPin, Gift, Shield, ThumbsUp, ThumbsDown, RefreshCw, X, Info, Check, Palette } from 'lucide-react';

interface JobFormProps {
  job?: Job;
  onSave: (job: Job) => void;
  onCancel: () => void;
}

// 预定义的颜色选项
const colorOptions = [
  { color: "#4285F4", borderColor: "#2a75f3", name: "谷歌蓝" },
  { color: "#0F9D58", borderColor: "#0a8c4a", name: "苹果绿" },
  { color: "#DB4437", borderColor: "#c7392d", name: "番茄红" },
  { color: "#F4B400", borderColor: "#dba100", name: "向日葵" },
  { color: "#9C27B0", borderColor: "#89219a", name: "优雅紫" },
  { color: "#795548", borderColor: "#654a40", name: "可可棕" },
  { color: "#607D8B", borderColor: "#546e7a", name: "羊毛灰" },
  { color: "#673AB7", borderColor: "#5e35b1", name: "薰衣草" },
  { color: "#FF5722", borderColor: "#e64a19", name: "橙色" }, 
  { color: "#009688", borderColor: "#00897b", name: "薄荷" },
  { color: "#FF9800", borderColor: "#fb8c00", name: "橘子" },
  { color: "#8BC34A", borderColor: "#7cb342", name: "青草" },
  { color: "#3F51B5", borderColor: "#3949ab", name: "靛蓝" },
  { color: "#E91E63", borderColor: "#d81b60", name: "玫瑰" },
  { color: "#CDDC39", borderColor: "#c0ca33", name: "柠檬" }
];

const JobForm: React.FC<JobFormProps> = ({ job, onSave, onCancel }) => {
  const defaultJob: Job = job || {
    company: '',
    monthlyBase: '',
    monthsPerYear: '',
    otherBonuses: '',
    salaryRating: 3,
    benefits: '',
    insurance: '',
    workHours: '',
    wlbRating: 3,
    location: '',
    pros: '',
    cons: '',
    rejected: false,
    ...generateRandomColor()
  };

  const [formData, setFormData] = useState<Job>(defaultJob);
  const [showSalaryHelp, setShowSalaryHelp] = useState<boolean>(false);
  const [showColorPicker, setShowColorPicker] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: checked }));
  };

  const handleRatingChange = (name: string, value: number) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleColorChange = (color: string, borderColor: string) => {
    setFormData(prev => ({ ...prev, color, borderColor }));
    setShowColorPicker(false);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  const hasChanges = () => {
    return JSON.stringify(formData) !== JSON.stringify(defaultJob);
  };

  const resetForm = () => {
    setFormData(defaultJob);
  };

  // 格式化薪资显示
  const formatSalary = (): string => {
    if (formData.monthlyBase && formData.monthsPerYear) {
      let formatted = `${formData.monthlyBase}×${formData.monthsPerYear}`;
      if (formData.otherBonuses) {
        formatted += `+${formData.otherBonuses}`;
      }
      return formatted;
    }
    return '请填写基本信息';
  };

  // 星级评分组件
  const RatingSelector = ({ name, value, color = 'blue' }: { name: string; value: number; color?: string }) => (
    <div className="flex items-center space-x-1 mt-1">
      {[1, 2, 3, 4, 5].map(rating => (
        <button
          key={rating}
          type="button"
          className={`h-7 w-7 rounded-full flex items-center justify-center text-xs ${
            rating <= value 
              ? (color === 'blue' ? 'bg-blue-500 text-white' : 'bg-green-500 text-white')
              : 'bg-gray-100 text-gray-500'
          }`}
          onClick={() => handleRatingChange(name, rating)}
        >
          {rating}
        </button>
      ))}
    </div>
  );

  const ColorPicker = () => (
    <div className="absolute right-0 top-full mt-1 p-2 bg-white rounded-xl shadow-lg z-20 border border-gray-200 animate-fade-in">
      <div className="w-64 max-h-56 overflow-y-auto px-1 py-1.5">
        <div className="flex flex-wrap gap-1.5 justify-center">
          {colorOptions.map((option) => (
            <button
              key={option.color}
              type="button"
              onClick={() => handleColorChange(option.color, option.borderColor)}
              className="group relative w-9 h-9 rounded-full transition-transform hover:scale-110 flex items-center justify-center"
              title={option.name}
              style={{ background: option.color }}
            >
              {formData.color === option.color && (
                <span className="absolute inset-0 flex items-center justify-center">
                  <Check className="text-white drop-shadow-md" size={16} />
                </span>
              )}
              <span className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 border-2 border-white"></span>
            </button>
          ))}
        </div>
      </div>
      <div className="absolute top-1 right-1">
        <button 
          type="button" 
          onClick={() => setShowColorPicker(false)}
          className="text-gray-500 hover:text-gray-700 p-0.5 rounded-full hover:bg-gray-100"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );

  return (
    <form onSubmit={handleSubmit} className="bg-white p-4 rounded-xl shadow-md relative animate-slide-up">
      <div className="absolute top-3 right-3 flex items-center space-x-2">
        <button
          type="button"
          onClick={resetForm}
          className={`text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition-colors ${hasChanges() ? '' : 'opacity-50 cursor-not-allowed'}`}
          title="重置更改"
          disabled={!hasChanges()}
        >
          <RefreshCw size={16} />
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-gray-400 hover:text-gray-600 p-1.5 rounded-full hover:bg-gray-100 transition-colors"
          title="取消"
        >
          <X size={16} />
        </button>
      </div>
      
      <h2 className="text-lg font-bold text-center mb-6 pt-1">
        {job ? '编辑工作机会' : '添加新工作机会'}
      </h2>
      
      <div className="space-y-4">
        {/* 公司名称和颜色选择 */}
        <div className="mb-3">
          <div className="flex justify-between items-center mb-1">
            <label htmlFor="company" className="block text-sm font-medium text-gray-700">公司名称</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowColorPicker(!showColorPicker)}
                className="flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium transition-colors"
                style={{ 
                  backgroundColor: `${formData.color}20`, 
                  color: formData.color,
                  border: `1px solid ${formData.borderColor}40` 
                }}
              >
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: formData.color }}></div>
                <Palette size={12} />
              </button>
              {showColorPicker && <ColorPicker />}
            </div>
          </div>
          <div className="relative">
            <div 
              className="absolute left-0 top-0 bottom-0 w-1.5 rounded-l-md" 
              style={{ backgroundColor: formData.color }}
            ></div>
            <input
              type="text"
              id="company"
              name="company"
              value={formData.company}
              onChange={handleChange}
              className="w-full pl-4 pr-14 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="请输入公司名称"
              required
              maxLength={25}
              style={{ borderLeftColor: formData.color }}
            />
            <div className="absolute right-2 top-2 text-xs text-gray-400">
              {formData.company.length}/25
            </div>
          </div>
        </div>
        
        {/* 薪资 */}
        <div className="mb-3">
          <div className="flex items-center mb-1">
            <div className="text-sm font-medium text-gray-700">薪资信息</div>
            <button 
              type="button"
              onClick={() => setShowSalaryHelp(!showSalaryHelp)}
              className="ml-1 text-blue-500 p-0.5 rounded-full hover:bg-blue-50"
            >
              <Info size={12} />
            </button>
          </div>
          
          {showSalaryHelp && (
            <div className="mb-2 text-xs text-gray-600 bg-blue-50 p-2 rounded-md">
              示例：20×13+5万股票+2万签字费<br/>
              格式：月Base × 发薪月数 + 其他奖金
            </div>
          )}
          
          <div className="grid grid-cols-12 gap-2 mb-2">
            <div className="col-span-5">
              <label htmlFor="monthlyBase" className="block text-xs text-gray-500 mb-1">月基本工资</label>
              <input
                type="text"
                id="monthlyBase"
                name="monthlyBase"
                value={formData.monthlyBase}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="月Base"
                required
              />
            </div>
            
            <div className="flex items-center justify-center col-span-2">
              <span className="text-lg text-gray-400">×</span>
            </div>
            
            <div className="col-span-5">
              <label htmlFor="monthsPerYear" className="block text-xs text-gray-500 mb-1">发薪月数</label>
              <input
                type="text"
                id="monthsPerYear"
                name="monthsPerYear"
                value={formData.monthsPerYear}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="例如：12、13"
                required
              />
            </div>
          </div>
          
          <div className="mb-2">
            <label htmlFor="otherBonuses" className="block text-xs text-gray-500 mb-1">其他奖金</label>
            <input
              type="text"
              id="otherBonuses"
              name="otherBonuses"
              value={formData.otherBonuses}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="其他奖金、绩效、期权、签字费（可选）"
            />
          </div>
          
          <div className="text-xs text-gray-600 mt-1 px-1 bg-gray-50 p-2 rounded">
            薪资预览：<span className="text-gray-800 font-medium">{formatSalary()}</span>
          </div>
          
          <div className="mt-2">
            <div className="text-sm font-medium text-gray-700 mb-1">薪资评级</div>
            <RatingSelector name="salaryRating" value={formData.salaryRating} color="blue" />
          </div>
        </div>
        
        {/* 福利和社保 */}
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <label htmlFor="benefits" className="block text-sm font-medium text-gray-700 mb-1">福利</label>
            <input
              type="text"
              id="benefits"
              name="benefits"
              value={formData.benefits}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="公司福利"
            />
          </div>
          
          <div>
            <label htmlFor="insurance" className="block text-sm font-medium text-gray-700 mb-1">社保</label>
            <input
              type="text"
              id="insurance"
              name="insurance"
              value={formData.insurance}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="社保比例"
            />
          </div>
        </div>
        
        {/* 工作时间 */}
        <div className="mb-3">
          <label htmlFor="workHours" className="block text-sm font-medium text-gray-700 mb-1">工作强度</label>
          <input
            type="text"
            id="workHours"
            name="workHours"
            value={formData.workHours}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="例如：9:00-18:00 或 996"
          />
          
          <div className="mt-2">
            <div className="text-sm font-medium text-gray-700 mb-1">工作生活平衡</div>
            <RatingSelector name="wlbRating" value={formData.wlbRating} color="green" />
          </div>
        </div>
        
        {/* 地点 */}
        <div className="mb-3">
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-1">工作地点</label>
          <input
            type="text"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
            placeholder="例如：北京、上海、远程"
          />
        </div>
        
        {/* 优缺点 */}
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <label htmlFor="pros" className="block text-sm font-medium text-gray-700 mb-1">优点</label>
            <textarea
              id="pros"
              name="pros"
              value={formData.pros}
              onChange={handleChange}
              className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 resize-none"
              placeholder="这份工作的优点"
            />
          </div>
          
          <div>
            <label htmlFor="cons" className="block text-sm font-medium text-gray-700 mb-1">缺点</label>
            <textarea
              id="cons"
              name="cons"
              value={formData.cons}
              onChange={handleChange}
              className="w-full h-24 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 resize-none"
              placeholder="这份工作的缺点"
            />
          </div>
        </div>

        {/* 已婉拒选项 - 恢复为滑动开关 */}
        <div className="flex items-center justify-start px-1 mt-2 mb-3">
          <div className="relative inline-block w-10 mr-2 align-middle select-none">
            <input
              type="checkbox"
              id="rejected"
              name="rejected"
              checked={formData.rejected}
              onChange={handleCheckboxChange}
              className="opacity-0 absolute block w-6 h-6 cursor-pointer"
            />
            <label
              htmlFor="rejected"
              className={`block overflow-hidden h-6 rounded-full bg-gray-300 cursor-pointer transition-colors duration-200 ease-in-out ${formData.rejected ? 'bg-red-400' : ''}`}
            >
              <span
                className={`block h-6 w-6 rounded-full bg-white shadow transform transition-transform duration-200 ease-in-out ${formData.rejected ? 'translate-x-4' : 'translate-x-0'}`}
              />
            </label>
          </div>
          <label htmlFor="rejected" className="text-sm text-gray-700 cursor-pointer">
            已婉拒此Offer
          </label>
        </div>
      </div>
      
      <div className="mt-6">
        <button
          type="submit"
          className="w-full py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          保存工作机会
        </button>
      </div>
    </form>
  );
};

export default JobForm; 