<template>
  <div>
    <div class="v2-button mt10">
      <Button @click="addPayment">添加支付方式</Button>
    </div>
    <div class="v2-table">
      <Tables
        :columns="table.columns"
        :loading="table.loading"
        :value="table.data"
        :total="table.total"
        @on-edit="edit"
        @on-details="detail"
        @on-change-status="changeStatus"
        @on-delete="deletei"
      ></Tables>
    </div>
    <Modals ref="detailModal" :title="modalTitle">
      <div slot="content">
        <div class="box">
          <span>
            <p>{{detailData.zhifufangshi}}</p>
            <p>支付方式</p>
          </span>
          <span>
            <p>{{detailData.kaifangzhongduan}}</p>
            <p>客户端</p>
          </span>
          <span>
            <p>{{detailData.status ? '正常' : '停用'}}</p>
            <p>状态</p>
          </span>
          <span>
            <p>{{detailData.chuangjianren}}</p>
            <p>创建人</p>
          </span>
          <span>
            <p>{{detailData.chuangjianren}}</p>
            <p>更新人</p>
          </span>
          <span>
            <p>{{detailData.chuangjianshijian}}</p>
            <p>创建时间</p>
          </span>
          <span>
            <p>{{detailData.zhifubeizhu}}</p>
            <p>备注</p>
          </span>
        </div>
      </div>
    </Modals>
    <Modals ref="paymentModal" :title="modalTitle" width='766'>
      <div slot="content" class="v2-form-wrapper paymentModal">
        <Form
          ref="paymentForm"
          :model="paymentForm"
          :rules="paymentRuleValidate"
          :label-width="225"
          style="width:766px;"
        >
          <FormItem label="支付类型" prop="type">
            <Select v-model="paymentForm.type" placeholder="请选择" class="w275x">
              <Option value="saoma">扫码支付</Option>
              <Option value="xianshang">线上支付</Option>
            </Select>
          </FormItem>
          <FormItem label="支付方式" prop="a">
            <Input v-model="paymentForm.a" placeholder="请输入支付方式" class="w275x"/>
          </FormItem>
          <FormItem label="开放终端" prop="b">
            <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange" >
              <Checkbox label="全部" 
              :indeterminate="indeterminate"
              :value="checkAll"
              @click.prevent.native="handleCheckAll"
              ></Checkbox>
              <Checkbox label="PC" value="PC"></Checkbox>
              <Checkbox label="H5" value="H5"></Checkbox>
              <Checkbox label="Android" value="Android"></Checkbox>
              <Checkbox label="IOS" value="IOS"></Checkbox>
            </CheckboxGroup>
          </FormItem>
          <FormItem label="状态" prop="c">
            <Select v-model="paymentForm.c" placeholder="请选择" class="w275x">
              <Option value="yes">正常</Option>
              <Option value="no">停用</Option>
            </Select>
          </FormItem>
          <FormItem label="备注信息">
            <Input
              v-model="paymentForm.h"
              type="textarea"
              placeholder="此栏位仅供管理者记录其他资讯，会员无法检视"
              class="w275x"
              :rows="4"
            />
          </FormItem>
          <FormItem>
            <Button class="w275x" type="primary" @click="addPaymentClose">{{buttonText}}</Button>
          </FormItem>
        </Form>
      </div>
    </Modals>
  </div>
</template>
<script>
import Tables from "@/components/tables";
import Modals from "@/components/modals";
import Icons from "@/components/icons";
import { paymentGroupsData } from "@/api/data";
import Sortable from "sortablejs";
export default {
  name: "paymentGroups",
  components: {
    Tables,
    Modals,
    Icons
  },
  data() {
    return {
       indeterminate: true,
        checkAll: false,
      checkAllGroup: [],
      // a:[],
      insideColumns: [],
      modalTitle: "详情",
      buttonText: "确认添加",
      detailData: {},
      paymentForm: { b: [] },
      paymentRuleValidate: {
        type: [
          {
            required: true,
            message: "请选择支付类型",
            trigger: "change"
          }
        ],
        a: [
          {
            required: true,
            message: "请输入支付方式",
            trigger: "blur"
          }
        ],
        b: [
          {
            required: true,
            type: "array",
            message: "请选择开放等级终端",
            trigger: "blur"
          }
        ]
      },
      table: {
        loading: true,
        total: 100,
        columns: [
          {
            title: "排序",
            align: "center",
            render: (h, params) => {
              return h(Icons, {
                props: {
                  type: "paixukongjian",
                  size: 20,
                  color: "#dadada",
                }
              });
            },
            key: "zhifufangshi"
          },
          {
            title: "支付方式",
            key: "zhifufangshi",
            align: "center"
          },
          {
            title: "支付类型",
            key: "zhifuleixing",
            align: "center"
          },
          {
            title: "开放终端",
            key: "kaifangzhongduan",
            align: "center"
          },
          {
            title: "支付备注",
            key: "zhifubeizhu",
            align: "center",
            width: 170,
            tooltip: true
          },
          {
            title: "创建时间",
            key: "chuangjianshijian",
            align: "center"
          },
          {
            title: "创建人",
            key: "chuangjianren",
            align: "center"
          },
          {
            title: "状态",
            key: "status",
            align: "center",
            render: (h, params) => {
              //   let className = params.row.status ? "" : "redText";
              return h("span", params.row.status ? "正常" : "停用");
            }
          },
          {
            title: "操作",
            key: "handle",
            align: "center",
            options: ["status", "details", "edit", "delete"]
          }
        ],
        data: []
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      paymentGroupsData().then(res => {
        this.table.loading = true;
        setTimeout(() => {
          this.table.data = res.data;
          this.table.loading = false;
        }, 2000);
      });
    });
    this.rowDrop();
  },
  methods: {
       handleCheckAll() {
      if (this.indeterminate) {
        this.checkAll = false;
      } else {
        this.checkAll = !this.checkAll;
      }
      this.indeterminate = false;

      if (this.checkAll) {
        this.checkAllGroup = ["PC", "H5", "Android", "IOS"];
      } else {
        this.checkAllGroup = [];
      }
    },
     checkAllGroupChange(data) {
      if (data.length === 4) {
        this.indeterminate = false;
        this.checkAll = true;
      } else if (data.length > 0) {
        this.indeterminate = true;
        this.checkAll = false;
      } else {
        this.indeterminate = false;
        this.checkAll = false;
      }
    },
    rowDrop() {
      const tbody = document.querySelector(".ivu-table-tbody");

      Sortable.create(tbody, {});
    },
    searchSubmit() {},
    changeStatus(params) {
      let text = params.row.status
        ? "您确定停用" + params.row.zhifufangshi + "吗？"
        : "您确定启用" + params.row.zhifufangshi + "吗？";
      let txt = params.row.status
        ? "停用" + params.row.zhifufangshi + "成功"
        : "启用" + params.row.zhifufangshi + "成功";
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
    edit(params) {
      this.modalTitle = "编辑支付方式";
      this.buttonText = "确认保存";
      this.paymentForm.type = "saoma";
      this.paymentForm.a = "支付宝扫码";
      this.paymentForm.c = params.row.status == true ? "yes" : "no";
      this.$refs.paymentModal.show();
    },
    addPayment() {
      this.modalTitle = "添加支付方式";
      this.buttonText = "确认添加";
      this.$refs.paymentModal.show();
    },
    detail(params) {
      this.detailData = params.row;
      this.$refs.detailModal.show();
    },
    deletei(params) {
      let text = "您确定删除" + params.row.zhifufangshi + "吗？";
      this.$Tip.confirm({
        content: text,
        onOk: () => {
          // this.getData();
          this.$Tip.success({
            content: "删除支付宝扫码成功",
            onOk: () => {}
          });
        }
      });
    },
    addPaymentClose() {
      switch (this.modalTitle) {
        case "添加支付方式":
          this.$refs.paymentModal.hide();
          this.$Tip.success({
            content: "添加支付方式成功",
            onOk: () => {}
          });
          break;
        case "编辑支付方式":
          this.$refs.paymentModal.hide();
          this.$Tip.success({
            content: "修改支付方式成功",
            onOk: () => {}
          });
          break;
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../styles/button.less";
.box {
  border: 1px solid #eaeaea;
  > span {
    box-sizing: border-box;
    display: inline-block;
    width: 33.33%;
    height: 100px;
    text-align: center;
    border-right: 1px solid #eaeaea;
    border-bottom: 1px solid #eaeaea;
    padding: 25px;
    &:nth-of-type(3n) {
      border-right: 0;
    }
    &:nth-last-of-type(1) {
      width: 100%;
      border-right: 0;
    }
    &:nth-last-of-type(1) {
      border-bottom: 0;
    }
    > p {
      &:nth-child(1) {
        font-size: 18px;
        color: #808080;
      }
      &:nth-child(2) {
        font-size: 14px;
        color: #c3c3c3;
      }
    }
  }
}
/deep/.ivu-form-item-error-tip{
    left: 280px!important;
    width: 110px;
}
/deep/.ivu-table-cell-tooltip-content{
  padding: 0 30px 0 30px !important; 
}
.ivu-form-item-content{
    line-height: 0;
}
</style>


