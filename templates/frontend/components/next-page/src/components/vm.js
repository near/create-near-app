import { useEffect, useContext } from 'react';
import { useInitNear, Widget, EthersProviderContext } from 'near-social-vm';

import { NearContext } from '@/context';
import { NetworkId } from '@/config';
import { useEthersProviderContext } from '@/wallets/eth';

export default function Component({ src }) {
  const ethersContext = useEthersProviderContext();
  const { wallet } = useContext(NearContext);
  const { initNear } = useInitNear();

  useEffect(() => {
    wallet && initNear && initNear({ networkId: NetworkId, selector: wallet.selector, config: { allowOtherContracts: true } });
  }, [wallet, initNear]);

  const href = wallet.networkId === 'mainnet' ?
    `https://near.social/mob.near/widget/WidgetSource?src=${src}` :
    `https://test.near.social/eugenethedream/widget/WidgetSource?src=${src}`;

  return (
    <div>
      <EthersProviderContext.Provider value={ethersContext}>
        <Widget src={src} />
      </EthersProviderContext.Provider>
      <p className="mt-4 small"> <span className="text-secondary">Source:</span> <a href={href}> {src} </a> </p>
    </div>
  );
}
