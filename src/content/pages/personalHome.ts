/**
 * 【普通维护区】已连接终端个人首页文案配置
 * 
 * 维护说明：
 * 1. 严格遵守规范 5.2 结构锁定：问候与保障状态 -> 快捷任务卡 -> 真实待办 -> 结算/保单/专员。
 * 2. 严禁把不同来源的保障金额相加为一个虚假的“总额”，必须分层显示。
 * 3. 重大事件或争议发生时，页面自动置顶真人专员。
 */

export const PERSONAL_HOME_CONTENT = {
  greeting: {
    morning: '早上好，',
    afternoon: '下午好，',
    evening: '晚上好，',
    welcomeSub: '长垣市居民身份与个人终端已通过长垣可信认证体系安全连接。',
  },
  taskShortcuts: [
    {
      id: 'view-coverage',
      title: '我的全盘保障',
      desc: '查看公共三层架构与个人/家庭风险覆盖率',
      iconName: 'ShieldCheck',
      link: '/coverage'
    },
    {
      id: 'manage-policies',
      title: '管理我的保单',
      desc: '查看有效合同、锁价凭据与缴费续期安排',
      iconName: 'FileCheck',
      link: '/policies'
    },
    {
      id: 'claim-settlement',
      title: '理赔与结算查询',
      desc: '查看最近案件结算进度与三层费用分摊明细',
      iconName: 'Receipt',
      link: '/claims'
    },
    {
      id: 'contact-officer',
      title: '专属人工专员',
      desc: '直接对话资深顾问林秋，解答保单或疑难问题',
      iconName: 'UserCheck',
      link: '/support#human-service'
    }
  ],
  sections: {
    coverageTitle: '当前多层次保障全景',
    coverageNotice: '根据《长垣市社会保障条例》，以下数据由公共数据网格与长垣人寿实时核算，保障权益严格受法律保护。',
    todoTitle: '待处理事项',
    noTodoText: '当前没有需要你处理的事项。所有既有合同与理赔均在正常运转中。',
    recentClaimsTitle: '近期理赔与结算',
    recentPoliciesTitle: '我的主要保障合同',
    advisorTitle: '你的长垣人寿专属负责专员',
    advisorSubtitle: '扎根长垣本地，重大人生变故或理赔争议由专人全程跟进。'
  },
  majorEventBanner: {
    badge: '【重大事件人工响应通道】已激活',
    title: '监测到关联可信节点报案，高级专员已接管',
    description: '系统已暂停常规自动化处理，长垣人寿高级理赔主管已启动真人专项服务。您无需自行提交重复资料，专员正在核实垫付及多层赔付方案。',
    contactButton: '立即连线专员办理',
    detailButton: '查看重大事件专案进度'
  },
  disputeBanner: {
    badge: '【案件复核中】',
    title: '存在1笔理赔争议案件正处于人工复核流程',
    description: '案件 CL-2047-0892 暂停自动扣结，独立核查专员已介入调取就诊补充依据，承诺于2个工作日内同屏反馈复核结论。',
    actionText: '查看复核详情与补充说明'
  }
};
