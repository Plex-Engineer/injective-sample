import create from "zustand";
import { devtools } from "zustand/middleware";

interface NetworkProps {
  chainId: number | undefined;
  setChainId: (chainId: number | undefined) => void;
  account: string | undefined;
  setAccount: (account: string | undefined) => void;
}

export const useNetworkInfo = create<NetworkProps>()(
  devtools((set) => ({
    chainId: undefined,
    setChainId: (chainId) => set({ chainId: chainId }),
    account: undefined,
    setAccount: (account) => set({ account: account }),
  }))
);
