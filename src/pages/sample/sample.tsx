import { Window as KeplrWindow } from "@keplr-wallet/types";
import { useState } from "react";
import {
  coin,
  SigningStargateClient,
  GasPrice,
  accountFromAny,
  Account,
} from "@cosmjs/stargate";
import { InjectiveTypesV1Beta1Account } from "@injectivelabs/core-proto-ts";
import { Any } from "cosmjs-types/google/protobuf/any";
import { getBlockTimestamp } from "./utils";
import { CantoMainnet } from "global/config/networks";

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Window extends KeplrWindow {}
}
const Sample = () => {
  const chainId = "injective-1";
  const [userKeplrAddress, setUserKeplrAddress] = useState("");
  const [balance, setBalance] = useState("0");
  const [keplrClient, setKeplrClient] = useState<SigningStargateClient>();
  const [amount, setAmount] = useState("");
  const [cantoAdd, setcantoAdd] = useState("");

  async function connectKeplr() {
    if (!window.keplr) {
      //show user link to download keplr
      console.error("no keplr installed");
    } else {
      await window.keplr.enable(chainId);
      const offlineSinger = window.keplr.getOfflineSigner(chainId);
      const accounts = await offlineSinger.getAccounts();
      setUserKeplrAddress(accounts[0].address);
      const client = await SigningStargateClient.connectWithSigner(
        "https://injective-rpc.polkachu.com",
        offlineSinger,
        {
          gasPrice: GasPrice.fromString("300000inj"),
          accountParser: (accountData) => {
            if (accountData.typeUrl === "/injective.types.v1beta1.EthAccount") {
              return injectiveAccountParser(accountData);
            }
            return accountFromAny(accountData);
          },
        }
      );
      setKeplrClient(client);
      const balance = await client.getBalance(accounts[0].address, "inj");
      setBalance(balance.amount);
    }
  }

  function injectiveAccountParser(accountData: Any): Account {
    const account = InjectiveTypesV1Beta1Account.EthAccount.decode(
      accountData.value as Uint8Array
    );
    const baseAccount = account.baseAccount!;
    const pubKey = baseAccount.pubKey;
    return {
      address: baseAccount.address,
      pubkey: pubKey
        ? {
            type: "/injective.crypto.v1beta1.ethsecp256k1.PubKey",
            value: Buffer.from(pubKey.value).toString("base64"),
          }
        : null,
      accountNumber: parseInt(baseAccount.accountNumber, 10),
      sequence: parseInt(baseAccount.sequence, 10),
    };
  }
  async function sendIBC() {
    const blockTimestamp = await getBlockTimestamp(
      CantoMainnet.cosmosAPIEndpoint
    );
    const ibcResponse = await keplrClient?.sendIbcTokens(
      userKeplrAddress,
      cantoAdd,
      coin(amount, "inj"),
      "transfer",
      "channel-99",
      undefined,
      Number(blockTimestamp),
      "auto",
      "ibc transfer" //memo
    );
  }
  return (
    <div>
      <button onClick={connectKeplr}>Connect to Injective</button>
      <h1>account data</h1>
      <div>address: {userKeplrAddress}</div>
      <div>balance: {balance}</div>
      <h1>Send</h1>
      <label>canto address to send to </label>
      <input value={cantoAdd} onChange={(e) => setcantoAdd(e.target.value)} />
      <br />
      <br />
      <label>enter amount to ibc (in wei)</label>
      <input value={amount} onChange={(e) => setAmount(e.target.value)} />
      <br />
      <button onClick={sendIBC}>SEND</button>
    </div>
  );
};

export default Sample;
