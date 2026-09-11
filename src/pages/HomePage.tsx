/**
 * 首页总入口：根据终端连接状态动态切换未连接/已连接首页
 * 遵循《长垣人寿官网_施工规范_v2.1》第四节与第五节
 */

import React from 'react';
import { useApp } from '../app/AppContext';
import { PublicHomePage } from './PublicHomePage';
import { PersonalHomePage } from './PersonalHomePage';

export const HomePage: React.FC = () => {
  const { terminalState } = useApp();

  if (terminalState === 'UNCONNECTED') {
    return <PublicHomePage />;
  }

  return <PersonalHomePage />;
};
