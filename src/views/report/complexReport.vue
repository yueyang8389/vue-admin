<template>
  <div>
    <div class="v2-search" style="margin-bottom:20px"  >
      <Form ref="searchKey" inline   >
        <FormItem>
          <Button
            :class="searchKey.date == 'today' ? 'btn80 bd blue-font blue-bd' : 'btn80 bd bg-ea'"
            @click="() => {this.searchKey.date = 'today'}"
          >今天</Button>
        </FormItem>
        <FormItem>
          <Button
            :class="searchKey.date == 'yesterday' ? 'btn80 bd blue-font blue-bd' : 'btn80 bd bg-ea'"
            @click="() => {this.searchKey.date = 'yesterday'}"
          >昨天</Button>
        </FormItem>
        <FormItem>
          <Button
            :class="searchKey.date == 'currentMonth' ? 'btn80 bd blue-font blue-bd' : 'btn80 bd bg-ea'"
            @click="() => {this.searchKey.date = 'currentMonth'}"
          >本月</Button>
        </FormItem>
        <FormItem>
          <Button
            :class="searchKey.date == 'prevMonth' ? 'btn80 bg blue-font blue-bd' : 'btn80 bd bg-ea'"
            @click="() => {this.searchKey.date = 'prevMonth'}"
          >上月</Button>
        </FormItem>
        <FormItem label="开始日期">
          <DatePicker class="s-120" type="date" v-model="searchKey.Time[0]"></DatePicker>
        </FormItem>
        <FormItem label="结束日期">
          <DatePicker class="s-120" type="date" v-model="searchKey.Time[1]"></DatePicker>
        </FormItem>
        <FormItem label="时区">
          <Select v-model="searchKey.timeZone" class="s-120" clearable>
            <Option value="beijing">北京时间</Option>
            <Option value="meidong">美东时间</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Button type="primary" class="ivu-btn search">查询</Button>
        </FormItem>
        <FormItem class="fr">
          <span>计算公式</span>

          <Poptip
            trigger="hover"
            width="400"
            word-wrap
            content="
            平台盈利=存款金额-取款金额-优惠金额
            赢率=盈利/存款
            本月盈利=本月存款金额-本月取款金额-本月优惠金额
            本月赢率=本月盈利/本月存款金额
            本月损益=本月存款金额-本月取款金额
            本月毛利=本月损益/本月存款金额
            拒绝金额:存款和取款的总拒绝金额
            
            时区统计时间：
            北京时间：9：00am-次日9：00am
            美东时间：12：00am-次日12：00am"
            placement="bottom-end"
            class="ml5"
          >
            <Icons type="bangzhutishi" color="#E4E4E4" :size="26"/>
          </Poptip>
        </FormItem>
      </Form>
    </div>
    <div class="">
      <ul class="top clearfix f6f8-bg pt20 pb20 pl20 ">
        <li class="fl w25">
          <div class="circle bgOrange fl"></div>
          <div class="fl ml10">
            <span class="db">平台盈利</span>
            <span class="red-font db">{{headData.profit}}</span>
          </div>
        </li>
        <li class="fl w25">
          <div class="circle bgGreen fl"></div>
          <div class="fl ml10">
            <span class="db">平台赢率</span>
            <span class="db red-font">{{headData.profitRate}}</span>
          </div>
        </li>
        <li class="fl w25">
          <div class="circle bgBule fl"></div>
          <div class="fl ml10">
            <span class="db">有效投注</span>
            <span class="db red-font">{{headData.vaildBetAmount}}/{{headData.vaildBetCount}}人</span>
          </div>
        </li>
        <li class="fl w25">
          <div class="circle bgPurple fl"></div>
          <div class="fl ml10">
            <span class="db">会员输赢</span>
            <span class="db red-font">{{headData.memberWin}}</span>
          </div>
        </li>
      </ul>
      <div class="mt20 clearfix">
        <!-- 存款金额 -->
        <div class="fl w30 b">
          <div class="f6f8-bg bb">
            <span class="ib pt15 pb15 pl20">{{depositHead.depositTitle}}</span>
            <span class="ib blue-font pl20">{{depositHead.depositAmount}}/</span>
            <span class="red-font">{{depositHead.depositNumber}}人</span>
            <span class="blue-font">{{depositHead.depositCount}}笔</span>
          </div>
          <ul class="left-con">
            <li v-for="(t,i) in depositData" :key="i" class="pl30">
              <i class="dot"></i>
              <span class="ib pt15 pb15 pl20">{{t.title}}</span>
              <span class="ib blue-font pl20" v-if="t.amount">{{t.amount}}/</span>
              <span :class="t.amount ? 'red-font' : 'red-font pl20'">{{t.number}}人</span>
              <span class="blue-font">/{{t.count}}笔</span>
            </li>
          </ul>
          <div class="f6f8-bg bt">
            <span class="ib pt15 pb15 pl20">{{agencyHead.agencyTitle}}</span>
            <span class="ib blue-font pl20">{{agencyHead.agencyAmount}}/</span>
            <span class="red-font">{{agencyHead.agencyNumber}}人</span>
          </div>
        </div>
        <!-- 取款金额 -->
        <div class="fl w30 b ml20">
          <div class="f6f8-bg bb">
            <span class="ib pt15 pb15 pl20">{{withdrawalHead.withdrawalTitle}}</span>
            <span class="ib blue-font pl20">{{withdrawalHead.withdrawalAmount}}/</span>
            <span class="red-font">{{withdrawalHead.withdrawalNumber}}人</span>
            <span class="blue-font">{{withdrawalHead.withdrawalCount}}笔</span>
          </div>
          <ul class="middle-con">
            <li v-for="(t,i) in withdrawalData" :key="i" class="pl30">
              <i class="dot"></i>
              <span class="ib pt15 pb15 pl20">{{t.title}}</span>
              <span class="ib blue-font pl20">{{t.amount}}/</span>
              <span class="red-font">{{t.number}}人</span>
              <span class="blue-font">{{t.count}}笔</span>
            </li>
          </ul>
          <div class="f6f8-bg bt bb">
            <span class="ib pt15 pb15 pl20">{{preferentialHead.preferentialTitle}}</span>
            <span class="ib blue-font pl20">{{preferentialHead.preferentialAmount}}/</span>
            <span class="red-font">{{preferentialHead.preferentialNumber}}人</span>
          </div>
          <ul class="middle-con">
            <li v-for="(t,i) in preferentialData" :key="i" class="pl30">
              <i class="dot"></i>
              <span class="ib pt15 pb15 pl20">{{t.title}}</span>
              <span class="ib blue-font pl20">{{t.amount}}/</span>
              <span class="red-font">{{t.number}}人</span>
              <ul v-if="t.data" class="ml20">
                <li v-for="(t,i) in t.data" :key="i">
                  <i class="dot"></i>
                  <span class="ib pl15 pb15 pl20">{{t.title}}</span>
                  <span class="ib blue-font pl20">{{t.amount}}/</span>
                  <span class="red-font">{{t.number}}人</span>
                </li>
              </ul>
            </li>
          </ul>
          <div class="f6f8-bg bb bt">
            <span class="ib pt15 pb15 pl20">{{depositTime.title}}</span>
            <span class="ib blue-font pl20">{{depositTime.value}}</span>
          </div>
          <div class="bb">
            <span class="ib pt15 pb15 pl20">{{withdrawalTime.title}}</span>
            <span class="ib blue-font pl20">{{withdrawalTime.value}}</span>
          </div>
          <div class="f6f8-bg">
            <span class="ib pt15 pb15 pl20">{{rejectAmount.title}}</span>
            <span class="ib blue-font pl20">{{rejectAmount.amount}}/</span>
            <span class="red-font">{{rejectAmount.number}}人</span>
          </div>
          <div class="bt bb">
            <span class="ib pt15 pb15 pl20">{{onlineNumber.title}}</span>
            <span class="ib red-font pl20">{{onlineNumber.value}}人</span>
          </div>
          <div class="f6f8-bg">
            <span class="ib pt15 pb15 pl20">{{registerNumber.title}}</span>
            <span class="ib red-font pl20">{{registerNumber.value}}人</span>
          </div>
          <div class="bt">
            <span class="ib pt15 pb15 pl20">{{firstNumber.title}}</span>
            <span class="ib red-font pl20">{{firstNumber.value}}人</span>
          </div>
        </div>
        <div class="fl w30 b ml20">
          <ul class="right-con">
            <li v-for="(t,i) in rightData" :key="i" class="bb">
              <span class="ib pt15 pb15 pl20">{{t.title}}</span>
              <span class="ib blue-font pl20" v-if="!t.count">{{t.amount}}/
                <span class="red-font">{{t.number}}人</span>
              </span>
              <span v-else class="ib blue-font pl20">
                {{t.amount}}/
                <span class="red-font">{{t.number}}人/</span>
                {{t.count}}笔
              </span>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Tooltip } from "iview";
import Icons from "@/components/icons";
export default {
  name: "complexReport",
  components: { Icons },
  data() {
    return {
      searchKey: {
        Time: [],
        //查询的区间
        date: "today"
      },
      //头部数据
      headData: {
        profit: "100000000.00",
        profitRate: "7.5%",
        vaildBetAmount: "100000000.00",
        vaildBetCount: "102",
        memberWin: "100000000.00"
      },
      leftLength: 0,
      //左内容数据
      depositHead: {
        depositTitle:'存款金额',
        depositAmount: "100000000.00",
        depositNumber: "300",
        depositCount: "300"
      },
      depositData: [
        {
          title: "公司入款",
          amount: "100000000.00",
          number: "100",
          count: "100"
        },
        {
          title: "网银在线",
          amount: "100000000.00",
          number: "100",
          count: "100"
        },
        {
          title: "银联支付",
          amount: "100000000.00",
          number: "100",
          count: "100"
        },
        {
          title: "支付宝线上",
          amount: "100000000.00",
          number: "100",
          count: "100"
        },
        {
          title: "云闪付扫码",
          amount: "100000000.00",
          number: "100",
          count: "100"
        },
        {
          title: "微信线上",
          amount: "100000000.00",
          number: "100",
          count: "100"
        },
        {
          title: "QQ线上",
          amount: "100000000.00",
          number: "100",
          count: "100"
        },
        {
          title: "京东线上",
          amount: "100000000.00",
          number: "100",
          count: "100"
        },
        {
          title: "银联钱包",
          amount: "100000000.00",
          number: "100",
          count: "100"
        },
        {
          title: "人工存款",
          amount: "100000000.00",
          number: "100",
          count: "100"
        },
        {
          title: "在线支付笔数",
          number: "100",
          count: "1000000"
        },
        {
          title: "公司入款笔数",
          number: "100",
          count: "1000000"
        }
      ],
      agencyHead: {
        agencyTitle:'代理收入',
        agencyAmount: "100000000.00",
        agencyNumber: "300"
      },
      //中间数据
      withdrawalHead: {
        withdrawalTitle:'取款金额',
        withdrawalAmount: "100000000.00",
        withdrawalNumber: "100000000",
        withdrawalCount: "300"
      },
      withdrawalData: [
        {
          title: "线上取款",
          amount: "100000000.00",
          number: "100",
          count: "100"
        },
        {
          title: "人工取款",
          amount: "100000000.00",
          number: "100",
          count: "100"
        }
      ],
      preferentialHead: {
        preferentialTitle:'优惠金额',
        preferentialAmount: "100000000.00",
        preferentialNumber: "1000"
      },
      preferentialData: [
        {
          title: "活动派送",
          amount: "100000000.00",
          number: "1000"
        },
        {
          title: "返水派送",
          amount: "100000000.00",
          number: "1000"
        },
        {
          title: "人工派送",
          amount: "100000000.00",
          number: "1000",
          data: [
            {
              title: "活动",
              amount: "100000000.00",
              number: "100"
            },
            {
              title: "返水",
              amount: "100000000.00",
              number: "100"
            }
          ]
        }
      ],
      depositTime: {
        title:'入款时间',
        value:'0秒'
      },
      withdrawalTime: {
        title:'取款时间',
        value:'4分17秒'
      },
      rejectAmount: {
        amount: "0.00",
        number: "0",
        title:'拒绝金额'
      },
      onlineNumber:{
        title:'在线人数',
        value:'100000000'
      },
      registerNumber:{
        title:'注册人数',
        value:'100000000'
      },
      firstNumber:{
        title:'首存人数',
        value:'100000000'
      },
      //右边数据
      rightData: [
        {
          title: "注单数量",
          amount: "100000000.00",
          number: "100000000"
        },
        {
          title: "撤单金额",
          amount: "100000000.00",
          number: "100",
          count: "100"
        },
        {
          title: "会员余额",
          amount: "0.00",
          number: "0",
          count: "0"
        },
        {
          title: "本月盈利",
          amount: "100000000.00",
          number: "300"
        },
        {
          title: "本月赢率",
          amount: "100000000.00",
          number: "1000"
        },
        {
          title: "上月盈利",
          amount: "100000000.00",
          number: "1000"
        },
        {
          title: "上月赢率",
          amount: "100000000.00",
          number: "1000"
        },
        {
          title: "本月损益",
          amount: "100000000.00",
          number: "100"
        },
        {
          title: "本月毛率",
          amount: "100000000.00",
          number: "100"
        },
        {
          title: "上月损益",
          amount: "100000000.00",
          number: "100"
        },
        {
          title: "上月毛率",
          amount: "100000000.00",
          number: "100"
        }
      ]
    };
  }
};
</script>
<style lang="less" scoped>
.btn80 {
  width: 80px;
  height: 36px;
}
.circle {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.dot {
  display: inline-block;
  background-color: #62befd;
  width: 6px;
  height: 6px;
}
.left-con {
  li {
    &:nth-last-child(2) {
      border-top: 1px solid #ebebeb;
    }
  }
}
.right-con {
  li {
    &:nth-child(2n-1) {
      background: #f6f6f8;
    }
    &:nth-last-child(1) {
      border-bottom: none;
    }
  }
}
</style>


