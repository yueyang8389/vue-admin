<template>
  <div>
    <div class="v2-search">
      <Form ref="searchKey" inline>
        <!-- <FormItem label="首存类型">
          <Select style="width:100px">
            <Option v-for="item in scList" :value="item.value" :key="item.value"></Option>
          </Select>
        </FormItem>-->
        <FormItem label="开始日期">
          <DatePicker type="date" class="s-120" v-model="searchKey.startTime"></DatePicker>
        </FormItem>
        <FormItem label="结束日期">
          <DatePicker type="date" class="s-120" v-model="searchKey.endTime"></DatePicker>
        </FormItem>
        <FormItem>
          <Checkbox>
            <span class="pl5">模糊</span>
          </Checkbox>
        </FormItem>
        <FormItem label="会员账号">
          <Input v-model="searchKey.account" placeholder="多个请以，逗号隔开" class="s-140"/>
        </FormItem>
        <FormItem>
          <Button type="primary" class="search">查询</Button>
        </FormItem>
        <FormItem>
          <Button type="primary" class='ivu-btn export' @click="exportExcel">导出EXCEL</Button>
        </FormItem>
      </Form>
    </div>
    <div class="v2-table">
      <Tables
        ref="tablesMain"
        v-if="status"
        :columns="table.columns"
        :loading="table.loading"
        :value="table.data"
        :total="table.total"
        @on-page-change="onPageChange"
        @on-page-size-change="onPageSizeChange"
        @on-sort-change="sortChange"
      ></Tables>
    </div>
  </div>
</template>
<script>
import Tables from "@/components/tables";
import { firstReportData } from "@/api/data";
import { sortInteraction } from "@/libs/util";
export default {
  name: "firstDepositRepost",
  components: {
    Tables
  },
  data() {
    return {
      status: true,
      loading: true,
      table: {
        loading: false,
        total: 100,
        columns: [
          {
            title: "会员账号",
            key: "account",
            align: "center"
          },
          {
            title: "账号类型",
            key: "agency",
            align: "center",
            render: (h, params) => {
              return (
                <span>
                  {params.row.type
                    ? "1级代理"
                    : params.row.status
                    ? "2级会员"
                    : "2级代理"}
                </span>
              );
            }
          },
          {
            title: "余额",
            key: "balance",
            align: "center",
            sortable: true
          },
          {
            title: "首存金额",
            key: "firstMoney",
            align: "center",
            sortable: true
          },
          {
            title: "首存时间",
            key: "firstTime",
            align: "center"
          },
          {
            title: "二存金额",
            key: "secondMoney",
            align: "center",
            sortable: true,
            render: (h, params) => {
              return <span>{params.row.secondMoney ? "1000000.00" : "-"}</span>;
            }
          },
          {
            title: "二存时间",
            key: "secondTime",
            align: "center",
            render: (h, params) => {
              return (
                <span>{params.row.secondTime ? "2019-01-29 18:34" : "-"}</span>
              );
            }
          },
          {
            title: "三存金额",
            key: "threeMoney",
            sortable: true,
            align: "center",
            render: (h, params) => {
              return <span>{params.row.threeMoney ? "1000000.00" : "-"}</span>;
            }
          },
          {
            title: "三存时间",
            key: "threeTime",
            align: "center",
            render: (h, params) => {
              return (
                <span>{params.row.threeTime ? "2019-01-29 18:34" : "-"}</span>
              );
            }
          },
          {
            title: "注册时间",
            key: "registerTime",
            align: "center"
          }
        ]
      },
      searchKey: {}
    };
  },
  methods: {
    exportExcel() {
      this.$refs.tablesMain.exportCsv({
        filename: `tablesMain-${new Date().valueOf()}.csv`
      });
    },
    getData(query) {
      firstReportData().then(res => {
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
    onPageSizeChange(count) {
      // alert(count);
    },
    sortChange(obj) {
      sortInteraction(obj);
    }
  },
  mounted() {
    this.$nextTick(() => {
      firstReportData().then(res => {
        this.table.loading = true;
        setTimeout(() => {
          this.table.data = res.data;
          this.table.loading = false;
        }, 2000);
      });
    });
  }
};
</script>
<style lang="less" scoped>
@import '../../styles/button.less';
.ivu-form-item {
  &:nth-child(3) {
    margin-right: -5px;
  }
}
</style>

