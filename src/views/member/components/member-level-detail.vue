<template>
  <Modals ref="memberLevelDetailModal" :title="modalTitle" :width="650">
    <div slot="content">
      <!-- <div class="box">
        <span>
          <p>VIP1</p>
          <p>等级名称</p>
        </span>
        <span>
          <p>未分层</p>
          <p>等级别称</p>
        </span>
        <span>
          <p>2629</p>
          <p>会员人数</p>
        </span>
        <span>
          <p>1</p>
          <p>存款次数</p>
        </span>
        <span>
          <p>1.00</p>
          <p>最小存款</p>
        </span>
        <span>
          <p>3</p>
          <p>打码倍数</p>
        </span>
        <span>
          <p>1</p>
          <p>取款打码倍数</p>
        </span>
        <span>
          <p>0.00</p>
          <p>彩金奖励</p>
        </span>
        <span>
          <p>正常</p>
          <p>等级状态</p>
        </span>
        <span>
          <p>无</p>
          <p>备注信息</p>
        </span>
        <span>
          <p>是</p>
          <p>是否默认</p>
        </span>
        <span>
          <p>&nbsp;</p>
          <p>&nbsp;</p>
        </span>
        <span>
          <p>2018-10-18 19:52:34</p>
          <p>创建时间</p>
        </span>
        <span>
          <p>2018-10-18 19:52:34</p>
          <p>更新时间</p>
        </span>
      </div>-->
      <div class="box">
        <p>
          <span>等级名称：</span>
          <span>{{levelObj.levelName}}</span>
        </p>
        <p>
          <span>等级别称：</span>
          <span>{{levelObj.levelAlias}}</span>
        </p>
        <p>
          <span>会员人数：</span>
          <span>{{levelObj.memberCount}}</span>
        </p>
        <p>
          <span>最小存款：</span>
          <span>{{levelObj.depositMin}}</span>
        </p>
        <p>
          <span>打码倍数：</span>
          <span>{{levelObj.damabeishu}}</span>
        </p>
        <p>
          <span>最大单笔：</span>
          <span>{{levelObj.bigStroke}}</span>
        </p>
        <p>
          <span>取款打码倍数：</span>
          <span>{{levelObj.qukuandama}}</span>
        </p>
        <p>
          <span>彩金奖励：</span>
          <span>{{levelObj.caijin}}</span>
        </p>
        <p>
          <span>等级状态：</span>
          <span>{{levelObj.status}}</span>
        </p>
        <p>
          <span>备注信息：</span>
          <span>{{levelObj.remark}}</span>
        </p>
        <p>
          <span>是否默认：</span>
          <span>{{levelObj.defaultLevel}}</span>
        </p>
        <p>
          <span>创建时间：</span>
          <span>{{levelObj.createTime}}</span>
        </p>
        <p>
          <span>更新时间：</span>
          <span>{{levelObj.updateTime}}</span>
        </p>
      </div>
    </div>
  </Modals>
</template>
<script>
import Modals from "@/components/modals";
export default {
  components: { Modals },
  props: {
    levelObj: Object
  },
  data() {
    return {
      modalTitle: "等级详情"
    };
  },
  methods: {
    show() {
      this.$refs.memberLevelDetailModal.show();
    },
    spinShow() {
      this.$refs.memberLevelDetailModal.spinShow();
    },
    spinHide() {
      this.$refs.memberLevelDetailModal.spinHide();
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../styles/tabs.less";
.box {
  width: 100%;
  p {
    width: 60%;
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 160px;
    span{
      padding-left: 30px;
    }
  }
}
// .box {
//   border: 1px solid #eaeaea;
//   > span {
//     box-sizing: border-box;
//     display: inline-block;
//     width: 25%;
//     height: 100px;
//     text-align: center;
//     border-right: 1px solid #eaeaea;
//     border-bottom: 1px solid #eaeaea;
//     padding: 25px;
//     &:nth-of-type(4n) {
//       border-right: 0;
//     }
//     &:nth-last-of-type(1),
//     &:nth-last-of-type(2) {
//       width: 100%;
//       border-right: 0;
//     }
//     &:nth-last-of-type(1) {
//       border-bottom: 0;
//     }
//     > p {
//       &:nth-child(1) {
//         font-size: 18px;
//         color: #808080;
//       }
//       &:nth-child(2) {
//         font-size: 14px;
//         color: #c3c3c3;
//       }
//     }
//   }
// }
</style>

