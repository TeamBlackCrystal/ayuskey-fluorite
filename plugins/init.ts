import Vue from 'vue'
import { fetchInstance, instance } from '~/utils/instance'
import { $i } from '~/utils/account'

fetchInstance().then(() => {
  localStorage.setItem('bev', instance.version);
  // 他のところで処理してもいいかも
  localStorage.setItem('fev', 'unknown');
});

// nuxt3で"app.config.globalProperties"になる
// Vue.prototype = {
//   $i,
//   $instance: instance,
// }

Vue.prototype.$i = $i;
Vue.prototype.$instance = instance;

const bev = localStorage.getItem('bev') || '???'
const fev = localStorage.getItem('fev') || '???'

console.info(`Ayuskey v${bev} (codename is unknown)`);
console.info(`Fluorite v${fev} (fluorite)`);
