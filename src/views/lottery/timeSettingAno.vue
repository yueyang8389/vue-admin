<template>
  <div>
    <div class="v2-search">
      <Form ref="serachKey" inline>
        <FormItem label="期数">
          <Input v-model="searchKey.periods" class="s-140" placeholder="请输入期数"/>
        </FormItem>
        <FormItem>
          <Button type="primary" class="ivu-btn search" @click="searchSubmit">查询</Button>
        </FormItem>
        <FormItem>
            <Button @click="() => {this.$refs.editTime.show()}" type="primary" class="w120x">批量修改时间</Button>
        </FormItem>
      </Form>
    </div>
    <div class="v2-table">
      <Tables
        editable
        :columns="table.columns"
        :loading="table.loading"
        :value="table.data"
        :total="table.total"
        @on-page-change="onPageChange"
        @on-page-size-change="onPageSizeChange"
        @on-edit="onEdit"
      ></Tables>
    </div>
    <Modals ref="editPeriods" title="编辑时间" width="560">
      <div slot="content" class="v2-form-wrapper">
        <Form ref="editTime" :model="editTimeInfo" :rules="editTimeInfoValidate" :label-width="160" style="width:560px;">
          <FormItem label="期数">
            <Input placeholder="1" v-model="editTimeInfo.periods" disabled class="w260x"/>
          </FormItem>
          <FormItem label="开盘时间" prop="openingTime">
            <Input
              icon="ios-clock-outline"
              placeholder="请设置开盘时间"
              v-model="editTimeInfo.openingTime"
              class="w260x"
            />
          </FormItem>
          <FormItem label="封盘时间" prop="sealTime">
            <Input icon="ios-clock-outline" placeholder="请设置封盘时间" v-model="editTimeInfo.sealTime" class="w260x"/>
          </FormItem>
          <FormItem label="开奖时间" prop="lotteryTime">
            <Input
              icon="ios-clock-outline"
              placeholder="请设置开奖时间"
              v-model="editTimeInfo.lotteryTime"
              class="w260x"
            />
          </FormItem>
          <FormItem label="开奖日期" prop="lotteryDate">
            <Select v-model="editTimeInfo.lotteryDate" multiple class="w260x">
              <Option v-for="(item,index) in weeks" :key="index" :value="item.key">{{item.value}}</Option>
            </Select>
          </FormItem>
          <FormItem label="偏移校正" class="mt15">
            <Input class="w260x"/>
          </FormItem>
          <FormItem>
            <Button class="ivu-btn submit bg" @click="editTimeInfoSave">确认保存</Button>
          </FormItem>
        </Form>
      </div>
    </Modals>
    <!-- 批量修改时间 -->
    <Modals ref="editTime" title="批量修改时间" width="560">
      <div slot="content" class="v2-form-wrapper">
        <Form ref="timeInfo" :label-width="85">
          <FormItem label="开盘时间：">
            <span class="p5 pl10 pr10 b">-</span>
            <Input v-model="timeInfo.sealTime" class="bd ib ml10 w40x mr10"/>
            <span class="p5 pl10 pr10 b">+</span>
            <span class="pl15">秒</span>
          </FormItem>
           <FormItem label="封盘时间：">
            <span class="p5 pl10 pr10 b">-</span>
            <Input v-model="timeInfo.sealTime" class="bd ib ml10 w40x mr10"/>
            <span class="p5 pl10 pr10 b">+</span>
            <span class="pl15">秒</span>
          </FormItem>
           <FormItem label="开奖时间：">
            <span class="p5 pl10 pr10 b">-</span>
            <Input v-model="timeInfo.sealTime" class="bd ib ml10 w40x mr10"/>
            <span class="p5 pl10 pr10 b">+</span>
            <span class="pl15">秒</span>
          </FormItem>
          <FormItem>
            <Button
              class="ivu-btn save"
              type="primary"
              style="width:250px;margin-left:-86px"
              @click="saveTimeInfo"
            >确认保存</Button>
          </FormItem>
        </Form>
      </div>
    </Modals>
  </div>
</template>
<script>
import { timeSetting } from "@/api/data";
import Tables from "@/components/tables";
import Modals from "@/components/modals";
export default {
  name: "timeSettingAno",
  components: {
    Tables,
    Modals
  },
  data() {
    return {
      searchKey: {},
      editTimeInfo: {},
      editTimeInfoValidate: {
        openingTime:[
          {
            required:true,
            message:'请设置开盘时间',
            trigger:'blur'
          }
        ],
        sealTime:[
          {
            required:true,
            message:'请设置封盘时间',
            trigger:'blur'
          }
        ],
        lotteryTime:[
          {
            required:true,
            message:'请设置开奖时间',
            trigger:'blur'
          }
        ]
      },
      timeInfo: {},
      weeks: [
        { key: "Mon", value: "周一" },
        { key: "Tue", value: "周二" },
        { key: "Wen", value: "周三" },
        { key: "Thu", value: "周四" },
        { key: "Fri", value: "周五" },
        { key: "Sat", value: "周六" },
        { key: "Sun", value: "周日" }
      ],
      table: {
        loading: true,
        total: 100,
        data: [],
        title: "时间设置",
        columns: [
          {
            title: "期数",
            key: "periods",
            align: "center"
          },
          {
            title: "开盘时间",
            key: "openingTime",
            align: "center"
          },
          {
            title: "封盘时间",
            key: "sealTime",
            align: "center"
          },
          {
            title: "开奖时间",
            key: "lotteryTime",
            align: "center"
          },
          {
            title: "偏移校正",
            key: "offset",
            align: "center"
          },
          // {
          //   title: "开奖日期",
          //   key: "lotteryDate",
          //   align: "center"
          // },
          {
            title: "操作",
            key: "handle",
            align: "center",
            options: ["edit"]
          }
        ]
      }
    };
  },
  methods: {
    getData(query) {
      timeSetting().then(res => {
        this.table.loading = true;
        setTimeout(() => {
          this.table.data = res.data;
          this.table.loading = false;
        }, 2000);
      });
    },
    searchSubmit() {},
    onPageChange(page) {
      this.getData(page);
    },
    onPageSizeChange() {},
    onEdit(params) {
      this.$refs.editPeriods.show();
      this.editTimeInfo = params.row;
    },
    editTimeInfoSave() {
      this.$refs.editPeriods.hide();
      this.$Tip.success({
        content:'修改时间成功',
        onOk:() => {}
      })
    },
    saveTimeInfo() {
      this.$refs.editTime.hide();
      this.$Tip.success({
        content:'批量修改时间成功',
        onOk:() => {}
      })
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.getData();
    });
  }
};
</script>
<style lang="less" scoped>
@import "../../styles/button.less";
.w120x{
  width: 120px;
  height: 30px;
  background: #ffffff;
  border: 1px solid #62b1fd;
  color: #62b1fd;
}
</style>


