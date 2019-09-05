<template>
  <div class="my-tip">
    <Modal v-model="show" width="480" :mask-closable="false">
      <div class="header" slot="header">{{title}}</div>
      <Icons slot="close" type="guanbi" color="white" class='lh50' :size="24"></Icons>
      <div class="content">
        <div class="txt flex-row">
          <Icons v-if="type==='info'" type="wenxintishi" color="#57A3F3" :size="26"></Icons>
          <Icons v-else-if="type==='success'" type="chenggongtishi" color="#57A3F3" :size="26"></Icons>
          <Icons v-else-if="type==='error'" type="guanbi1" color="#ed4014" :size="26"></Icons>
          <Icons v-else-if="type==='confirm'" type="danchuangtishi" color="#57A3F3" :size="26" class="pl10"></Icons>
          <div class="font">{{content}}</div>
        </div>
        <div class="btns flex-row">
          <Button v-if="type==='confirm'" class="cancel" @click="show=false">取消</Button>
          <Button type="primary" @click="onConfirm">确定</Button>
        </div>
      </div>
      <div slot="footer"></div>
    </Modal>
  </div>
</template>
<script>
import Icons from "_c/icons/icons";
export default {
  components: { Icons },
  data() {
    return {
      show: false,
      title: "",
      content: "",
      type: ""
    };
  },
  methods: {
    onConfirm() {
      this.show = false;
      if (this.onOk) {
        this.onOk();
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../styles/color.less";
/deep/.ivu-modal-wrap {
  display: flex;
  align-items: center;
  justify-content: center;
  .ivu-modal {
    top: 0;
    margin: 0;
  }
}
/deep/.ivu-modal-content {
  overflow: hidden;
  .ivu-modal-body {
    padding: 0;
  }
  .ivu-modal-header {
    padding: 0;
    .header {
      height: 50px;
      line-height: 50px;
      text-align: center;
      font-size: 23px;
      color: #fff;
      background: @btnColor;
    }
  }
  .ivu-modal-close {
    top: 0;
  }
  .content {
    height: 190px;
    .txt {
      justify-content: center;
      height: 107px;
      .font {
        font-size: 20px;
        margin-left: 10px;
        color: @baseFontColor;
      }
    }
    .btns {
      padding-bottom: 33px;
      justify-content: center;
      /deep/.ivu-btn {
        width: 120px;
        height: 50px;
        font-size: 20px;
        // border: none;
      }
      .cancel {
        margin-right: 40px;
      }
    }
  }
  .ivu-modal-footer {
    display: none;
  }
}
.txt,
.font,
.flex-row,
.font {
  padding-top: 0 !important;
}
.lh50{
  line-height: 50px;
}
</style>

