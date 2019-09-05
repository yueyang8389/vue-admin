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
        返水信息
        <Icons
          v-show="!open"
          type="gengduoshouqi"
          size="15"
          color="#999"
        ></Icons>
        <Icons
          v-show="open"
          type="gengduo"
          size="15"
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
            v-for="(menu,i) in thirdMenu"
            :key="i"
            @click="onselectMenu(menu,i)"
          >{{menu}}</Button>
        </div>
        <div
          class="info pt10"
          v-for="(sub,i) in thirdSub"
          :key="i"
        >
          <div class="clearfix">
            <div
              v-for="(li,i) in sub.list"
              :key="i"
              class="clearfix w25 h60 fl"
            >
              <div class="label fl">{{li.name}}：</div>
              <div class="fl">
                <Input
                  v-model="li.refund"
                  style="width:60px;"
                ></Input>
                <span class="tip">上限：0.6</span>
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
      menuIndex: 0,
      showContent: "六合彩",
      thirdMenu: ["真人视讯", "电子游艺", "体育赛事", "彩票投注", "开元棋牌"],
      thirdSub: [
        {
          name: "真人视讯",
          list: [
            {
              name: "香港六合彩",
              refund: 0.6
            },
            {
              name: "快速六合彩",
              refund: 0.6
            },
            {
              name: "5分六合彩",
              refund: 0.6
            },
            {
              name: "香港六合彩",
              refund: 0.6
            },
            {
              name: "快速六合彩",
              refund: 0.6
            },
            {
              name: "5分六合彩",
              refund: 0.6
            },
            {
              name: "快速六合彩",
              refund: 0.6
            },
            {
              name: "5分六合彩",
              refund: 0.6
            }
          ]
        }
      ]
    };
  },
  methods: {
    onselectMenu(menu, i) {
      this.menuIndex = i;
      this.showContent = menu;
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
  margin-right: 5px;
}
.tip {
  font-size: 14px;
  color: #ed3f14;
  margin-left: 10px;
}
</style>


