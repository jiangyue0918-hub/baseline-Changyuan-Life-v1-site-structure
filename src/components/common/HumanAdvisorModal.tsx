/**
 * 人工专员连线与预约弹窗
 * 遵循《长垣人寿官网_施工规范_v2.1》第七节（重大时刻真人负责，拒绝死循环）
 */

import React, { useState } from 'react';
import { useApp } from '../../app/AppContext';
import { UserCheck, X, Phone, Calendar, MessageSquare, Check, Clock, MapPin, Send } from 'lucide-react';
import { AssetImage } from './AssetImage';

export const HumanAdvisorModal: React.FC = () => {
  const { isHumanAdvisorModalOpen, closeHumanAdvisorModal, humanAdvisorContext } = useApp();
  const [tab, setTab] = useState<'instant' | 'book'>('instant');
  const [message, setMessage] = useState('');
  const [messagesList, setMessagesList] = useState<Array<{ role: 'user' | 'advisor'; text: string; time: string }>>([
    {
      role: 'advisor',
      text: '您好，我是长垣人寿负责专员林秋。请问有什么我可以帮您解答或处理的吗？',
      time: '09:02'
    }
  ]);

  // 预约表单状态
  const [bookType, setBookType] = useState('branch');
  const [bookDate, setBookDate] = useState('2047-08-25');
  const [bookSuccess, setBookSuccess] = useState(false);

  if (!isHumanAdvisorModalOpen) return null;

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim()) return;

    const userMsg = message;
    const now = new Date();
    const timeStr = `${now.getHours()}:${now.getMinutes() < 10 ? '0' : ''}${now.getMinutes()}`;
    
    setMessagesList(prev => [...prev, { role: 'user', text: userMsg, time: timeStr }]);
    setMessage('');

    // 专员贴心自动回复
    setTimeout(() => {
      setMessagesList(prev => [
        ...prev,
        {
          role: 'advisor',
          text: `已收到您的诉求：“${userMsg}”。我正在调取您关联的保单记录与长垣人寿责任清单。若涉及紧急伤病或理赔争议，我也可以为您安排专程上门协助。`,
          time: timeStr
        }
      ]);
    }, 800);
  };

  const handleBookSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setBookSuccess(true);
    setTimeout(() => {
      setBookSuccess(false);
      closeHumanAdvisorModal();
    }, 1800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-xl rounded-2xl bg-white border border-[#D9E4F2] shadow-2xl overflow-hidden flex flex-col text-[#0B1733]">
        {/* 顶部专员简介 */}
        <div className="p-4 sm:p-5 border-b border-slate-100 bg-[#F4F8FC] flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-white shadow-sm shrink-0">
              <AssetImage assetId="advisor-linqiu" aspectRatio="aspect-square" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="font-bold text-base text-[#0B1733]">林秋</h3>
                <span className="px-2 py-0.5 rounded-full bg-[#EAF1FB] text-[#123B70] text-[10px] font-semibold">
                  高级客户顾问 · 工号 CY-082
                </span>
              </div>
              <p className="text-xs text-[#60718A]">扎根长垣本地人身与重特大事件服务14年</p>
            </div>
          </div>
          <button
            onClick={closeHumanAdvisorModal}
            className="text-slate-400 hover:text-slate-700 p-1.5 rounded-lg hover:bg-white"
            aria-label="关闭"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 标签切换 */}
        <div className="flex border-b border-slate-100 bg-slate-50 text-xs font-medium">
          <button
            onClick={() => setTab('instant')}
            className={`flex-1 py-2.5 text-center flex items-center justify-center gap-1.5 transition-colors ${
              tab === 'instant'
                ? 'bg-white text-[#123B70] font-bold border-b-2 border-[#1C5FB8]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <MessageSquare className="w-3.5 h-3.5" />
            <span>在线即时咨询</span>
          </button>
          <button
            onClick={() => setTab('book')}
            className={`flex-1 py-2.5 text-center flex items-center justify-center gap-1.5 transition-colors ${
              tab === 'book'
                ? 'bg-white text-[#123B70] font-bold border-b-2 border-[#1C5FB8]'
                : 'text-slate-500 hover:text-slate-800'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>预约面谈 / 上门服务</span>
          </button>
        </div>

        {/* 内容区 */}
        {tab === 'instant' ? (
          <div className="flex flex-col h-80">
            {humanAdvisorContext && (
              <div className="px-4 py-2 bg-blue-50/70 border-b border-blue-100 text-[11px] text-[#123B70]">
                服务上下文：{humanAdvisorContext}
              </div>
            )}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {messagesList.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${m.role === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-xs leading-relaxed ${
                      m.role === 'user'
                        ? 'bg-[#123B70] text-white rounded-br-xs'
                        : 'bg-slate-100 text-[#0B1733] rounded-bl-xs'
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className="text-[10px] text-slate-400 mt-1 px-1">{m.time}</span>
                </div>
              ))}
            </div>
            <form onSubmit={handleSendMessage} className="p-3 border-t border-slate-100 flex gap-2">
              <input
                type="text"
                value={message}
                onChange={e => setMessage(e.target.value)}
                placeholder="在此输入您的问题或需要协助的事项..."
                className="flex-1 px-3 py-2 text-xs rounded-xl border border-slate-200 outline-none focus:border-[#1C5FB8]"
              />
              <button
                type="submit"
                disabled={!message.trim()}
                className="px-4 py-2 bg-[#1C5FB8] hover:bg-[#123B70] text-white text-xs font-semibold rounded-xl disabled:opacity-50 flex items-center gap-1 transition-all"
              >
                <span>发送</span>
                <Send className="w-3 h-3" />
              </button>
            </form>
          </div>
        ) : (
          <div className="p-6">
            {bookSuccess ? (
              <div className="py-10 text-center space-y-3 animate-fadeIn">
                <div className="w-12 h-12 rounded-full bg-green-100 text-green-600 mx-auto flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <h4 className="font-bold text-base text-[#0B1733]">预约已登记成功</h4>
                <p className="text-xs text-[#60718A]">
                  林秋专员将在2小时内通过终端电话与您做最后确认。
                </p>
              </div>
            ) : (
              <form onSubmit={handleBookSubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block text-slate-700 font-semibold mb-1.5">
                    服务方式
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    <label className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${bookType === 'branch' ? 'border-[#1C5FB8] bg-[#EAF1FB] font-semibold text-[#123B70]' : 'border-slate-200 bg-white'}`}>
                      <input
                        type="radio"
                        name="bookType"
                        value="branch"
                        checked={bookType === 'branch'}
                        onChange={() => setBookType('branch')}
                        className="hidden"
                      />
                      <MapPin className="w-4 h-4 text-[#1C5FB8]" />
                      <span>长垣新枢区营业厅面谈</span>
                    </label>
                    <label className={`p-3 rounded-xl border flex items-center gap-2 cursor-pointer transition-all ${bookType === 'home' ? 'border-[#1C5FB8] bg-[#EAF1FB] font-semibold text-[#123B70]' : 'border-slate-200 bg-white'}`}>
                      <input
                        type="radio"
                        name="bookType"
                        value="home"
                        checked={bookType === 'home'}
                        onChange={() => setBookType('home')}
                        className="hidden"
                      />
                      <UserCheck className="w-4 h-4 text-[#1FA866]" />
                      <span>专员专程上门协助</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    期望预约日期与时段
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="date"
                      value={bookDate}
                      onChange={e => setBookDate(e.target.value)}
                      className="px-3 py-2 border border-slate-200 rounded-xl outline-none"
                    />
                    <select className="px-3 py-2 border border-slate-200 rounded-xl outline-none flex-1">
                      <option>上午 09:30 - 11:30</option>
                      <option>下午 14:00 - 16:30</option>
                      <option>傍晚 17:00 - 19:00</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-slate-700 font-semibold mb-1">
                    事项简述 (可选)
                  </label>
                  <input
                    type="text"
                    placeholder="例如：重症绿色通道申请、家庭共享池额度调整等"
                    className="w-full px-3 py-2 border border-slate-200 rounded-xl outline-none"
                  />
                </div>

                <div className="pt-2 flex justify-end gap-2">
                  <button
                    type="button"
                    onClick={closeHumanAdvisorModal}
                    className="px-4 py-2 border border-slate-200 rounded-xl text-slate-600 hover:bg-slate-50"
                  >
                    取消
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-[#123B70] text-white font-medium rounded-xl hover:bg-[#1C5FB8] shadow-xs"
                  >
                    确认提交预约
                  </button>
                </div>
              </form>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
