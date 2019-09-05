<template>
  <div>
    <div class="v2-search">
      <Form ref="searchKey" inline>
        <FormItem label="业务类型">
          <Select clearable v-model="searchKey.type" class="s-86">
            <Option value="yes">存款</Option>
            <Option value="no">取款</Option>
          </Select>
        </FormItem>
        <FormItem label="开始时间">
          <DatePicker type="date" placeholder="请选择日期" class="s-120" v-model="Time[0]"></DatePicker>
        </FormItem>
        <FormItem label="结束时间">
          <DatePicker type="date" placeholder="请选择日期" class="s-120" v-model="Time[1]"></DatePicker>
        </FormItem>
        <FormItem>
          <Checkbox>
            <span class="pl5">模糊</span>
          </Checkbox>
        </FormItem>
        <FormItem>
          <Select v-model="searchKey.like" class="s-100" clearable>
            <Option value="userName">会员账号</Option>
            <Option value="phone">手机</Option>
            <Option value="email">Email</Option>
            <Option value="wechat">微信号</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Input placeholder="账号/姓名/上级代理" class="s-140"/>
        </FormItem>
        <FormItem>
          <Poptip trigger="hover" class="ml14f" content="多个请以,逗号隔开,仅支持同类型多个输入" placement="bottom-end">
            <Icons type="bangzhutishi" color="#E4E4E4" :size="26"/>
          </Poptip>
        </FormItem>
        <FormItem>
          <Button type="primary" class="search" @click="searchSubmit">查询</Button>
        </FormItem>
      </Form>
    </div>
    <div class="v2-table">
      <Tables
        :columns="table.columns"
        :loading="table.loading"
        :value="table.data"
        :total="table.total"
        @on-page-change="onPageChange"
        @on-page-size-change="onPageSizeChange"
        @on-sort-change='sortChange'
      ></Tables>
    </div>
  </div>
</template>
<script>
import Tables from "@/components/tables";
import Icons from "@/components/icons";
import { getMemberFundsLog } from "@/api/data";
import {sortInteraction} from '@/libs/util';
export default {
  name: "memberFundsLog",
  components: { Tables, Icons },
  data() {
    return {
      Time: [],
      searchKey: {},
      table: {
        loading: true,
        total: 100,
        columns: [
          {
            title: "会员账号",
            key: "account",
            align: "center",
            sortable: true
          },
          {
            title: "业务类型",
            key: "businessType",
            align: "center",
            sortable: true,
            render: (h, params) => {
              return <span>{params.row.businessType ? "存款" : "取款"}</span>;
            },
            width: "100"
          },
          {
            title: "变更金额",
            key: "changeAmount",
            align: "center",
            sortable: true
          },
          {
            title: "变更前余额",
            key: "beforeChange",
            align: "center",
            sortable: true,
            width: "280"
          },
          {
            title: "变更后余额",
            key: "afterChange",
            align: "center",
            sortable: true,
            width: "280"
          },
          {
            title: "变更时间",
            key: "createTime",
            align: "center",
            sortable: true
          },
          {
            title: "备注",
            key: "remarks",
            align: "center"
          }
        ],
        data: []
      }
    };
  },
  created() {
    this.$nextTick(() => {
      this.getData();
    });
  },
  methods: {
    getData(query) {
      getMemberFundsLog().then(res => {
        this.table.loading = true;
        setTimeout(() => {
          this.table.data = res.data;
          this.table.loading = false;
        }, 2000);
      });
    },
    onPageChange(page) {
      let query = {
        page: page
      };
      this.getData(query);
    },
    searchSubmit() {},
    onPageSizeChange(count) {
      // alert(count);
    },
    sortChange(obj){
      sortInteraction(obj)
    }
  }
};
</script>
<style lang="less" scoped>
.ivu-form-item{
  &:nth-child(4){
    margin-right: -5px;
  }
  &:nth-child(7){
    margin-top: 1px!important;
  }
}
</style>
