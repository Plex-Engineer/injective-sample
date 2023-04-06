export const CantoMainnet = {
  name: "Canto Mainnet",
  symbol: "CANTO",
  chainId: 7700,
  rpcUrl: "https://mainnode.plexnode.org:8545",
  cosmosAPIEndpoint: "https://mainnode.plexnode.org:1317",
  isTestChain: false,
  blockExplorerUrl: "https://evm.explorer.canto.io/",
};

export const CantoTestnet = {
  name: "Canto Testnet",
  symbol: "CANTO",
  chainId: 740,
  rpcUrl: "https://eth.plexnode.wtf",
  cosmosAPIEndpoint: "https://chain.plexnode.wtf",
  isTestChain: true,
  blockExplorerUrl: "https://www.nothing.com",
};

export const NodeAddresses = {
  CantoMainnet: {
    ChandraRPC: "https://canto.evm.chandrastation.com",
    Plex: {
      rpcUrl: "https://mainnode.plexnode.org:8545",
      cosmosApi: "https://mainnode.plexnode.org:1317",
    },
  },
};

export const CantoTokenAddresses = {
  PriceFeed: "0xa252eEE9BDe830Ca4793F054B506587027825a8e",
  CNote: "0xEe602429Ef7eCe0a13e4FfE8dBC16e101049504C",
  CUSDC: "0xdE59F060D7ee2b612E7360E6C1B97c4d8289Ca2e",
  CUSDT: "0x6b46ba92d7e94FfA658698764f5b8dfD537315A9",
  CATOM: "0x617383F201076e7cE0f6E625D1a983b3D1bd277A",
  CETH: "0x830b9849e7d79b92408a86a557e7baaacbec6030",
  CCanto: "0xB65Ec550ff356EcA6150F733bA9B954b2e0Ca488",
};
interface Token {
  name: string;
  address: string;
  decimals: number;
}
export const CantoCTokens: Token[] = [
  {
    name: "CNote",
    address: CantoTokenAddresses.CNote,
    decimals: 18,
  },
  {
    name: "CUSDC",
    address: CantoTokenAddresses.CUSDC,
    decimals: 6,
  },
  {
    name: "CUSDT",
    address: CantoTokenAddresses.CUSDT,
    decimals: 6,
  },
  {
    name: "CATOM",

    address: CantoTokenAddresses.CATOM,
    decimals: 6,
  },
  {
    name: "CETH",
    address: CantoTokenAddresses.CETH,
    decimals: 18,
  },
  {
    name: "CCanto",
    address: CantoTokenAddresses.CCanto,
    decimals: 18,
  },
];
