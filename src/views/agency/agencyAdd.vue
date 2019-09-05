<template>
  <div>
    <Form ref="agencyInfo" :label-width="100" class="mt10" :model="agencyInfo" :rules="agencyInfoRulesValidate">
      <FormItem label="代理类型">
        <Select v-model="agencyInfo.type" clearable class="w340x">
          <Option value="agency">代理</Option>
          <Option value="stock">大股东</Option>
        </Select>
      </FormItem>
      <FormItem
        label="上级代理"
        prop="superior"
        v-show="agencyInfo.type == 'agency' || !agencyInfo.type"
      >
        <Input class="w340x" v-model="agencyInfo.superior" placeholder="上级代理账号，默认查询"/>
      </FormItem>
      <FormItem
        label="代理账号" 
        prop="account"
        v-show="agencyInfo.type == 'agency' || !agencyInfo.type"
      >
        <Input v-model="agencyInfo.account" placeholder="6-20位数字或字母" class="w340x"/>
      </FormItem>
      <FormItem  label="会员等级"   class="w340x" >
         <Select class="w340x">
                <Option  v-for="(item,i) in selectList " :value="item.value"  :key="i">{{item.name}}</Option>   
         </Select>

      </FormItem>
      <FormItem label="大股东账号" prop="stockAccount" v-show="agencyInfo.type == 'stock'">
        <Input v-model="agencyInfo.stockAccount" placeholder="6-20位数字或字母" class="w340x"/>
      </FormItem>
      <FormItem label="默认密码">
        <Input v-model="agencyInfo.defaultPwd" class="w340x" disabled/>
      </FormItem>
      <FormItem label="状态">
        <Select v-model="agencyInfo.status" class="w340x">
          <Option value="open">开启</Option>
          <Option value="close">关闭</Option>
        </Select>
      </FormItem>
      <FormItem label="备注信息">
        <Input
          v-model="agencyInfo.remark"
          type="textarea"
          :rows="4"
          class="w340x h80"
          placeholder="此栏位仅供管理者记录其他资讯，会员无法检视"
        />
      </FormItem>
      <div v-show="agencyInfo.type == 'stock'">
        <rebate-select></rebate-select>
        <refund-select></refund-select>
      </div>
      <FormItem>
        <Button class="ivu-btn bg mt15 w340x ft20" @click="agencyAdd">确认新增</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import Icons from "@/components/icons";
import RefundSelect from "@/components/refund-select";
import RebateSelect from "@/components/rebate-select";
import LevelSelect from "@/components/level-select";
import "@/store";
// import { mapState } from "vuex";
export default {
  name: "agencyAdd",
  components: { Icons, RefundSelect, RebateSelect },
  // computed: {
  //   ...mapState({
  //     fdList: state => state.info.fdList,
  //     percentList: state => state.info.percentList,
  //     fsList: state => state.info.fsList
  //   })
  // },
  data() {
    return {
      selectList:[
         {value:'floor1',name:"第一层"},
         {value:'floor1',name:"第二层"},
         {value:'floor1',name:"第三层"},
         {value:'floor1',name:"第四层"},
         {value:'floor1',name:"第五层"},
         {value:'floor1',name:"第六层"},
         {value:'floor1',name:"第七层"},
         {value:'floor1',name:"第八层"},
         {value:'floor1',name:"套利层"},
          {value:'floor1',name:"测试层"}
      ],
      agencyInfo: {
        defaultPwd: 123456
      },
      agencyInfoRulesValidate: {
        superior: [
          {
            required: true,
            message: "请输入上级代理",
            trigger: "blur"
          }
        ],
        account: [
          {
            required: true,
            message: "请输入正确的账号",
            trigger: "blur"
          }
        ],
        stockAccount: [
          {
            required: true,
            message: "请输入正确的账号",
            trigger: "blur"
          }
        ]
      },
      open: false
    };
  },
  methods: {
    agencyAdd() {
      this.$Tip.success({
        content: "新增代理成功",
        onOk: () => {
          this.$router.push({ name: "agencySearch" });
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../styles/button.less";
/deep/.ivu-form-item-error-tip{
  left: 350px!important;
}
</style>


