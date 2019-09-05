<template>
  <div>
    <div class="v2-search">
      <Form ref="searchKey" inline>
        <FormItem class="s-50">
          <Icons type="gengduo" v-show="show" @click="() => {show = !show}"></Icons>
          <Icons type="gengduozhankai" v-show="!show" @click="() => {show = !show}"></Icons>
          <span @click="() => {show = !show}">更多</span>
        </FormItem>
        <FormItem label="游戏类型">
          <Select v-model="searchKey.type" class="s-120">
            <Option v-for="(item,index) in gameType" :key="index" :value="item.key">{{item.value}}</Option>
          </Select>
        </FormItem>
        <FormItem label="游戏平台">
          <Select v-model="searchKey.platform" class="s-140">
            <Option
              v-for="(item,index) in gamePlatform"
              :key="index"
              :value="item.key"
            >{{item.value}}</Option>
          </Select>
        </FormItem>
        <FormItem label="开始日期">
          <DatePicker type="date" placeholder="请选择开始日期" class="s-140" v-model="Time[0]"></DatePicker>
        </FormItem>
        <FormItem label="结束日期">
          <DatePicker type="date" placeholder="请选择结束日期" class="s-140" v-model="Time[1]"></DatePicker>
        </FormItem>
        <FormItem label="注单编号">
          <Input class="s-140" v-model="searchKey.noteNumber" placeholder="请输入注单编号"/>
        </FormItem>
        <FormItem>
          <Checkbox>模糊</Checkbox>
        </FormItem>
        <FormItem label="会员账号" v-show="!show" class="ml50">
          <Input v-model="searchKey.account" placeholder="多个请以,逗号隔开" class="s-140"/>
        </FormItem>
        <FormItem label="开奖状态" v-show="!show">
          <Select class="s-86" v-model="searchKey.status">
            <Option v-for="(item,index) in statusList" :key="index" :value="item.key">{{item.value}}</Option>
          </Select>
        </FormItem>
        <FormItem label="结算状态" v-show="!show">
          <Select v-model="searchKey.settle" class="s-86">
            <Option value="ok">已结算</Option>
            <Option value="no">未结算</Option>
          </Select>
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
        <div slot="footer" class="bg">
          <span class="td br">本页统计</span>
          <span class="pl20 pr10">投注金额 100000000.00</span>
          <span class="pl20 pr10">有效投注 100000000.00</span>
          <span class="pl20 pr10">会员输赢 -100000000.00</span>
          <span class="pl20 pr10">返点金额 -100000000.00</span>
        </div>
        <div slot="more" class="clearfix">
          <span class="td fl">总计</span>
           <span class="pl20 pr20 fl">投注金额 100000000.00</span>
          <span class="pl10 pr20 fl">有效投注 100000000.00</span>
          <span class="pl10 pr20 fl">会员输赢 -100000000.00</span>
          <span class="pl20 pr20 fl">返点金额 -100000000.00</span>
        </div>
      </Tables>
    </div>
  </div>
</template>
<script>
import { memberGameRecordData } from "@/api/data";
import Tables from "@/components/tables";
import Icons from "@/components/icons";
import { mapState } from "vuex";
export default {
  components: {
    Tables,
    Icons
  },
  computed: {
    ...mapState({
      gameType: state => state.info.gameType,
      gamePlatform: state => state.info.gamePlatform
    })
  },
  data() {
    return {
      show: true,
      searchKey: {},
      Time: [],
      statusList: [
        { key: "daikj", value: "待开奖" },
        { key: "yizj", value: "已中奖" },
        { key: "weizj", value: "未中奖" },
        { key: "yicd", value: "已撤单" },
        { key: "weizj", value: "未中奖" }
      ],
      table: {
        loading: true,
        more:true,
        total: 100,
        data: [],
        columns: [
          {
            title: "注单编号",
            key: "noteNumber",
            align: "center",
            width: "105"
          },
          {
            title: "游戏平台",
            key: "gamePlatform",
            align: "center"
          },
          {
            title: "会员账号",
            key: "account",
            align: "center"
          },
          {
            title: "游戏账号",
            key: "gameAccount",
            align: "center",
            width: "115"
          },
          {
            title: "期数",
            key: "periods",
            align: "center",
            tooltip:true
          },
          {
            title: "玩法",
            align: "center",
            render: (h, params) => (
              <span>{params.row.periods ? "点数" : "两面盘"}</span>
            )
          },
          {
            title: "玩号",
            align: "center",
            render: (h, params) => (
              <span>{params.row.periods ? "-" : "第一名"}</span>
            )
          },
          {
            title: "下注内容",
            align: "center",
            render: (h, params) => (
              <span>{params.row.periods ? "小" : "单"}</span>
            )
          },
          {
            title: "赔率",
            align: "center",
            render: (h, params) => (
              <span>{params.row.periods ? "45.11" : "1.98"}</span>
            )
          },
          {
            title: "投注金额",
            key: "betAmount",
            align: "center",
            sortable: true,
            width: "100"
          },
          {
            title: "有效投注",
            key: "effectBet",
            align: "center",
            sortable: true,
            width: "100"
          },
          {
            title: "会员输赢",
            key: "memberWin",
            align: "center",
            sortable: true,
            width: "100"
          },
          {
            title: "开奖结果",
            align: "center",
            tooltip: true,
            key: "lotteryResult"
          },
          {
            title: "返点值",
            align: "center",
            render: (h, params) => (
              <span>{params.row.periods ? "0.50%" : "0.00%"}</span>
            )
          },
          {
            title: "返点金额",
            align: "center",
            render: (h, params) => (
              <span>{params.row.periods ? "100000000.00" : "0.00"}</span>
            ),
            width: "100"
          },
          {
            title: "开奖状态",
            align: "center",
            render: (h, params) => {
              let txt, color;
              if (params.row.lotteryStatus && params.row.lotteryReturn) {
                (txt = "待开奖"), (color = "#122ca1");
              } else if (
                params.row.lotteryStatus &&
                !params.row.lotteryReturn
              ) {
                (txt = "已中奖"), (color = "#12a11e");
              } else if (
                !params.row.lotteryStatus &&
                params.row.lotteryReturn
              ) {
                (txt = "未中奖"), (color = "#d81111");
              } else {
                (txt = "已撤单"), (color = "#cf9e16");
              }
              return <span style={{ color }}>{txt}</span>;
            }
          },
          {
            title: "结算状态",
            align: "center",
            render: (h, params) => {
              let txt, color;
              if (params.row.lotteryStatus && params.row.lotteryReturn) {
                (txt = "-"), (color = "#312d2b");
              } else if (
                params.row.lotteryStatus &&
                !params.row.lotteryReturn
              ) {
                txt = params.row.settleStatus ? "未结算" : "已结算";
                color = params.row.settleStatus ? "#db1111" : "#12a11e";
              } else if (
                !params.row.lotteryStatus &&
                params.row.lotteryReturn
              ) {
                txt = params.row.settleStatus ? "未结算" : "已结算";
                color = params.row.settleStatus ? "#db1111" : "#12a11e";
              } else {
                (txt = "-"), (color = "#312d2b");
              }
              return <span style={{ color }}>{txt}</span>;
            }
          },
          {
            title: "下注时间/结算时间",
            align: "center",
            render: (h, params) => (
              <div>
                <p>2018-10-18 19:52:52</p>
                <hr />
                <p>
                  {(params.row.lotteryStatus &&
                    !params.row.lotteryReturn &&
                    params.row.settleStatus) ||
                  (!params.row.lotteryStatus &&
                    params.row.lotteryReturn &&
                    params.row.settleStatus)
                    ? "2018-10-18 19:53:52"
                    : "-"}
                </p>
              </div>
            ),
            width: "115"
          }
        ]
      }
    };
  },
  methods: {
    getData(query) {
      memberGameRecordData().then(res => {
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
.td{
  width: 105px;
  display: inline-block;
  text-align: center;
}
.bg{
  background: rgba(235, 235, 235, .6)
}
.ivu-col,.ivu-vol-span-12{
  .clearfix{
    width: 130% !important;
  }
}
</style>

