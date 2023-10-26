import type { OpenToastOptions } from './store';
import { useToasterStore } from './store';

export function openToast(options: OpenToastOptions) {
  useToasterStore.getState().open(options);
}
