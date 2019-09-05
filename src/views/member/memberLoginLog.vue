<template>
  <div>
    <div class="v2-search">
      <Form ref="searchKey" inline>
        <FormItem label="状态">
          <Select clearable v-model="searchKey.type" class="s-86">
            <Option value="yes">存款</Option>
            <Option value="no">取款</Option>
          </Select>
        </FormItem>
        <FormItem label="开始时间">
          <DatePicker type="date" placeholder="请选择日期" class="s-120" v-model="Time[0]"></DatePicker>
        </FormItem>
        <FormItem label="结束时间">
          <DatePicker type="date" placeholder="请选择日期" class="s-120" v-model="Time[1]"></DatePicker>
        </FormItem>
        <FormItem>
          <Checkbox>
            <span class="pl5">模糊</span>
          </Checkbox>
        </FormItem>
        <FormItem>
          <Select v-model="searchKey.like" class="s-100" clearable>
            <Option value="userName">会员账号</Option>
            <Option value="phone">手机</Option>
            <Option value="email">Email</Option>
            <Option value="wechat">微信号</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Input placeholder="账号/姓名/上级代理" class="s-140"/>
        </FormItem>
        <FormItem >
          <Poptip trigger="hover"  style="margin-left:-14px" content="多个请以,逗号隔开,仅支持同类型多个输入" placement="bottom-end">
            <Icons type="bangzhutishi" color="#E4E4E4" :size="26"/>
          </Poptip>
        </FormItem>
        <FormItem>
          <Button type="primary" class="search" @click="searchSubmit">查询</Button>
        </FormItem>
      </Form>
    </div>
    <div class="v2-table">
      <Tables
        :columns="table.columns"
        :loading="table.loading"
        :value="table.data"
        :total="table.total"
        @on-page-change="onPageChange"
        @on-page-size-change="onPageSizeChange"
      ></Tables>
    </div>
    <Modals ref="Modals" title="历史登陆">
      <div slot="content" class="modal-overflow">
        <!-- <div style="height:500px;overflow:auto;"> -->
        <Tables
          :columns="historyTable.columns"
          :loading="historyTable.loading"
          :value="historyTable.data"
          :page="false"
        ></Tables>
        <!-- </div> -->
      </div>
    </Modals>
  </div>
</template>
<script>
import Tables from "@/components/tables";
import Icons from "@/components/icons";
import Modals from "@/components/modals";
import { getMemberLoginLog } from "@/api/data";
export default {
  name: "memberLoginLog",
  components: { Tables, Icons, Modals },
  data() {
    return {
      Time: [],
      searchKey: {},
      table: {
        loading: true,
        total: 100,
        columns: [
          {
            title: "会员账号",
            key: "account",
            align: "center",
          },
          {
            title: "上级",
            key: "superior",
            align: "center",
          },
          {
            title: "登陆设备",
            key: "device",
            align: "center",
          },
          {
            title: "登陆域名",
            key: "domain",
            align: "center",
          },
          {
            title: "登陆IP",
            key: "ip",
            align: "center",
          },
          {
            title: "归属地",
            key: "address",
            align: "center",
          },
          {
            title: "登陆时间",
            key: "loginTime",
            align: "center",
          },
          {
            title: "操作",
            align: "center",
            render: (h, params) => {
              return (
                <a
                  class="blue-font"
                  onClick={e => {
                    this.loginHistory(params);
                  }}
                >
                  历史登陆
                </a>
              );
            }
          }
        ],
        data: []
      },
      historyTable: {
        loading: true,
        columns: [
          {
            title: "登陆设备",
            key: "device",
            align: "center",
          },
          {
            title: "登陆域名",
            key: "domain",
            align: "center",
          },
          {
            title: "登陆IP",
            key: "ip",
            align: "center",
          },
          {
            title: "归属地",
            key: "address",
            align: "center",
          },
          {
            title: "登陆时间",
            key: "loginTime",
            align: "center",
          }
        ],
        data: []
      }
    };
  },
  created() {
    this.$nextTick(() => {
      this.getData();
    });
  },
  methods: {
    getData(query) {
      getMemberLoginLog().then(res => {
        this.table.loading = true;
        setTimeout(() => {
          this.table.data = res.data;
          this.table.loading = false;
        }, 2000);
      });
    },
    onPageChange(page) {
      let query = {
        page: page
      };
      this.getData(query);
    },
    searchSubmit() {},
    onPageSizeChange(count) {
      alert(count);
    },
    loginHistory(params) {
      this.$refs.Modals.show();
      getMemberLoginLog().then(res => {
        this.historyTable.loading = true;
        setTimeout(() => {
          this.historyTable.data = res.data;
          this.historyTable.loading = false;
        }, 2000);
      });
    }
  }
};
</script>
<style lang="less" scoped>
.ivu-form-item{
  &:nth-child(4){
    margin-right: -5px;
  }
  &:nth-child(7){
    margin-top: 1px!important;
  }
}
</style>
