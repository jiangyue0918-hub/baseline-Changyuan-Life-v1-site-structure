/**
 * C级通用页面：全站完整网站地图 (/sitemap)
 * 遵循《长垣人寿官网_施工规范_v2.1》第一节要求2
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { SITEMAP_COLUMNS, LEGAL_LINKS } from '../content/site';
import { Network, ArrowLeft, ChevronRight, ShieldCheck, Lock } from 'lucide-react';
import { useApp } from '../app/AppContext';

export const SitemapPage: React.FC = () => {
  const { terminalState, openConnectModal } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
      <div>
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#1C5FB8] font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>返回首页</span>
        </Link>
      </div>

      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-white via-[#F4F8FC] to-white border border-[#D9E4F2] shadow-xs space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF1FB] text-[#123B70] text-xs font-semibold">
          <Network className="w-4 h-4 text-[#1C5FB8]" />
          <span>全站结构总览</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0B1733]">
          长垣人寿官方网站地图 (Sitemap)
        </h1>
        <p className="text-xs sm:text-sm text-[#60718A] max-w-2xl">
          全站所有业务入口、核心保障页面、政策解读与法律合规公示均可直接查验跳转。
        </p>
      </section>

      {/* 核心A级业务页面 */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white border border-[#D9E4F2] shadow-xs space-y-4">
        <h2 className="text-base font-bold text-[#0B1733] flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-[#1FA866]" />
          <span>核心业务主干系统 (A级)</span>
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 text-xs">
          <Link
            to="/"
            className="p-4 rounded-xl bg-slate-50 hover:bg-[#EAF1FB] border border-slate-100 transition-colors block"
          >
            <div className="font-bold text-[#0B1733]">站点首页</div>
            <div className="text-slate-500 mt-1">未连接/已连接终端自适应首页</div>
          </Link>
          <Link
            to="/coverage"
            className="p-4 rounded-xl bg-slate-50 hover:bg-[#EAF1FB] border border-slate-100 transition-colors block"
          >
            <div className="font-bold text-[#0B1733]">我的保障</div>
            <div className="text-slate-500 mt-1">三层保障全景、报告下载</div>
          </Link>
          <Link
            to="/plans"
            className="p-4 rounded-xl bg-slate-50 hover:bg-[#EAF1FB] border border-slate-100 transition-colors block"
          >
            <div className="font-bold text-[#0B1733]">保障方案库</div>
            <div className="text-slate-500 mt-1">六大主营方案、自然语言场景咨询</div>
          </Link>
          <Link
            to="/policies"
            className="p-4 rounded-xl bg-slate-50 hover:bg-[#EAF1FB] border border-slate-100 transition-colors block"
          >
            <div className="font-bold text-[#0B1733]">我的保单</div>
            <div className="text-slate-500 mt-1">保单凭证、锁价原因、变更通道</div>
          </Link>
          <Link
            to="/claims"
            className="p-4 rounded-xl bg-slate-50 hover:bg-[#EAF1FB] border border-slate-100 transition-colors block"
          >
            <div className="font-bold text-[#0B1733]">理赔服务</div>
            <div className="text-slate-500 mt-1">直赔结算、三层穿透分摊、争议申诉</div>
          </Link>
          <Link
            to="/support"
            className="p-4 rounded-xl bg-slate-50 hover:bg-[#EAF1FB] border border-slate-100 transition-colors block"
          >
            <div className="font-bold text-[#0B1733]">客户服务中心</div>
            <div className="text-slate-500 mt-1">专属顾问林秋、授权管理、FAQ、网点</div>
          </Link>
        </div>
      </section>

      {/* 四大支柱多列细化入口 */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SITEMAP_COLUMNS.map((col, idx) => (
          <div
            key={idx}
            className="p-6 rounded-3xl bg-white border border-[#D9E4F2] shadow-xs space-y-4"
          >
            <h3 className="font-bold text-sm text-[#123B70] border-b border-slate-100 pb-2">
              {col.title}
            </h3>
            <ul className="space-y-2.5">
              {col.links.map((item, lIdx) => (
                <li key={lIdx}>
                  <Link
                    to={item.path}
                    className="text-xs text-slate-600 hover:text-[#1C5FB8] flex items-center justify-between group"
                  >
                    <span>{item.label}</span>
                    <ChevronRight className="w-3 h-3 text-slate-400 group-hover:translate-x-0.5 transition-transform" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* 法律合规与外部监管公示 */}
      <section className="p-6 rounded-3xl bg-white border border-[#D9E4F2] shadow-xs space-y-4">
        <h3 className="font-bold text-sm text-[#0B1733]">法律合规、隐私政策与城市连接</h3>
        <div className="flex flex-wrap gap-4 text-xs">
          {LEGAL_LINKS.map((link, idx) => (
            <Link
              key={idx}
              to={link.path}
              className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-[#1C5FB8] transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
};
