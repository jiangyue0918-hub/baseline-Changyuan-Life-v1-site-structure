/**
 * 站点全局页脚 Sitemap 与合规信息
 * 严格遵循《长垣人寿官网_施工规范_v2.1》第四点三节
 */

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useApp } from '../../app/AppContext';
import { SITE_BRAND, SITEMAP_COLUMNS, LEGAL_LINKS } from '../../content/site';
import { Shield, ExternalLink, Lock } from 'lucide-react';

export const Footer: React.FC = () => {
  const { terminalState, openConnectModal } = useApp();
  const navigate = useNavigate();

  const handleLinkClick = (e: React.MouseEvent, item: { path: string; isExternal?: boolean; requiresConnection?: boolean }) => {
    if (item.requiresConnection && terminalState === 'UNCONNECTED') {
      e.preventDefault();
      openConnectModal(item.path);
      return;
    }
  };

  return (
    <footer className="bg-white border-t border-[#D9E4F2] text-[#0B1733] pt-14 pb-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 上半部分：品牌理念与多列 Sitemap */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 pb-12 border-b border-slate-100">
          {/* 品牌列 */}
          <div className="lg:col-span-2 space-y-4 pr-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#123B70] flex items-center justify-center text-white">
                <Shield className="w-5 h-5 fill-white/20" />
              </div>
              <span className="font-bold text-lg text-[#123B70]">
                {SITE_BRAND.fullName}
              </span>
            </div>
            <p className="text-xs text-[#60718A] leading-relaxed">
              {SITE_BRAND.slogan}。{SITE_BRAND.subSlogan}。
            </p>
            <div className="text-xs text-[#60718A] space-y-1 pt-1 font-normal">
              <div>机构备案代码：<span className="font-mono text-[#0B1733]">{SITE_BRAND.regCode}</span></div>
              <div>办公地址：{SITE_BRAND.location}</div>
              <div>服务热线：<span className="font-mono text-[#123B70] font-semibold">{SITE_BRAND.serviceHotline}</span></div>
              <div className="text-[11px] text-slate-400 pt-1">{SITE_BRAND.onlineServiceHours}</div>
            </div>
          </div>

          {/* Sitemap 四大列 */}
          {SITEMAP_COLUMNS.map((col, idx) => (
            <div key={idx} className="space-y-3">
              <h4 className="font-semibold text-xs text-[#123B70] tracking-wider uppercase">
                {col.title}
              </h4>
              <ul className="space-y-2">
                {col.links.map((link, lIdx) => (
                  <li key={lIdx}>
                    <Link
                      to={link.path}
                      onClick={(e) => handleLinkClick(e, link)}
                      className="text-xs text-[#60718A] hover:text-[#1C5FB8] hover:underline transition-colors flex items-center gap-1"
                    >
                      <span>{link.label}</span>
                      {link.requiresConnection && terminalState === 'UNCONNECTED' && (
                        <Lock className="w-2.5 h-2.5 text-slate-300" title="需连接终端" />
                      )}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 底部法律、合规与长垣城市主站连接 */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#60718A]">
          <div className="flex flex-wrap items-center gap-x-4 gap-y-2">
            {LEGAL_LINKS.map((item, idx) => {
              if (item.isExternal) {
                return (
                  <a
                    key={idx}
                    href={item.path}
                    target="_blank"
                    rel="noreferrer"
                    className="hover:text-[#1C5FB8] flex items-center gap-1 transition-colors text-slate-500"
                  >
                    <span>{item.label}</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                );
              }
              return (
                <Link
                  key={idx}
                  to={item.path}
                  className="hover:text-[#1C5FB8] transition-colors"
                >
                  {item.label}
                </Link>
              );
            })}
          </div>

          <div className="text-[11px] text-slate-400 text-center sm:text-right">
            © {SITE_BRAND.currentYear} 长垣人寿保险股份有限公司 版权所有 ｜ 扎根长垣四十年
          </div>
        </div>
      </div>
    </footer>
  );
};
