/**
 * AI 场景咨询模拟交互弹窗
 * 遵循《长垣人寿官网_施工规范_v2.1》第七节与第五点四节
 */

import React, { useState, useEffect, useCallback } from 'react';
import { useApp } from '../../app/AppContext';
import { useNavigate } from 'react-router-dom';
import { Sparkles, X, Send, Bot, ShieldCheck, AlertCircle, ArrowRight, UserCheck, RefreshCw } from 'lucide-react';
import { getMockAiAdvice } from '../../data';

export const AiConsultationModal: React.FC = () => {
  const { isAiModalOpen, closeAiModal, aiInitialPrompt, openHumanAdvisorModal } = useApp();
  const navigate = useNavigate();
  const [inputPrompt, setInputPrompt] = useState('');
  const [isThinking, setIsThinking] = useState(false);
  const [result, setResult] = useState<ReturnType<typeof getMockAiAdvice> | null>(null);

  const handleAnalyze = useCallback((textToQuery: string) => {
    if (!textToQuery.trim()) return;
    setIsThinking(true);
    setTimeout(() => {
      setIsThinking(false);
      setResult(getMockAiAdvice(textToQuery));
    }, 600);
  }, []);

  useEffect(() => {
    if (!isAiModalOpen) {
      setInputPrompt('');
      setResult(null);
      return;
    }
    if (aiInitialPrompt) {
      setInputPrompt(aiInitialPrompt);
      handleAnalyze(aiInitialPrompt);
    } else {
      setInputPrompt('');
      setResult(null);
    }
  }, [aiInitialPrompt, isAiModalOpen, handleAnalyze]);

  const samplePrompts = [
    '下周去外地出差三天，需要补什么保障？',
    '家里添了宝宝，怎么规划全家共享医疗？',
    '父母刚过60岁，想了解长垣本地长期照护',
    '自由职业独立开发者，怎么补齐误工收入损失？'
  ];

  const handleGoToPlan = (slug: string) => {
    closeAiModal();
    navigate(`/plans/${slug}`);
  };

  if (!isAiModalOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-2xl rounded-2xl bg-white border border-[#D9E4F2] shadow-2xl overflow-hidden flex flex-col max-h-[85vh] text-[#0B1733]">
        {/* 标题 */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between bg-gradient-to-r from-[#F4F8FC] to-white">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#EAF1FB] flex items-center justify-center text-[#1C5FB8]">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#0B1733] flex items-center gap-2">
                长垣人寿 · 智能场景保障顾问
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-blue-100 text-[#123B70]">
                  规则辅助引擎
                </span>
              </h3>
              <p className="text-xs text-[#60718A]">
                说出生活计划或担忧，为您分析已有保障、指出潜在风险并给出中肯建议
              </p>
            </div>
          </div>
          <button
            onClick={closeAiModal}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-slate-100"
            aria-label="关闭"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 咨询内容区 */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {/* 输入框 */}
          <div className="relative">
            <textarea
              rows={3}
              value={inputPrompt}
              onChange={e => setInputPrompt(e.target.value)}
              placeholder="输入你的生活场景或计划（例如：下周要去外地出差、准备要孩子、父母照护规划...）"
              className="w-full p-3.5 text-sm rounded-xl border border-slate-200 focus:border-[#1C5FB8] outline-none resize-none bg-slate-50/50 focus:bg-white transition-all placeholder:text-slate-400"
            />
            <div className="flex items-center justify-between mt-2">
              <div className="flex items-center gap-1 text-xs text-slate-400">
                <Bot className="w-3.5 h-3.5" />
                <span>基于长垣三层社保制度分析，不推销多余险种</span>
              </div>
              <button
                type="button"
                disabled={isThinking || !inputPrompt.trim()}
                onClick={() => handleAnalyze(inputPrompt)}
                className="px-4 py-2 bg-[#123B70] hover:bg-[#1C5FB8] text-white text-xs font-semibold rounded-xl flex items-center gap-1.5 disabled:opacity-50 transition-all shadow-xs"
              >
                {isThinking ? (
                  <>
                    <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    <span>分析中...</span>
                  </>
                ) : (
                  <>
                    <span>智能分析</span>
                    <Send className="w-3.5 h-3.5" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* 快捷场景示例 */}
          {!result && !isThinking && (
            <div className="space-y-2 pt-2">
              <div className="text-xs font-medium text-slate-400">试试这些常见生活场景：</div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {samplePrompts.map(prompt => (
                  <button
                    key={prompt}
                    onClick={() => {
                      setInputPrompt(prompt);
                      handleAnalyze(prompt);
                    }}
                    className="p-2.5 text-left text-xs bg-slate-50 hover:bg-[#EAF1FB] text-slate-700 hover:text-[#123B70] rounded-xl border border-slate-100 hover:border-[#D9E4F2] transition-colors"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* 结构化诊断输出 */}
          {result && (
            <div className="p-4.5 rounded-2xl bg-[#F8FAFC] border border-[#D9E4F2] space-y-4 animate-fadeIn">
              <div className="flex items-center justify-between border-b border-slate-200 pb-2">
                <span className="text-xs font-bold text-[#123B70] flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-[#1FA866]" />
                  场景评估结果：{result.scenario}
                </span>
                <span className="text-[11px] text-slate-400">仅供参考 · 不作强制投保决定</span>
              </div>

              {/* 核心解读 */}
              <p className="text-xs text-[#0B1733] leading-relaxed font-normal">
                {result.analysis}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-white border border-green-200/80">
                  <div className="font-semibold text-green-900 mb-1">您已有覆盖</div>
                  <div className="text-green-700">{result.existingCoverage}</div>
                </div>
                <div className="p-3 rounded-xl bg-white border border-amber-200/80">
                  <div className="font-semibold text-amber-900 mb-1">潜在缺口与风险</div>
                  <div className="text-amber-700">{result.missingRisk}</div>
                </div>
              </div>

              {/* 推荐方案卡片 */}
              <div className="p-3.5 rounded-xl bg-[#EAF1FB] border border-[#1C5FB8]/20 flex items-center justify-between">
                <div>
                  <div className="text-[11px] text-[#123B70] font-medium">长垣人寿建议参考方案</div>
                  <div className="text-sm font-bold text-[#0B1733] mt-0.5">
                    {result.recommendedPlanName}
                  </div>
                </div>
                <button
                  onClick={() => handleGoToPlan(result.recommendedPlanSlug)}
                  className="px-3.5 py-1.5 bg-[#1C5FB8] text-white rounded-lg text-xs font-medium hover:bg-[#123B70] flex items-center gap-1 transition-all"
                >
                  <span>查看详情</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>

              {/* 真实建议提示 */}
              <div className="text-[11px] text-slate-500 bg-white p-3 rounded-xl border border-slate-200/70 leading-relaxed">
                💡 <span className="font-medium text-slate-700">客观提示：</span>{result.adviceNote}
              </div>
            </div>
          )}
        </div>

        {/* 底部升级人工服务栏 */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between text-xs">
          <span className="text-slate-500">
            遇到重大人生事件、复杂家庭方案或有争议？
          </span>
          <button
            onClick={() => {
              closeAiModal();
              openHumanAdvisorModal('来自智能场景咨询的转接服务');
            }}
            className="text-[#1C5FB8] hover:text-[#123B70] font-semibold flex items-center gap-1 hover:underline"
          >
            <UserCheck className="w-4 h-4" />
            <span>连线人工顾问 (林秋)</span>
          </button>
        </div>
      </div>
    </div>
  );
};
