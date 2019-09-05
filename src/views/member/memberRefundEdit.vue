<template>
  <div class="v2-edit">
    <div class="items bb">
      <div class="title">基础设置</div>
      <div class="section backWater">
        <Form   v-model="memberEditing" :rules="memberEditingValidateRules">
          <FormItem class=" ti10" label="等级名称" prop="level">
            <Select class="w320x ml10" v-model="memberInfo.level">
              <Option v-for="(t,i) in selectList" :key="i" :value="t.value">{{t.name}}</Option>
            </Select>
          </FormItem>
          <FormItem class="ti10" label="等级别称" prop="levelAlias">
            <Input class="w320x" placeholder="等级别称" v-model="memberInfo.levelAlias"/>
          </FormItem>
          <FormItem class="ti10" label="最低下注" prop="minBet">
            <Input class="w320x" placeholder="最低下注" v-model="memberInfo.minBet"/>
          </FormItem>
          <FormItem class="ti10" label="最大返水" prop="maxBonus">
            <Input class="w320x" placeholder="最大返水" v-model="memberInfo.maxBonus"/>
          </FormItem>
          <FormItem class="ti10 ml20" label="备注信息">
            <Input class="w320x" type="textarea" :rows='4' placeholder="此栏位仅供管理者记录其他资讯，会员无法检视" v-model="memberInfo.remarks"/>
          </FormItem>
          <FormItem class="w25 ti10">
              <div  style="padding-left:100px">
                <!-- <Icons
                  v-if="defaultColor"
                  type="chenggongtishi"
                  color="#E4E4E4"
                  class="pl10"
                  :size="20"
                  @click="defaultColor=false"
                />
                <Icons
                  v-else
                  type="chenggongtishi"
                  class="pl10"
                  color="#57A3F3"
                  :size="20"
                  @click="defaultColor=true"
                />
                <span class="ml5">设为默认？</span> -->
                 <Icon type="md-checkmark-circle" size='16' v-if="defaultColor"   @click="defaultColor=false" color="#E4E4E4" class="pr5"/>
                <Icon type="md-checkmark-circle"  size='16' color='#57a3f3' v-else @click="defaultColor=true"  style="margin-top:2px" class="pr5"/>
               <span class="ml5">设为默认？</span> 
              </div>
            
          </FormItem>
        </Form>
      </div>
    </div>
    <div class="items mt15 bb">
      <div class="section">
        <RefundSelect></RefundSelect>
      </div>
    </div>
    <div class="items mt15">
      <div class="flex-row p10">
        <div class="w40 flex-row">
          <Button type="primary" class="more-btn " @click="submit">确认提交</Button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Icons from "@/components/icons";
import RefundSelect from "@/components/refund-select";
// import LevelSelect from "@/components/level-select";
export default {
  components: { Icons, RefundSelect },
  props: {
    memberEditing: Object
  },
  data() {
    return {
      defaultColor: true,
      selectList: [
        { value: "floor1", name: "第1层" },
        { value: "floor2", name: "第2层" },
        { value: "floor3", name: "第3层" },
        { value: "floor4", name: "第4层" },
        { value: "floor5", name: "第5层" },
        { value: "floor6", name: "第6层" }
      ],
      memberInfo: {},
      memberEditingValidateRules: {
        level: [
          {
            required: true,
            message: "请选择等级名称",
            trigger: "blur"
          }
        ],
        levelAlias: [
          {
            required: true,
            message: "请输入返水等级别称",
            trigger: "blur"
          }
        ],
        minBet: [
          {
            required: true,
            message: "请输入正确的最低下注金额",
            trigger: "blur"
          }
        ],
        maxBonus: [
          {
            required: true,
            message: "请输入正确最大返水金额限制",
            trigger: "blur"
          }
        ]
      }
    };
  },
  created() {
    this.$nextTick(() => {
      if(this.$route.params.memberInfo){
        this.memberInfo = this.$route.params.memberInfo;
      }
      // let currentSite = JSON.parse(localStorage.currentSite);
      // this.$refs.LevelSelect.getSiteLevel(currentSite);
    });
  },
  methods: {
    submit() {
      if (this.memberInfo) {
        this.$Tip.success({
          content: "会员返水信息修改成功",
          onOk: () => {
            this.$router.go(-1);
          }
        });
      } else {
        this.$Tip.success({
          content: "会员返水信息添加成功",
          onOk: () => {
            this.$router.go(-1);
          }
        });
      }
    }
  },
  beforeRouteEnter(to,from,next) {
    next(vm => {
      vm.$route.meta.title = vm.$route.params.type ? '添加返水等级' : '编辑返水等级';
    })
  }
};
</script>
<style lang="less" scoped>
@import "../../styles/button.less";
/deep/.ivu-collapse > .ivu-collapse-item > .ivu-collapse-header {
  padding-left: 0;
}
/deep/.ivu-collapse-content {
  padding: 0;
}
.ivu-collapse-content > .ivu-collapse-content-box {
  padding: 0;
}
.ivu-collapse {
  border: none;
}
.info {
  justify-content: flex-start;
}

/deep/.ivu-form-item-error-tip{
  left: 340px!important;
  width: 200px;
}

/deep/.ivu-form-item-content .ivu-form-item-error-tip {
 top:0  
}
/deep/.ivu-form-item-content {
   line-height: 0;
}
</style>
