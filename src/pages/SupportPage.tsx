/**
 * A级核心页面：服务支持与客户中心 (/support)
 * 遵循《长垣人寿官网_施工规范_v2.1》第五点七节
 * 
 * 模块顺序严格锁定：
 * 页面 Hero/标题区 -> 专属人工服务专员 -> 终端与数据授权管理 -> 常见问题 FAQ -> 线下网点与服务网络 -> 投诉与申诉通道
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../app/AppContext';
import { SUPPORT_PAGE_CONTENT, FAQ_ITEMS } from '../content/pages/support';
import { BRANCHES_CONTENT } from '../content/secondary';
import { AssetImage } from '../components/common/AssetImage';
import {
  Headphones,
  UserCheck,
  KeyRound,
  HelpCircle,
  MapPin,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  ExternalLink,
  ShieldCheck,
  Check,
  Trash2
} from 'lucide-react';

export const SupportPage: React.FC = () => {
  const { openHumanAdvisorModal, authorizations, revokeAuthorization } = useApp();
  const content = SUPPORT_PAGE_CONTENT;

  // FAQ 展开状态
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex(openFaqIndex === idx ? null : idx);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-12">
      {/* 1. 页面 Hero / 标题区 */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-white via-[#F4F8FC] to-white border border-[#D9E4F2] shadow-xs">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          <div className="lg:col-span-8 space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#EAF1FB] text-[#123B70] text-xs font-semibold">
              <Headphones className="w-4 h-4 text-[#1C5FB8]" />
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

      {/* 2. 专属服务专员 / 人工服务区（规范强调：人工服务是重要模块，绝不能做成隐蔽小图标） */}
      <section id="human-service" className="p-6 sm:p-8 rounded-3xl bg-white border border-[#D9E4F2] shadow-xs space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <div>
            <h2 className="text-xl font-bold text-[#0B1733] flex items-center gap-2">
              <UserCheck className="w-5 h-5 text-[#1C5FB8]" />
              <span>专属服务专员</span>
            </h2>
            <p className="text-xs text-[#60718A] mt-0.5">
              长垣人寿承诺：每一位长垣投保居民，均享有明确署名的专职顾问终身跟进
            </p>
          </div>
          <span className="text-xs font-semibold text-green-700 bg-green-50 border border-green-200 px-3 py-1 rounded-full self-start sm:self-auto">
            全时段直通在岗
          </span>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 flex flex-col items-center sm:flex-row lg:flex-col text-center sm:text-left lg:text-center gap-4">
            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-slate-100 shadow-md">
              <AssetImage assetId={content.humanServiceSection.assetId} aspectRatio="aspect-square" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0B1733]">{content.humanServiceSection.advisorName}</h3>
              <div className="text-xs text-[#123B70] font-medium mt-0.5">
                {content.humanServiceSection.advisorTitle}
              </div>
              <div className="text-xs text-slate-400 mt-1">
                工号: CY-ADV-0914 ｜ {content.humanServiceSection.advisorExp}
              </div>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-4">
            <div>
              <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5">
                职责管辖范围
              </div>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 rounded-lg bg-[#EAF1FB] text-[#123B70] text-xs font-medium">
                  大病及伤残理赔协助
                </span>
                <span className="px-3 py-1 rounded-lg bg-[#EAF1FB] text-[#123B70] text-xs font-medium">
                  三层保障穿透解释
                </span>
                <span className="px-3 py-1 rounded-lg bg-[#EAF1FB] text-[#123B70] text-xs font-medium">
                  绿色就诊与垫资转介
                </span>
                <span className="px-3 py-1 rounded-lg bg-[#EAF1FB] text-[#123B70] text-xs font-medium">
                  重大人生事件全权接管
                </span>
              </div>
            </div>

            <p className="text-xs text-[#60718A] leading-relaxed bg-slate-50 p-3.5 rounded-xl border border-slate-100">
              {content.humanServiceSection.advisorDesc}
            </p>

            <div className="flex flex-wrap items-center gap-3 pt-2">
              <button
                onClick={() => openHumanAdvisorModal('来自客户支持页面的直接沟通')}
                className="px-6 py-2.5 bg-[#123B70] hover:bg-[#1C5FB8] text-white rounded-xl text-xs font-semibold shadow-xs transition-all flex items-center gap-2"
              >
                <UserCheck className="w-4 h-4" />
                <span>{content.humanServiceSection.connectButton}</span>
              </button>
              <button
                onClick={() => openHumanAdvisorModal('预约上门与面谈服务')}
                className="px-5 py-2.5 bg-white border border-[#D9E4F2] hover:bg-slate-50 text-[#123B70] rounded-xl text-xs font-semibold transition-all"
              >
                {content.humanServiceSection.appointmentButton}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 3. 终端与数据授权管理 */}
      <section className="p-6 rounded-3xl bg-white border border-[#D9E4F2] shadow-xs space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <KeyRound className="w-5 h-5 text-[#D9872D]" />
            <h2 className="text-xl font-bold text-[#0B1733]">终端与数据授权管理</h2>
          </div>
          <Link
            to="/support/authorizations"
            className="text-xs font-semibold text-[#1C5FB8] hover:underline"
          >
            查看全部可信节点权限明细
          </Link>
        </div>

        <p className="text-xs text-[#60718A]">
          长垣人寿坚持最小必要授权原则。您可以随时在此查阅或撤回各级数据互认权限。
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          {(authorizations || []).map(item => (
            <div
              key={item.id}
              className="p-4 rounded-2xl bg-slate-50 border border-slate-100 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="font-bold text-xs text-[#0B1733]">{item.targetSystem}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    item.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-slate-200 text-slate-500'
                  }`}>
                    {item.status === 'active' ? '授权中' : '已撤回'}
                  </span>
                </div>
                <div className="text-xs font-medium text-slate-700 mb-1">{item.purpose}</div>
                <div className="text-[11px] text-slate-500 mb-3">{item.scope}</div>
              </div>

              <div className="pt-3 border-t border-slate-200/60 flex items-center justify-between text-[11px]">
                <span className="text-slate-400 font-mono">至: {item.expiresAt}</span>
                {item.status === 'active' ? (
                  <button
                    onClick={() => revokeAuthorization(item.id)}
                    className="text-red-600 hover:text-red-700 font-medium flex items-center gap-1"
                  >
                    <Trash2 className="w-3 h-3" />
                    <span>撤回授权</span>
                  </button>
                ) : (
                  <span className="text-slate-400">已终止互通</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. 常见问题 FAQ（含锁价、理赔自付、异地就医等高频痛点） */}
      <section className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-[#0B1733] flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-[#1C5FB8]" />
            <span>常见疑问与政策解读</span>
          </h2>
          <p className="text-xs text-[#60718A] mt-0.5">
            真实、客观、条理清晰的解答，拒绝官僚套话
          </p>
        </div>

        <div className="space-y-3">
          {(FAQ_ITEMS || []).map((faq, idx) => {
            const isOpen = openFaqIndex === idx;
            return (
              <div
                key={faq.id}
                className="rounded-2xl bg-white border border-[#D9E4F2] shadow-xs overflow-hidden transition-all"
              >
                <button
                  onClick={() => toggleFaq(idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xs font-mono text-slate-400">Q{idx + 1}.</span>
                    <span className="text-sm font-bold text-[#0B1733]">{faq.question}</span>
                  </div>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-slate-400 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-5 pb-5 pt-1 text-xs text-[#60718A] leading-relaxed border-t border-slate-100 bg-slate-50/30">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 5. 线下网点与服务网络 */}
      <section className="p-6 rounded-3xl bg-white border border-[#D9E4F2] shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <MapPin className="w-5 h-5 text-[#1FA866]" />
          <h2 className="text-xl font-bold text-[#0B1733]">线下服务网点与营业厅</h2>
        </div>

        <p className="text-xs text-[#60718A]">
          数字办理虽便捷，我们仍在长垣核心居住区保持实体网点柜台，为长辈与复杂事项提供面对面温度。
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 pt-2">
          {(BRANCHES_CONTENT?.branches || []).map((b, idx) => (
            <div key={idx} className="p-4 rounded-2xl bg-slate-50 border border-slate-100 space-y-2">
              <div className="font-bold text-sm text-[#0B1733]">{b.name}</div>
              <div className="text-xs text-[#60718A] flex items-center gap-1.5">
                <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0" />
                <span>{b.address}</span>
              </div>
              <div className="text-xs text-slate-500 pt-1 border-t border-slate-200/60 flex justify-between">
                <span>营业时间: {b.hours}</span>
                <span className="font-mono text-[#123B70]">{b.tel}</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 6. 投诉与申诉通道（规范明确要求：绝不在申诉页面设置 AI 客服阻拦，明确时效与规程） */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900 to-[#123B70] text-white shadow-md flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 text-white text-xs font-semibold">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <span>正式申诉与督查直通渠道</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold">
            独立专员复核与长垣消费者权益申诉通道
          </h3>
          <p className="text-xs text-slate-300 leading-relaxed max-w-2xl">
            长垣人寿承诺：48小时内必须给出书面人工复核意见，不设任何AI阻拦。如仍有异议，无缝对接长垣金融消保委申请中立裁决。
          </p>
        </div>

        <div className="shrink-0 flex items-center gap-3">
          <Link
            to="/appeals"
            className="px-6 py-2.5 bg-amber-500 hover:bg-amber-600 text-slate-950 font-bold text-xs rounded-xl transition-all shadow-sm"
          >
            进入争议申诉通道
          </Link>
        </div>
      </section>
    </div>
  );
};
