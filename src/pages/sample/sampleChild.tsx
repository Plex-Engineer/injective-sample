import { useContractFunction } from "@usedapp/core";
import { Contract, ethers } from "ethers";
import { CantoMainnet, CantoTestnet } from "global/config/networks";
import { useEffect, useState } from "react";
import {
  sampleContractAbi,
  sampleContractAddress,
} from "sampleContract/config";

interface SampleChildProps {
  chainId: number | undefined;
}
export const SampleChild = (props: SampleChildProps) => {
  const [timesInteracted, setTimesInteracted] = useState("0");
  //getting contract information for view functions
  const onMainnet = props.chainId == CantoMainnet.chainId;
  const provider = new ethers.providers.JsonRpcProvider(
    onMainnet ? CantoMainnet.rpcUrl : CantoTestnet.rpcUrl
  );
  const sampleContract = new Contract(
    onMainnet ? sampleContractAddress.mainnet : sampleContractAddress.testNet,
    sampleContractAbi,
    provider
  );
  //getting contract for write functions
  const { state, send } = useContractFunction(sampleContract, "interact");

  async function getTimesInteracted() {
    setTimesInteracted((await sampleContract.timesInteracted()).toString());
  }
  useEffect(() => {
    getTimesInteracted();
  }, [state.status]);

  return (
    <div>
      <h1>Interacting With Smart Contracts</h1>
      <h2>
        You are on:{" "}
        <a style={{ color: "red" }}>{onMainnet ? "mainnet" : "testnet"}</a>
      </h2>
      <h2>
        Times interacted with smart contract:{" "}
        <a style={{ color: "red" }}>{timesInteracted}</a>
      </h2>
      <h2>
        Status: <a style={{ color: "red" }}>{state.status}</a>
      </h2>
      <button onClick={() => send()}>INTERACT</button>
      <br />
      <button onClick={() => window.open("/", "_self")}>
        {"<----- Go Back"}
      </button>
    </div>
  );
};
