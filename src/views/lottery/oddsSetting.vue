<template>
  <div>
    <div class="v2-button clearfix">
      <Button class="w120x fl mt20" v-show="oddsStatus" @click="() => {oddsStatus = !oddsStatus}">修改赔率</Button>
      <div v-show="!oddsStatus" class="fl">
        <Button @click="save">确认保存</Button>
        <Button @click="() => {oddsStatus = !oddsStatus}">取消修改</Button>
      </div>
    </div>
    <div class="v2-table">
      <Tables
        editable
        :total="table.total"
        :loading="table.loading"
        :value="table.data"
        :columns="table.columns"
        @on-page-change="onPageChange"
        @on-page-size-change="onPageSizeChange"
        :more="table.more"
      >
        <div slot="more" class="clearfix">
          <div class="dqcp">
            <span class="ft16">当前彩票：</span>
            <span class="ft16">香港六合彩</span>
          </div>
        </div>
      </Tables>
    </div>
  </div>
</template>
<script>
import Tables from "@/components/tables";
import { oddsSettingData } from "@/api/data";
export default {
  name: "oddsSetting",
  components: {
    Tables
  },
  data() {
    return {
      oddsStatus: true,
      table: {
        more: true,
        loading: true,
        total: 100,
        data: [],
        columns: [
          {
            title: "描述",
            key: "describe",
            align: "center",
            render: (h, params) => (
              <span>{params.row.describe ? "特码A1-49" : "特码单"}</span>
            )
          },
          {
            title: "号码",
            key: "num",
            align: "center",
            width: "800",
            tooltip: true,
          },
          // {
          //   title: "最大赔率",
          //   key: "maxOdds",
          //   align: "center",
          //   render: (h, params) => {
          //     let display = this.oddsStatus ? "block" : "none";
          //     return h('div',[
          //       h('span',{
          //         style:{
          //           display:this.oddsStatus ? 'block' : 'none'
          //         }
          //       },params.row.maxOdds),
          //       h('InputNumber',{
          //         style:{
          //           display:this.oddsStatus ? 'none' : 'block',
          //           textAlign:'center',
          //           width:'100%'
          //         },
          //         props:{
          //           value:params.row.maxOdds,
          //           step:0.01
          //         }
          //       })
          //     ])
          //   }
          // },
          {
            title: "赔率",
            key: "minOdds",
            align: "center",
            render: (h, params) => {
              return h("div", [
                h(
                  "span",
                  {
                    style: {
                      display: this.oddsStatus ? "block" : "none"
                    }
                  },
                  params.row.minOdds
                ),
                h("InputNumber", {
                  style: {
                    display: this.oddsStatus ? "none" : "block",
                    textAlign: "center",
                    width:'30%',
                    margin:'0 auto',
                    borderRadius:'0'
                  },
                  props: {
                    step: 0.01,
                    value: params.row.minOdds,
                    min:0
                  }
                })
              ]);
            }
          },
          {
            title: "返水",
            key: "refund",
            align: "center",
              render: (h, params) => {
              return h("div", [
                h(
                  "span",
                  {
                    style: {
                      display: this.oddsStatus ? "block" : "none"
                    }
                  },
                  `${params.row.refund}%`
                ),
                h("InputNumber", {
                  style: {
                    display: this.oddsStatus ? "none" : "block",
                    textAlign: "center",
                    width:'30%',
                    margin:'0 auto',
                    borderRadius:'0'
                  },
                  props: {
                    step: 0.01,
                    value: params.row.refund
                  }
                }),
              ]);
            }
          }
          // {
          //   title: "玩法",
          //   key: "play",
          //   align: "center"s
          // }
        ]
      }
    };
  },
  methods: {
    getData(query) {
      oddsSettingData().then(res => {
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
      this.oddsStatus = !this.oddsStatus;
      this.$Tip.success({
        content: "修改赔率成功",
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
.clearfix {
  .dqcp {
    width: 40%;
    border: 1px solid #ebebeb;
    text-align: center;
    line-height: 32px;
  }
}
.ivu-input-number{
  margin:auto;
}
/deep/.ivu-table-cell-tooltip-content{
  padding: 0 100px 0 100px !important; 
}
/deep/.ivu-input-number-input{
    border-radius: 0px!important;
}
</style>


