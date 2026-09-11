/**
 * 【普通维护区】未连接终端首页内容配置
 * 
 * 维护说明：
 * 1. 引号中文字可直接修改。
 * 2. 严禁在 Hero 区域新增第二个“连接终端”按钮（规范 4.1 硬性约束）。
 * 3. 严禁在此页面展示个人数据或虚构的实时大盘。
 */

export const PUBLIC_HOME_CONTENT = {
  hero: {
    badge: '长垣人寿 2047 · 数字化公众服务',
    title: '重要时刻有人在，\n多一份保障多一种从容。',
    description: '扎根长垣四十年。我们不追求繁复的概念包装，只专注为人身意外、医疗开支、家庭变故与长寿照护提供看得懂、查得到、有人负责的扎实保障。',
    assetId: 'hero-public-home',
    // 规范规定：Hero 只承担品牌表达，不得重复放置连接终端按钮，只保留业务导览按钮
    primaryActionText: '浏览保障方案',
    primaryActionLink: '/plans',
    secondaryActionText: '了解理赔流程',
    secondaryActionLink: '/claims/guide',
  },
  announcement: {
    tag: '最新公告',
    title: '关于2047年度长垣公共医疗动态额度联动结算规则升级的说明',
    date: '2047-08-15',
    link: '/about/news/2047-08-15-public-linkage'
  },
  quickActions: {
    title: '我想了解 / 办理',
    subtitle: '公开透明的保险数字服务，支持快速指引与场景理解',
    items: [
      {
        id: 'explore-plans',
        title: '挑选人身与家庭保障',
        desc: '查看六大类主营保障，支持自然语言按生活场景智能匹配',
        iconName: 'ShieldCheck',
        link: '/plans'
      },
      {
        id: 'understand-claims',
        title: '了解理赔与结算构成',
        desc: '可信节点自动验证，无争议部分先行给付，全流程可溯源',
        iconName: 'FileText',
        link: '/claims/guide'
      },
      {
        id: 'customer-support',
        title: '咨询服务与专属顾问',
        desc: '智能协同解答疑问，重大人生事件与理赔争议可直接预约人工',
        iconName: 'Headphones',
        link: '/support'
      },
      {
        id: 'corporate-plans',
        title: '企业员工法定与自选保障',
        desc: '支持雇主依法配置最低商业保障，员工可自选升级补充方案',
        iconName: 'Building2',
        link: '/plans?category=employee'
      }
    ]
  },
  brandPillars: {
    title: '为什么长垣居民信赖长垣人寿？',
    subtitle: '不是追求最前沿的技术术语，而是把每件关键事情办得省事、明白、有人管',
    pillars: [
      {
        iconName: 'LockKeyhole',
        title: '合同期内严格锁价',
        desc: '在投保节点完成风险定价后，合同期内价格锁定。续保仅按法定与合同约定的风险结论重新评估，绝不在合同期内任意加价。'
      },
      {
        iconName: 'Sparkles',
        title: '可信节点快速核算',
        desc: '接入长垣可信政务与医疗协作节点，事故与就医材料自动验证匹配，无需用户反复手撕纸质发票与跑腿开证明。'
      },
      {
        iconName: 'UserCheck',
        title: '重大时刻真人负责',
        desc: '我们坚信自动化不等于无人负责。遇到重大疾病、身故、伤残争议或受益人协调，资深专员第一时间同屏跟进并可上门协助。'
      },
      {
        iconName: 'ShieldAlert',
        title: '数据清晰最小授权',
        desc: '保险机构终身不得访问公民隐私禁区。严格按投保与理赔具体场景申请单次授权，优先返回风险结论而非原始生活数据。'
      }
    ]
  },
  featuredCategories: {
    title: '六大主营人身保障体系',
    subtitle: '依法依规备案经营，覆盖个人成长、职场、家庭、养老全周期',
    categories: [
      {
        category: 'life_income',
        name: '个人生命与收入保障',
        desc: '应对伤残或长期无法工作导致的中断损失，维持家庭现金流稳定。',
        sampleAmount: '最高120万收入替代支持',
        link: '/plans?category=life_income'
      },
      {
        category: 'health_medical',
        name: '健康医疗保障',
        desc: '衔接城市公共动态额度，承担大病用药、自费诊疗与住院看护。',
        sampleAmount: '自费部分按阶梯最高报销95%',
        link: '/plans?category=health_medical'
      },
      {
        category: 'family',
        name: '家庭共享保障',
        desc: '家庭成员额度互通互助，一方患病或遭遇风险，全家额度灵活调用。',
        sampleAmount: '全家共享最高200万保障池',
        link: '/plans?category=family'
      },
      {
        category: 'elderly_care',
        name: '养老与长期照护',
        desc: '结合长垣社区康养网络，提供持续年金给付与专业护工上门护理服务。',
        sampleAmount: '月度照护津贴+定点床位保障',
        link: '/plans?category=elderly_care'
      },
      {
        category: 'employee',
        name: '企业员工法定与补充保障',
        desc: '助力企业满足长垣雇主商业最低配置法规，保障员工通勤与工伤。',
        sampleAmount: '法定免赔额为零，当日报销到账',
        link: '/plans?category=employee'
      },
      {
        category: 'pilot_innovation',
        name: '创新试点保障',
        desc: '依法报备审批的新场景附加保障（如低空通勤责任、新型职业补充）。',
        sampleAmount: '经合规报备试点方案',
        link: '/plans?category=pilot_innovation'
      }
    ]
  },
  serviceSupport: {
    badge: '服务与人工支持',
    title: '有问题，我们一直有人接。',
    subtitle: '无论是保障方案、保单、理赔，还是对价格和数据授权有疑问，都可以从这里开始。',
    priorityNotice: '重大疾病、身故、失能及复杂理赔事项，将优先接入人工专员。',
    assetId: 'hero-support',
    channels: [
      {
        id: 'online',
        title: '在线咨询',
        desc: '输入您关心的生活场景或保障疑问，快速获取方案比对与政策解读。',
        actionText: '立即咨询',
        type: 'online'
      },
      {
        id: 'human',
        title: '找人工服务',
        desc: '专属负责专员在线直连或预约上门，解答复杂疑问，全程把关。',
        actionText: '联系负责专员',
        type: 'human'
      },
      {
        id: 'branches',
        title: '查看服务网点',
        desc: '长垣新枢区金融港与各社区实体营业厅，为长辈与关键事项面对面服务。',
        actionText: '查看线下网点',
        type: 'branches',
        link: '/branches'
      }
    ]
  }
};
