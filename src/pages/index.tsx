import type { NextPage } from "next";
import { useEffect, useState, useRef } from "react";
import { Card, Badge, Progress, TextInput, Button } from "flowbite-react";
import { motion } from "framer-motion";

// Internal dependencies
import type { ContractStorage, CharityComponentProps } from "@/types";
import { getStorage, donate } from "@/api";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const HomePage: NextPage = () => {
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

export function CharityComponent(props: CharityComponentProps) {
  const amountRef = useRef<HTMLInputElement>(null);
  let { title, target, donations, total_fund, timestamp, charity } =
    props.storage;

  // Mock values

  title =
    "Charity drive for providing wheelchairs to specially-abled people in Kamla Nagar";
  target = 2500;
  (donations = {}),
    (total_fund = 500),
    (timestamp = 18451781118),
    (charity = "0x189189de23rjo");

  const handleDonation = async () => {
    if (amountRef.current) await donate(parseInt(amountRef.current.value, 10));
  };

  return (
    <motion.div animate={{ y: 0, opacity: 1 }} initial={{ y: 10, opacity: 0 }}>
      <Card className="my-4">
        <div>
          <Badge color="purple" className="w-fit px-2 rounded-xl">
            {new Date(timestamp * 1000).toLocaleDateString("en-us", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </Badge>
          <h3 className="font-semibold text-[1.5rem]">{title}</h3>
          <p className="my-4 font-medium text-lg">
            <span className="text-gray">Charity Address: </span> {charity}
          </p>
          <div>
            <Progress color="purple" progress={(total_fund / target) * 100} />
          </div>
          <div className="flex gap-2 my-4">
            <TextInput
              ref={amountRef}
              id="amount"
              placeholder="20"
              required
              type="number"
            />
            <Button onClick={async () => await handleDonation()}>Donate</Button>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export default HomePage;
