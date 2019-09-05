<template>
  <div class="v2-edit">
    <div class="items bb">
      <div class="title">基础设置</div>
      <div class="section">
        <Form inline :label-width="78">
          <FormItem class="w25 ti10" label="会员账号">
            <Input class="s-140" placeholder="会员账号" v-model="this.$route.params.account" disabled/>
          </FormItem>
          <FormItem class="w25 ti10" label="上级代理">
            <Input class="s-140" placeholder="上级代理" v-model="this.$route.params.superior" disabled/>
          </FormItem>
          <FormItem class="w25 ti10" label="真实姓名">
            <Input class="s-140" placeholder="例：张三"/>
          </FormItem>
          <FormItem class="w25 ti10" label="邮箱账号">
            <Input class="s-200" placeholder="例：yixiu@gmail.com"/>
          </FormItem>
          <FormItem class="w25 ti10" label="手机号码">
            <Input class="s-140" placeholder="例：13912341234"/>
          </FormItem>
          <FormItem class="w25 ti10" label="微信账号">
            <Input class="s-140" placeholder="例：yixiu123"/>
          </FormItem>
          <FormItem class="w50 ti10" label="备注信息">
            <Input class="s-436" placeholder="此栏位仅供管理者记录其他资讯，会员无法检视"/>
          </FormItem>
        </Form>
      </div>
    </div>
    <div class="items mt15 bb">
      <div class="section">
        <RebateSelect></RebateSelect>
      </div>
    </div>
    <div class="items mt15 bb">
      <div class="section">
        <RefundSelect></RefundSelect>
      </div>
    </div>
    <div class="items mt15">
      <div class="flex-row p10">
        <div class=" flex-row">
          <Button type="primary" class="more-btn ml40 ivu-btn export-ok " style="width:140px;" @click="save">确认保存</Button>
          <Button class="more-btn  ml40" @click="resetEncry">重设密保答案</Button>
          <Button class="more-btn  ml40" @click="withPassword">重设取款密码</Button>
          <Button class="more-btn  ml40" @click="registerPassword">重设登陆密码</Button>
        </div>
      </div>
    </div>
    <!-- 重置密码 -->
    <div class="tip">
      <Modals class="tip" ref="czmb" title="温馨提示" width="480">
        <div slot="content" class="v2-form-wrapper">
          <Form ref="memberCount">
            <FormItem>
              <div class="ft20 txt-a">您确认要重设密码答案吗？</div>
            </FormItem>
            <FormItem>
              <Button class="ivu-btn export-ok gbbg fl ft20" @click="cancel">取消</Button>
              <Button class="ivu-btn export-ok bg fr ft20 ml20" @click="confirm" type="primary">确定</Button>
            </FormItem>
          </Form>
        </div>
      </Modals>
    </div>
    <div class="rest">
      <Modals ref="changePassword" width="480" title="重设密保答案成功！">
        <div slot="content" class="v2-form-wrapper newPassword">
          <Form >
            <FormItem>
              <!-- <div class="ft20 txt-a">重设密保答案成功！</div> -->
            </FormItem>
            <FormItem>
              <div class="clearfix">
                <Input  class=" w70 fl" v-model="dataDetail.zhanghaomima"/>

                <Button   class="bgc pl20  fr ft20" 
                  type="info"
                  size="small"
                  v-clipboard:copy="dataDetail.zhanghaomima"
                  v-clipboard:success="onCopy"
                ><a>复制</a></Button>
              </div>
            </FormItem>
            <Button type="primary" class="export-ok ml50 ft20 " @click="yes">确定</Button>
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
            <FormItem>
              <Button class="ivu-btn export-ok gbbg fl ft20" @click="cancel">取消</Button>
              <Button class="ivu-btn export-ok bg fr ft20 ml20" @click="confirm2" type="primary">确定</Button>
            </FormItem>
          </Form>
        </div>
      </Modals>
    </div>
    <div class="rest">
      <Modals ref="changeWithdPassword" width="480" title="重设取款密码成功！">
        <div slot="content" class="v2-form-wrapper newPassword">
          <Form >
            <FormItem>
              <!-- <div class="ft20 txt-a">重设密保答案成功！</div> -->
            </FormItem>
            <FormItem>
              <div >
                <Input class="fl w70" v-model="dataDetail.zhanghaomima"/>
                <Button  class="bgc pl20 fl ft20"  style="background-color:white border:1px solid  white"
                  type="info"
                  size="small"
                  v-clipboard:copy="dataDetail.zhanghaomima"
                  v-clipboard:success="onCopy"
                ><a>复制</a></Button>
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
            <FormItem>
              <Button class="ivu-btn export-ok gbbg fl ft20 " @click="cancel">取消</Button>
              <Button class="ivu-btn export-ok bg fr ft20 ml20" @click="confirm3" type="primary">确定</Button>
            </FormItem>
          </Form>
        </div>
      </Modals>
    </div>
    <div class="rest">
      <Modals ref="changeLoginPassword" width="480" title="重设登录密码成功">
        <div slot="content" class="v2-form-wrapper newPassword">
          <Form >
            <FormItem>
              <!-- <div class="ft20 txt-a">重设密保答案成功！</div> -->
            </FormItem>
            <FormItem>
              <div >
                <Input class="fl w70" v-model="dataDetail.zhanghaomima"/>
                <Button  class="bgc pl20 fl ft20 "  style="background-color:white border:1px solid  white"
                  type="info"
                  size="small"
                  v-clipboard:copy="dataDetail.zhanghaomima"
                  v-clipboard:success="onCopy"
                ><a>复制</a></Button>
              </div>
            </FormItem>
            <Button type="primary" class="export-ok ml50 ft20" @click="yes">确定</Button>
          </Form>
        </div>
      </Modals>
    </div>
  </div>
</template>
<script>
// 返点信息
import RebateSelect from "@/components/rebate-select";
import Modals from "@/components/modals";
// 返水信息
import RefundSelect from "@/components/refund-select";
import VueClipboard from "vue-clipboard2";
import Vue from "vue";
Vue.use(VueClipboard);
export default {
  components: { RebateSelect, RefundSelect, Modals },
  data() {
    return {
      dataDetail: {}
    };
  },
  methods: {
    save() {
      this.$Tip.success({
        content: "修改会员信息成功",
        onOk: () => {
          this.$router.go(-1);
        }
      });
    },
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
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../styles/button.less";
/deep/.ivu-collapse > .ivu-collapse-item > .ivu-collapse-header {
  padding-left: 0;
}
/deep/.ivu-collapse-content {
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


</style>
