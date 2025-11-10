import {
  createContext,
  useContext,
  useEffect,
  useState,
  ReactNode,
} from "react";
import { JsonRpcProvider } from "@near-js/providers";
import { NearConnector, type NearWalletBase } from "@hot-labs/near-connect";

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

let connector: NearConnector;

const provider = new JsonRpcProvider({ url: "https://test.rpc.fastnear.com" });

if (typeof window !== "undefined") {
  connector = new NearConnector({ network: "mainnet" })
}

export function NearProvider({ children }: { children: ReactNode }) {
  const [wallet, setWallet] = useState<NearWalletBase | undefined>(undefined);
  const [signedAccountId, setSignedAccountId] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function initializeConnector() {
      const connectedWallet = await connector.getConnectedWallet().catch(() => null);

      if (connectedWallet) {
        setWallet(connectedWallet.wallet);
        setSignedAccountId(connectedWallet.accounts[0].accountId);
      }

      const onSignOut = () => {
        setWallet(undefined);
        setSignedAccountId("");
      };

      const onSignIn = async (payload: { wallet: NearWalletBase }) => {
        setWallet(payload.wallet);
        const accounts = await payload.wallet.getAccounts();
        setSignedAccountId(accounts[0]?.accountId || "");
      };

      connector.on("wallet:signOut", onSignOut);
      connector.on("wallet:signIn", onSignIn);

      setLoading(false);
    }

    initializeConnector();

    return () => {
      if (connector) {
        connector.removeAllListeners("wallet:signOut");
        connector.removeAllListeners("wallet:signIn");
      }
    };
  }, []);

  async function signIn() {
    if (!connector) return;
    const wallet = await connector.connect();
    console.log("Connected wallet", wallet);
    if (wallet) {
      setWallet(wallet);
      const accounts = await wallet.getAccounts();
      setSignedAccountId(accounts[0]?.accountId || "");
    }
  }

  async function signOut() {
    if (!connector || !wallet) return;
    await connector.disconnect(wallet);
    console.log("Disconnected wallet");

    setWallet(undefined);
    setSignedAccountId("");
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
    gas = "30000000000000",
    deposit = "0",
  }: FunctionCallParams) {

    const wallet = await connector.wallet()

    return wallet.signAndSendTransactions({
      transactions: [
        {
          signerId: signedAccountId,
          receiverId: contractId,
          actions: [
            {
              type: "FunctionCall",
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

export function useNearWallet() {
  const context = useContext(NearContext);
  if (context === undefined) {
    throw new Error("useNear must be used within a NearProvider");
  }
  return context;
}