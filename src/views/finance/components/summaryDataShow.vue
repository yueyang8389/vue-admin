<template>
  <div class="mt20">
    <table cellspacing="0" cellpading="0" class="table1">
      <tr>
        <td rowspan="2">
          <span class="txt ib bd w50 txt-a b">{{tableData.bonus.name}}</span>
          <span class="red-font ib txt-a w40">{{tableData.bonus.total}}</span>
        </td>
        <td v-for="(t,i) in tableData.bonus.list.slice(0,tableData.bonus.list.length / 2)" :key="i">
          <span class="txt ib bd w50 txt-a b ml20">{{t.name}}</span>
          <span class="red-font ib txt-a w40">{{t.total}}</span>
        </td>
      </tr>
      <tr>
        <td
          v-for="(t,i) in tableData.bonus.list.slice(tableData.bonus.list.length / 2,tableData.bonus.list.length)"
          :key="i"
        >
          <span class="txt ib bd w50 txt-a b ml20">{{t.name}}</span>
          <span class="red-font ib txt-a w40">{{t.total}}</span>
        </td>
      </tr>
    </table>
    <table cellspacing="0" cellpadding="0" style="border-top:0;" class="table2">
      <tr>
        <td>
          <span class="txt ib bd w50 txt-a b ml20">{{tableData.deposit.name}}</span>
          <span class="red-font ib txt-a w40">{{tableData.deposit.total}}</span>
        </td>
        <!-- 存款总额后续数据 -->
        <td v-for="(t,i) in tableData.deposit.list" :key="i">
          <span class="txt ib bd w50 txt-a b ml20">{{t.name}}</span>
          <span class="red-font ib txt-a w40">{{t.total}}</span>
        </td>
      </tr>
      <tr>
        <td>
          <span class="txt ib bd w50 txt-a b ml20">{{tableData.withdrawal.name}}</span>
          <span class="red-font ib txt-a w40">{{tableData.withdrawal.total}}</span>
        </td>
        <td v-for="(t,i) in tableData.withdrawal.list" :key="i">
          <span class="txt ib bd w50 txt-a b ml20">{{t.name}}</span>
          <span class="red-font ib txt-a w40">{{t.total}}</span>
        </td>
        <td></td>
      </tr>
    </table>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableData: {
        bonus: {
          name: "优惠总额",
          total: "100000000.00",
          list: [
            { name: "存款优惠", total: "100000000.00" },
            { name: "系统彩金派送", total: "100000000.00" },
            { name: "人工彩金派送", total: "100000000.00" },
            { name: "会员返水", total: "100000000.00" },
            { name: "会员返点", total: "100000000.00" },
            { name: "代理返点", total: "100000000.00" },
            { name: "代理返水", total: "100000000.00" },
            { name: "日工资", total: "100000000.00" },
            { name: "佣金", total: "100000000.00" },
            { name: "分红", total: "100000000.00" }
          ]
        },
        deposit: {
          name: "存款总额",
          total: "100000000.00",
          list: [
            { name: "在线支付", total: "100000000.00" },
            { name: "公司入款", total: "100000000.00" },
            { name: "人工存款", total: "100000000.00" },
            { name: "其他", total: "100000000.00" },
            { name: "额度转换失败", total: "100000000.00" }
          ]
        },
        withdrawal: {
          name: "取款总额",
          total: "100000000.000",
          list: [
            { name: "取款成功", total: "100000000.00" },
            { name: "人工取款", total: "100000000.00" },
            { name: "其他", total: "100000000.00" },
            { name: "存款优惠", total: "100000000.00" }
          ]
        }
      }
    };
  }
};
</script>
<style lang="less" scoped>
table {
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #ebebeb;
  tr {
    td {
      height: 60px;
      border: 1px solid #ebebeb;
      border-top: none;
    }
  }
}
.txt {
  height: 38px;
  line-height: 38px;
  margin: 12px auto;
  margin-left: 20px;
}
.table1,.table2{
  tr{
    &:nth-child(1){
      td{
        border-top: none;
        &:nth-child(1){
          width: 16.8%;
        }
        &:nth-child(2){
          width: 16.15%;
        }
        &:nth-child(3){
          width: 16%;
        }
        &:nth-child(4){
          width: 16.28%;
        }
        &:nth-child(5){
          width: 16.15%;
        }
      }
    }
  }
}
</style>


