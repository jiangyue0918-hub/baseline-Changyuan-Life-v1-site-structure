/**
 * A级核心页面：理赔服务 (/claims)
 * 遵循《长垣人寿官网_施工规范_v2.1》第五点六节
 * 
 * 模块顺序严格锁定：
 * 页面 Hero/标题区 -> 理赔状态与发起入口 -> 进行中案件与待办 -> 历史理赔与分担记录 -> 自动验证与直赔机制说明 -> 争议、复核与人工通道
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../app/AppContext';
import { CLAIMS_PAGE_CONTENT } from '../content/pages/claims';
import { ClaimCard } from '../components/insurance/ClaimCard';
import { AssetImage } from '../components/common/AssetImage';
import { MOCK_CLAIMS } from '../data';
import {
  Receipt,
  PlusCircle,
  Clock,
  CheckCircle2,
  FileSearch,
  UserCheck,
  AlertTriangle,
  HelpCircle,
  Lock,
  ArrowRight,
  ShieldCheck,
  Building
} from 'lucide-react';

export const ClaimsPage: React.FC = () => {
  const { terminalState, openConnectModal, openHumanAdvisorModal } = useApp();
  const content = CLAIMS_PAGE_CONTENT;
  const isConnected = terminalState !== 'UNCONNECTED';

  // 模拟快速在线报案状态
  const [showQuickReportModal, setShowQuickReportModal] = useState(false);
  const [reportSuccess, setReportSuccess] = useState(false);

  const activeClaims = MOCK_CLAIMS.filter(c => c.status === 'in_progress' || c.status === 'dispute_review');
  const finishedClaims = MOCK_CLAIMS.filter(c => c.status === 'completed');

  const handleQuickSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReportSuccess(true);
    setTimeout(() => {
      setReportSuccess(false);
      setShowQuickReportModal(false);
    }, 1800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
      {/* 1. 页面 Hero / 标题区 */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-white via-[#F4F8FC] to-white border border-[#D9E4F2] shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF1FB] text-[#123B70] text-xs font-semibold">
              <Receipt className="w-4 h-4 text-[#1C5FB8]" />
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

      {/* 若未连接终端，提示连接 */}
      {!isConnected && (
        <div className="p-5 rounded-2xl bg-blue-50/70 border border-[#1C5FB8]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-[#1C5FB8] shrink-0" />
            <div className="text-xs text-[#123B70]">
              <span className="font-bold">当前处于未连接状态：</span>
              连接您的个人数字终端即可调取与您绑定的医疗直赔、费用穿透清单及争议复核进度。
            </div>
          </div>
          <button
            onClick={() => openConnectModal('/claims')}
            className="px-4 py-2 bg-[#123B70] hover:bg-[#1C5FB8] text-white rounded-xl text-xs font-semibold shrink-0 transition-all shadow-xs"
          >
            连接终端查验理赔
          </button>
        </div>
      )}

      {/* 2. 理赔状态与发起入口 */}
      <section className="p-6 rounded-2xl bg-white border border-[#D9E4F2] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-[#0B1733]">发生意外、就医住院或产生自费药品？</h2>
          <p className="text-xs text-[#60718A] mt-1">
            长垣全市三甲与社区医疗已接入自动结算节点；异地就医或特殊用药，可在此一键发起补充报案。
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => setShowQuickReportModal(true)}
            className="px-5 py-2.5 bg-[#123B70] hover:bg-[#1C5FB8] text-white rounded-xl text-xs font-semibold shadow-xs transition-all flex items-center gap-2"
          >
            <PlusCircle className="w-4 h-4" />
            <span>发起补充报案</span>
          </button>
        </div>
      </section>

      {/* 3. 进行中案件与待办 */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#0B1733]">当前进行中案件</h2>
          <span className="text-xs text-slate-400 font-mono">共 {activeClaims.length} 件处理中</span>
        </div>

        {activeClaims.length === 0 ? (
          <div className="p-6 rounded-2xl bg-white border border-[#D9E4F2] text-xs text-slate-500 flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-green-600" />
            <span>当前没有正在进行或需要补充材料的理赔案件。</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {activeClaims.map(claim => (
              <ClaimCard key={claim.id} claim={claim} />
            ))}
          </div>
        )}
      </section>

      {/* 4. 历史理赔与分担记录 */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#0B1733]">已结案理赔与多层分担穿透</h2>
          <span className="text-xs text-slate-400 font-mono">共 {finishedClaims.length} 件结案</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {finishedClaims.map(claim => (
            <ClaimCard key={claim.id} claim={claim} />
          ))}
        </div>
      </section>

      {/* 5. 自动验证与直赔机制说明（规范 5.6 要求） */}
      <section className="p-6 rounded-3xl bg-white border border-[#D9E4F2] shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#1FA866]" />
          <h3 className="text-base font-bold text-[#0B1733]">
            长垣可信直赔五步闭环机制
          </h3>
        </div>

        <p className="text-xs text-[#60718A] leading-relaxed">
          依托长垣可信协作节点，医院就诊与交通事件自动验证。无争议款项优先快速给付，重大事件真人接手。
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3 pt-2">
          {content.mechanismSteps.map((step, idx) => (
            <div
              key={idx}
              className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 space-y-1"
            >
              <div className="text-[11px] font-bold text-[#123B70]">
                {step.step} · {step.title}
              </div>
              <p className="text-xs text-slate-600 leading-relaxed">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 6. 争议、复核与人工通道 */}
      <section className="p-6 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-[#0B1733] flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600" />
            <span>对责任认定或自费剔除有异议？</span>
          </h3>
          <p className="text-xs text-[#60718A] leading-relaxed max-w-2xl">
            长垣人寿坚持透明阳光理赔。对拒赔、比例核减有争议时，您有权申请独立人工复核专家张文生介入，或直接进入正式申诉流程，严禁机器人死循环推诿。
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/appeals"
            className="px-4 py-2 bg-white border border-amber-300 hover:bg-amber-100 text-amber-900 text-xs font-semibold rounded-xl transition-all"
          >
            查看正式申诉规程
          </Link>
          <button
            onClick={() => openHumanAdvisorModal('关于理赔案件结果争议申请复核')}
            className="px-5 py-2 bg-[#123B70] hover:bg-[#1C5FB8] text-white text-xs font-semibold rounded-xl transition-all shadow-xs"
          >
            连线复核专员
          </button>
        </div>
      </section>

      {/* 补充报案简易模拟弹窗 */}
      {showQuickReportModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn">
          <div className="w-full max-w-md bg-white rounded-2xl border border-slate-200 p-6 shadow-2xl space-y-4">
            <h3 className="text-base font-bold text-[#0B1733]">发起补充就诊报案</h3>
            <p className="text-xs text-slate-500">
              用于异地紧急就医、非长垣公立联网药房开具的特药垫付报销。
            </p>

            {reportSuccess ? (
              <div className="py-6 text-center text-green-700 font-semibold text-xs space-y-2">
                <CheckCircle2 className="w-8 h-8 mx-auto text-green-600" />
                <div>报案已受理，受理号 CLM-2047-NEW</div>
                <div className="text-slate-400 font-normal">专员林秋已在工作台认领该案件</div>
              </div>
            ) : (
              <form onSubmit={handleQuickSubmit} className="space-y-3 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">事件类别</label>
                  <select className="w-full p-2 border border-slate-200 rounded-lg outline-none">
                    <option>意外伤害急诊</option>
                    <option>自费特药垫付申请</option>
                    <option>异地就医住院备案</option>
                  </select>
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">发生日期</label>
                  <input
                    type="date"
                    defaultValue="2047-08-20"
                    className="w-full p-2 border border-slate-200 rounded-lg outline-none"
                  />
                </div>
                <div>
                  <label className="block text-slate-700 font-semibold mb-1">就诊医疗机构</label>
                  <input
                    type="text"
                    placeholder="例如：长垣市第二人民医院、省立低空急救中心"
                    className="w-full p-2 border border-slate-200 rounded-lg outline-none"
                  />
                </div>

                <div className="flex justify-end gap-2 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowQuickReportModal(false)}
                    className="px-3 py-1.5 border border-slate-200 rounded-lg text-slate-600 hover:bg-slate-50"
                  >
                    取消
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-1.5 bg-[#123B70] text-white rounded-lg font-medium hover:bg-[#1C5FB8]"
                  >
                    提交申报
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
