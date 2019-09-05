`<template>
  <div>
    <div class="v2-search">
      <Form ref="searchKey" inline>
        <FormItem label="会员账号">
          <Input placeholder="账号/姓名"/>
        </FormItem>
        <FormItem>
          <Poptip trigger="hover" class="ml14f" content="多个请以,逗号隔开,仅支持同类型多个输入" placement="bottom-end">
            <Icons type="bangzhutishi" color="#E4E4E4" :size="26"/>
          </Poptip>
        </FormItem>
        <FormItem>
          <Button type="primary" class="ivu-btn search" @click="searchSubmit">查询</Button>
        </FormItem>
        <FormItem>
            <Button @click="onBlackName" type="primary" class='ivu-btn export'>添加黑名单</Button>
        </FormItem>
      </Form>
    </div>
    <div class="v2-table">
      <Tables
        editable
        :columns="table.columns"
        :loading="table.loading"
        :value="table.data"
        :more="table.more"
        :total="table.total"
        @on-page-change="onPageChange"
        @on-page-size-change="onPageSizeChange"
        @on-remove="onRemove"
      ></Tables>
    </div>
    <Modals ref="addBlackName" title="添加黑名单" :width='560'>
      <div slot="content" class="v2-form-wrapper">
        <Form ref="memberCount" :label-width="130" :rules="countRules" style="width:560px;">
          <FormItem label="会员账号" prop="superior">
            <Input class="w260x" v-model="memberCount.superior"/>
          </FormItem>
          <FormItem>
            <Button class="ivu-btn submit bg tjhmd ft20" @click="save" type="primary">确认添加</Button>
          </FormItem>
        </Form>
      </div>
    </Modals>
  </div>
</template>
<script>
import Tables from "@/components/tables";
import Icons from "@/components/icons";
import Modals from "@/components/modals";
import { lotteryBlackData } from "@/api/data";
export default {
  name: "fastLotteryBlack",
  components: {
    Tables,
    Modals,
    Icons
  },
  data() {
    return {
      table: {
        loading: true,
        total: 100,
        title: "快速彩票黑名单",
        columns: [
          {
            title: "会员账号",
            key: "account",
            align: "center"
          },
          {
            title: "姓名",
            key: "name",
            align: "center"
          },
          {
            title: "创建时间",
            key: "time",
            align: "center"
          },
          {
            title: "操作",
            key: "handle",
            align: "center",
            options: ["remove"]
          }
        ]
      },
      memberCount: {
        input: "",
        select: "",
        switch: true,
        slider: [20, 50],
        textarea: ""
      },
      countRules: {
        superior: [
          {
            required: true,
            message: "请输入会员账号",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    save() {
      this.$refs.addBlackName.hide();
      this.$Tip.success({
        content: "添加至黑名单成功",
        onOk: () => {}
      });
    },
    onBlackName(params) {
      this.$refs.addBlackName.show();
    },
    searchSubmit() {},
    getData(query) {
      lotteryBlackData().then(res => {
        this.table.loading = true;
        setTimeout(() => {
          this.table.data = res.data;
          this.table.loading = false;
        }, 2000);
      });
    },
    onPageChange(page) {
      this.getData(page);
    },
    onPageSizeChange() {},
    onRemove(params) {
      this.$Tip.confirm({
        content: "你确定将此会员移出黑名单吗?",
        onOk: () => {
          this.$Tip.success({
            content:'移出黑名单成功',
            onOk:() => {}
          })
        }
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getData();
    });
  }
};
</script>

<style lang="less" scoped>
@import '../../styles/button.less';
  .tjhmd{
    width: 260px;
    height: 50px;
  }
.w260x{
  width: 260px;
  height: 30px;
}
/deep/.ivu-form-item{
  &:nth-child(2){
    margin-top: 1px!important;
  }
}
</style>

