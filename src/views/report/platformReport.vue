<template>
  <div>
    <div class="v2-search">
      <Form ref="searchKey" inline>
        <FormItem label="游戏类型">
          <Select v-model="searchKey.type" class="s-120" clearable>
            <Option v-for="(item,index) in typeList" :key="index" :value="item.key">{{item.value}}</Option>
          </Select>
        </FormItem>
        <!-- <FormItem label="游戏平台">
          <Select v-model="searchKey.gamePlatform" class="s-120" clearable>
            <Option
              v-for="(item,index) in gamePlatformList"
              :key="index"
              :value="item.value"
            >{{item.title}}</Option>
          </Select>
        </FormItem>-->
        <FormItem label="时区">
          <Select v-model="searchKey.timeZone" class="s-120">
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
          <Button type="primary" class="ivu-btn export " @click="exportExcel">导出EXCEL</Button>
        </FormItem>
      </Form>
    </div>
    <div class="v2-table">
      <Tables
      ref="tablesMain"
        editable
        :columns="table.columns"
        :loading="table.loading"
        :total="table.total"
        :value="table.data"
        @on-page-change="onPageChange"
        @on-page-size-change="onPageSizeChange"
        @on-sort-change='sortChange'
      >
        <div slot="footer" style="width:101.6%" v-if="userWidth == 'middle'">
          <span class="w985 ib txt-a ft12 br" style="width:9.7%">总计</span>
          <span class="w983 ib txt-a br ft12" style="width:9.7%">{{betPeopleSum|unit}}</span>
          <span class="w983 ib txt-a br ft12" style="width:9.65%">{{betSum|unit}}</span>
          <span class="w983 ib txt-a br ft12" style="width:9.65%">{{betMoneySum|unit}}</span>
          <span class="w983 ib txt-a br ft12" style="width:9.65%">{{rateSum|unit}}</span>
          <span class="w983 ib txt-a br ft12" style="width:9.7%">{{platformSum|unit}}</span>
          <span class="w983 ib txt-a br ft12" style="width:9.7%">{{winRateSum|unit}}%</span>
          <span class="w115 ib txt-a br ft12" style="width:200px">-</span>
          <span class="w983 ib txt-a br ft12" style="width:9.7%">{{activePeopleSum}}</span>
          <span class="w983 ib txt-a ft12 br" style="width:9.7%">{{activeMoneySum|unit}}</span>
        </div>

        <div slot="footer" style="width:100%"  v-if="userWidth == 'large'">
          <span class="ib txt-a ft13 br w102" style="width:10.22%" >总计</span>
          <span class="ib txt-a ft13 br w102" style="width:10.18%" >{{betPeopleSum|unit}}</span>
          <span class="ib txt-a ft13 br w102" style="width:10.15%">{{betSum|unit}}</span>
          <span class="ib txt-a ft13 br w1015" style="width:10.18%">{{betMoneySum|unit}}</span>
          <span class="ib txt-a ft13 br w1015" style="width:10.18%">{{rateSum|unit}}</span>
          <span class="ib txt-a ft13 br w102" style="width:10.18%">{{platformSum|unit}}</span>
          <span class="ib txt-a ft13 br w1015" style="width:10.17%">{{winRateSum|unit}}%</span>
          <span class="ib txt-a ft13 br w200x" style="width:200px">-</span>
          <span class="ib txt-a ft13 br w102" style="width:10.17%">{{activePeopleSum}}</span>
          <span class="ib txt-a ft13 br w1014" style="width:10.15%">{{activeMoneySum|unit}}</span>
        </div>
      </Tables>
    </div>
  </div>
</template>
<script>
import { mapState } from "vuex";
import Icons from "@/components/icons";
import { platformReportData } from "@/api/data";
import Tables from "@/components/tables";
import {sortInteraction} from '@/libs/util';
export default {
  name: "platformReport",
  data() {
    return {
       screenWidth: document.body.clientWidth,
      userWidth: "",
      betPeopleSum: 0,
      betSum: 0,
      betMoneySum: 0,
      rateSum: 0,
      platformSum: 0,
      winRateSum: 0,
      activePeopleSum: 0,
      activeMoneySum: 0,
      searchKey: {},
      Time: [],
      gamePlatformList: [],
      table: {
        loading: true,
        total: 100,
        data: [],
        columns: [
          {
            title: "游戏平台",
            align: "center",
            render: (h, params) => (
              <span>{params.row.gamePlatform ? "欧博视讯" : "EBET视讯"}</span>
            )
          },
          {
            title: "投注人数",
            key: "betPeople",
            align: "center",
            sortable: true
          },
          {
            title: "注单数量",
            key: "bet",
            align: "center",
            sortable: true
          },
          {
            title: "投注金额",
            key: "betMoney",
            align: "center",
            sortable: true
          },
          {
            title: "有效投注",
            key: "rate",
            align: "center",
            sortable: true
          },
          {
            title: "平台报表",
            key: "platform",
            align: "center",
            sortable: true
          },
          {
            title: "赢率",
            key: "winRate",
            align: "center",
            sortable: true
          },
          {
            align: "center",
            renderHeader: (h, params) => {
              return h("div", [
                h("span", "活动类型"),
                h(
                  "Poptip",
                  {
                    props: {
                      trigger: "hover",
                      content: "平台方活动"
                    }
                  },
                  [
                    h(Icons, {
                      props: {
                        type: "bangzhutishi"
                      },
                      style: {
                        color: "#b3b3b3",
                        marginLeft: "5px"
                      }
                    })
                  ]
                )
              ]);
            },
            render: (h, params) => {
              let text = params.row.type1
                ? "赌神赛"
                : params.row.type2
                ? "亿万现金红红包天天免费抢"
                : "-";
              return <span>{{ text }}</span>;
            },
            width: "200"
          },
          {
            title: "活动人数",
            key: "activePeople",
            align: "center",
            sortable: true
          },
          {
            title: "活动金额",
            key: "activeMoney",
            align: "center",
            sortable: true,
            render: (h, params) => {
              return h(
                "a",
                {
                  style: {
                    color: "#808080"
                  }
                },
                params.row.activeMoney
              );
            }
          }
        ]
      }
    };
  },
  components: {
    Tables,
    Icons
  },
  computed: {
    ...mapState({
      typeList: state => state.info.platformReport
    })
  },
  methods: {
    getData(query) {
      this.betPeopleSum = this.betSum = this.betMoneySum = this.rateSum = this.platformSum = this.winRateSum = this.activePeopleSum = this.activeMoneySum = 0;
      platformReportData().then(res => {
        console.log(res)
        this.table.loading = true;
        setTimeout(() => {
          this.table.data = res.data;
          this.table.loading = false;
          this.table.data.map(item => {
            this.betPeopleSum += item.betPeople * 1;
            this.betSum += item.bet * 1;
            this.betMoneySum += item.betMoney * 1;
            this.rateSum += item.rate * 1;
            this.platformSum += item.platform * 1;
            this.winRateSum += item.winRate.split(".")[0] * 1;
            this.activePeopleSum += item.activePeople * 1;
            this.activeMoneySum += item.activeMoney * 1;
          });
        }, 2000);
      });
    },
    //获取对应游戏类型的平台
    getGamePlatform(type) {
      this.typeList.map(item => {
        if (item.key == type) {
          this.gamePlatformList = item.gameList;
        }
      });
    },
    searchSubmit() {},
   exportExcel(){
      this.$refs.tablesMain.exportCsv({
        filename: `tablesMain-${(new Date()).valueOf()}.csv`
      })
    },
    onPageChange(page) {
      this.getData(page);
      let query = {
        page: page
      };
      this.getData(query);
    },
    onPageSizeChange() {},
    sortChange(obj){
      sortInteraction(obj)
    }
  },
  watch: {
    "searchKey.type"() {
      this.getGamePlatform(this.searchKey.type);
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getData();
    });

    const that = this
    window.onresize = () => {
        return (() => {
            window.screenWidth = document.body.clientWidth
            that.screenWidth = window.screenWidth
        })()
    }

  },
  created() {
    let mode = screen.width;
    if (mode > 1920) {
      this.userWidth = "large";
    } else {
      this.userWidth = "middle";
    }
  },
  filters: {
    unit(value) {
      return value;
    }
  },
  watch: {
            screenWidth (val) {
                if (!this.timer) {
                    this.screenWidth = val
                    this.timer = true
                    let that = this
                    setTimeout(function () {
                        // that.screenWidth = that.$store.state.canvasWidth
                        // that.init()
                        that.timer = false
                    }, 400)
                }
            }
   }
};
</script>
<style lang="less" scoped>
@import '../../styles/button.less';
// .w985 {
//   width: 9.7%;
// }
// .w983 {
//   width: 9.7%;
// }
// .w115 {
//   width: 11%;
// }
// .w102 {
//   width: 10%;
// }
// .w1015 {
//   width: 10.15%;
// }
// .w840 {
//   width: 8.4%;
// }
// .w1014 {
//   width: 10.14%;
// }
// .w200x {
//   width: 200px;
// }
</style>