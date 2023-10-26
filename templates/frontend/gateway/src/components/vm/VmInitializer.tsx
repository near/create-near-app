import { sanitizeUrl } from '@braintree/sanitize-url';
import { setupWalletSelector } from '@near-wallet-selector/core';
import { setupModal } from '@near-wallet-selector/modal-ui';
import { setupMyNearWallet } from '@near-wallet-selector/my-near-wallet';
import { setupNearWallet } from '@near-wallet-selector/near-wallet';
import Big from 'big.js';
import {
  CommitButton,
  EthersProviderContext,
  useAccount,
  useCache,
  useInitNear,
  useNear,
  utils,
  Widget,
} from 'near-social-vm';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';

import { useEthersProviderContext } from '@/data/web3';
import { useAuthStore } from '@/stores/auth';
import { useVmStore } from '@/stores/vm';
import { networkId } from '@/utils/config';

export default function VmInitializer() {
  const [signedIn, setSignedIn] = useState(false);
  const [signedAccountId, setSignedAccountId] = useState('');
  const [availableStorage, setAvailableStorage] = useState<Big | null>(null);
  const ethersProviderContext = useEthersProviderContext();
  const { initNear } = useInitNear();
  const near = useNear();
  const account = useAccount();
  const cache = useCache();
  const setAuthStore = useAuthStore((state) => state.set);
  const setVmStore = useVmStore((store) => store.set);

  useEffect(() => {
    const selector = setupWalletSelector({
      network: networkId,
      modules: [
        setupNearWallet(),
        setupMyNearWallet()
      ]
    });

    initNear &&
      initNear({
        networkId,
        selector,
        customElements: {
          Link: ({ href, to, ...rest }: any) => <Link href={sanitizeUrl(href ?? to)} {...rest} />,
        },
      });
    
    selector.then( (walletSelector) => {
      setSignedIn(walletSelector.isSignedIn());
      const accounts = walletSelector.store.getState().accounts;
      accounts.length && setSignedAccountId(accounts[0].accountId);
    });
  }, [initNear]);

  const logOut = useCallback(async () => {
    if (!near) {
      return;
    }
    const wallet = await (await near.selector).wallet();
    wallet.signOut();
    near.accountId = null;
    setSignedIn(false);
    setSignedAccountId('');
  }, [near]);

  const refreshAllowance = useCallback(async () => {
    alert('You\'re out of access key allowance. Need sign in again to refresh it');
    await logOut();
  }, [logOut]);

  useEffect(() => {
    setAvailableStorage(
      account.storageBalance ? Big(account.storageBalance.available).div(utils.StorageCostPerByte) : Big(0),
    );
  }, [account]);

  useEffect(() => {
    const requestSignInWithWallet = async () => {
      const selector = await near.selector;
      const modal = setupModal(selector, { contractId: '' });
      modal.show();
    };

    setAuthStore({
      account,
      accountId: signedAccountId,
      availableStorage,
      logOut,
      refreshAllowance,
      requestSignInWithWallet,
      vmNear: near,
      signedIn,
    });
  }, [
    account,
    availableStorage,
    logOut,
    refreshAllowance,
    signedIn,
    signedAccountId,
    setAuthStore,
    near,
  ]);

  useEffect(() => {
    setVmStore({
      cache,
      CommitButton,
      ethersContext: ethersProviderContext,
      EthersProvider: EthersProviderContext.Provider,
      Widget,
      near,
    });
  }, [cache, ethersProviderContext, setVmStore, near]);

  return <></>;
}
