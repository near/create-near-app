const TestnetDomains = {
  'test.everything.dev': true,
  '127.0.0.1': true,
  localhost: true
}

export const NetworkId =
  window.location.hostname in TestnetDomains ? 'testnet' : 'mainnet'
const TestnetWidgets = {
  socialDB: 'v1.social08.testnet',
  Lido: 'influencer.testnet/widget/Lido',
  HelloNear: 'influencer.testnet/widget/HelloNear',
  LoveNear: 'influencer.testnet/widget/LoveNear',
  Greeter: 'influencer.testnet/widget/Greeter',
  image: 'eugenethedream/widget/Image'
}

const MainnetWidgets = {
  socialDB: 'social.near',
  Lido: 'zavodil.near/widget/Lido',
  HelloNear: 'gagdiez.near/widget/HelloNear',
  LoveNear: 'gagdiez.near/widget/LoveNear',
  Greeter: 'pkg.near/widget/Greeter',
  image: 'mob.near/widget/Image'
}

export const Widgets = NetworkId === 'testnet' ? TestnetWidgets : MainnetWidgets
