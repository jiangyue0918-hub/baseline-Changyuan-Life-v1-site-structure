/**
 * 理赔案件展示卡片
 * 遵循《长垣人寿官网_施工规范_v2.1》第五点六节
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { ClaimItem } from '../../types';
import { Receipt, Clock, ArrowRight, AlertTriangle, CheckCircle2, ShieldAlert } from 'lucide-react';

interface Props {
  claim: ClaimItem;
}

export const ClaimCard: React.FC<Props> = ({ claim }) => {
  let statusBadgeClass = 'bg-blue-50 text-blue-700 border-blue-200';
  let StatusIcon = Clock;

  if (claim.status === 'completed') {
    statusBadgeClass = 'bg-green-50 text-green-700 border-green-200';
    StatusIcon = CheckCircle2;
  } else if (claim.status === 'dispute_review') {
    statusBadgeClass = 'bg-amber-50 text-amber-700 border-amber-200';
    StatusIcon = AlertTriangle;
  } else if (claim.status === 'in_progress' && claim.caseNo.includes('0999')) {
    statusBadgeClass = 'bg-red-50 text-red-700 border-red-200';
    StatusIcon = ShieldAlert;
  }

  return (
    <div className="rounded-2xl bg-white border border-[#D9E4F2] shadow-xs hover:shadow-md transition-all p-5 sm:p-6 flex flex-col justify-between group">
      <div>
        {/* 顶部单号与状态 */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="font-mono text-xs text-slate-400">
            案件号: {claim.caseNo}
          </span>
          <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold border ${statusBadgeClass}`}>
            <StatusIcon className="w-3.5 h-3.5" />
            <span>{claim.statusLabel}</span>
          </span>
        </div>

        {/* 案件标题 */}
        <h3 className="text-base font-bold text-[#0B1733] group-hover:text-[#1C5FB8] transition-colors mb-1.5">
          {claim.title}
        </h3>

        <div className="text-xs text-slate-400 mb-4 flex items-center gap-3">
          <span>发生日期: {claim.eventDate}</span>
          <span>分类: {claim.category}</span>
        </div>

        {/* 三层分摊结算明细预览 */}
        <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 text-xs mb-4 space-y-2">
          <div className="text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
            多层费用分担构成
          </div>
          <div className="grid grid-cols-3 gap-2 text-center pt-1">
            <div className="p-2 rounded-lg bg-white border border-slate-200/60">
              <div className="text-[10px] text-slate-400">第二层公共报销</div>
              <div className="font-bold text-[#0B1733] mt-0.5">
                {claim.settlement.publicLayerPaid.toLocaleString()}
              </div>
            </div>
            <div className="p-2 rounded-lg bg-[#EAF1FB] border border-[#1C5FB8]/20">
              <div className="text-[10px] text-[#123B70]">长垣人寿商业给付</div>
              <div className="font-bold text-[#1C5FB8] mt-0.5">
                {claim.settlement.changyuanPaid.toLocaleString()}
              </div>
            </div>
            <div className="p-2 rounded-lg bg-white border border-slate-200/60">
              <div className="text-[10px] text-slate-400">个人自付</div>
              <div className="font-bold text-slate-700 mt-0.5">
                {claim.settlement.personalCopay.toLocaleString()}
              </div>
            </div>
          </div>
        </div>

        {/* 若有复核或争议原因，同屏说明原因 */}
        {claim.disputeReason && (
          <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-900 mb-4 flex items-start gap-2">
            <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
            <div className="line-clamp-2 leading-relaxed">
              <span className="font-semibold">审核说明：</span>
              {claim.disputeReason}
            </div>
          </div>
        )}
      </div>

      {/* 底部动作与处理人 */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-400">
          当前节点: {claim.currentActor}
        </span>
        <Link
          to={`/claims/${claim.id}`}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#EAF1FB] text-[#123B70] hover:bg-[#123B70] hover:text-white text-xs font-semibold transition-all"
        >
          <span>查看结算与溯源日志</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
