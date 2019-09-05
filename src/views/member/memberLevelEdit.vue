<template>
  <div>
    <div class="v2-search">
      <Form ref="searchKey" inline>
        <FormItem label="会员账号">
          <Input placeholder="账号/姓名/上级代理" class="s-140"/>
        </FormItem>
        <FormItem>
           <Poptip trigger="hover" class="ml14f" content="多个请以,逗号隔开,仅支持同类型多个输入" placement="bottom-end">
            <Icons type="bangzhutishi" color="#E4E4E4" :size="26"/>
          </Poptip>
        </FormItem>
        <FormItem>
          <Button type="primary" class="search">查询</Button>
        </FormItem>
        <FormItem label="修改等级">
          <Select class="s-140" clearable>
            <Option v-for="(item,index) in levelList" :key="index" :value="item.value">{{item.name}}</Option>
          </Select>
        </FormItem>
        <!-- <FormItem>
          <RadioGroup v-model="status" size="large" >
            <span @dblclick="clear" style="display:inline-block;">
              <Radio label="锁定"></Radio>
            </span>
            <span @dblclick="clear">
              <Radio label="解锁"></Radio>
            </span>
          </RadioGroup>
        </FormItem> -->
        <FormItem>
              <Poptip trigger="hover" class="ml14f" content="自动晋级，但可手动调节等级" placement="right-end">
              <Icons type="bangzhutishi" color="#E4E4E4" :size="26" class="ml0 mr8"/>
            </Poptip>
        </FormItem>
      </Form>
    </div>
    <div class="v2-table">
      <Tables
        :columns="table.columns"
        :loading="table.loading"
        :value="table.data"
        :total="table.total"
        :more="table.more"
        @on-selection-change="tableSelect"
      > 
        <div class="clearfix"  slot="more">
            已选会员{{this.total}}人
        </div>
      </Tables>
    
    </div>
    <div  class="mt20">
    <Button type="primary" class="ivu-btn submit" @click="submit">确认保存</Button>
    </div>
  </div>
</template>
<script>
import Icons from "@/components/icons";
import LevelSelect from "@/components/level-select";
import Tables from "@/components/tables";
import { memberLevelModify } from "@/api/data";
export default {
  name: "memberLevelEdit",
  components: {
    Tables,
    Icons,
    LevelSelect
  },
  data() {
    return {
    
      status: "解锁",
      levelList: [
        { value: "vip1", name: "第1层" },
        { value: "vip2", name: "第2层" },
        { value: "vip3", name: "第3层" },
        { value: "vip4", name: "第4层" },
        { value: "vip5", name: "第5层" },
        { value: "vip6", name: "第6层" },
        { value: "vip7", name: "第7层" }
      ],
      total: 0,
      table: {
          more:true,
        loading: true,
        total: 100,
        columns: [
          {
            type: "selection",
            width: 60,
            align: "center"
          },
          {
            title: "会员账号",
            key: "huiyuanzhanghao",
            align: "center"
          },
          {
            title: "等级",
            key: "dengji",
            align: "center"
          },
          {
            title: "上级代理",
            key: "shangjidaili",
            align: "center"
          },
          {
            title: "公司入款次数",
            key: "rukuancishu",
            align: "center"
          },
          {
            title: "公司入款总额",
            key: "rukuanzonge",
            align: "center"
          },
          {
            title: "线上支付次数",
            key: "zhifucishu",
            align: "center"
          },
          {
            title: "线上支付总额",
            key: "zhifuzonge",
            align: "center"
          },
          {
            title: "取款次数",
            key: "qukuancishu",
            align: "center"
          },
          {
            title: "取款总额",
            key: "qukuanzonge",
            align: "center"
          },
          {
            title: "总输赢",
            key: "zongshuying",
            align: "center"
          },
          {
            title: "锁定",
            key: "suoding",
            align: "center",
            render: (h, params) => {
              let className = params.row.suoding ? "" : "redText";
              let text = params.row.suoding ? "已锁定" : "未锁定";
              return h(
                "span",
                {
                  class: className
                },
                text
              );
            }
          },
          {
            title: "操作时间",
            key: "caozuoshijian",
            align: "center"
          }
        ],
        data: []
      }
    };
  },
  created() {
    this.$nextTick(() => {
      //   this.getData();
      let currentSite = JSON.parse(localStorage.currentSite);
      // this.$refs.LevelSelect.getSiteLevel(currentSite);
    });
    memberLevelModify().then(res => {
      this.table.loading = true;
      setTimeout(() => {
        this.table.data = res.data;
        this.table.loading = false;
      }, 2000);
    });
  },
  methods: {
    tableSelect(params) {
      this.total = params.length;
    },
    clear() {
      this.status = "";
    },
    submit() {
      this.$Tip.success({ 
        content: "修改会员等级成功",
        onOk: () => {
          this.$router.go(-1);
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../styles/button.less";
.ml0 {
  margin-left: 0;
}

.mr8 {
  margin-right: 8px;
}

.submit {
  display: block;
  margin: 0 auto;
}
</style>