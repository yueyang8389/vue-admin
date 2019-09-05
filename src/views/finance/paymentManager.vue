<template>
  <div>
    <div class="v2-button mt10">
      <Button @click="$router.push({path:'paymentAdd'})">添加支付平台</Button>
      <Button @click="$router.push({path:'paymentGroups'})">支付方式</Button>
    </div>
    <div class="mb20">
      <ButtonGroup class="status-button">
        <Button :class="status ? 'active h30' : 'h30'" @click="statusOn">正常</Button>
        <Button :class="status ? 'h30' : 'active h30'" @click="statusOff">停用</Button>
      </ButtonGroup>
    </div>
    <div class="v2-table">
      <Tables
        v-if="status"
        :columns="table.columns"
        :loading="table.loading"
        :value="table.data"
        :total="table.total"
        @on-edit="edit"
        @on-change-status="changeStatus"
        @on-page-change="onPageChange"
        @on-page-size-change="onPageSizeChange"
        @on-delete="deletei"
      ></Tables>

      <Tables
        v-else
        :columns="table.columns"
        :loading="table.loading"
        :value="table.data"
        :total="table.total"
        @on-edit="edit"
        @on-change-status="changeStatus"
        @on-delete="deletei"
      ></Tables>
    </div>
    <Modals ref="paymentModifyModal" title="支付修改">
      <div slot="content" class="modal-overflow">
        <Form ref="paymentModifyForm" :model="paymentModifyForm" :label-width="300">
          <FormItem label="支付平台">
            <span class="ft14">当当付</span>
          </FormItem>
          <FormItem label="支付方式">
            <div>
              <paymentRadio
                style="width:260px;"
                :methodsList="paymentMethods"
                @sendArray="getArray"
              ></paymentRadio>
            </div>
          </FormItem>
          <FormItem>
            <Button type="primary" class="ivu-btn submit ml40" @click="save">确认保存</Button>
          </FormItem>
        </Form>
      </div>
    </Modals>
  </div>
</template>
<script>
import Tables from "@/components/tables";
import Icons from "@/components/icons";
import paymentRadio from "./components/payment-radio-group";
import Modals from "@/components/modals";
import { paymentManagerData1, paymentManagerData2 } from "@/api/data";
import Sortable from "sortablejs";
export default {
  name: "paymentManager",
  components: {
    Tables,
    Modals,
    Icons,
    paymentRadio
  },
  data() {
    return {
      buttonText: "确认添加",
      insideColumns: "",
      detailData: {},
      paymentForm: { b: [] },
      status: true,
      modalTitle: "支付修改",
      paymentModifyForm: {},
      paymentMethods: [
        { value: "vip1", name: "支付方式1" },
        { value: "vip2", name: "支付方式2" },
        { value: "vip3", name: "支付方式3" },
        { value: "vip4", name: "支付方式4" },
        { value: "vip5", name: "支付方式4" },
        { value: "vip6", name: "支付方式4" }
      ],
      table: {
        loading: true,
        total: 100,
        columns: [
          {
            title: "排序",
            align: "center",
            width: 60,
            render: (h, params) => {
              return h(Icons, {
                props: {
                  type: "paixukongjian",
                  color: "#dadada",
                  size: 20
                }
              });
            }
          },
          {
            title: "平台编号",
            key: "pingtaibianhao",
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
            align: "center"
          },
          {
            title: "支付金额",
            key: "zhifujine",
            align: "center"
          },
          {
            title: "状态",
            key: "status",
            align: "center",
            render: (h, params) => {
              return h("span", params.row.status ? "正常" : "停用");
            }
          },
          {
            title: "备注",
            key: "beizhu",
            align: "center"
          },
          {
            title: "操作",
            key: "handle",
            align: "center",
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
                        this.$refs.paymentModifyModal.show();
                      }
                    }
                  },
                  "支付修改"
                );
              }
            ],
            options: ["status", "edit", "delete"]
          }
        ],
        data: []
      }
    };
  },
  mounted() {
    this.$nextTick(() => {
      paymentManagerData1().then(res => {
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
    getData(query) {
      paymentManagerData1().then(res => {
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
    rowDrop() {
      const tbody = document.querySelector(".ivu-table-tbody");
      Sortable.create(tbody, {});
    },
    searchSubmit() {},
    changeStatus(params) {
      let text = params.row.status
        ? "您确定停用" + params.row.zhifupingtai + "吗？"
        : "您确定启用" + params.row.zhifupingtai + "吗？";
      let txt = params.row.status
        ? `停用${params.row.zhifupingtai}成功`
        : `启用${params.row.zhifupingtai}成功`;
      this.$Tip.confirm({
        content: text,
        onOk: () => {
          this.$Tip.success({
            content: txt,
            onOk: () => {}
          });
        }
      });
    },
    edit(params) {
      this.$router.push({
        name: 'paymentEdit',
        query: {
          platform: params.row.zhifupingtai,
          id: params.row.pingtaibianhao,
          status: params.row.status
        }
      });
    },
    deletei(params) {
      let text = "您确定删除" + params.row.zhifupingtai + "吗？";
      this.$Tip.confirm({
        content: text,
        onOk: () => {
          this.$Tip.success({
            content: `删除${params.row.zhifupingtai}成功`
          });
        }
      });
    },
    statusOn() {
      this.status = true;
      paymentManagerData1().then(res => {
        this.table.loading = true;
        setTimeout(() => {
          this.table.data = res.data;
          this.table.loading = false;
        }, 2000);
      });
    },
    statusOff() {
      this.status = false;
      paymentManagerData2().then(res => {
        this.table.loading = true;
        setTimeout(() => {
          this.table.data = res.data;
          this.table.loading = false;
        }, 2000);
      });
    },
    save() {
      this.$refs.paymentModifyModal.hide();
      this.$Tip.success({
        content: "支付修改成功",
        onOk: () => {}
      });
    },
    //获取支付方式组件的选中值
    getArray(data) {}
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
.btngroup{
  margin-bottom: 30px;

/deep/.zcBtn{

span{
    vertical-align:0;

}
}
}
</style>
