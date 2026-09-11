/**
 * 开发者调试工作台 (/debug 或 /dev)
 * 供团队和验收方快速验证长垣人寿 5 种终端连接状态下的页面表现
 */

import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../app/AppContext';
import { TerminalState } from '../types';
import { Code2, CheckCircle2, AlertTriangle, ShieldAlert, UserX, ArrowRight, ShieldCheck, FileText, Activity } from 'lucide-react';

export const DebugWorkbenchPage: React.FC = () => {
  const { terminalState, setTerminalState } = useApp();
  const navigate = useNavigate();

  // 进入此页面时，自动写入本地调试标记
  useEffect(() => {
    try {
      localStorage.setItem('changyuan_debug_mode', 'true');
    } catch (e) {
      // ignore
    }
  }, []);

  const states: { key: TerminalState; label: string; desc: string; icon: React.ReactNode; previewBadge: string }[] = [
    {
      key: 'UNCONNECTED',
      label: '未连接终端 (UNCONNECTED)',
      desc: '公共纯展示模式：首页呈现城市概览与开放保障，保单、理赔及授权页面显示安全连接引导，严格保护市民隐私。',
      icon: <UserX className="w-5 h-5 text-slate-400" />,
      previewBadge: '公共市民态'
    },
    {
      key: 'CONNECTED_NORMAL',
      label: '已连接 · 正常在保 (CONNECTED_NORMAL)',
      desc: '健康常态：三层保障合同完整、无待办事项，首页与个人中心展示健康积分与正常保障进度。',
      icon: <CheckCircle2 className="w-5 h-5 text-emerald-500" />,
      previewBadge: '正常履约态'
    },
    {
      key: 'CONNECTED_PENDING',
      label: '已连接 · 存在待办 (CONNECTED_PENDING)',
      desc: '待办提示：包含保单续保确认、医疗数据授权更新或待确认账单等真实业务任务。',
      icon: <AlertTriangle className="w-5 h-5 text-amber-500" />,
      previewBadge: '待办处理态'
    },
    {
      key: 'CONNECTED_DISPUTE',
      label: '已连接 · 争议复核 (CONNECTED_DISPUTE)',
      desc: '理赔异常处理：一笔运动挫伤理赔进入独立责任专员复核通道，展示复核进度、依据与申诉入口。',
      icon: <AlertTriangle className="w-5 h-5 text-rose-500" />,
      previewBadge: '争议复核态'
    },
    {
      key: 'CONNECTED_MAJOR_EVENT',
      label: '已连接 · 重大事件 (CONNECTED_MAJOR_EVENT)',
      desc: '重大突发保障：发生紧急重症救治，资深专员林秋置顶接管，提供兜底先行垫付与全程陪护服务。',
      icon: <ShieldAlert className="w-5 h-5 text-red-500" />,
      previewBadge: '专员顶格接管'
    }
  ];

  const handleExitDebug = () => {
    try {
      localStorage.removeItem('changyuan_debug_mode');
    } catch (e) {
      // ignore
    }
    navigate('/');
  };

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8 font-sans">
      {/* 顶部标题与说明 */}
      <div className="p-6 rounded-2xl bg-slate-900 text-white border border-slate-800 space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-1 rounded bg-amber-500/20 text-amber-300 font-mono text-xs font-bold border border-amber-500/40">
              DEVELOPER WORKBENCH
            </span>
            <span className="text-slate-400 text-xs">/dev · /debug</span>
          </div>
          <button
            type="button"
            onClick={handleExitDebug}
            className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 text-xs font-medium transition-colors"
          >
            退出调试模式并返回首页
          </button>
        </div>
        <h1 className="text-xl sm:text-2xl font-bold tracking-tight text-white">
          长垣人寿 2047 终端状态演练与验收工作台
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-3xl leading-relaxed">
          此面板为开发验收专用通道。正式生产环境中已完全隐藏所有演练控件与文字。在此可直接切换五种业务状态，并在右下角常驻 Debug Panel 辅助全站页面验收。
        </p>
      </div>

      {/* 状态切换卡片区域 */}
      <div className="space-y-3">
        <h2 className="text-base font-bold text-[#0B1733] flex items-center gap-2">
          <Activity className="w-4 h-4 text-[#1C5FB8]" />
          <span>选择当前模拟的终端状态</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3.5">
          {states.map((s) => {
            const active = terminalState === s.key;
            return (
              <div
                key={s.key}
                onClick={() => setTerminalState(s.key)}
                className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between ${
                  active
                    ? 'bg-[#EBF3FC] border-[#1C5FB8] shadow-sm ring-1 ring-[#1C5FB8]'
                    : 'bg-white border-[#D9E4F2] hover:border-slate-300 hover:bg-slate-50/50'
                }`}
              >
                <div className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <div className="p-1.5 rounded-lg bg-slate-100">{s.icon}</div>
                      <div>
                        <div className="font-bold text-sm text-[#0B1733]">{s.label}</div>
                        <div className="text-[11px] text-[#1C5FB8] font-medium">{s.previewBadge}</div>
                      </div>
                    </div>
                    {active ? (
                      <span className="px-2 py-0.5 rounded-full bg-[#1C5FB8] text-white text-[10px] font-bold">
                        当前激活
                      </span>
                    ) : (
                      <span className="text-[11px] text-slate-400 hover:text-slate-600">
                        点击切换
                      </span>
                    )}
                  </div>
                  <p className="text-xs text-[#60718A] leading-relaxed">
                    {s.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* 快捷验证各核心页面 */}
      <div className="p-5 rounded-2xl bg-white border border-[#D9E4F2] space-y-3">
        <h3 className="font-bold text-sm text-[#0B1733] flex items-center gap-2">
          <ShieldCheck className="w-4 h-4 text-[#1FA866]" />
          <span>在当前状态（{terminalState}）下测试以下页面表现：</span>
        </h3>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2.5 pt-1">
          <Link
            to="/?debug=1"
            className="p-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 hover:border-[#1C5FB8] hover:text-[#123B70] flex items-center justify-between"
          >
            <span>网站首页</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          <Link
            to="/plans?debug=1"
            className="p-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 hover:border-[#1C5FB8] hover:text-[#123B70] flex items-center justify-between"
          >
            <span>保障方案库</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          <Link
            to="/policies?debug=1"
            className="p-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 hover:border-[#1C5FB8] hover:text-[#123B70] flex items-center justify-between"
          >
            <span>我的保单凭证</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          <Link
            to="/claims?debug=1"
            className="p-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 hover:border-[#1C5FB8] hover:text-[#123B70] flex items-center justify-between"
          >
            <span>我的理赔中心</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          <Link
            to="/claims/how-it-works?debug=1"
            className="p-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 hover:border-[#1C5FB8] hover:text-[#123B70] flex items-center justify-between"
          >
            <span>公开理赔机制</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          <Link
            to="/claims/settlement?debug=1"
            className="p-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 hover:border-[#1C5FB8] hover:text-[#123B70] flex items-center justify-between"
          >
            <span>公开结算分担</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          <Link
            to="/support/authorizations?debug=1"
            className="p-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 hover:border-[#1C5FB8] hover:text-[#123B70] flex items-center justify-between"
          >
            <span>数据与授权管理</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
          <Link
            to="/appeals?debug=1"
            className="p-2.5 rounded-xl border border-slate-200 text-xs font-medium text-slate-800 hover:border-[#1C5FB8] hover:text-[#123B70] flex items-center justify-between"
          >
            <span>争议复核申诉</span>
            <ArrowRight className="w-3.5 h-3.5 text-slate-400" />
          </Link>
        </div>
      </div>
    </div>
  );
};
