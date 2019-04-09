import { shallowMount } from '@vue/test-utils'
import { localVue, i18n } from '../locale'
import AjaxPage from '@/pages/AjaxPage'

const factory = (values = {}) => {
  return shallowMount(AjaxPage, {
    localVue,
    i18n,
    data () {
      return { ...values }
    }
  })
}

describe('pages/AjaxPage', () => {
  it('renders bitcoin price', () => {
    const wrapper = factory({price: '1 USD'})

    expect(wrapper.find('.price').text()).toEqual('Bitcoin Price: 1 USD')
  })

  it('fetches async when a button is clicked', (done) => {
    const wrapper = factory()

    wrapper.find('.button').trigger('click')
    wrapper.vm.$nextTick(() => {
      expect(wrapper.vm.price).toBeDefined()
      done()
    })
  })
})
