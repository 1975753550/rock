import { shallowMount } from '@vue/test-utils'
import { localVue, i18n } from '../locale'
import HomePage from '@/pages/HomePage'

const factory = (values = {}) => {
  return shallowMount(HomePage, {
    localVue,
    i18n,
    data () {
      return { ...values }
    }
  })
}

describe('pages/HomePage', () => {
  it('renders hello', () => {
    const wrapper = factory()

    expect(wrapper.find('.hello h1').text()).toEqual('你好啊')
  })
})
