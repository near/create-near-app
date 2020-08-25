import { shallowMount } from '@vue/test-utils'
import SignedIn from 'components/SignedIn.vue'
import Notification from 'components/Notification.vue'


describe('SignedIn.vue Test', () => {
  it('compose component', () => {
    // render the component
    const wrapper = shallowMount(SignedIn, {})

    // check that the text is rendered
    expect(wrapper.text()).toMatch('This greeting is stored on the NEAR blockchain')

    // check that the logout button is rendered
    expect(wrapper.find('button').text()).toBe("Sign out")

    // check that the save button is rendered
    expect(wrapper.find('#save').text()).toBe("Save")

    // check the notification component is present
    expect(wrapper.findComponent(Notification).exists()).toBe(true)

  })
})