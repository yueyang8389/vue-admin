<template>
  <collapse
    simple
    value="1"
  >
    <panel
      name="1"
      :hide-arrow="true"
    >
      <div
        class="title"
        @click="open=!open"
      >
        返点设置
        <Icons
          v-show="!open"
          type="gengduoshouqi"
          size="15"
          color="#999"
        ></Icons>
        <Icons
          v-show="open"
          type="gengduo"
          size="18"
          color="#999"
        ></Icons>
      </div>
      <div
        class="section p15"
        slot="content"
      >
        <div class="btns">
          <Button
            class="lottery mr20"
            v-for="(menu,i) in lottMenu"
            :key="i"
            @click="onselectLott(menu,i)"
          >{{menu}}</Button>
        </div>
        <div
          class="info pt10"
          v-for="(sub,sub_i) in lottSub"
          :key="sub_i"
        >
          <div class="clearfix">
            <div class="fl clearfix h60">
              <div class="label fl">统一设置：</div>
              <Select
                style="width:100px"
                v-model="sub.batchRebate"
                @on-change="batchSetRebate(sub.batchRebate,sub_i)"
                class="fl"
                placeholder="请选择"
              >
                <Option
                  v-for="(opt,index) in defaultOptions"
                  :key="index"
                  :value="opt"
                >{{opt}}%</Option>
              </Select>
            </div>
            <div class="fl ml20 clearfix h60">
              <div class="label fl">批量设置：</div>
              <div class="fl">
                <Button
                  icon="ios-remove"
                  @click="reduceRebate(sub_i)"
                  size="small"
                ></Button>
                <Button

                  icon="ios-add"
                  class="ml20"
                  @click="addRebate(sub_i)"
                  size="small"
                ></Button>
              </div>
            </div>
          </div>
          <div class="clearfix">
            <div
              v-for="(li,i) in sub.list"
              :key="i"
              class="clearfix w25 h60 fl"
            >
              <div class="label fl">{{li.name}}：</div>
              <div class="fl">
                <Select
                  v-model="li.rebate"
                  placeholder="请选择"
                  style="width:120px;"
                  @on-change="selectSingleRabate"
                >
                  <Option
                    v-for="(opt,i) in li.options"
                    :key="i"
                    :value="opt"
                  >{{opt}}%</Option>
                </Select>
                <span class="tip">上限：{{li.maxRebate||"3.0"}}%</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </panel>
  </collapse>
</template>
<script>
import Icons from "../icons";
export default {
  components: { Icons },
  data() {
    return {
      open: false,
      lottIndex: 0,
      showContent: "六合彩",
      lottMenu: [
        "六合彩",
        "PK10",
        "时时彩",
        "快乐十分",
        "11选5",
        "快3",
        "PC蛋蛋",
        "低频彩"
      ],
      lottSub: [
        {
          name: "六合彩",
          list: [
            {
              name: "香港六合彩",
              options: ["0.0", "0.1", "0.2", "0.3", "0.4", "0.5", "0.6"]
            },
            {
              name: "快速六合彩",
              options: ["0.0", "0.1", "0.2", "0.3", "0.4", "0.5", "0.6"]
            },
            {
              name: "5分六合彩",
              options: ["0.0", "0.1", "0.2", "0.3", "0.4", "0.5", "0.6"]
            },
            {
              name: "香港六合彩",
              options: ["0.0", "0.1", "0.2", "0.3", "0.4", "0.5", "0.6"]
            },
            {
              name: "快速六合彩",
              options: ["0.0", "0.1", "0.2", "0.3", "0.4", "0.5", "0.6"]
            },
            {
              name: "5分六合彩",
              options: ["0.0", "0.1", "0.2", "0.3", "0.4", "0.5", "0.6"]
            },
            {
              name: "快速六合彩",
              options: ["0.0", "0.1", "0.2", "0.3", "0.4", "0.5", "0.6"]
            },
            {
              name: "5分六合彩",
              options: ["0.0", "0.1", "0.2", "0.3", "0.4", "0.5", "0.6"]
            }
          ]
        }
      ]
    };
  },
  computed: {
    defaultOptions() {
      let array = [];
      for (let i = 0; i < 3; i++) {
        for (let j = 0; j <= 10; j++) {
          let step = j * 0.1;
          array.push((i + step).toFixed(1));
        }
      }
      return array;
    }
  },
  methods: {
    batchSetRebate(batchRebate, index) {
      this.lottSub[index].list.forEach(child => {
        let re = +batchRebate;
        this.$set(child, "rebate", re.toFixed(1));
      });
      this.createData();
    },
    selectSingleRabate() {
      this.createData();
    },
    onselectLott(lott, i) {
      this.lottIndex = i;
      this.showContent = lott;
    },
    reduceRebate(index) {
      this.lottSub[index].list.forEach(child => {
        let re = +child.rebate - 0.1;
        re = re <= 0 ? 0 : re;
        this.$set(child, "rebate", re.toFixed(1));
      });
      this.createData();
    },
    addRebate(index) {
      // 超出上级返点显示自己的返点
      this.lottSub[index].list.forEach(child => {
        let re = +child.rebate + 0.1;
        re = re >= +child.maxRebate ? +child.maxRebate : re;
        this.$set(child, "rebate", re.toFixed(1));
      });
      this.createData();
    },
    createOptions(max) {
      let arr = [];
      for (let i = 0; i < max; i++) {
        for (let j = 0; j <= 10; j++) {
          let step = j * 0.1;
          if (i + step <= max) {
            arr.push((i + step).toFixed(1));
          }
        }
      }
      return arr;
    },
    createData() {
      // 数据组装，提交事件 "{"1":"0.9","2":"0.8"}"
      let data = {};
      this.lottSub.forEach(parent => {
        parent.list.forEach(child => {
          data[child.id] = child.rebate;
        });
      });
      this.$emit("on-rebate-change", data);
    }
  }
};
</script>
<style lang="less" scoped>
.h60 {
  height: 60px;
  line-height: 60px;
  display: flex;
  align-items: center;
}
.label {
  width: 108px;
  padding-right: 10px;
  text-align: right;
  font-size: 14px;

}
.tip {
 font-size: 14px;
  color: #ed3f14;
  margin-left: 10px;
}
</style>


