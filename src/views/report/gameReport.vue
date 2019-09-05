<template>
  <div>
    <div class="v2-search" v-show="type == 'default'">
      <Form ref="searchKey" inline>
        <FormItem label="游戏类型">
          <Select v-model="searchKey.type" clearable class="s-100">
            <Option v-for="(item,index) in gameType" :key="index" :value="item.key">{{item.value}}</Option>
          </Select>
        </FormItem>
        <FormItem label="游戏平台" v-show="searchKey.type">
          <Select v-model="searchKey.platform" clearable class="s-120">
            <Option
              v-for="(item,index) in gamePlatform"
              :key="index"
              :value="item.key"
            >{{item.value}}</Option>
          </Select>
        </FormItem>
        <FormItem label="起止日期">
          <DatePicker type="date" class="s-100" placeholder="开始时间" v-model="Time[0]"></DatePicker>
          <span class="ml10 mr10 " style="color:#e4e4e4">—</span>
          <DatePicker type="date" class="s-120" v-model="searchKey.endTime"></DatePicker>
        </FormItem>
        <FormItem label="注单编号">
          <Input class="s-180" v-model="searchKey.noteNumber" placeholder="请输入注单编号"/>
        </FormItem>
        <FormItem label="局号">
          <Input class="s-140" v-model="searchKey.noteNumber" placeholder="请输入局号"/>
        </FormItem>
        <FormItem label="会员账号">
          <Input class="s-140" v-model="searchKey.noteNumber" placeholder="多个请以，逗号隔开"/>
        </FormItem>
        <FormItem>
          <Checkbox>
            <span class="pl5">模糊</span>
          </Checkbox>
        </FormItem>
        <FormItem label="会员账号">
          <Input v-model="searchKey.account" placeholder="多个请以,逗号隔开" class="s-140"/>
        </FormItem>
        <FormItem>
          <Button type="primary" class="search">查询</Button>
        </FormItem>
        <FormItem>
          <Button type="primary" class="ivu-btn export " @click="exportExcel">导出EXCEL</Button>
        </FormItem>
      </Form>
    </div>
    <div class="v2-table" v-show="type == 'default'">
      <Tables
       ref="tablesMain"
        editable
        :columns="table.columns"
        :loading="table.loading"
        :value="table.data"
        :total="table.total"
        @on-page-change="onPageChange"
        @on-page-size-change="onPageSizeChange"
      >
        <div slot="footer">
          <div class="clearfix">
            <p class="fl ml20">
              <span>本页统计</span>
            </p>
            <p class="fl ml70">
              <span>投注金额</span>
              <span class="pl15 red-font">100000000.00</span>
            </p>
            <p class="fl ml70">
              <span>有效投注</span>
              <span class="pl15 red-font">100000000.00</span>
            </p>
            <p class="fl ml70">
              <span>会员输赢</span>
              <span class="pl15 red-font">-100000000.00</span>
            </p>
          </div>
          <div class="bt clearfix">
            <p class="fl ml30">
              <span>总计</span>
            </p>
            <p class="fl ml90">
              <span>投注金额</span>
              <span class="pl15 red-font">100000000.00</span>
            </p>
            <p class="fl ml70">
              <span>有效投注</span>
              <span class="pl15 red-font">100000000.00</span>
            </p>
            <p class="fl ml70">
              <span>会员输赢</span>
              <span class="pl15 red-font">-100000000.00</span>
            </p>
          </div>
        </div>
      </Tables>
    </div>
    <lottery-record v-show="type == 'lottery'"></lottery-record>
  </div>
</template>
<script>
import lotteryRecord from "./components/lotteryRecord";
import Tables from "@/components/tables";
import { mapState } from "vuex";
import { gameRecordData } from "@/api/data";
export default {
  name: "gameReport",
  components: {
    lotteryRecord,
    Tables
  },
  computed: {
    ...mapState({
      gameType: state => state.info.gameType,
      gamePlatform: state => state.info.gamePlatform
    })
  },
  data() {
    return {
      type: "default",
      searchKey: {},
      Time: [],
      table: {
        loading: true,
        total: 100,
        columns: [
          {
            title: "注单编号",
            key: "number",
            align: "center"
          },
          {
            title: "局号",
            key: "bureau",
            align: "center"
          },
          {
            title: "游戏平台",
            key: "gamePlatform",
            align: "center",
            render: (h, params) => {
              return (
                <span>{params.row.gamePlatform ? "EBET视讯" : "BG视讯"}</span>
              );
            }
          },
          {
            title: "会员账号",
            key: "memberAccount",
            align: "center"
          },
          {
            title: "游戏账号",
            key: "gameAccount",
            align: "center",
            render: (h, params) => {
              return (
                <span>
                  {params.row.gameAccount ? "zl-111111" : "zl-333233"}
                </span>
              );
            }
          },
          {
            title: "投注金额",
            key: "betMoney",
            align: "center",
            sortable: true
          },
          {
            title: "有效投注",
            key: "validBet",
            align: "center",
            sortable: true
          },
          {
            title: "会员输赢",
            key: "memberSy",
            align: "center",
            sortable: true
          },
          {
            title: "玩法",
            key: "play",
            align: "center"
          },
          {
            title: "下注时间",
            key: "betTime",
            align: "center"
          }
        ],
        data: []
      }
    };
  },
  methods: {
    getData(query) {
      gameRecordData().then(res => {
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
        page: page
      };
      this.getData(query);
    },
    onPageSizeChange(count) {
      
    },
    exportExcel () {
      this.$refs.tablesMain.exportCsv({
        filename: `tablesMain-${(new Date()).valueOf()}.csv`
      })
    }
  },

  mounted() {
    this.$nextTick(() => {
      this.getData();
    });
  },
  beforeRouteEnter(to, from, next) {
    if (from.path == "/lotteryReportDetail") {
      next(vm => {
        vm.type = vm.$route.params.type;
      });
    }
    next();
  }
};
</script>
<style lang="less" scoped>
@import '../../styles/button.less';
/deep/.ivu-table{
  font-size: 14px;
}
.ivu-form-item{
  &:nth-child(7){
    margin-right: -5px;
  }
}
</style>


