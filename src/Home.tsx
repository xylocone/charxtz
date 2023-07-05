import { useEffect, useState, useRef } from "react";
import { Card, Badge, Progress, TextInput, Button } from "flowbite-react";
import { motion } from "framer-motion";

// Internal dependencies
import type { ContractStorage, CharityComponentProps } from "./types";
import { getStorage, donate, getConnectedWalletAccountAddress } from "./api";
import { Header } from "./components/Header";
import { Footer } from "./components/Footer";

const HomePage = () => {
  const [storage, setStorage] = useState<ContractStorage | null>(null);

  async function updateStorage() {
    setStorage(await getStorage());
  }

  useEffect(() => {
    updateStorage();
  }, []);

  return (
    <main>
      <div className="text-white bg-gray-950 rounded-b-[5rem]">
        <Header />
        <div className="flex items-center justify-center min-h-[50vh]">
          <h1 className="text-center p-12 text-6xl font-sans font-bold translate-y-[-1rem]">
            Charity that Matters.
          </h1>
        </div>
      </div>
      <div className="p-4 min-h-[50vh]">
        {storage && <CharityComponent storage={storage} />}
      </div>
      <Footer />
    </main>
  );
};

// Utility function to truncate string to desired number of characters
function truncate(str: string, n: number) {
  return str.length > n ? str.slice(0, n - 1) + "..." : str;
}

// Utility function to copy to clipboard
function copyToClipboard(text: string) {
  navigator.clipboard.writeText(text);
}

export function CharityComponent(props: CharityComponentProps) {
  const amountRef = useRef<HTMLInputElement>(null);
  let { title, target, donations, total_fund, timestamp, charity } =
    props.storage;

  total_fund = total_fund / 1e6; // convert mutez to tez
  target = target / 1e6; // convert mutez to tex

  const handleDonation = async () => {
    if (amountRef.current) {
      const amountToDonate = parseInt(amountRef.current.value, 10);
      if (await getConnectedWalletAccountAddress()) {
        console.log(await getConnectedWalletAccountAddress());
        if (amountToDonate > 0) {
          await donate(amountToDonate);
          window.location.reload();
        } else alert("You need to enter a valid donation amount.");
      } else alert("You need to connect your wallet first.");
    }
  };

  return (
    <motion.div animate={{ y: 0, opacity: 1 }} initial={{ y: 10, opacity: 0 }}>
      <Card className="my-4 border-2 md:max-w-[80vw] m-auto">
        <div>
          <Badge color="purple" className="px-2 w-fit rounded-xl">
            {new Date(timestamp).toLocaleDateString("en-us", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Badge>
          <h3 className="font-semibold text-[1.5rem]">{title}</h3>
          <p className="my-4 text-sm font-medium">
            <span className="text-slate-900">Charity Address: </span>
            <span
              className="text-ellipsis"
              onClick={() => copyToClipboard(charity)}
            >
              {truncate(charity, 20)}
            </span>
          </p>
          <div>
            <div>
              <Progress color="purple" progress={(total_fund / target) * 100} />
              <p className="text-sm font-semibold">
                {Math.min(total_fund, target)} XTZ
                <span className="text-slate-900"> out of </span> {target} XTZ
                <span className="text-slate-900"> collected</span>
              </p>
            </div>
          </div>
          <div className="flex gap-2 my-4">
            <TextInput
              ref={amountRef}
              placeholder="100"
              required
              type="number"
              className="basis-0 grow-[8]"
            />
            <Button
              className="basis-0 grow-[4] uppercase"
              onClick={async () => await handleDonation()}
              gradientDuoTone="purpleToBlue"
            >
              Donate
            </Button>
          </div>
          <Donations donations={donations} />
        </div>
      </Card>
    </motion.div>
  );
}

interface DonationsProps {
  donations: { [key: string]: number };
}

function Donations(props: DonationsProps) {
  return (
    <div>
      <hr />
      <h3 className="my-2 font-medium uppercase text-md">Donors </h3>
      <div className="max-h-[200px] overflow-auto">
        {Object.keys(props.donations).map((addr) => (
          <div key={addr} className="flex items-center gap-4">
            <Badge
              className="my-1 p-2 basis-0 grow-[8]"
              onClick={() => copyToClipboard(addr)}
            >
              {truncate(addr, 20)}
            </Badge>
            <span className="inline-block basis-0 grow-[4] text-right text-sm font-semibold">
              {props.donations[addr] / 1e6} XTZ
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default HomePage;
