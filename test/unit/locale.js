import { createLocalVue } from '@vue/test-utils'
import VueI18n from 'vue-i18n'
import zhCN from '@/locale/zh-cn.json'
import en from '@/locale/en.json'

// 创建一个扩展的 `Vue` 构造函数
const localVue = createLocalVue()

// 正常安装插件
localVue.use(VueI18n)

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

export {
  localVue, i18n
}
