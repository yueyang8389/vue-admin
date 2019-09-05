<template>
  <div>
    <div class="v2-search">
      <Form inline ref="searchKey">
        <FormItem label="彩票分类">
          <Select v-model="searchKey.type" class="s-140">
            <Option
              v-for="(item,index) in lotteryType"
              :key="index"
              :value="item.key"
            >{{item.value}}</Option>
          </Select>
        </FormItem>
        <!-- <FormItem label="彩票名称">
          <Select v-model="searchKey.lotteryName" class="s-140">
            <Option
              v-for="(item,index) in lotteryNameList"
              :key="index"
              :value="item.key"
            >{{item.value}}</Option>
          </Select>
        </FormItem> -->
        <FormItem label="时区">
          <Select v-model="searchKey.timeZone" class="s-140">
            <Option value="beijing">北京时间</Option>
            <Option value="meidong">美东时间</Option>
          </Select>
        </FormItem>
        <FormItem label="开始日期">
          <DatePicker type="date" placeholder="请选择开始日期" class="s-140" v-model="Time[0]"></DatePicker>
        </FormItem>
        <FormItem label="结束日期">
          <DatePicker type="date" placeholder="请选择结束日期" class="s-140" v-model="Time[1]"></DatePicker>
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
        @on-sort-change='sortChange'
      >
        <div slot="footer">
          <span class="td">总计</span>
          <span class="td">{{betMember|unit}}</span>
          <span class="td">{{betNumber|unit}}</span>
          <span class="td">{{betAmount|unit}}</span>
          <span class="td">{{effectBet|unit}}</span>
          <span class="td">{{lotteryAmount|unit}}</span>
          <span class="td">{{withdrawalAmount|unit}}</span>
          <span class="td">{{rebateAmount|unit}}</span>
          <span class="td">{{profit|unit}}</span>
          <span class="td">{{winRate|unit}}%</span>
        </div>
      </Tables>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Tables from "@/components/tables";
import { lotteryReportData } from "@/api/data";
import {sortInteraction} from '@/libs/util';
export default {
  name: "lotteryReport",
  components: {
    Tables
  },
  data() {
    return {
      searchKey: {},
      lotteryNameList: [],
      Time: [],
      betMember: 0,
      betNumber: 0,
      betAmount: 0,
      effectBet: 0,
      lotteryAmount: 0,
      withdrawalAmount: 0,
      rebateAmount: 0,
      profit: 0,
      winRate: 0,
      table: {
        loading: true,
        total: 100,
        data: [],
        columns: [
          {
            title: "彩票名称",
            key: "lotteryName",
            align: "center",
            render: (h, params) => (
              <a>
                <span
                  class="blue-font"
                  onClick={() =>
                    this.$router.push({ name: "lotteryReportDetail" })
                  }
                >
                  {params.row.lotteryName ? "江苏快3" : "快速赛车PK10"}
                </span>
              </a>
            )
          },
          {
            title: "投注人数",
            key: "betMember",
            align: "center",
            sortable: true
          },
          {
            title: "注单数量",
            key: "betNumber",
            align: "center",
            sortable: true
          },
          {
            title: "投注金额",
            key: "betAmount",
            align: "center",
            sortable: true
          },
          {
            title: "有效投注",
            key: "effectBet",
            align: "center",
            sortable: true
          },
          {
            title: "中奖金额",
            key: "lotteryAmount",
            align: "center",
            sortable: true
          },
          {
            title: "撤单金额",
            key: "withdrawalAmount",
            align: "center",
            sortable: true
          },
          {
            title: "返点金额",
            key: "rebateAmount",
            align: "center",
            sortable: true
          },
          {
            title: "盈利",
            key: "profit",
            align: "center",
            sortable: true
          },
          {
            title: "赢率",
            key: "winRate",
            align: "center",
            sortable: true
          }
        ]
      }
    };
  },
  computed: {
    ...mapState({
      lotteryType: state => state.info.lotteryType
    })
  },
  watch: {
    "searchKey.type"() {
      this.lotteryNameList = this.lotteryType.filter(
        item => item.key == this.searchKey.type
      )[0].info;
    }
  },
  methods: {
    searchSubmit() {},
    exportExcel(){
      this.$refs.tablesMain.exportCsv({
        filename: `tablesMain-${(new Date()).valueOf()}.csv`
      })
    },
    getData(query) {
      lotteryReportData().then(res => {
        this.table.loading = true;
        this.betMember = this.betNumber = this.betAmount = this.effectBet = this.lotteryAmount = this.withdrawalAmount = this.rebateAmount = this.profit = this.winRate = 0;
        setTimeout(() => {
          this.table.data = res.data;
          this.table.loading = false;
          this.table.data.map(item => {
            this.betMember += item.betNumber * 1;
            this.betNumber += item.betNumber * 1;
            this.betAmount += item.betAmount * 1;
            this.effectBet += item.effectBet * 1;
            this.lotteryAmount += item.lotteryAmount * 1;
            this.withdrawalAmount += item.withdrawalAmount * 1;
            this.rebateAmount += item.rebateAmount * 1;
            this.profit += item.profit * 1;
            this.winRate += this.profit / this.betAmount;
          });
        }, 2000);
      });
    },
    onPageChange(page) {
      this.getData(page);
    },
    onPageSizeChange() {},
    sortChange(obj){
      sortInteraction(obj)
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getData();
    });
  },
  filters: {
    unit(value) {
      return value.toFixed(2);
    }
  }
};
</script>
<style lang="less" scoped>
@import '../../styles/button.less';
.td,
.td2,
.td3 {
  display: inline-block;
  width: 10%;
  text-align: center;
  border-right: 1px solid #ebebeb;
  font-size: 14px;
}
</style>


