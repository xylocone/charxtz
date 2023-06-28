import Link from "next/link";
import { Button } from "flowbite-react";
import { useState } from "react";

// Internal dependencies
import { connectWallet, getConnectedWalletAccountAddress } from "@/tezos";

function Header() {
  const [userAddress, setUserAddress] = useState<string | null>(null);

  const handleConnect = async () => {
    try {
      await connectWallet();
      const address = await getConnectedWalletAccountAddress();
      if (address) setUserAddress(address);
    } catch (e) {
      console.error("There was an error connecting your wallet: ", e);
    }
  };

  return (
    <header className="flex justify-between py-2 px-4 items-center">
      <Link href="/">
        <h2 className="text-lg p-2 font-mono font-extrabold tracking-widest border border-white">
          CharXTZ
        </h2>
      </Link>
      <Button
        gradientDuoTone="purpleToPink"
        className="uppercase font-medium"
        onClick={async () => await handleConnect()}
        disabled={!!userAddress}
      >
        {userAddress ? `${userAddress.slice(1, 5)}...` : "Connect"}
      </Button>
    </header>
  );
}

export { Header };
