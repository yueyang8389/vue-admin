import { getSiteData } from '../api/global'
// 根节点的mixns
const rootMixins = {
  data () {
    return {
      allSiteList: []
    }
  },
  created () {
    this.fetchSiteList()
  },
  methods: {
    fetchSiteList () {
      getSiteData().then(res => {
        this.allSiteList = res.data
      })
    }
  }
}

export default rootMixins
