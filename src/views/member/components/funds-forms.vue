<template>
  <div class="v2-form-wrapper">
    <Form
      ref="Form"
      :model="formKey"
      :rules="verifyRule"
      :label-width="80"
      style="width:450px;height: 609px"
    >
      <div class="btns clearfix" style="width:340px">
        <Button
          :type="formKey.role === '-'?'primary':'default'"
          class="fr reduce"
          icon="md-remove"
          @click="reduce"
        >减款</Button>
        <Button
          :type="formKey.role === '+'?'primary':'default'"
          class="fr add"
          icon="md-add"
          @click="add"
        >加款</Button>
      </div>
      <FormItem label="会员账号" class="mt10" prop="userName" required v-show="mode==='single'">
        <Input v-model="formKey.userName" :style="style" placeholder="请输入会员账号"/>
      </FormItem>
      <FormItem :label="formKey.role==='+'?'加款类型':'减款类型'" prop="genre" required>
        <Select ref="oprateTypesSelect" clearable :style="style" @on-change="typeChange">
          <Option
            v-show="formKey.role==='+'"
            v-for="(item,i) in oprateTypes.add"
            :key="i"
            :value="item.index"
          >
            <span>{{item.label}}</span>
            <span :style="{float: 'right', color: '#ccc'}">{{item.key}}</span>
          </Option>
          <Option
            v-show="formKey.role==='-'"
            v-for="(item,i) in oprateTypes.reduce"
            :key="i+6"
            :value="item.index"
          >
            <span>{{item.label}}</span>
            <span :style="{float: 'right', color: '#ccc'}">{{item.key}}</span>
          </Option>
        </Select>
      </FormItem>
      <FormItem label="打码倍数" prop="multiple" v-show="formKey.role === '+'" required>
        <input-number :min="0" :step="1" v-model="formKey.multiple" :style="style"/>
      </FormItem>
      <FormItem label="金额" prop="userMoney">
        <Input
          v-show="mode==='single'"
          v-model="formKey.userMoney"
          :style="style"
          :placeholder="formKey.role==='+'?'请输入加款金额':'请输入减款金额'"
        />
        <Input
          v-show="mode==='batch'"
          v-model="formKey.userMoney"
          @on-change="testUserNum"
          :rows="5"
          type="textarea"
          :style="style"
          placeholder="*格式为*:账号,金额 例如:a123,100 注意逗号为英文格式,一行一个,最多操作10000个用户"
        />
      </FormItem>
      <FormItem label="备注信息" prop="remarks">
        <Input
          v-model="formKey.remarks"
          :style="style"
          :rows="5"
          type="textarea"
          placeholder="此栏位仅供管理者记录其他资讯，会员无法检视"
        />
      </FormItem>
      <FormItem>
        <Button
          type="primary"
          class="submit"
          @click="submit('batch')"
        >{{formKey.role === '+'?'确定加款':'确定减款'}}</Button>
      </FormItem>
    </Form>
  </div>
</template>
<script>
import SiteSelect from "_c/site-select";
export default {
  components: { SiteSelect },
  props: {
    verifyRule: {
      type: Object
    },
    oprateTypes: {
      type: Object
    }
  },
  data() {
    return {
      mode: "single",
      style: {
        width: "260px"
      },
      formKey: {
        role: "+"
      },
      type: "primary"
    };
  },
  methods: {
    typeChange(index) {
      let key;
      if (this.formKey.role === "+") {
        key = "add";
      } else {
        key = "reduce";
      }
      const { type, subType } = this.oprateTypes[key][index];
      this.formKey.type = type;
      this.formKey.subType = type;
    },
    testUserNum(e) {
      let arr = e.target.value.split(",");
      if (arr.length > 10000) {
        this.$Tip.info({
          content: "用户量太大，最多可操作一万个用户，请分批操作！"
        });
      }
    },
    reset() {
      for (let key in this.formKey) {
        this.formKey[key] = "";
      }
    },
    submit() {
      this.$emit("on-submit", this.formKey);
    },
    reduce() {
      this.formKey.role = "-";
    },
    add() {
      this.formKey.role = "+";
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../styles/button.less";
.btns {
  padding-bottom: 20px;
}
.v2-form-wrapper {
  height: 521px;
}
</style>


