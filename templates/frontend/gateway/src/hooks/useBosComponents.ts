import { componentsByNetworkId } from '@/data/components';
import { networkId } from '@/utils/config';

export function useBosComponents() {
  const components = componentsByNetworkId[networkId];

  if (!components) {
    throw new Error(
      `useBosComponents(): unimplemented NetworkId "${networkId}". Add values to "data/bos-components.ts"`,
    );
  }

  return components;
}
