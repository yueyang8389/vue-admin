import axios from '@/libs/api.request'

export const getSiteData = () => {
  return axios.request({
    url: 'get_site_data',
    method: 'get'
  })
}
