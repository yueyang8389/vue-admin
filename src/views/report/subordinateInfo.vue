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
        <FormItem class="ml10">
          <Checkbox>模糊</Checkbox>
        </FormItem>
        <FormItem label="会员账号">
          <Input v-model="searchKey.account" placeholder="多个请以,逗号隔开" class="s-140"/>
        </FormItem>
        <FormItem>
          <Button type="primary" class="search">查询</Button>
        </FormItem>
        <FormItem>
          <Button type="primary" class="ivu-btn export">导出EXCEL</Button>
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
      >
        <div class="clearfix" slot="more" style="color:#d1d1d1">
          <span class="fl sj">上级：1111111</span>
        </div>
      </Tables>
    </div>
  </div>
</template>
<script>
import { checkSubordinate } from "@/api/data";
import Tables from "@/components/tables";
export default {
  name: "subordinateInfo",
  components: { Tables },
  data() {
    return {
      searchKey: {},
      table: {
        more: true,
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
            align: "center",
            render: (h, params) => (
              <span>{params.row.type ? "2级会员" : "2级代理"}</span>
            )
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
            title: "团都净盈利",
            key: "teamProfit",
            align: "center"
          },
          {
            title: "操作",
            key: "type",
            align: "center",
            render: (h, params) => {
              let color = params.row.type ? "" : "#57a3f3";
              return (
                <span style={{ color }} class="cs">
                  {params.row.type ? "-" : "查看下级"}
                </span>
              );
            }
          }
        ]
      }
    };
  },
  methods: {
    getData(query) {
      checkSubordinate().then(res => {
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
    onPageSizeChange() {}
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
.clearfix {
  height: 36px;
  line-height: 36px;
  .sj {
    border: 1px solid #e4e4e4;
    width: 140px;
    text-align: center;
    color: #808080;
  }
  
}
</style>

