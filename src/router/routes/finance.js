const finance = {
  path: '/finance',
  name: 'finance',
  meta: {
    title: '财务管理',
    hideInMenu: true
  },
  component: () => import('@/views/main'),
  redirect: { name: 'payOnline' },
  children: [
    {
      path: 'payOnline',
      name: 'payOnline',
      meta: {
        title: '在线支付',
        icon: 'cebianlanzaixianzhifu'
      },
      component: () => import('@/views/finance/payOnline')
    },
    {
      path: 'payCompany',
      name: 'payCompany',
      meta: {
        title: '公司入款',
        icon: 'cebianlangongsirukuan'
      },
      component: () => import('@/views/finance/payCompany')
    },
    {
      path: 'withdrawalsOnline',
      name: 'withdrawalsOnline',
      meta: {
        title: '线上取款',
        icon: 'cebianlanxianshangqukuan'
      },
      component: () => import('@/views/finance/withdrawalsOnline')
    },
    {
      path: 'paymentGroups',
      name: 'paymentGroups',
      meta: {
        title: '支付分组',
        hideInMenu: true
      },
      component: () => import('@/views/finance/paymentGroups')
    },
    {
      path: 'paymentManager',
      name: 'paymentManager',
      meta: {
        title: '支付管理',
        icon: 'cebianlanzhifuguanli'
      },
      component: () => import('@/views/finance/paymentManager')
    },
    {
      path: 'accountsRecord',
      name: 'accountsRecord',
      meta: {
        title: '催帐记录',
        icon: 'cebianlancuizhangjilu'
      },
      component: () => import('@/views/finance/accountsRecord')
    },
    {
      path: 'preferentialRecord',
      name: 'preferentialRecord',
      meta: {
        title: '优惠记录',
        icon: 'cebianlanyouhuijilu'
      },
      component: () => import('@/views/finance/preferentialRecord')
    },
    {
      path: 'financeSummary',
      name: 'financeSummary',
      meta: {
        title: '存取款总汇',
        icon: 'cebianlancunqukuanzonghui'
      },
      component: () => import('@/views/finance/financeSummary')
    },
    {
      path: 'systemInPaymentCard',
      name: 'systemInPaymentCard',
      meta: {
        title: '入款卡管理',
        icon: 'cebianlanyinhangqia1'
      },
      component: () => import('@/views/finance/systemInPaymentCard')
    },
    {
      path: 'gamesTransfer',
      name: 'gamesTransfer',
      meta: {
        title: '第三方转账记录',
        icon: 'cebianlandisanfangzhuanzhangjilu'
      },
      component: () => import('@/views/finance/gamesTransfer')
    },
    {
      path: 'paymentAdd',
      name: 'paymentAdd',
      meta: {
        title: '添加支付平台',
        hideInMenu: true
      },
      component: () => import('@/views/finance/paymentAdd')
    },
    {
      path: 'paymentEdit',
      name: 'paymentEdit',
      meta: {
        title: '编辑支付平台',
        hideInMenu: true
      },
      component: () => import('@/views/finance/paymentEdit')
    },
    {
      path: 'addCard',
      name: 'addCard',
      meta: {
        title: '添加入款卡',
        hideInMenu: true
      },
      component: () => import('@/views/finance/addCard')
    },
    {
      path: 'bankCardEdit',
      name: 'bankCardEdit',
      meta: {
        title: '编辑银行卡',
        hideInMenu: true
      },
      component: () => import('@/views/finance/bankCardEdit')
    }
  ]
}

export default finance
