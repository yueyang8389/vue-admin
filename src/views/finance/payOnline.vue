<template>
  <div>
    <div class="v2-search">
      <Form ref="searchKey" inline>
        <FormItem class="ml10" v-if="showMethod != 'large'">
          <div @click="() => this.showMore = !this.showMore" class="cs">
            <span>更多</span>
            <Icons type="gengduo" v-show="!showMore"></Icons>
            <icons type="gengduozhankai" v-show="showMore"></icons>
          </div>
        </FormItem>
        <FormItem label="刷新">
          <Select clearable class="s-86" v-model="searchKey.refresh">
            <Option value="15">15秒</Option>
            <Option value="30">30秒</Option>
            <Option value="60">60秒</Option>
            <Option value="0">暂停</Option>
          </Select>
        </FormItem>
        <FormItem label="等级">
          <!-- <LevelSelect ref="LevelSelect" width="80" levelType="siteLevel"/> -->
          <Select clearable v-model="searchKey.level">
            <Option v-for="(t,i) in levelList" :key="i" :value="t.value">{{t.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="起止日期">
          <DatePicker type="date" placeholder="开始时间" class="s-120" v-model="Time[0]"></DatePicker>
          <span class="date-divide"></span>
          <DatePicker type="date" placeholder="结束时间" class="s-120" v-model="Time[1]"></DatePicker>
        </FormItem>
        <FormItem label="订单号">
          <Input placeholder="请输入订单号" v-model="searchKey.orderNum" class="s-140"/>
        </FormItem>
        <FormItem>
          <Checkbox>
            <span class="pl5">模糊</span>
          </Checkbox>
        </FormItem>
        <FormItem label="会员账号">
          <Input placeholder="多个请以,逗号隔开" v-model="searchKey.account" class="s-140"/>
        </FormItem>
        <!-- 完整一屏显示 -->
        <div v-if="showMethod == 'large'" class="ib">
          <FormItem label="状态">
            <Select class="s-100" v-model="searchKey.status">
              <Option value="success">成功</Option>
              <Option value="fail">失败</Option>
              <Option value="pending">交易中</Option>
            </Select>
          </FormItem>
          <FormItem label="支付平台">
            <Select clearable v-model="searchKey.platform" class="s-86">
              <Option v-for="i in 4" :key="i" :value="1">平台{{i}}</Option>
            </Select>
          </FormItem>
          <FormItem label="支付方式">
            <Select clearable v-model="searchKey.method" class="s-86">
              <Option v-for="i in 4" :key="i" :value="i">支付{{i}}</Option>
            </Select>
          </FormItem>
          <FormItem label="状态">
            <Select class="s-100" v-model="searchKey.status">
              <Option value="success">成功</Option>
              <Option value="fail">失败</Option>
              <Option value="pending">交易中</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button type="primary" class="search">查询</Button>
          </FormItem>
        </div>
        <!-- 1707-1920  掉落两个 -->
        <div v-show="showMethod == 'middle' && showMore" class="ml75 mt5 ib">
          <FormItem label="支付平台">
            <Select clearable v-model="searchKey.platform" class="s-86">
              <Option v-for="i in 4" :key="i" :value="1">平台{{i}}</Option>
            </Select>
          </FormItem>
          <FormItem label="支付方式">
            <Select clearable v-model="searchKey.method" class="s-86">
              <Option v-for="i in 4" :key="i" :value="i">支付{{i}}</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button type="primary" class="search">查询</Button>
          </FormItem>
        </div>
        <!-- 1707以下掉落3个效果 -->
        <div v-show="showMethod == 'small' && showMore" class="ml75 mt5 ib">
          <FormItem label="状态">
            <Select class="s-100" v-model="searchKey.status">
              <Option value="success">成功</Option>
              <Option value="fail">失败</Option>
              <Option value="pending">交易中</Option>
            </Select>
          </FormItem>
          <FormItem label="支付平台">
            <Select clearable v-model="searchKey.platform" class="s-86">
              <Option v-for="i in 4" :key="i" :value="1">平台{{i}}</Option>
            </Select>
          </FormItem>
          <FormItem label="支付方式">
            <Select clearable v-model="searchKey.method" class="s-86">
              <Option v-for="i in 4" :key="i" :value="i">支付{{i}}</Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button type="primary" class="search">查询</Button>
          </FormItem>
        </div>
      </Form>
    </div>
    <div class="v2-table">
      <Tables
        :columns="table.columns"
        :loading="table.loading"
        :value="table.data"
        :total="table.total"
        :more="table.more"
        @on-page-change="onPageChange"
        @on-page-size-change="onPageSizeChange"
      >
        <div class="clearfix" slot="more">
          <div class="fl">
            <!-- <Tag class="v2-tag">支付成功</Tag> -->
            <span class="b txt-a ib h32 w82 ft14 bd cs">支付成功</span>
            <span class="ml10 redText">100000000.00</span>
          </div>
          <div class="fl ml40">
            <!-- <Tag class="v2-tag">支付失败</Tag> -->
            <span class="b txt-a ib h32 w82 ft14 bd cs">支付失败</span>
            <span class="ml10 redText">100000000.00</span>
          </div>
          <div class="fl ml40">
            <!-- <Tag class="v2-tag">交易中</Tag> -->
            <span class="b txt-a ib h32 w82 ft14 bd cs">交易中</span>
            <span class="ml10 redText">100000000.00</span>
          </div>
        </div>
      </Tables>
    </div>
  </div>
</template>
<script>
import Tables from "@/components/tables";
import Icons from "@/components/icons";
// import LevelSelect from "@/components/level-select";
// import PaymentList from "./components/payment-list";
// import PaymentModify from "./components/payment-modify";
// import MemberLevelDetail from "./components/member-level-detail";
// import CreateSiteLevel from "./components/create-site-level";
import { payOnlineData } from "@/api/data";
export default {
  name: "payOnline",
  components: {
    Tables,
    // LevelSelect,
    Icons
    // PaymentList,
    // PaymentModify,
    // MemberLevelDetail,
    // CreateSiteLevel
  },
  data() {
    return {
      showWidth: "",
      showMore: false,
      showMethod: "large",
      searchKey: {},
      levelList: [
        { value: "floor1", name: "等级1" },
        { value: "floor2", name: "等级2" },
        { value: "floor3", name: "等级3" },
        { value: "floor4", name: "等级4" }
      ],
      Time: [],
      table: {
        loading: true,
        total: 100,
        more: true,
        columns: [
          {
            title: "订单号",
            key: "dingdanhao",
            align: "center",
            width: 140
          },
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
            title: "支付平台",
            key: "zhifupingtai",
            align: "center"
          },
          {
            title: "支付方式",
            key: "zhifufangshi",
            align: "center",
            width: 140
          },
          {
            title: "提交时间",
            key: "tijiaoshijian",
            align: "center"
          },
          {
            title: "存款金额",
            key: "cunkuanjine",
            align: "center"
          },
          {
            title: "账号余额",
            key: "zhanghaoyue",
            align: "center"
          },
          {
            title: "取款总额",
            key: "qukuanzonge",
            align: "center"
          },
          {
            title: "状态",
            key: "zhuangtai",
            align: "center",
            width: "90",
            render: (h, params) => {
              let color = params.row.zhuangtai
                ? "blue"
                : params.row.return
                ? "green"
                : "red";
              let txt = params.row.zhuangtai
                ? "交易中"
                : params.row.return
                ? "成功"
                : "失败";
              return <span style={{ color }}>{txt}</span>;
            }
          },
          {
            title: "操作",
            key: "handle",
            align: "center",
            width: 120,
            button: [
              (h, params, vm) => {
                return h(
                  "span",
                  {
                    style: {
                      color: "#57A3F3",
                      cursor: "pointer",
                      display: params.row.zhuangtai ? "inline-block" : "none"
                    },
                    on: {
                      click: () => {
                        this.$Tip.confirm({
                          content: "您确定继续入款吗",
                          onOk: () => {
                            this.$Tip.success({
                              content: "强制入款成功",
                              onOk: () => {}
                            });
                          }
                        });
                      }
                    }
                  },
                  "强制入款"
                );
              },
              (h, params, vm) => {
                return h(
                  "span",
                  {
                    style: {
                      display: params.row.zhuangtai ? "none" : "inline-block"
                    }
                  },
                  "-"
                );
              }
            ]
          },
          {
            title: "备注",
            key: "beizhu",
            align: "center",
            width: 145,
            tooltip: true
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
      payOnlineData().then(res => {
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
    getData(query) {
      payOnlineData().then(res => {
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
    onPageSizeChange(count) {}
  },
  created() {
    this.$nextTick(() => {
      this.showWidth = screen.width;
      
    });
  },
  watch: {
    showWidth() {
      if (this.showWidth >= 2195) {
        this.showMethod = "large";
      } else if (this.showWidth >= 1707) {
        //1920-1  1707-2  1536-3  1280-3
        this.showMethod = "middle";
      } else {
        this.showMethod = "small";
      }
    }
  }
};
</script>
<style lang="less" scoped>
.ivu-form-item{
  &:nth-child(6){
    margin-right: -5px;
  }
}

/deep/.ivu-table-cell-tooltip-content{
  padding: 0 20px 0 20px !important; 
}
</style>


