import { useNetworkInfo } from "global/stores/networkInfo";

const Sample = () => {
  //same page that displays account and chainId
  const networkInfo = useNetworkInfo();
  return (
    <div>
      <h1>SAMPLE PAGE:</h1>
      <div>account: {networkInfo.account}</div>
      <div>chainId: {networkInfo.chainId}</div>
      <button onClick={() => window.open("/sample/child", "_self")}>
        Interact With Smart Contract {"-->"}
      </button>
      <br />
      <button onClick={() => window.open("/sampleMulticall", "_self")}>
        View Multicall {"-->"}
      </button>
    </div>
  );
};

export default Sample;
