<template>
  <div>
    <div class="v2-table">
      <Tables
        editable
        :columns="table.columns"
        :loading="table.loading"
        :value="table.data"
        :total="table.total"
        :more="table.more"
        @on-page-change="onPageChange"
        @on-page-size-change="onPageSizeChange"
        @on-details="onDetails"
        @on-edit="onEdit"
        @on-initialize="onInitialize"
      ></Tables>
      <Modals ref="editSetting" title="编辑配置" width="560">
        <div slot="content" class="v2-form-wrapper">
          <Form ref="editSet" :label-width="130" :rules="editSetRules" style="width:560px;">
            <FormItem label="当前风控" prop="当前风控">
              <Select class="w260x" v-model="editSet.select">
                <Option value="随机">随机</Option>
                <Option value="shanghai">控制</Option>
                <Option value="shenzhen">放水</Option>
              </Select>
            </FormItem>
            <FormItem label="平台盈利率">
              <Input class="w260x" v-model="editSet.input"/>
            </FormItem>
            <FormItem label="状态变更">
              <i-switch  v-model="editSet.switch" size="large">
                <span slot="open">未锁</span>
              </i-switch>
            </FormItem>
            <FormItem label="奖池上限金额" prop="superior">
              <Input class="w260x" v-model="editSet.superior"/>
            </FormItem>
            <FormItem>
              <Button  class="ivu-btn submit w260x gd  ft20" @click="save" type="primary">确认保存</Button>
            </FormItem>
          </Form>
        </div>
      </Modals>
    </div>
  </div>
</template>
<script>
import { fastCaipiao } from "@/api/data";
import Tables from "@/components/tables";
import Modals from "@/components/modals";
import Icons from "@/components/icons";
export default {
  name: "fastLottery",
  components: {
    Tables,
    Modals,
    Icons
  },
  data() {
    return {
      table: {
        loading: true,
        total: 100,
        title: "快速彩票",
        data: [],
        columns: [
          {
            key: "name",
            align: "center",
             width: 110,
            renderHeader:(h,params)=>{
            return h("p",[
              h("span","彩票名称"),
              h('Poptip',{
                props:{
                  trigger:'hover',
                  content:'24h可开奖，达到间隔时间可开奖',
                  placement:'right',
                   style:{
                    marginTop:'-4px'
                  }
                }
              },[
                h(Icons,{
                  props:{
                    type:'bangzhutishi'
                  },
                  style:{
                    color:'#b3b3b3',
                    marginLeft:'5px',
                  }
                })
              ])
            ],
          )
        },
          },
          {
            title: "开始统计时间",
            key: "countTime",
            align: "center",
            width: "120px"
          },
          {
            title: "有效投注",
            key: "cathectic",
            align: "center",
             width: 110
          },
          {
            title: "会员输赢",
            key: "bunko",
            align: "center",
             width: 110
          },
          {
            title: "平台杀数",
            key: "killCount",
            align: "center"
          },
          {
            title: "风控状态",
            key: "riskStatus",
            align: "center",
            render: (h, params) => {
              return <span>{params.row.riskStatus ? "随机" : "控制"}</span>;
            }
          },
          {
            title: "有效投注（黑名单）",
            key: "blackCathectic",
            align: "center",
            width: 120
          },
          {
            title: "会员输赢（黑名单）",
            key: "bunkoBlack",
            align: "center",
            width: 120
          },
          {
            title: "开奖间隔",
            key: "interval",
            align: "center",
         
          },
          {
            title: "奖池金额",
            key: "awardMoney",
            align: "center",
            width: 110
          },
          {
            title: "奖池上限",
            key: "awardUp",
            align: "center",
               width: 110
          },
          {
            title: "奖池状态",
            key: "awardStatus",
            align: "center",
            render: (h, params) => {
              return <span>{params.row.awardStatus ? "派彩" : "累计"}</span>;
            }
          },
          {
            title: "状态",
            key: "status",
            align: "center",
            render: (h, params) => {
              return (
                <span
                  style={{ color: params.row.status ? "#515a6e" : "#FF2626" }}
                >
                  {params.row.status ? "未锁" : "锁定"}
                </span>
              );
            }
          },
          {
            title: "操作",
            key: "handle",
            width: "120px",
            align: "center",
            options: ["details", "initialize", "edit"]
          }
        ]
      },
      editSet: {
        input: "",
        select: "",
        switch: true,
        slider: [20, 50],
        textarea: ""
      },
      editSetRules: {
        superior: [
          {
            required: true,
            message: "请输入奖池上线金额",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    onDetails(params) {
      this.$router.push({ name: "fastLotteryDetails" });
    },
    onEdit(params) {
      this.$refs.editSetting.show();
    },
    onInitialize(params) {
      this.$Tip.confirm({
        content: "您确定要初始化吗？",
        onOk: () => {
          this.$Tip.success({
            content: "初始化成功",
            onOk: () => {}
          });
        }
      });
    },
    getData(query) {
      fastCaipiao().then(res => {
        this.table.loading = true;
        setTimeout(() => {
          this.table.data = res.data;
          this.table.loading = false;
        }, 2000);
      });
    },
    onPageChange(page) {
      this.getData(page);
    },
    onPageSizeChange() {},
    save() {
      this.$refs.editSetting.hide();
      this.$Tip.success({
        content: "编辑配置成功",
        onOk: () => {
      }
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
<style lang="less" scoped>
.w260x {
  width: 260px;
  height: 30px;
}
.gd{
  height: 50px;
}
/deep/.ivu-form-item-error-tip{
  top:0;
  left:270px;
}
</style>
