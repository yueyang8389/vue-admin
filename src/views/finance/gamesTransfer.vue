<template>
  <div>
    <div class="v2-search">
      <Form ref="searchKey" inline>
        <FormItem label="转入平台">
          <Select clearable class="s-100">
            <Option
              v-for="(item,index) in this.platformList"
              :key="index"
              :value="item.value"
            >{{item.title}}</Option>
          </Select>
        </FormItem>
        <FormItem label="状态">
          <Select clearable class="s-86">
            <Option
              v-for="(item,index) in statusList"
              :key="index"
              :value="item.value"
            >{{item.title}}</Option>
          </Select>
        </FormItem>
        <FormItem label="开始日期">
          <DatePicker type="date" placeholder="开始日期" class="s-120" v-model="Time[0]"></DatePicker>
        </FormItem>
        <FormItem label="结束日期">
          <DatePicker type="date" placeholder="结束日期" class="s-120" v-model="Time[1]"></DatePicker>
        </FormItem>
        <FormItem>
          <Checkbox>
            <span class="pl5">模糊</span>
          </Checkbox>
        </FormItem>
        <FormItem label="会员账号">
          <Input placeholder="多个请以，逗号隔开" class="s-195" v-model="searchKey.account"/>
        </FormItem>
        <FormItem>
          <Button type="primary" class="search ml10f mb5" @click="searchSubmit">查询</Button>
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
      ></Tables>
    </div>
  </div>
</template>
<script>
import vuex from "@/store";
import { mapState } from "vuex";
import { gamesTransferData } from "@/api/data";
import Tables from "@/components/tables";
export default {
  name: "gamesTransfer",
  components: {
    Tables
  },
  data() {
    return {
      statusList: [
        { title: "全部", value: "all" },
        { title: "成功", value: "success" },
        { title: "失败", value: "fail" },
        { title: "转账中", value: "transfer" }
      ],
      Time: [],
      searchKey: {},
      table: {
        total: 100,
        loading: true,
        columns: [
          {
            title: "会员账号",
            key: "memberNum",
            align: "center"
          },
          {
            title: "转出平台",
            key: "outPlatform",
            align: "center"
          },
          {
            title: "转入平台",
            key: "inPlatform",
            align: "center"
          },
          {
            title: "变更金额",
            key: "changeMoney",
            align: "center"
          },
          {
            title: "变更前余额",
            key: "beforeBalance",
            align: "center",
            width: '320'
          },
          {
            title: "变更后余额",
            key: "afterBalance",
            align: "center",
            width: '320',
            render:(h,params) => (
              <span>{!params.row.return&&!params.row.status ? params.row.beforeBalance : params.row.afterBalance}</span>
            )
          },
          {
            title: "状态",
            key: "status",
            align: "center",
            render: (h, params) => {
              let color = params.row.return ? "#515a6e" : "#FF2626";
              return (
                <span style={{ color }}>
                  {params.row.return ? "成功" : params.row.status ? "转账中" : "失败"}
                </span>
              );
            }
          },
          {
            title: "变更时间",
            key: "changeTime",
            align: "center"
          }
        ],
        data: []
      }
    };
  },
  computed: {
    ...mapState({
      platformList: state => state.info.platformList
    })
  },
  methods: {
    getData(query) {
      gamesTransferData().then(res => {
        this.table.loading = true;
        setTimeout(() => {
          this.table.data = res.data;
          this.table.loading = false;
        }, 2000);
      });
    },
    searchSubmit() {},
    onPageChange(page) {
      let query = { page };
      this.getData(query);
    },
    onPageSizeChange() {}
  },
  mounted() {
    this.$nextTick(() => {
      this.getData();
    });
  },
  filters: {
    balanceFn(value) {
      return value.toFixed(2);
    }
  }
};
</script>
<style lang="less" scoped>
.ivu-form-item{
  &:nth-child(5){
    margin-right: -5px;
  }
}
</style>


