import { useCallback, useEffect, useState } from "react";
import { JsonRpcProvider } from "@near-js/providers";
import { NearConnector, NearWallet } from "@hot-labs/near-connect";

interface ConnectedWallet {
  wallet: NearWallet;
  accounts: { accountId: string }[];
}

interface FunctionCallParams {
  contractId: string;
  method: string;
  args?: Record<string, unknown>;
  gas?: string;
  deposit?: string;
}

interface ViewFunctionParams {
  contractId: string;
  method: string;
  args?: Record<string, unknown>;
}

let connector: NearConnector | undefined;
const provider = new JsonRpcProvider({ url: "https://test.rpc.fastnear.com" });

if (typeof window !== "undefined") {
  connector = new NearConnector({ network: "testnet" });
}

export function useNear() {
  const [wallet, setWallet] = useState<NearWallet | undefined>(undefined);
  const [signedAccountId, setSignedAccountId] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);

  const signIn = useCallback(async () => {
    if (!connector) return;
    const connectedWallet = await connector.connect();
    console.log("Connected wallet", connectedWallet);
  }, []);

  const signOut = useCallback(async () => {
    if (!wallet || !connector) return;
    await connector.disconnect(wallet);
    console.log("Disconnected wallet");
    setWallet(undefined);
    setSignedAccountId("");
  }, [wallet]);

  useEffect(() => {
    if (!connector) return;

    async function reload() {
      try {
        const { wallet, accounts } = (await connector!.getConnectedWallet()) as ConnectedWallet;
        setWallet(wallet);
        setSignedAccountId(accounts[0]?.accountId || "");
      } catch {
        setWallet(undefined);
        setSignedAccountId("");
      } finally {
        setLoading(false);
      }
    }

    const onSignOut = () => {
      setWallet(undefined);
      setSignedAccountId("");
    };

    const onSignIn = async (payload: { wallet: NearWallet }) => {
      console.log("Signed in with payload", payload);
      setWallet(payload.wallet);
      const accountId = await payload.wallet.getAddress();
      setSignedAccountId(accountId);
    };

    connector.on("wallet:signOut", onSignOut);
    connector.on("wallet:signIn", onSignIn);

    reload();

    return () => {
      connector?.off("wallet:signOut", onSignOut);
      connector?.off("wallet:signIn", onSignIn);
    };
  }, []);

  const viewFunction = useCallback(async ({ contractId, method, args = {} }: ViewFunctionParams) => {
    return provider.callFunction(contractId, method, args);
  }, []);

  const callFunction = useCallback(
    async ({ contractId, method, args = {}, gas = "30000000000000", deposit = "0" }: FunctionCallParams) => {
      if (!wallet) throw new Error("Wallet not connected");
      return wallet.signAndSendTransaction({
        receiverId: contractId,
        actions: [
          {
            type: "FunctionCall",
            params: { methodName: method, args, gas, deposit },
          },
        ],
      });
    },
    [wallet]
  );

  return {
    signedAccountId,
    wallet,
    signIn,
    signOut,
    loading,
    viewFunction,
    callFunction,
    provider,
  };
}