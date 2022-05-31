import anyTest, { TestFn } from 'ava'

import { Near, Account, Contract } from 'near-api-js'
import { nearConfig } from './config'

const test = anyTest as TestFn<{
  accounts: Record<string, any>;
}>

test.beforeEach(async (t) => {
  const near = await new Near(nearConfig)
  const user = await new Account(near.connection, nearConfig.contractName)
  const contract = await new Contract(
    user,
    nearConfig.contractName,
    { viewMethods: ['get_greeting'], changeMethods: ['set_greeting'] }
  )
  t.context.accounts = { contract }
})

test('returns the default greeting', async (t) => {
  const { contract } = t.context.accounts
  const message: string = await contract.get_greeting({})
  t.is(message, 'Hello')
})

test('changes the message', async (t) => {
  const { contract } = t.context.accounts
  await contract.set_greeting({args:{ message: 'Howdy' }})
  const message: string = await contract.get_greeting({})
  t.is(message, 'Howdy')
})