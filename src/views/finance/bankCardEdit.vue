<template>
  <div class="cardLeft">
    <Form ref="cardData" :model="cardData" :rules="cardDataRuleValidate" :label-width="110">
      <FormItem label="创建人">
        <Input v-model="cardData.founder" class="w275x" disabled/>
      </FormItem>
      <FormItem label="入款卡">
        <Input class="w275x" disabled v-model="cardData.depositCard"/>
      </FormItem>
      <FormItem label="银行名称" prop="bankName">
        <Select class="w275x" v-model="cardData.bankName">
          <Option value="包商银行">包商银行</Option>
          <Option value="中国银行">中国银行</Option>
          <Option value="北京银行">北京银行</Option>
          <Option value="工商银行">工商银行</Option>
        </Select>
      </FormItem>
      <FormItem label="银行卡号" prop="cardNum">
        <Input class="w275x" v-model="cardData.cardNum"/>
      </FormItem>
      <FormItem label="持卡人姓名" prop="carHolder">
        <Input v-model="cardData.carHolder" class="w275x"/>
      </FormItem>
      <FormItem label="银行归属地" prop="cardAttribution">
        <Input class="w275x" v-model="cardData.cardAttribution"/>
      </FormItem>
      <FormItem label="开放等级">
        <Select class="w275x" multiple v-model="cardData.openLevel">
          <Option v-for="(t,i) in level" :key="i" :value="t">{{t}}</Option>
        </Select>
      </FormItem>
      <FormItem label="开放终端" class="clearfix">
        <div class="fl">
          <Checkbox
            :indeterminate="indeterminate"
            :value="checkAll"
            @click.prevent.native="handleCheckAll"
          >全选</Checkbox>
        </div>
        <CheckboxGroup v-model="checkAllGroup" @on-change="checkAllGroupChange" class="fl">
          <Checkbox label="PC"></Checkbox>
          <Checkbox label="H5"></Checkbox>
          <Checkbox label="Android"></Checkbox>
          <Checkbox label="IOS"></Checkbox>
        </CheckboxGroup>
      </FormItem>
      <FormItem label='当前状态'>
          <Select class="w275x" v-model="cardData.currentStatus">
              <Option value="yes">正常</Option>
              <Option value="no">停用</Option>
          </Select>
      </FormItem>
      <FormItem>
          <Button type="primary" class="export" @click="save">确认保存</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
export default {
  name: "bankCardEdit",
  data() {
    return {
      indeterminate: true,
      checkAll: false,
      checkAllGroup: [],
      level: ['未分层','第一层','第二层','第三层','第四层','第五层','第六层'],
      cardData: {
        bankName: "baoshang",
        openLevel: ["two", "three", "four", "five", "six"]
      },
      cardDataRuleValidate: {
        bankName: [
          {
            required: true,
            message: "请选择银行名称",
            trigger: "blur"
          }
        ],
        cardNum: [
          {
            required: true,
            message: "请输入银行卡号",
            trigger: "blur"
          }
        ],
        carHolder: [
          {
            required: true,
            message: "请输入持卡人姓名",
            trigger: "blur"
          }
        ],
        cardAttribution:[
          {
            required:true,
            message:'请输入银行归属地',
            trigger:'blur'
          }
        ]
      }
    };
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
    save() {
      this.$Tip.success({
        content:'修改银行卡成功',
        onOk:() => {
          this.$router.go(-1)
        }
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.cardData = this.$route.params.routeData.row;
      this.cardData.depositCard = '银行卡';
      this.cardData.founder = 'sdflas';
      this.cardData.bankName = '中国银行';
      this.cardData.currentStatus = this.$route.params.routeData.row.status ? 'yes' : 'no'
    });
  }
};
</script>
<style lang="less" scoped>
@import '../../styles/button.less';
/deep/.ivu-form-item-error-tip{
  left: 290px;
}
.cardLeft{
  margin-top: 10px;
  .ivu-form-item{
    &:nth-last-child(1){
      button{
        width: 275px;
        height: 34px;
      }
    }
  }
}
</style>


