/**
 * B级核心详情页：保单详情 (/policies/:id)
 * 遵循《长垣人寿官网_施工规范_v2.1》第六点二节
 */

import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useApp } from '../app/AppContext';
import { MOCK_POLICIES } from '../data';
import {
  FileCheck,
  Shield,
  ArrowLeft,
  Lock,
  User,
  Clock,
  Calendar,
  CreditCard,
  UserCheck,
  ChevronDown,
  ChevronUp,
  Download,
  AlertCircle
} from 'lucide-react';

export const PolicyDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { openHumanAdvisorModal, terminalState, openConnectModal } = useApp();
  const [showFullTerms, setShowFullTerms] = useState(false);
  const [downloadNotice, setDownloadNotice] = useState(false);

  // 未连接终端状态拦截：个人保单详情仅对已连接当事人展示
  if (terminalState === 'UNCONNECTED') {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-[#EAF1FB] text-[#123B70] mx-auto flex items-center justify-center">
          <Shield className="w-7 h-7 text-[#1C5FB8]" />
        </div>
        <div className="space-y-2">
          <h1 className="text-xl sm:text-2xl font-bold text-[#0B1733]">个人保单凭据需连接终端后查看</h1>
          <p className="text-xs sm:text-sm text-[#60718A] max-w-md mx-auto leading-relaxed">
            电子保单凭证受《长垣市个人数据自治公约》保护。保单详细条款、锁定费率与直赔协议仅对当事人个人终端开放。
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <button
            type="button"
            onClick={() => openConnectModal(id ? `/policies/${id}` : '/policies')}
            className="px-5 py-2.5 rounded-xl bg-[#123B70] text-white text-xs font-semibold hover:bg-[#1C5FB8] transition-colors cursor-pointer"
          >
            连接个人终端验证
          </button>
          <Link
            to="/plans"
            className="px-5 py-2.5 rounded-xl bg-white border border-[#D9E4F2] text-[#123B70] text-xs font-medium hover:bg-slate-50 transition-colors"
          >
            查阅公开保障方案目录
          </Link>
          <Link
            to="/policies"
            className="px-5 py-2.5 rounded-xl bg-white border border-[#D9E4F2] text-[#60718A] text-xs font-medium hover:bg-slate-50 transition-colors"
          >
            我的保单管理
          </Link>
        </div>
      </div>
    );
  }

  const policy = MOCK_POLICIES.find(p => p.id === id);

  if (!policy) {
    return (
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center space-y-6">
        <div className="w-14 h-14 rounded-2xl bg-slate-100 text-slate-500 mx-auto flex items-center justify-center">
          <AlertCircle className="w-7 h-7" />
        </div>
        <div className="space-y-2">
          <h1 className="text-xl font-bold text-[#0B1733]">未检索到指定保单凭证</h1>
          <p className="text-xs sm:text-sm text-[#60718A] max-w-md mx-auto">
            该保单编号可能已注销或不属于当前已连接终端的个人名下。
          </p>
        </div>
        <div className="flex items-center justify-center gap-3 pt-2">
          <Link
            to="/policies"
            className="px-5 py-2.5 rounded-xl bg-[#123B70] text-white text-xs font-semibold hover:bg-[#1C5FB8] transition-colors"
          >
            返回我的保单列表
          </Link>
          <Link
            to="/plans"
            className="px-5 py-2.5 rounded-xl bg-white border border-[#D9E4F2] text-[#60718A] text-xs font-medium hover:bg-slate-50 transition-colors"
          >
            选购保障方案
          </Link>
        </div>
      </div>
    );
  }

  const handleDownloadPdf = () => {
    setDownloadNotice(true);
    setTimeout(() => setDownloadNotice(false), 3000);
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
      {/* 面包屑 */}
      <div>
        <Link
          to="/policies"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#1C5FB8] font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>返回我的保单列表</span>
        </Link>
      </div>

      {/* 头部保单凭据 */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white border border-[#D9E4F2] shadow-xs space-y-5">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-mono text-xs text-slate-400">
                保单正式编号：{policy.policyNo}
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-green-50 text-green-700 border border-green-200">
                {policy.statusLabel}
              </span>
            </div>
            <h1 className="text-2xl font-bold text-[#0B1733] mt-2">
              {policy.planName}
            </h1>
            <p className="text-xs text-slate-400 font-mono mt-0.5">
              监管核准法律全称：{policy.officialContractName}
            </p>
          </div>

          <button
            onClick={handleDownloadPdf}
            className="px-4 py-2 bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-700 rounded-xl text-xs font-semibold flex items-center gap-1.5 self-start sm:self-auto transition-all"
          >
            <Download className="w-3.5 h-3.5" />
            <span>下载加密保单凭证 (PDF)</span>
          </button>
        </div>

        {downloadNotice && (
          <div className="p-3 rounded-xl bg-green-50 border border-green-200 text-green-800 text-xs animate-fadeIn">
            ✓ 电子保单凭证（含可信区块链验签哈希）已下载完毕。
          </div>
        )}

        {/* 关键信息网格 */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="text-slate-400 mb-1 flex items-center gap-1">
              <User className="w-3.5 h-3.5" />
              <span>被保险人</span>
            </div>
            <div className="font-bold text-sm text-[#0B1733]">{policy.insuredPerson}</div>
            <div className="text-[11px] text-slate-400 mt-1">受益人: 法定受益人</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="text-slate-400 mb-1 flex items-center gap-1">
              <Lock className="w-3.5 h-3.5 text-[#1C5FB8]" />
              <span>锁价保费</span>
            </div>
            <div className="font-bold text-sm text-[#123B70]">{policy.lockedPremium}</div>
            <div className="text-[11px] text-slate-400 mt-1">下次缴费: {policy.nextPaymentDate}</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="text-slate-400 mb-1 flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>保障期间</span>
            </div>
            <div className="font-semibold text-xs text-[#0B1733]">{policy.coveragePeriod}</div>
            <div className="text-[11px] text-green-700 mt-1">自动续期免体检</div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100">
            <div className="text-slate-400 mb-1 flex items-center gap-1">
              <UserCheck className="w-3.5 h-3.5 text-purple-600" />
              <span>负责专员</span>
            </div>
            <div className="font-bold text-sm text-[#0B1733]">{policy.advisorName}</div>
            <button
              onClick={() => openHumanAdvisorModal(`咨询保单 ${policy.policyNo}`)}
              className="text-[11px] text-[#1C5FB8] hover:underline mt-1 block"
            >
              直接联系顾问
            </button>
          </div>
        </div>

        {/* 锁价依据承诺 */}
        <div className="p-4 rounded-2xl bg-[#EAF1FB] border border-[#1C5FB8]/20 text-xs text-[#123B70] leading-relaxed">
          <span className="font-bold">锁价规则与契约依据：</span>
          {policy.priceRationale}
        </div>
      </section>

      {/* 保障责任清单与关联节点 */}
      <section className="p-6 sm:p-8 rounded-3xl bg-white border border-[#D9E4F2] shadow-xs space-y-4">
        <h3 className="text-base font-bold text-[#0B1733]">合同所载保障责任与核准标准</h3>
        <div className="space-y-2">
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
            <div className="font-semibold text-slate-800">合同责任范围与给付类型</div>
            <div className="font-bold text-[#123B70]">{policy.category}</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
            <div className="font-semibold text-slate-800">缴费与结算频次</div>
            <div className="font-bold text-slate-700">{policy.paymentMode}</div>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-between text-xs">
            <div className="font-semibold text-slate-800">法定受益人设置</div>
            <div className="font-bold text-slate-700">{policy.beneficiary}</div>
          </div>
        </div>

        {/* 关联可信节点 */}
        <div className="pt-3 border-t border-slate-100 space-y-2">
          <div className="text-xs font-bold text-[#0B1733]">本合同互通关联之可信政务与医疗协作节点</div>
          <div className="flex flex-wrap gap-2">
            {policy.dataAuthorizations.map((node, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg bg-slate-100 text-slate-700 text-xs font-mono"
              >
                ✓ {node}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* 条款与免责折叠查看 */}
      <section className="p-6 rounded-3xl bg-white border border-[#D9E4F2] shadow-xs space-y-3">
        <button
          onClick={() => setShowFullTerms(!showFullTerms)}
          className="w-full flex items-center justify-between text-left text-sm font-bold text-[#0B1733]"
        >
          <span>合同条款与免责范围全文</span>
          {showFullTerms ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
        </button>

        {showFullTerms && (
          <div className="pt-3 border-t border-slate-100 text-xs text-[#60718A] space-y-3 leading-relaxed">
            <p>
              第一条 合同成立与生效：投保人提出保险申请，经长垣人寿可信身份验证通过并收取首期保险费后，本合同生效。
            </p>
            <p>
              第二条 责任免除：因投保人故意犯罪、核污染、重大未遵医嘱非法药品滥用等法定明确免责事实除外；在长垣市已定点医疗机构发生之合理合规诊疗，均依约给付。
            </p>
            <p>
              第三条 诉讼与管辖：因履行本合同所产生的任何纠纷，由长垣市人民法院管辖或长垣金融仲裁委员会仲裁。
            </p>
          </div>
        )}
      </section>
    </div>
  );
};
