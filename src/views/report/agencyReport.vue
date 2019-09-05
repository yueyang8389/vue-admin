<template>
  <div>
    <div class="v2-search">
      <Form ref="searchKey" inline>
        <FormItem label="开始日期">
          <DatePicker type="date" placeholder="请选择" class="s-140" v-model="searchKey.startTime"></DatePicker>
        </FormItem>
        <FormItem label="结束日期">
          <DatePicker type="date" placeholder="请选择" class="s-140" v-model="searchKey.endTime"></DatePicker>
        </FormItem>
        <FormItem>
          <Checkbox>
            <span class="pl5">模糊</span>
          </Checkbox>
        </FormItem>
        <FormItem label="会员账号">
          <Input placeholder="多个请以,逗号隔开" class="s-140" v-model="searchKey.account"/>
        </FormItem>
        <FormItem>
          <Button type="primary" class="search" @click="searchSubmit">查询</Button>
        </FormItem>
        <FormItem>
          <Button type="primary" class="ivu-btn export" @click="exportExcel">导出EXCEL</Button>
        </FormItem>
      </Form>
    </div>
    <div class="v2-table">
      <Tables
        ref="tablesMain"
        editable
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
import { agencyReportData } from "@/api/data";
import { sortInteraction } from "@/libs/util";
export default {
  name: "agencyReport",
  components: {
    Tables
  },
  data() {
    return {
      searchKey: {},
      table: {
        loading: true,
        total: 100,
        data: [],
        columns: [
          {
            title: "代理账号",
            key: "account",
            align: "center"
          },
          {
            title: "账号类型",
            key: "type",
            align: "center"
          },
          {
            title: "注册人数",
            key: "registerNum",
            align: "center",
            sortable: true
          },
          {
            title: "投注人数",
            key: "bettingNum",
            align: "center",
            sortable: true
          },
          {
            title: "首存人数",
            key: "firstDepositNum",
            align: "center",
            sortable: true
          },
          {
            title: "投注金额",
            key: "bettingMon",
            align: "center",
            sortable: true
          },
          {
            title: "输赢报表",
            key: "profitReport",
            align: "center",
            sortable: true
          },
          {
            title: "活动礼金",
            key: "activityMon",
            align: "center",
            sortable: true
          },
          {
            title: "团队返点",
            key: "teamRebate",
            align: "center",
            sortable: true
          },
          {
            title: "存款金额",
            key: "depositAmount",
            align: "center",
            sortable: true
          },
          {
            title: "取款金额",
            key: "withdrawal",
            align: "center",
            sortable: true
          },
          {
            title: "团队净盈利",
            key: "teamProfit",
            align: "center",
            sortable: true
          },
          {
            title: "操作",
            key: "handle",
            align: "center",
            button: [
              (h, params, vm) => {
                return h(
                  "span",
                  {
                    style: {
                      color: "#75b1f5",
                      cursor: "pointer",
                      textAlign: "center"
                    },
                    on: {
                      click: () => {
                        this.$router.push({ name: "subordinateInfo" });
                      }
                    }
                  },
                  "查看下级"
                );
              }
            ]
          }
        ]
      }
    };
  },
  methods: {
    exportExcel() {
      this.$refs.tablesMain.exportCsv({
        filename: `tablesMain-${new Date().valueOf()}.csv`
      });
    },
    onPageChange(page) {
      this.getData(page);
    },
    onPageSizeChange() {},
    getData(query) {
      agencyReportData().then(res => {
        this.table.loading = true;
        setTimeout(() => {
          this.table.data = res.data;
          this.table.loading = false;
        }, 2000);
      });
    },
    searchSubmit() {},
    sortChange(obj){
      sortInteraction(obj)
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
.ivu-form-item {
  &:nth-child(3) {
    margin-right: -5px;
  }
}
</style>


