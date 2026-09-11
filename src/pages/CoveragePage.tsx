/**
 * A级核心页面：我的保障 (/coverage)
 * 遵循《长垣人寿官网_施工规范_v2.1》第五点三节
 * 
 * 模块顺序严格锁定：
 * 页面 Hero/标题区 -> 当前保障状态与待办 -> 保障构成（按来源/按类别切换）-> 重点保障一览 -> 保障变化/报告下载 -> 可选增强
 */

import React, { useState } from 'react';
import { useApp } from '../app/AppContext';
import { COVERAGE_PAGE_CONTENT } from '../content/pages/coverage';
import { CoverageOverviewCard } from '../components/insurance/CoverageOverviewCard';
import { AssetImage } from '../components/common/AssetImage';
import { MOCK_COVERAGE_SUMMARY } from '../data';
import {
  ShieldCheck,
  Download,
  Layers,
  Activity,
  CheckCircle2,
  Lock,
  ArrowRight,
  FileSpreadsheet,
  AlertCircle
} from 'lucide-react';
import { Link } from 'react-router-dom';

export const CoveragePage: React.FC = () => {
  const { terminalState, openConnectModal } = useApp();
  const content = COVERAGE_PAGE_CONTENT;
  const [activeTab, setActiveTab] = useState<'source' | 'category'>('source');
  const [isDownloading, setIsDownloading] = useState(false);
  const [downloadNotice, setDownloadNotice] = useState(false);

  const isConnected = terminalState !== 'UNCONNECTED';

  const handleDownloadReport = () => {
    setIsDownloading(true);
    setTimeout(() => {
      setIsDownloading(false);
      setDownloadNotice(true);
      setTimeout(() => setDownloadNotice(false), 3000);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
      {/* 1. 页面 Hero / 标题区 */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-white via-[#F4F8FC] to-white border border-[#D9E4F2] shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF1FB] text-[#123B70] text-xs font-semibold">
              <ShieldCheck className="w-4 h-4 text-[#1FA866]" />
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

      {/* 若未连接终端，提示连接，同时展示示例概貌 */}
      {!isConnected && (
        <div className="p-5 rounded-2xl bg-blue-50/70 border border-[#1C5FB8]/20 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Lock className="w-5 h-5 text-[#1C5FB8] shrink-0" />
            <div className="text-xs text-[#123B70]">
              <span className="font-bold">当前处于未连接状态：</span>
              页面下方显示的是长垣标准家庭参考模型。连接个人终端即可查验您本人的实际三层保障。
            </div>
          </div>
          <button
            onClick={() => openConnectModal('/coverage')}
            className="px-4 py-2 bg-[#123B70] hover:bg-[#1C5FB8] text-white rounded-xl text-xs font-semibold shrink-0 transition-all shadow-xs"
          >
            连接终端加载我的保障
          </button>
        </div>
      )}

      {/* 2. 当前保障状态与核验概貌 */}
      <section className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <h2 className="text-xl font-bold text-[#0B1733]">
              {content.statusOverview.title}
            </h2>
            <p className="text-xs text-[#60718A]">
              {content.statusOverview.lastSyncNotice}
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-50 border border-green-200 text-green-800 text-xs font-semibold">
              <CheckCircle2 className="w-3.5 h-3.5 text-green-600" />
              <span>{content.statusOverview.safeBadge}</span>
            </span>
          </div>
        </div>

        <p className="text-xs text-slate-600 leading-relaxed bg-white p-4 rounded-xl border border-slate-200">
          {content.statusOverview.safeDesc}
        </p>

        {/* 核心三层保障构成 */}
        <CoverageOverviewCard data={MOCK_COVERAGE_SUMMARY} />
      </section>

      {/* 3. 重点保障一览（按生活风险分类透视） */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-[#0B1733]">生活重点风险覆盖评估</h2>
            <p className="text-xs text-[#60718A] mt-0.5">
              按医疗大病、意外突发、收入中断与未来养老多维健康度测算
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {content.riskCategories.map(risk => (
            <div
              key={risk.id}
              className="p-5 rounded-2xl bg-white border border-[#D9E4F2] shadow-xs flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-bold text-sm text-[#0B1733]">{risk.name}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                    risk.status === '完整充分' || risk.status === '极高'
                      ? 'bg-green-50 text-green-700'
                      : risk.status === '良好'
                      ? 'bg-blue-50 text-[#1C5FB8]'
                      : 'bg-amber-50 text-amber-700'
                  }`}>
                    {risk.status}
                  </span>
                </div>
                <p className="text-xs text-[#60718A] leading-relaxed mb-4">
                  {risk.summary}
                </p>
              </div>

              {/* 覆盖度进度条 */}
              <div>
                <div className="flex justify-between text-[11px] text-slate-400 mb-1">
                  <span>综合评估充裕度</span>
                  <span className="font-mono font-semibold text-slate-700">{risk.coverageScore}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-slate-100 overflow-hidden">
                  <div
                    className={`h-full rounded-full ${
                      risk.coverageScore >= 90
                        ? 'bg-[#1FA866]'
                        : risk.coverageScore >= 80
                        ? 'bg-[#1C5FB8]'
                        : 'bg-[#D9872D]'
                    }`}
                    style={{ width: `${risk.coverageScore}%` }}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. 保障变化/报告下载 */}
      <section className="p-6 rounded-3xl bg-white border border-[#D9E4F2] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-5">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-[#EAF1FB] flex items-center justify-center text-[#123B70] shrink-0">
            <FileSpreadsheet className="w-6 h-6" />
          </div>
          <div>
            <h3 className="text-base font-bold text-[#0B1733]">
              {content.reportDownload.title}
            </h3>
            <p className="text-xs text-[#60718A] leading-relaxed mt-1 max-w-xl">
              {content.reportDownload.desc}
            </p>
          </div>
        </div>

        <div className="shrink-0">
          <button
            onClick={handleDownloadReport}
            disabled={isDownloading}
            className="px-5 py-2.5 rounded-xl bg-[#123B70] hover:bg-[#1C5FB8] text-white text-xs font-semibold flex items-center gap-2 shadow-xs transition-all disabled:opacity-50"
          >
            <Download className="w-4 h-4" />
            <span>{isDownloading ? '正在生成加密验签凭证...' : content.reportDownload.buttonText}</span>
          </button>
          {downloadNotice && (
            <div className="text-[11px] text-green-700 mt-1 text-center animate-fadeIn">
              ✓ 报告已成功加密生成并存入终端下载夹
            </div>
          )}
        </div>
      </section>

      {/* 5. 可选增强（规范规定：中性提示，不制造恐慌，核心保障完整如实说明） */}
      <section className="p-6 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-xs text-slate-600 leading-relaxed">
          <span className="font-semibold text-slate-800">关于保障增强的客观建议：</span>
          您当前的核心人身风险已得到充分托底。若未来有银发长辈看护需求或经常性搭乘低空通勤，可自选查阅对应专项方案，拒绝多余无效投保。
        </div>
        <Link
          to="/plans"
          className="px-4 py-2 bg-white border border-[#D9E4F2] hover:border-[#1C5FB8] text-[#123B70] text-xs font-semibold rounded-xl shrink-0 transition-all flex items-center gap-1"
        >
          <span>查看可选补充方案</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </section>
    </div>
  );
};
