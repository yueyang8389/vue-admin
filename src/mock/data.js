import Mock from 'mockjs'
import { doCustomTimes } from '@/libs/util'

export const getMemberTableData = (req) => {
    let tableData = []
    doCustomTimes(9, () => {
        tableData.push(
            Mock.mock({
                account: '@natural(11111,99999)',
                name: '@first',
                type: '@natural(0,10)级会员',
                level: '第@natural(0,10)层',
                superior: '@string("lower", 5)',
                'balance|1-10000.2': 1,
                'borrow|1-10000.2': 1,
                'status|1': true,
                'return|1': true,
                'online|1': true,
                createTime: '@date 19:52'
            })
        )
    })
    return tableData
}
export const memberLevelData = (req) => {
    let tableData = []
    doCustomTimes(9, () => {
        tableData.push(
            Mock.mock({
                level: 'VIP@natural(0,10)',
                memberCount: '@natural(0,100)',
                depositCount: '@natural(0,100)',
                depositMin: '@natural(0,100)',
                damabeishu: '@natural(0,100)',
                bigStroke: '@natural(0,100)',
                qukuandama: '@natural(0,100)',
                caijin: '@natural(0,100)',
                'modepayment|1': true,
                createTime: '@date 15:09',
                'defaultLevel|1': true,
                'status|1': true
            })
        )
    })
    return tableData
}

export const getSiteData = (req) => {
    let siteData = []
    doCustomTimes(9, () => {
        siteData.push(
            Mock.mock({
                siteId: '@natural(0,10)',
                siteName: '站点@natural(0,10)',
                createTime: '@date',
                'status|1': true
            })
        )
    })
    return siteData
}

export const getSiteLevelData = (req) => {
    let siteLevelData = []
    doCustomTimes(9, () => {
        siteLevelData.push(
            Mock.mock({
                levelId: '@natural(0,10)',
                levelName: '站点@natural(0,10)',
                levelAlias: '第@natural(0,10)层',
                createTime: '@date',
                'status|1': true
            })
        )
    })
    return siteLevelData
}

export const getCommonLevelData = (req) => {
    let commomLevelData = []
    doCustomTimes(9, () => {
        commomLevelData.push(
            Mock.mock({
                levelId: '@natural(0,10)',
                levelName: '站点@natural(0,10)',
                createTime: '@date',
                'status|1': true
            })
        )
    })
    return commomLevelData
}

export const getMemberBonusData = (req) => {
    let tableData = []
    doCustomTimes(9, () => {
        tableData.push(
            Mock.mock({
                level: '等级@natural(0,10)',
                levelAlias: '默认等级',
                'minBet|1-100000000.2': 1,
                'maxBonus|1-100000000.2': 1,
                createTime: '@date',
                'default|1': true,
                'status|1': true,
                remarks: '-'
            })
        )
    })
    return tableData
}

export const getMemberLog = (req) => {
    let tableData = []
    doCustomTimes(9, () => {
        tableData.push(
            Mock.mock({
                account: '@string("lower", 5)',
                ip: '@ip()',
                'type|1': true,
                createTime: '@date',
                details: '@sentence(5,10)'
            })
        )
    })
    return tableData
}

export const getMemberLoginLog = (req) => {
    let tableData = []
    doCustomTimes(9, () => {
        tableData.push(
            Mock.mock({
                account: '@string("lower", 5)',
                superior: '@string("lower", 5)',
                device: 'PC',
                domain: '@domain',
                address: '@city',
                ip: '@ip()',
                loginTime: '@date  9:09'
            })
        )
    })
    return tableData
}

export const getMemberFundsLog = (req) => {
    let tableData = []
    doCustomTimes(9, () => {
        tableData.push(
            Mock.mock({
                account: '@string("lower", 5)',
                'businessType|1': true,
                'changeType|1': true,
                'changeAmount|1-100000000.2': 1,
                beforeChange: '代理钱包:110.00 - 本地余额:100.00',
                afterChange: '代理钱包:110.00 - 本地余额:100.00',
                createTime: '@date  9:05',
                remarks: '代理钱包 → 本地余额'
            })
        )
    })
    return tableData
}

export const getMemberBank = (req) => {
    let tableData = []
    doCustomTimes(9, () => {
        tableData.push(
            Mock.mock({
                account: '@string("lower", 5)',
                realName: '@first',
                bankName: '中国银行',
                bankNum: '@id',
                ip: '@ip()',
                'default|1': true,
                'status|1': true,
                memberID: '@natural(12312,95626)',
                adress: '广东省-深圳市',
                createTime: '@date 19:52:35',
                updateTime: '@date 21:52:15'
            })
        )
    })
    return tableData
}

export const memberLevelModify = (req) => {
    let tableData = []
    doCustomTimes(9, () => {
        tableData.push(
            Mock.mock({
                huiyuanzhanghao: '@first',
                dengji: '第@natural(0,10)层',
                shangjidaili: '@first',
                'rukuancishu|1-100000000.2': 1,
                'rukuanzonge|1-100000000.2': 1,
                zhifucishu: '@natural(0,100)',
                'zhifuzonge|1-100000000.2': 1,
                qukuancishu: '@natural(0,100)',
                'qukuanzonge|1-100000000.2': 1,
                'zongshuying|1-100000000.2': 1,
                'suoding|1': true,
                caozuoshijian: '@date'
            })
        )
    })
    return tableData
}

export const payOnlineData = (req) => {
    let tableData = []
    doCustomTimes(9, () => {
        tableData.push(
            Mock.mock({
                dingdanhao: '@string("lower", 20)',
                dengji: '第@natural(0,10)层',
                huiyuanzhanghao: '@first',
                zhifupingtai: '易支付',
                zhifufangshi: '支付宝线上 - PC端',
                tijiaoshijian: '@date',
                'cunkuanjine|1-100000000.2': 1,
                'zhanghaoyue|1-100000000.2': 1,
                // qukuancishu: '@natural(0,100)',
                'qukuanzonge|1-100000000.2': 1,
                // 'zongshuying|1-100000000.2': 1,
                'zhuangtai|1': true,
                'return|1': true,
                'beizhu': '啊啊啊啊啊啊啊啊啊啊啊啊啊'
            })
        )
    })
    return tableData
}

export const payCompanyData = (req) => {
    let tableData = []
    doCustomTimes(9, () => {
        tableData.push(
            Mock.mock({
                dingdanhao: '@string("lower", 20)',
                dengji: '第@natural(0,10)层',
                shangjidaili: '@first',
                huiyuanzhanghao: '@first',
                cunkuanfangshi: '网银转账/我在这里',
                // zhifupingtai:'易支付' ,
                // zhifufangshi: '支付宝线上 - PC端',
                'cunkuanjine|1-100000000.2': 1,
                cunruzhanghu: '中信银行/广州建筑工程公司',
                'zhuangtai|1': true,
                'return|1': true,
                tijiaoshijian: '@date 10:20',
                shenheshijian: '@date 12:30',
                shenhezhe: '@first',
                huiyuanxingming: '@first',
                zhanghuhaoma: 622055698552
                    // 'zhanghaoyue|1-100000000.2': 1,
                    // qukuancishu: '@natural(0,100)',
                    // 'qukuanzonge|1-100000000.2': 1,
                    // 'zongshuying|1-100000000.2': 1,
                    // beizhu: '-'
            })
        )
    })
    return tableData
}

export const withdrawalsOnlineData = (req) => {
    let tableData = []
    doCustomTimes(9, () => {
        tableData.push(
            Mock.mock({
                dengji: '第@natural(0,10)层',
                huiyuanzhanghao: '@natural(11111,99999)',
                name: '@string(5)',
                // zhifupingtai:'易支付' ,
                // zhifufangshi: '支付宝线上 - PC端',
                'qukuanjine|1-100000000.2': 1,
                'shouxufei|1-10.2': 1,
                'qukuancishu|1-10': 1,
                'shijiqukuan|1-100000000.2': 1,
                'zhuangtai|1': true,
                'return|1': true,
                tijiaoshijian: '@date 6:30',
                shenheshijian: '@date 16:30',
                shenhezhe: '@first',
                beizhu: '当日提款金额已经超额',
                dingdanhao: '@string("lower", 20)',
                zhanghaoyue: 100.0,
                yinhangmingcheng: '工商银行',
                yinhangxingming: '@cfirst',
                yinhangzhanghao: 622055698552,
                kaihuwangdian: '@city'
            })
        )
    })
    return tableData
}

export const paymentGroupsData = (req) => {
    let tableData = []
    doCustomTimes(9, () => {
        tableData.push(
            Mock.mock({
                zhifufangshi: '支付宝扫码',
                zhifuleixing: '扫码支付',
                kaifangzhongduan: 'PC,IOS,Android,H5',
                zhifubeizhu: '支持32家银行，极速到账、安全、快捷、高效',
                chuangjianshijian: '@date 10:46',
                // chuangjianren: '@date',
                chuangjianren: '@first',
                'status|1': true
            })
        )
    })
    return tableData
}

export const paymentManagerData1 = (req) => {
    let tableData = []
    doCustomTimes(5, () => {
        tableData.push(
            Mock.mock({
                pingtaibianhao: '@natural(10010,10020)',
                zhifupingtai: '当当付',
                zhifufangshi: '支付宝线上',
                zhifujine: '10-500000',
                status: true,
                beizhu: '-'
            })
        )
    })
    return tableData
}
export const paymentManagerData2 = (req) => {
    let tableData = []
    doCustomTimes(5, () => {
        tableData.push(
            Mock.mock({
                pingtaibianhao: 10018,
                zhifupingtai: '当当付',
                zhifufangshi: '支付宝线上',
                zhifujine: '10-500000',
                status: false,
                beizhu: '-'
            })
        )
    })
    return tableData
}

export const accountsRecordData = (req) => {
    let tableData = []
    doCustomTimes(9, () => {
        tableData.push(
            Mock.mock({
                orderNum: 15489526296,
                level: '第@natural(0,10)层',
                memberNum: '@first',
                reminderType: '存款',
                cuizhangjine: '100',
                reminderTime: '2018-12-5 19:20',
                reviewTime: '2018-12-5 19:20',
                reviewer: 'AAA',
                'return|1': true,
                'status|1': true
            })
        )
    })
    return tableData
}

export const preferentialRecordData = (req) => {
    let tableData = []
    doCustomTimes(9, () => {
        tableData.push(
            Mock.mock({
                orderNum: 15489526296,
                memberNum: 16515,
                preName: '公司入款赠送1%',
                preMoney: 10,
                multiple: 1,
                'status|1': true,
                reminderTime: '2018-10-17 19:50',
                reviewTime: '2018-12-5 19:50',
                reviewer: 'AAA',
                remarks: '彩票金管家：3级，周俸禄派送3元'
            })
        )
    })
    return tableData
}

export const financeSummaryData = (req) => {
    let tableData = []
    doCustomTimes(6, () => {
        tableData.push(
            Mock.mock({
                memberNum: 1854855,
                businessType: '取款',
                changeType: '取款成功',
                changeMoney: 1000,
                beforeBalance: 1100,
                afterBalance: 100,
                changeTime: '2018-12-5 19:50',
                remarks: '【1111】AG电子实时返水，有效投注941【B】 【0.1%】'
            })
        )
    })
    return tableData
}

export const gamesTransferData = (req) => {
    let tableData = []
    doCustomTimes(9, () => {
        tableData.push(
            Mock.mock({
                memberNum: 18155425,
                outPlatform: 'AG视讯',
                inPlatform: ' 本地余额',
                changeMoney: 10000000,
                beforeBalance: 'AG视讯：10000000.00 - 本地余额：10000000.00',
                afterBalance: 'AG视讯：20000000.00 - 本地余额：20000000.00',
                'status|1': true,
                'return|1': true,
                changeTime: '2018-12-5 19:50'
            })
        )
    })
    return tableData
}

export const cardManagementData = (req) => {
    let tableData = []
    doCustomTimes(5, () => {
        tableData.push(
            Mock.mock({
                sort: '做排序',
                bankName: '中国银行',
                carHolder: '莉莉',
                cardNum: '1235 1234 1234 1234 1234',
                cardAttribution: '深圳市-宝安区-明知支行',
                openLevel: '第二层,第三层,第四层,第五层,第六层',
                openTerminal: 'PC,IOS,Android,H5',
                createTime: '@date 12:30',
                founder: 'lili',
                'status|1': true
            })
        )
    })
    return tableData
}

export const alipayScanData = (req) => {
    let tableData = []
    doCustomTimes(5, () => {
        tableData.push(
            Mock.mock({
                sort: '做排序',
                scanType: '支付宝扫码',
                receiptName: 'aaa',
                scanImg: '放二维码图片',
                lowLimit: '10',
                upLimit: '10000',
                openLevel: '第二层,第三层,第四层,第五层,第六层',
                openTerminal: 'PC,IOS,Android,H5',
                createTime: '@date 12:30',
                founder: 'lili',
                'status|1': true
            })
        )
    })
    return tableData
}

export const wechatScanData = (req) => {
    let tableData = []
    doCustomTimes(5, () => {
        tableData.push(
            Mock.mock({
                sort: '做排序',
                scanType: '微信扫码',
                receiptName: 'aaa',
                scanImg: '放二维码图片',
                lowLimit: '10',
                upLimit: '10000',
                openLevel: '第二层,第三层,第四层,第五层,第六层',
                openTerminal: 'PC,IOS,Android,H5',
                createTime: '@date 12:30',
                founder: 'lili',
                'status|1': true
            })
        )
    })
    return tableData
}

export const qqScanData = (req) => {
    let tableData = []
    doCustomTimes(5, () => {
        tableData.push(
            Mock.mock({
                sort: '做排序',
                scanType: '财付通扫码',
                receiptName: '收款姓名',
                scanImg: '放二维码图片',
                lowLimit: '单笔下限',
                upLimit: '单笔上限',
                openLevel: '第二层,第三层,第四层,第五层,第六层',
                openTerminal: 'PC,IOS,Android,H5',
                createTime: '@date 12:30',
                founder: 'lili',
                'status|1': true
            })
        )
    })
    return tableData
}

export const agencySearchData = (req) => {
    let tableData = []
    doCustomTimes(5, () => {
        tableData.push(
            Mock.mock({
                account: '@string("lower", 5)',
                type: '@natural(0,10)级会员',
                level: '第@natural(0,10)层',
                superior: '@string("lower", 6)',
                subordinate: '@natural(200,600)',
                valid: '@natural(60,160)',
                newAdd: '@natural(10,50)',
                deposit: '@natural(1,12)',
                'profit|10000-100000.2': 1,
                'balance|10000-100000.2': 1,
                'status|1': true,
                'return|1': true,
                'online|1': true
            })
        )
    })
    return tableData
}

export const agencyDomainData = (req) => {
    let tableData = []
    doCustomTimes(9, () => {
        tableData.push(
            Mock.mock({
                account: '@string("lower", 5)',
                'type|1': true, // true股东 false代理
                url: 'http://fkadmin.lx851.com',
                invitation: '@natural(124123,985462)',
                vip: '1000000',
                effect: '1000',
                createTime: '@date 16:00',
                mode: '邀请码',
                'status|1': true,
                'frost|1': true
            })
        )
    })
    return tableData
}

export const agencyLevelData = (req) => {
    let tableData = []
    doCustomTimes(5, () => {
        tableData.push(
            Mock.mock({
                level: 'VIP@natural(1,8)',
                name: '默认等级',
                vipNum: '@natural(10,90)',
                lowestBetting: '@natural(5,100).00',
                lowestDeposit: '@natural(100,1000).00',
                activeMember: '@natural(8,30)',
                createTime: '@date 15:44',
                'default|1': true,
                'status|1': true
            })
        )
    })
    return tableData
}

export const agencyDividendData = (req) => {
        let tableData = []
        doCustomTimes(9, () => {
            tableData.push(
                Mock.mock({
                    account: '@natural(1000000,9999999)',
                    level: 'VIP@natural(1,8)',
                    totalBetting: '@natural(100000000,999999999).00',
                    totalProfit: '@natural(100000,999999)',
                    total: '@natural(100000000,999999999).00',
                    prevProfit: '@natural(100000000,999999999).00',
                    currentProfit: '@natural(100000000,999999999).00',
                    lowestDeficit: '-@natural(10000,80000)',
                    grantScale: '@natural(0,4)%',
                    grantNum: '@natural(-10000000,99999999).00',
                    currentDividend: '@natural(100000,600000)'
                })
            )
        })
        return tableData
    }
    // 代理域名  下属会员
export const agencyUnderlingData = (req) => {
    let tableData = []
    doCustomTimes(9, () => {
        tableData.push(
            Mock.mock({
                account: '@natural(11111111,99999999)',
                type: '@natural(1,5)级代理',
                name: '李康生',
                balance: '@natural(100000000,900000000).00',
                depositSum: '1000000000.00,(100000000笔)',
                glutDeposit: '100000000.00',
                withdrawalSum: '1000000000.00,(100000000笔)',
                sum: '@natural(10000000,90000000).00',
                createTime: '@date 14:30'
            })
        )
    })
    return tableData
}

export const agencyReportData = (req) => {
        let tableData = []
        doCustomTimes(9, () => {
            tableData.push(
                Mock.mock({
                    account: '@natural(11111111,99999999)',
                    type: '@natural(1,5)级代理',
                    registerNum: '@natural(100000000,900000000)',
                    bettingNum: '@natural(10000000,90000000)',
                    firstDepositNum: '@natural(1000000,9000000)',
                    bettingMon: '@natural(10000000,90000000).00',
                    profitReport: '@natural(-10000000,90000000).00',
                    activityMon: '@natural(100000000,900000000).00',
                    teamRebate: '@natural(100000000,900000000).00',
                    depositAmount: '200000000.00',
                    withdrawal: '200000000.00',
                    teamProfit: '@natural(100000000,800000000).00',
                    superior: '11111111',
                    'identity|1': true
                })
            )
        })
        return tableData
    }
    // 查看下级代理
export const checkSubordinate = (req) => {
        let tableData = []
        doCustomTimes(9, () => {
            tableData.push(
                Mock.mock({
                    account: '11111111',
                    'type|1': true,
                    registerNum: '@natural(100000000,900000000)',
                    bettingNum: '@natural(10000000,90000000)',
                    firstDepositNum: '@natural(1000000,9000000)',
                    bettingMon: '@natural(10000000,90000000).00',
                    profitReport: '@natural(-10000000,90000000).00',
                    activityMon: '@natural(100000000,900000000)',
                    teamRebate: '@natural(100000000,900000000)',
                    depositAmount: '200000000.00',
                    withdrawal: '200000000.00',
                    teamProfit: '@natural(100000000,800000000).00'
                })
            )
        })
        return tableData
    }
    // 当前开奖期
export const currentLotteryData = (req) => {
        let tableData = []
        doCustomTimes(9, () => {
            tableData.push(
                Mock.mock({
                    lotteryDate: '@date',
                    periods: '@natural(2019119,2019130)',
                    'lotteryName|1': true,
                    sealTime: '21:30',
                    lotteryTime: '09:30',
                    status: '待开奖'
                })
            )
        })
        return tableData
    }
    // 开奖管理
export const lotteryManagementData = (req) => {
        let tableData = []
        doCustomTimes(9, () => {
            tableData.push(
                Mock.mock({
                    periods: '@natural(2019007,2019110)',
                    result: '3,9,5,7,6,10,16,7,5,3',
                    sealTime: '2019-1-30 18:18:30',
                    lotteryTime: '2019-1-30 9:30:00',
                    'status|1': [1, 2, 3, 4]
                })
            )
        })
        return tableData
    }
    // 彩票管理
export const lotterySettingData = (req) => {
        let tableData = []
        doCustomTimes(8, () => {
            tableData.push(
                Mock.mock({
                    'name|1': true,
                    'return|1': true
                })
            )
        })
        return tableData
    }
    // 赔率设置
export const oddsSettingData = (req) => {
    let tableData = []
    doCustomTimes(10, () => {
        tableData.push(
            Mock.mock({
                'describe|1': true,
                num: '01-02-03-04-05-06-07-08-09-10-11-12-13-14-15-16-17-18-19-20-21-22-23-24-25-26-27-28-29-30-31-32-33-34-35-36-37-38-39-40-41-42-43-44-45-46-47-48-49',
                maxOdds: 48.8,
                minOdds: 42.8,
                refund: 10.00,
                play: '20201,20202,20208'
            })
        )
    })
    return tableData
}

// 香港六合彩时间设置
export const markTimeSettingData = (req) => {
        let tableData = []
        doCustomTimes(9, () => {
            tableData.push(
                Mock.mock({
                    periods: '@natural(2019009,2019020)',
                    result: '16,18,28,35,41,36,37',
                    openingTime: '@date 21:40:00',
                    sealTime: '2019-2-2 10:35:00',
                    lotteryTime: '@date 21:30:00',
                    createTime: '@date 20:30:00',
                    'status|1': true,
                    'return|1': true,
                    'current|1': true
                })
            )
        })
        return tableData
    }
    // 福彩3D时间设置
export const timeSetting = (req) => {
    let tableData = []
    doCustomTimes(9, () => {
        tableData.push(
            Mock.mock({
                periods: '@natural(1,100)',
                openingTime: '16:30:25',
                sealTime: '16:32:25',
                lotteryTime: '16:32:50',
                offset: '0',
                lotteryDate: '每天'
            })
        )
    })
    return tableData
}
export const fastCaipiao = (req) => {
    let tableData = []
    doCustomTimes(9, () => {
        tableData.push(
            Mock.mock({
                name: '快速时时彩',
                countTime: '@date 14:30',
                cathectic: '@natural(10000000,90000000).02',
                bunko: '-@natural(1000000,9000000).23',
                killCount: '@natural(0,4)%',
                'riskStatus|1': true,
                blackCathectic: '@natural(100000000,900000000).33',
                bunkoBlack: '-@natural(100000000,900000000).23',
                interval: "1'13'",
                awardMoney: '200000000.00',
                awardUp: '@natural(100000000,800000000).00',
                'awardStatus|1': true,
                'status|1': true,
                operate: '操作'
            })
        )
    })
    return tableData
}
export const lotteryDetails = (req) => {
    let tableData = []
    doCustomTimes(9, () => {
        tableData.push(
            Mock.mock({
                periods: '@date',
                number: '@natural(10000000,90000000).02',
                validBet: '@natural(1000000,9000000).02',
                bunko: '@natural(1000000,9000000).23',
                validBet1: '2%',
                bunko1: '-@natural(1000000,9000000).25',
                'pattern|1': true,
                'status|1': true,
                'return|1': true,
                awardResult: '3,9,5,7,6,1,8,2,4,8',
                drawTime: '@date 16:00'
            })
        )
    })
    return tableData
}
export const lotteryBlackData = (req) => {
    let tableData = []
    doCustomTimes(9, () => {
        tableData.push(
            Mock.mock({
                account: '@string(5)',
                name: '哈哈哈',
                time: '@date 14:30',
                operation: '移除黑名单'
            })
        )
    })
    return tableData
}

export const reportTotalData = (req) => {
        let tableData = []
        doCustomTimes(4, () => {
            tableData.push(
                Mock.mock({
                    type: '111/一级会员',
                    bet: '@natural(10000000,90000000)',
                    number: '@natural(10000000,90000000)',
                    money: '@natural(10000000,90000000).00',
                    validPepole: '@natural(10000000,90000000)',
                    menberSy: '@natural(10000000,90000000)',
                    rate: '2.00%',
                    'platform|1': true,
                    'accountType|1': true,
                    betValid: '@natural(10000000,90000000).00',
                    betmoney: '@natural(10000000,90000000)',
                    memberSy: '@natural(10000000,90000000).00',
                    hdCash: '10000000.00',
                    memberBackwater: '10000000.00',
                    agencyRebates: '10000000.00',
                    agencyBackwater: '10000000.00',
                    agencyCash: '10000000.00',
                    agencyPay: '10000000.00',
                    agencyProfit: '10000000.00'
                })
            )
        })
        return tableData
    }
    // 游戏记录的子页面
export const reportTotalGameData = (req) => {
    let tableData = []
    doCustomTimes(4, () => {
        tableData.push(
            Mock.mock({
                type: '111/一级会员',
                bet: '@natural(10000000,90000000)',
                number: '@natural(10000000,90000000)',
                money: '@natural(10000000,90000000).00',
                validPepole: '@natural(10000000,90000000)',
                menberSy: '@natural(10000000,90000000)',
                rate: '2.00%',
                'platform|1': true,
                'accountType|1': true,
                betValid: '@natural(10000000,90000000).00',
                betmoney: '@natural(10000000,90000000)',
                memberSy: '@natural(10000000,90000000).00',
                hdCash: '10000000.00',
                memberBackwater: '10000000.00',
                agencyRebates: '10000000.00',
                agencyBackwater: '10000000.00',
                agencyCash: '10000000.00',
                agencyPay: '10000000.00',
                agencyProfit: '10000000.00'
            })
        )
    })
    return tableData

}

export const reportTotalingData = (req) => {
    let tableData = []
    doCustomTimes(4, () => {
        tableData.push(
            Mock.mock({
                // type: '111/一级会员',
                'type|1': true,
                bet: '@natural(10000000,90000000)',
                number: '@natural(10000000,90000000)',
                money: '@natural(10000000,90000000).00',
                validPepole: '@natural(10000000,90000000)',
                menberSy: '@natural(10000000,90000000)',
                rate: '2.00%',
                'platform|1': true,
                'accountType|1': true,
                betValid: '@natural(10000000,90000000).00',
                betmoney: '@natural(10000000,90000000)',
                memberSy: '@natural(10000000,90000000).00',
                hdCash: '10000000.00',
                memberBackwater: '10000000.00',
                agencyRebates: '10000000.00',
                agencyBackwater: '10000000.00',
                agencyCash: '10000000.00',
                agencyPay: '10000000.00',
                agencyProfit: '10000000.00'
            })
        )
    })
    return tableData
}

export const firstReportData = (req) => {
        let tableData = []
        doCustomTimes(4, () => {
            tableData.push(
                Mock.mock({
                    'type|1': true,
                    'status|1': true,
                    account: '@natural(10000000,90000000)',
                    'agency|1': true,
                    balance: '@natural(10000000,90000000)',
                    firstMoney: '@natural(10000000,90000000)',
                    firstTime: '@date 14:30',
                    'secondMoney|1': true,
                    'secondTime|1': true,
                    'threeMoney|1': true,
                    threeTime: '@date 14:30',
                    registerTime: '@date 14:30'
                })
            )
        })
        return tableData
    }
    // 会员报表
export const memberReportData = (req) => {
        let tableData = []
        doCustomTimes(3, () => {
            tableData.push(
                Mock.mock({
                    account: '@string(8)',
                    superiorAgent: '@string(9)',
                    effectBet: '10000000.00',
                    betAmount: '@natural(10000000,90000000).00',
                    // betAmount: '1',
                    memberWin: '@natural(-1000000,1000000).00',
                    // memberWin: '1',
                    rebateAmount: '@natural(100,1000).00',
                    // rebateAmount: '1',
                    discountAmount: '@natural(10000000,80000000).00',
                    // discountAmount: '1',
                    profit: '@natural(10000000,80000000).00',
                    winRate: '1.10%',
                    depositAmount: '@natural(10000000,80000000).00(10000000笔)',
                    withdrawalAmount: '@natural(10000000,80000000).00(10000000笔)',
                    memberBalance: '10000000.00'
                })
            )
        })
        return tableData
    }
    // 彩票报表
export const lotteryReportData = (req) => {
        let tableData = []
        doCustomTimes(3, () => {
            tableData.push(
                Mock.mock({
                    'lotteryName|1': true,
                    betMember: '@natural(100000000,600000000)',
                    betNumber: '@natural(100000000,600000000)',
                    betAmount: '@natural(100000000,600000000).00',
                    effectBet: '@natural(10000000,60000000).00',
                    lotteryAmount: '@natural(10000000,60000000).00',
                    withdrawalAmount: '@natural(10000000,40000000).00',
                    rebateAmount: '@natural(10000000,30000000).00',
                    profit: '@natural(10000000,60000000).00',
                    winRate: '@natural(-20,20).@natural(0.1,0.96)%'
                })
            )
        })
        return tableData
    }
    // 彩票报表详情
export const lotteryReportDetailData = (req) => {
        let tableData = []
        doCustomTimes(9, () => {
            tableData.push(
                Mock.mock({
                    account: '@natural(1111111,3333333)',
                    betNumber: '@natural(100000000,600000000)',
                    betAmount: '@natural(100000000,600000000).00',
                    effectBet: '@natural(10000000,60000000).00',
                    lotteryAmount: '@natural(10000000,60000000).00',
                    memberWin: '@natural(10000000,60000000).00',
                    withdrawalAmount: '@natural(10000000,40000000).00',
                    rebateAmount: '@natural(10000000,30000000).00',
                    profit: '@natural(10000000,60000000).00',
                    winRate: '@natural(-20,20).@natural(0.1,0.96)%'
                })
            )
        })
        return tableData
    }
    // 通过详情点击进入的会会员游戏记录
export const memberGameRecordData = (req) => {
        let tableData = []
        doCustomTimes(9, () => {
            tableData.push(
                Mock.mock({
                    noteNumber: 'CP19012985265G547U5J11256Y454',
                    gamePlatform: '江苏快3',
                    account: '11111111',
                    gameAccount: 'Ms_@string(12)',
                    periods: '201901280445',
                    betAmount: '@natural(100000000,600000000).00',
                    effectBet: '@natural(100000000,600000000).00',
                    memberWin: '@natural(100000000,300000000).00',
                    'lotteryStatus|1': true,
                    'lotteryReturn|1': true,
                    'settleStatus|1': true,
                    lotteryResult: '06,09,10,11,08,05,03,01,11,16'
                })
            )
        })
        return tableData
    }
    // 平台报表
export const platformReportData = (req) => {
    let tableData = []
    doCustomTimes(3, () => {
        tableData.push(
            Mock.mock({
                'gamePlatform|1': true,
                betPeople: '@natural(100,100000000)',
                bet: '@natural(100,100000000)',
                betMoney: '@natural(100,100000000).00',
                rate: '@natural(500,100000000.00)',
                platform: '@natural(500,10000000).00',
                winRate: '@natural(-14,14).00%',
                'type1|1': true,
                'type2|1': true,
                activePeople: '@natural(100,1000000)',
                activeMoney: '100000.00'
            })
        )
    })
    return tableData
}

// 游戏记录
export const gameRecordData = (req) => {
        let tableData = []
        doCustomTimes(4, () => {
            tableData.push(
                Mock.mock({
                    number: '5dvgdsgrfg453527452',
                    bureau: 'BGB53476546J324',
                    'gamePlatform|1': true,
                    memberAccount: 'lvdsh12345',
                    'gameAccount|1': true,
                    validBet: '@natural(100,100000000).00',
                    memberSy: '@natural(100,100000000).00',
                    play: '百家乐，下注庄赢',
                    betTime: '@date 14:30',
                    betMoney: '100000'
                })
            )
        })
        return tableData
    }
    // 打码详情
export const addCodeDetailData = (req) => {
    let tableData = []
    doCustomTimes(13, () => {
        tableData.push(Mock.mock({
            'type|1': true,
            amount: '10000',
            multiple: '3',
            exit: '11.3',
            allCount: '1000',
            time: '@date 16:10'
        }))
    })
    return tableData
}

// 首页报表
export const getTodayReport = (req) => {
    let tableData = Mock.mock({
        member: '@natural(100,100000000)',
        member_bank: '@natural(100,100000000)',
        agency: '@natural(100,100000000)',
        agency_bank: '@natural(100,100000000)',
        message: '@natural(100,100000000)',
        transfer: '@natural(100,100000000)',
        report_deposit_amount: '@natural(100,100000000)',
        report_deposit_quantity: '@natural(100,100000000)',
        report_withdrawals_amount: '@natural(100,100000000)',
        report_withdrawals_quantity: '@natural(100,100000000)',
        report_slots_betCount: '@natural(100,100000000)',
        report_slots_betAmount: '@natural(100,100000000)',
        report_slots_validBetAmount: '@natural(100,100000000)',
        report_slots_netAmount: '@natural(100,100000000)',
        report_sport_betCount: '@natural(100,100000000)',
        report_sport_betAmount: '@natural(100,100000000)',
        report_sport_validBetAmount: '@natural(100,100000000)',
        report_sport_netAmount: '@natural(100,100000000)',
        report_lottery_betCount: '@natural(100,100000000)',
        report_lottery_betAmount: '@natural(100,100000000)',
        report_lottery_validBetAmount: '@natural(100,100000000)',
        report_lottery_netAmount: '@natural(100,100000000)',
        report_livecasino_betCount: '@natural(100,100000000)',
        report_livecasino_betAmount: '@natural(100,100000000)',
        report_livecasino_validBetAmount: '@natural(100,100000000)',
        report_livecasino_netAmount: '@natural(100,100000000)',
        report_chess_betCount: '@natural(100,100000000)',
        report_chess_betAmount: '@natural(100,100000000)',
        report_chess_validBetAmount: '@natural(100,100000000)',
        report_chess_netAmount: '@natural(100,100000000)'
    })
    return tableData
}

// 七日报表
export const getSevenDaysReport = (req) => {
    let tableData = Mock.mock({
        agency: [1, 4, 6, 14, 15, 16, 33, 50, 67],
        days: ['2019-02-20', '2019-02-21', '2019-02-22', '2019-02-23', '2019-02-24', '2019-02-25', '2019-02-26'],
        member: [1, 4, 6, 14, 15, 16, 33, 50, 67],
        'report_deposit:amount': [1000, 244, 11150, 354, 564, 954, 258],
        'report_deposit:person': [1000, 244, 11150, 354, 564, 954, 258],
        'report_deposit:quantity': [1000, 244, 11150, 354, 564, 954, 258],
        'report_withdrawals:amount': [1000, 244, 11150, 354, 564, 954, 258],
        'report_withdrawals:person': [1000, 244, 11150, 354, 564, 954, 258],
        'report_withdrawals:quantity': [1000, 244, 11150, 354, 564, 954, 258]
    })
    return tableData
}