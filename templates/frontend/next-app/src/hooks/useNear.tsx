import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from 'react';
import { JsonRpcProvider } from '@near-js/providers';
import type { NearConnector, NearWalletBase } from '@hot-labs/near-connect';

interface ViewFunctionParams {
  contractId: string;
  method: string;
  args?: Record<string, unknown>;
}

interface FunctionCallParams {
  contractId: string;
  method: string;
  args?: Record<string, unknown>;
  gas?: string;
  deposit?: string;
}

interface NearContextValue {
  signedAccountId: string;
  wallet: NearWalletBase | undefined;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  loading: boolean;
  viewFunction: (params: ViewFunctionParams) => Promise<any>;
  callFunction: (params: FunctionCallParams) => Promise<any>;
  provider: JsonRpcProvider;
}

const NearContext = createContext<NearContextValue | undefined>(undefined);

const provider = new JsonRpcProvider({ url: 'https://test.rpc.fastnear.com' });

export function NearProvider({ children }: { children: ReactNode }) {
  const [connector, setConnector] = useState<NearConnector | null>(null);
  const [wallet, setWallet] = useState<NearWalletBase | undefined>(undefined);
  const [signedAccountId, setSignedAccountId] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (typeof window === 'undefined') return;

    let isSubscribed = true;

    async function initializeConnector() {
      const { NearConnector } = await import('@hot-labs/near-connect');
      const newConnector = new NearConnector({ network: 'testnet' });

      if (!isSubscribed) return;

      const connectedWallet = await newConnector
        .getConnectedWallet()
        .catch(() => null);
      if (connectedWallet && isSubscribed) {
        setWallet(connectedWallet.wallet);
        setSignedAccountId(connectedWallet.accounts[0].accountId);
      }

      const onSignOut = () => {
        setWallet(undefined);
        setSignedAccountId('');
      };

      const onSignIn = async (payload: { wallet: NearWalletBase }) => {
        setWallet(payload.wallet);
        const accounts = await payload.wallet.getAccounts();
        setSignedAccountId(accounts[0]?.accountId || '');
      };

      newConnector.on('wallet:signOut', onSignOut);
      newConnector.on('wallet:signIn', onSignIn);

      if (isSubscribed) {
        setConnector(newConnector);
        setLoading(false);
      }
    }

    initializeConnector();

    return () => {
      isSubscribed = false;
      if (connector) {
        connector.removeAllListeners('wallet:signOut');
        connector.removeAllListeners('wallet:signIn');
      }
    };
  }, []);

  async function signIn() {
    if (!connector) return;
    const wallet = await connector.connect();
    console.log('Connected wallet', wallet);
    if (wallet) {
      setWallet(wallet);
      const accounts = await wallet.getAccounts();
      setSignedAccountId(accounts[0]?.accountId || '');
    }
  }

  async function signOut() {
    if (!connector || !wallet) return;
    await connector.disconnect(wallet);
    console.log('Disconnected wallet');

    setWallet(undefined);
    setSignedAccountId('');
  }

  async function viewFunction({
    contractId,
    method,
    args = {},
  }: ViewFunctionParams) {
    return provider.callFunction(contractId, method, args);
  }

  async function callFunction({
    contractId,
    method,
    args = {},
    gas = '30000000000000',
    deposit = '0',
  }: FunctionCallParams) {
    if (!wallet) throw new Error('Wallet not connected');

    return wallet.signAndSendTransactions({
      transactions: [
        {
          signerId: signedAccountId,
          receiverId: contractId,
          actions: [
            {
              type: 'FunctionCall',
              params: {
                methodName: method,
                args,
                gas,
                deposit,
              },
            },
          ],
        },
      ],
    });
  }

  const value: NearContextValue = {
    signedAccountId,
    wallet,
    signIn,
    signOut,
    loading,
    viewFunction,
    callFunction,
    provider,
  };

  return <NearContext.Provider value={value}>{children}</NearContext.Provider>;
}

export function useNear() {
  const context = useContext(NearContext);
  if (context === undefined) {
    throw new Error('useNear must be used within a NearProvider');
  }
  return context;
}
