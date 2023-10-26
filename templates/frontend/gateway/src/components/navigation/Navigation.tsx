import React, { useEffect, useState } from 'react';

import { DesktopNavigation } from './desktop/DesktopNavigation';
import { MobileNavigation } from './mobile/MobileNavigation';

export const Navigation = () => {
  const [matches, setMatches] = useState(true);

  useEffect(() => {
    setMatches(window.matchMedia('(min-width: 1024px)').matches);
  }, []);

  useEffect(() => {
    window.matchMedia('(min-width: 1024px)').addEventListener('change', (e) => setMatches(e.matches));
  }, []);

  return (
    <>
      {matches && <DesktopNavigation />}
      {!matches && <MobileNavigation />}
    </>
  );
};
