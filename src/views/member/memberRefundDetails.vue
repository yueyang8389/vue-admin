<template>
  <div class="v2-details">
    <div class="items mt15">
      <div class="title">基础信息</div>
      <div class="section br flex-row">
        <div class="row ti20 w25 btl w20">
          <div class="col bb">等级名称：等级一</div>
          <div class="col">默认等级：是</div>
        </div>
        <div class="row ti20 w25 btl w20">
          <div class="col bb">等级别称：默认等级</div>
          <div class="col"></div>
        </div>
        <div class="row ti20 w25 btl w20">
          <div class="col bb">最低下注：1.00</div>
        </div> 
        <div class="row ti20 w25 btl w20">
          <div class="col bb">最大返水：1000000.00</div>
        </div>
      </div>
      <div class="remarks ti20 b">备注：暂无信息</div>
    </div>
    <div class="items mt15">
      <collapse simple value="1">
        <panel name="1" :hide-arrow="true">
          <div class="title" @click="open=!open">
            返水信息
            <Icons v-show="!open" type="gengduoshouqi" size="15" color="#999"></Icons>
            <Icons v-show="open" type="gengduo" size="18" color="#999"></Icons>
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
  </div>
</template>
<script>
import Icons from "@/components/icons";
export default {
  components: { Icons },
  data() {
    return {
      open: false
    }
  }
}
</script>
<style lang="less" scoped>
@import "../../styles/button.less";
.section.flex-row{
  align-items: baseline;
}
/deep/.ivu-collapse > .ivu-collapse-item > .ivu-collapse-header{
  padding-left: 0;
}
/deep/.ivu-collapse-content{
  padding: 0;
}
.ivu-collapse-content > .ivu-collapse-content-box{
   padding: 0;
}
.ivu-collapse{
  border: none;
}
.info{
  justify-content: flex-start;
}
</style>
