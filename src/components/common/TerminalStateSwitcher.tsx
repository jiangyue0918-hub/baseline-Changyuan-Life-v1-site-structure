/**
 * 开发者专用 Debug Panel（终端状态调试工具）
 * 遵循验收与合规要求：
 * - 正常用户访问时完全隐藏，不渲染任何 DOM 和文案，保证线上真实沉浸感；
 * - 仅在 URL 携带 ?debug=1 / ?debug=true、访问 /debug 或 /dev 路由，或开启调试模式后常驻展示；
 * - 完整保留五种业务状态（UNCONNECTED、CONNECTED_NORMAL、CONNECTED_PENDING、CONNECTED_DISPUTE、CONNECTED_MAJOR_EVENT）的即时切换与状态指示。
 */

import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../app/AppContext';
import { TerminalState } from '../../types';
import { Code2, CheckCircle2, AlertTriangle, ShieldAlert, UserX, ChevronDown, ChevronUp, X, ExternalLink } from 'lucide-react';

export const TerminalStateSwitcher: React.FC = () => {
  const { terminalState, setTerminalState } = useApp();
  const location = useLocation();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  // 严格规则：正常访问时完全隐藏；仅当 URL 携带 ?debug=1（或 ?debug=true），或处于 /debug、/dev 路由时才呈现
  const searchParams = new URLSearchParams(location.search);
  const hasDebugParam = searchParams.get('debug') === '1' || searchParams.get('debug') === 'true';
  const isDevRoute = location.pathname === '/debug' || location.pathname === '/dev';
  const isDebugEnabled = hasDebugParam || isDevRoute;

  // 非调试模式下：绝对不渲染任何界面元素，对普通访客完全隐形
  if (!isDebugEnabled) {
    return null;
  }

  const handleExitDebug = () => {
    if (isDevRoute) {
      navigate('/', { replace: true });
    } else {
      const sp = new URLSearchParams(location.search);
      sp.delete('debug');
      const newSearch = sp.toString();
      navigate(`${location.pathname}${newSearch ? `?${newSearch}` : ''}`, { replace: true });
    }
  };

  const states: { key: TerminalState; label: string; desc: string; icon: React.ReactNode }[] = [
    {
      key: 'UNCONNECTED',
      label: '未连接终端 (UNCONNECTED)',
      desc: '公共浏览模式，不展示任何个人隐私与保单数据',
      icon: <UserX className="w-3.5 h-3.5 text-slate-400" />
    },
    {
      key: 'CONNECTED_NORMAL',
      label: '已连接 · 正常 (CONNECTED_NORMAL)',
      desc: '三层保障完整，合同均正常生效，无待办任务',
      icon: <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500" />
    },
    {
      key: 'CONNECTED_PENDING',
      label: '已连接 · 有待办 (CONNECTED_PENDING)',
      desc: '存在保单续期确认、就诊补充授权等待办任务',
      icon: <AlertTriangle className="w-3.5 h-3.5 text-amber-500" />
    },
    {
      key: 'CONNECTED_DISPUTE',
      label: '已连接 · 争议复核 (CONNECTED_DISPUTE)',
      desc: '存在一笔理赔异常进入独立专员争议复核流程',
      icon: <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
    },
    {
      key: 'CONNECTED_MAJOR_EVENT',
      label: '已连接 · 重大事件 (CONNECTED_MAJOR_EVENT)',
      desc: '发生紧急重症救治，资深专员林秋置顶接管',
      icon: <ShieldAlert className="w-3.5 h-3.5 text-red-500" />
    }
  ];

  const currentStateInfo = states.find(s => s.key === terminalState);

  return (
    <div className="fixed bottom-4 right-4 z-50 print:hidden font-mono text-xs select-none">
      {isOpen ? (
        <div className="w-84 rounded-xl bg-slate-900/95 text-slate-100 backdrop-blur-md border border-slate-700 shadow-2xl p-3.5 space-y-3 transition-all">
          {/* Debug 面板头部 */}
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-1.5">
              <span className="px-1.5 py-0.5 rounded bg-amber-500/20 text-amber-300 font-bold text-[10px] tracking-wider border border-amber-500/30">
                DEBUG
              </span>
              <span className="font-sans font-semibold text-xs text-white">
                终端状态控制台
              </span>
            </div>
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded hover:bg-slate-800 transition-colors"
                title="最小化"
              >
                <ChevronDown className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={handleExitDebug}
                className="text-slate-400 hover:text-rose-300 p-1 rounded hover:bg-slate-800 transition-colors"
                title="退出调试模式"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* 当前状态指示 */}
          <div className="px-2.5 py-1.5 rounded-lg bg-slate-800/80 border border-slate-700/60 flex items-center justify-between">
            <span className="text-[10px] text-slate-400 font-sans">当前状态：</span>
            <span className="text-[11px] font-bold text-sky-300 truncate max-w-[170px]">
              {terminalState}
            </span>
          </div>

          {/* 五种状态切换按键 */}
          <div className="space-y-1.5 max-h-64 overflow-y-auto pr-0.5">
            {states.map((s) => {
              const active = terminalState === s.key;
              return (
                <button
                  key={s.key}
                  type="button"
                  onClick={() => setTerminalState(s.key)}
                  className={`w-full text-left p-2 rounded-lg text-xs transition-all border flex items-start gap-2 ${
                    active
                      ? 'bg-sky-950/80 border-sky-500/80 text-sky-200 font-medium'
                      : 'bg-slate-800/40 border-slate-700/40 hover:bg-slate-800 text-slate-300'
                  }`}
                >
                  <div className="mt-0.5 shrink-0">{s.icon}</div>
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center justify-between gap-1">
                      <span className="font-sans font-medium text-[11px] text-slate-100 truncate">
                        {s.label.split(' (')[0]}
                      </span>
                      {active && (
                        <span className="px-1.5 py-0.2 bg-sky-500 text-slate-950 text-[9px] font-bold rounded">
                          ACTIVE
                        </span>
                      )}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-0.5 font-sans leading-tight">
                      {s.desc}
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* 底部调试说明与退出操作 */}
          <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-[10px] text-slate-400 font-sans">
            <span>入参: ?debug=1 或 /debug</span>
            <button
              type="button"
              onClick={handleExitDebug}
              className="text-amber-400 hover:text-amber-300 underline font-medium cursor-pointer"
            >
              关闭调试模式
            </button>
          </div>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => setIsOpen(true)}
          className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-900/90 text-slate-200 text-xs rounded-lg shadow-xl border border-slate-700 hover:bg-slate-800 hover:border-sky-500 transition-all cursor-pointer"
          title="展开终端状态调试面板"
        >
          <Code2 className="w-3.5 h-3.5 text-amber-400" />
          <span className="text-[11px] font-sans">
            Debug: {terminalState}
          </span>
          <ChevronUp className="w-3 h-3 text-slate-400" />
        </button>
      )}
    </div>
  );
};

