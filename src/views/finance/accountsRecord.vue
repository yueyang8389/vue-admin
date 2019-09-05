<template>
  <div>
    <div class="v2-search">
      <Form ref="searchKey" inline>
        <FormItem label="催账类型">
          <Select clearable class="s-86" v-model="searchKey.type">
            <Option value="allPay">全部</Option>
            <Option value="deposit">存款类</Option>
            <Option value="withdrawal">取款类</Option>
            <Option value="offer">优惠类</Option>
          </Select>
        </FormItem>
        <FormItem label="催账状态">
          <Select clearable class="s-86" v-model="searchKey.status">
            <Option value="success">成功</Option>
            <Option value="fail">失败</Option>
            <Option value="reviewing">审核中</Option>
          </Select>
        </FormItem>
        <FormItem label="起止日期">
          <DatePicker type="date" placeholder="开始日期" class="s-120" v-model="Time[0]"></DatePicker>
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
        </FormItem>
        <FormItem>
          <Button type="primary" class="search ml10f mb5" @click="searchSubmit">查询</Button>
        </FormItem>
      </Form>
    </div>
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
  </div>
</template>
<script>
import Tables from "@/components/tables";
import { accountsRecordData } from "@/api/data";
export default {
  name: "accountsRecord",
  components: {
    Tables
  },
  data() {
    return {
      Time: [],
      title: "催账记录",
      searchKey: {},
      table: {
        total: 100,
        loading: true,
        columns: [
          {
            title: "订单号",
            key: "orderNum",
            align: "center"
          },
          {
            title: "等级",
            key: "level",
            align: "center"
          },
          {
            title: "会员账号",
            key: "memberNum",
            align: "center"
          },
          {
            title: "催账类型",
            key: "reminderType",
            align: "center"
          },
          {
            title: "状态",
            key: "status",
            align: "center",
            render: (h, params) => {
              let color = params.row.return ? 'green' : params.row.status ? 'blue' : 'red';
              return (
                <span style={{ color }}>
                  {params.row.return
                    ? "成功"
                    : params.row.status
                    ? "待审核"
                    : "失败"}
                </span>
              );
            }
          },
          {
            title: "催账时间",
            key: "reminderTime",
            align: "center"
          },
          {
            title: "审核时间",
            key: "reviewTime",
            align: "center",
            render:(h,params) => (
              <span>{!params.row.return && params.row.status ? '-' : params.row.reviewTime}</span>
            )
          },
          {
            title: "审核者",
            key: "reviewer",
            align: "center"
          }
        ],
        data: []
      }
    };
  },
  methods: {
    getData(query) {
      accountsRecordData().then(res => {
        this.table.loading = true;
        setTimeout(() => {
          this.table.data = res.data;
          this.table.loading = false;
        }, 2000);
      });
    },
    searchSubmit() {},
    onPageChange(page) {
      let query = {
        page
      };
      this.getData(query);
    },
    onPageSizeChange(count) {
      // alert(count);
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
.ivu-form-item{
  &:nth-child(5){
    margin-right: -5px;
  }
}
</style>


