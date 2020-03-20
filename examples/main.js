import Vue from 'vue';
import App from './App.vue';
import demoUI from '../src/index';

Vue.use(demoUI);

Vue.config.productionTip = false;

new Vue({
    render: h => h(App)
}).$mount('#app');
