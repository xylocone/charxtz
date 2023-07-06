import { Button } from "flowbite-react";
import { useState, useEffect } from "react";

// Internal dependencies
import { connectWallet, getConnectedWalletAccountAddress } from "../tezos";

function Header() {
  const [userAddress, setUserAddress] = useState<string | null>(null);

  const handleConnect = async () => {
    try {
      await connectWallet();
      const address = await getConnectedWalletAccountAddress();
      if (address) setUserAddress(address);
    } catch (e) {
      alert(`There was an error connecting your wallet: ${e} `);
    }
  };

  useEffect(() => {
    async function updateConnectedWalletAccountAddress() {
      const connectedWalletAccountAddress =
        await getConnectedWalletAccountAddress();

      if (connectedWalletAccountAddress)
        setUserAddress(connectedWalletAccountAddress);
    }

    updateConnectedWalletAccountAddress();
  }, []);

  return (
    <header className="flex items-center justify-between px-4 py-2">
      <a href="/">
        <h2 className="p-2 font-mono text-lg font-extrabold tracking-widest border border-white">
          CharXTZ
        </h2>
      </a>
      <Button
        gradientDuoTone="purpleToPink"
        className="font-medium uppercase"
        onClick={async () => await handleConnect()}
        disabled={!!userAddress}
      >
        {userAddress ? `${userAddress.slice(1, 5)}...` : "Connect"}
      </Button>
    </header>
  );
}

export { Header };
