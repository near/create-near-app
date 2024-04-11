const contractPerNetwork = {
  mainnet: 'hello.near-examples.near',
  testnet: 'hello.near-examples.testnet',
};

const componentsPerNetwork = {
  mainnet: {
    socialDB: 'social.near',
    Lido: 'zavodil.near/widget/Lido',
    HelloNear: 'gagdiez.near/widget/HelloNear',
    LoveNear: 'gagdiez.near/widget/LoveNear',
  },
  testnet: {
    socialDB: 'v1.social08.testnet',
    Lido: 'influencer.testnet/widget/Lido',
    HelloNear: 'influencer.testnet/widget/HelloNear',
    LoveNear: 'influencer.testnet/widget/LoveNear',
  }
};

export const NetworkId = 'testnet';
export const HelloNearContract = contractPerNetwork[NetworkId];
export const Components = componentsPerNetwork[NetworkId];