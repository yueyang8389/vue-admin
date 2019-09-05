<template>
  <Tables
    editable
    :columns="table.columns"
    :loading="table.loading"
    :value="table.data"
    :total="table.total"
    @on-delete="onDelete"
    @on-edit='onEdit'
    @on-page-change="onPageChange"
    @on-page-size-change="onPageSizeChange"
    @on-change-status="changeStatus"
    :more="table.more"
  ></Tables>
</template>
<script>
import Tables from "@/components/tables";
import Icons from "@/components/icons";
import Sortable from "sortablejs";
import { cardManagementData } from "@/api/data";
export default {
  props: ["title"],
  components: { Tables ,Icons},
  data() {
    return {
      table: {
        total: 100,
        title: "入款卡管理",
        loading: true,
        columns: [
          {
            title: "排序",
            key: "sort",
            align: "center",
            render:(h,params) => (
              <Icons type='paixukongjian' color="#dadada" size="20"></Icons>
            )
          },
          {
            title: "银行名称",
            key: "bankName",
            align: "center"
          },
          {
            title: "持卡人姓名",
            key: "carHolder",
            align: "center"
          },
          {
            title: "银行卡号",
            key: "cardNum",
            align: "center",
            width: "180"
          },
          {
            title: "银行归属地",
            key: "cardAttribution",
            align: "center",
            width: "160"
          },
          {
            title: "开放等级",
            key: "openLevel",
            align: "center",
            width: "230"
          },
          {
            title: "开放终端",
            key: "openTerminal",
            align: "center",
            width: "130"
          },
          {
            title: "创建时间",
            key: "createTime",
            align: "center",
            width: "130"
          },
          {
            title: "创建人",
            key: "founder",
            align: "center"
          },
          {
            title: "状态",
            key: "status",
            align: "center",
            render: (h, params) => {
              let color = params.row.status ? "#515a6e" : "#FF2626FF";
              return (
                <span style={{ color }}>
                  {params.row.status ? "正常" : "停用"}
                </span>
              );
            }
          },
          {
            title: "操作",
            key: "handle",
            align: "center",
            width: "170",
            options: ["status", "edit", "delete"]
          }
        ],
        data: []
      }
    };
  },
  methods: {
    getData(query) {
      cardManagementData().then(res => {
        this.table.loading = true;
        setTimeout(() => {
          this.table.data = res.data;
          this.table.loading = false;
        }, 2000);
      });
    },
    onPageChange(page) {
      let query = { page };
      this.getData(query);
    },
    onPageSizeChange() {},
    changeStatus(params) {
      let text = params.row.status
        ? `您确定停用${params.row.bankName}吗？`
        : `您确定启用${params.row.bankName}吗？`;
        let txt = params.row.status ? `停用${params.row.bankName}成功` : `启用${params.row.bankName}成功`;
      this.$Tip.confirm({
        content: text,
        onOk: () => {
          // this.getData();
          this.$Tip.success({
            content:txt,
            onOk:() => {}
          })
        }
      });
    },
    onDelete(params) {
      this.$Tip.confirm({
        content: `您确定删除${params.row.bankName}吗？`,
        onOk: () => {
          this.$Tip.success({
            content:`删除${params.row.bankName}成功`,
            onOk:() => {}
          })
        }
      });
    },
    rowDrop() {
      const tbody = document.querySelector(".ivu-table-tbody");
      // const _this = this;
      Sortable.create(tbody, {});
    },
    onEdit(params) {
      this.$router.push({name:'bankCardEdit',params:{routeData:params}})
    }
  },
  mounted() {
    this.getData();
    this.rowDrop();
  }
};
</script>

