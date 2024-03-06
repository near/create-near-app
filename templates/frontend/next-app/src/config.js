export const NetworkId = 'mainnet'

export const HelloNearContract = {
  mainnet: 'hello.near-examples.near',
  testnet: 'hello.near-examples.testnet'
}

export const ComponentMap = {
  mainnet: {
    socialDB: 'social.near',
    Lido: 'zavodil.near/widget/Lido',
    HelloNear: 'gagdiez.near/widget/HelloNear',
    LoveNear: 'gagdiez.near/widget/LoveNear',
    Greeter: 'pkg.near/widget/Greeter'
  },
  testnet: {
    socialDB: 'v1.social08.testnet',
    Lido: 'influencer.testnet/widget/Lido',
    HelloNear: 'influencer.testnet/widget/HelloNear',
    LoveNear: 'influencer.testnet/widget/LoveNear',
    Greeter: 'influencer.testnet/widget/Greeter'
  }
}
