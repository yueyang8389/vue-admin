<template>
  <div>
    <Select
      v-if="mode=='单选'"
      v-model="singleData.siteId"
      :clearable="clearable"
      :disabled="disabled"
      :placeholder="placeholder"
      :style="_width"
    >
      <Option
        v-for="(item,i) in siteIdList"
        :value="item.siteId"
        :key="i"
      >{{ item.siteName }}</Option>
    </Select>
    <Select
      v-else
      multiple
      v-model="multipleData.siteId"
      :disabled="disabled"
      :clearable="clearable"
      :placeholder="placeholder"
      :style="_width"
    >
      <Option
        v-for="item in siteIdList"
        :value="item.siteId"
        :key="item.siteId"
      >{{ item.siteName }}</Option>
    </Select>
  </div>
</template>

<script>
export default {
  props: {
    mode: {
      type: String,
      default: "单选"
    },
    disabled: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: "请选择"
    },
    width: {
      type: [String, Number],
      default: 260
    }
  },
  computed: {
    _width() {
      return "width:" + this.width + "px";
    }
  },
  data() {
    return {
      singleData: {
        siteId: null
      },
      multipleData: {
        siteId: []
      },
      siteIdList: []
    };
  },
  watch: {
    singleData: {
      handler(val, oldVal) {
        this.singleChange(val);
      },
      deep: true
    },
    multipleData: {
      handler(val, oldVal) {
        this.multipleChange(val);
      },
      deep: true
    }
  },
  created() {
    this.$nextTick(() => {
      this.getSiteListFromRoot();
    });
  },
  methods: {
    getSiteListFromRoot() {
      if (this.$root.allSiteList) {
        this.siteIdList = this.$root.allSiteList;
        this.init();
      }
    },
    async setDefaultSite(siteId) {
      // 如果跳转页面需要同步站点可以异步调用这个方法
      if (this.mode === "单选") {
        this.singleData.siteId = siteId;
      } else {
        this.multipleData.siteId = siteId;
      }
    },
    async init() {
      //初始化默认站点,多选不需要(创建管理员)
      //编辑时不需要默认第一个站点,只需调用setDefaultSite方法即可，以减少因为站点变化发起的请求
      if (this.mode === "单选") {
        this.singleData.siteId = this.siteIdList[0].siteId;
      }
    },
    async sendSiteList() {
      // 如其他页面需要站点数据，可直接调用该方法，减少请求数据，如站点列表页面
      return this.siteIdList;
    },
    singleChange(val) {
      let data = { ...this.singleData };
      this.siteIdList.forEach(s => {
        if (s.siteId == val.siteId) {
          data.siteName = s.siteName;
        }
      });
      this.$emit("on-site-change", data);
    },
    multipleChange(val) {
      let data = { ...this.multipleData };
      data.siteName = [];
      this.siteIdList.forEach(s => {
        data.siteId &&
          data.siteId.forEach(v => {
            if (s.siteId == v) {
              data.siteName.push(s.siteName);
            }
          });
      });
      this.$emit("on-site-change", data);
    }
  }
};
</script>