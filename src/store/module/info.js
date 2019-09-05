export default {
    state: {
        platformList: [
            { title: '本地', value: 'local' },
            { title: '会员钱包', value: 'memberWallet' },
            { title: '代理钱包', value: 'proxyWallet' },
            { title: 'AG视讯', value: 'AG' },
            { title: 'BBIN视讯', value: 'BBIN' },
            { title: 'DS视讯', value: 'DS' },
            { title: 'OG视讯', value: 'OG' },
            { title: '欧博视讯', value: 'OB' },
            { title: 'LMG视讯', value: 'LMG' },
            { title: '沙龙视讯', value: 'SL' },
            { title: 'DG视讯', value: 'DG' },
            { title: 'BG视讯', value: 'BG' },
            { title: 'EBET视讯', value: 'EBET' },
            { title: 'LEBO视讯', value: 'LEBO' },
            { title: 'PT电子', value: 'PT' },
            { title: '大满贯电子', value: 'ALL' },
            { title: 'MG电子', value: 'MG' },
            { title: 'AE电子', value: 'AE' },
            { title: 'TTG电子', value: 'TTG' },
            { title: 'DT电子', value: 'DT' },
            { title: 'FG电子', value: 'FG' },
            { title: 'CQ9电子', value: 'CQ9' },
            { title: '皇冠体育', value: 'HG' },
            { title: '沙巴体育', value: 'SB' },
            { title: 'VR彩票', value: 'VR' },
            { title: '开元棋牌', value: 'KY' },
            { title: 'JDB电子', value: 'JDB' }
        ],
        lotteryType: [{
                key: 'liuhecai',
                _value: '六合彩',
                get value() {
                    return this._value
                },
                set value(value) {
                    this._value = value
                },
                info: [
                    { key: 'xianggang', value: '香港六合彩' }
                ]
            },
            {
                key: 'pk10',
                value: 'PK10',
                info: [
                    { key: 'test', value: 'PK10' }
                ]
            },
            {
                key: 'shishicai',
                value: '时时彩',
                info: [
                    { key: 'test', value: '时时彩' }
                ]
            },
            {
                key: 'kuaileshifen',
                value: '快乐十分',
                info: [
                    { key: 'test', value: '快乐十分' }
                ]
            },
            {
                key: 'shiyixuanwu',
                value: '11选5',
                info: [
                    { key: 'test', value: '11选5' }
                ]
            },
            {
                key: 'kuaisan',
                value: '快3',
                info: [
                    { key: 'test', value: '快3' }
                ]
            },
            {
                key: 'pcdandan',
                value: 'PC蛋蛋',
                info: [
                    { key: 'test', value: 'PC蛋蛋' }
                ]
            },
            {
                key: 'dipincai',
                value: '低频彩',
                info: [
                    { key: 'test', value: '低频彩' }
                ]
            }
        ],
        fsList: [{
                key: 'zhenrenshixun',
                value: '真人视讯',
                info: [
                    { key: 'AG', value: 'AG视讯' },
                    { key: 'BG', value: 'BG视讯' },
                    { key: 'DG', value: 'DG视讯' },
                    { key: 'EBET', value: 'EBET视讯' },
                    { key: 'LMG', value: 'LMG视讯' },
                    { key: 'DG', value: 'DG视讯' },
                    { key: 'EBET', value: 'EBET视讯' },
                    { key: 'LMG', value: 'LMG视讯' }
                ]
            },
            {
                key: 'dianziyouyi',
                value: '电子游艺',
                info: [
                    { key: 'test', value: '电子游艺测试' }
                ]
            },
            {
                key: 'tiyusaishi',
                value: '体育赛事',
                info: [
                    { key: 'test', value: '体育赛事测试' }
                ]
            },
            {
                key: 'caipiaotouzhu',
                value: '彩票投注',
                info: [
                    { key: 'test', value: '彩票投注测试' }
                ]
            },
            {
                key: 'kaiyuanqipai',
                value: '开元棋牌',
                info: [
                    { key: 'test', value: '开元棋牌测试' }
                ]
            }
        ],
        gameType: [
            { key: 'chaxunqishu', value: '查询期数' },
            { key: 'zhenrenshixun', value: '真人视讯' },
            { key: 'dianziyouxi', value: '电子游戏' },
            { key: 'qipaiyouxi', value: '棋牌游戏' },
            { key: 'caipiaoyouxi', value: '彩票游戏' },
            { key: 'vrcaipiao', value: 'VR彩票' },
            { key: 'tiyusaishi', value: '体育赛事' }
        ],
        gamePlatform: [
            { key: 'fucai3d', value: '福彩3D' },
            { key: 'kuaisu11', value: '快速11选5' },
            { key: 'kuaisuliuhecai', value: '快速六合彩' },
            { key: 'beijing3', value: '北京快3' },
            { key: 'gansu3', value: '甘肃快3' },
            { key: 'guangxi3', value: '广西快3' },
            { key: 'guizhou3', value: '贵州快3' },
            { key: 'saichepk', value: '快速赛车PK10' },
            { key: 'pcdandan', value: 'PC蛋蛋' },
            { key: 'jiangsu3', value: '江苏快3' },
            { key: 'hebei3', value: '河北快3' },
            { key: 'xingyunnongchang', value: '幸运农场' },
            { key: 'chongqingshishicai', value: '重庆时时彩' },
            { key: 'hubei3', value: '湖北快3' },
            { key: 'shanghai3', value: '上海快3' },
            { key: '5fenliuhecai', value: '5分六合彩' },
            { key: 'pailie3', value: '排列3' },
            { key: 'anhui3', value: '安徽快3' },
            { key: 'hunankuai10', value: '湖南快乐十分' },
            { key: 'xinjiangshishicai', value: '新疆时时彩' },
            { key: '3fensaichepk10', value: '3分赛车PK10' },
            { key: 'guangdong11', value: '广东11选5' },
            { key: 'jiangxi11', value: '江西11选5' },
            { key: 'xianggangliuhecai', value: '香港六合彩' },
            { key: 'jilin3', value: '吉林快3' },
            { key: 'shanghaishishile', value: '上海时时乐' },
            { key: 'tianjinshishicai', value: '天津时时彩' },
            { key: 'beijingsaichepk10', value: '北京赛车PK10' },
            { key: 'shanghai11', value: '上海11选5' },
            { key: 'kuaisu3', value: '快速快3' },
            { key: 'kuaisushishicai', value: '快速时时彩' },
            { key: 'xingyunfeiting', value: '幸运飞艇' },
            { key: 'shandong11', value: '山东11选5' },
            { key: '3fenshishicai', value: '3分时时彩' }
        ],
        platformReport: [{
                key: 'zhenrenshixun',
                value: '真人视讯',
                gameList: [
                    { title: 'BG视讯', value: 'BG' },
                    { title: '沙龙视讯', value: 'SL' },
                    { title: 'OG视讯', value: 'OG' },
                    { title: '欧博视讯', value: 'OB' },
                    { title: 'LMG视讯', value: 'LMG' },
                    { title: 'LEBO视讯', value: 'LEBO' },
                    { title: 'EBET视讯', value: 'EBET' },
                    { title: 'DG视讯', value: 'DG' },
                    { title: 'DS视讯', value: 'DS' },
                    { title: 'BBIN视讯', value: 'BBIN' },
                    { title: 'AG视讯', value: 'AG' }
                ]
            },
            {
                key: 'dianziyouxi',
                value: '电子游戏',
                gameList: [
                    { title: 'PT电子', value: 'PT' },
                    { title: '大满贯电子', value: 'ALL' },
                    { title: 'MG电子', value: 'MG' },
                    { title: 'AE电子', value: 'AE' },
                    { title: 'TTG电子', value: 'TTG' },
                    { title: 'DT电子', value: 'DT' },
                    { title: 'FG电子', value: 'FG' },
                    { title: 'CQ9电子', value: 'CQ9' },
                    { title: 'JDB电子', value: 'JDB' }
                ]
            },
            {
                key: 'qipaiyouxi',
                value: '棋牌游戏',
                gameList: [
                    { title: '开元棋牌', value: 'KY' }
                ]
            },
            {
                key: 'kuaisucaipiao',
                value: '快速彩票',
                gameList: [
                    { title: 'VR彩票', value: 'VR' }
                ]
            },
            {
                key: 'tiyusaishi',
                value: '体育赛事',
                gameList: [
                    { title: '皇冠体育', value: 'HG' },
                    { title: '沙巴体育', value: 'SB' }
                ]
            }
        ],
        payMethodsList: [
            { value: 'onlineBank', name: '网银在线' },
            { value: 'qqCode', name: '财付通扫码' },
            { value: 'qqOnline', name: 'QQ线上' },
            { value: 'apilyOnline', name: '支付宝线上' },
            { value: 'wallet', name: '银联钱包' },
            { value: 'wechatOnline', name: '微信线上' },
            { value: 'jdOnline', name: '京东线上' },
            { value: 'apilyCode', name: '支付宝扫码' },
            { value: 'union', name: '银联支付' },
            { value: 'wechatCode', name: '微信扫码' }
        ]
    }
}