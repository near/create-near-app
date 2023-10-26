import type { ReactElement } from 'react';

import { DefaultLayout } from '@/components/layouts/DefaultLayout';
import { SimpleLayout } from '@/components/layouts/SimpleLayout';

export function useDefaultLayout(page: ReactElement) {
  return <DefaultLayout>{page}</DefaultLayout>;
}

export function useSimpleLayout(page: ReactElement) {
  return <SimpleLayout>{page}</SimpleLayout>;
}
