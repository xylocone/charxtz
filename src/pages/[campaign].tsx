import type { NextPage } from "next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const CampaignPage: NextPage = () => {
  const router = useRouter();

  useEffect(() => {
    // Code to be run when the component mounts and the router has been properly initialized
    if (!router.query) {
      return;
    }

    const campaign = router.query.campaign;

    // Now the 'campaign' id is available
  }, [router]);

  return <main>This is the Campaign page</main>;
};

export default CampaignPage;
