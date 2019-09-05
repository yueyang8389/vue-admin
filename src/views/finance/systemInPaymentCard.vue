<template>
  <div>
    <div class="v2-search">
      <Form ref="searchKey" inline>
        <FormItem label="等级" class="ml20">
          <Select clearable class="s-86" v-model="searchKey.level">
            <Option v-for="(item,index) in level" :key="index" :value="item.value">{{item.label}}</Option>
          </Select>
        </FormItem>
        <FormItem label="状态" class="ml20">
          <Select clearable class="s-86" v-model="searchKey.status">
            <Option value="open">正常</Option>
            <Option value="close">停用</Option>
          </Select>
        </FormItem>
        <FormItem class="ml20">
          <Button type="primary" class="search" @click="searchSubmit">查询</Button>
        </FormItem>
      </Form>
    </div>
    <div class="v2-button">
      <Button @click="() => {this.$router.push({name:'addCard'})}">新增入款卡</Button>
    </div>
    <div class="v2-search">
      <ButtonGroup class="status-button mb20">
        <Button
          @click="() => {this.type = 'bank'}"
          :class="type == 'bank' ? 'active' : ''"
          style="width:120px;"
        >银行卡管理</Button>
        <Button
          @click="() => {this.type = 'apily'}"
          :class="type == 'apily' ? 'active' : ''"
          style="width:120px;"
        >支付宝扫码</Button>
        <Button
          @click="() => {this.type = 'wechat'}"
          :class="type == 'wechat' ? 'active' : ''"
          style="width:120px;"
        >微信扫码</Button>
        <Button
          @click="() => {this.type = 'qq'}"
          :class="type == 'qq' ? 'active' : ''"
          style="width:120px;"
        >财富通扫码</Button>
      </ButtonGroup>
      <card-management :title="cardManagement" v-if="type == 'bank'"></card-management>
      <alipay-scan :title="apilyScan" v-else-if="type == 'apily'"></alipay-scan>
      <wechat-scan :title="wechatScan" v-else-if="type == 'wechat'"></wechat-scan>
      <qq-scan :title="qqScan" v-else></qq-scan>
    </div>
  </div>
</template>
<script>
import Tables from "@/components/tables";
import cardManagement from "./components/cardManagement";
import alipayScan from "./components/alipayScan";
import wechatScan from "./components/wechatScan";
import qqScan from "./components/qqScan";
export default {
  name: "systemInPaymentCard",
  components: {
    Tables,
    cardManagement,
    alipayScan,
    wechatScan,
    qqScan
  },
  data() {
    return {
      status: false,
      type: "bank",
      searchKey: {},
      cardManagement: "入款卡管理",
      apilyScan: "支付宝扫码",
      wechatScan: "微信扫码",
      qqScan: "财付通扫码",
      addCard: "新增入款卡",
      level: [
        { value: "one", label: "初级" },
        { value: "two", label: "等级二" },
        { value: "three", label: "等级三" },
        { value: "four", label: "等级四" },
        { value: "five", label: "等级五" }
      ]
    };
  },
  methods: {
    addCardFn() {
      this.$$refs.addCardInfo.show();
    },
    searchSubmit() {}
  }
};
</script>
<style lang="less" scoped>
@import "../../styles/button.less";
</style>


