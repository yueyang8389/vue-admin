const member = {
  path: '/member',
  name: 'member',
  meta: {
    title: '会员管理',
    hideInMenu: true
  },
  component: () => import('@/views/main'),
  redirect: { name: 'memberSearch' },
  children: [
    {
      path: 'memberSearch',
      name: 'memberSearch',
      meta: {
        title: '会员查询',
        icon: 'cebianlanhuiyuanchaxun'
      },
      component: () => import('@/views/member/memberSearch')
    },
    {
      path: 'memberDetails',
      name: 'memberDetails',
      meta: {
        title: '会员详情',
        hideInMenu: true
      },
      component: () => import('@/views/member/memberDetails')
    },
    {
      path: 'memberEdit',
      name: 'memberEdit',
      meta: {
        title: '编辑会员',
        hideInMenu: true
      },
      component: () => import('@/views/member/memberEdit')
    },
    {
      path: 'memberOnline',
      name: 'memberOnline',
      meta: {
        title: '在线会员',
        icon: 'cebianlanzaixianhuiyuan'
      },
      component: () => import('@/views/member/memberOnline')
    },
    {
      path: 'memberLevel',
      name: 'memberLevel',
      meta: {
        title: '会员等级',
        icon: 'cebianlanhuiyuandengji'
      },
      component: () => import('@/views/member/memberLevel')
    },
    {
      path: 'memberLevelEdit',
      name: 'memberLevelEdit',
      meta: {
        title: '编辑会员等级',
        hideInMenu: true
      },
      component: () => import('@/views/member/memberLevelEdit')
    },
    {
      path: 'memberRefund',
      name: 'memberRefund',
      meta: {
        title: '返水等级',
        icon: 'cebianlanfanshui'
      },
      component: () => import('@/views/member/memberRefund')
    },
    {
      path: 'memberRefundDetails',
      name: 'memberRefundDetails',
      meta: {
        title: '返水详情',
        hideInMenu: true
      },
      component: () => import('@/views/member/memberRefundDetails')
    },
    {
      path: 'memberRefundEdit',
      name: 'memberRefundEdit',
      meta: {
        title: '编辑会员返水',
        hideInMenu: true
      },
      component: () => import('@/views/member/memberRefundEdit')
    },
    {
      path: 'memberLog',
      name: 'memberLog',
      meta: {
        title: '会员操作日志',
        icon: 'cebianlancaozuorizhi'
      },
      component: () => import('@/views/member/memberLog')
    },
    {
      path: 'memberLoginLog',
      name: 'memberLoginLog',
      meta: {
        title: '会员登陆日志',
        icon: 'cebianlandenglurizhi'
      },
      component: () => import('@/views/member/memberLoginLog')
    },
    {
      path: 'memberFundsLog',
      name: 'memberFundsLog',
      meta: {
        title: '会员资金日志',
        icon: 'cebianlanzijinrizhi'
      },
      component: () => import('@/views/member/memberFundsLog')
    },
    {
      path: 'memberBank',
      name: 'memberBank',
      meta: {
        title: '银行卡管理',
        icon: 'cebianlanyinhangqia'
      },
      component: () => import('@/views/member/memberBank')
    }
  ]
}

export default member
