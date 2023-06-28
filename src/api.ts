// Internal dependencies
import {
  connectWallet,
  getConnectedWalletAccountAddress,
  CONTRACT_ADDRESS,
} from "./tezos";
import type { ContractStorage } from "./types";

const API_URL = `https://api.ghostnet.tzkt.io/v1/contracts/${CONTRACT_ADDRESS}/storage`;

async function getFundInMutez() {
  const response = await fetch(API_URL);
  const storage = (await response.json()) as ContractStorage;

  return storage.fund;
}

async function getFundInTez() {
  const mutez = await getFundInMutez();
  return mutez / 1e6;
}

async function getAddressesAndAmts() {
  const response = await fetch(API_URL);
  const storage = JSON.parse(await response.json()) as ContractStorage;

  return storage.addressAndAmts;
}

export {
  connectWallet,
  getConnectedWalletAccountAddress,
  getFundInMutez,
  getFundInTez,
  getAddressesAndAmts,
};
