import { useCallback, useEffect } from 'react';

import { useBosLoaderStore } from '@/stores/bos-loader';

import { useFlags } from './useFlags';

export function useBosLoaderInitializer() {
  const [flags] = useFlags();
  const loaderUrl = flags?.bosLoaderUrl;
  const setStore = useBosLoaderStore((store) => store.set);

  /**
   * Fetch local component versions if a local loader
   * is provided. must be provided as {components: { <path>: { code : <code>}}}
   */
  const fetchRedirectMap = useCallback(
    async (url: string) => {
      setStore({
        loaderUrl: url,
      });

      try {
        const res = await fetch(url, {
          method: 'GET',
          headers: {
            Accept: 'application/json',
          },
        });

        if (!res.ok) {
          throw new Error('Network response was not OK');
        }

        const data = await res.json();

        setStore({
          hasResolved: true,
          redirectMap: data.components,
        });
      } catch (e) {
        console.error(e);

        setStore({
          failedToLoad: true,
          hasResolved: true,
        });
      }
    },
    [setStore],
  );

  useEffect(() => {
    if (loaderUrl) {
      fetchRedirectMap(loaderUrl);
    } else if (flags) {
      // We need to check if "flags" has fully resolved to avoid prematurely setting "hasResolved: true"
      setStore({ hasResolved: true });
    }
  }, [flags, fetchRedirectMap, loaderUrl, setStore]);
}
