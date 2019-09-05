<template>
  <Form ref="addPayment" :label-width="80" class="mt10">
    <FormItem label="支付平台">
      <Button class="pingtai">{{this.$route.query.platform}}</Button>
    </FormItem>
    <FormItem label="平台编号">
      <Input v-model="platform.num" class="w360"/>
    </FormItem>
    <FormItem label="支付公钥">
      <Upload action="//jsonplaceholder.typicode.com/posts/" v-model="platform.gongyao">
        <Button class="gongyao">选择文件</Button>
        <span class="exit">23.txt</span>
        <span class="yiyou">公钥2.txt</span>
      </Upload>
    </FormItem>
    <FormItem label="支付私钥">
      <Upload action="//jsonplaceholder.typicode.com/posts/" v-model="platform.siyao">
        <Button class="gongyao">选择文件</Button>
        <span class="exit">ksmdk.txt</span>
        <span class="yiyou">key.pem</span>
      </Upload>
    </FormItem>
    <FormItem label="支付密钥">
      <Input class="w360" v-model="platform.miyao"/>
    </FormItem>
    <FormItem label="支付方式">
      <paymentRadio class='w360' :methodsList='platformMethods' :defaultChecked='platform.method'></paymentRadio>
    </FormItem>
    <FormItem label="支付域名">
      <Input v-model="platform.domain" class="w360"/>
    </FormItem>
    <FormItem label="支付状态">
      <Select v-model="platform.status" class="w360">
        <Option value="success">支付成功</Option>
        <Option value="fail">支付失败</Option>
      </Select>
    </FormItem>
    <FormItem label="银行编码">
      <Input
        class="w360"
        :rows="4"
        type="textarea"
        placeholder="请输入银行编码"
        v-model="platform.bankNum"
      />
    </FormItem>
    <FormItem label="备注信息" class="w80x">
      <Input
        type="textarea"
        class="w360"
        :rows="4"
        v-model="platform.remark"
        placeholder="此栏位仅供管理者记录其他资讯，会员无法检视"
      />
    </FormItem>
    <FormItem>
      <Button class="ivu-btn h50 w360x blueBg ft20  white-font" @click="add">确认添加</Button>
    </FormItem> 
  </Form>
</template>
<script>
import paymentRadio from "./components/payment-radio-group";
export default {
  name: "editPayment",
  components: {
    paymentRadio
  },
  data() {
    return {
      platform: {
        domain: "sdxasdasx.com",  //域名
        num: this.$route.query.id,  //平台标号
        status: this.$route.query.status ? "success" : "fail", //支付状态
        method: "zhifubao" //默认支付方式
      },
      platformMethods:[
        {value:'zhifubao',name:'支付宝线上'},
        {value:'wangyin',name:'网银在线'},
        {value:'test1',name:'支付测试1'},
        {value:'test2',name:'支付测试2'}
      ]
    };
  },
  methods: {
    add() {
      this.$Tip.success({
        content: "修改支付平台成功",
        onOk: () => {
          this.$router.go(-1);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../styles/button.less";
@import "../../styles/class.less";
.w360 {
  width: 360px;
}
.pingtai {
  width: 80px;
  height: 36px;
  background: #f5f5f5;
  border-radius: 5px;
}
.gongyao {
  width: 80px;
  height: 36px;
  border: 1px solid #62b1fd;
  border-radius: 5px;
  font-size: 14px;
  color: #62b1fd;
  text-align: center;
}
.yiyou {
  width: 57px;
  height: 14px;
  font-size: 14px;
  font-weight: 400;
  color: #c3c3c3;
  padding-left: 20px;
}
.guding {
  width: 250px;
  height: 36px;
  border-radius: 5px;
}
.limit {
  width: 80px;
  height: 36px;
  border-radius: 5px;
}
.exit {
  width: 37px;
  height: 12px;
  font-size: 14px;
  font-weight: 400;
  color: #808080;
  padding-left: 20px;
}
</style>


