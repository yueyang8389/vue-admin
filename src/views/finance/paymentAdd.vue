<template>
  <div class="">
    <Form ref="addPaymentInfo" :model="paymentInfo" :rules="paymentInfoRulesValidate">
    <FormItem label="支付平台" prop="platform">
      <Select clearable class="w340x" v-model="paymentInfo.platform" placeholder="请选择,可查询" filterable>
        <Option v-for="(item,index) in platformList" :key="index" value="item.key">{{item.value}}</Option>
      </Select>
    </FormItem>
    <FormItem label="平台编号" prop="platformNum">
      <Input
        class="w340x "
        v-model="paymentInfo.platformNum"
        :placeholder="paymentInfo.platform ? '10位数(支持微信支付)' : ''"
      />
    </FormItem>
    <FormItem label="支付公钥" v-if="paymentInfo.platform" prop="gongyao">
      <Upload action="//jsonplaceholder.typicode.com/posts/" v-model="paymentInfo.gongyao">
        <Button class="gongyao">选择文件</Button>
        <span class="yiyou">公钥2.txt</span>
      </Upload>
    </FormItem>
    <FormItem label="支付私钥" v-if="paymentInfo.platform" prop="siyao">
      <Upload action="//jsonplaceholder.typicode.com/posts/" v-model="paymentInfo.siyao" >
        <Button class="gongyao">选择文件</Button>
        <span class="yiyou">key.pem</span>
      </Upload>
    </FormItem>
    <FormItem label="支付密钥" prop="payPassword">
      <Input class="w340x" v-model="paymentInfo.payPassword"/>
    </FormItem>
    <FormItem label="支付方式" prop="payMethod">
      <paymentRadio class="w340x" :methodsList='methodList' @sendArray='getChecked'></paymentRadio>
    </FormItem>
    <FormItem
      label="银行编码"
      v-show="IDshow"
      prop="bankID"
    >
      <Input
        v-model="paymentInfo.bankID"
        value="paymentInfo.bankID"
        placeholder="请输入银行编码"
      />
    </FormItem>
    <FormItem label="支付域名" prop="domain">
      <Input
        class="w340x "
        :placeholder="paymentInfo.platform ? '例：123456.com' : '请输入域名'"
        v-model="paymentInfo.domain"
      />
    </FormItem>
    <FormItem label='有效时间' class="pl10">
      <InputNumber v-model="paymentInfo.effectTime" class="w340x " :step='1' :min='0'/>
    </FormItem>
    <FormItem label="支付状态" prop="payStatus">
      <Select clearable class="w340x " v-model="paymentInfo.payStatus" placeholder="请选择">
        <Option value="normal">正常</Option>
        <Option value="close">关闭</Option>
      </Select>
    </FormItem>
    <FormItem label="备注信息" class="pl10">
      <Input
        v-model="paymentInfo.remarks"
        type="textarea"
        placeholder="此栏位仅供管理者记录其他资讯，会员无法检视"
        style="width:340px;"
        :rows="4"
      />
    </FormItem>
    <FormItem>
      <Button class="ivu-btn save" style="margin-left:76px;width:340px;" @click="add">确认添加</Button>
    </FormItem>
  </Form>
  </div>
</template>
<script>
import paymentRadio from './components/payment-radio-group';
export default {
  name: "addPayment",
  components:{
    paymentRadio
  },
  data() {
    return {
      IDshow:false,
      platformList: [
        { key: "afu", value: "A付" },
        { key: "anquanfu", value: "安全付" },
        { key: "aqbao", value: "阿Q宝" },
        { key: "badafu", value: "八达付" },
        { key: "baifu", value: "佰富" },
        { key: "bbfu", value: "BB付" },
        { key: "shanfu", value: "禅付" },
        { key: "clfu", value: "cl支付" },
        { key: "dangdangfu", value: "当当付" },
        { key: "daqian", value: "大千" },
        { key: "daqiang", value: "大强" },
        { key: "kuaifu", value: "快富" },
        { key: "hefu", value: "和付" },
        { key: "jinyang", value: "金阳" },
        { key: "leyou", value: "乐游" },
        { key: "likefu", value: "立刻付" },
        { key: "meilian", value: "美联" },
        { key: "mingjiefu", value: "明捷付" },
        { key: "renxin", value: "仁信" },
        { key: "rongcaifu", value: "融财富" },
        { key: "sufu", value: "速付" },
        { key: "tianrui", value: "天瑞" },
        { key: "tiansheng", value: "天盛" },
        { key: "tiantianzhifu", value: "天天支付" },
        { key: "uuzhifu", value: "uu支付" },
        { key: "wanhuibao", value: "万汇宝" },
        { key: "wusanliu", value: "五三六" },
        { key: "xiaoqiang", value: "小强" },
        { key: "xinbaofu", value: "鑫宝付" },
        { key: "xinjincai", value: "新金彩" },
        { key: "xinkezhifu", value: "新科支付" },
        { key: "xinyu", value: "信誉" },
        { key: "yifulian", value: "易付联" },
        { key: "yihuika", value: "易汇卡" },
        { key: "yuanqi", value: "元启" },
        { key: "yunanfu", value: "云安付" },
        { key: "zhenhaofu", value: "真好付" },
        { key: "xiaomai", value: "小麦" },
        { key: "yuletong", value: "娱乐通" },
        { key: "xunbao", value: "讯宝" },
        { key: "jinqiangyu", value: "金枪鱼" },
        { key: "liying", value: "利盈" },
        { key: "xinhui", value: "信汇" },
        { key: "nuodekai", value: "诺德凯" },
        { key: "qiankuai", value: "钱快" },
        { key: "shengfu", value: "胜付" },
        { key: "longfa", value: "隆发" },
        { key: "yingke", value: "赢科" },
        { key: "yongfu", value: "永付" },
        { key: "wanmei", value: "完美" },
        { key: "youfu", value: "游付" },
        { key: "zhifutong", value: "支付通" },
        { key: "yunbao", value: "云宝" },
        { key: "chengxintong", value: "诚信通" },
        { key: "shuke", value: "数科" },
        { key: "jifutong", value: "即付通" },
        { key: "liulian", value: "榴莲" },
        { key: "shunjie", value: "顺捷" },
        { key: "dfyinlian", value: "DF银联" },
        { key: "xinyihuika", value: "新易汇卡" },
        { key: "zhangfuyun", value: "掌付云" },
        { key: "chengxinfu", value: "诚信付" },
        { key: "f86", value: "F86" },
        { key: "hengrun", value: "恒润" },
        { key: "ruizhifu", value: "锐支付" },
        { key: "zuiniu", value: "最牛" },
        { key: "youjiu", value: "游久" },
        { key: "aobang", value: "奥邦" },
        { key: "okzhifu", value: "OK支付" },
        { key: "yijie", value: "易捷" },
        { key: "jiefutong", value: "捷付通" },
        { key: "laike", value: "莱克" },
        { key: "shenhua", value: "神话" },
        { key: "shuaibi", value: "帅币" },
        { key: "songshu", value: "松鼠" },
        { key: "zhihuibao", value: "智慧宝" },
        { key: "gaotong", value: "高通" },
        { key: "sanjiajuhe", value: "叁加聚合" },
        { key: "yanxinzhifu", value: "延信支付" },
        { key: "suiyufu", value: "随意付" },
        { key: "quanwangtong", value: "全网通" },
        { key: "baiweifu", value: "百威付" },
        { key: "suifu", value: "随付" },
        { key: "yijifu", value: "一级付" },
        { key: "xiaoniuzhifu", value: "小牛支付" },
        { key: "xinfa", value: "鑫发" },
        { key: "longyuan", value: "龙源" },
        { key: "weizhifu", value: "微支付" },
        { key: "vipzhifu", value: "VIP支付" },
        { key: "tianshirpn", value: "天使RPN" },
        { key: "chunhezhifu", value: "春荷支付" },
        { key: "wngduan", value: "网端" },
        { key: "lefutong", value: "乐付通" },
        { key: "youmifu", value: "优米付" },
        { key: "tejiefu", value: "特捷付" },
        { key: "sheyuebao", value: "涉月宝" },
        { key: "xingyemiaofu", value: "兴业秒付" },
        { key: "youzhifu", value: "友支付" },
        { key: "jubao", value: "聚宝" },
        { key: "yinhao", value: "银号" },
        { key: "youtong", value: "优通" },
        { key: "yunshnafu", value: "云闪付" }
      ],
      paymentInfo: {
        platform: [],
        effectTime:20
      },
      methodList: [
        { value: "wangyinzaixian", name: "网银在线" },
        { value: "qqzhifuxianshang", name: "QQ支付线上" },
        { value: "yinlianqianbao", name: "银联钱包" },
        { value: "zhifubaoxianshang", name: "支付宝线上" },
        { value: "weixinxianshang", name: "微信线上" },
        { value: "jingdongxianshang", name: "京东线上" },
        { value: "yinlianzhifu", name: "银联支付" }
      ],
      paymentInfoRulesValidate: {
        platform: [
          {
            required: true,
            message: "请选择支付平台",
            trigger: "blur"
          }
        ],
        platformNum: [
          {
            required: true,
            message: "请输入平台编号",
            trigger: "blur"
          }
        ],
        gongyao: [
          {
            required: true,
            message: "请输入支付公钥",
            trigger: "blur"
          }
        ],
        siyao: [
          {
            required: true,
            message: "请输入支付私钥",
            trigger: "blur"
          }
        ],
        payPassword: [
          {
            required: true,
            message: "请输入支付密钥",
            trigger: "blur"
          }
        ],
        payMethod: [
          {
            required: true,
            message: "请选择支付方式",
            trigger: "blur"
          }
        ],
        bankID: [
          {
            required: true,
            message: "请输入银行编码",
            trigger: "blur"
          }
        ],
        domain: [
          {
            required: true,
            message: "请输入域名",
            trigger: "blur"
          }
        ],
        payStatus: [
          {
            required: true,
            message: "请选择支付状态",
            trigger: "blur"
          }
        ]
      }
    };
  },
  methods: {
    add() {
      this.$Tip.success({
        content: "添加支付平台成功",
        onOk: () => {
          this.$router.go(-1);
        }
      });
    },
    getChecked(data) {
      this.paymentInfo.payMethod = data;
      this.IDshow = this.paymentInfo.payMethod && this.paymentInfo.payMethod.includes('wangyinzaixian') ? true : false;
    }
  },
};
</script>
<style lang="less" scoped>
@import "../../styles/button.less";
.yiyou {
  width: 57px;
  height: 14px;
  font-size: 14px;
  font-weight: 400;
  color: #c7c7c7;
  padding-left: 20px;
}
.gongyao {
  width: 80px;
  height: 36px;
  background: #ffffff;  
  border: 1px solid #62b1fd;
  border-radius: 5px;
  font-size: 14px;
  font-weight: 400;
  color: #62b1fd;
  text-align: center;
}
/deep/.ivu-form-item-error-tip {
  left: 430px !important;
}

</style>


