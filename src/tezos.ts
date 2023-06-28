import { TezosToolkit } from "@taquito/taquito";
import { BeaconWallet } from "@taquito/beacon-wallet";
import { NetworkType } from "@airgap/beacon-sdk";

const CONTRACT_ADDRESS = "KT1UfKHqLHiSqNTTpmPGNHcu9Lgm3k18qyRc";

const wallet = new BeaconWallet({
  name: "CharXTZ",
  preferredNetwork: NetworkType.GHOSTNET,
});

const tezos = new TezosToolkit("https://ghostnet.smartpy.io/");
tezos.setWalletProvider(wallet);

// Asynchronous function that pops up the Beacon SDK UI to connect the app to the user's wallet
const connectWallet = async () => {
  await wallet.requestPermissions();
};

// Asynchronous function to get the address of the user's connected account
const getConnectedWalletAccountAddress = async () => {
  const activeAccount = await wallet.client.getActiveAccount();
  if (activeAccount) {
    return activeAccount.address;
  }
  return;
};

const isConnected = async (): Promise<boolean> => {
  return !!(await getConnectedWalletAccountAddress());
};

export {
  tezos,
  connectWallet,
  isConnected,
  getConnectedWalletAccountAddress,
  CONTRACT_ADDRESS,
};
