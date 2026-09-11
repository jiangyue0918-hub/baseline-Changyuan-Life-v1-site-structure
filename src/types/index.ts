/**
 * 长垣人寿 (COM-0010) 全站类型定义
 * 遵循《长垣人寿官网_施工规范_v2.1》
 */

// 事实来源标记
export type FactOrigin = 'CANON' | 'WEB_DERIVED' | 'TBD';

// 编辑自由度标记
export type EditPolicy = 'STRUCTURE_LOCKED' | 'COPY_FLEXIBLE' | 'PLACEHOLDER';

// 终端连接与演示用户状态
export type TerminalState = 
  | 'UNCONNECTED'             // 未连接终端
  | 'CONNECTED_NORMAL'        // 已连接 - 正常状态
  | 'CONNECTED_PENDING'       // 已连接 - 有待处理事项（如需补充授权、保单待续期）
  | 'CONNECTED_DISPUTE'       // 已连接 - 存在争议/复核案件
  | 'CONNECTED_MAJOR_EVENT';  // 已连接 - 发生重大人生事件（优先置顶真人专员）

// 图片素材元数据
export interface AssetMetadata {
  id: string;
  src: string;
  usage: string;
  recommendedSize: string;
  prompt: string;
  alt: string;
  status: 'placeholder' | 'ready';
  origin: FactOrigin;
}

// 导航链接
export interface NavItem {
  label: string;
  path: string;
  isExternal?: boolean;
  requiresConnection?: boolean;
  badge?: string;
  description?: string;
}

// Sitemap 列
export interface SitemapColumn {
  title: string;
  links: NavItem[];
}

// 三层保障概览数据结构 (社会保障三层制)
export interface CoverageSummary {
  updatedAt: string;
  statusText: string;
  statusType: 'normal' | 'attention' | 'alert';
  // 第一层：不可耗尽的城市最低保障
  cityBaseCoverage: {
    title: string;
    status: string;
    description: string;
    coverageItems: string[];
  };
  // 第二层：公共个人与家庭动态保障额度
  publicDynamicQuota: {
    personalBalance: number;
    personalTotal: number;
    unit: string;
    familySharedBalance: number;
    familySharedTotal: number;
    familyMemberCount: number;
    status: string;
    validUntil: string;
  };
  // 第三层：雇主法定配置商业最低保障
  employerCoverage: {
    employerName: string;
    planName: string;
    workInjuryAmount: number;
    emergencyAidAmount: number;
    status: string;
    verifiedAt: string;
  };
  // 第三层：长垣人寿商业补充保障
  changyuanCommercialCoverage: {
    activePolicyCount: number;
    totalProtectionPool: string; // 不相加为单一总额，而显示为各类保障构成的摘要描述
    categories: {
      category: string;
      coveredAmount: string;
      provider: string;
      status: 'active' | 'pending' | 'review';
      expiry: string;
    }[];
  };
}

// 保障方案 (产品)
export interface PlanItem {
  id: string;
  slug: string;
  name: string;             // 通俗营销名 (WEB_DERIVED)
  officialContractName: string; // 正式备案合同名 (CANON/WEB_DERIVED)
  category: 'life_income' | 'health_medical' | 'family' | 'elderly_care' | 'employee' | 'pilot_innovation';
  categoryLabel: string;
  solveWhat: string;        // 解决什么实际生活问题
  covers: string[];         // 保什么
  notCovers: string[];      // 不保什么
  coverageAmount: string;   // 能承担多少
  duration: string;         // 持续多久
  lockPriceRule: string;    // 合同期内锁价规则
  pricing: string;          // 示例保费
  targetAudience: string;
  scenarioTags: string[];
  features: string[];
  hasExistingOverlap?: string; // 解释已有覆盖与重叠
  isPilot?: boolean;
  origin: FactOrigin;
}

// 保单项目
export interface PolicyItem {
  id: string;
  policyNo: string;
  planName: string;
  officialContractName: string;
  category: string;
  status: 'valid' | 'pending_effective' | 'renewing' | 'terminated';
  statusLabel: string;
  insuredPerson: string;
  relationship: string;
  beneficiary: string;
  coveragePeriod: string;
  lockedPremium: string;
  paymentMode: string;
  nextPaymentDate?: string;
  priceRationale: string;    // 锁价与影响因素解释
  dataAuthorizations: string[]; // 本单关联的数据授权节点
  advisorName: string;       // 负责专员
  advisorContact: string;
}

// 理赔案件
export interface ClaimItem {
  id: string;
  caseNo: string;
  title: string;
  eventDate: string;
  status: 'in_progress' | 'completed' | 'need_info' | 'dispute_review';
  statusLabel: string;
  category: string;
  relatedPolicyNo: string;
  nodeVerification: string;  // 可信节点验证状态
  // 结算构成
  settlement: {
    totalLoss: number;
    publicLayerPaid: number;      // 公共动态保障支付
    changyuanPaid: number;        // 长垣人寿商业理赔支付
    personalCopay: number;        // 个人承担
    advancePaid?: number;         // 垫付金额
  };
  timeline: {
    time: string;
    title: string;
    desc: string;
    operator: 'system_trusted_node' | 'changyuan_auto' | 'human_officer' | 'user';
  }[];
  currentActor: string;         // 当前处理人/节点
  dataAccessLogs: {
    node: string;
    scope: string;
    accessedAt: string;
    purpose: string;
  }[];
  disputeReason?: string;       // 争议/暂停原因说明 (同屏说明原因与证据)
  nextActionAdvice?: string;
  humanOfficer?: {
    name: string;
    id: string;
    role: string;
  };
}

// 通知待办
export interface NotificationItem {
  id: string;
  type: 'todo' | 'notice' | 'alert';
  title: string;
  summary: string;
  date: string;
  link?: string;
  isRead: boolean;
  priority: 'normal' | 'high' | 'urgent';
}

// FAQ 项目
export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category: string;
}

// 新闻与公告
export interface NewsItem {
  id: string;
  title: string;
  category: 'announcement' | 'disclosure' | 'service_update' | 'community';
  categoryLabel: string;
  date: string;
  summary: string;
  content: string[];
  author: string;
}

// 终端与可信节点数据授权项
export interface AuthorizationItem {
  id: string;
  targetSystem: string;
  purpose: string;
  scope: string;
  status: 'active' | 'revoked';
  grantedAt: string;
  expiresAt: string;
}
