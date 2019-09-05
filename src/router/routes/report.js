const report = {
    path: '/report',
    name: 'report',
    meta: {
        title: '报表管理',
        hideInMenu: true
    },
    component: () =>
        import ('@/views/main'),
    redirect: { name: 'complexReport' },
    children: [{
            path: 'complexReport',
            name: 'complexReport',
            meta: {
                title: '综合报表',
                icon: 'cebianlanzonghebaobiao'
            },
            component: () =>
                import ('@/views/report/complexReport')
        },
        {
            path: 'totalReportChildren',
            name: 'totalReportChildren',
            meta: {
                title: '报表下级',
                hideInMenu: true
            },
            component: () =>
                import ('@/views/report/totalReportChildren')
        },
        {
            path: 'totalReportGameChildren',
            name: 'totalReportGameChildren',
            meta: {
                title: '报表下级',
                hideInMenu: true
            },
            component: () =>
                import ('@/views/report/totalReportGameChildren')
        },
        {
            path: 'gameReport',
            name: 'gameReport',
            meta: {
                title: '游戏记录',
                icon: 'cebianlanyouxijilubaobiao'
            },
            component: () =>
                import ('@/views/report/gameReport')
        },
        {
            path: 'firstDepositReport',
            name: 'firstDepositReport',
            meta: {
                title: '首存报表',
                icon: 'cebianlanshoucunbaobiao'
            },
            component: () =>
                import ('@/views/report/firstDepositReport')
        },
        {
            path: 'platformReport',
            name: 'platformReport',
            meta: {
                title: '平台报表',
                icon: 'cebianlanpingtaibaobiao'
            },
            component: () =>
                import ('@/views/report/platformReport')
        },
        {
            path: 'lotteryReport',
            name: 'lotteryReport',
            meta: {
                title: '彩票报表',
                icon: 'cebianlancaipiaobaobiao'
            },
            component: () =>
                import ('@/views/report/lotteryReport')
        },
        {
            path: 'memberReport',
            name: 'memberReport',
            meta: {
                title: '会员报表',
                icon: 'cebianlanhuiyuanbaobiao'
            },
            component: () =>
                import ('@/views/report/memberReport')
        },
        {
            path: 'agencyReport',
            name: 'agencyReport',
            meta: {
                title: '代理报表',
                icon: 'cebianlandailibaobiao'
            },
            component: () =>
                import ('@/views/report/agencyReport')
        },
        {
            path: 'totalReport',
            name: 'totalReport',
            meta: {
                title: '总报表',
                icon: 'cebianlanzongbaobiao'
            },
            component: () =>
                import ('@/views/report/totalReport')
        },
        {
            path: 'subordinateInfo',
            name: 'subordinateInfo',
            meta: {
                title: '代理报表下级',
                hideInMenu: true
            },
            component: () =>
                import ('@/views/report/subordinateInfo')
        },
        {
            path: 'lotteryReportDetail',
            name: 'lotteryReportDetail',
            meta: {
                title: '彩票报表详情',
                hideInMenu: true
            },
            component: () =>
                import ('@/views/report/lotteryReportDetail')
        }
    ]
}
export default report