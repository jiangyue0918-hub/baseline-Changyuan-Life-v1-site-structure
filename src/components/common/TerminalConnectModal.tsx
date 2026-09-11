/**
 * 终端连接模拟流程弹窗
 * 遵循《长垣人寿官网_施工规范_v2.1》第六节（终端连接、身份与角色状态）
 * 
 * 流程包含：
 * 1. 发起连接 -> 终端侧确认身份
 * 2. 展示本次服务需要的最小必要授权范围
 * 3. 用户确认 -> 页面切换为个人空间
 * 4. 严禁使用传统账号密码登录作为世界观默认入口
 */

import React, { useState } from 'react';
import { useApp } from '../../app/AppContext';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, Smartphone, Check, Lock, X, ArrowRight, Loader2 } from 'lucide-react';
import { MOCK_USER } from '../../data';

export const TerminalConnectModal: React.FC = () => {
  const { isConnectModalOpen, closeConnectModal, setTerminalState, connectTargetRedirect } = useApp();
  const navigate = useNavigate();
  const [step, setStep] = useState<'scan' | 'auth_preview' | 'success'>('scan');
  const [isAuthorizing, setIsAuthorizing] = useState(false);

  if (!isConnectModalOpen) return null;

  const handleStartAuth = () => {
    setStep('auth_preview');
  };

  const handleConfirmConnection = () => {
    setIsAuthorizing(true);
    setTimeout(() => {
      setIsAuthorizing(false);
      setTerminalState('CONNECTED_NORMAL');
      setStep('success');
      setTimeout(() => {
        closeConnectModal();
        setStep('scan');
        if (connectTargetRedirect) {
          navigate(connectTargetRedirect);
        }
      }, 1000);
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="relative w-full max-w-lg rounded-2xl bg-white border border-[#D9E4F2] shadow-2xl p-6 sm:p-8 text-[#0B1733] overflow-hidden">
        {/* 关闭按钮 */}
        <button
          onClick={closeConnectModal}
          className="absolute top-5 right-5 text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100 transition-colors"
          aria-label="关闭"
        >
          <X className="w-5 h-5" />
        </button>

        {step === 'scan' && (
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl bg-[#EAF1FB] flex items-center justify-center text-[#1C5FB8]">
                <Smartphone className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-[#0B1733]">连接长垣个人数字终端</h3>
                <p className="text-xs text-[#60718A]">通过长垣市政务与生活可信节点进行安全对齐</p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-100 space-y-3">
              <div className="text-xs font-semibold text-[#123B70] flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-[#1FA866]"></span>
                <span>已在同域近场检测到已授权终端设备</span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white rounded-lg border border-slate-200 shadow-xs">
                <div>
                  <div className="text-sm font-bold text-[#0B1733]">{MOCK_USER.name} 的随身终端</div>
                  <div className="text-xs text-slate-400 font-mono mt-0.5">节点序列号: {MOCK_USER.terminalCode}</div>
                </div>
                <span className="text-[11px] px-2 py-0.5 bg-blue-50 text-[#1C5FB8] font-medium rounded-full">
                  就绪
                </span>
              </div>
            </div>

            <div className="text-xs text-[#60718A] leading-relaxed">
              长垣人寿严格遵守《长垣市个人数据隐私与安全条例》。连接过程不传输任何静态密码，直接基于您终端的安全芯片进行双向验签。
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={closeConnectModal}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors"
              >
                取消
              </button>
              <button
                type="button"
                onClick={handleStartAuth}
                className="px-6 py-2.5 rounded-xl bg-[#123B70] text-white text-sm font-medium hover:bg-[#1C5FB8] transition-all shadow-sm flex items-center gap-1.5"
              >
                <span>下一步：核验授权范围</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {step === 'auth_preview' && (
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-bold text-[#0B1733] flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-[#1FA866]" />
                本次连接申请的最小必要授权
              </h3>
              <p className="text-xs text-[#60718A] mt-1">
                长垣人寿仅申请以下用于履行保障与理赔服务的数据结论：
              </p>
            </div>

            <div className="space-y-2.5">
              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-green-50/70 border border-green-200/60 text-xs">
                <Check className="w-4 h-4 text-green-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-green-900">核验基础身份与履约状态</div>
                  <div className="text-green-700 mt-0.5">确认长垣市常住居民身份、工作单位依法配置的最低商业保障凭据。</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-green-50/70 border border-green-200/60 text-xs">
                <Check className="w-4 h-4 text-green-700 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-green-900">读取长垣人寿历史保单与理赔进度</div>
                  <div className="text-green-700 mt-0.5">同步有效合同明细、三层费用承担计算单与待处理续费凭据。</div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 p-3 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-500">
                <Lock className="w-4 h-4 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <div className="font-semibold text-slate-700">隐私禁区（长垣人寿永久无权访问）</div>
                  <div className="mt-0.5">绝不调取私人通信记录、社交图谱、实时定位或未经授权的原始医疗病历。</div>
                </div>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-2">
              <button
                type="button"
                onClick={() => setStep('scan')}
                className="px-4 py-2.5 rounded-xl border border-slate-200 text-slate-600 text-sm font-medium hover:bg-slate-50 transition-colors"
              >
                返回
              </button>
              <button
                type="button"
                disabled={isAuthorizing}
                onClick={handleConfirmConnection}
                className="px-6 py-2.5 rounded-xl bg-[#123B70] text-white text-sm font-medium hover:bg-[#1C5FB8] transition-all shadow-sm flex items-center gap-2"
              >
                {isAuthorizing ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>终端验签中...</span>
                  </>
                ) : (
                  <>
                    <span>同意并确认连接</span>
                    <Check className="w-4 h-4" />
                  </>
                )}
              </button>
            </div>
          </div>
        )}

        {step === 'success' && (
          <div className="py-8 text-center space-y-4">
            <div className="w-14 h-14 rounded-full bg-green-100 text-green-600 mx-auto flex items-center justify-center animate-bounce">
              <Check className="w-8 h-8" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-[#0B1733]">终端连接成功</h3>
              <p className="text-xs text-[#60718A] mt-1">已成功加载陈墨涵的保障空间，正在进入页面...</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
