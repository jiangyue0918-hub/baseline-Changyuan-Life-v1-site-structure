/**
 * A级核心页面：我的保单 (/policies)
 * 遵循《长垣人寿官网_施工规范_v2.1》第五点五节
 * 
 * 模块顺序严格锁定：
 * 页面 Hero/标题区 -> 保单状态汇总 -> 保单列表卡片 -> 锁价与价格变动说明 -> 变更与服务指引
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../app/AppContext';
import { POLICIES_PAGE_CONTENT } from '../content/pages/policies';
import { PolicyCard } from '../components/insurance/PolicyCard';
import { AssetImage } from '../components/common/AssetImage';
import { MOCK_POLICIES } from '../data';
import {
  FileCheck,
  ShieldCheck,
  Lock,
  UserCheck,
  AlertCircle,
  HelpCircle,
  CreditCard,
  UserCog
} from 'lucide-react';

export const PoliciesPage: React.FC = () => {
  const { terminalState, openConnectModal, openHumanAdvisorModal } = useApp();
  const content = POLICIES_PAGE_CONTENT;
  const isConnected = terminalState !== 'UNCONNECTED';

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
      {/* 1. 页面 Hero / 标题区 */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-white via-[#F4F8FC] to-white border border-[#D9E4F2] shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF1FB] text-[#123B70] text-xs font-semibold">
              <FileCheck className="w-4 h-4 text-[#1FA866]" />
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
              连接您的个人数字终端即可核对属于您的正式商业保单凭据与锁价明细。
            </div>
          </div>
          <button
            onClick={() => openConnectModal('/policies')}
            className="px-4 py-2 bg-[#123B70] hover:bg-[#1C5FB8] text-white rounded-xl text-xs font-semibold shrink-0 transition-all shadow-xs"
          >
            连接终端查验我的保单
          </button>
        </div>
      )}

      {/* 2. 保单状态汇总统计栏 */}
      <section className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white border border-[#D9E4F2] shadow-xs flex flex-col justify-between">
          <span className="text-xs text-[#60718A]">有效保障契约</span>
          <div className="text-2xl font-bold text-[#0B1733] mt-2 mb-1">
            {MOCK_POLICIES.filter(p => p.status === 'valid').length} 份
          </div>
          <span className="text-[11px] text-slate-400">已接入长垣可信直赔网络</span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-[#D9E4F2] shadow-xs flex flex-col justify-between">
          <span className="text-xs text-[#60718A]">合同期锁价年保费</span>
          <div className="text-2xl font-bold text-[#123B70] mt-2 mb-1">6,480 CY-CR</div>
          <span className="text-[11px] text-slate-400">不因单人理赔单独上浮</span>
        </div>
        <div className="p-5 rounded-2xl bg-white border border-[#D9E4F2] shadow-xs flex flex-col justify-between">
          <span className="text-xs text-[#60718A]">契约锁价合规履约率</span>
          <div className="text-2xl font-bold text-[#1FA866] mt-2 mb-1">100%</div>
          <span className="text-[11px] text-slate-400">独立第三方审计留痕</span>
        </div>
      </section>

      {/* 3. 保单列表 */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-[#0B1733]">履约中合同列表</h2>
          <span className="text-xs text-slate-400 font-mono">共 {MOCK_POLICIES.length} 份有效契约</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {MOCK_POLICIES.map(policy => (
            <PolicyCard key={policy.id} policy={policy} />
          ))}
        </div>
      </section>

      {/* 4. 锁价与价格变动说明（规范 5.5 硬性要求） */}
      <section className="p-6 rounded-3xl bg-white border border-[#D9E4F2] shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <Lock className="w-5 h-5 text-[#1C5FB8]" />
          <h3 className="text-base font-bold text-[#0B1733]">
            {content.detailView.priceLockTitle}
          </h3>
        </div>

        <p className="text-xs text-[#60718A] leading-relaxed">
          {content.detailView.priceLockNotice}
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed">
            <strong>不因病加费：</strong>合同期内无论发生任何小病门诊或大病确诊，次年续期保费维持合同约定，严禁单方剔除保障。
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed">
            <strong>免体检续保：</strong>保单到期日前，系统通过终端静默发起续约确认，免除反复去医院开具健康证明的繁文缛节。
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700 leading-relaxed">
            <strong>透明变更通道：</strong>因人生阶段调整（如结婚、离职、退休），可随时向专属顾问林秋申请平稳过渡换签。
          </div>
        </div>
      </section>

      {/* 5. 变更与服务指引 */}
      <section className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-1">
          <h3 className="text-sm font-bold text-[#0B1733] flex items-center gap-2">
            <UserCog className="w-4 h-4 text-[#123B70]" />
            <span>保单变更、受益人调整或有疑虑？</span>
          </h3>
          <p className="text-xs text-[#60718A] leading-relaxed max-w-2xl">
            长垣人寿支持在线无感更正终端绑定信息。重大受益人指定、保全批单或家庭解约，均由负责专员林秋见证核验。
          </p>
        </div>

        <button
          onClick={() => openHumanAdvisorModal('关于我的保单变更咨询')}
          className="px-5 py-2.5 bg-[#123B70] hover:bg-[#1C5FB8] text-white text-xs font-semibold rounded-xl shrink-0 transition-all shadow-xs flex items-center gap-2"
        >
          <UserCheck className="w-4 h-4" />
          <span>联系专员办理变更</span>
        </button>
      </section>
    </div>
  );
};
