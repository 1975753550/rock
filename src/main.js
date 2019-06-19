// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import store from './store'
import i18n from './locale'
import router from './router'
import App from './App'
import Sidebar from '@/components/Sidebar'
import RockFooter from '@/components/RockFooter'
import RockHeader from '@/components/RockHeader'
import { codemirror } from 'vue-codemirror'
import 'codemirror/lib/codemirror.css'

Vue.use(codemirror)
Vue.config.productionTip = false

Vue.component('Sidebar', Sidebar)
Vue.component('RockFooter', RockFooter)
Vue.component('RockHeader', RockHeader)

export default new Vue({
  el: '#app',
  store,
  router,
  i18n,
  components: { App },
  template: '<App/>'
})
