<template>
    <Modals ref="PaymentModifyModal" :title="modalTitle" :width="900" >
        <div slot="content">
            <Tabs type="card" value="pc">
                <TabPane label="电脑端" name="pc">
                    <div class="modal-overflow" >
                        <ul style="margin-bottom:50px">
                            <li style="list-style:none;padding:15px 0;" v-for="k in [0,1,2,3,4]" :key="k">
                                <label style="display:inline-block;width:110px;text-align:right">网银在线：</label>
                                <Select clearable v-for="k in [0,1,2,3,4]" :key="k" :style="{width:'120px',marginRight:'20px'}" :placeholder="'选择通道' + (k===0 ? '一' :k===1 ? '二' : k===2? '三' :k===3 ? '四' : '五')">
                                    <Option value="1">阿Q宝</Option>
                                    <Option value="2">元气</Option>
                                    <Option value="3">信誉</Option>
                                </Select>
                            </li>
                            <Form>
                            <Button  class="ivu-btn submit btw260 ft20 gd" style="margin-left:306px;margin-top:15px;" @click="save" type="primary">提交保存</Button>
                            </Form>
                        </ul>
      
                    </div>
                </TabPane>
                <TabPane label="手机端" name="mobile">
                    <div class="modal-overflow">
                        <ul style="margin-bottom:50px">
                            <li style="list-style:none;padding:15px 0;" v-for="k in [0,1,2,3,4] " :key="k">
                                <label style="display:inline-block;width:110px;text-align:right">网银在线：</label>
                                <Select  clearable v-for="k in [0,1,2,3,4]" :key="k" :style="{width:'120px',marginRight:'20px'}" :placeholder="'选择通道' + (k===0 ? '一' :k===1 ? '二' : k===2? '三' :k===3 ? '四' : '五')">
                                    <Option value="1">阿Q宝</Option>
                                    <Option value="2">元气</Option>
                                    <Option value="3">信誉</Option>
                                </Select>   
                            </li>
                            <Form>
                            <Button  class="ivu-btn submit btw260 ft20 gd" style="margin-left:306px;margin-top:15px;" @click="save" type="primary">提交保存</Button>
                            </Form>
                        </ul>

                    </div>
                </TabPane>
            </Tabs>
        </div>
    </Modals>
</template>
<script>
import Modals from "@/components/modals";
export default {
  components: { Modals },
  data() {
    return {
      modalTitle: "支付设置"
    };
  },
  methods: {
    show() {
      this.$refs.PaymentModifyModal.show();
    },
    save(){
      this.$refs.PaymentModifyModal.hide();
      this.$Tip.success({
          content:'支付设置成功',
          onOk:() => {}
      })
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../styles/tabs.less";

</style>


