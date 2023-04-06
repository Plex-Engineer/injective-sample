import { CallResult, useCalls } from "@usedapp/core";
import { Contract } from "ethers";
import {
  CantoMainnet,
  CantoCTokens,
  CantoTokenAddresses,
} from "global/config/networks";
import { cERC20Abi, routerAbi } from "global/config/abi";
import { formatUnits } from "ethers/lib/utils";

export function useSampleMultiCall() {
  const tokens = CantoCTokens;
  const priceFeedAddress = CantoTokenAddresses.PriceFeed;

  //canto contract
  const priceFeedContract = new Contract(priceFeedAddress, routerAbi);
  const calls =
    tokens?.map((token) => {
      //canto contract
      const cERC20Contract = new Contract(token.address, cERC20Abi);
      return [
        //0
        {
          contract: cERC20Contract,
          method: "getCash",
          args: [],
        },
        //1
        {
          contract: cERC20Contract,
          method: "exchangeRateStored",
          args: [],
        },
        //2
        {
          contract: priceFeedContract,
          method: "getUnderlyingPrice",
          args: [token.address],
        },
      ];
    }) ?? [];

  const results =
    useCalls(calls.flat(), {
      chainId: CantoMainnet.chainId,
    }) ?? {};

  const chuckSize = !tokens ? 0 : results.length / tokens.length;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let processedTokens: Array<any>;
  const array_chunks = (
    array: CallResult<Contract, string>[],
    chunk_size: number
  ) => {
    const rep = array.map((array) => array?.value);
    const chunks = [];

    for (let i = 0; i < array.length; i += chunk_size) {
      chunks.push(rep.slice(i, i + chunk_size));
    }
    return chunks;
  };
  if (chuckSize > 0 && results?.[0] != undefined && !results?.[0].error) {
    processedTokens = array_chunks(results, chuckSize);
    return processedTokens.map((tokenData, idx) => {
      const totalSupply = formatUnits(tokenData[0][0], tokens[idx].decimals);
      const exchangeRate = formatUnits(tokenData[1][0], 18);
      const price = formatUnits(tokenData[2][0], 36 - tokens[idx].decimals);

      return {
        totalSupply,
        exchangeRate,
        price,
        data: tokens[idx],
      };
    });
  }

  return [];
}
