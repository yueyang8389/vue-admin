// 列表页的mixns
const listMixins = {
  data () {
    return {
      allSiteList: []
    }
  },
  created () {
    this.fetchSiteList()
  },
  methods: {
    onPageSizeChange(count) {},
  }
}

export default listMixins
