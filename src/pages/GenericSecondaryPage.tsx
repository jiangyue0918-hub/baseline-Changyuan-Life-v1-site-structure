/**
 * C级通用二级页面模板 (GenericSecondaryPage)
 * 遵循《长垣人寿官网_施工规范_v2.1》第一节要求2：
 * “Sitemap 中出现的入口都应该能够真正点击进入页面。
 * 普通二级页可以复用统一模板，不要求每个页面都有独立设计，但不能出现空白页、404、'Coming Soon' 或 '建设中'。”
 */

import React from 'react';
import { useLocation, Link } from 'react-router-dom';
import { SECONDARY_PAGES } from '../content/secondary';
import { ShieldCheck, ArrowLeft, CheckCircle2, FileText, ChevronRight, HelpCircle, Layers, Calculator, Info } from 'lucide-react';

interface Props {
  pageKeyOverride?: string;
}

export const GenericSecondaryPage: React.FC<Props> = ({ pageKeyOverride }) => {
  const location = useLocation();

  // 从当前路径提取 key，例如 /about -> about, /support/branches -> branches, /claims/how-it-works -> how-it-works
  const pathParts = location.pathname.split('/').filter(Boolean);
  const detectedKey = pageKeyOverride || pathParts[pathParts.length - 1] || 'about';

  const pageData = SECONDARY_PAGES[detectedKey] || {
    title: '长垣人寿公共信息',
    subtitle: '扎根长垣四十年，提供透明合规的人身保障与公共民生服务。',
    badge: '官方公开事项',
    sections: [
      {
        title: '相关事项说明',
        paragraphs: [
          '本项业务与信息已在长垣市相关部门登记备案。长垣人寿严格依规执行长垣市社会保障与商业补充联动标准。',
          '如有进一步疑问或需要办理特定事项，请随时前往长垣新枢区营业厅或通过终端连线专属负责专员。'
        ]
      }
    ]
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
      {/* 面包屑 */}
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#1C5FB8] font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>返回首页</span>
        </Link>
      </div>

      {/* 头部标题区 */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-white via-[#F4F8FC] to-white border border-[#D9E4F2] shadow-xs space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF1FB] text-[#123B70] text-xs font-semibold">
          <ShieldCheck className="w-4 h-4 text-[#1FA866]" />
          <span>{pageData.badge}</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0B1733] tracking-tight">
          {pageData.title}
        </h1>
        <p className="text-xs sm:text-sm text-[#60718A] leading-relaxed max-w-2xl">
          {pageData.subtitle}
        </p>
      </section>

      {/* 正文章节 */}
      <div className="space-y-6">
        {pageData.sections.map((sec, idx) => (
          <section
            key={idx}
            className="p-6 sm:p-8 rounded-3xl bg-white border border-[#D9E4F2] shadow-xs space-y-4"
          >
            <h2 className="text-lg font-bold text-[#0B1733] flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#1C5FB8]"></span>
              <span>{sec.title}</span>
            </h2>

            <div className="space-y-3 text-xs sm:text-sm text-slate-700 leading-relaxed">
              {sec.paragraphs.map((p, pIdx) => (
                <p key={pIdx}>{p}</p>
              ))}
            </div>

            {/* 若包含示例案例分层卡片 */}
            {sec.exampleCard && (
              <div className="mt-4 p-5 sm:p-6 rounded-2xl bg-[#F4F8FC] border border-[#D9E4F2] space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-200/80 pb-3">
                  <div>
                    <div className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-[11px] font-semibold mb-1">
                      <Calculator className="w-3 h-3" />
                      <span>{sec.exampleCard.badge}</span>
                    </div>
                    <h3 className="font-bold text-sm sm:text-base text-[#0B1733]">
                      {sec.exampleCard.title}
                    </h3>
                    <p className="text-xs text-[#60718A] mt-0.5">
                      {sec.exampleCard.subtitle}
                    </p>
                  </div>
                  <div className="sm:text-right shrink-0">
                    <div className="text-[11px] text-slate-500">{sec.exampleCard.totalLabel}</div>
                    <div className="font-mono font-bold text-base sm:text-lg text-[#0B1733]">
                      {sec.exampleCard.totalAmount}
                    </div>
                  </div>
                </div>

                {/* 分层明细卡片列表 */}
                <div className="space-y-2.5 pt-1">
                  {sec.exampleCard.layers.map((layer, lIdx) => (
                    <div
                      key={lIdx}
                      className="p-3.5 sm:p-4 rounded-xl bg-white border border-[#D9E4F2] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                    >
                      <div className="space-y-0.5">
                        <div className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-[#1C5FB8] shrink-0" />
                          <span className="font-semibold text-xs sm:text-sm text-[#0B1733]">
                            {layer.name}
                          </span>
                        </div>
                        <div className="text-xs text-[#60718A]">
                          承担主体：<span className="text-slate-700">{layer.payer}</span>
                        </div>
                        <div className="text-[11px] text-slate-500">
                          {layer.desc}
                        </div>
                      </div>

                      <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center shrink-0 border-t sm:border-t-0 pt-2 sm:pt-0 border-slate-100">
                        <span className="font-mono font-bold text-sm sm:text-base text-[#0B1733]">
                          {layer.amount}
                        </span>
                        <span className="text-[11px] px-2 py-0.5 rounded-full bg-[#EAF1FB] text-[#123B70] font-medium">
                          {layer.ratio}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex items-start gap-1.5 text-[11px] text-slate-400 italic pt-1 border-t border-slate-200/60">
                  <Info className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                  <span>{sec.exampleCard.disclaimer}</span>
                </div>
              </div>
            )}

            {sec.bullets && sec.bullets.length > 0 && (
              <ul className="space-y-2 pt-2 border-t border-slate-100">
                {sec.bullets.map((b, bIdx) => (
                  <li key={bIdx} className="flex items-start gap-2 text-xs text-slate-600">
                    <CheckCircle2 className="w-4 h-4 text-[#1FA866] shrink-0 mt-0.5" />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            )}
          </section>
        ))}
      </div>

      {/* 底部咨询联系提示 */}
      <section className="p-6 rounded-2xl bg-slate-50 border border-slate-200/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs">
        <span className="text-slate-500">
          对此页面内容有疑问或需查验纸质备案？
        </span>
        <div className="flex items-center gap-3 shrink-0">
          <Link
            to="/support"
            className="text-[#123B70] font-semibold hover:underline"
          >
            前往服务中心
          </Link>
          <span className="text-slate-300">|</span>
          <Link
            to="/sitemap"
            className="text-[#1C5FB8] font-semibold hover:underline"
          >
            查看全站地图
          </Link>
        </div>
      </section>
    </div>
  );
};
