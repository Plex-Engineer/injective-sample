import { useSampleMultiCall } from "hooks/useMultiCall";

export const SampleMulticall = () => {
  const multiCallData = useSampleMultiCall();
  return (
    <div>
      <h1>SAMPLE MULTICALL: </h1>
      <p style={{ color: "red" }}>
        many calls can be made together into one multicall to save loading time
      </p>
      {multiCallData.map((data, index) => {
        return (
          <div key={index}>
            <p style={{ color: "aqua" }}>cTokenName: {data.data.name}</p>
            <p>underlying price: {data.price}</p>
            <p>exchange rate: {data.exchangeRate}</p>
            <p>total supply of cToken: {data.totalSupply}</p>
            <br />
          </div>
        );
      })}
      <button onClick={() => window.open("/", "_self")}>
        {"<----- go back"}
      </button>
    </div>
  );
};
