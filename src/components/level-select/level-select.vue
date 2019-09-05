<template>
  <div>
    <div v-if="mode==='单选'">
      <Select
        v-if="levelType"
        :clearable="clearable"
        :disabled="disabled"
        :style="_width"
        :placeholder="placeholder"
        :class="className"
        v-model="singleData.siteLevelData.levelId"
      >
        <Option
          v-for="(item, i) in levelList"
          :key="i"
          :value="item.levelId"
        >{{item.levelAlias}}</Option>
      </Select>
      <Select
        v-else
        clearable
        :disabled="disabled"
        :style="_width"
        :placeholder="placeholder"
        :class="className"
        v-model="singleData.commonLevelData.levelId"
      >
        <Option
          v-for="(item, i) in levelList"
          :key="i"
          :value="item.id"
        >{{item.levelName}}</Option>
      </Select>
    </div>
    <div v-else>
      <Select
        v-if="levelType"
        clearable
        multiple
        :disabled="disabled"
        :style="_width"
        :placeholder="placeholder"
        :class="className"
        v-model="multipleData.siteLevelData.levelId"
      >
        <Option
          v-for="(item, i) in levelList"
          :key="i"
          :value="item.levelId"
        >{{item.levelAlias}}</Option>
      </Select>
      <Select
        v-else
        clearable
        multiple
        :disabled="disabled"
        :style="_width"
        :placeholder="placeholder"
        :class="className"
        v-model="multipleData.commonLevelData.levelId"
      >
        <Option
          v-for="(item, i) in levelList"
          :key="i"
          :value="item.id"
        >{{item.levelName}}</Option>
      </Select>
    </div>
  </div>
</template>
<script>
import { getSiteLevelData, getCommonLevelData } from "@/api/data";
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
    },
    levelType: {
      type: String,
      default: "siteLevel" // siteLevel || commonLevel
    },
    className: {
      type: String
    }
  },
  data() {
    return {
      singleData: {
        siteLevelData: {
          levelId: ""
        },
        commonLevelData: {
          levelId: ""
        }
      },
      multipleData: {
        siteLevelData: {
          levelId: []
        },
        commonLevelData: {
          levelId: []
        }
      },
      levelList: []
    };
  },
  computed: {
    _width() {
      return "width:" + this.width + "px";
    }
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
  methods: {
    async setDefaultLevel(levelId, levelName) {
      // 如果跳转页面需要同步等级可以异步调用这个方法
      if (this.mode === "单选") {
        if (this.levelType === "siteLevel") {
          this.singleData.siteLevelData.levelId = levelId;
          this.singleData.siteLevelData.levelName = levelName;
        } else {
          this.singleData.commonLevelData.levelId = levelId;
          this.singleData.commonLevelData.levelName = levelName;
        }
      } else {
        if (this.levelType === "siteLevel") {
          this.multipleData.siteLevelData.levelId = levelId;
        } else {
          this.multipleData.commonLevelData.levelId = levelId;
        }
      }
    },
    init() {
      // 初始化设置默认值
      if (this.mode === "单选") {
        if (this.levelType === "siteLevel") {
          this.singleData.siteLevelData.levelId = this.levelList[0].levelId;
        } else {
          this.singleData.commonLevelData.levelId = this.levelList[0].id;
        }
      }
    },
    singleChange(val) {
      let data = { ...this.singleData };
      if (this.levelType === "siteLevel") {
        this.levelList.forEach(le => {
          if (val.siteLevelData.levelId == le.levelId) {
            data.siteLevelData.levleAlias = le.levelAlias;
            data.siteLevelData.levelName = le.levelName;
          }
        });
        this.$emit("on-level-change", data.siteLevelData);
      } else {
        this.levelList.forEach(le => {
          if (val.commonLevelData.levelId == le.id) {
            data.commonLevelData.levelName = le.levelName;
          }
        });
        this.$emit("on-level-change", data.commonLevelData);
      }
    },
    multipleChange(val) {
      let data = { ...this.multipleData };
      if (this.levelType === "siteLevel") {
        data.siteLevelData.levleAlias = [];
        data.siteLevelData.levelName = [];
        this.levelList.forEach(le => {
          data.siteLevelData.levelId &&
            data.siteLevelData.levelId.forEach(dle => {
              if (dle == le.levelId) {
                data.siteLevelData.levleAlias.push(le.levelAlias);
                data.siteLevelData.levelName.push(le.levelName);
              }
            });
        });
        this.$emit("on-level-change", data.siteLevelData);
      } else {
        data.commonLevelData.levelName = [];
        this.levelList.forEach(le => {
          data.commonLevelData.levelId &&
            data.commonLevelData.levelId.forEach(dle => {
              if (dle == le.levelId) {
                data.commonLevelData.levelName.push(le.levelName);
              }
            });
        });
        this.$emit("on-level-change", data.commonLevelData);
      }
    },
    async getSiteLevel(id, type) {
      // let params = {
      //   siteId: [id],
      //   type
      // };
      getSiteLevelData().then(res => {
        this.levelList = res.data;
      });
    },
    async getCommonLevel() {
      getCommonLevelData().then(res => {
        this.levelList = res.data;
      });
    }
  }
};
</script>