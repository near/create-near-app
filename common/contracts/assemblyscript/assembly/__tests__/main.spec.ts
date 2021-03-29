import { setGreeting } from '..'
import { storage, Context } from 'near-sdk-as'

describe('Greeting ', () => {
  it('should be set and read', () => {
    setGreeting('hello world')
    storage.get<string>(Context.sender)
  })
})
