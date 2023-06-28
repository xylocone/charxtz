import type { NextPage } from "next";
import { useEffect, useState } from "react";

// Internal dependencies
import { getFundInTez } from "@/api";

const HomePage: NextPage = () => {
  const [fund, setFund] = useState<number>(0);

  useEffect(() => {
    async function updateFund() {
      setFund(await getFundInTez());
    }
    updateFund();
  }, []);

  return <main>Current fund is {fund}</main>;
};

export default HomePage;
