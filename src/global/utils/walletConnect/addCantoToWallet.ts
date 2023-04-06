import { CantoMainnet, NodeAddresses } from "global/config/networks";

export async function addNetwork() {
  //@ts-ignore
  if (window.ethereum) {
    try {
      //@ts-ignore
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: "0x" + CantoMainnet.chainId.toString(16) }],
      });
    } catch (error: unknown) {
      //@ts-ignore
      if (error.code === 4902) {
        //@ts-ignore
        window?.ethereum
          .request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainId: "0x" + CantoMainnet.chainId.toString(16),
                chainName: "Canto",
                nativeCurrency: {
                  name: "Canto Coin",
                  symbol: "CANTO",
                  decimals: 18,
                },
                rpcUrls: [NodeAddresses.CantoMainnet.Plex.rpcUrl],
                blockExplorerUrls: [CantoMainnet.blockExplorerUrl],
              },
            ],
          })
          .catch((error: unknown) => {
            console.error(error);
          });
      }
    }
  }
}
