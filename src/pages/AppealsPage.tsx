/**
 * B级核心支持页：投诉与申诉通道 (/appeals)
 * 遵循《长垣人寿官网_施工规范_v2.1》第五点七节与第六点三节
 * 
 * 绝不在申诉页面设置 AI 客服阻拦敷衍，直接提供人工受理与正式法律途径说明。
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../app/AppContext';
import { AlertTriangle, ArrowLeft, CheckCircle2, ShieldCheck, Phone, FileText, Send } from 'lucide-react';

export const AppealsPage: React.FC = () => {
  const { openHumanAdvisorModal } = useApp();
  const [submitted, setSubmitted] = useState(false);
  const [title, setTitle] = useState('');
  const [caseNo, setCaseNo] = useState('CLM-2047-002');
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reason.trim()) return;
    setSubmitted(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
      <div>
        <Link
          to="/support"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#1C5FB8] font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>返回服务支持</span>
        </Link>
      </div>

      <section className="p-6 sm:p-8 rounded-3xl bg-white border border-[#D9E4F2] shadow-xs space-y-4">
        <div className="flex items-center gap-2">
          <AlertTriangle className="w-6 h-6 text-amber-600" />
          <h1 className="text-2xl font-bold text-[#0B1733]">正式争议复核与申诉通道</h1>
        </div>
        <p className="text-xs sm:text-sm text-[#60718A] leading-relaxed">
          长垣人寿坚持透明契约与责任人监督制度。本页面由长垣人寿客户权益保护督查室直接受理，承诺 48 小时内给出复核答复，不设置任何 AI 机器人问答拦截。
        </p>

        <div className="p-4 rounded-2xl bg-amber-50 border border-amber-200 text-xs text-amber-950 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-amber-700 shrink-0" />
            <span>督查室直通专线：<strong>400-880-2047 (转8号申诉专席)</strong></span>
          </div>
          <span className="text-[11px] text-amber-800 font-mono">长垣工作日 09:00 - 18:00</span>
        </div>
      </section>

      {/* 申诉表单 */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white border border-[#D9E4F2] shadow-xs">
        {submitted ? (
          <div className="py-12 text-center space-y-4 animate-fadeIn">
            <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 flex items-center justify-center mx-auto">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-lg font-bold text-[#0B1733]">正式复核申请已立案登记</h3>
            <p className="text-xs text-[#60718A] max-w-md mx-auto leading-relaxed">
              立案编号：<strong>APP-2047-0914</strong>。长垣人寿高级理赔督察专员（张文生）将在 24 小时内调取完整诊疗区块链日志，并直接电话联系您沟通。
            </p>
            <div className="pt-2">
              <Link
                to="/claims"
                className="px-5 py-2.5 bg-[#123B70] text-white rounded-xl text-xs font-semibold hover:bg-[#1C5FB8] transition-all"
              >
                返回理赔中心
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-5 text-xs">
            <div>
              <label className="block text-slate-700 font-bold mb-1.5">申诉事项类别</label>
              <select className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:border-[#1C5FB8]">
                <option>理赔责任认定异议 (如自费药剔除争议)</option>
                <option>保单费率锁价规则核算争议</option>
                <option>服务专员履约时效或态度投诉</option>
                <option>数据互通及个人隐私调用异议</option>
              </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-slate-700 font-bold mb-1.5">关联合同或案件号 (可选)</label>
                <input
                  type="text"
                  value={caseNo}
                  onChange={e => setCaseNo(e.target.value)}
                  placeholder="例如：CLM-2047-002"
                  className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:border-[#1C5FB8]"
                />
              </div>
              <div>
                <label className="block text-slate-700 font-bold mb-1.5">联系电话或终端标识</label>
                <input
                  type="text"
                  defaultValue="138-0000-2047"
                  className="w-full p-3 rounded-xl border border-slate-200 outline-none focus:border-[#1C5FB8]"
                />
              </div>
            </div>

            <div>
              <label className="block text-slate-700 font-bold mb-1.5">事实陈述与异议诉求</label>
              <textarea
                rows={5}
                required
                value={reason}
                onChange={e => setReason(e.target.value)}
                placeholder="请详述您的诉求以及所掌握的事实、就诊医院说明等..."
                className="w-full p-3.5 rounded-xl border border-slate-200 outline-none focus:border-[#1C5FB8] resize-none"
              />
            </div>

            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
              <span className="text-[11px] text-slate-400">
                提交后将进入具有法律效力的正式企业复核档案，由独立第三方合规官见证。
              </span>
              <button
                type="submit"
                className="w-full sm:w-auto px-6 py-3 bg-[#123B70] hover:bg-[#1C5FB8] text-white font-semibold rounded-xl transition-all flex items-center justify-center gap-2 shadow-xs"
              >
                <Send className="w-4 h-4" />
                <span>递交正式申诉</span>
              </button>
            </div>
          </form>
        )}
      </section>
    </div>
  );
};
