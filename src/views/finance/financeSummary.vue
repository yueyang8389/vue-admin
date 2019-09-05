<template>
  <div>
    <div class="v2-search">
      <Form ref="searchKey" inline>
        <FormItem label="业务类型">
          <Select clearable class="s-86" v-model="searchKey.type">
            <Option value="all">全部</Option>
            <Option value="deposit">存款</Option>
            <Option value="dispensing">出款</Option>
            <Option value="preferential">优惠</Option>
            <Option value="other">其他</Option>
          </Select>
        </FormItem>
        <FormItem label="开始日期">
          <DatePicker type="date" placeholder="开始日期" v-model="Time[0]" class="s-120"></DatePicker>
        </FormItem>
        <FormItem label="结束日期">
          <DatePicker type="date" placeholder="结束日期" class="s-120" v-model="Time[1]"></DatePicker>
        </FormItem>
        <FormItem>
          <Checkbox>
            <span class="pl5">模糊</span>
          </Checkbox>
        </FormItem>
        <FormItem label="会员账号">
          <Input placeholder="多个请以，逗号隔开" class="s-195" v-model="searchKey.account"/>
           <Button type="primary" class="search mb5" @click="searchSubmit">查询</Button>
        </FormItem>
        <FormItem>
           <Button
            type="primary"
            class="ivu-btn export"
            @click="() => {this.$refs.dataActive.show()}"
          >导出EXCEL</Button>
        </FormItem>
      </Form>
    </div>
    <Modals ref="dataActive" :title="title" :width="840">
      <div slot="content">
        <Form ref="detail">
          <FormItem label="存款：">
            <CheckboxGroup v-model="detail.deposit">
              <Checkbox v-for="(item,index) in depositList" :key="index" :label="item"></Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="取款：">
            <CheckboxGroup v-model="detail.withdrawal">
              <Checkbox label="取款成功"></Checkbox>
              <Checkbox label="人工取款"></Checkbox>
              <Checkbox label="其他"></Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="优惠：">
            <CheckboxGroup v-model="detail.preferential">
              <Checkbox
                v-for="(item,index) in preferentialList"
                :key="index"
                :label="item"
                class="pre"
              ></Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="其他：" v-model="detail.other">
            <Checkbox label="其他"></Checkbox>
          </FormItem>
          <FormItem>
            <Button class="ivu-btn close close" @click="() => {this.$refs.dataActive.hide()}">取消</Button>
            <Button type="primary" class="ft20 ivu-btn export-ok ml40" @click="sumbit">确认</Button>
          </FormItem>
        </Form>
      </div>
    </Modals>
    <div class="v2-table">
      <Tables
        editable
        :columns="table.columns"
        :loading="table.loading"
        :value="table.data"
        :total="table.total"
        @on-page-change="onPageChange"
        @on-page-size-change="onPageSizeChange"
        :more="table.more"
      ></Tables>
    </div>
    <summaryDataShow></summaryDataShow>
  </div>
</template>
<script>
import Tables from "@/components/tables";
import Modals from "@/components/modals";
import summaryDataShow from "./components/summaryDataShow";
import { financeSummaryData } from "@/api/data";
export default {
  name: "financeSummary",
  components: {
    Tables,
    Modals,
    summaryDataShow
  },
  data() {
    return {
      searchKey: {},
      Time: [],
      title: "选择导出业务类型",
      other: "other",
      height: 286,
      table: {
        total: 100,
        loading: true,
        columns: [
          {
            title: "会员账号",
            key: "memberNum",
            align: "center"
          },
          {
            title: "业务类型",
            key: "businessType",
            align: "center"
          },
          {
            title: "变更类型",
            key: "changeType",
            align: "center"
          },
          {
            title: "变更金额",
            key: "changeMoney",
            align: "center"
          },
          {
            title: "变更前余额",
            key: "beforeBalance",
            align: "center"
          },
          {
            title: "变更后余额",
            key: "afterBalance",
            align: "center"
          },
          {
            title: "变更时间",
            key: "changeTime",
            align: "center"
          },
          {
            title: "备注",
            key: "remarks",
            align: "center",
            width: "360"
          }
        ]
      },
      detail: {},
      preferentialList: [
        "存款优惠",
        "系统彩金派送",
        "人工彩金派送",
        "会员返水",
        "会员返点",
        "代理返水",
        "代理返点",
        "日工资",
        "佣金",
        "分红"
      ],
      depositList: ["线上支付", "公司入款", "人工存款", "额度转换失败", "其他"]
    };
  },
  methods: {
    searchSubmit() {},
    getData(query) {
      financeSummaryData().then(res => {
        this.table.loading = true;
        setTimeout(() => {
          this.table.data = res.data;
          this.table.loading = false;
        }, 2000);
      });
    },
    onPageChange(page) {
      let query = { page };
      this.getData(query);
    },
    onPageSizeChange() {},
    //确认导出
    sumbit() {
      this.$refs.dataActive.hide();
      this.$Tip.success({
        content: "导出表格成功",
        onOk: () => {}
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
@import "../../styles/button.less";
@import "../../styles/class.less";
.new-table {
  margin-top: 20px;
  height: 205px;
  border: 1px solid #ebebeb;
  box-sizing: border-box;
}
.other {
  display: inline-block;
  height: 25%;
  width: 16.66%;
  border-bottom: 1px solid #ebebeb;
  border-right: 1px solid #ebebeb;
  &:nth-child(6n) {
    border-right: 0;
  }
}
.ivu-form-item{
  &:nth-child(4){
    margin-right: -5px;
  }
}
</style>


