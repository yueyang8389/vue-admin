import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
import config from '@/config'
import iView from 'iview'
import './index.less'

import Sortable from 'sortablejs'
// 引入自定义插件
import Tip from '@/plugins/tip'

// 引入根组件mixins
import mixins from './mixins/root'

// 实际打包时应该不引入mock
/* eslint-disable */
if (process.env.NODE_ENV !== 'production') require('@/mock')

Vue.use(iView);
Vue.use(Tip);
// Vue.use(Sortable);

/**
 * @description 生产环境关掉提示
 */
Vue.config.productionTip = false;

/**
 * @description 全局注册应用配置
 */
Vue.prototype.$config = config;

new Vue({
    mixins: [mixins], 
    router,
    store,
    render: h => h(App)
}).$mount('#app')