/**
 * 保障方案展示卡片
 * 遵循《长垣人寿官网_施工规范_v2.1》第五点四节
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { PlanItem } from '../../types';
import { Shield, ArrowRight, Lock, CheckCircle } from 'lucide-react';

interface Props {
  plan: PlanItem;
}

export const PlanCard: React.FC<Props> = ({ plan }) => {
  return (
    <div className="rounded-2xl bg-white border border-[#D9E4F2] shadow-xs hover:shadow-md hover:border-[#1C5FB8] transition-all p-6 flex flex-col justify-between group">
      <div>
        {/* 顶部标签与类别 */}
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="text-[11px] font-semibold text-[#123B70] bg-[#EAF1FB] px-2.5 py-1 rounded-full">
            {plan.categoryLabel}
          </span>
          {plan.isPilot && (
            <span className="text-[10px] font-semibold text-purple-700 bg-purple-50 border border-purple-200 px-2 py-0.5 rounded-full">
              合规报备试点
            </span>
          )}
        </div>

        {/* 产品通俗营销名 */}
        <h3 className="text-lg font-bold text-[#0B1733] group-hover:text-[#1C5FB8] transition-colors leading-snug mb-2">
          {plan.name}
        </h3>

        {/* 解决生活痛点 */}
        <p className="text-xs text-[#60718A] leading-relaxed mb-4 line-clamp-2">
          {plan.solveWhat}
        </p>

        {/* 核心亮点 */}
        <div className="space-y-2 mb-5">
          <div className="text-xs text-slate-700 flex items-start gap-2">
            <CheckCircle className="w-4 h-4 text-[#1FA866] shrink-0 mt-0.5" />
            <span className="font-medium">{plan.coverageAmount}</span>
          </div>
          <div className="text-xs text-slate-700 flex items-start gap-2">
            <Lock className="w-4 h-4 text-[#1C5FB8] shrink-0 mt-0.5" />
            <span className="line-clamp-1">{plan.lockPriceRule}</span>
          </div>
        </div>
      </div>

      {/* 底部价格与详情按钮 */}
      <div className="pt-4 border-t border-slate-100 flex items-center justify-between gap-2">
        <div>
          <div className="text-[11px] text-slate-400">参考费率</div>
          <div className="text-xs font-bold text-[#123B70]">{plan.pricing}</div>
        </div>

        <Link
          to={`/plans/${plan.slug}`}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-50 group-hover:bg-[#123B70] text-[#123B70] group-hover:text-white text-xs font-semibold transition-all"
        >
          <span>查看方案详情</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
};
