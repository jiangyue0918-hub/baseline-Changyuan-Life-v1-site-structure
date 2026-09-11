/**
 * A级核心页面：未连接终端首页
 * 遵循《长垣人寿官网_施工规范_v2.1》第五点一节
 * 
 * 模块顺序严格锁定：
 * 顶部导航 -> 品牌 Hero -> 最新公告条 -> “我想了解/办理”快捷入口 -> 六大主营保障方案 -> 品牌/服务价值区 -> 完整 Sitemap 页脚
 * 严禁在 Hero 区域新增第二个连接终端按钮（规范 4.1 硬性约束）。
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../app/AppContext';
import { PUBLIC_HOME_CONTENT } from '../content/pages/publicHome';
import { AssetImage } from '../components/common/AssetImage';
import {
  ShieldCheck,
  FileText,
  Headphones,
  Building2,
  LockKeyhole,
  Sparkles,
  UserCheck,
  ShieldAlert,
  ArrowRight,
  Bell,
  ChevronRight,
  MessageSquareText,
  PhoneCall,
  MapPin
} from 'lucide-react';

export const PublicHomePage: React.FC = () => {
  const content = PUBLIC_HOME_CONTENT;
  const { openAiModal, openHumanAdvisorModal } = useApp();

  // 图标映射
  const iconMap: Record<string, React.ReactNode> = {
    ShieldCheck: <ShieldCheck className="w-6 h-6 text-[#1C5FB8]" />,
    FileText: <FileText className="w-6 h-6 text-[#1FA866]" />,
    Headphones: <Headphones className="w-6 h-6 text-[#D9872D]" />,
    Building2: <Building2 className="w-6 h-6 text-purple-600" />,
    LockKeyhole: <LockKeyhole className="w-6 h-6 text-[#123B70]" />,
    Sparkles: <Sparkles className="w-6 h-6 text-[#1C5FB8]" />,
    UserCheck: <UserCheck className="w-6 h-6 text-[#1FA866]" />,
    ShieldAlert: <ShieldAlert className="w-6 h-6 text-[#D9872D]" />
  };

  return (
    <div className="space-y-12 sm:space-y-16 pb-16">
      {/* 1. 品牌宽幅 Hero（只承担品牌表达，不放第二个连接按钮，不放实时大盘） */}
      <section className="relative overflow-hidden bg-gradient-to-b from-white via-[#F4F8FC] to-white border-b border-[#D9E4F2] pt-8 sm:pt-14 pb-14 sm:pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* 左侧文案 */}
            <div className="lg:col-span-7 space-y-5">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#EAF1FB] text-[#123B70] text-xs font-semibold tracking-wide">
                <span className="w-2 h-2 rounded-full bg-[#1C5FB8]"></span>
                <span>{content.hero.badge}</span>
              </div>

              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-[#0B1733] tracking-tight leading-[1.25] whitespace-pre-line">
                {content.hero.title}
              </h1>

              <p className="text-base sm:text-lg text-[#60718A] leading-relaxed max-w-2xl">
                {content.hero.description}
              </p>

              {/* 仅保留业务导览按钮，禁止重复放置连接终端按钮 */}
              <div className="flex flex-wrap items-center gap-3 pt-2">
                <Link
                  to={content.hero.primaryActionLink}
                  className="px-6 py-3 rounded-xl bg-[#123B70] hover:bg-[#1C5FB8] text-white text-sm font-semibold shadow-sm hover:shadow transition-all flex items-center gap-2"
                >
                  <span>{content.hero.primaryActionText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to={content.hero.secondaryActionLink}
                  className="px-6 py-3 rounded-xl bg-white hover:bg-slate-50 text-[#123B70] border border-[#D9E4F2] text-sm font-semibold transition-all"
                >
                  {content.hero.secondaryActionText}
                </Link>
              </div>
            </div>

            {/* 右侧大图展示（长垣城市天际线真实摄影风格，降级占位） */}
            <div className="lg:col-span-5">
              <AssetImage
                assetId={content.hero.assetId}
                className="w-full shadow-lg rounded-2xl border border-white/60"
                aspectRatio="aspect-[4/3]"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 2. 最新公告/动态条 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-4 rounded-2xl bg-white border border-[#D9E4F2] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <span className="px-2.5 py-1 rounded-lg bg-[#EAF1FB] text-[#123B70] text-xs font-bold tracking-wider shrink-0 flex items-center gap-1.5">
              <Bell className="w-3.5 h-3.5 text-[#1C5FB8]" />
              {content.announcement.tag}
            </span>
            <span className="text-xs sm:text-sm font-medium text-[#0B1733] line-clamp-1">
              {content.announcement.title}
            </span>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <span className="text-xs text-slate-400">{content.announcement.date}</span>
            <Link
              to={content.announcement.link}
              className="text-xs font-semibold text-[#1C5FB8] hover:text-[#123B70] flex items-center gap-0.5"
            >
              <span>阅读说明</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. “我想了解 / 办理” 快捷入口 */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-[#0B1733] tracking-tight">
            {content.quickActions.title}
          </h2>
          <p className="text-xs sm:text-sm text-[#60718A] mt-1">
            {content.quickActions.subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {content.quickActions.items.map(item => (
            <Link
              key={item.id}
              to={item.link}
              className="p-5 rounded-2xl bg-white border border-[#D9E4F2] shadow-xs hover:shadow-md hover:border-[#1C5FB8] transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-4 group-hover:bg-[#EAF1FB] transition-colors">
                  {iconMap[item.iconName] || <ShieldCheck className="w-6 h-6 text-[#1C5FB8]" />}
                </div>
                <h3 className="text-base font-bold text-[#0B1733] group-hover:text-[#1C5FB8] transition-colors mb-1.5">
                  {item.title}
                </h3>
                <p className="text-xs text-[#60718A] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center text-xs font-semibold text-[#123B70] group-hover:text-[#1C5FB8]">
                <span>进入办理</span>
                <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 4. 保障方案展示（六大主营类别导览） */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-bold text-[#0B1733] tracking-tight">
              {content.featuredCategories.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#60718A] mt-1">
              {content.featuredCategories.subtitle}
            </p>
          </div>
          <Link
            to="/plans"
            className="text-xs font-semibold text-[#1C5FB8] hover:text-[#123B70] flex items-center gap-1 shrink-0"
          >
            <span>查看全部保障方案库</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {content.featuredCategories.categories.map((cat, idx) => (
            <Link
              key={idx}
              to={cat.link}
              className="p-6 rounded-2xl bg-white border border-[#D9E4F2] shadow-xs hover:border-[#1C5FB8] hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="text-xs font-semibold text-[#123B70] bg-[#EAF1FB] inline-block px-2.5 py-0.5 rounded-full mb-3">
                  主营类别 {idx + 1}
                </div>
                <h3 className="text-lg font-bold text-[#0B1733] group-hover:text-[#1C5FB8] transition-colors mb-2">
                  {cat.name}
                </h3>
                <p className="text-xs text-[#60718A] leading-relaxed mb-4">
                  {cat.desc}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                <span className="font-semibold text-slate-700">{cat.sampleAmount}</span>
                <span className="text-[#1C5FB8] font-medium flex items-center gap-0.5">
                  <span>挑选方案</span>
                  <ChevronRight className="w-3.5 h-3.5" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 5. 品牌与服务价值四支柱（与保险直接相关，不搞科幻城市大盘） */}
      <section className="bg-white border-y border-[#D9E4F2] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
          <div className="text-center max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-[#0B1733]">
              {content.brandPillars.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#60718A] mt-2">
              {content.brandPillars.subtitle}
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {content.brandPillars.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-slate-50/60 border border-slate-100 space-y-3"
              >
                <div className="w-10 h-10 rounded-xl bg-white border border-[#D9E4F2] flex items-center justify-center shadow-xs">
                  {iconMap[pillar.iconName] || <Sparkles className="w-5 h-5 text-[#1C5FB8]" />}
                </div>
                <h3 className="font-bold text-sm text-[#0B1733]">
                  {pillar.title}
                </h3>
                <p className="text-xs text-[#60718A] leading-relaxed">
                  {pillar.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. 服务与人工支持收尾区（替代大面积深蓝块，业务导向，温暖克制） */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="p-6 sm:p-8 md:p-10 rounded-3xl bg-[#F4F8FC] border border-[#D9E4F2] shadow-xs space-y-6 sm:space-y-8">
          {/* 标题与辅助文案 */}
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#D9E4F2] text-xs font-semibold text-[#123B70] mb-3 shadow-2xs">
              <UserCheck className="w-3.5 h-3.5 text-[#1FA866]" />
              <span>{content.serviceSupport.badge}</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-[#0B1733] tracking-tight">
              {content.serviceSupport.title}
            </h2>
            <p className="text-xs sm:text-sm text-[#60718A] mt-2 leading-relaxed">
              {content.serviceSupport.subtitle}
            </p>
          </div>

          {/* 三个清晰入口卡片 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 sm:gap-5">
            {/* 1. 在线咨询 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#D9E4F2] shadow-xs hover:border-[#1C5FB8] hover:shadow-sm transition-all flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#EAF1FB] text-[#1C5FB8] flex items-center justify-center">
                  <MessageSquareText className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-[#0B1733] group-hover:text-[#1C5FB8] transition-colors">
                  在线咨询
                </h3>
                <p className="text-xs text-[#60718A] leading-relaxed">
                  输入您关心的生活场景或保障疑问，快速获取方案比对与政策解读。
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => openAiModal()}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#F4F8FC] hover:bg-[#EAF1FB] text-xs font-semibold text-[#123B70] group-hover:text-[#1C5FB8] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>立即咨询</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>

            {/* 2. 找人工服务 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#D9E4F2] shadow-xs hover:border-[#1FA866] hover:shadow-sm transition-all flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#E8F8F0] text-[#1FA866] flex items-center justify-center">
                  <PhoneCall className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-[#0B1733] group-hover:text-[#1FA866] transition-colors">
                  找人工服务
                </h3>
                <p className="text-xs text-[#60718A] leading-relaxed">
                  专属负责专员在线直连或预约上门，解答复杂疑问，全程把关。
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => openHumanAdvisorModal('来自首页服务与人工支持咨询')}
                  className="w-full py-2.5 px-4 rounded-xl bg-[#F4F8FC] hover:bg-[#E8F8F0] text-xs font-semibold text-[#123B70] group-hover:text-[#1FA866] flex items-center justify-center gap-1.5 transition-colors cursor-pointer"
                >
                  <span>联系负责专员</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </button>
              </div>
            </div>

            {/* 3. 查看服务网点 */}
            <div className="p-5 sm:p-6 rounded-2xl bg-white border border-[#D9E4F2] shadow-xs hover:border-[#1C5FB8] hover:shadow-sm transition-all flex flex-col justify-between group">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-amber-50 text-[#D9872D] flex items-center justify-center">
                  <MapPin className="w-5 h-5" />
                </div>
                <h3 className="font-bold text-base text-[#0B1733] group-hover:text-[#1C5FB8] transition-colors">
                  查看服务网点
                </h3>
                <p className="text-xs text-[#60718A] leading-relaxed">
                  长垣新枢区金融港与各社区实体营业厅，为长辈与关键事项面对面服务。
                </p>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100">
                <Link
                  to="/branches"
                  className="w-full py-2.5 px-4 rounded-xl bg-[#F4F8FC] hover:bg-slate-100 text-xs font-semibold text-[#123B70] group-hover:text-[#1C5FB8] flex items-center justify-center gap-1.5 transition-colors"
                >
                  <span>查看线下网点</span>
                  <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-0.5" />
                </Link>
              </div>
            </div>
          </div>

          {/* 补充保障提示栏 */}
          <div className="p-4 sm:p-4.5 rounded-2xl bg-white border border-[#D9E4F2] flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-[#60718A]">
            <div className="flex items-center gap-2.5">
              <div className="w-2 h-2 rounded-full bg-[#1FA866] shrink-0" />
              <span className="text-[#0B1733] font-medium">
                {content.serviceSupport.priorityNotice}
              </span>
            </div>
            <div className="flex items-center gap-3 sm:gap-4 shrink-0 text-slate-500 font-mono text-[11px]">
              <span>服务专线：400-800-2047</span>
              <span className="text-slate-200">|</span>
              <span>急难险情全天候直赔响应</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
