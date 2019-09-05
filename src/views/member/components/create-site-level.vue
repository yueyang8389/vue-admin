<template>
  <Modals ref="siteLevelModal" :title="title" :width="760">
    <div slot="content" class="modal-overflow">
      <div class="v2-form-wrapper">
        <Form
          ref="memberLevelForm"
          :model="memberLevelForm"
          :rules="memberLevelRuleValidate"
          :label-width="260"
          style="width:760px;"
        >
          <FormItem label="选择等级" prop="level">
            <Select v-model="memberLevelForm.level" placeholder="请选择" style="width:260px;">
              <Option value="vip1">vip1</Option>
              <Option value="vip2">vip2</Option>
              <Option value="vip3">vip3</Option>
            </Select>
          </FormItem>
          <FormItem label="等级别称" prop="a">
            <Input v-model="memberLevelForm.a" placeholder="请输入等级别称" style="width:260px;" />
          </FormItem>
          
          <FormItem label="最小存款" prop="c">
            <Input v-model="memberLevelForm.c" placeholder="请输入最小存款" style="width:260px;" />
          </FormItem>
          <FormItem label="打码倍数" prop="d">
            <Input v-model="memberLevelForm.d" placeholder="最小存款打码倍数，整数，建议0-30" style="width:260px;" />
          </FormItem>
          <FormItem label="最大单笔" prop="b">
            <Input v-model="memberLevelForm.b" placeholder="请输最大单笔" style="width:260px;" />
          </FormItem>
          <FormItem label="取款打码倍数" prop="e">
            <Input v-model="memberLevelForm.e" placeholder="整数" style="width:260px;" />
          </FormItem>
          <FormItem label="彩金奖励" prop="f">
            <Input v-model="memberLevelForm.f" placeholder="请输入彩金奖励" style="width:260px;" />
          </FormItem>
          <FormItem label="等级状态" prop="g" class="ivu-form-item">
            <Select v-model="memberLevelForm.g" placeholder="请选择" style="width:260px;">
              <Option value="vip1">正常</Option>
              <Option value="vip2">停用</Option>
            </Select>
          </FormItem>
          <FormItem label="备注信息">
            <Input
              v-model="memberLevelForm.h"
              type="textarea"
              placeholder="此栏位仅供管理者记录其他资讯，会员无法检视"
              style="width:260px;height:80px"
              :rows='4'
             />
          </FormItem>
          <FormItem class="clearfix h20"   >
            <div class="fl">
            <!-- <Icons
              v-if="defaultColor"
              type="chenggongtishi"
              color="#E4E4E4"
              :size="20"
              @click="defaultColor=false"
            /> -->
            <!-- <Icons
              v-else
              type="chenggongtishi"
              color="#57A3F3"
              :size="20"
              @click="defaultColor=true"
            /> -->
            <Icon type="md-checkmark-circle" size='16' v-if="defaultColor"   @click="defaultColor=false" color="#E4E4E4" class="pr5"/>
            <Icon type="md-checkmark-circle"  size='16' color='#57a3f3' v-else @click="defaultColor=true"  style="margin-top:2px" class="pr5"/>
            </div>
            <span class="fl ib">设为默认？</span>
          </FormItem>
          <FormItem >
             <Button class="submit" type="primary" @click="save">确认添加</Button>
          </FormItem>
        </Form>
      </div>
     
    </div>
  </Modals>
</template>
<script>
import Icons from "@/components/icons";
import Modals from "@/components/modals";
export default {
  components: { Modals, Icons },
  props: {
    title: String,
    memberLevelForm: Object
  },
  data() {
    return {
      // memberLevelForm: {},
      defaultColor: true,
      PaymentModifyModalShow: false,
      memberLevelRuleValidate: {
        level: [
          {
            required: true,
            message: "请选择会员等级",
            trigger: "change"
          }
        ],
        a: [
          {
            required: true,
            message: "请输入正确的等级别称",
            trigger: "blur"
          }
        ],
        b: [
          {
            required: true,
            message: "请输入正确的最大单笔",
            trigger: "blur"
          }
        ],
        c: [
          {
            required: true,
            message: "请输入正确的最小存款",
            trigger: "blur"
          }
        ],
        d: [
          {
            required: true,
            message: "请输入正确的打码倍数",
            trigger: "blur"
          }
        ],
        e: [
          {
            required: true,
            message: "请输入正确的取款打码倍数",
            trigger: "blur"
          }
        ],
        f: [
          {
            required: true,
            message: "请输入正确的彩金奖励",
            trigger: "blur"
          }
        ],
        g: [
          {
            required: true,
            message: "请选择等级状态",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    show() {
      this.$refs.siteLevelModal.show();
    },
    save() {
      switch (this.title) {
        case "编辑等级":
          this.$refs.siteLevelModal.hide();
          this.$Tip.success({
            content: "编辑会员信息成功",
            onOk: () => {}
          });
          break;
        case "添加会员等级":
          this.$refs.siteLevelModal.hide();
          this.$Tip.success({
            content: "添加会员等级成功",
            onOk: () => {}
          });
          break;
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../styles/button.less";
.icon-chenggongtishi {
  vertical-align: middle;
  margin-right: 10px;
}
</style>

