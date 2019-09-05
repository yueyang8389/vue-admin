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
