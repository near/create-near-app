import { create } from 'zustand';

type BosLoaderState = {
  failedToLoad: boolean;
  hasResolved: boolean;
  loaderUrl: string;
  redirectMap: Record<string, unknown>;
};

type BosLoaderStore = BosLoaderState & {
  set: (state: Partial<BosLoaderState>) => void;
};

export const useBosLoaderStore = create<BosLoaderStore>((set) => ({
  failedToLoad: false,
  hasResolved: false,
  loaderUrl: '',
  redirectMap: {},
  set: (state) => set((previousState) => ({ ...previousState, ...state })),
}));
