<template>
  <div class="ib">
    <Select class="className" placeholder="请选择" multiple v-model="checkedArray" @on-change="sendCheckedArray">
      <Option v-for="(t,i) in methodsList" :key="i" :value="t.value">{{t.name}}</Option>
    </Select>
    <div class="mt20">
      <div
        class="mlf70 h50 w500"
        v-for="(t,i) in methodsList"
        :key="i"
        v-if="checkedArray && checkedArray.includes(t.value)"
      >
        <label class="ml5" style="height:37.8px">{{t.name}}：</label>
        <RadioGroup v-model="modelData[i]">
          <Radio label="limit" class="mr20">
            <span>限额</span>
          </Radio>
          <Radio label="format">
            <span>固定金额</span>
          </Radio>
        </RadioGroup>
        <div class="sx fr" v-show="modelData[i] == 'limit'">
          <Input placeholder="单笔下限" class="w110x"/>
          <span class="pl10 pr10">-</span>
          <Input placeholder="单笔上限" class="w110x"/>
        </div>
        <div class="fr" v-show="modelData[i] == 'format'">
          <Input placeholder="固定金额" class="w245x"/>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    methodsList: Array, //所有支付方式集合
    className: String, //样式
    defaultChecked:String //默认选中的支付方式
  },
  data() {
    return {
      modelData: [],
      checkedArray: []
    };
  },
  created() {
    this.$nextTick(() => {
      this.methodsList.map(item => {
        this.modelData.push("limit");
      });
      if(this.defaultChecked){
        this.checkedArray.push(this.defaultChecked)
      }
    });
  },
  methods:{
    sendCheckedArray(value) {
      this.$emit('sendArray',this.checkedArray)
    }
  }
};
</script>
<style lang="less" scoped >
.w110x {
  width: 110px;
}

.w245x {
  width: 245px;
}
.mlf70 {
  margin-left: -70px;
}

.h50 {
  height: 50px;
}
.w500 {
  width: 500px;
}
</style>


