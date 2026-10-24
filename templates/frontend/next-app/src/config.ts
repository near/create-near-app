// Type definitions
interface ContractPerNetwork {
  mainnet: string;
  testnet: string;
}

// Contract addresses per network
const contractPerNetwork: ContractPerNetwork = {
  mainnet: 'hello.near-examples.near',
  testnet: 'hello.near-examples.testnet',
};

// Selected network
export const NetworkId: 'mainnet' | 'testnet' = 'testnet';
export const HelloNearContract: string = contractPerNetwork[NetworkId];