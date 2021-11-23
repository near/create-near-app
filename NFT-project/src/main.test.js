beforeAll(async function () {
  // NOTE: nearlib and nearConfig are made available by near-cli/test_environment
  const near = await nearlib.connect(nearConfig)
  window.accountId = nearConfig.contractName
  window.contract = await near.loadContract(nearConfig.contractName, {
    viewMethods: ['get_greeting'],
    changeMethods: [],
    sender: window.accountId
  })
})

test('get_greeting', async () => {
  const message = await window.contract.get_greeting({ account_id: window.accountId })
  expect(message).toEqual('Hello')
})
