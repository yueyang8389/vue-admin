<template>
  <div>
    <div class="v2-search clearfix">
      <Form ref="searchKey" inline class="fl">
        <FormItem>
          <Checkbox>模糊</Checkbox>
        </FormItem>
        <FormItem label="会员账号">
          <Input v-model="searchKey.account" class="s-140" placeholder="多个请以,逗号隔开"/>
        </FormItem>
        <FormItem>
          <Button type="primary" class="search">查询</Button>
        </FormItem>
        <FormItem>
          <Button type="primary" class="ivu-btn export">导出EXCEL</Button>
        </FormItem>
      </Form>
      <div class="fr">
        <span class="ft16" style="fontWeight:bold;">当前彩票：</span>
        <span class="ft16">江苏快3</span>
      </div>
    </div>
    <div class="v2-table">
      <Tables
        editable
        :columns="table.columns"
        :loading="table.loading"
        :total="table.total"
        :value="table.data"
        @on-page-change='onPageChange'
        @on-page-size-change='onPageSizeChange'
      >
        <div slot="footer">
          <span class="ib br w10 txt-a">总计</span>
          <span class="ib br w10 txt-a">{{betNumber}}</span>
          <span class="ib br w10 txt-a">{{betAmount|unit}}</span>
          <span class="ib br w10 txt-a">{{effectBet|unit}}</span>
          <span class="ib br w10 txt-a">{{lotteryAmount|unit}}</span>
          <span class="ib br w10 txt-a">{{memberWin|unit}}</span>
          <span class="ib br w10 txt-a">{{withdrawalAmount|unit}}</span>
          <span class="ib br w10 txt-a">{{rebateAmount|unit}}</span>
          <span class="ib br w10 txt-a">{{profit|unit}}</span>
          <span class="ib br w10 txt-a">{{winRate|unit}}%</span>
        </div>
      </Tables>
    </div>
  </div>
</template>
<script>
import Tables from "@/components/tables";
import { lotteryReportDetailData } from "@/api/data";
export default {
  name: "lotteryReportDetail",
  components: {
    Tables
  },
  data() {
    return {
      //总计
      betNumber: 0,
      betAmount: 0,
      effectBet: 0,
      lotteryAmount: 0,
      memberWin: 0,
      withdrawalAmount: 0,
      rebateAmount: 0,
      profit: 0,
      winRate: 0,
      searchKey: {},
      table: {
        loading: true,
        total: 100,
        data: [],
        columns: [
          {
            title: "会员账号",
            key: "memberWin",
            align: "center",
            render: (h, params) => (
              <a><span class="blue-font" onClick={()=>this.$router.push({name:'gameReport',params:{type:'lottery'}})}>{params.row.account}</span></a>
            )
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
            title: "会员输赢",
            key: "memberWin",
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
  methods: {
    getData(query) {
      this.betNumber = this.betAmount = this.effectBet = this.memberWin = this.withdrawalAmount = this.rebateAmount = this.lotteryAmount = this.profit = this.winRate = 0;
      lotteryReportDetailData().then(res => {
        this.table.loading = true;
        setTimeout(() => {
          this.table.data = res.data;
          this.table.loading = false;
          this.table.data.map(item => {
            this.betNumber += item.betNumber * 1;
            this.betAmount += item.betAmount * 1;
            this.effectBet += item.effectBet * 1;
            this.lotteryAmount += item.lotteryAmount * 1;
            this.memberWin += item.memberWin * 1;
            this.withdrawalAmount += item.withdrawalAmount * 1;
            this.rebateAmount += item.rebateAmount * 1;
            this.profit = this.memberWin + this.rebateAmount;
            this.winRate = this.profit / this.betAmount;
          });
        }, 2000);
      });
    },
    onPageChange(page){
        this.getData(page);
    },
    onPageSizeChange(){}
  },
  mounted() {
    this.$nextTick(() => {
      this.getData();
    });
  },
  filters:{
      unit(value){
          return value.toFixed(2);
      }
  }
};
</script>
<style lang="less" scoped>
@import '../../styles/button.less';
</style>

