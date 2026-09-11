/**
 * 【普通维护区】站点全局导航、品牌与页脚 Sitemap
 * 
 * 维护说明：
 * 1. 引号中的中文名称、说明文字可以直接修改。
 * 2. 严禁调整 STRUCTURE_LOCKED 的一级导航核心顺序与路径。
 */

import { NavItem, SitemapColumn } from '../types';

export const SITE_BRAND = {
  name: '长垣人寿',
  fullName: '长垣人寿保险股份有限公司',
  regCode: 'COM-0010',
  slogan: '重要时刻有人在，多一份保障多一种从容',
  subSlogan: '扎根长垣四十年，专注人身、医疗与家庭生活风险保障',
  location: '长垣市新枢区金融港B座',
  foundedYear: '2007',
  currentYear: '2047',
  serviceHotline: '0373-8822047',
  onlineServiceHours: '智能协同 7×24小时 ｜ 人工专员 08:30 - 20:30'
};

// 未连接终端顶部导航（顺序严格锁定）
export const UNCONNECTED_NAV: NavItem[] = [
  { label: '保障方案', path: '/plans', description: '浏览六大类人身与家庭保障产品' },
  { label: '理赔服务', path: '/claims', description: '了解透明理赔与可信节点自动结算' },
  { label: '客户服务', path: '/support', description: '常见问题解答与人工服务支持' },
  { label: '关于我们', path: '/about', description: '公司沿革、治理机制与公开信息披露' },
];

// 已连接终端顶部导航（顺序严格锁定，“我的保障”加入一级导航，“我的保单”从首页/保障/个人空间快捷进入）
export const CONNECTED_NAV: NavItem[] = [
  { label: '我的保障', path: '/coverage', description: '三层保障结构与全盘风险透视' },
  { label: '保障方案', path: '/plans', description: '为你推荐与场景化定制' },
  { label: '理赔服务', path: '/claims', description: '案件进度与三层结算详情' },
  { label: '客户服务', path: '/support', description: '智能咨询、专属顾问与人工服务' },
  { label: '关于我们', path: '/about', description: '公司信息与新闻披露' },
];

// 页脚多列 Sitemap（结构锁定，文案可修改，所有入口必须能点击并打开实体页面）
export const SITEMAP_COLUMNS: SitemapColumn[] = [
  {
    title: '保障方案',
    links: [
      { label: '个人生命与收入保障', path: '/plans?category=life_income' },
      { label: '健康医疗保障', path: '/plans?category=health_medical' },
      { label: '家庭共享保障', path: '/plans?category=family' },
      { label: '养老与长期照护', path: '/plans?category=elderly_care' },
      { label: '企业员工保障', path: '/plans?category=employee' },
      { label: '创新试点保障', path: '/plans?category=pilot_innovation' },
      { label: '按生活场景浏览', path: '/plans?tab=scenario' }
    ]
  },
  {
    title: '理赔服务',
    links: [
      { label: '理赔机制说明', path: '/claims/how-it-works' },
      { label: '我的理赔记录', path: '/claims', requiresConnection: true },
      { label: '进行中案件', path: '/claims?filter=in_progress', requiresConnection: true },
      { label: '已完成赔付', path: '/claims?filter=completed', requiresConnection: true },
      { label: '需要我补充授权', path: '/claims?filter=need_info', requiresConnection: true },
      { label: '公共保障与商业保险如何结算', path: '/claims/settlement' },
      { label: '申请争议复核', path: '/claims?filter=dispute_review', requiresConnection: true },
      { label: '正式申诉入口', path: '/appeals' }
    ]
  },
  {
    title: '客户服务',
    links: [
      { label: 'AI 场景咨询', path: '/support#ai-assistant' },
      { label: '联系人工专员', path: '/support#human-service' },
      { label: '重大人生事件服务', path: '/major-life-events' },
      { label: '服务网点分布', path: '/branches' },
      { label: '常见问题解答', path: '/support#faq' },
      { label: '数据与授权管理', path: '/support/authorizations' },
      { label: '投诉与申诉', path: '/appeals' },
      { label: '代理授权说明', path: '/agents' }
    ]
  },
  {
    title: '关于我们',
    links: [
      { label: '公司介绍与沿革', path: '/about' },
      { label: '经营与服务理念', path: '/philosophy' },
      { label: '治理机制与合规', path: '/governance' },
      { label: '新闻与最新公告', path: '/news' },
      { label: '年度公开披露', path: '/disclosures' },
      { label: '人才招聘与合作', path: '/careers' }
    ]
  }
];

// 底部合规与法律基础链接
export const LEGAL_LINKS: NavItem[] = [
  { label: '隐私政策', path: '/privacy' },
  { label: '使用条款', path: '/terms' },
  { label: '网站地图', path: '/sitemap' },
  { label: '行业合规说明', path: '/regulatory' },
  { label: '返回“仙都·长垣”主站', path: 'https://xiandu.changyuan.gov', isExternal: true }
];
