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
          <LevelSelect ref="LevelSelect" width="80" levelType="siteLevel"/>
        </FormItem>
        <FormItem label="状态">
          <Select class="s-100" clearable>
            <Option value="1">成功</Option>
            <Option value="2">失败</Option>
            <Option value="3">审核中</Option>
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
        <div class="clearfix" slot="more">
          <div class="fl">
            <!-- <Tag class="v2-tag">存款成功</Tag> -->
            <span class="b txt-a ib h32 w82 ft14 bd cs">存款成功</span>
            <span class="ml10 redText">100000000.00</span>
          </div>
          <div class="fl ml40">
            <!-- <Tag class="v2-tag">存款失败</Tag> -->
            <span class="b txt-a ib h32 w82 ft14 bd cs">存款失败</span>
            <span class="redText ml10">100000000.00</span>
          </div>
          <div class="fl ml40">
            <!-- <Tag class="v2-tag">待审核</Tag> -->
            <span class="b txt-a ib h32 w82 ft14 bd cs">待审核</span>
            <span class="redText ml10">100000000.00</span>
          </div>
        </div>
      </Tables>
    </div>
    <Modals ref="auditModal" :title="title" :width="760">
      <div slot="content">
        <Tabs type="card" value="withdraw">
          <TabPane label="取款详情" name="withdraw">
            <div class="modal-overflow box">
              <div class="detail">
                <p>
                  <label>订单号：</label>
                  <span>{{dataDetail.dingdanhao}}</span>
                </p>
                <p>
                  <label>账号余额：</label>
                  <span>{{dataDetail.zhanghaoyue}}</span>
                </p>
                <p>
                  <label>会员账号：</label>
                  <span>{{dataDetail.huiyuanzhanghao}}</span>
                </p>
                <p>
                  <label>银行名称：</label>
                  <span>{{dataDetail.yinhangmingcheng}}</span>
                  <Button
                    type="info"
                    size="small"
                    v-clipboard:copy="dataDetail.yinhangmingcheng"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"
                  >复制</Button>
                </p>
                <p>
                  <label>银行姓名：</label>
                  <span>{{dataDetail.yinhangxingming}}</span>
                  <Button
                    type="info"
                    size="small"
                    v-clipboard:copy="dataDetail.yinhangxingming"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"
                  >复制</Button>
                </p>
                <p>
                  <label>银行账号：</label>
                  <span>{{dataDetail.yinhangzhanghao}}</span>
                  <Button
                    type="info"
                    size="small"
                    v-clipboard:copy="dataDetail.yinhangzhanghao"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"
                  >复制</Button>
                </p>
                <p>
                  <label>开户网点：</label>
                  <span>{{dataDetail.kaihuwangdian}}</span>
                  <Button
                    type="info"
                    size="small"
                    v-clipboard:copy="dataDetail.kaihuwangdian"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"
                  >复制</Button>
                </p>
                <p>
                  <label>实际取款：</label>
                  <span>{{dataDetail.shijiqukuan}}</span>
                  <Button
                    type="info"
                    size="small"
                    v-clipboard:copy="dataDetail.shijiqukuan"
                    v-clipboard:success="onCopy"
                    v-clipboard:error="onError"
                  >复制</Button>
                </p>
                <p>
                  <label>操作类型：</label>
                  <RadioGroup v-if="!detailModal" v-model="auditType">
                    <Radio label="pass" class="mr30">
                      <span>通过</span>
                    </Radio>
                    <Radio label="reject">
                      <span>拒绝</span>
                    </Radio>
                  </RadioGroup>
                  <span
                    v-else
                    :class="dataDetail.zhuangtai ? '' : 'redText'"
                  >{{dataDetail.zhuangtai ? "通过" : "拒绝"}}</span>
                </p>
                <p v-show="(!dataDetail.zhuangtai&&auditType=='reject') || !dataDetail.zhuangtai">
                  <label
                    v-show="(!showSelect && !dataDetail.zhuangtai) || (showSelect && auditType == 'reject')"
                  >拒绝原因：</label>
                  <span v-show="(!showSelect && !dataDetail.zhuangtai) ">其他原因</span>
                  <Select
                    v-show="showSelect && auditType == 'reject'"
                    style="width:200px;"
                    class="mb15"
                  >
                    <Option v-for="(t,i) in rejectReason" :key="i" :value="i">{{t}}</Option>
                  </Select>
                </p>
                <p class="txt-a" v-if="!detailModal">
                  <Button class="submit" type="primary" @click="submit">确认提交</Button>
                </p>
              </div>
            </div>
          </TabPane>
          <TabPane label="打码详情" name="mobile">
            <div class="modal-overflow">
              <Tables :page="false" :columns="codeDetail.columns" :value="codeDetail.data">
                <div slot="footer" class="clearfix">
                  <span class="txt-a ib w16 br">统计</span>
                  <span class="pl25 pr25">最后所需打码量：<span>140</span></span>
                  <span class="pl25 pr25">现有打码量：<span>0.00</span></span>
                  <span class="pl25 pr25">
                    是否满足提款要求：
                    <span>否</span>
                  </span>
                </div>
              </Tables>
            </div>
          </TabPane>
        </Tabs>
      </div>
    </Modals>
  </div>
</template>
<script>
import Tables from "@/components/tables";
import LevelSelect from "@/components/level-select";
import Modals from "@/components/modals";
import VueClipboard from "vue-clipboard2";
import Vue from "vue";
Vue.use(VueClipboard);
import { withdrawalsOnlineData, addCodeDetailData } from "@/api/data";
export default {
  name: "withdrawalsOnline",
  components: {
    Tables,
    LevelSelect,
    Modals
  },
  data() {
    return {
      Time: [],
      title: "取款详情",
      dataDetail: {},
      detailModal: false,
      showSelect: false,
      rejectReason: [
        "打码量不足",
        "注单审核中",
        "银行信息错误",
        "跨行维护中",
        "其他原因"
      ],
      codeDetail: {
        data: [],
        columns: [
          {
            title: "类型",
            key: "type",
            align: "center",
            render: (h, params) => (
              <span>{params.row.type ? "人工彩金派送" : "返水"}</span>
            )
          },
          {
            title: "金额",
            key: "amount",
            align: "center"
          },
          {
            title: "打码倍数",
            key: "multiple",
            align: "center"
          },
          {
            title: "已打码",
            key: "exit",
            align: "center"
          },
          {
            title: "累计所需打码量",
            key: "allCount",
            align: "center"
          },
          {
            title: "时间",
            key: "time",
            align: "center"
          }
        ]
      },
      auditType: "pass",
      rejectReasonList: [
        "打码量不足",
        "注单审核中",
        "银行信息有误",
        "跨行维护中",
        "当日提款金额已超限",
        "额度异常",
        "请联系在线客服",
        "其他情况"
      ],
      table: {
        loading: true,
        total: 100,
        more: true,
        columns: [
          {
            title: "等级",
            key: "dengji",
            align: "center"
          },
          {
            title: "会员账号",
            key: "huiyuanzhanghao",
            align: "center"
          },
          {
            title:'姓名',
            key:'name',
            align:'center'
          },
          {
            title: "取款金额",
            key: "qukuanjine",
            align: "center",
            width: 120
          },
          {
            title: "手续费",
            key: "shouxufei",
            align: "center"
          },
          {
            title: "取款次数",
            key: "qukuancishu",
            align: "center"
          },
          {
            title: "实际取款",
            key: "shijiqukuan",
            align: "center"
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
            width: 170,
            button: [
              (h, params, vm) => {
                return h(
                  "span",
                  {
                    style: {
                      color: "#57A3F3",
                      cursor: "pointer",
                      display:
                        !params.row.zhuangtai && !params.row.return
                          ? "inline-block"
                          : "none"
                    },
                    on: {
                      click: () => {
                        this.detailModal = false;
                        (this.showSelect = true),
                          (this.dataDetail = params.row);
                        this.$refs.auditModal.show();
                      }
                    }
                  },
                  "审核"
                );
              },
              (h, params, vm) => {
                return h(
                  "span",
                  {
                    style: {
                      color: "#57A3F3",
                      cursor: "pointer",
                      display:
                        !params.row.zhuangtai && !params.row.return
                          ? "none"
                          : "inline-block"
                    },
                    on: {
                      click: () => {
                        this.detailModal = true;
                        this.showSelect = false;
                        this.dataDetail = params.row;
                        this.$refs.auditModal.show();
                      }
                    }
                  },
                  "详情"
                );
              }
            ]
          },
          {
            title: "提交时间",
            key: "tijiaoshijian",
            align: "center",
            width: 150
          },
          {
            title: "审核时间",
            key: "shenheshijian",
            align: "center",
            width: 150,
            render: (h, params) => (
              <span>
                {!params.row.zhuangtai && !params.row.return
                  ? "-"
                  : params.row.shenheshijian}
              </span>
            )
          },
          {
            title: "审核者",
            key: "shenhezhe",
            align: "center"
          },
          {
            title: "备注",
            key: "beizhu",
            align: "center",
            tooltip: true,
            width:170
          }
        ],
        data: []
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      // let currentSite = JSON.parse(localStorage.currentSite);
      // this.$refs.LevelSelect.getSiteLevel(currentSite);
      withdrawalsOnlineData().then(res => {
        this.table.loading = true;
        setTimeout(() => {
          this.table.data = res.data;
          this.table.loading = false;
        }, 2000);
      });
      addCodeDetailData().then(res => {
        this.codeDetail.data = res.data;
      });
    });
  },
  methods: {
    getData(query) {
      withdrawalsOnlineData().then(res => {
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
    },
    searchSubmit() {},
    submit() {
      this.$refs.auditModal.hide();
      this.$Tip.success({
        content: "审核成功",
        onOk: () => {}
      });
    },
    onCopy: function(e) {
      this.$Message.success("复制成功");
    },
    onError: function(e) {
      this.$Message.error("复制失败");
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../styles/tabs.less";
@import "../../styles/button.less";
.box {
  display: flex;
  justify-content: center;
  .detail {
    font-size: 16px;
    p {
      line-height: 2;
      margin-bottom: 10px;
      > label {
        display: inline-block;
        width: 110px;
        text-align: right;
        color: #c3c3c3;
      }
      > span {
        display: inline-block;
        width: 200px;
      }
    }
  }
}
.w16 {
  width: 16.5%;
}
.fw {
  font-weight: bolder;
}
.ivu-form-item{
  &:nth-child(5){
    margin-right: -5px;
  }
}
</style>


