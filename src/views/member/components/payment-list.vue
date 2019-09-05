<template>
    <Modals ref="paymentListModal" :title="modalTitle">
        <div slot="content">
            <Tabs type="card" value="pc">
                <TabPane label="电脑端" name="pc">
                    <div class="modal-overflow">
                        <table class="paymentTable" width="100%">
                            <thead>
                                <tr>
                                    <th>等级</th>
                                    <th>支付方式</th>
                                    <th>通道一</th>
                                    <th>通道二</th>
                                    <th>通道三</th>
                                    <th>通道四</th>
                                    <th>通道五</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td rowspan=2>未分层</td>
                                    <td>银联支付</td>
                                    <td>
                                        隆发
                                    </td>
                                    <td>信誉
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>支付宝线上</td>
                                    <td>易支付</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td rowspan=2>第一层</td>
                                    <td>支付宝线上</td>
                                    <td>
                                        隆发
                                    </td>
                                    <td>信誉
                                    </td>
                                    <td>奥邦</td>
                                    <td>锐支付</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>银联支付</td>
                                    <td>元气</td>
                                    <td>阿Q宝</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td rowspan=2>第二层</td>
                                    <td>支付宝线上</td>
                                    <td>
                                        隆发
                                    </td>
                                    <td>信誉
                                    </td>
                                    <td>奥邦</td>
                                    <td>锐支付</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>银联支付</td>
                                    <td>元气</td>
                                    <td>阿Q宝</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td rowspan=2>第三层</td>
                                    <td>支付宝线上</td>
                                    <td>
                                        隆发
                                    </td>
                                    <td>信誉
                                    </td>
                                    <td>奥邦</td>
                                    <td>锐支付</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>银联支付</td>
                                    <td>元气</td>
                                    <td>阿Q宝</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                 <tr>
                                    <td rowspan=2>第四层</td>
                                    <td>支付宝线上</td>
                                    <td>
                                        隆发
                                    </td>
                                    <td>信誉
                                    </td>
                                    <td>奥邦</td>
                                    <td>锐支付</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>银联支付</td>
                                    <td>元气</td>
                                    <td>阿Q宝</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                 <tr>
                                    <td rowspan=2>第五层</td>
                                    <td>支付宝线上</td>
                                    <td>
                                        隆发
                                    </td>
                                    <td>信誉
                                    </td>
                                    <td>奥邦</td>
                                    <td>锐支付</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>银联支付</td>
                                    <td>元气</td>
                                    <td>阿Q宝</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </TabPane>
                <TabPane label="手机端" name="mobile">
                    <div class="modal-overflow">
                        <table class="paymentTable" width="100%">
                            <thead>
                                <tr>
                                    <th>等级</th>
                                    <th>支付方式</th>
                                    <th>通道一</th>
                                    <th>通道二</th>
                                    <th>通道三</th>
                                    <th>通道四</th>
                                    <th>通道五</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td rowspan=2>未分层</td>
                                    <td>银联支付</td>
                                    <td>
                                        隆发
                                    </td>
                                    <td>信誉
                                    </td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>支付宝线上</td>
                                    <td>易支付</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td rowspan=2>第一层</td>
                                    <td>支付宝线上</td>
                                    <td>
                                        隆发
                                    </td>
                                    <td>信誉
                                    </td>
                                    <td>奥邦</td>
                                    <td>锐支付</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>银联支付</td>
                                    <td>元气</td>
                                    <td>阿Q宝</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td rowspan=2>第二层</td>
                                    <td>支付宝线上</td>
                                    <td>
                                        隆发
                                    </td>
                                    <td>信誉
                                    </td>
                                    <td>奥邦</td>
                                    <td>锐支付</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>银联支付</td>
                                    <td>元气</td>
                                    <td>阿Q宝</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td rowspan=2>第三层</td>
                                    <td>支付宝线上</td>
                                    <td>
                                        隆发
                                    </td>
                                    <td>信誉
                                    </td>
                                    <td>奥邦</td>
                                    <td>锐支付</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>银联支付</td>
                                    <td>元气</td>
                                    <td>阿Q宝</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td rowspan=2>第四层</td>
                                    <td>支付宝线上</td>
                                    <td>
                                        隆发
                                    </td>
                                    <td>信誉
                                    </td>
                                    <td>奥邦</td>
                                    <td>锐支付</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>银联支付</td>
                                    <td>元气</td>
                                    <td>阿Q宝</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td rowspan=2>第五层</td>
                                    <td>支付宝线上</td>
                                    <td>
                                        隆发
                                    </td>
                                    <td>信誉
                                    </td>
                                    <td>奥邦</td>
                                    <td>锐支付</td>
                                    <td></td>
                                </tr>
                                <tr>
                                    <td>银联支付</td>
                                    <td>元气</td>
                                    <td>阿Q宝</td>
                                    <td></td>
                                    <td></td>
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </TabPane>
            </Tabs>
            <!-- <PaymentList /> -->
        </div>
    </Modals>
</template>
<script>
import Modals from "@/components/modals";
export default {
    components: { Modals },
  data() {
    return {
      modalTitle: "支付通道详情"
    };
  },
  methods: {
    show() {
      this.$refs.paymentListModal.show();
    }
  }
};
</script>
<style lang="less" scoped>
@import "../../../styles/tabs.less";
.paymentTable {
  text-align: center;
  font-size: 14px;
  border-collapse: collapse;
  thead {
    background: #f6f6f8 !important;
  }
  th,
  td {
    border: 1px solid #ebebeb;
    font-weight: normal;
    padding: 10px;
  }
}
</style>


