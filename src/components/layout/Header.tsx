/**
 * 站点全局顶部导航 Header
 * 严格遵循《长垣人寿官网_施工规范_v2.1》第四节（4.1 未连接导航 / 4.2 已连接导航）
 */

import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useApp } from '../../app/AppContext';
import { SITE_BRAND, UNCONNECTED_NAV, CONNECTED_NAV } from '../../content/site';
import {
  Search,
  Bell,
  Smartphone,
  Shield,
  ChevronDown,
  User,
  FileCheck,
  KeyRound,
  Headphones,
  LogOut,
  Building2,
  Briefcase,
  Menu,
  X
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    terminalState,
    openConnectModal,
    openSearch,
    openNotif,
    notifications,
    user,
    disconnectTerminal,
  } = useApp();
  const location = useLocation();
  const navigate = useNavigate();

  const [isAvatarMenuOpen, setIsAvatarMenuOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const avatarRef = useRef<HTMLDivElement>(null);

  const isConnected = terminalState !== 'UNCONNECTED';
  const navItems = isConnected ? CONNECTED_NAV : UNCONNECTED_NAV;
  const unreadNotifCount = notifications.filter(n => !n.isRead).length;

  // 点击外部关闭头像菜单
  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (avatarRef.current && !avatarRef.current.contains(e.target as Node)) {
        setIsAvatarMenuOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // 路由跳转时关闭移动端菜单
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#D9E4F2] transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between gap-4">
        {/* 品牌标识 */}
        <Link to="/" className="flex items-center gap-3 shrink-0 group">
          <div className="w-10 h-10 rounded-xl bg-[#123B70] flex items-center justify-center text-white shadow-xs group-hover:bg-[#1C5FB8] transition-colors">
            <Shield className="w-5 h-5 fill-white/20 stroke-[2.2]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-lg text-[#123B70] tracking-tight group-hover:text-[#1C5FB8] transition-colors">
                {SITE_BRAND.name}
              </span>
              <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-sm bg-slate-100 text-slate-500 font-semibold">
                {SITE_BRAND.regCode}
              </span>
            </div>
            <div className="text-[11px] text-[#60718A] tracking-wider hidden sm:block">
              2047 · 长垣人身与家庭保障公共数字服务
            </div>
          </div>
        </Link>

        {/* 桌面端导航栏 */}
        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map(item => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                  isActive
                    ? 'text-[#123B70] bg-[#EAF1FB] font-semibold'
                    : 'text-[#60718A] hover:text-[#0B1733] hover:bg-slate-50'
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* 右侧动作区 */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* 搜索按钮 */}
          <button
            onClick={openSearch}
            className="p-2.5 rounded-xl text-[#60718A] hover:text-[#0B1733] hover:bg-slate-100 transition-colors flex items-center gap-1.5"
            aria-label="搜索"
            title="搜索全站保障方案、FAQ与规章"
          >
            <Search className="w-4 h-4" />
            <span className="text-xs hidden md:inline text-slate-400">搜索...</span>
          </button>

          {/* 未连接状态：只保留一个“连接我的终端”按钮 */}
          {!isConnected ? (
            <button
              onClick={() => openConnectModal()}
              className="flex items-center gap-2 px-4 py-2 rounded-xl bg-[#123B70] hover:bg-[#1C5FB8] text-white text-xs sm:text-sm font-semibold shadow-sm transition-all hover:shadow hover:scale-[1.02] active:scale-[0.98]"
            >
              <Smartphone className="w-4 h-4" />
              <span>连接我的终端</span>
            </button>
          ) : (
            /* 已连接状态：通知 + 个人头像/空间 */
            <>
              {/* 通知按钮 */}
              <button
                onClick={openNotif}
                className="relative p-2.5 rounded-xl text-[#60718A] hover:text-[#0B1733] hover:bg-slate-100 transition-colors"
                aria-label="通知待办"
                title="查看履约通知与待办"
              >
                <Bell className="w-4 h-4" />
                {unreadNotifCount > 0 && (
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#1C5FB8]"></span>
                )}
              </button>

              {/* 头像与个人空间菜单 */}
              <div className="relative" ref={avatarRef}>
                <button
                  onClick={() => setIsAvatarMenuOpen(!isAvatarMenuOpen)}
                  className="flex items-center gap-2 p-1.5 sm:px-2.5 rounded-xl hover:bg-slate-100 border border-transparent hover:border-slate-200 transition-all text-left"
                >
                  <div className="w-8 h-8 rounded-full overflow-hidden bg-blue-100 border border-blue-200">
                    <img
                      src={user?.avatar}
                      alt={user?.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="hidden sm:block">
                    <div className="text-xs font-bold text-[#0B1733] leading-none">
                      {user?.name}
                    </div>
                    <div className="text-[10px] text-slate-400 mt-1 leading-none font-mono">
                      个人空间
                    </div>
                  </div>
                  <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
                </button>

                {/* 下拉菜单 */}
                {isAvatarMenuOpen && (
                  <div className="absolute right-0 mt-2 w-64 rounded-2xl bg-white border border-[#D9E4F2] shadow-2xl p-2 text-[#0B1733] text-xs space-y-1 animate-fadeIn">
                    <div className="p-3 bg-slate-50 rounded-xl mb-1 border border-slate-100">
                      <div className="font-bold text-sm text-[#0B1733]">{user?.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">
                        {user?.residentId}
                      </div>
                      <div className="text-[11px] text-[#123B70] mt-1.5 flex items-center gap-1 font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#1FA866]"></span>
                        <span>{user?.employer}</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setIsAvatarMenuOpen(false);
                        navigate('/policies');
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center gap-2.5 text-slate-700"
                    >
                      <FileCheck className="w-4 h-4 text-[#1C5FB8]" />
                      <span>管理我的保单</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsAvatarMenuOpen(false);
                        navigate('/coverage');
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center gap-2.5 text-slate-700"
                    >
                      <Shield className="w-4 h-4 text-[#1FA866]" />
                      <span>我的三层保障全貌</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsAvatarMenuOpen(false);
                        navigate('/support/authorizations');
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center gap-2.5 text-slate-700"
                    >
                      <KeyRound className="w-4 h-4 text-[#D9872D]" />
                      <span>数据与授权管理</span>
                    </button>

                    <button
                      onClick={() => {
                        setIsAvatarMenuOpen(false);
                        navigate('/support#human-service');
                      }}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-slate-100 flex items-center gap-2.5 text-slate-700"
                    >
                      <Headphones className="w-4 h-4 text-purple-600" />
                      <span>专属顾问 (林秋)</span>
                    </button>

                    <div className="my-1 border-t border-slate-100 pt-1">
                      <div className="px-3 py-1 text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
                        角色空间切换 (入口占位)
                      </div>
                      <div className="px-3 py-1.5 text-[11px] text-slate-400 flex items-center gap-2 cursor-not-allowed">
                        <Briefcase className="w-3.5 h-3.5" />
                        <span>员工工作空间 (内部系统)</span>
                      </div>
                      <div className="px-3 py-1.5 text-[11px] text-slate-400 flex items-center gap-2 cursor-not-allowed">
                        <Building2 className="w-3.5 h-3.5" />
                        <span>企业客户空间 (HR统保)</span>
                      </div>
                    </div>

                    <div className="border-t border-slate-100 pt-1">
                      <button
                        onClick={() => {
                          setIsAvatarMenuOpen(false);
                          disconnectTerminal();
                          navigate('/');
                        }}
                        className="w-full text-left px-3 py-2 rounded-lg hover:bg-red-50 text-red-600 flex items-center gap-2.5"
                      >
                        <LogOut className="w-4 h-4" />
                        <span>断开本次终端连接</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </>
          )}

          {/* 移动端汉堡按钮 */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="p-2 rounded-lg lg:hidden text-slate-600 hover:bg-slate-100"
            aria-label="菜单"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* 移动端折叠导航 */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-4 py-3 space-y-1">
          {navItems.map(item => (
            <Link
              key={item.path}
              to={item.path}
              className="block px-3 py-2.5 rounded-lg text-sm font-medium text-slate-700 hover:bg-slate-50"
            >
              {item.label}
            </Link>
          ))}
          {isConnected && (
            <Link
              to="/policies"
              className="block px-3 py-2.5 rounded-lg text-sm font-medium text-[#123B70] bg-[#EAF1FB]"
            >
              管理我的保单
            </Link>
          )}
        </div>
      )}
    </header>
  );
};
