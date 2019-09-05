<template>
  <div class="v2-details">
    <div class="items mt15">
      <div class="title">个人信息</div>
      <div class="section br flex-row">
        <div class="row ti20 btl w25">
          <div class="col bb">会员账号：1234567890</div>
          <div class="col bb">上级代理：1234567</div>
          <div class="col bb">会员等级：第八层</div>
          <div class="col bb">登录时间：2018-10-17 19：51：12</div>
        </div>
        <div class="row ti20 btl w20">
          <div class="col bb">真实姓名：暂无信息</div>
          <div class="col bb">手机号码：13709090909</div>
          <div class="col bb">邮箱账号：暂无信息</div>
          <div class="col bb">微信账号：暂无信息</div>
        </div>
        <div class="row ti20 btl w20">
          <div class="col bb">存款总额：10000.00</div>
          <div class="col bb">公司入款：10000.00</div>
          <div class="col bb">线上支付：0.00</div>
          <div class="col bb">存款大笔：6000.00</div>
        </div>
        <div class="row ti20 btl w20">
          <div class="col bb">提款总额：1000.00</div>
          <div class="col bb">有效投注：1000.00</div>
          <div class="col bb">会员报表：1000.00</div>
          <div class="col bb">现金报表：1000.00</div>
        </div>
        <div class="row ti20 btl w20">
          <div class="col bb">视讯金管家：0级</div>
          <div class="col bb">棋牌金管家：0级</div>
          <div class="col bb">电子金管家：10级</div>
          <div class="col bb">彩票金管家：10级</div>
        </div>
        <div class="row ti20 btl w20">
          <div class="col bb">返水金额：10000.00</div>
          <div class="col bb">优惠金额：100.00</div>
          <div class="col bb">
            历史登录：
            <a class="blue-font" @click="loginHistory">历史登陆</a>
          </div>
          <div class="col bb">注册IP：116.93.32.119</div>
        </div>
      </div>
      <div class="remarks ti20 bl br bb">备注：暂无信息</div>
    </div>
    <div class="items mt15">
      <div class="title">银行信息</div>
      <div class="section gray-bg  clearfix pt15 pb15 pl4">
        <div >
        <!-- 一 -->
        <div class="bank-card fl ml10">
          <Icons type="morenyinhangqia"  class="morenyinhangqia" size="50" color="#62B1FD"></Icons>
          <div class="bank-name clearfix">
            <Icons class="logo fl ml5"  type="zhongguoyinhang" size="40" color="#c22527"></Icons>
            <div class="fl">
              <div class="name ft20 pl20">中国银行</div>
              <div class="address gray-font pl20">广东省 深圳市</div>
            </div>
          </div>
          <div class="bank-num">
            <div class="num ml5 ft18 g66Color">1234 2456 8900 1345 123</div>
            <div class="real-name gray-font ml5">一修</div>
          </div>
        </div>
         <!-- 二 -->
        <div class="bank-card fl ml10">
          <div class="bank-name clearfix">
            <Icons class="logo fl ml5" type="zhongguoyinhang" size="40" color="#c22527"></Icons>
            <div class="fl">
              <div class="name ft20 pl20">中国银行</div>
              <div class="address gray-font pl20">广东省 深圳市</div>
            </div>
          </div>
          <div class="bank-num ">
            <div class="ft18 ml5 g66Color">1234 2456 8900 1345 123</div>
            <div class="gray-font ml5">一修</div>
          </div>
        </div>
        <!-- 三 -->
        <div class="bank-card fl ml10">
          <div class="bank-name clearfix">
            <Icons class="logo fl ml5" type="zhongguoyinhang" size="40" color="#c22527"></Icons>
            <div class="fl">
              <div class="name ft20 pl20">中国银行</div>
              <div class="address gray-font pl20">广东省 深圳市</div>
            </div>
          </div>
          <div class="bank-num">
            <div class="num ml5 ft18 g66Color">1234 2456 8900 1345 123</div>
            <div class="real-name gray-font ml5">一修</div>
          </div>
        </div>
        <!-- 四 -->
        <div class="bank-card fl ml10">
          <div class="bank-name clearfix">
            <Icons class="logo fl ml5" type="zhongguoyinhang" size="40" color="#c22527"></Icons>
            <div class="fl">
              <div class="ft20 pl20">中国银行</div>
              <div class="ft13 gray-font pl20">广东省 深圳市</div>
            </div>
          </div>
          <div class="bank-num">
            <div class="num ml5 ft18 g66Color">1234 2456 8900 1345 123</div>
            <div class="real-name gray-font ml5">一修</div>
          </div>
        </div>
        </div>

      </div>
    </div>
    <div class="items mt15">
      <collapse simple value="1">
        <panel name="1" :hide-arrow="true">
          <div class="title" @click="open=!open">返点信息
            <Icons v-show="!open" type="gengduoshouqi" size="15" color="#999"></Icons>
            <Icons v-show="open" type="gengduo" size="15" color="#999"></Icons>
          </div>
          <div class="section gray-bg p15" slot="content">
            <div class="btns">
              <Button class="lottery mr20">六合彩</Button>
              <Button class="lottery mr20">PK10</Button>
              <Button class="lottery mr20">时时彩</Button>
              <Button class="lottery mr20">快乐十分</Button>
              <Button class="lottery mr20">11选5</Button>
              <Button class="lottery mr20">快3</Button>
              <Button class="lottery mr20">PC蛋蛋</Button>
              <Button class="lottery mr20">低频彩</Button>
            </div>
            <div class="info flex-row pt10">
              <div class="w15">香港六合彩：0.5%</div>
              <div class="w15">快速六合彩：0.5%</div>
              <div class="w15">5分六合彩：0.5%</div>
            </div>
          </div>
        </panel>
      </collapse>
    </div>
    <div class="items mt15">
      <collapse simple value='2'>
        <panel name="2" :hide-arrow="true">
          <div class="title" @click="open=!open">返水信息
            <Icons v-show="!open" type="gengduoshouqi" size="15" color="#999"></Icons>
            <Icons v-show="open" type="gengduo" size="15" color="#999"></Icons>
          </div>
          <div class="section gray-bg p15" slot="content">
            <div class="btns">
              <Button class="lottery mr20">真人视讯</Button>
              <Button class="lottery mr20">电子游艺</Button>
              <Button class="lottery mr20">体育</Button>
              <Button class="lottery mr20">彩票</Button>
              <Button class="lottery mr20">开元棋牌</Button>
            </div>
            <div class="info flex-row pt10">
              <div class="w15">AG视讯：0.60</div>
              <div class="w15">BG视讯：0.60</div>
              <div class="w15">DG视讯：0.60</div>
              <div class="w15">EBET视讯：0.60</div>
              <div class="w15">LEBO视讯：0.60</div>
              <div class="w15">LMG视讯：0.60</div>
            </div>
          </div>
        </panel>
      </collapse>
    </div>
    <div class="items mt15">
      <div class="flex-row pt20 bt">
        <div class="w30 flex-row">
          <Button class="more-btn  f6Color " @click="resetEncry">重设密保答案</Button>
          <Button class="more-btn  ml40 f6Color" @click="withPassword">重设取款密码</Button>
          <Button class="more-btn  ml40 f6Color" @click="registerPassword">重设登陆密码</Button>
        </div>
      </div>
    </div>
    <!-- 重置密码 -->
    <div class="tip">
      <Modals class="tip" ref="czmb" title="温馨提示" width="480">
        <div slot="content" class="v2-form-wrapper">
          <Form ref="memberCount">
            <FormItem>
              <div class="ft20 txt-a">您确认要重设密保答案吗？</div>
            </FormItem>
            <FormItem class="clearfix">
              <Button class="ivu-btn export-ok gbbg fl ft20" @click="cancel" >取消</Button>
              <Button class="ivu-btn export-ok bg fr ft20 ml20" @click="confirm" type="primary">确定</Button>
            </FormItem>
          </Form>
        </div>
      </Modals>
    </div>
    <div class="rest">
      <Modals ref="changePassword" width="480" title="重设密保答案成功！">
        <div slot="content" class="v2-form-wrapper newPassword">
          <Form>
            <FormItem>
              <!-- <div class="mbda">重设密保答案成功！</div> -->
            </FormItem>
            <FormItem>
              <div>
                <Input class="fl w70" v-model="dataDetail.zhanghaomima"/>
                <Button
                  class="bgc pl20 fl ft20"
                  type="info"
                  size="small"
                  v-clipboard:copy="dataDetail.zhanghaomima"
                  v-clipboard:success="onCopy"
                >
                  <a>复制</a>
                </Button>
              </div>
            </FormItem>
            <Button type="primary" class="export-ok ml50 ft20" @click="yes">确定</Button>
          </Form>
        </div>
      </Modals>
    </div>
    <!-- 重设取款密码 -->
    <div class="tip">
      <Modals class="tip" ref="withPasswording" title="温馨提示" width="480">
        <div slot="content" class="v2-form-wrapper">
          <Form ref="memberCount">
            <FormItem>
              <div class="ft20 txt-a">您确认要重设取款密码吗？</div>
            </FormItem>
            <FormItem class="clearfix">
              <Button class="ivu-btn export-ok gbbg fl ft20" @click="cancel" >取消</Button>
              <Button class="ivu-btn export-ok bg fr ft20 ml20" @click="confirm2" type="primary">确定</Button>
            </FormItem>
          </Form>
        </div>
      </Modals>
    </div>
    <div class="rest">
      <Modals ref="changeWithdPassword" width="480" title="重设取款密码成功！">
        <div slot="content" class="v2-form-wrapper newPassword">
          <Form>
            <FormItem>
              <!-- <div class="mbda">重设密保答案成功！</div> -->
            </FormItem>
            <FormItem>
              <div>
                <Input class="fl w70" v-model="dataDetail.zhanghaomima"/>
                <Button
                  class="bgc pl20 fl ft20"
                  type="info"
                  size="small"
                  v-clipboard:copy="dataDetail.zhanghaomima"
                  v-clipboard:success="onCopy"
                >
                  <a>复制</a>
                </Button>
              </div>
            </FormItem>
            <Button type="primary" class="export-ok ml50 ft20" @click="yes">确定</Button>
          </Form>
        </div>
      </Modals>
    </div>

    <!-- 重设登录密码 -->
    <div class="tip">
      <Modals class="tip" ref="registerPasswording" title="温馨提示" width="480">
        <div slot="content" class="v2-form-wrapper">
          <Form ref="memberCount">
            <FormItem>
              <div class="ft20 txt-a">你确定要重设登录密码吗？</div>
            </FormItem>
            <FormItem class="clearfix">
              <Button class="ivu-btn export-ok gbbg fl ft20" @click="cancel" >取消</Button>
              <Button class="ivu-btn export-ok bg fr ft20 ml20" @click="confirm3" type="primary">确定</Button>
            </FormItem>
          </Form>
        </div>
      </Modals>
    </div>
    <div class="rest">
      <Modals ref="changeLoginPassword" width="480" title="重设登录密码成功">
        <div slot="content" class="v2-form-wrapper newPassword">
          <Form>
            <FormItem>
              <!-- <div class="mbda">重设密保答案成功！</div> -->
            </FormItem>
            <FormItem>
              <div>
                <Input class="fl w70" v-model="dataDetail.zhanghaomima"/>
                <Button
                  class="bgc pl20 fl ft20"
                  type="info"
                  size="small"
                  v-clipboard:copy="dataDetail.zhanghaomima"
                  v-clipboard:success="onCopy"
                >
                  <a>复制</a>
                </Button>
              </div>
            </FormItem>
            <FormItem>
              <Button type="primary" class="export-ok ml50 ft20" @click="yes">确定</Button>
            </FormItem>
          </Form>
        </div>
      </Modals>
    </div>
    <Modals ref="historyModal" title="历史登陆" width="800">
      <div slot="content" class="modal-overflow">
        <!-- <div style="height:500px;overflow:auto;"> -->
        <Tables
          :columns="historyTable.columns"
          :loading="historyTable.loading"
          :value="historyTable.data"
          :page="false"
        ></Tables>
        <!-- </div> -->
      </div>
    </Modals>
  </div>
</template>
<script>
import Icons from "@/components/icons";
import Modals from "@/components/modals";
import Tables from '@/components/tables';
import VueClipboard from "vue-clipboard2";
import { getMemberLoginLog } from "@/api/data";
import Vue from "vue";
Vue.use(VueClipboard);
export default {
  components: { Icons, Modals ,Tables},
  data() {
    return {
      open: false,
      dataDetail: {},
       historyTable: {
        loading: true,
        columns: [
          {
            title: "登陆设备",
            key: "device",
            align: "center",
          },
          {
            title: "登陆域名",
            key: "domain",
            align: "center",
          },
          {
            title: "登陆IP",
            key: "ip",
            align: "center",
          },
          {
            title: "归属地",
            key: "address",
            align: "center",
          },
          {
            title: "登陆时间",
            key: "loginTime",
            align: "center",
          }
        ],
        data: []
      }
    };
  },
  methods: {
    onCopy: function(e) {
      this.$Message.success("复制成功");
    },
    cancel() {
      this.$refs.czmb.hide();
      this.$refs.withPasswording.hide();
      this.$refs.registerPasswording.hide();
    },
    resetEncry(params) {
      this.$refs.czmb.show();
    },
    withPassword(params) {
      this.$refs.withPasswording.show();
    },
    registerPassword() {
      this.$refs.registerPasswording.show();
    },
    confirm(params) {
      this.$refs.czmb.hide();
      this.$refs.changePassword.show();
    },
    confirm2(params) {
      this.$refs.withPasswording.hide();
      this.$refs.changeWithdPassword.show();
    },
    confirm3(params) {
      this.$refs.registerPasswording.hide();
      this.$refs.changeLoginPassword.show();
    },
    yes() {
      this.$refs.changePassword.hide();
      this.$refs.changeWithdPassword.hide();
      this.$refs.changeLoginPassword.hide();
    },
    loginHistory() {
      this.$refs.historyModal.show();
      getMemberLoginLog().then(res => {
        this.historyTable.loading = true;
        setTimeout(() => {
          this.historyTable.data = res.data;
          this.historyTable.loading = false;
        }, 2000);
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../styles/button.less";
// /deep/.ivu-collapse > .ivu-collapse-item > .ivu-collapse-header {
//   padding-left: 0 ;
// }
// 样式间距修改
.ivu-collapse > .ivu-collapse-item > .ivu-collapse-header {
  padding-left: 0 !important;
}

// /deep/.ivu-collapse-content {
//   padding: 0;
// }
// 样式间距修改
.ivu-collapse-content {
  padding: 0;
}
.ivu-collapse-content > .ivu-collapse-content-box {
  padding: 0;
}
.ivu-collapse {
  border: none;
}
.info {
  justify-content: flex-start;
}

.rest {
  .ivu-modal-close {
    display: none;
  }
}

// 默认的样式
.bank-card {
  position: relative;
  .icon-morenyinhangqia {
    position: absolute;
    top: -17px !important;
    right: -5px !important;
  }
}

/deep/.ivu-collapse-content{
  padding: 0;
  
}
/deep/.ivu-collapse-item{
  .ivu-collapse-header{
    padding: 0;
  }
}



</style>
