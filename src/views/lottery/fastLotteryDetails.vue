<template>
  <div class="v2-table">
    <Tables
      editable
      :columns="table.columns"
      :loading="table.loading"
      :value="table.data"
      :total="table.total"
      :more="table.more"
      @on-page-change="onPageChange"
      @on-page-size-change="onPageSizeChange"
    ></Tables>
  </div>
</template>
<script>
import { lotteryDetails } from "@/api/data";
import Tables from "@/components/tables";
export default {
  name: "fastLotteryDetails",
  components: { Tables },
  data() {
    return {
      table: {
        loading: true,
        total: 100,
        title: "彩票详情",
        data: [],
        columns: [
          {
            title: "期数",
            key: "periods",
            align: "center",
            render:(h,params) => <span>{params.row.periods.replace(/-/g,'')}</span>
          },
          {
            title: "开奖结果",
            key: "awardResult",
            align: "center",
            width: "320px",
            render: (h, params) => {
              if (
                (!params.row.return && params.row.status) ||
                (!params.row.return && !params.row.status)
              ) {
                return <span>-</span>;
              } else {
                return (
                  <div>
                    <span
                      class="mr10  yellowColor blockLottery"
                    >
                      {params.row.awardResult.split(",")[0]}
                    </span>
                    <span
                      class="mr10 redColor blockLottery"
          
                    >
                      {params.row.awardResult.split(",")[1]}
                    </span>
                    <span
                      class="mr10 blueColor blockLottery"
                    >
                      {params.row.awardResult.split(",")[2]}
                    </span>
                    <span
                      class="mr10 orangeColor blockLottery"
                    >
                      {params.row.awardResult.split(",")[3]}
                    </span>
                    <span
                      class="mr10 bluishColor blockLottery"
                    >
                      {params.row.awardResult.split(",")[4]}
                    </span>
                    <span
                      class="mr10 drakBlueColor blockLottery"
                    >
                      {params.row.awardResult.split(",")[5]}
                    </span>
                    <span
                      class="mr10 drakedColor blockLottery"
                    >
                      {params.row.awardResult.split(",")[6]}
                    </span>
                    <span
                      class="mr10 greenColor blockLottery"
                    >
                      {params.row.awardResult.split(",")[7]}
                    </span>
                    <span
                      class="mr10 grayColor blockLottery"
                    >
                      {params.row.awardResult.split(",")[8]}
                    </span>
                    <span
                      class="mr10 whiteColor blockLottery"
                    >
                      {params.row.awardResult.split(",")[9]}
                    </span>
                  </div>
                );
              }
            }
          },
          {
            title: "注单数量",
            key: "number",
            align: "center",
            render: (h, params) => {
              let txt;
              if (
                (!params.row.return && params.row.status) ||
                (!params.row.return && !params.row.status)
              ) {
                return <span>0</span>;
              } else {
                return <span>{params.row.number}</span>;
              }
            }
          },
          {
            title: "有效投注",
            key: "validBet",
            align: "center"
          },
          {
            title: "会员输赢",
            key: "bunko",
            align: "center",       
          },
          {
            title: "有效投注(黑名单)",
            key: "validBet1",
            align: "center",
          },
          {
            title: "会员输赢(黑名单)",
            key: "bunko1",
            align: "center",
          },
          {
            title: "开奖模式",
            key: " pattern",
            align: "center",
            render: (h, params) => {
              let color = params.row.type
                ? "#515a6e"
                : params.row.status
                ? "#515a6e"
                : "#515a6e";
              return (
                <span style={{ color }}>
                  {params.row.type
                    ? "随机"
                    : params.row.status
                    ? "放水"
                    : "控制"}
                </span>
              );
            }
          },
          {
            title: "状态",
            key: "status",
            align: "center",
            render: (h, params) => {
              let txt;
              let color;
              if (!params.row.return && params.row.status) {
                txt = "待开奖";
                color = "#ff9655";
              } else if (!params.row.status && params.row.return) {
                txt = "未结算";
                color = "#ff2626";
              } else if (params.row.status && params.row.return) {
                txt = "已结算";
               
              } else {
                txt = "未开奖";
                color = "#ff9655";
              }
              return <span style={{ color }}>{txt}</span>;
            }
          },
          {
            title: "开奖时间",
            key: "drawTime",
            align: "center",
            render:(h,params) => (
              <span>{!params.row.status && params.row.return ? '-' : params.row.drawTime}</span>
            )
          }
        ]
      }
    };
  },
  methods: {
    getData(query) {
      lotteryDetails().then(res => {
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

</style>
