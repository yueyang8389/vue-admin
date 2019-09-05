import axios from '@/libs/api.request'

export const getMemberTableData = () => {
    return axios.request({
        url: 'get_table_data',
        method: 'get'
    })
}
export const memberLevelData = () => {
    return axios.request({
        url: 'member_level_data',
        method: 'get'
    })
}

export const getSiteLevelData = () => {
    return axios.request({
        url: 'get_sitelevel_data',
        method: 'get'
    })
}

export const getCommonLevelData = () => {
    return axios.request({
        url: 'get_commomlevel_data',
        method: 'get'
    })
}

export const getMemberBonusData = () => {
    return axios.request({
        url: 'get_memberbonus_data',
        method: 'get'
    })
}

export const getMemberLog = () => {
    return axios.request({
        url: 'get_member_log',
        method: 'get'
    })
}

export const getMemberLoginLog = () => {
    return axios.request({
        url: 'get_memberlogin_log',
        method: 'get'
    })
}

export const getMemberFundsLog = () => {
    return axios.request({
        url: 'get_memberfunds_log',
        method: 'get'
    })
}

export const getMemberBank = () => {
    return axios.request({
        url: 'get_member_bank',
        method: 'get'
    })
}
export const memberLevelModify = () => {
    return axios.request({
        url: 'get_member_level_modify',
        method: 'get'
    })
}
export const payOnlineData = () => {
    return axios.request({
        url: 'get_pay_online',
        method: 'get'
    })
}
export const payCompanyData = () => {
    return axios.request({
        url: 'get_pay_company',
        method: 'get'
    })
}
export const withdrawalsOnlineData = () => {
    return axios.request({
        url: 'get_withdraws_online',
        method: 'get'
    })
}
export const accountsRecordData = () => {
    return axios.request({
        url: 'get_accounts_record',
        method: 'get'
    })
}
export const preferentialRecordData = () => {
    return axios.request({
        url: 'get_preferential_record',
        method: 'get'
    })
}
export const financeSummaryData = () => {
    return axios.request({
        url: 'get_finance_summary_data',
        method: 'get'
    })
}
export const paymentGroupsData = () => {
    return axios.request({
        url: 'get_pay_groups',
        method: 'get'
    })
}
export const paymentManagerData1 = () => {
    return axios.request({
        url: 'get_pay_manager1',
        method: 'get'
    })
}
export const paymentManagerData2 = () => {
    return axios.request({
        url: 'get_pay_manager2',
        method: 'get'
    })
}
export const gamesTransferData = () => {
    return axios.request({
        url: 'get_games_transfer',
        method: 'get'
    })
}
export const cardManagementData = () => {
    return axios.request({
        url: 'get_card_management',
        method: 'get'
    })
}
export const alipayScanData = () => {
    return axios.request({
        url: 'get_alipay_scan',
        method: 'get'
    })
}
export const wechatScanData = () => {
    return axios.request({
        url: 'get_wechat_scan',
        method: 'get'
    })
}
export const qqScanData = () => {
    return axios.request({
        url: 'get_qq_scan',
        method: 'get'
    })
}
export const agencySearchData = () => {
    return axios.request({
        url: 'get_agency_search',
        method: 'get'
    })
}
export const agencyDomainData = () => {
    return axios.request({
        url: 'get_agency_domain',
        method: 'get'
    })
}
export const agencyLevelData = () => {
    return axios.request({
        url: 'get_agency_level',
        method: 'get'
    })
}
export const agencyDividendData = () => {
    return axios.request({
        url: 'get_agency_dividend',
        method: 'get'
    })
}
export const agencyUnderlingData = () => {
    return axios.request({
        url: 'get_agency_underling',
        method: 'get'
    })
}
export const agencyReportData = () => {
    return axios.request({
        url: 'get_agency_report',
        method: 'get'
    })
}
export const checkSubordinate = () => {
    return axios.request({
        url: 'get_check_subordinate',
        method: 'get'
    })
}
export const currentLotteryData = () => {
    return axios.request({
        url: 'get_current_lottery',
        method: 'get'
    })
}
export const lotteryManagementData = () => {
    return axios.request({
        url: 'get_lottery_management',
        method: 'get'
    })
}
export const lotterySettingData = () => {
    return axios.request({
        url: 'get_lottery_setting',
        method: 'get'
    })
}
export const oddsSettingData = () => {
    return axios.request({
        url: 'get_odds_setting',
        method: 'get'
    })
}
export const markTimeSettingData = () => {
    return axios.request({
        url: 'get_mark_time_setting',
        method: 'get'
    })
}
export const timeSetting = () => {
    return axios.request({
        url: 'get_time_setting',
        method: 'get'
    })
}
export const fastCaipiao = () => {
    return axios.request({
        url: 'get_fast_caipiao',
        method: 'get'
    })
}
export const lotteryDetails = () => {
    return axios.request({
        url: 'get_lottery_details',
        method: 'get'
    })
}

export const lotteryBlackData = () => {
    return axios.request({
        url: 'get_lottery_quick',
        method: 'get'
    })
}

export const reportTotalData = () => {
    return axios.request({
        url: 'get_report_total',
        method: 'get'
    })
}

export const firstReportData = () => {
    return axios.request({
        url: 'get_first_report',
        method: 'get'
    })
}

export const memberReportData = () => {
    return axios.request({
        url: 'get_member_report',
        method: 'get'
    })
}

export const lotteryReportData = () => {
    return axios.request({
        url: 'get_lottery_report',
        method: 'get'
    })
}

export const lotteryReportDetailData = () => {
    return axios.request({
        url: 'get_lottery_detail',
        method: 'get'
    })
}

export const memberGameRecordData = () => {
    return axios.request({
        url: 'get_member_game_record',
        method: 'get'
    })
}

export const platformReportData = () => {
    return axios.request({
        url: 'get_platform_report',
        method: 'get'
    })
}

export const gameRecordData = () => {
    return axios.request({
        url: 'get_game_record',
        method: 'get'
    })
}

export const addCodeDetailData = () => {
    return axios.request({
        url: 'get_add_code_detail',
        method: 'get'
    })
}