const lottery = {
  path: '/lottery',
  name: 'lottery',
  meta: {
    title: '彩票管理',
    hideInMenu: true
  },
  component: () => import('@/views/main'),
  redirect: { name: 'fastLottery' },
  children: [
    {
      path: 'fastLottery',
      name: 'fastLottery',
      meta: {
        title: '快速彩票',
        icon: 'cebianlanhuiyuanchaxun'
      },
      component: () => import('@/views/lottery/fastLottery')
    },
    {
      path: 'fastLotteryBlack',
      name: 'fastLotteryBlack',
      meta: {
        title: '快速彩票黑名单',
        icon: 'cebianlanhuiyuanchaxun'
      },
      component: () => import('@/views/lottery/fastLotteryBlack')
    },
    {
      path: 'lotterySetting',
      name: 'lotterySetting',
      meta: {
        title: '彩票设置',
        icon: 'cebianlanhuiyuanchaxun'
      },
      component: () => import('@/views/lottery/lotterySetting')
    },
    {
      path: 'lotteryManagement',
      name: 'lotteryManagement',
      meta: {
        title: '开奖管理',
        icon: 'cebianlanhuiyuanchaxun'
      },
      component: () => import('@/views/lottery/lotteryManagement')
    },
    {
      path: 'currentLotteryDate',
      name: 'currentLotteryDate',
      meta: {
        title: '当前开奖期',
        icon: 'cebianlanhuiyuanchaxun'
      },
      component: () => import('@/views/lottery/currentLotteryDate')
    },
    {
      path: 'oddsSetting',
      name: 'oddsSetting',
      meta: {
        title: '赔率设置',
        hideInMenu: true
      },
      component: () => import('@/views/lottery/oddsSetting')
    },
    {
      path: 'markTimeSetting',
      name: 'markTimeSetting',
      meta: {
        title: '时间设置',
        hideInMenu: true
      },
      component: () => import('@/views/lottery/markTimeSetting')
    },
    {
      path: 'timeSettingAno',
      name: 'timeSettingAno',
      meta: {
        title: '时间设置',
        hideInMenu: true
      },
      component: () => import('@/views/lottery/timeSettingAno')
    },
    {
      path: 'fastLotteryDetails',
      name: 'fastLotteryDetails',
      meta: {
        title: '彩票详情',
        hideInMenu: true
      },
      component: () => import('@/views/lottery/fastLotteryDetails')
    }
  ]
}

export default lottery
