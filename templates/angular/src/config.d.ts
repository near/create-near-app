interface NetworkConfig {
  networkId: string
  nodeUrl: string
  contractName: string
  walletUrl?: string
  helperUrl?: string
  explorerUrl?: string
  keyPath?: string
  masterAccount?: string
}

declare function getConfig(env: string): NetworkConfig
export default getConfig
