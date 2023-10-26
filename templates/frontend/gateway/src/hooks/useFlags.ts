import { useCallback, useEffect, useState } from 'react';

/**
 * Use Application flags
 *
 * `const [flags, setFlags] = useFlags();`
 *
 * Warning: setFlags causes page reload
 */

type Flags = {
  bosLoaderUrl?: string;
};

export function useFlags() {
  const [rawFlags, setRawFlags] = useState<Flags>();

  useEffect(() => {
    const flags = localStorage.getItem('flags') ? JSON.parse(localStorage.getItem('flags') || '') : {};
    setRawFlags(flags);
  }, []);

  const setFlags = useCallback((newFlags: Flags) => {
    setRawFlags((f) => {
      const updated = { ...f, ...newFlags };
      localStorage.setItem('flags', JSON.stringify(updated));

      alert('Flags have been saved.');

      // reload for changes to take effect
      // eslint-disable-next-line no-restricted-globals
      location.reload();

      // may not be reachable
      return updated;
    });
  }, []);

  return [rawFlags, setFlags] as const;
}
