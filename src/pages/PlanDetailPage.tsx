/**
 * B级核心详情页：保障方案详情 (/plans/:slug)
 * 遵循《长垣人寿官网_施工规范_v2.1》第六点一节
 */

import React, { useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useApp } from '../app/AppContext';
import { PLAN_ITEMS } from '../content/pages/plans';
import { AssetImage } from '../components/common/AssetImage';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  AlertTriangle,
  Lock,
  UserCheck,
  Bot,
  ArrowLeft,
  Calendar,
  CreditCard,
  Check,
  HelpCircle
} from 'lucide-react';

export const PlanDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  const { openAiModal, openHumanAdvisorModal, terminalState, openConnectModal } = useApp();

  const plan = PLAN_ITEMS.find(p => p.slug === slug) || PLAN_ITEMS[0];

  // 投保流程模拟
  const [isApplying, setIsApplying] = useState(false);
  const [applySuccess, setApplySuccess] = useState(false);

  const handleApply = () => {
    if (terminalState === 'UNCONNECTED') {
      openConnectModal(`/plans/${plan.slug}`);
      return;
    }
    setIsApplying(true);
    setTimeout(() => {
      setIsApplying(false);
      setApplySuccess(true);
      setTimeout(() => setApplySuccess(false), 4000);
    }, 1200);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
      {/* 面包屑 / 返回 */}
      <div>
        <Link
          to="/plans"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#1C5FB8] font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>返回全部保障方案列表</span>
        </Link>
      </div>

      {/* 头部方案综述 */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white border border-[#D9E4F2] shadow-xs space-y-5">
        <div className="flex flex-wrap items-center gap-2">
          <span className="px-3 py-1 rounded-full bg-[#EAF1FB] text-[#123B70] text-xs font-semibold">
            {plan.categoryLabel}
          </span>
          {plan.isPilot && (
            <span className="px-3 py-1 rounded-full bg-purple-50 text-purple-700 text-xs font-semibold border border-purple-200">
              合规试点项目
            </span>
          )}
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl sm:text-3xl font-bold text-[#0B1733] tracking-tight">
            {plan.name}
          </h1>
          <p className="text-xs text-slate-400 font-mono">
            正式核准备案名：{plan.officialContractName}
          </p>
        </div>

        <p className="text-sm text-[#60718A] leading-relaxed">
          {plan.solveWhat}
        </p>

        {/* 关键保障参数栏 */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-3 border-t border-slate-100">
          <div className="p-4 rounded-xl bg-slate-50">
            <div className="text-xs text-slate-400">保障额度</div>
            <div className="text-base font-bold text-[#0B1733] mt-1">{plan.coverageAmount}</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50">
            <div className="text-xs text-slate-400">参考费率</div>
            <div className="text-base font-bold text-[#123B70] mt-1">{plan.pricing}</div>
          </div>
          <div className="p-4 rounded-xl bg-slate-50">
            <div className="text-xs text-slate-400">费率契约</div>
            <div className="text-base font-bold text-green-700 mt-1">合同期内承诺锁价</div>
          </div>
        </div>

        {/* 操作区 */}
        <div className="flex flex-wrap items-center gap-3 pt-2">
          <button
            onClick={handleApply}
            disabled={isApplying}
            className="px-6 py-3 bg-[#123B70] hover:bg-[#1C5FB8] text-white rounded-xl text-xs font-semibold shadow-xs transition-all flex items-center gap-2 disabled:opacity-50"
          >
            <ShieldCheck className="w-4 h-4" />
            <span>{isApplying ? '正在调取终端可信节点核验...' : '立即在线拟定合同'}</span>
          </button>

          <button
            onClick={() => openAiModal(`我想详细了解方案【${plan.name}】，针对我目前的情况适合投保吗？`)}
            className="px-5 py-3 bg-[#EAF1FB] hover:bg-blue-100 text-[#123B70] rounded-xl text-xs font-semibold transition-all flex items-center gap-2"
          >
            <Bot className="w-4 h-4 text-[#1C5FB8]" />
            <span>AI 解读本方案</span>
          </button>

          <button
            onClick={() => openHumanAdvisorModal(`咨询保障方案：${plan.name}`)}
            className="px-5 py-3 bg-white border border-[#D9E4F2] hover:bg-slate-50 text-slate-700 rounded-xl text-xs font-semibold transition-all flex items-center gap-2"
          >
            <UserCheck className="w-4 h-4 text-purple-600" />
            <span>联系专员林秋</span>
          </button>
        </div>

        {applySuccess && (
          <div className="p-4 rounded-xl bg-green-50 border border-green-200 text-green-800 text-xs flex items-center gap-2 animate-fadeIn">
            <Check className="w-5 h-5 text-green-600 shrink-0" />
            <span>
              保单预审草案已成功生成并推送到您的个人数字终端，已为您预约专员林秋做条款责任见证。
            </span>
          </div>
        )}
      </section>

      {/* 保什么 / 不保什么 对比（规范 6.1 硬性约束） */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* 保什么 */}
        <div className="p-6 rounded-3xl bg-white border border-[#D9E4F2] shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-[#1FA866]">
            <CheckCircle2 className="w-5 h-5" />
            <h3 className="text-base font-bold text-[#0B1733]">涵盖责任清单 (保什么)</h3>
          </div>
          <ul className="space-y-3">
            {plan.covers.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-[#1FA866] mt-1.5 shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* 不保什么 / 免责与限制 */}
        <div className="p-6 rounded-3xl bg-white border border-[#D9E4F2] shadow-xs space-y-4">
          <div className="flex items-center gap-2 text-amber-600">
            <XCircle className="w-5 h-5" />
            <h3 className="text-base font-bold text-[#0B1733]">免责与限制边界 (不保什么)</h3>
          </div>
          <ul className="space-y-3">
            {plan.notCovers.map((item, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 mt-1.5 shrink-0" />
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 适用人群与禁忌人群 */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white border border-[#D9E4F2] shadow-xs space-y-4">
        <h3 className="text-base font-bold text-[#0B1733]">适合与不适合人群</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="font-semibold text-green-900 mb-1">推荐适用人群</div>
            <p className="text-slate-600 leading-relaxed">{plan.targetAudience}</p>
          </div>
          <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
            <div className="font-semibold text-amber-900 mb-1">已有保障与重叠提醒</div>
            <p className="text-slate-600 leading-relaxed">
              {plan.hasExistingOverlap || '若已有相同保障额度或属于免责病史，请谨慎购买以避免重复投保支出。'}
            </p>
          </div>
        </div>
      </section>

      {/* 价格结构与锁价契约 */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white border border-[#D9E4F2] shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Lock className="w-5 h-5 text-[#1C5FB8]" />
          <h3 className="text-base font-bold text-[#0B1733]">费率锁定契约规则</h3>
        </div>
        <div className="p-4 rounded-2xl bg-blue-50/60 border border-blue-100 text-xs text-[#123B70] leading-relaxed">
          {plan.lockPriceRule}
        </div>
        <p className="text-xs text-[#60718A] leading-relaxed">
          长垣人寿坚持“买得起、赔得到、不随意涨价”准则。在您约定的保障周期内，哪怕城市整体通胀或单次索赔发生，保费严格锁定，不搞秋后算账。
        </p>
      </section>
    </div>
  );
};
