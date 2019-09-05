<template>
  <div>
    <Form ref="domainInfo" :model="domainInfo" :rules="domainInfoRulesValidate">
      <FormItem label="代理账号">
        <Input v-model="domainInfo.account" disabled class="w260x" :label-width="100"/>
      </FormItem>
      <FormItem label="代理类型">
        <Input v-model="domainInfo.type" disabled class="w260x"/>
      </FormItem>
      <FormItem label="代理网址" prop="url">
        <Input v-model="domainInfo.url" type="textarea" class="w260x" :rows="4"/>
      </FormItem>
    <div>
      <div style="marginTop:80px;">
        <rebate-select></rebate-select>
        <refund-select></refund-select>
      </div>
    </div>
    <FormItem>
      <Button class="mt15 ivu-btn save" @click="save">确认保存</Button>
    </FormItem>
    </Form>
  </div>
</template>
<script>
import "@/store";
import Icons from "@/components/icons";
import RefundSelect from "@/components/refund-select";
import RebateSelect from "@/components/rebate-select";
export default {
  name: "domainEdit",
  components: {
    Icons,
    RefundSelect,
    RebateSelect
  },
  data() {
    return {
      domainInfo: {
        account: this.$route.query.account,
        type: this.$route.query.type ? "大股东" : "1级代理",
        url: this.$route.query.url
      },
      domainInfoRulesValidate: {
        url: [
          {
            required: true,
            message: "请输入网址",
            trigger: "blur"
          }
        ]
      },
      open: false,
      fd_type: "liuhecai",
      fs_type: "zhenrenshixun",
      fd_setting: {},
      fs_setting: {},
      fdData: [],
      fsData: []
    };
  },
  methods:{
    save() {
      this.$Tip.success({
        content:'编辑域名成功',
        onOk:() => {
          this.$router.go(-1);
        }
      })
    }
  }
};
</script>
<style lang="less" scoped>
@import '../../styles/button.less';
.w260x {
  width: 260px;
  height: 36px;
}
</style>


