import { create } from 'zustand';

type CurrentComponentStore = {
  src: string | null;
  setSrc: (src: string | null) => void;
};

export const useCurrentComponentStore = create<CurrentComponentStore>((set) => ({
  src: null,
  setSrc: (src) => set(() => ({ src })),
}));
