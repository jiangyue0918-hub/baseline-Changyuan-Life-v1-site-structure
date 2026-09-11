/**
 * 三层保障结构概览组件
 * 遵循《长垣人寿官网_施工规范_v2.1》第三点一节与第五点三节
 * 
 * 严禁把第一层、第二层、雇主保障与商业保障粗暴相加为虚假总额，分层呈现清晰透明。
 */

import React, { useState } from 'react';
import { CoverageSummary } from '../../types';
import { ShieldCheck, Users, Briefcase, Lock, ChevronDown, ChevronUp, AlertCircle } from 'lucide-react';

interface Props {
  data: CoverageSummary;
  showDetailsToggle?: boolean;
}

export const CoverageOverviewCard: React.FC<Props> = ({ data, showDetailsToggle = true }) => {
  const [expandedLayer, setExpandedLayer] = useState<string | null>(null);

  const toggleLayer = (layer: string) => {
    setExpandedLayer(expandedLayer === layer ? null : layer);
  };

  return (
    <div className="space-y-4">
      {/* 状态徽标与核验说明 */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-4 rounded-2xl bg-white border border-[#D9E4F2] shadow-xs">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-green-50 text-green-600 flex items-center justify-center shrink-0">
            <ShieldCheck className="w-6 h-6" />
          </div>
          <div>
            <div className="text-sm font-bold text-[#0B1733] flex items-center gap-2">
              <span>{data.statusText}</span>
              <span className="px-2 py-0.5 rounded-full bg-green-100 text-green-800 text-[10px] font-semibold">
                经可信节点验证
              </span>
            </div>
            <div className="text-xs text-[#60718A] mt-0.5">
              数据同步时间：{data.updatedAt}
            </div>
          </div>
        </div>
      </div>

      {/* 四大层次卡片分列 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* 第一层：城市法定兜底 */}
        <div className="p-5 rounded-2xl bg-white border border-[#D9E4F2] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-[#123B70] tracking-wider uppercase bg-[#EAF1FB] px-2.5 py-1 rounded-full">
                第一层 · 城市法定兜底
              </span>
              <span className="text-xs font-semibold text-green-700">
                {data.cityBaseCoverage.status}
              </span>
            </div>
            <h4 className="text-base font-bold text-[#0B1733] mb-1">
              不可耗尽的城市基本生命兜底
            </h4>
            <p className="text-xs text-[#60718A] leading-relaxed mb-3">
              {data.cityBaseCoverage.description}
            </p>
            <div className="space-y-1.5 pt-2 border-t border-slate-100">
              {data.cityBaseCoverage.coverageItems.map((item, idx) => (
                <div key={idx} className="flex items-center gap-2 text-xs text-slate-700">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1FA866]"></span>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* 第二层：公共动态个人/家庭额度 */}
        <div className="p-5 rounded-2xl bg-white border border-[#D9E4F2] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-[#1C5FB8] tracking-wider uppercase bg-blue-50 px-2.5 py-1 rounded-full">
                第二层 · 公共动态与家庭互助
              </span>
              <span className="text-xs font-semibold text-[#1C5FB8]">
                {data.publicDynamicQuota.status}
              </span>
            </div>
            <h4 className="text-base font-bold text-[#0B1733] mb-1">
              个人账户与家庭互助共享池
            </h4>
            <div className="space-y-2 mt-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-slate-500">个人动态医保结余</div>
                  <div className="text-sm font-bold text-[#123B70] mt-0.5">
                    {data.publicDynamicQuota.personalBalance.toLocaleString()} / {data.publicDynamicQuota.personalTotal.toLocaleString()} CY-CR
                  </div>
                </div>
                <div className="text-[11px] text-slate-400">有效至年底</div>
              </div>

              <div className="p-3 bg-slate-50 rounded-xl flex items-center justify-between">
                <div>
                  <div className="text-slate-500 flex items-center gap-1">
                    <Users className="w-3.5 h-3.5 text-[#1C5FB8]" />
                    <span>登记家庭共享额度 ({data.publicDynamicQuota.familyMemberCount}人)</span>
                  </div>
                  <div className="text-sm font-bold text-[#123B70] mt-0.5">
                    可用调剂 {data.publicDynamicQuota.familySharedBalance.toLocaleString()} CY-CR
                  </div>
                </div>
                <div className="text-[11px] text-green-700 font-medium">额度充裕</div>
              </div>
            </div>
          </div>
        </div>

        {/* 第三层：雇主法定商业保障 */}
        <div className="p-5 rounded-2xl bg-white border border-[#D9E4F2] shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-slate-700 tracking-wider uppercase bg-slate-100 px-2.5 py-1 rounded-full">
                第三层 · 雇主最低法定商业统保
              </span>
              <span className="text-xs font-semibold text-green-700">
                {data.employerCoverage.status}
              </span>
            </div>
            <h4 className="text-base font-bold text-[#0B1733] mb-1">
              工作单位职业安全与工伤责任
            </h4>
            <p className="text-xs text-[#60718A] mb-3">
              缴纳方：{data.employerCoverage.employerName}
            </p>
            <div className="space-y-1.5 p-3 rounded-xl bg-slate-50 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-500">工伤因公意外赔偿额度:</span>
                <span className="font-semibold text-slate-800">{data.employerCoverage.workInjuryAmount.toLocaleString()} CY-CR</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">因公通勤急救直赔额度:</span>
                <span className="font-semibold text-slate-800">{data.employerCoverage.emergencyAidAmount.toLocaleString()} CY-CR</span>
              </div>
            </div>
          </div>
        </div>

        {/* 第三层：长垣人寿商业补充保障 */}
        <div className="p-5 rounded-2xl bg-white border-2 border-[#1C5FB8]/40 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <span className="text-[11px] font-bold text-[#123B70] tracking-wider uppercase bg-[#EAF1FB] px-2.5 py-1 rounded-full">
                第三层 · 长垣人寿商业锁价补充
              </span>
              <span className="text-xs font-semibold text-[#1C5FB8]">
                {data.changyuanCommercialCoverage.activePolicyCount} 份合同履约中
              </span>
            </div>
            <h4 className="text-base font-bold text-[#0B1733] mb-1">
              大病收入替代与百万自费特药
            </h4>
            <p className="text-xs text-[#60718A] mb-3">
              合同期内承诺费率严格锁定，中途不上浮。
            </p>
            <div className="space-y-2">
              {data.changyuanCommercialCoverage.categories.map((cat, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-blue-50/50 border border-blue-100 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-[#123B70]">{cat.category}</div>
                    <div className="text-[11px] text-slate-500">{cat.expiry}</div>
                  </div>
                  <span className="font-bold text-[#0B1733]">{cat.coveredAmount}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
