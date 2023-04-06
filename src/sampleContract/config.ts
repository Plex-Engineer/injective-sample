export const sampleContractAddress = {
  testNet: "0xAE24E3e4057A61c94D30d93D1C5C02CDdB8E31ca",
  mainnet: "0x1401c332fE53a155d8d81d4bDef828f7f71BfAC8",
};

export const sampleContractAbi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [],
    name: "interact",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "timesInteracted",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];
