<template>
  <div>
    <Form ref="domainAdd" :model="domainInfo" :label-width="90" :rules="domainInfoRulesValidate">
      <FormItem label="域名类型">
        <Select v-model="domainInfo.type" class="w260x" clearable>
          <Option value="agency">代理域名</Option>
          <Option value="stock">大股东域名</Option>
        </Select>
      </FormItem>
      <FormItem label="代理账号" prop="account">
        <Input v-model="domainInfo.account" placeholder="代理账号，默认查询" class="w260x"/>
      </FormItem>
      <FormItem label="域名" prop="domain">
        <Input
          type="textarea"
          :rows="6"
          class="w260x"
          placeholder="可批量添加，用英文;隔开  如：xxx.com;yyy.com"
          v-model="domainInfo.domain"
        />
      </FormItem>
      <FormItem label="状态" v-show="domainInfo.type == 'agency'">
        <Select v-model="domainInfo.status" class="w260x">
          <Option value="ok">正常</Option>
          <Option value="no">停用</Option>
        </Select>
      </FormItem>
      <rebate-select v-show="domainInfo.type == 'agency'"></rebate-select>
      <refund-select v-show="domainInfo.type == 'agency'"></refund-select>
      <FormItem>
        <Button class="ivu-btn submit bg mt15" @click="add">确认添加</Button>
      </FormItem>
    </Form>
    <!-- <div v-if="domainInfo.type == 'agency'">
      <rebate-select></rebate-select>
      <refund-select></refund-select>
    </div>
    <div class='mt20'>
      <Button class="ivu-btn submit bg" @click="add">确认添加</Button>
    </div> -->
  </div>
</template>
<script>
import rebateSelect from "@/components/rebate-select";
import refundSelect from "@/components/refund-select";
export default {
  name: "domainAdd",
  components: {
    rebateSelect,
    refundSelect
  },
  data() {
    return {
      domainInfo: {},
      domainInfoRulesValidate: {
        account: [
          {
            required: true,
            message: "请输入代理账号",
            trigger: "blur"
          }
        ],
        domain: [
          {
            required: true,
            message: "请输入网址",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    add() {
      if (this.domainInfo.type == "agency") {
        this.$Tip.success({
          content: "添加代理域名成功",
          onOk: () => {
            this.$router.go(-1);
          }
        });
      } else if (this.domainInfo.type == "stock") {
        this.$Tip.success({
          content: "添加大股东域名成功",
          onOk: () => {
            this.$router.go(-1);
          }
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../styles/button.less";

</style>


