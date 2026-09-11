/**
 * B级核心详情页：理赔详情 (/claims/:id)
 * 遵循《长垣人寿官网_施工规范_v2.1》第六点三节
 */

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../app/AppContext';
import { MOCK_CLAIMS } from '../data';
import {
  Receipt,
  ArrowLeft,
  Clock,
  CheckCircle2,
  AlertTriangle,
  FileCheck,
  UserCheck,
  ShieldAlert,
  ChevronRight,
  ShieldCheck
} from 'lucide-react';

export const ClaimDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { openHumanAdvisorModal, terminalState, openConnectModal } = useApp();

  // 未连接终端状态拦截：个人理赔案件仅对已连接当事人展示
  if (terminalState === 'UNCONNECTED') {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-[#EAF1FB] text-[#123B70] mx-auto flex items-center justify-center">
          <ShieldAlert className="w-7 h-7 text-[#1C5FB8]" />
        </div>
        <div className="space-y-2">
          <h1 className="text-xl sm:text-2xl font-bold text-[#0B1733]">个人理赔案件需连接终端后查看</h1>
          <p className="text-xs sm:text-sm text-[#60718A] max-w-md mx-auto leading-relaxed">
            为保障长垣居民就医与财务数据自治隐私，案件号、赔付金额与时序存根仅对已完成安全互认的个人终端开放。
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => openConnectModal(id ? `/claims/${id}` : '/claims')}
            className="px-5 py-2.5 rounded-xl bg-[#123B70] text-white text-xs font-semibold hover:bg-[#1C5FB8] transition-colors cursor-pointer"
          >
            连接个人终端查看
          </button>
          <Link
            to="/claims/how-it-works"
            className="px-5 py-2.5 rounded-xl bg-white border border-[#D9E4F2] text-[#123B70] text-xs font-medium hover:bg-slate-50 transition-colors"
          >
            查阅公开理赔机制说明
          </Link>
          <Link
            to="/claims/settlement"
            className="px-5 py-2.5 rounded-xl bg-white border border-[#D9E4F2] text-[#60718A] text-xs font-medium hover:bg-slate-50 transition-colors"
          >
            了解四重分担结算
          </Link>
        </div>
      </div>
    );
  }

  const claim = MOCK_CLAIMS.find(c => c.id === id);

  // 案件未找到处理
  if (!claim) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-500 mx-auto flex items-center justify-center">
          <ShieldAlert className="w-7 h-7" />
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-bold text-[#0B1733]">未检索到指定案件记录</h1>
          <p className="text-xs sm:text-sm text-[#60718A] max-w-md mx-auto">
            该理赔案件可能已归档或不属于当前终端绑定的个人保单范围。
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            to="/claims"
            className="px-5 py-2.5 rounded-xl bg-[#123B70] text-white text-xs font-semibold hover:bg-[#1C5FB8] transition-colors"
          >
            返回我的理赔记录
          </Link>
          <Link
            to="/claims/how-it-works"
            className="px-5 py-2.5 rounded-xl bg-white border border-[#D9E4F2] text-[#60718A] text-xs font-medium hover:bg-slate-50 transition-colors"
          >
            公开理赔机制
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
      {/* 面包屑 */}
      <div>
        <Link
          to="/claims"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#1C5FB8] font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>返回理赔记录列表</span>
        </Link>
      </div>

      {/* 头部案件概况 */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white border border-[#D9E4F2] shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-slate-400">案件号：{claim.caseNo}</span>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${
                claim.status === 'completed'
                  ? 'bg-green-50 text-green-700 border border-green-200'
                  : 'bg-amber-50 text-amber-700 border border-amber-200'
              }`}>
                {claim.statusLabel}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-[#0B1733] mt-2">
              {claim.title}
            </h1>
            <p className="text-xs text-slate-500 mt-1">
              事件发生日期：{claim.eventDate} ｜ 分类：{claim.category}
            </p>
          </div>

          <div className="text-left sm:text-right">
            <div className="text-xs text-slate-400">当前跟进专员</div>
            <div className="text-sm font-bold text-[#123B70] mt-0.5">{claim.currentActor}</div>
          </div>
        </div>

        {/* 若有争议或复核原因，同屏说明原因与处理路径（规范 6.3 硬性要求） */}
        {claim.disputeReason && (
          <div className="p-5 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950 space-y-3 animate-fadeIn">
            <div className="flex items-center gap-2 font-bold text-sm text-amber-900">
              <AlertTriangle className="w-5 h-5 text-amber-600 shrink-0" />
              <span>审核复核中原因与证据留存说明</span>
            </div>
            <p className="text-xs text-amber-900 leading-relaxed">
              {claim.disputeReason}
            </p>
            <div className="flex flex-wrap items-center gap-3 pt-1 text-xs">
              <button
                onClick={() => openHumanAdvisorModal(`关于理赔案件 ${claim.caseNo} 争议复核协调`)}
                className="px-4 py-2 bg-amber-600 hover:bg-amber-700 text-white font-semibold rounded-xl"
              >
                连线独立复核专员 (张文生)
              </button>
              <Link
                to="/appeals"
                className="px-4 py-2 bg-white border border-amber-300 text-amber-900 font-semibold rounded-xl hover:bg-amber-100"
              >
                进入正式申诉与外部调解
              </Link>
            </div>
          </div>
        )}

        {/* 费用总览与三层分摊穿透 */}
        <div className="space-y-3 pt-2">
          <h3 className="text-sm font-bold text-[#0B1733]">多层分担穿透结算单</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-slate-400">总医疗费用</div>
              <div className="text-base font-bold text-slate-800 mt-1">
                {claim.settlement.totalLoss.toLocaleString()} CY-CR
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-slate-400">第二层公共医保承担</div>
              <div className="text-base font-bold text-slate-800 mt-1">
                {claim.settlement.publicLayerPaid.toLocaleString()} CY-CR
              </div>
            </div>
            <div className="p-4 rounded-xl bg-[#EAF1FB] border border-[#1C5FB8]/20">
              <div className="text-[#123B70] font-medium">长垣人寿商业给付</div>
              <div className="text-base font-bold text-[#1C5FB8] mt-1">
                {claim.settlement.changyuanPaid.toLocaleString()} CY-CR
              </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100">
              <div className="text-slate-400">个人自付总额</div>
              <div className="text-base font-bold text-slate-800 mt-1">
                {claim.settlement.personalCopay.toLocaleString()} CY-CR
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 办理节点与时间线 */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white border border-[#D9E4F2] shadow-xs space-y-6">
        <h3 className="text-base font-bold text-[#0B1733]">可信流转时间线与节点记录</h3>

        <div className="relative pl-6 sm:pl-8 space-y-6 border-l-2 border-slate-200">
          {claim.timeline.map((item, idx) => (
            <div key={idx} className="relative">
              <div className={`absolute -left-[31px] sm:-left-[39px] top-0.5 w-4 h-4 rounded-full border-2 bg-white ${
                idx === claim.timeline.length - 1 && claim.status !== 'completed'
                  ? 'border-amber-500 bg-amber-100'
                  : 'border-green-600 bg-green-600 text-white'
              }`} />
              <div className="text-xs font-mono text-slate-400">{item.time}</div>
              <div className="text-sm font-bold text-[#0B1733] mt-0.5">{item.title}</div>
              <div className="text-xs text-[#60718A] mt-1 leading-relaxed">{item.desc}</div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
