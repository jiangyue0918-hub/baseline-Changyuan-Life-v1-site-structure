/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 * 
 * 长垣人寿 (2047) 官方网站入口应用
 * 严格遵照《长垣人寿官网_施工规范_v2.1》
 */

import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { AppProvider } from './app/AppContext';
import { Header } from './components/layout/Header';
import { Footer } from './components/layout/Footer';
import { PageShell } from './components/layout/PageShell';

// 全局浮层与功能组件
import { TerminalStateSwitcher } from './components/common/TerminalStateSwitcher';
import { TerminalConnectModal } from './components/common/TerminalConnectModal';
import { SearchModal } from './components/common/SearchModal';
import { NotificationDrawer } from './components/common/NotificationDrawer';
import { AiConsultationModal } from './components/common/AiConsultationModal';
import { HumanAdvisorModal } from './components/common/HumanAdvisorModal';

// A级核心页面
import { HomePage } from './pages/HomePage';
import { CoveragePage } from './pages/CoveragePage';
import { PlansPage } from './pages/PlansPage';
import { PoliciesPage } from './pages/PoliciesPage';
import { ClaimsPage } from './pages/ClaimsPage';
import { SupportPage } from './pages/SupportPage';

// B级详情与流程页
import { PlanDetailPage } from './pages/PlanDetailPage';
import { PolicyDetailPage } from './pages/PolicyDetailPage';
import { ClaimDetailPage } from './pages/ClaimDetailPage';
import { AuthorizationsPage } from './pages/AuthorizationsPage';
import { AppealsPage } from './pages/AppealsPage';

// C级公共与次级页面
import { NewsPage } from './pages/NewsPage';
import { GenericSecondaryPage } from './pages/GenericSecondaryPage';
import { SitemapPage } from './pages/SitemapPage';
import { DebugWorkbenchPage } from './pages/DebugWorkbenchPage';

// 路由跳转自动滚到顶部
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

export default function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen flex flex-col bg-[#F8FAFC] text-[#0B1733] font-sans antialiased selection:bg-[#1C5FB8]/20 selection:text-[#123B70]">
          {/* 站点通用顶部导航 */}
          <Header />

          {/* 主体页面视图 */}
          <PageShell className="flex-1">
            <Routes>
              {/* 7个A级核心主干 */}
              <Route path="/" element={<HomePage />} />
              <Route path="/coverage" element={<CoveragePage />} />
              <Route path="/plans" element={<PlansPage />} />
              <Route path="/policies" element={<PoliciesPage />} />
              <Route path="/claims" element={<ClaimsPage />} />
              <Route path="/support" element={<SupportPage />} />

              {/* 公开 C 级理赔机制与结算说明（必须置于 /claims/:id 之前，确保未连接终端与公开访问正常） */}
              <Route path="/claims/how-it-works" element={<GenericSecondaryPage pageKeyOverride="how-it-works" />} />
              <Route path="/claims/settlement" element={<GenericSecondaryPage pageKeyOverride="settlement" />} />
              <Route path="/claims/guide" element={<GenericSecondaryPage pageKeyOverride="how-it-works" />} />

              {/* B级详情与流程 */}
              <Route path="/plans/:slug" element={<PlanDetailPage />} />
              <Route path="/policies/:id" element={<PolicyDetailPage />} />
              <Route path="/claims/:id" element={<ClaimDetailPage />} />
              <Route path="/support/authorizations" element={<AuthorizationsPage />} />
              <Route path="/appeals" element={<AppealsPage />} />
              <Route path="/support/appeals" element={<AppealsPage />} />

              {/* C级新闻与公告 */}
              <Route path="/news" element={<NewsPage />} />
              <Route path="/news/:id" element={<NewsPage />} />
              <Route path="/about/news" element={<NewsPage />} />
              <Route path="/sitemap" element={<SitemapPage />} />

              {/* C级规范二级内容页 (拒绝空白页或404) */}
              <Route path="/about" element={<GenericSecondaryPage pageKeyOverride="about" />} />
              <Route path="/philosophy" element={<GenericSecondaryPage pageKeyOverride="philosophy" />} />
              <Route path="/about/philosophy" element={<GenericSecondaryPage pageKeyOverride="philosophy" />} />
              <Route path="/governance" element={<GenericSecondaryPage pageKeyOverride="governance" />} />
              <Route path="/about/governance" element={<GenericSecondaryPage pageKeyOverride="governance" />} />
              <Route path="/disclosures" element={<GenericSecondaryPage pageKeyOverride="disclosures" />} />
              <Route path="/about/disclosures" element={<GenericSecondaryPage pageKeyOverride="disclosures" />} />
              <Route path="/careers" element={<GenericSecondaryPage pageKeyOverride="careers" />} />
              <Route path="/about/careers" element={<GenericSecondaryPage pageKeyOverride="careers" />} />
              <Route path="/branches" element={<GenericSecondaryPage pageKeyOverride="branches" />} />
              <Route path="/support/branches" element={<GenericSecondaryPage pageKeyOverride="branches" />} />
              <Route path="/agents" element={<GenericSecondaryPage pageKeyOverride="agents" />} />
              <Route path="/major-life-events" element={<GenericSecondaryPage pageKeyOverride="major-life-events" />} />
              <Route path="/support/major-events" element={<GenericSecondaryPage pageKeyOverride="major-life-events" />} />
              <Route path="/claims-mechanism" element={<GenericSecondaryPage pageKeyOverride="claims-mechanism" />} />
              <Route path="/regulatory" element={<GenericSecondaryPage pageKeyOverride="regulatory" />} />
              <Route path="/legal/compliance" element={<GenericSecondaryPage pageKeyOverride="regulatory" />} />
              <Route path="/privacy" element={<GenericSecondaryPage pageKeyOverride="privacy" />} />
              <Route path="/legal/privacy" element={<GenericSecondaryPage pageKeyOverride="privacy" />} />
              <Route path="/terms" element={<GenericSecondaryPage pageKeyOverride="terms" />} />
              <Route path="/legal/terms" element={<GenericSecondaryPage pageKeyOverride="terms" />} />
              <Route path="/contact" element={<GenericSecondaryPage pageKeyOverride="contact" />} />

              {/* 开发者调试与状态演练入口 (普通访客导航中不露出) */}
              <Route path="/debug" element={<DebugWorkbenchPage />} />
              <Route path="/dev" element={<DebugWorkbenchPage />} />

              {/* 兜底路由：使用标准二级页承接，严禁出现空白页或Coming Soon */}
              <Route path="*" element={<GenericSecondaryPage />} />
            </Routes>
          </PageShell>

          {/* 站点全局页脚与 Sitemap */}
          <Footer />

          {/* 全局交互浮层 */}
          <TerminalConnectModal />
          <SearchModal />
          <NotificationDrawer />
          <AiConsultationModal />
          <HumanAdvisorModal />

          {/* 演练与展示状态切换器（位于右下角，直观体验5种状态） */}
          <TerminalStateSwitcher />
        </div>
      </BrowserRouter>
    </AppProvider>
  );
}
