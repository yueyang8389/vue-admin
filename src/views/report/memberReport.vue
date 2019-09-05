<template>
  <div>
    <div class="v2-search">
      <Form ref="searchKey" inline>
        <FormItem label="开始日期">
          <DatePicker type="date" placeholder="请选择开始日期" class="s-140" v-model="Time[0]"></DatePicker>
        </FormItem>
        <FormItem label="结束日期">
          <DatePicker type="date" placeholder="请选择结束日期" class="s-140" v-model="Time[1]"></DatePicker>
        </FormItem>
        <FormItem>
          <Checkbox>
            <span class="pl5">模糊</span>
          </Checkbox>
        </FormItem>
        <FormItem>
          <Select class="s-140" v-model="searchKey.type">
            <Option value="vip">会员账号</Option>
            <Option value="vip">上级代理</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Input placeholder="账号/姓名/上级代理" class="s-140" v-model="searchKey.account"/>
          <Poptip trigger="hover" content="多个请以,逗号隔开,仅支持同类型多个输入" placement="bottom-end">
            <Icons type="tishi" color="#E4E4E4" :size="26"/>
          </Poptip>
        </FormItem>
        <FormItem>
        <Button type="primary" class="search ml10f" @click="searchSubmit">查询</Button>
        </FormItem>
        <FormItem>
          <Button type="primary" class="ivu-btn export" @click="exportExcel">导出EXCEL</Button>
        </FormItem>
      </Form>
    </div>
    <div class="v2-table">
      <Tables
      ref="tablesMain"
       class="mv" 
      v-bind:style="{width:myWidth}"
        editable
        :columns="table.columns"
        :loading="table.loading"
        :value="table.data"
        :total="table.total"
        @on-page-change="onPageChange"
        @on-page-size-change="onPageSizeChange"
        @on-sort-change='sortChange'
      >
        <div slot="footer" style="width:99.9%" v-if="userWidth == 'middle'">
           <span class="ib br txt-a w675" style="width:7.2%" >总计</span>
          <span class="ib br  txt-a w675" style="width:7.0%">-</span>
          <span class="ib br txt-a w675" style="width:7.15%">100000000.00</span>
          <span class="ib br txt-a w675" style="width:7.15%">100000000.00</span>
          <span class="ib br txt-a w675" style="width:7.2%">100000000.00</span>
          <span class="ib br txt-a w675" style="width:7.1%">100000000.00</span>
          <span class="ib br txt-a w675" style="width:7.1%">100000000.00</span>
          <span class="ib br txt-a w675" style="width:7.1%">100000000.00</span>
          <span class="ib br txt-a w675" style="width:7.1%">1.10%</span>
          <span class="ib br txt-a w675" style="width:14.5%">100000000.00(100000000笔)</span>
          <span class="ib br txt-a w675" style="width:14.3%">100000000.00(100000000笔)</span>
          <span class="ib br txt-a w675" style="width:7.1%">100000000.00</span>
        </div>
        <div slot="footer" style="width:100%"     v-if="userWidth == 'large'">
          <span class="ib br txt-a w675" style="width:7.9%" >总计</span>
          <span class="ib br  txt-a w675" style="width:7.85%">-</span>
          <span class="ib br txt-a w675" style="width:7.92%">100000000.00</span>
          <span class="ib br txt-a w675" style="width:7.9%">100000000.00</span>
          <span class="ib br txt-a w675" style="width:7.9%">100000000.00</span>
          <span class="ib br txt-a w675" style="width:7.9%">100000000.00</span>
          <span class="ib br txt-a w675" style="width:7.9%">100000000.00</span>
          <span class="ib br txt-a w675" style="width:7.9%">100000000.00</span>
          <span class="ib br txt-a w675" style="width:7.9%">1.10%</span>
          <span class="ib br txt-a w675" style="width:10.53%">100000000.00(100000000笔)</span>
          <span class="ib br txt-a w675" style="width:10.51%">100000000.00(100000000笔)</span>
          <span class="ib br txt-a w675" style="width:7.86%">100000000.00</span>
        </div>
      </Tables>
    </div>
  </div>
</template>
<script>
import Tables from "@/components/tables";
import Icons from "@/components/icons";
import { memberReportData } from "@/api/data";
import {sortInteraction} from '@/libs/util';
export default {
  name: "memberReport",
  components: {
    Tables,
    Icons
  },
  data() {
    return {
      myWidth: (window.innerWidth - 180) + 'px',
      userWidth:'',
      //主体数据
      searchKey: {},
      Time: [],
      table: {
        loading: true,
        total: 100,
        columns: [
          {
            title: "会员账号",
            key: "account",
            align: "center"
          },
          {
            title: "上级代理",
            key: "superiorAgent",
            align: "center"
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
            title: "会员输赢",
            key: "memberWin",
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
            title: "优惠金额",
            key: "discountAmount",
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
          },
          {
            title: "存款金额",
            key: "depositAmount",
            align: "center",
            sortable: true,
            width: "250"
          },
          {
            title: "取款金额",
            key: "withdrawalAmount",
            align: "center",
            sortable: true,
            width: "250"
          },
          {
            title: "会员余额",
            key: "memberBalance",
            align: "center",
            sortable: true
          }
        ],
        data: []
      }
    };
  },
  methods: {
    getData(query) {
      memberReportData().then(res => {
        this.table.loading = true;
        setTimeout(() => {
          this.table.data = res.data;
          this.table.loading = false;
        }, 2000);
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
        window.onresize = function windowResize () {
                // 通过捕获系统的onresize事件触发我们需要执行的事件
                this.myWidth = (window.innerWidth - 10) + 'px';
            }

  },
  created() {
    let mode = screen.width;
    if(mode > 1920){
      this.userWidth = 'large';
    }else{
      this.userWidth = 'middle';
    }
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
.ivu-form-item{
  &:nth-child(3){
    margin-right: -5px;
  }
}
</style>


