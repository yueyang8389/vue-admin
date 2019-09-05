<template>
  <div>
    <div class="v2-search">
      <Form ref="searchKey" inline>
        <FormItem label="期数">
          <Input v-model="searchKey.periods" class="s-140" placeholder="请输入期数"/>
        </FormItem>
        <FormItem>
          <Button class="ivu-btn bg search" @click="searchSubmit">查询</Button>
        </FormItem>
        <FormItem>
          <Button  class="blue-font blue-bd w120x" @click="() => {this.$refs.addPeriods.show()}">添加期数</Button>
        </FormItem>
      </Form>
    </div>
    <div class="v2-table">
      <Tables
        editable
        :columns="table.columns"
        :value="table.data"
        :loading="table.loading"
        :total="table.total"
        :more="table.more"
      >
        <div class="clearfix caipiao txt-a f-color bInput" slot="more">
          <span class="pr10">当前彩票：</span>
          <span>香港六合彩</span>
        </div>
      </Tables>
    </div>
    <!-- 设置开奖号码 -->
    <Modals ref="setLotteryNum" title="设置开奖号码" width="560">
      <div slot="content" class="v2-form-wrapper">
        <Form style="width:560px;" :label-width='45'>
          <FormItem>
            <p v-for="(item,index) in num" :key="index" class="fl">
              <Input class="ib" v-model="periodsInfo.periods"/>
              <span class="p10 yc">-</span>
            </p>
          </FormItem>
          <FormItem class="ml85">
            <Button type="primary" class="ivu-btn submit w260" @click="setLotteryNum">确认保存</Button>
          </FormItem>
        </Form>
      </div>
    </Modals>
    <!-- 编辑期数 -->
    <Modals ref="editPeriods" title="编辑期数" width="560">
      <div slot="content" class="v2-form-wrapper">
        <Form
          ref="periodsInfo"
          :model="periodsInfo"
          :rules="periodsInfoValidate"
          :label-width="150"
          style="width:560px;"
        >
          <FormItem label="期数" prop="periods">
            <Input placeholder="请输入期数" v-model="periodsInfo.periods" class="slect260"/>
          </FormItem>
          <FormItem label="开盘时间" prop="openingTime">
            <!-- <Select v-model="periodsInfo.openingTime" :rules="periodsOpenTime"  class="slect260">
              <Option value="1"></Option>
            </Select>-->
            <Input placeholder="请输入期数" v-model="periodsInfo.openingTime" class="slect260"/>
          </FormItem>
          <FormItem label="封盘时间" prop="sealTime">
            <Select v-model="periodsInfo.sealTime" class="slect260">
              <Option value="1"></Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button type="primary" class="ml50" @click="saveEditPeriods">确认保存</Button>
          </FormItem>
        </Form>
      </div>
    </Modals>
    <!-- 添加期数 -->
    <Modals ref="addPeriods" title="添加期数" width="560">
      <div slot="content" class="v2-form-wrapper">
        <Form
          ref="addPeriodsInfo"
          :model="addPeriodsInfo"
          :rules="addPeriodsInfoValidate"
          style="width:560px;"
          :label-width="150"
        >
          <FormItem label="期数" prop="periods">
            <Input v-model="addPeriodsInfo.periods" placeholder="请输入期数" class="slect260"/>
          </FormItem>
          <FormItem label="开盘时间" prop="openingTime">
            <Select v-model="addPeriodsInfo.openingTime" class="slect260">
              <Option value="1"></Option>
            </Select>
          </FormItem>
          <FormItem label="封盘时间" prop="sealTime">
            <Select v-model="addPeriodsInfo.sealTime" class="slect260">
              <Option value="1"></Option>
            </Select>
          </FormItem>
          <FormItem>
            <Button type="primary" class="slect260" @click="saveAddPeriods">确认添加</Button>
          </FormItem>
        </Form>
      </div>
    </Modals>
  </div>
</template>
<script>
import Tables from "@/components/tables";
import Modals from "@/components/modals";
import { markTimeSettingData } from "@/api/data";
export default {
  name: "markTimeSetting",
  components: {
    Tables,
    Modals
  },
  data() {
    return {
      searchKey: {},
      num: 7,
      table: {
        more: true,
        loading: true,
        total: 100,
        data: [],
        title: "时间设置",
        columns: [
          {
            title: "期数",
            key: "periods",
            align: "center"
          },
          {
            title: "开奖结果",
            key: "result",
            align: "center",
            render: (h, params) => {
              let flag;
              if (
                (params.row.return && params.row.status) ||
                (params.row.return && !params.row.status)
              ) {
                flag = true;
              } else {
                flag = false;
              }
              return <span>{flag ? params.row.result : "-"}</span>;
            }
          },
          {
            title: "开盘时间",
            key: "openingTime",
            align: "center"
          },
          {
            title: "封盘时间",
            key: "sealTime",
            align: "center"
          },
          {
            title: "开奖时间",
            key: "lotteryTime",
            align: "center",
            render: (h, params) => {
              let flag;
              if (
                (params.row.return && params.row.status) ||
                (params.row.return && !params.row.status)
              ) {
                flag = true;
              } else {
                flag = false;
              }
              return <span>{flag ? params.row.lotteryTime : "-"}</span>;
            }
          },
          {
            title: "创建时间",
            key: "createTime",
            align: "center"
          },
          {
            title: "状态",
            key: "status",
            align: "center",
            render: (h, params) => {
              let txt;
              let color;
              let interval =
                (Date.parse(params.row.sealTime) - Date.parse(new Date())) /
                1000 /
                60;
              // let test = (new Date(params.row.sealTime.replace(/-/g,'/'))).getTime()/1000;
              if (interval > 10) {
                txt = "未开奖";
                color = "red";
              } else {
                if (params.row.return && params.row.status) {
                  txt = "已结算";
                  color = "#808080";
                } else if (params.row.return && !params.row.status) {
                  txt = "未结算";
                  color = "#ff2626";
                } else if (!params.row.return && params.row.status) {
                  txt = "已撤单";
                  color = "#ff9655";
                } else {
                  txt = "待开奖";
                  color = "#ff9655";
                }
              }
              return <span style={{ color }}>{txt}</span>;
            }
          },
          {
            title: "是否当期",
            key: "current",
            align: "center",
            render: (h, params) => {
              let interval =
                (Date.parse(params.row.sealTime) - Date.parse(new Date())) /
                1000 /
                60;
              if (interval > 10) {
                return <span />;
              } else {
                return (
                  <span
                    style={{
                      color: params.row.current ? "#808080" : "#808080"
                    }}
                  >
                    {params.row.current ? "是" : "否"}
                  </span>
                );
              }
            }
          },
          {
            title: "操作",
            align: "center",
            width: "300",
            render: (h, params) => {
              //待开奖，非当期结算不能点击
              let color =
                !params.row.return && !params.row.status
                  ? "#B3B3B3"
                  : "#57A3F3FF";
              let flag =
                !params.row.return && !params.row.status && !params.row.current
                  ? true
                  : false;
              return (
                <div>
                  <a
                    class="mr5"
                    onClick={() => {
                      this.$refs.setLotteryNum.show();
                    }}
                  >
                    {" "}
                    设置开奖号码{" "}
                  </a>
                  <a
                    class="mr5"
                    onClick={() => {
                      this.$Tip.success({
                        content: "当期设置成功",
                        onOk: () => {}
                      });
                    }}
                  >
                    {" "}
                    设置为当期{" "}
                  </a>
                  <a
                    class="mr5"
                    onClick={() => {
                      this.$refs.editPeriods.show();
                      this.periodsInfo = params.row;
                    }}
                  >
                    {" "}
                    编辑期数{" "}
                  </a>
                  <a
                    class="mr5"
                    onClick={() => {
                      this.$Tip.confirm({
                        content: "您确定删除此期数吗?",
                        onOk: () => {
                          this.$Tip.success({
                            content: "删除期数成功",
                            onOk: () => {}
                          });
                        }
                      });
                    }}
                  >
                    {" "}
                    删除{" "}
                  </a>
                  <a
                    style={{ color: flag ? "gray" : "" }}
                    onClick={() => {
                      if (flag) {
                        this.$Tip.confirm({
                          content: `【${
                            params.row.periods
                          }】期彩票结算失败，请及时处理`,
                          onOk: () => {}
                        });
                      } else {
                        this.$Tip.success({
                          content: `【${
                            params.row.periods
                          }】期彩票已经开始结算，请耐心等待`,
                          onOk: () => {}
                        });
                      }
                    }}
                  >
                    结算
                  </a>
                </div>
              );
            }
          }
        ]
      },
      periodsInfo: {},
      periodsInfoValidate: {
        periods: [
          {
            required: true,
            message: "请输入期数",
            trigger: "blur"
          }
        ],
        openingTime: [
          {
            required: true,
            message: "请选择开盘时间",
            trigger: "change"
          }
        ],
        sealTime: [
          {
            required: true,
            message: "请选择封盘时间",
            trigger: "change"
          }
        ]
      },
      addPeriodsInfo: {},
      addPeriodsInfoValidate: {
        periods: [
          {
            required: true,
            message: "请输入期数",
            trigger: "blur"
          }
        ],
        openingTime: [
          {
            required: true,
            message: "请选择开盘时间",
            trigger: "change"
          }
        ],
        sealTime: [
          {
            required: true,
            message: "请选择封盘时间",
            trigger: "change"
          }
        ]
      }
    };
  },
  methods: {
    searchSubmit() {},
    getData(query) {
      markTimeSettingData().then(res => {
        this.table.loading = true;
        setTimeout(() => {
          this.table.data = res.data;
          this.table.loading = false;
        }, 2000);
      });
    },
    setLotteryNum() {
      this.$refs.setLotteryNum.hide();
      this.$Tip.success({
        content: "开奖号码设置成功",
        onOk: () => {}
      });
    },
    saveEditPeriods() {
      this.$refs.editPeriods.hide();
      this.$Tip.success({
        content: "修改期数成功",
        onOk: () => {}
      });
    },
    saveAddPeriods() {
      this.$refs.addPeriods.hide();
      this.$Tip.success({
        content: "添加期数成功",
        onOk: () => {}
      });
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getData();
    });
  }
};
</script>
<style lang="less" scoped >
@import "../../styles/button.less";
// .jz {
//   padding-left: 110px !important;
// }
.ivu-form-item-content {
  p:nth-last-child(1) {
    span:nth-last-child(1) {
      display: none !important;
    }
  }
}
.caipiao {
  width: 160px;
  height: 30px;
  line-height: 30px;
}
.ib {
  width: 40px;
  height: 36px;
}
//点击结算出现的温馨提示
/deep/.ivu-modal-content{
  .content{
    .txt{
      .font{
          margin-left: 0px!important;
      }
    }
  }
}
.w120x{
  width: 120px;
}
</style>


