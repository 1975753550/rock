// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import i18n from './locale'
import LoginPage from './pages/LoginPage'
import RockFooter from '@/components/RockFooter'

Vue.component('RockFooter', RockFooter)

export default new Vue({
  el: '#app',
  i18n,
  components: { LoginPage },
  template: '<LoginPage />'
})
