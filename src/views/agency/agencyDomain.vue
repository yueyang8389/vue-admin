<template>
  <div>
    <div class="v2-search">
      <Form ref="searchKey" inline>
        <FormItem label="网址">
          <Input v-model="searchKey.url" placeholder="网址/邀请码" class="s-260"/>
        </FormItem>
        <FormItem label="状态">
          <Select v-model="searchKey.status" clearable class="s-100">
            <Option value="no">停用</Option>
            <Option value="yes">启用</Option>
          </Select>
        </FormItem>
        <FormItem label="冻结状态">
          <Select v-model="searchKey.frost" class="s-100">
            <Option value="no">冻结</Option>
            <Option value="yes">正常</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Checkbox>
            <span class="pl5">模糊</span>
          </Checkbox>
        </FormItem>
        <FormItem label="代理账号">
          <Input class="s-160" v-model="searchKey.account" placeholder="多个请已，逗号隔开"/>
        </FormItem>
        <FormItem>
          <Button @click="submit" class="search bg ml5">查询</Button>
        </FormItem>
      </Form>
    </div>
    <div class="v2-button mt10">
      <Button @click="$router.push({name:'domainAdd'})">添加域名</Button>
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
        @on-change-status="statusChange"
        @on-change-frost="frostChange"
        @on-edit="edit"
        @on-delete="del"
        @on-check-odds="checkOdds"
        :more="table.more"
        @on-sort-change='sortChange'
      ></Tables>
    </div>
    <Modals :width="1000" ref="oddsDetails">
      <div slot="content">
        <ButtonGroup class="status-button">
          <Button
            @click="() => {this.type = 'rebate'}"
            :class="type == 'rebate' ? 'active' : ''"
            style="width:120px;height:30px"
          >彩票返点</Button>
          <Button
            @click="() => {this.type = 'refund'}"
            :class="type == 'refund' ? 'active' : ''"
            style="width:120px;height:30px"
          >返水信息</Button>
        </ButtonGroup>
        <div class="mt20">
          <Form ref="rebateInfo" style="width:960px;" v-show="type == 'rebate'">
            <FormItem class="b">
              <p class="f6f8-bg ti10">六合彩</p>
              <div class="clearfix">
                <div class="fl w30 p10">
                  <Tooltip placement="top" content="lkklasjkdsajdksaj">
                    <span>香港六合彩：0.5%</span>
                  </Tooltip>
                </div>
                <div class="fl w30 p10">
                  <span>快速六合彩：0.5%</span>
                </div>
                <div class="fl w30 p10">
                  <span>5分六合彩：0.5%</span>
                </div>
              </div>
            </FormItem>
            <FormItem class="b">
              <p class="f6f8-bg ti10">PK10</p>
              <div class="clearfix">
                <div class="fl w25 p10">
                  <span>北极赛车PK10：0.5%</span>
                </div>
                <div class="fl w25 p10">
                  <span>幸运飞艇：0.5%</span>
                </div>
                <div class="fl w25 p10">
                  <span>快速赛车PK10：0.4%</span>
                </div>
                <div class="fl w25 p10">
                  <span>3分赛车PK10：0.4%</span>
                </div>
              </div>
            </FormItem>
            <FormItem class="b">
              <p class="f6f8-bg ti10">时时彩</p>
              <div class="clearfix">
                <div class="fl w30 p10">
                  <Tooltip placement="top" content="lkklasjkdsajdksaj">
                    <span>重庆时时彩：0.5%</span>
                  </Tooltip>
                </div>
                <div class="fl w30 p10">
                  <span>快速时时彩：0.5%</span>
                </div>
                <div class="fl w30 p10">
                  <span>3分时时彩：0.5%</span>
                </div>
              </div>
            </FormItem>
            <FormItem class="b">
              <p class="f6f8-bg ti10">11选5</p>
              <div class="clearfix">
                <div class="fl w20 p10">
                  <span>广东11选5：0.5%</span>
                </div>
                <div class="fl w20 p10">
                  <span>广东11选5：0.5%</span>
                </div>
                <div class="fl w20 p10">
                  <span>广东11选5：0.5%</span>
                </div>
                <div class="fl w20 p10">
                  <span>广东11选5：0.5%</span>
                </div>
                <div class="fl w20 p10">
                  <span>广东11选5：0.5%</span>
                </div>
              </div>
            </FormItem>
          </Form>
          <Form ref="refundInfo" style="width:960px;" v-show="type == 'refund'">
            <FormItem class="b">
              <p class="f6f8-bg ti10">真人视讯</p>
              <div class="clearfix">
                <div class="fl w20 p10" v-for="(t,i) in 7" :key="i">
                  <Tooltip placement="top" content="sdsadssfdsg">
                    <span>AG视讯：0.5%</span>
                  </Tooltip>
                </div>
              </div>
            </FormItem>
            <FormItem class="b">
              <p class="f6f8-bg ti10">电子游艺</p>
              <div class="clearfix">
                <div v-for="(t,i) in 7" :key="i" class="fl w20 p10">
                  <span>AG电子：1.2</span>
                </div>
              </div>
            </FormItem>
            <FormItem class="b">
              <p class="f6f8-bg ti10">体育</p>
              <div class="clearfix">
                <div class="fl w25 p10" v-for="(t,i) in 4" :key="i">
                  <span>沙巴体育:1.00</span>
                </div>
              </div>
            </FormItem>
          </Form>
        </div>
      </div>
    </Modals>
  </div>
</template>
<script>
import Tables from "@/components/tables";
import Modals from "@/components/modals";
import { agencyDomainData } from "@/api/data";
import {sortInteraction} from '@/libs/util';
export default {
  name: "agencyDomain",
  components: {
    Tables,
    Modals
  },
  data() {
    return {
      type: "rebate",
      searchKey: {},
      table: {
        loading: true,
        total: 100,
        title: "代理域名",
        data: [],
        columns: [
          {
            title: "代理账号",
            key: "account",
            align: "center"
          },
          {
            title: "代理类型",
            key: "type",
            align: "center",
            render: (h, params) => (
              <span>{params.row.type ? "大股东" : "1级代理"}</span>
            )
          },
          {
            title: "网址",
            key: "url",
            width: 200,
            align: "center"
          },
          {
            title: "邀请码",
            key: "invitation",
            align: "center"
          },
          {
            title: "注册会员",
            key: "vip",
            align: "center",
            sortable: true,
            render: (h, params) => {
              return h(
                "a",
                {
                  on: {
                    click: () => {
                      this.$router.push({ name: "agencyUnderling" });
                    }
                  }
                },
                params.row.vip
              );
            }
          },
          {
            title: "有效会员",
            key: "effect",
            align: "center",
            sortable: true
          },
          {
            title: "创建日期",
            key: "createTime",
            align: "center"
          },
          {
            title: "运营模式",
            key: "mode",
            align: "center"
          },
          {
            title: "状态",
            key: "status",
            align: "center",
            render: (h, params) => {
              let color = params.row.type ? "#515a6e" : params.row.status? "#515a6e" : "#FF2626";
              return (
                <span style={{ color }}>
                  {params.row.type ? "-" : params.row.status ? "正常" : "停用"}
                </span>
              );
            }
          },
          {
            title: "冻结",
            key: "frost",
            align: "center",
            render: (h, params) => {
              let color = params.row.type
                ? "#515a6e"
                : params.row.status
                ? "#FF2626"
                : "#515a6e";
              return (
                <span style={{ color }}>
                  {params.row.type ? "-" : params.row.status ? "冻结" : "正常"}
                </span>
              );
            }
          },
          {
            title: "操作",
            key: "handle",
            align: "center",
            width: "200",
            options: ["frostStatus", "frost", "odds", "edit", "delete"]
          }
        ]
      }
    };
  },
  methods: {
    go() {
    },
    submit() {},
    getData(query) {
      agencyDomainData().then(res => {
        this.table.loading = true;
        setTimeout(() => {
          this.table.data = res.data;
          this.table.loading = false;
        }, 2000);
      });
    },
    statusChange(params) {
      let text = params.row.status
        ? "您确定停用此网址吗"
        : "您确定启用此网址吗";
      this.$Tip.confirm({
        content: text,
        onOk: () => {
          let txt = params.row.status ? "停用网址成功" : "启用网址成功";
          this.$Tip.success({
            content: txt,
            onOk: () => {}
          });
        }
      });
    },
    frostChange(params) {
      let text = params.row.status
        ? "您确定解冻此网址吗"
        : "您确定冻结此网址吗";
      this.$Tip.confirm({
        content: text,
        onOk: () => {
          let txt = params.row.status ? "解冻网址成功" : "冻结网址成功";
          this.$Tip.success({
            content: txt,
            onOk: () => {}
          });
        }
      });
    },
    edit(params) {
      this.$router.push({
        name: "domainEdit",
        query: {
          account: params.row.account,
          type: params.row.type,
          url: params.row.url
        }
      });
    },
    del(params) {
      this.$Tip.confirm({
        content: "您确定删除此网址吗?",
        onOk: () => {
          this.$Tip.success({
            content: "删除网址成功",
            onOk: () => {}
          });
        }
      });
    },
    onPageChange(page) {
      this.getData(page);
    },
    onPageSizeChange() {},
    checkOdds() {
      this.$refs.oddsDetails.show();
    },
    sortChange(obj){
      sortInteraction(obj)
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getData();
    });
  }
};
</script>
<style lang="less" scoped>
@import "../../styles/button.less";
.ivu-form-item{
  &:nth-child(4){
    margin-right: -5px;
  }
}

</style>


