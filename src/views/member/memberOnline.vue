<template>
  <div>
    <div class="v2-search">
      <Form ref="searchKey" inline>
        <FormItem label="等级">
          <!-- <LevelSelect
            ref="LevelSelect"
            width="86"
            levelType="siteLevel"
          />-->
          <Select class="s-86" clearable>
            <Option v-for="(item,index) in levelList" :key="index" :value="item.value">{{item.name}}</Option>
          </Select>
        </FormItem>
        <FormItem label="客户端">
          <Select clearable v-model="searchKey.status" class="s-86">
            <Option v-for="(t,i) in platformList" :key="i" :value="t.value">{{t.name}}</Option>
          </Select>
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
        <FormItem>
          <Poptip
            trigger="hover"
            content="多个请以,逗号隔开,仅支持同类型多个输入"
            placement="right-start"
            class="ml14f"
          >
            <Icons type="bangzhutishi" color="#E4E4E4" :size="26" class="pr5"/>
          </Poptip>
        </FormItem>
        <FormItem>
          <Button type="primary" class="search" @click="searchSubmit">查询</Button>
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
        @on-delete="onDelete"
        @on-page-change="onPageChange"
        @on-page-size-change="onPageSizeChange"
        :more="table.more"
        @on-sort-change='sortChange'
      >
        <div class="clearfix more" slot="more">
          <div class="fl">
            <!-- <Tag class="v2-tag">注册人数</Tag> -->
            <span class="b txt-a ib h32 w82 ft14 bd cs">注册人数</span>
            <span class="ml10 red-font">100000000.00</span>
          </div>
          <div class="fl ml40">
            <!-- <Tag class="v2-tag">有效会员</Tag> -->
            <span class="b txt-a ib h32 w82 ft14 bd cs">有效会员</span>
            <span class="ml10 red-font">100000000.00</span>
          </div>
          <div class="fl ml40">
            <!-- <Tag class="v2-tag">存款</Tag> -->
            <span class="b txt-a ib h32 w82 ft14 bd cs">存款</span>
            <span class="ml10 red-font">100000000.00</span>
          </div>
          <div class="fl ml40">
            <!-- <Tag class="v2-tag">取款</Tag> -->
            <span class="b txt-a ib h32 w82 ft14 bd cs">取款</span>
            <span class="ml10 red-font">100000000.00</span>
          </div>
        </div>
      </Tables>
    </div>
    <Modals ref="fundsModal" :title="fundsModalTitle">
      <div slot="content">
        <Tabs type="card" value="single" @on-click="tabChange">
          <TabPane label="加款/扣款" name="single">
            <FundsForms
              ref="FundsForms"
              :oprateTypes="formsProps.oprateTypes"
              :verifyRule="formsProps.rules"
              @on-submit="submitFundsForm"
            ></FundsForms>
          </TabPane>
          <TabPane label="批量加款/扣款" name="batch">
            <FundsForms
              ref="FundsForms"
              :oprateTypes="formsProps.oprateTypes"
              :verifyRule="formsProps.rules"
            ></FundsForms>
          </TabPane>
        </Tabs>
      </div>
    </Modals>
    <Modals ref="historyModal" title="历史登陆">
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
import FundsForms from "./components/funds-forms";
import LevelSelect from "@/components/level-select";
import { Tooltip } from "iview";
import {sortInteraction} from '@/libs/util';
import { getMemberTableData, getMemberLoginLog } from "@/api/data";
export default {
  name: "memberOnline",
  components: { Tables, Icons, Modals, FundsForms, LevelSelect },
  data() {
    return {
      platformList: [
        { value: "PC", name: "PC" },
        { value: "H5", name: "H5" },
        { value: "IOS", name: "IOS" },
        { value: "Android", name: "Android" }
      ],
      levelList: [
        { value: "vip1", name: "第1层" },
        { value: "vip2", name: "第2层" },
        { value: "vip3", name: "第3层" },
        { value: "vip4", name: "第4层" },
        { value: "vip5", name: "第5层" }
      ],
      Time: [],
      fundsModalTitle: "加款/减款",
      searchKey: {},
      formsProps: {
        // 加减款表单传递的props
        oprateTypes: {
          add: [
            {
              type: "deposit",
              subType: "manual",
              label: "人工汇款",
              key: "存款",
              index: 0
            },
            {
              type: "bonus",
              subType: "giftBonusAdmin",
              label: "彩金派送",
              key: "彩金",
              index: 1
            },
            {
              type: "bonus",
              subType: "RebateBonus",
              label: "返水派送",
              key: "返水",
              index: 2
            },
            {
              type: "bonus",
              subType: "bonus",
              label: "汇款优惠",
              key: "优惠",
              index: 3
            },
            {
              type: "deposit",
              subType: "transfer",
              label: "额度转换失败",
              key: "额度转换",
              index: 4
            },
            {
              type: "other",
              subType: "other",
              label: "其他",
              key: "其他",
              index: 5
            }
          ],
          reduce: [
            {
              type: "withdrawals",
              subType: "manual",
              label: "人工提出",
              key: "取款",
              index: 0
            },
            {
              type: "other",
              subType: "other",
              label: "其他",
              key: "其他",
              index: 1
            }
          ]
        },
        rules: {
          money: [
            {
              required: true,
              message: "金额必须填写",
              trigger: "blur"
            }
          ],
          remarks: [
            {
              required: true,
              message: "备注必须填写",
              trigger: "blur"
            }
          ],
          userMoney: [
            {
              required: true,
              message: "请输入加款金额",
              trigger: "blur"
            }
          ],
          multiple: [
            {
              required: true,
              message: "打码倍数必须填写",
              type: "number",
              trigger: "blur"
            }
          ],
          userName: [
            {
              required: true,
              message: "用户名必须填写",
              trigger: "blur"
            }
          ],
          genre: [
            {
              required: true,
              message: "类型必须选择",
              trigger: "blur"
            }
          ]
        }
      },
      table: {
        more: true,
        loading: true,
        total: 100,
        columns: [
          {
            title: "会员账号",
            key: "account",
            align: "center",
            render: (h, params) => {
              return (
                <Tooltip placement="right">
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-around",
                      alignItems: "center"
                    }}
                  >
                    <span style={{ width: "50px" }}>{params.row.account}</span>
                    <Icons
                      type="huiyuanchaxunlixian"
                      color={params.row.online ? "#57A3F3" : "#B3B3B3"}
                      size="20"
                    />
                  </div>
                  <div slot="content">
                    {params.row.online ? "在线" : "离线"}
                  </div>
                </Tooltip>
              );
            }
          },
          {
            title: "姓名",
            key: "name",
            align: "center",
          },
          {
            title: "账号类型",
            key: "type",
            align: "center",
          },
          {
            title: "等级",
            key: "level",
            align: "center",
          },
          {
            title: "上级代理",
            key: "superior",
            align: "center",
          },
          {
            title: "余额",
            key: "balance",
            align: "center",
            sortable: true,
            render: (h, params) => {
              return (
                <Tooltip placement="bottom" max-width="300">
                  <a class="blue-font">{params.row.balance}</a>
                  <div slot="content">
                    <div class="tooltip-title flex-row">
                      <div>
                        <Icons
                          type="huiyuanchaxunzhuanhui"
                          color="#FFF"
                          size="20"
                        />
                        <span class="icon-right-txt"
                          onClick={e => {
                            this.changeBalance(params)
                          }}
                        >转回</span>
                      </div>
                      <div>
                        <Icons
                          type="huiyuanchaxunshuaxin"
                          color="#FFF"
                          size="20"
                        />
                        <span class="icon-right-txt">刷新</span>
                      </div>
                    </div>
                    <div class="tooltip-section flex-row">
                      <div class="items">AG: 10000000.00</div>
                      <div class="items">BBIN: 10000000.00</div>
                      <div class="items">CQ9: 10000000.00</div>
                      <div class="items">MG: 10000000.00</div>
                    </div>
                  </div>
                </Tooltip>
              );
            }
          },
          {
            title: "借呗",
            key: "borrow",
            align: "center",
            sortable: true,
            render: (h, params) => {
              return (
                <Tooltip placement="bottom" max-width="320">
                  <a class="blue-font">{params.row.borrow}</a>
                  <div slot="content">
                    <div class="tooltip-section borrow">
                      <div class="items">可借: 10000000.00</div>
                      <div class="items flex-row">
                        <span>借款: 10000000.00</span>
                        <span>时间: 2018.12.25</span>
                      </div>
                      <div class="items flex-row">
                        <span>还款: 10000000.00</span>
                        <span>时间: 2018.12.25</span>
                      </div>
                    </div>
                  </div>
                </Tooltip>
              );
            }
          },
          {
            title: "注册时间",
            key: "createTime",
            align: "center",
          },
          // {
          //   title: "状态",
          //   key: "status",
          //   align: "center",
          //   render: (h, params) => {
          //     return (
          //       <span
          //         style={{ color: params.row.status ? "#515a6e" : "#FF2626FF" }}
          //       >
          //         {params.row.status ? "正常" : "停用"}
          //       </span>
          //     );
          //   }
          // },
          {
            title: "返水",
            key: "return",
            align: "center",
            render: (h, params) => {
              let color = params.row.return ? "#515a6e" : "#FF2626FF";
              return (
                <span style={{ color: color }}>
                  {params.row.return ? "正常" : "停用"}
                </span>
              );
            }
          },
          {
            title: "操作",
            align: "center",
            minWidth: 150,
            render: (h, params) => {
              return (
                <div class="flex-row">
                  <Tooltip placement="right">
                    <Icons
                      type="huiyuanchaxunqiyonghuiyuan"
                      color={params.row.status ? "#57A3F3" : "#B3B3B3"}
                      size="26"
                      onClick={e => {
                        this.changeStatus(params);
                      }}
                    />
                    <div slot="content">
                      {params.row.status ? "启用状态" : "停用状态"}
                    </div>
                  </Tooltip>
                  <Tooltip placement="right">
                    <Icons
                      type="huiyuanchaxunqiyongfanshui"
                      color={params.row.return ? "#57A3F3" : "#B3B3B3"}
                      size="26"
                      onClick={e => {
                        this.changeBouns(params);
                      }}
                    />
                    <div slot="content">
                      {params.row.return ? "返水开启" : "返水关闭"}
                    </div>
                  </Tooltip>
                  <Tooltip placement="right">
                    <Icons
                      type="huiyuanchaxunchakan"
                      color="#57A3F3"
                      size="26"
                      onClick={e => {
                        this.$router.push({ name: "memberDetails" });
                      }}
                    />
                    <div slot="content">详情</div>
                  </Tooltip>
                  <Tooltip placement="right">
                    <Icons
                      type="huiyuanchaxunbianji"
                      color="#57A3F3"
                      size="26"
                      onClick={e => {
                        this.$router.push({ name: "memberEdit" });
                      }}
                    />
                    <div slot="content">编辑</div>
                  </Tooltip>
                  <Tooltip placement="right">
                    <Icons
                      type="huiyuanchaxunjiajiankuan"
                      color="#57A3F3"
                      size="26"
                      onClick={e => {
                        this.$refs.fundsModal.show();
                      }}
                    />
                    <div slot="content">加减款</div>
                  </Tooltip>
                  <Tooltip placement="right">
                    <Icons
                      type="huiyuanchaxunshengjidaili"
                      color={params.row.return ? "#57A3F3" : "#B3B3B3"}
                      size="26"
                      onClick={e => {
                        this.promotionAgency(params);
                      }}
                    />
                    <div slot="content">
                      {params.row.return ? "晋升代理" : "降级会员"}
                    </div>
                  </Tooltip>
                </div>
              );
            }
          },
          // w15不能修改  w35不能修改 w30不能修改  w11不能修改 可以修改ti4
          {
            title: "...",
            type: "expand",
            align: "center",
            width: 50,
            render: (h, params) => {
              return (
                <div class="expand">
                  <div class="section flex-row br">
                    <div class="row w15 bt bl ti20">
                      <div class="col bb ">登录域名：22k666.com</div>
                      <div class="col bb ">登录设备：iPhone</div>
                      <div class="col bb ">登录时间：2018-10-14</div>
                      <div class="col bb ">登录地址：菲律宾-马卡提</div>
                    </div>
                    <div class="row w30 bt bl ti20">
                      <div class="col bb ">
                        存款总额：100000000.00（538笔）
                        <span class="red-font">（50000000笔）</span>
                      </div>
                      <div class="col bb ">
                        公司入款：200000.00（38笔）
                        <span class="red-font">（500笔）</span>
                      </div>
                      <div class="col bb ">
                        线上支付：800.00（500笔）
                        <span class="red-font">（500笔）</span>
                      </div>
                      <div class="col bb ">存款大笔：6000.00</div>
                    </div>
                    <div class="row w30 bt bl ti20">
                      <div class="col bb ">
                        提款总额：100000000.00
                        <span class="red-font">（50000000笔）</span>
                      </div>
                      <div class="col bb ">有效投注：100000000.00</div>
                      <div class="col bb ">会员报表：0.00</div>
                      <div class="col bb ">现金报表：0.00</div>
                    </div>
                    <div class="row w11 bt bl ti20">
                      <div class="col bb ">视讯金管家：10级</div>
                      <div class="col bb ">棋牌金管家：10级</div>
                      <div class="col bb ">电子金管家：10级</div>
                      <div class="col bb ">彩票金管家：10级</div>
                    </div>
                    <div class="row w15 bt bl ti20">
                      <div class="col bb ">返水金额：100000000.00</div>
                      <div class="col bb ">优惠金额：0</div>
                      <div class="col bb ">
                        历史登陆：
                        <a
                          class="blue-font"
                          onClick={e => {
                            this.loginHistory(params);
                          }}
                        >
                          历史登陆
                        </a>
                      </div>
                      <div class="col bb ">注册IP：127.0000.777.222</div>
                    </div>
                  </div>
                  <div class="remarks ti20  bl br bb ">备注：</div>
                </div>
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
      // let currentSite = JSON.parse(localStorage.currentSite);
      // this.$refs.LevelSelect.getSiteLevel(currentSite);
    });
  },
  methods: {
    getData(query) {
      getMemberTableData().then(res => {
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
    onDelete(params) {
    },
    searchSubmit() {},
    searchReset() {},
    changeStatus(params) {
      let text = params.row.status
        ? "您确定要停用此会员账号吗？"
        : "您确定要启用此会员账号吗？";
      let txt = params.row.status ? "停用账号成功" : "启用状态成功";
      this.$Tip.confirm({
        content: text,
        onOk: () => {
          // this.getData();
          this.$Tip.success({
            content: txt,
            onOk: () => {}
          });
        }
      });
    },
    changeBouns(params) {
      let text = params.row.return
        ? "您确定要关闭此会员返水吗？"
        : "您确定要开启此会员返水吗？";
      let txt = params.row.return ? "关闭返水成功" : "开启返水成功";
      this.$Tip.confirm({
        content: text,
        onOk: () => {
          // this.getData();
          this.$Tip.success({
            content: txt,
            onOk: () => {}
          });
        }
      });
    },
    promotionAgency(params) {
      let text = params.row.status
        ? "您确定要升级此会员为代理吗？"
        : "您确定要降级此代理为会员吗？";
      let txt = params.row.status ? "升级为代理成功" : "降级为会员成功";
      this.$Tip.confirm({
        content: text,
        onOk: () => {
          // this.getData();
          this.$Tip.success({
            content: txt,
            onOk: () => {}
          });
        }
      });
    },
    onPageSizeChange(count) {
      alert(count);
    },
    tabChange(tabName) {
      if (tabName === "single") {
        this.fundsModalTitle = "加款/减款";
      } else {
        this.fundsModalTitle = "批量加款/减款";
      }
      this.$refs.FundsForms.mode = tabName;
      this.$refs.FundsForms.reset();
    },
    submitFundsForm(form) {
      this.$refs.fundsModal.hide();
      if (form.role == "+") {
        this.$Tip.success({
          content: "加款成功",
          onOk: () => {}
        });
      } else {
        this.$Tip.success({
          content: "减款成功",
          onOk: () => {}
        });
      }
    },
    loginHistory(params) {
      this.$refs.historyModal.show();
      getMemberLoginLog().then(res => {
        this.historyTable.loading = true;
        setTimeout(() => {
          this.historyTable.data = res.data;
          this.historyTable.loading = false;
        }, 2000);
      });
    },
    sortChange(obj) {
      sortInteraction(obj)
    },
    changeBalance(params){
      this.$Tip.confirm({
        content:'您确定回收该用户的第三方余额吗？',
        onOk:() => {
          this.$Message.success({
            content:'第三方余额回收成功'
          })
        }
      })
    }
  },
   watch:{
    fundsModalTitle() {
      this.$refs.FundsForms.formKey.role = '+';
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../styles/tabs.less";
@import "../../styles/function.less";
@h: 40px;
/deep/.tooltip-title {
  cursor: pointer;
  height: @h;
  line-height: @h;
  margin-bottom: 5px;
  position: relative;
  &::after {
    .after(296px, 1px, #7e7e7e, -10px, 40px);
  }
  .iconfont {
    vertical-align: middle;
  }
  .icon-right-txt {
    color: #fff;
    margin-left: 3px;
    vertical-align: middle;
  } 
}
/deep/.tooltip-section {
  flex-wrap: wrap;
  line-height: @h;
  .items {
    width: 50%;
    text-align: left;
    text-indent: 10px;
    position: relative;
  }
  .items::after {
    .after(158px, 1px, #7e7e7e, -10px, 40px);
  }
  &.borrow {
    width: 315px;
    .items {
      width: 100%;
      justify-content: flex-start;
    }
    .items::after {
      .after(100%, 1px, #7e7e7e, -10px, 40px);
    }
  }
}

/deep/.expand {
  @h: 40px;
  .section {
    .row > .col {
      height: @h;
      line-height: @h;
    }
  }
  .remarks {
    height: @h;
    line-height: @h;
  }
}
.more {
  width: 130%;
}
.ivu-form-item{
  &:nth-child(3){
    margin-right: -5px;
  }
  &:nth-child(6){
    margin-top: 1px!important;
  }
}
</style>
