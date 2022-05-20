import { set_greeting, get_greeting } from '..'

describe('Greeting ', () => {
  it('should get the default greeting', () => {
    expect(get_greeting()).toBe('Hello')
  })
  it('should change the greeting', () => {
    set_greeting('howdy')
    expect(get_greeting()).toBe('howdy')
  })
})