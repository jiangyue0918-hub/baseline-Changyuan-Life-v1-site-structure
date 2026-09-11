/**
 * 保单展示卡片
 * 遵循《长垣人寿官网_施工规范_v2.1》第五点五节
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { PolicyItem } from '../../types';
import { FileCheck, Shield, Clock, ArrowRight, User, Lock } from 'lucide-react';

interface Props {
  policy: PolicyItem;
}

export const PolicyCard: React.FC<Props> = ({ policy }) => {
  return (
    <div className="rounded-2xl bg-white border border-[#D9E4F2] shadow-xs hover:shadow-md transition-all p-5 sm:p-6 flex flex-col justify-between group">
      <div>
        {/* 状态与单号 */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="font-mono text-xs text-slate-400">
            单号: {policy.policyNo}
          </span>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
            {policy.statusLabel}
          </span>
        </div>

        {/* 方案名称 */}
        <h3 className="text-base font-bold text-[#0B1733] group-hover:text-[#1C5FB8] transition-colors mb-1">
          {policy.planName}
        </h3>
        <p className="text-[11px] text-slate-400 font-mono mb-4">
          正式备案名：{policy.officialContractName}
        </p>

        {/* 核心信息网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 p-3.5 rounded-xl bg-slate-50 text-xs mb-4">
          <div className="flex items-center gap-2">
            <User className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-500">被保险人:</span>
            <span className="font-semibold text-slate-800">{policy.insuredPerson}</span>
          </div>

          <div className="flex items-center gap-2">
            <Lock className="w-3.5 h-3.5 text-[#1C5FB8] shrink-0" />
            <span className="text-slate-500">锁价保费:</span>
            <span className="font-semibold text-[#123B70]">{policy.lockedPremium}</span>
          </div>

          <div className="flex items-center gap-2 sm:col-span-2">
            <Clock className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <span className="text-slate-500">保障期限:</span>
            <span className="text-slate-700">{policy.coveragePeriod}</span>
          </div>
        </div>

        {/* 锁价与因素通俗解释 */}
        <div className="text-[11px] text-slate-500 line-clamp-1 mb-4">
          <span className="text-slate-400">契约承诺: </span>
          {policy.priceRationale}
        </div>
      </div>

      {/* 底部动作 */}
      <div className="pt-3 border-t border-slate-100 flex items-center justify-between">
        <span className="text-xs text-slate-400">
          专员: {policy.advisorName}
        </span>
        <Link
          to={`/policies/${policy.id}`}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-[#EAF1FB] text-[#123B70] hover:bg-[#123B70] hover:text-white text-xs font-semibold transition-all"
        >
          <span>查看保单凭据与条款</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
