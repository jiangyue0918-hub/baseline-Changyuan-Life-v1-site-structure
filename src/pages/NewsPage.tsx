/**
 * C级普通页面：新闻公告与信息发布 (/news & /news/:id)
 * 遵循《长垣人寿官网_施工规范_v2.1》第十一节（文字与内容维护要求）
 */

import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { NEWS_ARTICLES } from '../content/secondary';
import { Bell, ArrowLeft, Calendar, Tag, ChevronRight } from 'lucide-react';

export const NewsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  // 如果有 id 参数，显示单篇详情
  if (id) {
    const article = NEWS_ARTICLES.find(a => a.id === id) || NEWS_ARTICLES[0];

    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-8">
        <div>
          <Link
            to="/news"
            className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#1C5FB8] font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>返回新闻公告列表</span>
          </Link>
        </div>

        <article className="p-6 sm:p-10 rounded-3xl bg-white border border-[#D9E4F2] shadow-xs space-y-6">
          <div className="space-y-3 border-b border-slate-100 pb-6">
            <div className="flex items-center gap-2 text-xs">
              <span className="px-2.5 py-0.5 rounded-full bg-[#EAF1FB] text-[#123B70] font-semibold">
                {article.category}
              </span>
              <span className="text-slate-400 flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5" />
                <span>{article.date}</span>
              </span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bold text-[#0B1733] leading-tight">
              {article.title}
            </h1>
          </div>

          <div className="text-sm text-[#0B1733] leading-relaxed whitespace-pre-line space-y-4">
            {article.content}
          </div>

          <div className="pt-6 border-t border-slate-100 text-xs text-slate-400">
            发布单位：长垣人寿保险股份有限公司 办公室 ｜ 审核：合规风控部
          </div>
        </article>
      </div>
    );
  }

  // 默认列表页
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-white via-[#F4F8FC] to-white border border-[#D9E4F2] shadow-xs space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF1FB] text-[#123B70] text-xs font-semibold">
          <Bell className="w-4 h-4 text-[#1C5FB8]" />
          <span>官方信息发布中心</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#0B1733]">新闻与法定信息公告</h1>
        <p className="text-xs sm:text-sm text-[#60718A] max-w-2xl">
          长垣人寿定期公开发布重大制度试点、偿付能力核验报告、直赔结算扩容通报与合规监督事项。
        </p>
      </section>

      <section className="space-y-4">
        {NEWS_ARTICLES.map(article => (
          <Link
            key={article.id}
            to={`/news/${article.id}`}
            className="block p-5 sm:p-6 rounded-2xl bg-white border border-[#D9E4F2] shadow-xs hover:border-[#1C5FB8] hover:shadow-md transition-all group"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
              <span className="text-xs font-semibold text-[#123B70] bg-[#EAF1FB] px-2.5 py-0.5 rounded-full self-start">
                {article.category}
              </span>
              <span className="text-xs text-slate-400 font-mono">{article.date}</span>
            </div>

            <h3 className="text-base sm:text-lg font-bold text-[#0B1733] group-hover:text-[#1C5FB8] transition-colors mb-2">
              {article.title}
            </h3>

            <p className="text-xs text-[#60718A] leading-relaxed line-clamp-2">
              {article.summary}
            </p>

            <div className="pt-3 mt-3 border-t border-slate-100 flex items-center text-xs font-semibold text-[#1C5FB8]">
              <span>阅读全文</span>
              <ChevronRight className="w-4 h-4 ml-0.5 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>
        ))}
      </section>
    </div>
  );
};
