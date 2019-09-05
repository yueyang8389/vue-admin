<template>
  <div>
    <div class="v2-button">
      <Button  class="mt10"
        @click="() => {
        this.$router.push({name:'memberRefundEdit',params:{type:'add'}})
        }"
      >添加返水等级</Button>
    </div>
    <div class="v2-table">
      <Tables
        :columns="table.columns"
        :loading="table.loading"
        :value="table.data"
        :total="table.total"
        @on-details="onDetails"
        @on-change-status="statusChange"
        @on-edit="onEdit"
        @on-page-change="onPageChange"
        @on-page-size-change="onPageSizeChange"
      ></Tables>
    </div>
  </div>
</template>
<script>
import Tables from "@/components/tables";
import { getMemberBonusData } from "@/api/data";
export default {
  name: "memberRefund",
  components: { Tables },
  data() {
    return {
      metaTitle:'添加返水等级',
      table: {
        loading: true,
        total: 100,
        columns: [
          {
            title: "返水等级",
            key: "level",
            align: "center"
          },
          {
            title: "返水等级别称",
            key: "levelAlias",
            align: "center"
          },
          {
            title: "最低下注",
            key: "minBet",
            align: "center"
          },
          {
            title: "最大返水",
            key: "maxBonus",
            align: "center"
          },
          {
            title: "创建日期",
            key: "createTime",
            align: "center"
          },
          {
            title: "默认等级",
            key: "default",
            align: "center",
            render: (h, params) => {
              let color = params.row.status ? "#515a6e" : "#FF2626";
              return (
                <span style={{ color: color }}>
                  {params.row.default ? "是" : "否"}
                </span>
              );
            }
          },
          {
            title: "状态",
            key: "status",
            align: "center",
            render: (h, params) => {
              let color = params.row.status ? "#515a6e" : "#FF2626";
              return (
                <span style={{ color: color }}>
                  {params.row.status ? "正常" : "停用"}
                </span>
              );
            }
          },
          {
            title: "备注",
            key: "remarks",
            align: "center"
          },
          {
            title: "操作",
            key: "handle",
            align: "center",
            options: ["details", "edit", "status"]
          }
        ],
        data: []
      }
    };
  },
  created() {
    this.$nextTick(() => {
      this.getData();
    });
  },
  methods: {
    getData(query) {
      getMemberBonusData().then(res => {
        this.table.loading = true;
        setTimeout(() => {
          this.table.data = res.data;
          this.table.loading = false;
        }, 2000);
      });
    },
    onDetails(params) {
      this.$router.push({ name: "memberRefundDetails" });
    },
    onEdit(params) {
      this.metaTitle = '编辑返水等级';
      this.$router.push({
        name: "memberRefundEdit",
        params: { memberInfo: params.row }
      });
    },
    searchSubmit() {},
    searchReset() {},
    onPageChange(page) {
      let query = {
        page: page
      };
      this.getData(query);
    },
    onPageSizeChange(count) {
      // alert(count);
    },
    statusChange(params) {
      let text = params.row.status
        ? `您确定停用返水${params.row.level}吗？`
        : `您确定启用返水${params.row.level}吗？`;
      let txt = params.row.status
        ? `停用返水${params.row.level}成功`
        : `启用返水${params.row.level}成功`;
      this.$Tip.confirm({
        content: text,
        onOk: () => {
          this.$Tip.success({
            content: txt,
            onOk: () => {}
          });
        }
      });
    }
  },
  beforeRouteLeave(to,from,next){
    if(to.name === 'memberRefundEdit' && to.meta.title !== this.metaTitle){
      to.meta.title = this.metaTitle;
    }
    next();
  },
  beforeRouteEnter(to,from,next){
    next(vm => {
      vm.metaTitle = '添加返水等级';
    })
  }
};
</script>
<style lang="less" scoped>
</style>

