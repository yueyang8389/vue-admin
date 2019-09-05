<template>
  <div>
    <Tables
      editable
      :columns="table.columns"
      :loading="table.loading"
      :value="table.data"
      :total="table.total"
      @on-page-change="onPageChange"
      @on-page-size-change="onPageSizeChange"
      :more='table.more'
    >
    <div class="clearfix" slot="more">
        <p>温馨提示：此列表展示今天的当期待开奖彩票，不包含快速彩票</p>
    </div>
    </Tables>
  </div>
</template>
<script>
import Tables from "@/components/tables";
import { currentLotteryData } from "@/api/data";
export default {
  name: "currentLotteryDate",
  components: {
    Tables
  },
  data() {
    return {
        table:{
            loading:true,
            total:100,
            title:'当前开奖期',
            more:true,
            data:[],
            columns:[
                {
                    title:'开奖日期',
                    key:'lotteryDate',
                    align:'center'
                },
                {
                    title:'期数',
                    key:'periods',
                    align:'center'
                },
                {
                    title:'彩票名称',
                    key:'lotteryName',
                    align:'center',
                    render:(h,params) => {
                        return (
                            <span>{params.row.lotteryName ? '香港六合彩' : '北京快3'}</span>
                        )
                    }
                },
                {
                    title:'封盘时间',
                    key:'sealTime',
                    align:'center'
                },
                {
                    title:'开奖时间',
                    key:'lotteryTime',
                    align:'center',
                    render:(h,params) => {
                        return (
                            <span>{params.row.lotteryName ? '-' : params.row.lotteryTime}</span>
                        )
                    }
                },
                {
                    title:'状态',
                    key:'status',
                    align:'center',
                    render:(h,params) => {
                        return (<span style='color:#ff9655'>{params.row.status}</span>)
                    }
                },
                {
                    title:'操作',
                    align:'center',
                    render:(h,params) => {
                        let color = params.row.status ? '#ececec' : 'blue'
                        return h('a',{
                            on:{
                                'click':() => {
                                    this.$Tip.confirm({
                                        content:` 是否确定撤销【${params.row.periods}】期彩票？
                                        撤销后，将返还所有会员投注!`,
                                        onOk:() => {
                                            this.$Message.success('撤销本期彩票成功')
                                        }
                                    })
                                }
                            }
                        },'撤单')
                    }
                }
            ]
        }
    };
  },
  methods: {
    getData(query) {
      currentLotteryData().then(res => {
        this.table.loading = true;
        setTimeout(() => {
          this.table.data = res.data;
          this.table.loading = false;
        }, 2000);
      });
    },
    onPageChange(page){
        this.getData(page)
    },
    onPageSizeChange(){}
  },
  mounted() {
    this.$nextTick(() => {
      this.getData();
    });
  }
};
</script>
<style lang="less" scoped>

</style>