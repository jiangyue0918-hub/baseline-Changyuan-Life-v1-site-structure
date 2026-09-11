/**
 * 个人通知与任务待办侧边抽屉
 * 遵循《长垣人寿官网_施工规范_v2.1》第十四节（通知只承载真实待办和重要变化，严禁把营销广告伪装成红点待办）
 */

import React from 'react';
import { useApp } from '../../app/AppContext';
import { useNavigate } from 'react-router-dom';
import { Bell, X, Check, ArrowRight, AlertCircle, AlertTriangle, Info } from 'lucide-react';

export const NotificationDrawer: React.FC = () => {
  const { isNotifOpen, closeNotif, notifications, markNotificationAsRead } = useApp();
  const navigate = useNavigate();

  if (!isNotifOpen) return null;

  const handleNotificationClick = (item: { id: string; link?: string }) => {
    markNotificationAsRead(item.id);
    closeNotif();
    if (item.link) {
      navigate(item.link);
    }
  };

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="fixed inset-0 z-50 flex justify-end bg-slate-900/40 backdrop-blur-xs animate-fadeIn">
      <div className="w-full max-w-md bg-white h-full shadow-2xl flex flex-col border-l border-[#D9E4F2] text-[#0B1733] animate-slideLeft">
        {/* 头部 */}
        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-[#EAF1FB] flex items-center justify-center text-[#1C5FB8]">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#0B1733]">通知与履约事项</h3>
              <p className="text-xs text-[#60718A]">
                {unreadCount > 0 ? `${unreadCount} 项待办/提示需关注` : '全部事项已处理'}
              </p>
            </div>
          </div>
          <button
            onClick={closeNotif}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition-colors"
            aria-label="关闭"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* 列表 */}
        <div className="flex-1 overflow-y-auto p-4 space-y-3">
          {notifications.length === 0 ? (
            <div className="text-center py-16 text-slate-400 text-xs">
              暂无任何待办事项
            </div>
          ) : (
            notifications.map(n => {
              let Icon = Info;
              let borderClass = 'border-slate-200 bg-white';
              let iconColor = 'text-blue-600 bg-blue-50';

              if (n.priority === 'urgent') {
                Icon = AlertCircle;
                borderClass = 'border-red-200 bg-red-50/40';
                iconColor = 'text-red-600 bg-red-100';
              } else if (n.priority === 'high') {
                Icon = AlertTriangle;
                borderClass = 'border-amber-200 bg-amber-50/40';
                iconColor = 'text-amber-600 bg-amber-100';
              }

              return (
                <div
                  key={n.id}
                  onClick={() => handleNotificationClick(n)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer hover:shadow-sm ${borderClass} ${
                    !n.isRead ? 'ring-1 ring-[#1C5FB8]/20' : 'opacity-85'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-8 h-8 rounded-lg shrink-0 flex items-center justify-center ${iconColor}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="font-semibold text-sm text-[#0B1733] truncate">
                          {n.title}
                        </span>
                        {!n.isRead && (
                          <span className="w-2 h-2 rounded-full bg-[#1C5FB8] shrink-0"></span>
                        )}
                      </div>
                      <p className="text-xs text-[#60718A] mt-1 leading-relaxed">
                        {n.summary}
                      </p>
                      <div className="flex items-center justify-between mt-2.5 pt-2 border-t border-slate-100/60 text-[11px] text-slate-400">
                        <span>{n.date}</span>
                        <span className="text-[#1C5FB8] flex items-center gap-0.5 font-medium">
                          <span>查看办理</span>
                          <ArrowRight className="w-3 h-3" />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* 底部说明 */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 text-[11px] text-slate-500 leading-relaxed">
          长垣人寿承诺：此处绝不发送推销广告、节日营销或虚假红点，仅提醒与您人身保单履约、费率锁定期及理赔相关的真实事实。
        </div>
      </div>
    </div>
  );
};
