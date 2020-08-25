import { shallowMount } from '@vue/test-utils'
import SignedOut from 'components/SignedOut.vue'


describe('SignedOut.vue Test', () => {
  it('compose main page', () => {
    // render the component
    const wrapper = shallowMount(SignedOut, {})

    // check that the text is rendered
    expect(wrapper.text()).toMatch('Welcome to NEAR')

    // check that the login button rendered
    expect(wrapper.find('button').text()).toBe("Sign in")

  })
})