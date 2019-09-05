<template>
  <div>
    <div class="v2-search">
      <Form ref="searchKey" inline>
        <FormItem label="彩票名称">
          <Select v-model="searchKey.lotteryName" class="s-140" clearable>
            <Option
              v-for="(item,index) in lotteryNames"
              :key="index"
              :value="item.key"
            >{{item.value}}</Option>
          </Select>
        </FormItem>
        <FormItem label="期数">
          <Input v-model="searchKey.periods" placeholder="请输入期数" class="s-140"/>
        </FormItem>
        <FormItem label="状态">
          <Select v-model="searchKey.status" class="s-140" clearable>
            <Option v-for="(item,index) in statusList" :key="index" :value="item.key">{{item.value}}</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button class="search" type="primary">查询</Button>
        </FormItem>
      </Form>
    </div>
    <div class="v2-button">
      <Button class="w120x" @click="()=>{this.$refs.addLottery.show()}">添加开奖</Button>
      <Button class="w120x" @click="batchEdit">批量修改/回滚</Button>
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
        @on-select="selectChange"
        @on-select-cancel="selectCancel"
      ></Tables>
    </div>
    <!-- 开奖回滚 -->
    <Modals ref="lotteryBack" title="开奖回滚" width="800">
      <div slot="content" class="ft14 ml0">
        <div class="mb20 ml20">彩票名称: 香港六合彩</div>
        <Form
          ref="lotteryBackInfo"
          :model="lotteryBackInfo"
          :rules="lotteryBackInfoValidate"
          :label-width="110"
          inline
        >
          <div class="ml105f" v-if="backSingle">
            <FormItem>
              <span class="pl15 pr15">{{backInfo.periods[0]}}期</span>
              <span class="pr15">撤回类型</span>
              <Select style="width:140px;" clearable>
                <Option value="all">撤回所有注单</Option>
                <Option value="one">撤回未中奖注单</Option>
              </Select>
            </FormItem>
            <FormItem label="开奖号码" prop="lotteryNum">
              <Input
                class="w260x"
                placeholder="如：1,2,3,4,5,6,7(以英文逗号隔开)"
                v-model="lotteryBackInfo.lotteryNum"
              />
            </FormItem>
          </div>
          <div v-if="!backSingle" v-for="(t,i) in checkedArray" :key="i" class="ml105f">
            <FormItem>
              <span class="pl15 pr15">{{t.periods}}</span>
              <span class="pr5">撤回类型</span>
              <Select style="width:140px;">
                <Option value="all">撤回所有注单</Option>
                <Option value="one">撤回未中奖注单</Option>
              </Select>
            </FormItem>
            <FormItem label="开奖号码" prop="lotteryNum">
              <Input
                class="w260x"
                placeholder="如：1,2,3,4,5,6,7(以英文逗号隔开)"
                v-model="lotteryBackInfo.lotteryNum"
              />
            </FormItem>
          </div>
          <Button
            type="primary"
            class="btw260 ft20"
            style="margin-left:250px"
            @click="lotteryBack"
          >确认回滚</Button>
        </Form>
      </div>
    </Modals>
    <!-- 添加开奖 -->
    <Modals ref="addLottery" title="添加开奖" width="560">
      <div slot="content">
        <Form
          ref="addLotteryInfo"
          :model="lotteryInfo"
          :rules="lotteryInfoValidate"
          style="width:560px;"
          :label-width="160"
        >
          <FormItem label="开奖号码" class="mt20" prop="periods">
            <Input v-model="lotteryInfo.periods" placeholder="如2019001" class="w260x"/>
          </FormItem>
          <FormItem label="封盘时间" prop="sealTime">
            <Select v-model="lotteryInfo.sealTime" class="w260x">
              <Option
                v-for="(item,index) in sealTimeList"
                :key="index"
                :value="item.key"
              >{{item.value}}</Option>
            </Select>
          </FormItem>
          <FormItem label="开奖号码" prop="number">
            <Input
              v-model="lotteryInfo.number"
              class="w260x"
              placeholder="如：1,2,3,4,5,6,7(以英文逗号隔开)"
            />
          </FormItem>
          <FormItem>
            <Button type="primary" class="w260x" @click="addLottery">确认添加</Button>
          </FormItem>
        </Form>
      </div>
    </Modals>
    <!-- 修改开奖号码 -->
    <Modals ref="editLotteryNum" title="修改开奖号码" width="680">
      <div slot="content" class="v2-form-wrapper">
        <div class="lotteryMan">
          <Form style="width:680px;">
            <FormItem>
              <div class="ml80">
                <span>彩票名称：</span>
                <span>香港六合彩</span>
              </div>
            </FormItem>
            <div class="clearfix ml80" v-if="editSingle">
              <FormItem class="periods">
                <p class="fl">{{editInfo.periods[0]}}期</p>
                <div class="clearfix fl ml20">
                  <p v-for="(item,index) in num" :key="index" class="fl">
                    <Input class="ib"/>
                    <span class="p10 yc">-</span>
                  </p>
                </div>
              </FormItem>
            </div>
            <FormItem prop="periods" v-if="!editSingle" v-for="(t,i) in checkedArray" :key="i">
              <div class="clearfix ml90">
                <p class="fl">{{t.periods}}期</p>
                <div class="clearfix fl ml20">
                  <p v-for="(item,index) in num" :key="index" class="fl">
                    <Input class="ib"/>
                    <span class="p10 yc">-</span>
                  </p>
                </div>
              </div>
            </FormItem>
            <FormItem>
              <Button type="primary" class="w260x ml220" @click="editLotteryNum">确认保存</Button>
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
import { lotteryManagementData } from "@/api/data";
export default {
  name: "lotteryManagement",
  components: {
    Tables,
    Modals
  },
  data() {
    return {
      editSingle: true,
      backSingle: true,
      checkedArray: [],
      searchKey: {},
      //修改中奖号码时  中奖号码的个数
      num: 7,
      //添加新的开奖信息
      lotteryInfo: {
        periods: "",
        sealTime: "",
        number: ""
      },
      //修改信息
      editInfo: {
        periods: []
      },
      //回滚信息
      backInfo: {
        periods: []
      },
      lotteryInfoValidate: {
        periods: [
          {
            required: true,
            message: "请输入期数",
            trigger: "blur"
          }
        ],
        sealTime: [
          {
            required: true,
            message: "请选择封盘时间",
            trigger: "change"
          }
        ],
        number: [
          {
            required: true,
            message: "请输入开奖号码",
            trigger: "blur"
          }
        ]
      },
      sealTimeList: [
        { key: "201901012140", value: "2019-01-01 21:40" },
        { key: "201901020340", value: "2019-01-02 03:40" },
        { key: "201912121212", value: "2019-12-12 12:12" }
      ],
      //回滚信息
      lotteryBackInfo: {
        lotteryName: "香港六合彩",
        lotteryTime: "2019006",
        backType: "",
        lotteryNum: ""
      },
      lotteryBackInfoValidate: {
        lotteryNum: [
          {
            required: true,
            message: "请输入开奖号码",
            trigger: "blur"
          }
        ]
      },
      table: {
        loading: true,
        total: 100,
        title: "开奖管理",
        data: [],
        columns: [
          {
            align: "center",
            type: "selection",
            width: "70"
          },
          {
            title: "期数",
            key: "periods",
            align: "center"
          },
          {
            title: "开奖结果",
            key: "result",
            align: "center",
            width: 320,
            render: (h, params) => {
              if (
                (!params.row.return && params.row.status) ||
                (!params.row.return && !params.row.status)
              ) {
                return <span>-</span>;
              } else {
                return (
                  <div>
                    <span class="mr10 blockLottery  yellowColor ">
                      {params.row.result.split(",")[0]}
                    </span>
                    <span class="mr10 blockLottery redColor">
                      {params.row.result.split(",")[1]}
                    </span>
                    <span class="mr10 blockLottery blueColor">
                      {params.row.result.split(",")[2]}
                    </span>
                    <span class="mr10 blockLottery orangeColor">
                      {params.row.result.split(",")[3]}
                    </span>
                    <span class="mr10 blockLottery bluishColor">
                      {params.row.result.split(",")[4]}
                    </span>
                    <span class="mr10 blockLottery drakBlueColor">
                      {params.row.result.split(",")[5]}
                    </span>
                    <span class="mr10 blockLottery drakedColor">
                      {params.row.result.split(",")[6]}
                    </span>
                    <span class="mr10 blockLottery greenColor">
                      {params.row.result.split(",")[7]}
                    </span>
                    <span class="mr10 blockLottery grayColor">
                      {params.row.result.split(",")[8]}
                    </span>
                    <span class="mr10 blockLottery whiteColor">
                      {params.row.result.split(",")[9]}
                    </span>
                  </div>
                );
              }
            }
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
            render: (h, params) => (
              <span>
                {(!params.row.return && params.row.status) ||
                (!params.row.return && !params.row.status)
                  ? "-"
                  : params.row.lotteryTime}
              </span>
            )
          },
          {
            title: "状态",
            key: "status",
            align: "center",
            render: (h, params) => {
              let txt, color;
              if (params.row.status == 1) {
                txt = "已结算";
                color = "#808080";
              } else if (params.row.status == 2) {
                txt = "未结算";
                color = "#ff2626";
              } else if (params.row.status == 3) {
                txt = "已撤单";
                color = "#8a8a8a";
              } else if (params.row.status == 4) {
                txt = "未开奖";
                color = "#e6cd62";
              }
              return <span style={{ color }}>{txt}</span>;
            }
          },
          {
            title: "操作",
            align: "center",
            render: (h, params) => {
              if (params.row.status == 1) {
                return (
                  <div>
                    <a
                      class="ml5 mr5"
                      onClick={() => {
                        this.backSingle = true;
                        this.backInfo.periods.push(params.row.periods);
                        this.$refs.lotteryBack.show();
                      }}
                    >
                      回滚
                    </a>
                    <a
                      class="ml5 mr5"
                      onClick={() => {
                        this.$Tip.confirm({
                          content: `香港六合彩【${
                            params.row.periods
                          }】期彩票已经开始结算`,
                          onOk: () => {
                            this.$Message.success("结算成功");
                          }
                        });
                      }}
                    >
                      结算
                    </a>
                  </div>
                );
              } else if (params.row.status == 2) {
                return (
                  <div>
                    <a
                      class="ml5 mr5"
                      onClick={() => {
                        this.editSingle = true;
                        this.editInfo.periods.push(params.row.periods);
                        this.$refs.editLotteryNum.show();
                      }}
                    >
                      修改
                    </a>
                    <a
                      class="ml5 mr5"
                      onClick={() => {
                        this.$Tip.success({
                          content: `香港六合彩【${
                            params.row.periods
                          }】期彩票已经开始结算`,
                          onOk: () => {}
                        });
                      }}
                    >
                      结算
                    </a>
                  </div>
                );
              } else if (params.row.status == 3) {
                return (
                  <div>
                    <a
                      class="ml5 mr5"
                      onClick={() => {
                        this.$Tip.confirm({
                          content: `您确定要删除香港六合彩【${
                            params.row.periods
                          }】期彩票吗`,
                          onOk: () => {
                            this.$Tip.success({
                              content: "删除期数成功",
                              onOk: () => {}
                            });
                          }
                        });
                      }}
                    >
                      删除
                    </a>
                  </div>
                );
              } else if (params.row.status == 4) {
                return (
                  <div>
                    <a
                      class="ml5 mr5"
                      onClick={() => {
                        this.$Tip.confirm({
                          content: `您确定开奖【${
                            params.row.periods
                          }】期彩票吗`,
                          onOk: () => {
                            this.$Tip.success({
                              content: "当期期数开奖成功",
                              onOk: () => {}
                            });
                          }
                        });
                      }}
                    >
                      开奖
                    </a>
                    <a
                      class="ml5 mr5"
                      onClick={() => {
                        this.$Tip.confirm({
                          content: `您确定要删除香港六合彩【${
                            params.row.periods
                          }】期彩票吗`,
                          onOk: () => {
                            this.$Tip.success({
                              content: "删除期数成功",
                              onOk: () => {}
                            });
                          }
                        });
                      }}
                    >
                      删除
                    </a>
                  </div>
                );
              }
            }
          }
        ]
      },
      lotteryNames: [
        { key: "xianggangliuhecai", value: "香港六合彩" },
        { key: "beijignsaiche", value: "北京赛车" },
        { key: "xingyunfeiting", value: "幸运飞艇" },
        { key: "shanghaikuaisan", value: "上海快3" }
      ],
      statusList: [
        { key: "yjs", value: "已结算" },
        { key: "wjs", value: "未结算" },
        { key: "ycd", value: "已撤单" },
        { key: "wkj", value: "未开奖" }
      ]
    };
  },
  mounted() {
    this.$nextTick(() => {
      this.getData();
    });
  },
  methods: {
    getData(query) {
      lotteryManagementData().then(res => {
        this.table.loading = true;
        setTimeout(() => {
          this.table.data = res.data;
          this.table.loading = false;
          this.table.data.map(item => {
            // 删除和开奖类的默认不可勾选
            if (item.status == 3 || item.status == 4) {
              this.$set(item, "_disabled", true);
            }
          });
        }, 2000);
      });
    },
    onPageChange(page) {
      this.getData(page);
    },
    onPageSizeChange() {},
    lotteryBack() {
      this.$refs.lotteryBack.hide();
      this.$Tip.success({
        content: "回滚成功",
        onOk: () => {
          this.backInfo.periods = [];
        }
      });
    },
    addLottery() {
      this.$refs.addLottery.hide();
      this.$Tip.success({
        content: "添加开奖成功",
        onOk: () => {}
      });
    },
    editLotteryNum() {
      this.$refs.editLotteryNum.hide();
      this.$Tip.success({
        content: "修改开奖号码成功",
        onOk: () => {
          this.editInfo.periods = [];
        }
      });
    },
    batchEdit() {
      if (this.checkedArray.length > 5) {
        this.$Tip.info({
          content: "最多只可勾选5个"
        });
      } else {
        this.checkedArray.map(item => {
          if (item.return && !item.status) {
            this.editSingle = false;
            this.$refs.editLotteryNum.show();
          } else {
            this.backSingle = false;
            this.$refs.lotteryBack.show();
          }
        });
      }
    },
    selectChange(select, row) {
      if (row.status == 1) {
        //回滚
        this.checkedArray = select;
        select.forEach(item => {
          this.backInfo.periods.push(item.periods);
        });
        this.$set(this.table.data[row.initRowIndex], "_checked", true);
        this.table.data.forEach(item => {
          if (item.status == 2) this.$set(item, "_disabled", true);
        });
      } else if (row.status == 2) {
        // 修改
        this.checkedArray = select;
        select.forEach(item => {
          this.editInfo.periods.push(item.periods);
        });
        this.$set(this.table.data[row.initRowIndex], "_checked", true);
        this.table.data.forEach(item => {
          if (item.status == 1) this.$set(item, "_disabled", true);
        });
      }
    },
    //没有选中，修改和回滚均可点击
    selectCancel(select, row) {
      this.checkedArray = select;
      this.$set(this.table.data[row.initRowIndex], "_checked", false);
      if (this.checkedArray.length == 0) {
        this.table.data.forEach(item => {
          if(item.status == 1 || item.status == 2){
            this.$set(item, "_disabled", false)
          }
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../styles/button.less";
@import "../../styles/lottery.less";
.jz {
  padding-left: 110px !important;
}
.yc:nth-child(7) {
  display: none !important;
}
.ivu-modal {
  width: 560px;
}
.ib {
  width: 40px;
  height: 36px;
}
.ivu-form-item-content {
  p:nth-last-child(1) {
    span:nth-last-child(1) {
      display: none !important;
    }
  }
}
.w260x {
  width: 240px;
  height: 50px;
  font-size: 20px;
}
/deep/.ivu-form-item-error-tip {
  left: 250px;
  width: 120px;
}
/deep/.ivu-table-header {
  th {
    &:nth-child(1) {
      .ivu-checkbox {
        display: none;
      }
    }
  }
}
//modal提示小图标距左边的距离
/deep/.ivu-modal-content{
  .content{
    .txt{
      .font{
        margin-left: 0!important;
      }
    }
  }
}
</style>


