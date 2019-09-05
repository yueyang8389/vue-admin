<template>
  <div>
    <div class="v2-search">
      <Form ref="searchKey" inline>
        <FormItem label="状态">
          <Select clearable v-model="searchKey.status" class="s-86">
            <Option value="1">创建</Option>
            <Option value="2">更新</Option>
            <Option value="3">删除</Option>
          </Select>
        </FormItem>
        <FormItem label='银行卡号'>
          <Input v-model="searchKey.cardID" class="s-140" placeholder="请输入银行卡号"/>
        </FormItem>
        <FormItem>
          <Checkbox>
            <span class="pl5">模糊</span>
          </Checkbox>
        </FormItem>
        <FormItem label="会员账号">
          <Select v-model="searchKey.like" class="s-100" clearable>
            <Option value="userName">会员账号</Option>
            <Option value="phone">手机</Option>
            <Option value="email">Email</Option>
            <Option value="wechat">微信号</Option>
          </Select>
        </FormItem>
        <FormItem>
          <Input placeholder="账号/姓名/上级代理" class="s-140"/>
        </FormItem>
        <FormItem>
           <Poptip trigger="hover" 
            content="多个请以,逗号隔开,仅支持同类型多个输入" 
            class="ml14f"
            placement="bottom-end">
            <Icons type="bangzhutishi" color="#E4E4E4" :size="26"/>
          </Poptip>
        </FormItem>
        <FormItem>
          <Button type="primary" class="search" @click="searchSubmit">查询</Button>
        </FormItem>
      </Form>
    </div>
    <div class="v2-table">
      <Tables
        :columns="table.columns"
        :loading="table.loading"
        :value="table.data"
        :total="table.total"
        @on-change-status="statusChange"
        @on-page-change="onPageChange"
        @on-page-size-change="onPageSizeChange"
        @on-edit="onEdit"
        @on-details="onDetails"
        @on-sort-change='sortChange'
      ></Tables>
    </div>
      <!-- 编辑银行卡 -->
    <Modals ref="editCard" title="编辑银行卡" :width="760">
      <div slot="content">
        <Form
          ref="editCardInfo"
          :model="editCardInfo"
          :rules="editCardInfoRulesValidate"
          :label-width="260"
        >
          <FormItem label="会员账号">
            <Input v-model="editCardInfo.account" class="w260x" disabled/>
          </FormItem>
          <FormItem label="会员姓名">
            <Input v-model="editCardInfo.realName" class="w260x" disabled/>
          </FormItem>
          <FormItem label="银行名称" prop="bankName">
            <Select class="w260x" v-model="editCardInfo.bankName">
              <Option v-for="(t,i) in bankList" :key="i" :value="t.value">{{t.name}}</Option>
            </Select>
          </FormItem>
          <FormItem label="银行卡号" prop="bankNum">
            <Input v-model="editCardInfo.bankNum" class="w260x"/>
          </FormItem>
          <FormItem label="银行归属地" prop="adress">
            <Input v-model="editCardInfo.adress" class="w260x"/>
          </FormItem>
          <FormItem label="状态">
            <Select class="w260x" v-model="editCardInfo.editStatus">
              <Option value="yes">正常</Option>
              <Option value="no">停用</Option>
            </Select>
          </FormItem>
          <FormItem label="设为默认" class="h30"  >
            <RadioGroup v-model="editCardInfo.editDefault">
              <Radio label="yes">是</Radio>
              <Radio label="no" class="ml10">否</Radio>
            </RadioGroup>
          </FormItem>
          <FormItem>
            <Button type="primary" class="ivu-btn submit" @click="save">确认保存</Button>
          </FormItem>
        </Form>
      </div>
    </Modals>
    <Modals ref="cardDetail" title="银行卡详情" :width="560">
      <div slot="content">
        <Form ref="cardDetail" :label-width="240">
          <FormItem label="会员ID：">
            <p class="w260x ti20">{{cardDetail.memberID}}</p>
          </FormItem>
          <FormItem label="会员账号：">
            <p class="w260x ti20">{{cardDetail.account}}</p>
          </FormItem>
          <FormItem label="会员姓名：">
            <p class="w260x ti20">{{cardDetail.realName}}</p>
          </FormItem>
          <FormItem label="银行名称：">
            <p class="w260x ti20">{{cardDetail.bankName}}</p>
          </FormItem>
          <FormItem label="银行卡号：">
            <p class="w260x ti20">{{cardDetail.bankNum}}</p>
          </FormItem>
          <FormItem label="银行归属地：">
            <p class="w260x ti20">{{cardDetail.adress}}</p>
          </FormItem>
          <FormItem label="默认银行：">
            <p class="w260x ti20">{{cardDetail.default ? '是' : '否'}}</p>
          </FormItem>
          <FormItem label="银行卡状态：">
            <p class="w260x ti20">{{cardDetail.status ? '启用' : '停用'}}</p>
          </FormItem>
          <FormItem label="创建时间：">
            <p class="w260x ti20">{{cardDetail.createTime}}</p>
          </FormItem>
          <FormItem label="更新时间：">
            <p class="w260x ti20">{{cardDetail.updateTime}}</p>
          </FormItem>
        </Form>
      </div>
    </Modals>
  </div>
</template>
<script>
import Tables from "@/components/tables";
import Modals from "@/components/modals";
import Icons from "@/components/icons";
import { getMemberBank } from "@/api/data";
import {sortInteraction} from '@/libs/util';
export default {
  name: "memberBank",
  components: { Tables, Icons, Modals },
  data() {
    return {
      Time: [],
      searchKey: {},
      editCardInfo: {},
      cardDetail: {},
      editCardInfoRulesValidate: {
        bankName: [
          {
            required: true,
            message: "请选择银行名称",
            trigger: "change"
          }
        ],
        bankNum: [
          {
            required: true,
            message: "请输入银行卡号",
            trigger: "blur"
          }
        ],
        adress: [
          {
            required: true,
            message: "请输入银行归属地",
            trigger: "blur"
          }
        ]
      },
      bankList: [
        { value: "baoshang", name: "包商银行" },
        { value: "beijing", name: "北京银行" },
        { value: "gongshang", name: "工商银行" }
      ],
      table: {
        loading: true,
        total: 100,
        columns: [
          {
            title: "会员账号",
            key: "account",
            align: "center",
            sortable: true
          },
          {
            title: "姓名",
            key: "realName",
            align: "center",
            sortable: true
          },
          {
            title: "银行名称",
            key: "bankName",
            align: "center",
            sortable: true
          },
          {
            title: "卡号",
            key: "bankNum",
            align: "center",
            sortable: true
          },
          {
            title: "归属地",
            key: "ip",
            align: "center",
            sortable: true
          },
          {
            title: "默认银行",
            key: "default",
            align: "center",
            sortable: true,
            render: (h, params) => {
              return <span>{params.row.default ? "是" : "否"}</span>;
            }
          },
          {
            title: "状态",
            key: "status",
            align: "center",
            render: (h, params) => {
              let color = params.row.status ? "#515a6e" : "#FF2626";
              return (
                <span style={{ color: color }}>
                  {params.row.status ? "正常" : "停用"}
                </span>
              );
            }
          },
          {
            title: "操作",
            key: "handle",
            align: "center",
            options: ["details", "edit", "status"]
          }
        ],
        data: []
      }
    };
  },
  created() {
    this.$nextTick(() => {
      this.getData();
    });
  },
  methods: {
    getData(query) {
      getMemberBank().then(res => {
        this.table.loading = true;
        setTimeout(() => {
          this.table.data = res.data;
          this.table.loading = false;
        }, 2000);
      });
    },
    onPageChange(page) {
      let query = {
        page: page
      };
      this.getData(query);
    },
    searchSubmit() {},
    onPageSizeChange(count) {
      alert(count);
    },
    statusChange(params) {
      let text = params.row.status
        ? "您确定停用该银行卡吗？"
        : "您确定启用该银行卡吗？";
      let txt = params.row.status ? "停用成功" : "启用成功";
      this.$Tip.confirm({
        content: text,
        onOk: () => {
          this.$Tip.success({
            content: txt,
            onOk: () => {}
          });
        }
      });
    },
    onEdit(params) {
      this.editCardInfo = params.row;
      this.editCardInfo.editStatus = this.editCardInfo.status ? "yes" : "no";
      this.editCardInfo.editDefault = this.editCardInfo.default ? "yes" : "no";
      this.$refs.editCard.show();
    },
    save() {
      this.$refs.editCard.hide();
      this.$Tip.success({
        content: "修改银行卡成功",
        onOk: () => {}
      });
    },
    onDetails(params) {
      this.$refs.cardDetail.show();
      this.cardDetail = params.row;
    },
    sortChange(obj){
      sortInteraction(obj)
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../styles/button.less";
.ivu-form-item{
  &:nth-child(2){
    margin-right: -5px;
  }
  &:nth-child(6){
    margin-top: 1px!important;
  }
}


/deep/.ivu-form-item-content{  
  line-height: height 30px !important;
}


// 修改了设为默认一行
/deep/.ivu-form-item{
  .ivu-form-item-label{
    height: 30px;
  } 

  .ivu-form-item-content{

    .ivu-radio-group{
      vertical-align: 0;
      height: 30px;
    }
  }
}
.ivu-form-item-label{
  padding: 0 12px 0  12px;
}

.ivu-form-item-content{
  line-height: 0;
}
</style>
