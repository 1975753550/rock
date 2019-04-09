import VueI18n from 'vue-i18n'
import zhCN from './zh-cn.json'
import en from './en.json'

Vue.use(VueI18n)

const messages = {
  'zh-cn': zhCN,
  en: en
}

// Create VueI18n instance with options
const i18n = new VueI18n({
  locale: 'zh-cn', // set locale
  fallbackLocale: 'zh-cn',
  messages // set locale messages
})

export default i18n
