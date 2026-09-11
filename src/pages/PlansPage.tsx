/**
 * A级核心页面：保障方案 (/plans)
 * 遵循《长垣人寿官网_施工规范_v2.1》第五点四节
 * 
 * 顶部结构锁定：
 * 页面 Hero/标题 -> 分类与场景切换 -> 场景自然语言输入 -> 推荐方案 -> 场景入口 -> 全部方案网格
 */

import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useApp } from '../app/AppContext';
import { PLANS_PAGE_CONTENT, PLAN_ITEMS } from '../content/pages/plans';
import { PlanCard } from '../components/insurance/PlanCard';
import { AssetImage } from '../components/common/AssetImage';
import { Sparkles, Search, Send, CheckCircle2, ArrowRight, Bot, Filter } from 'lucide-react';

export const PlansPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { openAiModal } = useApp();
  const content = PLANS_PAGE_CONTENT;

  // 当前激活的分类 tab
  const categoryParam = searchParams.get('category') || 'all';
  const tabParam = searchParams.get('tab');
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryParam);
  const [scenarioInput, setScenarioInput] = useState('');

  useEffect(() => {
    if (tabParam === 'scenario') {
      setSelectedCategory('scenario');
    } else if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam, tabParam]);

  const handleTabChange = (id: string) => {
    setSelectedCategory(id);
    if (id === 'all') {
      setSearchParams({});
    } else if (id === 'scenario') {
      setSearchParams({ tab: 'scenario' });
    } else {
      setSearchParams({ category: id });
    }
  };

  const handleScenarioSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!scenarioInput.trim()) return;
    openAiModal(scenarioInput);
  };

  const filteredPlans = PLAN_ITEMS.filter(p => {
    if (selectedCategory === 'all' || selectedCategory === 'scenario') return true;
    return p.category === selectedCategory;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
      {/* 1. 页面 Hero / 标题区 */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-white via-[#F4F8FC] to-white border border-[#D9E4F2] shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF1FB] text-[#123B70] text-xs font-semibold">
              <Sparkles className="w-4 h-4 text-[#1C5FB8]" />
              <span>{content.hero.badge}</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0B1733] tracking-tight">
              {content.hero.title}
            </h1>
            <p className="text-xs sm:text-sm text-[#60718A] leading-relaxed max-w-2xl">
              {content.hero.description}
            </p>
          </div>

          <div className="lg:col-span-4 hidden lg:block">
            <AssetImage assetId={content.hero.assetId} aspectRatio="aspect-[16/9]" />
          </div>
        </div>
      </section>

      {/* 2. 场景自然语言输入助手（规范 5.4 要求：类似搜索与需求理解，先解释已有覆盖，再说明未覆盖风险） */}
      <section className="p-6 rounded-2xl bg-white border border-[#D9E4F2] shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Bot className="w-5 h-5 text-[#1C5FB8]" />
          <h2 className="text-base font-bold text-[#0B1733]">
            {content.scenarioHelper.title}
          </h2>
        </div>
        <p className="text-xs text-[#60718A]">
          {content.scenarioHelper.subtitle}
        </p>

        <form onSubmit={handleScenarioSubmit} className="flex gap-2">
          <input
            type="text"
            value={scenarioInput}
            onChange={e => setScenarioInput(e.target.value)}
            placeholder={content.scenarioHelper.placeholder}
            className="flex-1 px-4 py-2.5 text-xs sm:text-sm rounded-xl border border-slate-200 outline-none focus:border-[#1C5FB8] bg-slate-50/50 focus:bg-white transition-all"
          />
          <button
            type="submit"
            className="px-5 py-2.5 bg-[#123B70] hover:bg-[#1C5FB8] text-white text-xs sm:text-sm font-semibold rounded-xl flex items-center gap-1.5 transition-all shrink-0 shadow-xs"
          >
            <span>分析匹配</span>
            <Send className="w-3.5 h-3.5" />
          </button>
        </form>

        {/* 快捷场景示例点击 */}
        <div className="flex flex-wrap items-center gap-2 pt-1 text-xs">
          <span className="text-slate-400">常见生活场景示例：</span>
          {content.scenarioHelper.defaultPromptExamples.map((ex, i) => (
            <button
              key={i}
              type="button"
              onClick={() => openAiModal(ex)}
              className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-[#EAF1FB] text-slate-700 hover:text-[#123B70] transition-colors"
            >
              {ex}
            </button>
          ))}
        </div>
      </section>

      {/* 3. 分类与场景切换 Tabs */}
      <section className="space-y-6">
        <div className="flex items-center gap-2 overflow-x-auto pb-2 border-b border-slate-200 scrollbar-none">
          {content.tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => handleTabChange(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold whitespace-nowrap transition-all ${
                selectedCategory === tab.id
                  ? 'bg-[#123B70] text-white shadow-xs'
                  : 'bg-white text-[#60718A] hover:text-[#0B1733] hover:bg-slate-100 border border-slate-200/70'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* 4. 保障方案产品卡片网格 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPlans.map(plan => (
            <PlanCard key={plan.id} plan={plan} />
          ))}
        </div>
      </section>
    </div>
  );
};
