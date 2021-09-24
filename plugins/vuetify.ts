import '@fortawesome/fontawesome-free/css/all.css' // css-loader を使用していることを確認してください。
import Vue from 'vue'
import Vuetify from 'vuetify/lib'

Vue.use(Vuetify)

export default new Vuetify({
  icons: {
    iconfont: 'fa',
  },
})
