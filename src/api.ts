// Internal dependencies
import {
  tezos,
  connectWallet,
  isConnected,
  getConnectedWalletAccountAddress,
  CONTRACT_ADDRESS,
} from "./tezos";
import type { ContractStorage } from "./types";

const API_URL = `https://api.ghostnet.tzkt.io/v1/contracts/${CONTRACT_ADDRESS}/storage`;

async function getStorage() {
  const response = await fetch(API_URL);
  const storage = (await response.json()) as ContractStorage;

  return storage;
}

async function donate(amount: number) {
  try {
    const contractInstance = await tezos.wallet.at(CONTRACT_ADDRESS);
    const op = await contractInstance.methods.donate().send({
      amount,
      mutez: false,
    });
    alert("Donation successfully initiated.");
    await op.confirmation(1);
    alert("Donation has been approved by at least one block.");
  } catch (err) {
    throw err;
  }
}

export {
  connectWallet,
  isConnected,
  getConnectedWalletAccountAddress,
  getStorage,
  donate,
};
