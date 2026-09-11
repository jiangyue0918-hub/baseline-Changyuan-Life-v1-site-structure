/**
 * A级核心页面：已连接终端个人首页
 * 遵循《长垣人寿官网_施工规范_v2.1》第五点二节
 * 
 * 模块顺序严格锁定：
 * 首屏：问候与身份 -> 当前保障状态（三层保障分列，不合并为单一总额）
 * 第二层：快捷任务卡（我的保障、管理我的保单、理赔与结算、找人工服务）
 * 第三层：真实待处理事项（无任务时明确显示当前无待办，严禁伪造任务）
 * 第四层：重大事件优先置顶 / 近期理赔与结算 / 核心保单 / 负责专员
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../app/AppContext';
import { PERSONAL_HOME_CONTENT } from '../content/pages/personalHome';
import { CoverageOverviewCard } from '../components/insurance/CoverageOverviewCard';
import { PolicyCard } from '../components/insurance/PolicyCard';
import { ClaimCard } from '../components/insurance/ClaimCard';
import { AssetImage } from '../components/common/AssetImage';
import {
  MOCK_COVERAGE_SUMMARY,
  MOCK_POLICIES,
  MOCK_CLAIMS,
  MOCK_NOTIFICATIONS
} from '../data';
import {
  ShieldCheck,
  FileCheck,
  Receipt,
  UserCheck,
  ArrowRight,
  AlertTriangle,
  ShieldAlert,
  Calendar,
  CheckCircle2,
  ChevronRight,
  Info
} from 'lucide-react';

export const PersonalHomePage: React.FC = () => {
  const { user, terminalState, openHumanAdvisorModal } = useApp();
  const content = PERSONAL_HOME_CONTENT;

  // 根据当前演练状态调整待办与案件数据
  const isMajorEvent = terminalState === 'CONNECTED_MAJOR_EVENT';
  const isDispute = terminalState === 'CONNECTED_DISPUTE';
  const isPending = terminalState === 'CONNECTED_PENDING';

  // 待办筛选
  const pendingTodos = isPending
    ? MOCK_NOTIFICATIONS.filter(n => n.type === 'todo' || n.priority === 'high')
    : [];

  const recentClaims = isMajorEvent
    ? [MOCK_CLAIMS[2], MOCK_CLAIMS[0]]
    : isDispute
    ? [MOCK_CLAIMS[1], MOCK_CLAIMS[0]]
    : [MOCK_CLAIMS[0]];

  const iconMap: Record<string, React.ReactNode> = {
    ShieldCheck: <ShieldCheck className="w-6 h-6 text-[#1C5FB8]" />,
    FileCheck: <FileCheck className="w-6 h-6 text-[#1FA866]" />,
    Receipt: <Receipt className="w-6 h-6 text-[#D9872D]" />,
    UserCheck: <UserCheck className="w-6 h-6 text-purple-600" />
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
      {/* 0. 若为重大事件状态，专员接管横幅绝对置顶（规范 5.2 要求） */}
      {isMajorEvent && (
        <div className="p-6 rounded-2xl bg-red-50 border-2 border-red-300 shadow-md text-red-950 flex flex-col md:flex-row md:items-center justify-between gap-5 animate-fadeIn">
          <div className="flex items-start gap-4">
            <div className="w-12 h-12 rounded-xl bg-red-100 text-red-600 flex items-center justify-center shrink-0">
              <ShieldAlert className="w-7 h-7" />
            </div>
            <div>
              <div className="inline-block text-[11px] font-bold px-2 py-0.5 rounded-full bg-red-200 text-red-900 mb-1">
                {content.majorEventBanner.badge}
              </div>
              <h2 className="text-lg font-bold text-red-950">
                {content.majorEventBanner.title}
              </h2>
              <p className="text-xs text-red-800 leading-relaxed mt-1 max-w-2xl">
                {content.majorEventBanner.description}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3 shrink-0">
            <button
              onClick={() => openHumanAdvisorModal('重大事件重症绿色通道专案处理')}
              className="px-5 py-2.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold shadow-sm transition-all"
            >
              {content.majorEventBanner.contactButton}
            </button>
            <Link
              to="/claims/CLM-2047-003"
              className="px-4 py-2.5 bg-white border border-red-200 text-red-700 hover:bg-red-50 rounded-xl text-xs font-semibold transition-all"
            >
              {content.majorEventBanner.detailButton}
            </Link>
          </div>
        </div>
      )}

      {/* 0.1 若为争议复核状态，争议案件横幅置顶 */}
      {isDispute && !isMajorEvent && (
        <div className="p-5 rounded-2xl bg-amber-50 border border-amber-300 shadow-xs text-amber-950 flex flex-col sm:flex-row sm:items-center justify-between gap-4 animate-fadeIn">
          <div className="flex items-start gap-3">
            <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
            <div>
              <span className="text-xs font-bold text-amber-800">
                {content.disputeBanner.badge} {content.disputeBanner.title}
              </span>
              <p className="text-xs text-amber-800 mt-0.5">
                {content.disputeBanner.description}
              </p>
            </div>
          </div>
          <Link
            to="/claims/CLM-2047-002"
            className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white rounded-xl text-xs font-semibold shrink-0 transition-all"
          >
            {content.disputeBanner.actionText}
          </Link>
        </div>
      )}

      {/* 第一层：问候与身份确认 */}
      <section className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-2 border-b border-slate-200/70">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0B1733] tracking-tight">
            你好，{user?.name}
          </h1>
          <p className="text-xs text-[#60718A] mt-1 flex items-center gap-2">
            <span>居民号: <span className="font-mono">{user?.residentId}</span></span>
            <span>•</span>
            <span>{user?.employer}</span>
            <span>•</span>
            <span className="text-[#1FA866] font-medium flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5" />
              终端已安全接入
            </span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="text-xs text-slate-500 text-left md:text-right">
            <div>长垣社会保障网格 · 联动正常</div>
            <div className="text-[11px] text-slate-400">信用凭据状态：{user?.creditScoreLevel}</div>
          </div>
        </div>
      </section>

      {/* 第一层核心：当前多层次保障全景（分层呈现，不相加为虚假总额） */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#0B1733]">
              {content.sections.coverageTitle}
            </h2>
            <p className="text-xs text-[#60718A] mt-0.5">
              {content.sections.coverageNotice}
            </p>
          </div>
          <Link
            to="/coverage"
            className="text-xs font-semibold text-[#1C5FB8] hover:text-[#123B70] flex items-center gap-0.5"
          >
            <span>展开三层明细与凭据</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <CoverageOverviewCard data={MOCK_COVERAGE_SUMMARY} />
      </section>

      {/* 第二层：快捷任务卡 */}
      <section className="space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {content.taskShortcuts.map(item => (
            <Link
              key={item.id}
              to={item.link}
              className="p-5 rounded-2xl bg-white border border-[#D9E4F2] shadow-xs hover:border-[#1C5FB8] hover:shadow-md transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="w-11 h-11 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center mb-3 group-hover:bg-[#EAF1FB] transition-colors">
                  {iconMap[item.iconName] || <ShieldCheck className="w-5 h-5 text-[#1C5FB8]" />}
                </div>
                <h3 className="font-bold text-sm text-[#0B1733] group-hover:text-[#1C5FB8] transition-colors mb-1">
                  {item.title}
                </h3>
                <p className="text-xs text-[#60718A] leading-relaxed">
                  {item.desc}
                </p>
              </div>

              <div className="pt-3 mt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-[#123B70] group-hover:text-[#1C5FB8]">
                <span>进入</span>
                <ArrowRight className="w-3 h-3 ml-1 transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* 第三层：真实待处理事项（规范规定：没有任务时明确显示无待办，不得为了活跃度制造伪任务） */}
      <section className="space-y-4">
        <h2 className="text-xl font-bold text-[#0B1733]">
          {content.sections.todoTitle}
        </h2>

        {pendingTodos.length === 0 ? (
          <div className="p-6 rounded-2xl bg-white border border-[#D9E4F2] shadow-xs flex items-center gap-3 text-xs text-[#60718A]">
            <CheckCircle2 className="w-5 h-5 text-[#1FA866] shrink-0" />
            <span>{content.sections.noTodoText}</span>
          </div>
        ) : (
          <div className="space-y-3">
            {pendingTodos.map(todo => (
              <div
                key={todo.id}
                className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3"
              >
                <div className="flex items-start gap-3">
                  <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                  <div>
                    <div className="font-bold text-sm text-[#0B1733]">{todo.title}</div>
                    <div className="text-xs text-[#60718A] mt-0.5">{todo.summary}</div>
                  </div>
                </div>
                <Link
                  to={todo.link || '/policies'}
                  className="px-4 py-1.5 bg-[#123B70] text-white text-xs font-medium rounded-xl hover:bg-[#1C5FB8] shrink-0 self-start sm:self-center transition-all"
                >
                  去处理
                </Link>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 第四层：最近理赔与结算 */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#0B1733]">
            {content.sections.recentClaimsTitle}
          </h2>
          <Link
            to="/claims"
            className="text-xs font-semibold text-[#1C5FB8] hover:text-[#123B70] flex items-center gap-0.5"
          >
            <span>查看完整理赔记录</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {recentClaims.map(claim => (
            <ClaimCard key={claim.id} claim={claim} />
          ))}
        </div>
      </section>

      {/* 第四层：我的核心保单预览 */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#0B1733]">
            {content.sections.recentPoliciesTitle}
          </h2>
          <Link
            to="/policies"
            className="text-xs font-semibold text-[#1C5FB8] hover:text-[#123B70] flex items-center gap-0.5"
          >
            <span>查看全部保单与锁价凭据</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {MOCK_POLICIES.slice(0, 2).map(policy => (
            <PolicyCard key={policy.id} policy={policy} />
          ))}
        </div>
      </section>

      {/* 第四层：专属顾问服务专区 */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white border border-[#D9E4F2] shadow-xs">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-slate-100 shadow-sm shrink-0">
              <AssetImage assetId="advisor-linqiu" aspectRatio="aspect-square" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#0B1733]">林秋</h3>
                <span className="px-2 py-0.5 rounded-full bg-[#EAF1FB] text-[#123B70] text-[11px] font-semibold">
                  你的长垣人寿专属负责专员
                </span>
              </div>
              <p className="text-xs text-[#60718A] mt-1 leading-relaxed max-w-xl">
                “无论是在生效保单的锁价疑问，还是就诊自费垫付申报，我是您的直接联络人。重大人生时刻，我全程对您负责。”
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0 w-full md:w-auto">
            <button
              onClick={() => openHumanAdvisorModal('已连接首页专员发起沟通')}
              className="w-full md:w-auto px-5 py-2.5 bg-[#123B70] hover:bg-[#1C5FB8] text-white rounded-xl text-xs font-semibold shadow-xs transition-all flex items-center justify-center gap-2"
            >
              <UserCheck className="w-4 h-4" />
              <span>直接连线专员林秋</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};
