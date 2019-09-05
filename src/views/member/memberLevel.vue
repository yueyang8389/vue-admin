<template>
  <div>
    <div class="v2-button mt10">
      <Button @click="siteLevelModal">添加会员等级</Button>
      <Button @click="$router.push({path:'memberLevelEdit'})">修改会员等级</Button>
      <Button @click="paymentListModal">支付通道详情</Button>
    </div>
    <div class="v2-table">
      <Tables
        :columns="table.columns"
        :loading="table.loading"
        :value="table.data"
        :total="table.total"
        @on-edit="edit"
        @on-details="detail"
        @on-page-change="onPageChange"
        @on-page-size-change="onPageSizeChange"
        @on-change-status="changeStatus"
        @on-allot="allot"
      ></Tables>
    </div>
    <PaymentList ref="paymentList"/>
    <PaymentModify ref="paymentModify"/>
    <MemberLevelDetail ref="memberLevelDetail" :levelObj="levelObj"/>
    <CreateSiteLevel ref="createSiteLevel" :title="title" :memberLevelForm="memberLevelForm"/>
    <Modals ref="levelDistribution" :title="distributionTitle" :width="1060">
      <div slot="content">
        <Form
          ref="levelDistributionForm"
          :model="levelDistributionForm"
          style="width:1060px;"
          :rules="levelDistributionValidate"
          :label-width='360'
        >
          <FormItem label="最小存款" prop="minDeposit">
            <Input v-model="levelDistributionForm.minDeposit" class="w370x"/>
          </FormItem>
          <FormItem label="打码倍数" prop="damabeishu">
            <Input v-model="levelDistributionForm.damabeishu" class="w370x"/>
          </FormItem>
          <FormItem label="最大单笔" prop="maxSingle">
            <Input v-model="levelDistributionForm.maxSingle" class="w370x"/>
          </FormItem>
          <FormItem label="支付方式" prop="paymentMethods">
            <paymentRadio
              :methodsList="methodsList"
              :defaultChecked="defaultChecked"
              style="width:370px;"
            ></paymentRadio>
          </FormItem>
          <FormItem>
            <Button class="w260x bg white-font ml20 white-font" @click="saveLevel">提交保存</Button>
          </FormItem>
        </Form>
      </div>
    </Modals>
  </div>
</template>
<script>
import Icons from "@/components/icons";
import paymentRadio from "@/views/finance/components/payment-radio-group";
import Modals from "@/components/modals";
import Tables from "@/components/tables";
import PaymentList from "./components/payment-list";
import PaymentModify from "./components/payment-modify";
import MemberLevelDetail from "./components/member-level-detail";
// 添加编辑等级
import CreateSiteLevel from "./components/create-site-level";
import { memberLevelData } from "@/api/data";
export default {
  name: "memberLevel",
  components: {
    Tables,
    PaymentList,
    PaymentModify,
    MemberLevelDetail,
    CreateSiteLevel,
    Modals,
    Icons,
    paymentRadio
  },
  data() {
    return {
      title: "添加会员等级",
      levelDistributionForm: {},
      levelDistributionValidate: {
        minDeposit: [
          {
            required: true,
            message: "请输入最小存款",
            trigger: "blur"
          }
        ],
        damabeishu:[
          {
            required:true,
            message:'请输入打码倍数',
            trigger:'blur'
          }
        ],
        maxSingle:[
          {
            required:true,
            message:'请输入最大单笔',
            trigger:'blur'
          }
        ],
        paymentMethods:[
          {
            required:true,
            message:'请选择支付方式',
            trigger:'blur'
          }
        ]
      },
      distributionTitle: "",
      memberLevelForm: {},
      levelObj: {},
      methodsList: [
        { name: "网银在线", value: "wangyinzaixian" },
        { name: "支付宝线上", value: "zhifubaoxianshang" },
        { name: "微信线上", value: "weixinxianshang" },
        { name: "银联支付", value: "yinlianzhifu" }
      ],
      defaultChecked: "",
      table: {
        loading: true,
        total: 100,
        columns: [
          {
            title: "等级",
            key: "level",
            align: "center"
          },
          {
            title: "等级别称",
            align: "center",
            render: (h, params) => {
              let txt = params.row.level.split("P")[1];
              return <span>第{txt}层</span>;
            }
          },
          {
            title: "会员人数",
            key: "memberCount",
            align: "center"
          },
          // {
          //   title: "存款次数",
          //   key: "depositCount",
          //   align: "center"
          // },
          {
            title: "最小存款",
            key: "depositMin",
            align: "center"
          },
          {
            title: "打码倍数",
            key: "damabeishu",
            align: "center"
          },
          {
            title: "最大单笔",
            key: "bigStroke",
            align: "center"
          },
          {
            title: "支付方式",
            key: "modepayment",
            align: "center",
            render: (h, params) => {
              let color = params.row.status
                ? "#2dbcf0"
                : params.row.modepayment
                ? "#808080"
                : "#2dbcf0";
              return (
                <span style={{ color }}>
                  {params.row.status
                    ? "公司入款"
                    : params.row.modepayment
                    ? "-"
                    : "支付宝线上"}
                </span>
              );
            }
          },
          {
            title: "取款打码倍数",
            key: "qukuandama",
            align: "center",
            width: 120
          },
          {
            title: "彩金奖励",
            key: "caijin",
            align: "center"
          },
          {
            title: "创建时间",
            key: "createTime",
            align: "center",
            width: 130
          },
          {
            title: "默认等级",
            key: "defaultLevel",
            align: "center",
            render: (h, params) => {
              let className = params.row.defaultLevel ? "" : "redText";
              return h(
                "span",
                {
                  class: className
                },
                params.row.defaultLevel ? "是" : "否"
              );
            }
          },
          {
            title: "状态",
            key: "status",
            align: "center",
            render: (h, params) => {
              let className = params.row.status ? "" : "redText";
              return h(
                "span",
                {
                  class: className
                },
                params.row.status ? "正常" : "停用"
              );
            }
          },
          {
            title: "操作",
            key: "handle",
            align: "center",
            width: 220,
            options: ["status", "details", "edit", "allot"],
            button: [
              (h, params, vm) => {
                return h(
                  "span",
                  {
                    style: {
                      color: "#62B1FD",
                      cursor: "pointer",
                      marginLeft: "5px"
                    },
                    on: {
                      click: () => {
                        this.$refs.paymentModify.show();
                      }
                    }
                  },
                  "支付设置"
                );
              }
            ]
          }
        ],
        data: []
      }
    };
  },
  mounted() {
    memberLevelData().then(res => {
      this.table.loading = true;
      setTimeout(() => {
        this.table.data = res.data;
        this.table.loading = false;
      }, 2000);
    });
  },
  methods: {
    getData(query) {
      memberLevelData().then(res => {
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
    siteLevelModal() {
      this.title = "添加会员等级";
      (this.memberLevelForm = {}), this.$refs.createSiteLevel.show();
    },
    paymentListModal() {
      this.$refs.paymentList.show();
    },
    edit(params) {
      let con = params.row.level.split("P")[1];
      let txt = `第${con}层`;
      this.title = "编辑等级";
      this.memberLevelForm = {
        level: "vip1",
        a: txt,
        b: params.row.depositCount,
        c: params.row.depositMin,
        d: params.row.damabeishu,
        e: params.row.qukuandama,
        f: params.row.caijin,
        g: params.row.status ? "vip1" : "vip2",
        h: "暂无备注信息"
      };
      this.$refs.createSiteLevel.show();
    },
    allot(params) {
      this.distributionTitle = `等级分配(${params.row.level}中会员等级分配)`;
      this.$refs.levelDistribution.show();
    },
    saveLevel(){
      this.$refs.levelDistribution.hide();
      this.$Tip.success({
        content:'会员等级分配成功',
        onOk:() => {
          
        }
      })
    },
    detail(params) {
      this.title = "等级详情";
      this.levelObj = {
        levelName: params.row.level,
        levelAlias: params.row.level.split("P")[1],
        memberCount: params.row.memberCount,
        depositMin: params.row.depositMin,
        damabeishu: params.row.damabeishu,
        bigStroke: params.row.bigStroke,
        qukuandama: "1",
        caijin: params.row.caijin,
        status: params.row.status ? "正常" : "停用",
        remark: "暂无信息",
        defaultLevel: params.row.defaultLevel ? "是" : "否",
        createTime: params.row.createTime,
        updateTime: "2019-3-4 16:48"
      };
      this.$refs.memberLevelDetail.show();
      this.$refs.memberLevelDetail.spinShow();
      setTimeout(() => {
        this.$refs.memberLevelDetail.spinHide();
      }, 2000);
    },
    changeStatus(params) {
      let text = params.row.status
        ? "您确定停用" + params.row.level + "吗？"
        : "您确定启用" + params.row.level + "吗？";
      let txt = params.row.status
        ? `停用${params.row.level}成功`
        : `启用${params.row.level}成功`;
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
    }
  }
};
</script>
<style lang="less" scoped>
/deep/.ivu-form-item-error-tip{
  left: 380px;
}
.bg{
  background: #62b1fd;
}
</style>

