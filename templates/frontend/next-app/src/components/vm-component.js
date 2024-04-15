import { Widget, EthersProviderContext } from 'near-social-vm';
import { useEthersProviderContext } from '@/wallets/web3-wallet';
import { useInitNear } from 'near-social-vm';
import { useEffect } from 'react';
import { useStore } from '@/app/layout';
import { NetworkId } from '@/config';

export default function Component({ src }) {
  const ethersContext = useEthersProviderContext();
  const { wallet } = useStore();
  const { initNear } = useInitNear();

  useEffect(() => {
    wallet && initNear && initNear({ networkId: NetworkId, selector: wallet.selector, config: { allowOtherContracts: true } });
  }, [wallet, initNear]);

  return (
    <div>
      <EthersProviderContext.Provider value={ethersContext}>
        <Widget src={src} />
      </EthersProviderContext.Provider>
      <p className="mt-4 small"> <span className="text-secondary">Source:</span> <a href={`https://near.social/mob.near/widget/WidgetSource?src=${src}`}> {src} </a> </p>
    </div>
  );
}
