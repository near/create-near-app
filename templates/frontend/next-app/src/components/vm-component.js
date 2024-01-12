'use client';
import { useEffect } from 'react';
import { useInitNear, Widget, EthersProviderContext } from 'near-social-vm';

import { useWallet } from '@/wallets/wallet-selector';
import { useEthersProviderContext } from '@/wallets/web3-wallet';
import { NetworkId } from '@/config';

export default function Component({ src }) {
  const ethersContext = useEthersProviderContext();
  const { selector } = useWallet();
  const { initNear } = useInitNear();

  useEffect(() => {
    initNear && selector && initNear({ networkId: NetworkId, selector });
  }, [initNear, selector]);

  return (
    <div>
      <EthersProviderContext.Provider value={ethersContext}>
        <Widget src={src} />
      </EthersProviderContext.Provider>
      <p className="mt-4 small"> <span className="text-secondary">Source:</span> <a href={`https://near.social/mob.near/widget/WidgetSource?src=${src}`}> {src} </a> </p>
    </div>
  );
}
