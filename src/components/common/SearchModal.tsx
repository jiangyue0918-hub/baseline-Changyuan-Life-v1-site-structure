/**
 * 全局搜索弹窗 (支持保障方案、FAQ、新闻、保单与理赔综合检索)
 * 遵循《长垣人寿官网_施工规范_v2.1》第十四节
 */

import React, { useState } from 'react';
import { useApp } from '../../app/AppContext';
import { useNavigate } from 'react-router-dom';
import { Search, X, Shield, HelpCircle, Newspaper, FileText, ArrowRight } from 'lucide-react';
import { PLAN_ITEMS } from '../../content/pages/plans';
import { FAQ_ITEMS } from '../../content/pages/support';
import { NEWS_LIST } from '../../content/secondary';
import { MOCK_POLICIES, MOCK_CLAIMS } from '../../data';

export const SearchModal: React.FC = () => {
  const { isSearchOpen, closeSearch, terminalState } = useApp();
  const navigate = useNavigate();
  const [keyword, setKeyword] = useState('');

  if (!isSearchOpen) return null;

  const kw = keyword.trim().toLowerCase();

  // 检索方案
  const matchedPlans = kw
    ? PLAN_ITEMS.filter(
        p =>
          p.name.toLowerCase().includes(kw) ||
          p.solveWhat.toLowerCase().includes(kw) ||
          p.categoryLabel.toLowerCase().includes(kw)
      )
    : [];

  // 检索 FAQ
  const matchedFaq = kw
    ? FAQ_ITEMS.filter(
        f => f.question.toLowerCase().includes(kw) || f.answer.toLowerCase().includes(kw)
      )
    : [];

  // 检索新闻
  const matchedNews = kw
    ? NEWS_LIST.filter(
        n => n.title.toLowerCase().includes(kw) || n.summary.toLowerCase().includes(kw)
      )
    : [];

  // 仅在已连接状态下检索个人保单与理赔
  const matchedPolicies =
    kw && terminalState !== 'UNCONNECTED'
      ? MOCK_POLICIES.filter(
          p =>
            p.planName.toLowerCase().includes(kw) ||
            p.policyNo.toLowerCase().includes(kw) ||
            p.category.toLowerCase().includes(kw)
        )
      : [];

  const matchedClaims =
    kw && terminalState !== 'UNCONNECTED'
      ? MOCK_CLAIMS.filter(
          c =>
            c.title.toLowerCase().includes(kw) ||
            c.caseNo.toLowerCase().includes(kw) ||
            c.category.toLowerCase().includes(kw)
        )
      : [];

  const handleSelect = (path: string) => {
    closeSearch();
    setKeyword('');
    navigate(path);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-16 sm:pt-24 p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-2xl rounded-2xl bg-white border border-[#D9E4F2] shadow-2xl overflow-hidden text-[#0B1733]">
        {/* 顶部搜索框 */}
        <div className="flex items-center px-4 py-3.5 border-b border-slate-100 gap-3">
          <Search className="w-5 h-5 text-[#1C5FB8] shrink-0" />
          <input
            type="text"
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
            placeholder="搜索保障方案、理赔指南、常见问题、新闻公告..."
            className="w-full text-base outline-none placeholder:text-slate-400 font-medium"
            autoFocus
          />
          {keyword && (
            <button
              onClick={() => setKeyword('')}
              className="text-xs text-slate-400 hover:text-slate-600 px-1.5 py-0.5"
            >
              清空
            </button>
          )}
          <button
            onClick={closeSearch}
            className="text-slate-400 hover:text-slate-700 p-1 rounded-md"
            aria-label="关闭"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 结果区域 */}
        <div className="max-h-[60vh] overflow-y-auto p-4 space-y-4">
          {!kw ? (
            <div className="text-center py-8 text-xs text-[#60718A] space-y-2">
              <p>支持快速搜索长垣人寿公开方案、理赔问答与最新规章。</p>
              <div className="flex flex-wrap items-center justify-center gap-2 pt-2">
                <span className="text-slate-400">热门搜索：</span>
                {['锁价规则', '家庭共享', '理赔自费报销', '长青重疾', '异地就诊'].map(tag => (
                  <button
                    key={tag}
                    onClick={() => setKeyword(tag)}
                    className="px-2.5 py-1 rounded-full bg-slate-100 hover:bg-[#EAF1FB] text-slate-700 hover:text-[#123B70] text-xs transition-colors"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>
          ) : (
            <>
              {matchedPlans.length === 0 &&
                matchedFaq.length === 0 &&
                matchedNews.length === 0 &&
                matchedPolicies.length === 0 &&
                matchedClaims.length === 0 && (
                  <div className="text-center py-10 text-xs text-slate-400">
                    未找到与 “{keyword}” 相关的结果。您可以尝试更简洁的词汇，或直接咨询 AI 顾问。
                  </div>
                )}

              {/* 方案匹配 */}
              {matchedPlans.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Shield className="w-3.5 h-3.5 text-[#1C5FB8]" />
                    <span>保障方案 ({matchedPlans.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedPlans.map(p => (
                      <button
                        key={p.id}
                        onClick={() => handleSelect(`/plans/${p.slug}`)}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-[#F4F8FC] border border-transparent hover:border-[#D9E4F2] flex items-center justify-between group transition-all"
                      >
                        <div>
                          <div className="text-sm font-semibold text-[#0B1733] group-hover:text-[#1C5FB8]">
                            {p.name}
                          </div>
                          <div className="text-xs text-[#60718A] line-clamp-1 mt-0.5">
                            {p.solveWhat}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-[#1C5FB8] shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 个人保单匹配 (已连接) */}
              {matchedPolicies.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#1FA866]" />
                    <span>我的保单 ({matchedPolicies.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedPolicies.map(p => (
                      <button
                        key={p.id}
                        onClick={() => handleSelect(`/policies/${p.id}`)}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-green-50/50 border border-transparent hover:border-green-200 flex items-center justify-between group transition-all"
                      >
                        <div>
                          <div className="text-sm font-semibold text-[#0B1733]">
                            {p.planName}
                          </div>
                          <div className="text-xs text-[#60718A]">
                            单号: {p.policyNo} ｜ 状态: {p.statusLabel}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-green-700 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 个人理赔匹配 (已连接) */}
              {matchedClaims.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <FileText className="w-3.5 h-3.5 text-[#D9872D]" />
                    <span>我的理赔案件 ({matchedClaims.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedClaims.map(c => (
                      <button
                        key={c.id}
                        onClick={() => handleSelect(`/claims/${c.id}`)}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-amber-50/50 border border-transparent hover:border-amber-200 flex items-center justify-between group transition-all"
                      >
                        <div>
                          <div className="text-sm font-semibold text-[#0B1733]">
                            {c.title}
                          </div>
                          <div className="text-xs text-[#60718A]">
                            案件号: {c.caseNo} ｜ 状态: {c.statusLabel}
                          </div>
                        </div>
                        <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-amber-700 shrink-0" />
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* FAQ 匹配 */}
              {matchedFaq.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-[#1C5FB8]" />
                    <span>常见问答 ({matchedFaq.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedFaq.map(f => (
                      <button
                        key={f.id}
                        onClick={() => handleSelect('/support#faq')}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-[#F4F8FC] border border-transparent hover:border-[#D9E4F2] block group transition-all"
                      >
                        <div className="text-sm font-medium text-[#0B1733] group-hover:text-[#1C5FB8]">
                          {f.question}
                        </div>
                        <div className="text-xs text-[#60718A] line-clamp-1 mt-0.5">
                          {f.answer}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* 新闻匹配 */}
              {matchedNews.length > 0 && (
                <div>
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Newspaper className="w-3.5 h-3.5 text-slate-500" />
                    <span>新闻公告 ({matchedNews.length})</span>
                  </div>
                  <div className="space-y-1.5">
                    {matchedNews.map(n => (
                      <button
                        key={n.id}
                        onClick={() => handleSelect(`/about/news/${n.id}`)}
                        className="w-full text-left p-2.5 rounded-xl hover:bg-[#F4F8FC] border border-transparent hover:border-[#D9E4F2] block group transition-all"
                      >
                        <div className="text-sm font-medium text-[#0B1733] group-hover:text-[#1C5FB8]">
                          {n.title}
                        </div>
                        <div className="text-xs text-[#60718A] line-clamp-1 mt-0.5">
                          {n.summary}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};
