/**
 * 全局状态上下文：终端连接状态、弹窗控制与演示状态切换
 * 遵循《长垣人寿官网_施工规范_v2.1》第六节与第十二节
 */

import React, { createContext, useContext, useState, useEffect } from 'react';
import { TerminalState, NotificationItem, AuthorizationItem } from '../types';
import { MOCK_USER, MOCK_NOTIFICATIONS, MOCK_AUTHORIZATIONS, MockUserProfile } from '../data';

interface AppContextType {
  terminalState: TerminalState;
  setTerminalState: (state: TerminalState) => void;
  user: MockUserProfile | null;
  notifications: NotificationItem[];
  markNotificationAsRead: (id: string) => void;
  
  // 终端与可信节点数据授权
  authorizations: AuthorizationItem[];
  revokeAuthorization: (id: string) => void;

  // 交互弹窗控制
  isConnectModalOpen: boolean;
  openConnectModal: (targetRedirect?: string) => void;
  closeConnectModal: () => void;
  connectTargetRedirect: string | null;

  isSearchOpen: boolean;
  openSearch: () => void;
  closeSearch: () => void;

  isNotifOpen: boolean;
  openNotif: () => void;
  closeNotif: () => void;

  isAiModalOpen: boolean;
  openAiModal: (initialPrompt?: string) => void;
  closeAiModal: () => void;
  aiInitialPrompt: string;

  isHumanAdvisorModalOpen: boolean;
  openHumanAdvisorModal: (context?: string) => void;
  closeHumanAdvisorModal: () => void;
  humanAdvisorContext: string;

  // 快捷断开连接
  disconnectTerminal: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // 初始状态默认为未连接（规范要求首次进入为未连接首页）
  const [terminalState, setTerminalState] = useState<TerminalState>('UNCONNECTED');
  const [notifications, setNotifications] = useState<NotificationItem[]>(MOCK_NOTIFICATIONS);
  const [authorizations, setAuthorizations] = useState<AuthorizationItem[]>(MOCK_AUTHORIZATIONS);

  // 弹窗状态
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);
  const [connectTargetRedirect, setConnectTargetRedirect] = useState<string | null>(null);

  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isNotifOpen, setIsNotifOpen] = useState(false);
  const [isAiModalOpen, setIsAiModalOpen] = useState(false);
  const [aiInitialPrompt, setAiInitialPrompt] = useState('');
  const [isHumanAdvisorModalOpen, setIsHumanAdvisorModalOpen] = useState(false);
  const [humanAdvisorContext, setHumanAdvisorContext] = useState('');

  const user = terminalState === 'UNCONNECTED' ? null : MOCK_USER;

  const revokeAuthorization = (id: string) => {
    setAuthorizations(prev =>
      prev.map(a => (a.id === id ? { ...a, status: 'revoked' as const } : a))
    );
  };

  const openConnectModal = (targetRedirect?: string) => {
    setConnectTargetRedirect(targetRedirect || null);
    setIsConnectModalOpen(true);
  };

  const closeConnectModal = () => {
    setIsConnectModalOpen(false);
    setConnectTargetRedirect(null);
  };

  const openSearch = () => setIsSearchOpen(true);
  const closeSearch = () => setIsSearchOpen(false);

  const openNotif = () => setIsNotifOpen(true);
  const closeNotif = () => setIsNotifOpen(false);

  const openAiModal = (prompt = '') => {
    setAiInitialPrompt(prompt);
    setIsAiModalOpen(true);
  };
  const closeAiModal = () => setIsAiModalOpen(false);

  const openHumanAdvisorModal = (ctx = '') => {
    setHumanAdvisorContext(ctx);
    setIsHumanAdvisorModalOpen(true);
  };
  const closeHumanAdvisorModal = () => setIsHumanAdvisorModalOpen(false);

  const disconnectTerminal = () => {
    setTerminalState('UNCONNECTED');
  };

  const markNotificationAsRead = (id: string) => {
    setNotifications(prev => prev.map(n => n.id === id ? { ...n, isRead: true } : n));
  };

  return (
    <AppContext.Provider
      value={{
        terminalState,
        setTerminalState,
        user,
        notifications,
        markNotificationAsRead,
        authorizations,
        revokeAuthorization,
        isConnectModalOpen,
        openConnectModal,
        closeConnectModal,
        connectTargetRedirect,
        isSearchOpen,
        openSearch,
        closeSearch,
        isNotifOpen,
        openNotif,
        closeNotif,
        isAiModalOpen,
        openAiModal,
        closeAiModal,
        aiInitialPrompt,
        isHumanAdvisorModalOpen,
        openHumanAdvisorModal,
        closeHumanAdvisorModal,
        humanAdvisorContext,
        disconnectTerminal,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
