import Mock from 'mockjs'
import {
    getMemberTableData,
    memberLevelData,
    getSiteData,
    getSiteLevelData,
    getCommonLevelData,
    getMemberBonusData,
    getMemberLog,
    getMemberLoginLog,
    getMemberFundsLog,
    getMemberBank,
    memberLevelModify,
    payOnlineData,
    payCompanyData,
    withdrawalsOnlineData,
    accountsRecordData,
    preferentialRecordData,
    financeSummaryData,
    paymentGroupsData,
    paymentManagerData1,
    paymentManagerData2,
    gamesTransferData,
    cardManagementData,
    alipayScanData,
    wechatScanData,
    qqScanData,
    agencySearchData,
    agencyDomainData,
    agencyLevelData,
    agencyDividendData,
    agencyUnderlingData,
    agencyReportData,
    checkSubordinate,
    currentLotteryData,
    lotteryManagementData,
    lotterySettingData,
    oddsSettingData,
    markTimeSettingData,
    timeSetting,
    fastCaipiao,
    lotteryDetails,
    lotteryBlackData,
    memberReportData,
    lotteryReportData,
    lotteryReportDetailData,
    memberGameRecordData,
    platformReportData,
    reportTotalData,
    reportTotalingData,
    firstReportData,
    gameRecordData,
    addCodeDetailData,
    getTodayReport,
    getSevenDaysReport
} from './data'
import {
    login,
    logout,
    getUserInfo
} from './login'

Mock.mock(/\/get_table_data/, getMemberTableData)
Mock.mock(/\/member_level_data/, memberLevelData)
Mock.mock(/\/login/, login)
Mock.mock(/\/get_info/, getUserInfo)
Mock.mock(/\/logout/, logout)
Mock.mock(/\/get_site_data/, getSiteData)
Mock.mock(/\/get_sitelevel_data/, getSiteLevelData)
Mock.mock(/\/get_commonlevel_data/, getCommonLevelData)
Mock.mock(/\/get_memberbonus_data/, getMemberBonusData)
Mock.mock(/\/get_member_log/, getMemberLog)
Mock.mock(/\/get_memberlogin_log/, getMemberLoginLog)
Mock.mock(/\/get_memberfunds_log/, getMemberFundsLog)
Mock.mock(/\/get_member_bank/, getMemberBank)
Mock.mock(/\/get_member_level_modify/, memberLevelModify)
Mock.mock(/\/get_pay_online/, payOnlineData)
Mock.mock(/\/get_pay_company/, payCompanyData)
Mock.mock(/\/get_withdraws_online/, withdrawalsOnlineData)
Mock.mock(/\/get_accounts_record/, accountsRecordData)
Mock.mock(/\/get_preferential_record/, preferentialRecordData)
Mock.mock(/\/get_finance_summary_data/, financeSummaryData)
Mock.mock(/\/get_pay_groups/, paymentGroupsData)
Mock.mock(/\/get_pay_manager1/, paymentManagerData1)
Mock.mock(/\/get_pay_manager2/, paymentManagerData2)
Mock.mock(/\/get_games_transfer/, gamesTransferData)
Mock.mock(/\/get_card_management/, cardManagementData)
Mock.mock(/\/get_alipay_scan/, alipayScanData)
Mock.mock(/\/get_wechat_scan/, wechatScanData)
Mock.mock(/\/get_qq_scan/, qqScanData)
Mock.mock(/\/get_agency_search/, agencySearchData)
Mock.mock(/\/get_agency_domain/, agencyDomainData)
Mock.mock(/\/get_agency_level/, agencyLevelData)
Mock.mock(/\/get_agency_dividend/, agencyDividendData)
Mock.mock(/\/get_agency_underling/, agencyUnderlingData)
Mock.mock(/\/get_agency_report/, agencyReportData)
Mock.mock(/\/get_check_subordinate/, checkSubordinate)
Mock.mock(/\/get_current_lottery/, currentLotteryData)
Mock.mock(/\/get_lottery_management/, lotteryManagementData)
Mock.mock(/\/get_lottery_setting/, lotterySettingData)
Mock.mock(/\/get_odds_setting/, oddsSettingData)
Mock.mock(/\/get_mark_time_setting/, markTimeSettingData)
Mock.mock(/\/get_time_setting/, timeSetting)
Mock.mock(/\/get_fast_caipiao/, fastCaipiao)
Mock.mock(/\/get_lottery_details/, lotteryDetails)
Mock.mock(/\/get_lottery_quick/, lotteryBlackData)
Mock.mock(/\/get_report_total/, reportTotalData)
Mock.mock(/\/get_first_report/, firstReportData)

Mock.mock(/\/get_member_report/, memberReportData)
Mock.mock(/\/get_lottery_report/, lotteryReportData)
Mock.mock(/\/get_lottery_detail/, lotteryReportDetailData)
Mock.mock(/\/get_member_game_record/, memberGameRecordData)
Mock.mock(/\/get_platform_report/, platformReportData)
Mock.mock(/\/get_game_record/, gameRecordData)
Mock.mock(/\/get_add_code_detail/, addCodeDetailData)

Mock.mock(/\/get_today_report/, getTodayReport)
Mock.mock(/\/get_seven_days_report/, getSevenDaysReport)

Mock.mock(/\/get_reportTotaling_children/, reportTotalingData)

// Mock.mock(/\/get_reportTotalGame_children/, reportTotalGameData)

export default Mock