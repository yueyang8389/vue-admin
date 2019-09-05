<template>
  <div>
    <div class="v2-search">
      <Form ref="searchKey" inline>
        <FormItem label="刷新">
          <Select clearable class="s-86">
            <Option value="15">15秒</Option>
            <Option value="30">30秒</Option>
            <Option value="60">60秒</Option>
            <Option value="0">暂停</Option>
          </Select>
        </FormItem>
        <FormItem label="等级">
          <!-- <LevelSelect ref="LevelSelect" width="80" levelType="siteLevel" /> -->
          <Select class="s-86">
            <Option v-for="(t,i) in levelList" :key="i" :value="t.value">{{t.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="存入账户">
          <Select clearable class="s-86">
            <Option value="1">账户1</Option>
            <Option value="2">账户2</Option>
            <Option value="3">账户3</Option>
            <Option value="4">账户4</Option>
          </Select>
        </FormItem>
        <FormItem label="状态">
          <Select class="s-100" clearable>
            <Option value="1">成功</Option>
            <Option value="2">失败</Option>
            <Option value="3">交易中</Option>
          </Select>
        </FormItem>
        <FormItem label="起止日期">
          <DatePicker type="date" placeholder="开始时间" class="s-120" v-model="Time[0]"></DatePicker>
          <span class="date-divide"></span>
          <DatePicker type="date" placeholder="结束时间" class="s-120" v-model="Time[1]"></DatePicker>
        </FormItem>
        <FormItem>
          <Checkbox>
            <span class="pl5">模糊</span>
          </Checkbox>
        </FormItem>
        <FormItem label="会员账号">
          <Input placeholder="多个请以,隔开" class="s-140"/>
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
        :more="table.more"
      >
        <div class="clearfix more" slot="more">
          <div class="fl">
            <!-- <Tag class="v2-tag">存款成功</Tag> -->
            <span class="b txt-a ib h32 w82 ft14 bd cs">存款成功</span>
            <span class="ml10 redText">100000000.00</span>
          </div>
          <div class="fl ml40">
            <!-- <Tag class="v2-tag">存款失败</Tag> -->
            <span class="b txt-a ib h32 w82 ft14 bd cs">存款失败</span>
            <span class="ml10 redText">100000000.00</span>
          </div>
          <div class="fl ml40">
            <!-- <Tag class="v2-tag">待审核</Tag> -->
            <span class="b txt-a ib h32 w82 ft14 bd cs">待审核</span>
            <span class="ml10 redText">100000000.00</span>
          </div>
        </div>
      </Tables>
    </div>
    <Modals ref="detailModal" :title="title" :width="760">
      <div slot="content">
        <div class="box">
          <div class="detail">
            <p>
              <label>订单号：</label>
              <span>{{dataDetail.dingdanhao}}</span>
            </p>
            <p>
              <label>会员账号：</label>
              <span>{{dataDetail.huiyuanzhanghao}}</span>
            </p>
            <p>
              <label>会员姓名：</label>
              <span>{{dataDetail.huiyuanxingming}}</span>
            </p>
            <p>
              <label>存入账户：</label>
              <span>{{dataDetail.cunruzhanghu}}</span>
            </p>
            <p>
              <label>账户号码：</label>
              <span>{{dataDetail.zhanghuhaoma}}</span>
            </p>
            <p>
              <label>存款金额：</label>
              <span>{{dataDetail.cunkuanjine}}</span>
            </p>
            <p>
              <label>到账金额：</label>
              <span>{{dataDetail.cunkuanjine*(1+paymentBonus/100)}}</span>
            </p>
            <p>
              <label>存款优惠：</label>
              <Select v-model="paymentBonus" style="width:120px;">
                <Option v-for="i in paymentBonusList" :key="i" :value="i" :label="i+'%'"></Option>
              </Select>
            </p>
            <p>
              <label>提交时间：</label>
              <span>{{dataDetail.tijiaoshijian}}</span>
            </p>
            <p>
              <label>操作类型：</label>
              <span>通过</span>
            </p>
            <p style="text-align:center;">
              <Button class="submit" type="primary" @click="submit">确定</Button>
            </p>
          </div>
        </div>
      </div>
    </Modals>
  </div>
</template>
<script>
import Tables from "@/components/tables";
import Icons from "@/components/icons";
// import LevelSelect from "@/components/level-select";
import Modals from "@/components/modals";
// import PaymentList from "./components/payment-list";
// import PaymentModify from "./components/payment-modify";
// import MemberLevelDetail from "./components/member-level-detail";
// import CreateSiteLevel from "./components/create-site-level";
import { payCompanyData } from "@/api/data";
export default {
  name: "payCompany",
  components: {
    Tables,
    Icons,
    // LevelSelect,
    Modals
  },
  data() {
    return {
      levelList: [
        { value: "floor1", name: "等级1" },
        { value: "floor2", name: "等级2" },
        { value: "floor3", name: "等级3" },
        { value: "floor4", name: "等级4" }
      ],
      Time: [],
      title: "入款详情",
      dataDetail: {},
      paymentBonus: 0,
      paymentBonusList: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5],
      table: {
        loading: true,
        total: 100,
        more: true,
        columns: [
          {
            title: "订单号",
            key: "dingdanhao",
            align: "center",
            width: 150
          },
          {
            title: "等级",
            key: "dengji",
            align: "center"
          },
          {
            title: "上级代理",
            key: "shangjidaili",
            align: "center"
          },
          {
            title: "会员账号",
            key: "huiyuanzhanghao",
            align: "center"
          },
          {
            title: "存款方式/姓名",
            key: "cunkuanfangshi",
            align: "center",
            width: "125"
          },
          {
            title: "存款金额",
            key: "cunkuanjine",
            align: "center"
          },
          {
            title: "存入账户",
            key: "cunruzhanghu",
            align: "center",
            width: "180"
          },
          {
            title: "状态",
            key: "zhuangtai",
            align: "center",
            render: (h, params) => {
              let color = params.row.zhuangtai
                ? "green"
                : params.row.return
                ? "red"
                : "blue";
              let txt = params.row.zhuangtai
                ? "成功"
                : params.row.return
                ? "失败"
                : "待审核";
              return <span style={{ color }}>{txt}</span>;
            }
          },
          {
            title: "操作",
            key: "handle",
            align: "center",
            width:'120',
            button: [
              (h, params, vm) => {
                return h(
                  "Button",
                  {
                    style: {
                      color: "#57A3F3",
                      cursor: "pointer",
                      marginRight: "20px",
                      display: !params.row.zhuangtai && !params.row.return ? "inline-block" : "none"
                    },
                    on: {
                      click: () => {
                        this.dataDetail = params.row;
                        this.$refs.detailModal.show();
                      }
                    },
                    props:{
                      size:'small'
                    }
                  },
                  "通过"
                );
              },
              (h, params, vm) => {
                return h(
                  "Button",
                  {
                    style: {
                      color: "#57A3F3",
                      cursor: "pointer",
                      width:'40px',
                      display:
                        !params.row.zhuangtai && !params.row.return
                          ? "inline-block"
                          : "none"
                    },
                    on: {
                      click: () => {
                        this.$Tip.confirm({
                          content: "您确定拒绝此入款吗",
                          onOk: () => {
                            this.$Tip.success({
                              content: "拒绝入款成功",
                              onOk: () => {}
                            });
                          }
                        });
                      }
                    },
                    props:{
                      size:'small'
                    }
                  },
                  "拒绝"
                );
              },
              (h, params, vm) => {
                return h(
                  "span",
                  {
                    style: {
                      display:
                        params.row.zhuangtai ||
                        (!params.row.zhuangtai && params.row.return)
                          ? "inline-block"
                          : "none"
                    }
                  },
                  "-"
                );
              }
            ]
          },
          {
            title: "提交时间",
            key: "tijiaoshijian",
            align: "center",
            width: 130
          },
          {
            title: "审核时间",
            key: "shenheshijian",
            align: "center",
            width: 130,
            render: (h, params) => (
              <span>
                {(!params.row.zhuangtai && params.row.return) ||
                params.row.zhuangtai
                  ? params.row.shenheshijian
                  : "-"}
              </span>
            )
          },
          {
            title: "审核者",
            key: "shenhezhe",
            align: "center",
            render: (h, params) => (
              <span>
                {(!params.row.zhuangtai && params.row.return) ||
                params.row.zhuangtai
                  ? params.row.shenhezhe
                  : "-"}
              </span>
            )
          }
        ],
        data: []
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      // this.$refs.LevelSelect.getSiteLevel(currentSite);
      payCompanyData().then(res => {
        this.table.loading = true;
        setTimeout(() => {
          this.table.data = res.data;
          this.table.loading = false;
        }, 2000);
      });
    });
  },
  methods: {
    searchSubmit() {},
    submit() {
      this.$refs.detailModal.hide();
      this.$Tip.success({
        content: "入款成功",
        onOk: () => {
          // this.getData();
        }
      });
    },
    getData(query) {
      payCompanyData().then(res => {
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
    onPageSizeChange(count) {
      alert(count);
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../styles/button.less";
.box {
  display: flex;
  justify-content: center;
  .detail {
    font-size: 16px;
    p {
      line-height: 3.3;
      label {
        display: inline-block;
        width: 110px;
        text-align: right;
        color: #c3c3c3;
      }
    }
  }
}
.ivu-form-item{
  &:nth-child(6){
    margin-right: -5px;
  }
}
</style>


