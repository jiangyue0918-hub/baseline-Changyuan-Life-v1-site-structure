/**
 * 【普通维护区】我的保单管理页面配置
 * 
 * 维护说明：
 * 1. 规范 5.5 结构锁定：标题区 -> 状态标签与摘要 -> 筛选 -> 保单卡列表 -> 异常同步兜底。
 * 2. 系统能通过可信节点自动关联的数据不得要求用户重复手动录入，“补充/同步保单”仅用于异常兜底。
 */

export const POLICIES_PAGE_CONTENT = {
  hero: {
    badge: '数字保单凭证管理',
    title: '我的有效保单与合同',
    description: '通过长垣可信个人终端安全关联。所有保单均具有法定电子合同效力，实行合同期内锁价政策，任何价格与条款变更均需您明示同意。',
    assetId: 'hero-policies'
  },
  statusTabs: [
    { id: 'all', label: '全部保单' },
    { id: 'valid', label: '保障有效中' },
    { id: 'renewing', label: '即将续保' },
    { id: 'pending_effective', label: '待生效' },
    { id: 'terminated', label: '历史/已终止' }
  ],
  abnormalSyncBanner: {
    title: '未找到您以往纸质保单或跨机构保单？',
    desc: '长垣人寿通过可信节点自动汇聚您作为投保人或被保险人的全部有效合同。若您持有早期离线单证或跨城市企业统保单，可发起一次性凭据同步申请。',
    buttonText: '发起异常或历史保单同步核实'
  },
  detailView: {
    contractTermsTitle: '合同约定义务与责任范围',
    priceLockTitle: '保期锁价承诺与费率影响因素',
    priceLockNotice: '长垣人寿承诺：在当前保单合同有效期限内，无论被保险人出现健康波动或轻症理赔，续保基础费率绝不单独上浮。影响未来新合同定价的仅限法定年龄跨度（如有约定）及行业统一监管费率调整。',
    authorizationNodesTitle: '本次合同已关联的数据授权节点',
    advisorServiceTitle: '保单专属负责专员',
    downloadAction: '下载电子合同存根 (加密验签文件)'
  }
};
