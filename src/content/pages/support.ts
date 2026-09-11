/**
 * 【普通维护区】客户服务 / 服务支持页面配置
 * 
 * 维护说明：
 * 1. 规范 5.7 结构锁定：Hero -> 搜索 -> 类别快捷入口 -> 常见问题 -> AI与人工服务 -> 专属顾问预约 -> 服务渠道 -> 理念。
 * 2. 用户要求真人或涉及争议时，系统必须提供一键升级人工入口，禁止死循环推回 AI。
 */

import { FAQItem } from '../../types';

export const SUPPORT_PAGE_CONTENT = {
  hero: {
    badge: '长垣人寿客户服务支持中心',
    title: '省事、看得懂、有人负责',
    description: '无论你想查询保单细节、理解理赔构成，还是遇到疑难争议需要专人协助，长垣人寿全渠道服务网络随时倾听你的声音。智能协助你快速找答案，真人专员为你解决关键难事。',
    assetId: 'hero-support'
  },
  searchPlaceholder: '搜索你想了解的问题，例如：如何查看家庭共享额度？理赔需要提供哪些授权？...',
  categories: [
    {
      id: 'claims-inquiry',
      title: '理赔咨询与进度',
      desc: '查询理赔状态、了解自费报销比例及费用垫付规则',
      iconName: 'Receipt',
      link: '/claims'
    },
    {
      id: 'policy-service',
      title: '保单与锁价权益',
      desc: '电子保单验签、保单交费方式变更、受益人变更说明',
      iconName: 'FileCheck',
      link: '/policies'
    },
    {
      id: 'product-consulting',
      title: '保障方案咨询',
      desc: '根据家庭结构、出行规划与年龄定制合适人身方案',
      iconName: 'ShieldPlus',
      link: '/plans'
    },
    {
      id: 'authorizations-data',
      title: '数据与授权管理',
      desc: '查看长垣人寿已获得的数据权限范围与单次核验记录',
      iconName: 'KeyRound',
      link: '/support/authorizations'
    },
    {
      id: 'complaints-appeals',
      title: '投诉与争议申诉',
      desc: '对理赔结论、服务态度存疑时，直接联系长垣消费者委员会联络站',
      iconName: 'AlertCircle',
      link: '/support/appeals'
    },
    {
      id: 'branches-appointment',
      title: '网点查询与预约',
      desc: '新枢区总部门诊中心及长垣各主要行政区服务网点',
      iconName: 'MapPin',
      link: '/support/branches'
    }
  ],
  humanServiceSection: {
    title: '重大人生时刻，真人全程负责',
    subtitle: '自动化提高了日常核算的效率，但当生老病死、重大意外来临时，面对面的人性温度不可替代。',
    advisorName: '林秋',
    advisorTitle: '长垣人寿资深客户顾问 / 重大事件专员',
    advisorExp: '扎根长垣本地保险服务14年',
    advisorDesc: '“在长垣人寿，我的职责不是向你推销不需要的合同，而是在你或家人遇到麻烦的那一天，站在你身边，把赔偿款和救急措施一项项扎实落实到位。”',
    assetId: 'advisor-linqiu',
    connectButton: '与专属顾问林秋发起实时连线',
    appointmentButton: '预约面对面专程上门或网点面谈'
  },
  channels: [
    {
      name: '智能协同在线服务',
      time: '7 × 24 小时全天候',
      desc: '依托长垣人寿规则引擎，支持政策解读、术语通俗翻译与已有保障交叉核验。',
      actionText: '打开智能对话'
    },
    {
      name: '市民服务专线',
      time: '08:30 - 20:30 (每日)',
      desc: '拨打 0373-8822047，普通话与长垣本地话双语坐席，免收长途通话费。',
      actionText: '立即拨打'
    },
    {
      name: '新枢区客户体验中心',
      time: '周一至周六 09:00 - 17:30',
      desc: '长垣市新枢区金融港B座一层。提供茶饮、无障碍通道、面对面长者关怀专区。',
      actionText: '查看网点导航'
    }
  ]
};

// 常见问题库（真实细致、具有长垣2047世界观特色的问答）
export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-01',
    category: '理赔相关',
    question: '在长垣定点医院就诊后，为什么我没有提交发票就收到了报销款？',
    answer: '长垣人寿已接入长垣市医疗协同可信网格。在您授权的前提下，医院结算系统会自动将符合医保与商业补充合同的合规费用结论生成验证凭据。系统在10秒内完成审核并将理赔款冲抵您的自费账单，免去您反复打印发票和跑腿的麻烦。'
  },
  {
    id: 'faq-02',
    category: '保单与锁价',
    question: '什么是“合同期内严格锁价”？如果第二年生病了会涨保费吗？',
    answer: '不会。根据《长垣人寿消费者保护公约》，所有已生效的人身长期与定期保单，在所选合同期内费率完全锁定。无论您在保期内健康指标发生变化，还是有过合规理赔记录，长垣人寿均无权单方面针对您个人上浮保费或中途强行解约。'
  },
  {
    id: 'faq-03',
    category: '数据与隐私',
    question: '长垣人寿会访问我的个人通讯记录或日常生活轨迹吗？',
    answer: '绝对不会。长垣人寿严格遵守数据最小必要原则，绝不触碰公民私人通讯、个人日常位置等隐私禁区。我们在投保与理赔中仅请求与风险评估直接相关的可信节点结论（如就诊诊断代码、工伤认定书），且每次请求都会在您的个人终端留下可追溯的授权存根。'
  },
  {
    id: 'faq-04',
    category: '保障体系',
    question: '我单位已经给我缴了社会保障，还需要买商业保险吗？',
    answer: '长垣实行“三层保障制”：第一层保证基本底线抢救，第二层公共动态额度解决常规就医，但自费特种药、高端微创诊疗及长期的收入中断损失需要第三层商业保险（如长垣人寿）作为补充。我们建议您先在“我的保障”页面查看已有覆盖，避免盲目重复购买。'
  },
  {
    id: 'faq-05',
    category: '争议处理',
    question: '如果我对理赔金额或审核暂停结论不服，应该如何申请复核？',
    answer: '您可以在“理赔服务”中找到该案件，点击“申请争议复核”。系统将立即指派独立理赔复核员接入，并在48小时内提供书面复核意见。若仍无法达成一致，您可一键申请长垣金融消费者保护委员会进行第三方中立裁决。'
  }
];
