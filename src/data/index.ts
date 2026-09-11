/**
 * 【演示业务数据层】模拟真实长垣居民的保单、理赔、通知与三层保障数据
 * 遵循《长垣人寿官网_施工规范_v2.1》第十二节
 */

import { CoverageSummary, PolicyItem, ClaimItem, NotificationItem, TerminalState, AuthorizationItem } from '../types';

// 终端数据互联授权数据
export const MOCK_AUTHORIZATIONS: AuthorizationItem[] = [
  {
    id: 'auth-01',
    targetSystem: '长垣市公立医疗机构电子就医凭据节点',
    purpose: '就诊住院免发票秒级直赔与自费金额核算',
    scope: '诊断编码、处方医嘱摘要、结算单据（不含私人面部与语音）',
    status: 'active',
    grantedAt: '2046-03-15',
    expiresAt: '2048-03-15'
  },
  {
    id: 'auth-02',
    targetSystem: '长垣市社会保障二层公积与家庭共享池',
    purpose: '公共医保自动扣减与家庭调剂对账',
    scope: '家庭成员授权凭据、个人年度动态额度结余',
    status: 'active',
    grantedAt: '2046-03-15',
    expiresAt: '2048-03-15'
  },
  {
    id: 'auth-03',
    targetSystem: '长垣高新产业园区职业健康与因公通勤节点',
    purpose: '雇主法定商业统保理赔及通勤意外急救快速互认',
    scope: '在职状态、通勤电子打卡时间戳、工伤认定书',
    status: 'active',
    grantedAt: '2047-01-10',
    expiresAt: '2048-01-09'
  }
];

// 演示用户档案
export interface MockUserProfile {
  name: string;
  residentId: string;
  terminalCode: string;
  familyCount: number;
  employer: string;
  creditScoreLevel: string;
  avatar: string;
}

export const MOCK_USER: MockUserProfile = {
  name: '陈墨涵',
  residentId: '410728-20150912-****',
  terminalCode: 'CY-NODE-9047X',
  familyCount: 3,
  employer: '长垣未来智能制造研究院',
  creditScoreLevel: '守信履约A+级市民',
  avatar: 'https://api.dicebear.com/7.x/notionists/svg?seed=ChenMohan&backgroundColor=d1e4fd'
};

// 三层保障概览数据
export const MOCK_COVERAGE_SUMMARY: CoverageSummary = {
  updatedAt: '2047-08-20 09:30:15',
  statusText: '核心人身与医疗保障完整，无高危脱保风险',
  statusType: 'normal',
  cityBaseCoverage: {
    title: '第一层：城市不可耗尽法定兜底',
    status: '全时有效',
    description: '长垣市公费紧急抢救、突发公共卫生事件与基本生存保障，依法永久享受。',
    coverageItems: ['突发抢救医疗费 100% 托底', '不可抗力公卫风险零免赔', '长垣永久居留权权益']
  },
  publicDynamicQuota: {
    personalBalance: 86400,
    personalTotal: 120000,
    unit: '长垣信用分额度 (CY-CR)',
    familySharedBalance: 240000,
    familySharedTotal: 300000,
    familyMemberCount: 3,
    status: '正常累积中',
    validUntil: '2047-12-31'
  },
  employerCoverage: {
    employerName: '长垣未来智能制造研究院',
    planName: '长垣高新产业雇员法定商业统保方案',
    workInjuryAmount: 1000000,
    emergencyAidAmount: 200000,
    status: '雇主足额缴存',
    verifiedAt: '2047-08-01 可信节点已验签'
  },
  changyuanCommercialCoverage: {
    activePolicyCount: 2,
    totalProtectionPool: '重疾收入保障 600,000 + 医疗自费补偿 3,000,000 + 家庭共享 2,000,000',
    categories: [
      {
        category: '人身重疾收入替代',
        coveredAmount: '600,000 (定额给付)',
        provider: '长垣人寿',
        status: 'active',
        expiry: '保障至70周岁 (2087年)'
      },
      {
        category: '大病自费医疗补充',
        coveredAmount: '3,000,000 (自费95%报销)',
        provider: '长垣人寿',
        status: 'active',
        expiry: '2048-03-15 锁费率续保'
      },
      {
        category: '家庭多代意外共享池',
        coveredAmount: '2,000,000 (全家互助)',
        provider: '长垣人寿',
        status: 'active',
        expiry: '2048-06-30'
      }
    ]
  }
};

// 保单列表
export const MOCK_POLICIES: PolicyItem[] = [
  {
    id: 'POL-2047-001',
    policyNo: 'CYL-2047-A09182',
    planName: '长青人身重大疾病与收入替代保障',
    officialContractName: '长垣人寿定期人身重大疾病收入保障保险（2047版-A款）',
    category: '个人生命与收入保障',
    status: 'valid',
    statusLabel: '保障中 (已锁价)',
    insuredPerson: '陈墨涵 (本人)',
    relationship: '本人投保 / 被保险人',
    beneficiary: '法定直系亲属',
    coveragePeriod: '2044-03-15 至 2084-03-14 (至70周岁)',
    lockedPremium: '128.00 CY-CR / 月',
    paymentMode: '个人终端按月自动结算',
    nextPaymentDate: '2047-09-15',
    priceRationale: '于2044年投保时按标准健康体锁定月缴费率。合同期内无论个人后续就医记录如何，费率永久不上浮。',
    dataAuthorizations: ['长垣市定点医院电子病历摘要', '长垣人身重疾节点核验'],
    advisorName: '林秋',
    advisorContact: '0373-8822047-802'
  },
  {
    id: 'POL-2047-002',
    policyNo: 'CYL-2047-M44102',
    planName: '安居百万自费健康医疗补充',
    officialContractName: '长垣人寿团体及个人补充医疗费用补偿保险（综合型）',
    category: '健康医疗保障',
    status: 'valid',
    statusLabel: '保障中 (保证续保期内)',
    insuredPerson: '陈墨涵 (本人)',
    relationship: '本人',
    beneficiary: '本人 (医疗费用受偿人)',
    coveragePeriod: '2046-09-01 至 2047-08-31 (即将进入下一年度保证续保期)',
    lockedPremium: '45.00 CY-CR / 月',
    paymentMode: '个人终端按年自动核算',
    nextPaymentDate: '2047-09-01',
    priceRationale: '实行5年保证续保锁费周期。同一年龄段全城费率统一透明，无针对个人的惩罚性加费。',
    dataAuthorizations: ['医保第二层动态报销结算单', '长垣新枢区医学中心就诊接口'],
    advisorName: '林秋',
    advisorContact: '0373-8822047-802'
  },
  {
    id: 'POL-2047-003',
    policyNo: 'CYL-2046-F18820',
    planName: '家园多代共享家庭互助保障池',
    officialContractName: '长垣人寿多被保险人家庭共享责任保险（2047版）',
    category: '家庭共享保障',
    status: 'valid',
    statusLabel: '保障中',
    insuredPerson: '陈墨涵、苏晓韵 (配偶)、陈予安 (女儿)',
    relationship: '家庭主投保人',
    beneficiary: '家庭成员互为法定受益人',
    coveragePeriod: '2046-12-01 至 2047-11-30',
    lockedPremium: '168.00 CY-CR / 月 (3人共享套餐)',
    paymentMode: '家庭互助账户代扣',
    nextPaymentDate: '2047-12-01',
    priceRationale: '家庭包干制定价，在成员数不变情况下享受家庭专属互通折扣。',
    dataAuthorizations: ['长垣市民政局家庭关系可信凭证', '少儿及家庭意外互助网格'],
    advisorName: '林秋',
    advisorContact: '0373-8822047-802'
  }
];

// 理赔案件列表
export const MOCK_CLAIMS: ClaimItem[] = [
  {
    id: 'CLM-2047-001',
    caseNo: 'CL-2047-0914',
    title: '长垣市医学中心微创内窥镜自费耗材补充赔付',
    eventDate: '2047-07-28',
    status: 'completed',
    statusLabel: '已结案 (自动冲抵结算)',
    category: '医疗自费报销',
    relatedPolicyNo: 'CYL-2047-M44102',
    nodeVerification: '长垣新枢区医学中心可信节点签名校验通过',
    settlement: {
      totalLoss: 14200,
      publicLayerPaid: 9600,     // 第二层公共医保报销
      changyuanPaid: 4140,       // 长垣人寿补充报销 (90% 自费合规部分)
      personalCopay: 460,        // 个人极小自付
      advancePaid: 0
    },
    timeline: [
      { time: '2047-07-28 10:14', title: '医院就医出院结账', desc: '新枢区医学中心发起可信结算凭据', operator: 'system_trusted_node' },
      { time: '2047-07-28 10:14', title: '单次授权同意', desc: '陈墨涵终端确认医疗诊断与费用明细授权', operator: 'user' },
      { time: '2047-07-28 10:15', title: '长垣人寿自动核销', desc: '核算商业补充应付 4,140 CY-CR，冲抵自费账单', operator: 'changyuan_auto' },
      { time: '2047-07-28 10:15', title: '案件归档结案', desc: '全程耗时42秒，无需提交任何纸质单据', operator: 'changyuan_auto' }
    ],
    currentActor: '系统已完成对账归档',
    dataAccessLogs: [
      { node: '长垣医学中心电子结算网格', scope: '出院费用分类总单', accessedAt: '2047-07-28 10:14:32', purpose: '核算自费药品及耗材补偿' }
    ],
    humanOfficer: {
      name: '林秋',
      id: 'OFFICER-LQ-01',
      role: '服务专员 (案件存根归档)'
    }
  },
  {
    id: 'CLM-2047-002',
    caseNo: 'CL-2047-0892',
    title: '宏力大道公共绿道运动软组织挫伤复核',
    eventDate: '2047-08-10',
    status: 'dispute_review',
    statusLabel: '人工复核中 (暂停自动扣结)',
    category: '意外伤害争议复核',
    relatedPolicyNo: 'CYL-2046-F18820',
    nodeVerification: '社区急救服务站已上传初步影像记录',
    settlement: {
      totalLoss: 3800,
      publicLayerPaid: 1200,
      changyuanPaid: 0,
      personalCopay: 2600,
      advancePaid: 1000
    },
    timeline: [
      { time: '2047-08-10 16:20', title: '社区急救站初步处置', desc: '急救站上传外伤处置账单', operator: 'system_trusted_node' },
      { time: '2047-08-10 17:00', title: '系统触发规则暂停', desc: '账单含外购康复护具，需补充处方关联性证明', operator: 'changyuan_auto' },
      { time: '2047-08-11 09:30', title: '转交独立复核专员', desc: '理赔主管接手，已向就诊医生申请补充处方说明', operator: 'human_officer' }
    ],
    currentActor: '长垣人寿资深核查专员 · 张文生正在处理',
    dataAccessLogs: [
      { node: '长垣社区急救可信节点', scope: '创伤诊断代码与治疗记录', accessedAt: '2047-08-10 16:22:11', purpose: '外伤意外责任认定' }
    ],
    disputeReason: '理赔账单中包含一项 1,600 CY-CR 的外购高分子固定夹板，医院初步上传记录中缺失主治医师的明确医嘱指征，系统触发了常规风控暂停。',
    nextActionAdvice: '复核专员张文生已主动联系急救站调取主治医师手写病程备注。若属必要医疗辅助器具，将全额追溯补偿，预计2个工作日内同屏向您反馈。',
    humanOfficer: {
      name: '张文生',
      id: 'OFFICER-ZWS-04',
      role: '独立理赔复核员'
    }
  },
  {
    id: 'CLM-2047-003',
    caseNo: 'CL-2047-0999',
    title: '【重大事件专项】突发重症绿色通道垫付中',
    eventDate: '2047-08-19',
    status: 'in_progress',
    statusLabel: '重大事件 · 专员全力协助中',
    category: '重大疾病专项垫付',
    relatedPolicyNo: 'CYL-2047-A09182',
    nodeVerification: '长垣市紧急医疗指挥中心重症代码激活',
    settlement: {
      totalLoss: 85000,
      publicLayerPaid: 45000,
      changyuanPaid: 35000,
      personalCopay: 5000,
      advancePaid: 30000
    },
    timeline: [
      { time: '2047-08-19 06:12', title: '重症预警节点通知', desc: '医院急诊绿色通道发起重症救治编码', operator: 'system_trusted_node' },
      { time: '2047-08-19 06:15', title: '先行垫付 30,000 激活', desc: '长垣人寿无争议救命款先行划入医院专用押金账户', operator: 'changyuan_auto' },
      { time: '2047-08-19 07:00', title: '高级顾问林秋接入', desc: '专员林秋已抵院协助家属办理手续与重疾保额申领', operator: 'human_officer' }
    ],
    currentActor: '高级顾问林秋全权负责',
    dataAccessLogs: [
      { node: '长垣市急危重症协同指挥中心', scope: '生命体征与重疾确诊凭证', accessedAt: '2047-08-19 06:13:00', purpose: '重疾保额垫付与定额给付核定' }
    ],
    humanOfficer: {
      name: '林秋',
      id: 'OFFICER-LQ-01',
      role: '高级客户顾问 / 重大事件专案组长'
    }
  }
];

// 通知列表
export const MOCK_NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-01',
    type: 'todo',
    title: '保单即将续保费率确认',
    summary: '您的“安居百万自费健康医疗补充”即将于9月1日进入下一年度保证续保，费率保持45 CY-CR/月不变，请确认扣款账户。',
    date: '2047-08-18',
    link: '/policies',
    isRead: false,
    priority: 'high'
  },
  {
    id: 'notif-02',
    type: 'notice',
    title: '公共医疗动态额度年度结余提醒',
    summary: '第二层个人公共动态额度本年度已使用 33,600 CY-CR，结余 86,400 CY-CR，家庭共享池额度充裕。',
    date: '2047-08-15',
    link: '/coverage',
    isRead: false,
    priority: 'normal'
  },
  {
    id: 'notif-03',
    type: 'alert',
    title: '理赔案件 CL-2047-0892 人工复核中',
    summary: '宏力大道外伤理赔已指派专员张文生进行材料调取复核，预计48小时内反馈处理结果。',
    date: '2047-08-11',
    link: '/claims',
    isRead: true,
    priority: 'urgent'
  }
];

// AI 场景咨询模拟应答引擎 (根据自然语言关键词给出精准、严谨、贴合世界观的分析)
export function getMockAiAdvice(query: string) {
  const q = query.toLowerCase();
  
  if (q.includes('出差') || q.includes('旅行') || q.includes('外地') || q.includes('跨省') || q.includes('异地')) {
    return {
      scenario: '异地出行与出差保障',
      analysis: '根据您当前已连接的保障数据，长垣市第二层公共动态医保在跨市就医时报销比例会有10-15%的跨区域折算；您单位的雇主责任险覆盖了法定工伤，但对于因私延误和非工作时间的人身意外缺乏定额补偿。',
      existingCoverage: '已覆盖：雇主工作时间工伤医疗 (最高80万)；城市底线紧急公费抢救。',
      missingRisk: '潜在缺口：异地突发自费非因工医疗差额、新型低空或长途交通意外紧急救援。',
      recommendedPlanName: '安居百万自费健康医疗补充 / 新航低空短期意外附加险',
      recommendedPlanSlug: 'anju-medical-supplement',
      adviceNote: '建议：您当前的医疗险已支持全国联网三甲直赔；若需搭乘城际低空航线，可仅花3.5信用额加购一次性“新航低空通勤保障”，无需重复购买大额长期合同。'
    };
  }

  if (q.includes('宝宝') || q.includes('孩子') || q.includes('少儿') || q.includes('结婚') || q.includes('家庭') || q.includes('全家')) {
    return {
      scenario: '家庭成员变动与多代共享规划',
      analysis: '家庭增添新成员后，第一步应前往长垣民政或社保网格完成直系亲属登记。长垣市允许直系家庭成员共享第二层公共医疗动态账户。',
      existingCoverage: '已覆盖：陈墨涵个人重疾保单 60万；城市公共动态账户结余 8.6万。',
      missingRisk: '潜在缺口：新生儿少儿意外烫伤跌倒、婴幼儿自费特需就诊开支。',
      recommendedPlanName: '家园多代共享家庭互助保障池',
      recommendedPlanSlug: 'jiayuan-family-shared-pool',
      adviceNote: '长垣人寿“家园多代共享池”支持一单覆盖全家最多6位成员，全家共享200万额度，避免给老人和孩子分别购买冗杂保单，保费享家庭互助折扣。'
    };
  }

  if (q.includes('父母') || q.includes('老人') || q.includes('养老') || q.includes('照护') || q.includes('长辈') || q.includes('退休')) {
    return {
      scenario: '银发康养与长期照料筹划',
      analysis: '长垣市已进入深度健康长寿社会，长辈突发的摔倒骨折与认知机能减退（如阿尔茨海默）对家庭照护精力消耗极大。公共底线保障解决基本救治，但专业护工和定点康养床位需前置储备。',
      existingCoverage: '已覆盖：第二层公共医疗动态报销；长垣市社区基本老年体检。',
      missingRisk: '潜在缺口：半失能每月 4,000-7,000 CY-CR 的专业长期护工支出、优质康养机构优先入住权。',
      recommendedPlanName: '颐康长垣长期照护与养老年金',
      recommendedPlanSlug: 'yikang-elderly-care-pension',
      adviceNote: '长垣人寿与长垣市新枢区、蒲北区多家公建民营康养社区深度合作，不仅按月给付护理津贴，更锁定了专属护理床位名额，由专职医养管家定期上门。'
    };
  }

  // 默认通用智能分析
  return {
    scenario: '综合人身与家庭风险评估',
    analysis: `针对你提出的：“${query}”，我们已调取长垣人寿核保规则库进行了交叉比对。长垣人寿坚持“省事、看得懂、可解释”，在为您做任何推荐前，必须先确认您已享有的底线与公共保障。`,
    existingCoverage: '您当前已享有城市法定最低救治保障及雇主法定商业保障，重大医疗风险已有扎实底线。',
    missingRisk: '根据长垣2047年生活成本测算，人身重大疾病导致的长期收入中断（按揭与家庭赡养）通常是最容易被忽视的隐性财务风险。',
    recommendedPlanName: '长青人身重大疾病与收入替代保障',
    recommendedPlanSlug: 'changqing-critical-income',
    adviceNote: '本建议仅供方案挑选参考，长垣人寿不替您自动做投保决定，亦绝不会在您当前任务中强制弹窗推销。如需进一步定制，可随时一键连线专属顾问林秋。'
  };
}
