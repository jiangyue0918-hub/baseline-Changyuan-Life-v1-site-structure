/**
 * B级管理页：数据与授权管理 (/support/authorizations)
 * 遵循《长垣人寿官网_施工规范_v2.1》第十四节（数据与授权透明可控）
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { useApp } from '../app/AppContext';
import { KeyRound, ArrowLeft, ShieldCheck, Trash2, CheckCircle2, AlertCircle } from 'lucide-react';

export const AuthorizationsPage: React.FC = () => {
  const { authorizations, revokeAuthorization } = useApp();

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10 space-y-10">
      <div>
        <Link
          to="/support"
          className="inline-flex items-center gap-1.5 text-xs text-slate-500 hover:text-[#1C5FB8] font-medium transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>返回服务支持</span>
        </Link>
      </div>

      <section className="p-6 sm:p-8 rounded-3xl bg-white border border-[#D9E4F2] shadow-xs space-y-3">
        <div className="flex items-center gap-2">
          <KeyRound className="w-6 h-6 text-[#D9872D]" />
          <h1 className="text-2xl font-bold text-[#0B1733]">终端数据互通与可信节点授权</h1>
        </div>
        <p className="text-xs sm:text-sm text-[#60718A] leading-relaxed">
          根据长垣数字自治公约与长垣人寿《个人数据最小必要原则》，我们仅在获得您本人终端加密签发的前提下，跨节点调取核赔与社保结算必要凭据。您可以随时关闭或撤回任意系统的访问互通。
        </p>
      </section>

      <section className="space-y-4">
        <h2 className="text-lg font-bold text-[#0B1733]">已授权机构与系统互联状态</h2>

        <div className="space-y-4">
          {(authorizations || []).map(item => (
            <div
              key={item.id}
              className="p-5 rounded-2xl bg-white border border-[#D9E4F2] shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1 max-w-xl">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-sm text-[#0B1733]">{item.targetSystem}</span>
                  <span className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                    item.status === 'active'
                      ? 'bg-green-100 text-green-800'
                      : 'bg-slate-200 text-slate-600'
                  }`}>
                    {item.status === 'active' ? '正常互认中' : '授权已撤销'}
                  </span>
                </div>
                <div className="text-xs text-slate-600 font-medium">{item.purpose}</div>
                <div className="text-xs text-slate-400">调用范围: {item.scope}</div>
                <div className="text-[11px] text-slate-400 font-mono pt-1">
                  生效期: {item.grantedAt} ~ {item.expiresAt}
                </div>
              </div>

              <div className="shrink-0">
                {item.status === 'active' ? (
                  <button
                    onClick={() => revokeAuthorization(item.id)}
                    className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-700 text-xs font-semibold rounded-xl border border-red-200 transition-all flex items-center gap-1.5"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span>即刻撤销此项授权</span>
                  </button>
                ) : (
                  <span className="text-xs text-slate-400 font-medium">已于终端断开互认</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};
