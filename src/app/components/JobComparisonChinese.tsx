"use client";

import React, { useState, useEffect } from 'react';
import { DollarSign, Clock, MapPin, Gift, Home, ThumbsUp, ThumbsDown, Plus, Edit, Trash2, RotateCcw, X, Camera, Eye } from 'lucide-react';
import { Job, getJobs, saveJobs, resetToDefault } from '../utils/jobStorage';
import { getProfile, saveProfile, resetProfileToDefault, Profile } from '../utils/profileStorage';
import JobForm from './JobForm';
import ProfileEditor from './ProfileEditor';
import ProfileDisplay from './ProfileDisplay';

const JobComparisonChinese = () => {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [profile, setProfile] = useState<Profile | null>(null);
  const [editingJob, setEditingJob] = useState<Job | null>(null);
  const [isAddingJob, setIsAddingJob] = useState(false);
  const [editingIndex, setEditingIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [screenshotMode, setScreenshotMode] = useState(false);
  
  // 初始化时从本地存储加载数据
  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        const loadedJobs = await getJobs();
        setJobs(loadedJobs);
        
        // 加载个人履历数据
        const loadedProfile = getProfile();
        setProfile(loadedProfile);
      } catch (error) {
        console.error('Failed to load data:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadData();
  }, []);

  // 保存更改到本地存储
  const handleSaveJobs = (updatedJobs: Job[]) => {
    setJobs(updatedJobs);
    saveJobs(updatedJobs);
  };

  // 保存个人履历
  const handleSaveProfile = (updatedProfile: Profile) => {
    setProfile(updatedProfile);
    saveProfile(updatedProfile);
    setIsEditingProfile(false);
  };

  // 保存编辑的工作数据
  const handleSaveJob = (job: Job) => {
    let updatedJobs: Job[];
    
    if (editingIndex !== null) {
      // 编辑现有工作
      updatedJobs = [...jobs];
      updatedJobs[editingIndex] = job;
    } else {
      // 添加新工作
      updatedJobs = [...jobs, job];
    }
    
    handleSaveJobs(updatedJobs);
    setEditingJob(null);
    setIsAddingJob(false);
    setEditingIndex(null);
  };

  // 编辑工作数据 - 直接通过引用查找对象在原始数组中的索引
  const handleEditJob = (jobToEdit: Job) => {
    const index = jobs.findIndex(j => j === jobToEdit);
    if (index !== -1) {
      setEditingJob(jobs[index]);
      setEditingIndex(index);
      setIsAddingJob(false);
    }
  };

  // 删除工作数据 - 直接通过引用查找对象在原始数组中的索引
  const handleDeleteJob = (jobToDelete: Job) => {
    const index = jobs.findIndex(j => j === jobToDelete);
    if (index !== -1 && window.confirm('确定要删除这个工作机会吗？')) {
      const updatedJobs = [...jobs];
      updatedJobs.splice(index, 1);
      handleSaveJobs(updatedJobs);
    }
  };

  // 标记/取消标记为已婉拒 - 直接通过引用查找对象在原始数组中的索引
  const handleToggleRejected = (jobToToggle: Job) => {
    const index = jobs.findIndex(j => j === jobToToggle);
    if (index !== -1) {
      const updatedJobs = [...jobs];
      updatedJobs[index] = {
        ...updatedJobs[index],
        rejected: !updatedJobs[index].rejected
      };
      handleSaveJobs(updatedJobs);
    }
  };

  // 重置为默认数据
  const handleReset = async () => {
    if (window.confirm('确定要重置所有工作数据为默认值吗？')) {
      try {
        setIsLoading(true);
        const defaultJobs = await resetToDefault();
        setJobs(defaultJobs);
      } catch (error) {
        console.error('Failed to reset jobs:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // 取消编辑或添加
  const handleCancel = () => {
    setEditingJob(null);
    setIsAddingJob(false);
    setEditingIndex(null);
    setIsEditingProfile(false);
  };

  const renderRatingBar = (rating: number, colorClass: string) => {
    return (
      <div className="flex items-center w-full">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className={`h-1.5 w-2 rounded-sm mx-0.5 ${i < rating ? colorClass : 'bg-gray-200'}`}
          />
        ))}
      </div>
    );
  };

  // 添加渐变模糊效果给已拒绝的卡片
  const getRejectedStyle = (isRejected: boolean) => {
    if (!isRejected) return {};
    return {
      filter: 'grayscale(25%)',
      opacity: 0.85
    };
  };

  // 对职位进行排序，未拒绝的放前面，已拒绝的放后面
  const sortedJobs = [...jobs].sort((a, b) => {
    if (a.rejected === b.rejected) return 0;
    return a.rejected ? 1 : -1;
  });

  // 添加一个工具函数来处理薪资显示
  const formatSalary = (job: Job): string => {
    if (job.monthlyBase && job.monthsPerYear) {
      let formattedSalary = `${job.monthlyBase}×${job.monthsPerYear}`;
      if (job.otherBonuses) {
        formattedSalary += `+${job.otherBonuses}`;
      }
      return formattedSalary;
    }
    return '';
  };

  // 如果正在编辑个人履历，显示个人履历编辑器
  if (isEditingProfile && profile) {
    return (
      <div className="w-full max-w-md mx-auto animate-slide-up">
        <ProfileEditor 
          profile={profile}
          onSave={handleSaveProfile}
          onCancel={handleCancel}
        />
      </div>
    );
  }

  // 如果正在编辑或添加工作，显示表单
  if (editingJob || isAddingJob) {
    return (
      <div className="w-full max-w-md mx-auto animate-slide-up">
        <JobForm 
          job={editingJob || undefined} 
          onSave={handleSaveJob} 
          onCancel={handleCancel} 
        />
      </div>
    );
  }

  // 如果正在加载，显示加载状态
  if (isLoading || !profile) {
    return (
      <div className="w-full max-w-md mx-auto bg-gray-50 p-4 rounded-lg font-sans flex justify-center items-center h-64">
        <div className="text-center">
          <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-blue-500 border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
          <p className="mt-2 text-gray-600">正在加载数据...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto bg-gray-50 p-4 rounded-lg font-sans relative">
      {/* 页面标题和截图模式按钮 */}
      <div className="flex justify-between items-center mb-3">
        <div className="text-xs text-gray-500 tracking-wide font-medium">
          OFFER SELECT
        </div>
        
        <div className="flex items-center gap-2">
          <span className={`text-sm text-blue-600`}>
            {screenshotMode ? "退出截图" : "截图模式"}
          </span>
          <button
            onClick={() => setScreenshotMode(!screenshotMode)}
            className={`relative flex items-center justify-center w-8 h-8 rounded-full transition-all duration-300 overflow-hidden ${
              screenshotMode 
                ? 'bg-blue-100 text-blue-600 shadow-inner ring-2 ring-blue-300' 
                : 'bg-blue-50 text-blue-500 shadow-sm hover:bg-blue-100 hover:text-blue-600'
            }`}
            title={screenshotMode ? "退出截图模式" : "进入截图模式"}
          >
            <span className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${screenshotMode ? 'opacity-100' : 'opacity-0'}`}>
              <Eye size={16} />
            </span>
            <span className={`absolute inset-0 flex items-center justify-center transition-opacity duration-300 ${screenshotMode ? 'opacity-0' : 'opacity-100'}`}>
              <Camera size={16} />
            </span>
            {screenshotMode && (
              <span className="absolute inset-0 bg-blue-400 opacity-20 animate-pulse-light"></span>
            )}
          </button>
        </div>
      </div>

      {/* 个人履历显示区域 */}
      <ProfileDisplay 
        profile={profile} 
        onEdit={!screenshotMode ? () => setIsEditingProfile(true) : undefined} 
      />
      
      {/* Controls - 在截图模式下隐藏 */}
      {!screenshotMode && (
        <div className="flex justify-between mb-3">
          <button 
            onClick={() => setIsAddingJob(true)}
            className="flex items-center text-sm bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
          >
            <Plus size={14} className="mr-1" />
            添加
          </button>
          <button 
            onClick={handleReset}
            className="flex items-center text-sm bg-gray-200 text-gray-800 px-2 py-1 rounded-md hover:bg-gray-300"
          >
            <RotateCcw size={14} className="mr-1" />
            重置
          </button>
        </div>
      )}
      
      {/* Legend */}
      <div className={`flex justify-between ${!screenshotMode ? 'mb-2' : 'mb-3'} px-1 text-xs text-gray-500`}>
        <div className="flex items-center space-x-2">
          <div className="flex items-center">
            <div className="w-3 h-3 bg-blue-500 rounded-full mr-1"></div>
            <span>薪资</span>
          </div>
          <div className="flex items-center">
            <div className="w-3 h-3 bg-green-500 rounded-full mr-1"></div>
            <span>工作生活平衡度</span>
          </div>
        </div>
        <div className="flex items-center group cursor-help relative">
          <div className="h-3 w-3 relative mr-1">
            <svg className="w-3 h-3 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </div>
          <span>{screenshotMode ? "已婉拒" : "标记为已拒绝"}</span>
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-1 w-32 bg-white rounded-md shadow-lg p-2 text-xs opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
            <div className="text-center font-medium text-gray-700 mb-1 border-b pb-1">已婉拒的机会</div>
            <ul className="space-y-1">
              {sortedJobs.filter(job => job.rejected).map((job, i) => (
                <li key={i} className="flex items-center">
                  <div className="w-2 h-2 rounded-full mr-1" style={{ backgroundColor: job.color }}></div>
                  <span className="text-gray-600 truncate">{job.company}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* 没有工作数据时显示空状态 */}
      {sortedJobs.length === 0 && (
        <div className="text-center py-10 bg-white rounded-lg shadow">
          <div className="text-gray-500 mb-2">暂无工作数据</div>
          {!screenshotMode && (
            <button 
              onClick={() => setIsAddingJob(true)}
              className="text-blue-500 hover:text-blue-700 font-medium"
            >
              添加第一个工作机会
            </button>
          )}
        </div>
      )}

      {/* Main Grid */}
      {sortedJobs.length > 0 && (
        <div className="grid grid-cols-2 gap-2">
          {sortedJobs.map((job, index) => (
            <div 
              key={index} 
              className="relative bg-white rounded-lg shadow-md overflow-hidden border"
              style={{ 
                borderColor: job.borderColor,
                ...getRejectedStyle(job.rejected)
              }}
            >
              {/* Controls overlay - 在截图模式下隐藏 */}
              {!screenshotMode && (
                <div className="absolute top-0 right-0 flex space-x-1 p-1 z-10">
                  <button 
                    onClick={() => handleEditJob(job)}
                    className="text-white bg-black bg-opacity-20 rounded-full p-1 hover:bg-opacity-30"
                  >
                    <Edit size={10} />
                  </button>
                  <button 
                    onClick={() => handleDeleteJob(job)}
                    className="text-white bg-black bg-opacity-20 rounded-full p-1 hover:bg-opacity-30"
                  >
                    <Trash2 size={10} />
                  </button>
                  <button 
                    onClick={() => handleToggleRejected(job)}
                    className={`${job.rejected ? 'text-green-500' : 'text-red-500'} bg-black bg-opacity-20 rounded-full p-1 hover:bg-opacity-30`}
                    title={job.rejected ? '取消婉拒' : '标记为已婉拒'}
                  >
                    {job.rejected ? <ThumbsUp size={10} /> : <X size={10} />}
                  </button>
                </div>
              )}
              
              {/* Header */}
              <div 
                className="p-2 text-white relative"
                style={{ backgroundColor: job.color }}
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-sm font-bold">{job.company}</h3>
                  {job.rejected && (
                    <div className={`absolute ${screenshotMode ? '-top-1 -right-1 transform rotate-12' : '-top-1.5 -right-1.5 transform rotate-12'} transition-all duration-300`}>
                      <div className="flex items-center justify-center w-6 h-6">
                        <div className="absolute w-6 h-6 bg-white bg-opacity-80 rounded-full shadow-sm"></div>
                        <svg className="relative w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <line x1="18" y1="6" x2="6" y2="18"></line>
                          <line x1="6" y1="6" x2="18" y2="18"></line>
                        </svg>
                      </div>
                    </div>
                  )}
                </div>
                {/* 截图模式下显示网址水印 */}
                {screenshotMode && (
                  <div className="absolute bottom-0 right-0">
                    <div className="text-[6px] text-white/70 pr-1 pb-0.5">
                      OfferSelect.zippland.com
                    </div>
                  </div>
                )}
              </div>
              
              {/* Content */}
              <div className="p-2">
                {/* Salary */}
                <div className="flex items-center mb-1.5">
                  <DollarSign size={12} className="text-blue-600 mr-1.5 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex justify-between items-center">
                      <span className="text-xs font-medium">{formatSalary(job)}</span>
                    </div>
                    {renderRatingBar(job.salaryRating, 'bg-blue-500')}
                  </div>
                </div>
                
                {/* Work Hours */}
                <div className="flex items-center mb-1.5">
                  <Clock size={12} className="text-green-600 mr-1.5 flex-shrink-0" />
                  <div className="flex-1">
                    <span className="text-xs">{job.workHours}</span>
                    {renderRatingBar(job.wlbRating, 'bg-green-500')}
                  </div>
                </div>
                
                {/* Location & Insurance combined */}
                <div className="flex items-center justify-between mb-1.5">
                  <div className="flex items-center">
                    <MapPin size={12} className="text-red-500 mr-1 flex-shrink-0" />
                    <span className="text-xs">{job.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Home size={12} className="text-purple-500 mr-1 flex-shrink-0" />
                    <span className="text-xs">{job.insurance}</span>
                  </div>
                </div>
                
                {/* Benefits */}
                <div className="flex items-center mb-1.5">
                  <Gift size={12} className="text-pink-500 mr-1.5 flex-shrink-0" />
                  <span className="text-xs truncate" title={job.benefits}>{job.benefits}</span>
                </div>
                
                {/* Pros & Cons */}
                <div className="border-t border-gray-100 pt-1.5 mt-1">
                  <div className="flex items-start mb-1">
                    <ThumbsUp size={10} className="text-green-500 mt-0.5 mr-1 flex-shrink-0" />
                    <p className="text-xs text-gray-700 line-clamp-2 break-words" title={job.pros}>{job.pros}</p>
                  </div>
                  <div className="flex items-start">
                    <ThumbsDown size={10} className="text-red-500 mt-0.5 mr-1 flex-shrink-0" />
                    <p className="text-xs text-gray-700 line-clamp-2 break-words" title={job.cons}>{job.cons}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {/* Footer */}
      <div className="mt-3 text-center text-xs text-gray-500">
        <p>薪资格式为：月Base × 发薪数 + 其他（单位：K/月）</p>
        <p className="mt-1">* wlb = 工作与生活平衡</p>
        {screenshotMode && (
          <div className="mt-2 flex justify-center">
            <div className="text-[8px] text-gray-300">
              OfferSelect.zippland.com
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default JobComparisonChinese; 