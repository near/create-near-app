import { shallowMount } from '@vue/test-utils'
import Notification from 'components/Notification.vue'


describe('Notification.vue Test', () => {
  it('renders message when component is created', () => {
    // render the component
    const wrapper = shallowMount(Notification, {
      propsData: {
        msg: 'Test Message'
      }
    })

    console.log(wrapper.text())

    //check msg prop
    expect(wrapper.props("msg")).toMatch('Test Message')

    // check that the message is rendered
    expect(wrapper.text()).toMatch('Test Message')

    // check that additional the text is rendered
    expect(wrapper.text()).toMatch('in contract')

  })
})