<template>
  <AutoComplete
    :disabled="disabled"
    :clearable="clearable"
    :style="_width"
    :placeholder="placeholder"
    v-model="value"
    @on-focus="tip=0"
    @on-blur="onBlur"
    @on-select="onSelect"
    @on-search="onSearch"
    :key="0"
  >
    <Option
      v-for="(item,index) in data"
      :value="item[key]"
      :key="index"
    >{{ item[key] }}</Option>
    <div
      class="tip"
      v-if="tip===0"
    >请输入您要查询的内容</div>
    <div
      class="tip"
      v-else-if="tip===1"
    >搜索中...</div>
    <div
      class="tip"
      v-else-if="tip===2"
    >搜索完成</div>
    <div
      class="tip error"
      v-else-if="tip===3"
    >搜索结果不存在!</div>

  </AutoComplete>
</template>

<script>
export default {
  props: {
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
      default: "请输入，可自动搜索"
    },
    width: {
      type: [String, Number],
      default: 260
    },
    data: {
      type: [Array, Object],
      default: []
    },
    key: {
      type: String
    },
    http: {
      type: Function,
      default: () => {}
    },
    doSomeThing: {
      type: Function,
      default: () => {}
    }
  },
  data() {
    return {
      value: "",
      tip: 0
    };
  },
  computed: {
    _width() {
      return "width:" + this.width + "px";
    }
  },
  methods: {
    onBlur() {
      this.$tip.info({ content: "搜索结果不存在!" });
    },
    onSearch() {
      this.tip = 1;
      this.http().then(res => {
        if (res.data.length) {
          this.tip = 2;
          this.doSomeThing();
        } else {
          this.tip = 3;
        }
      });
    },
    onSelect() {}
  }
};
</script>
<style lang="less" scoped>
.tip {
  text-align: center;
  &.error {
    color: #ed3f14;
  }
}
</style>
