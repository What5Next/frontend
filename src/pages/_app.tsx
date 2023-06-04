import Head from "next/head";
import type { AppProps } from "next/app";
import { useCallback, useEffect } from "react";

import "@/styles/globals.css";
import nearStore from "@/store/nearStore";

const USER_CONTRACT_ADDRESS = process.env.NEXT_PUBLIC_USER_CONTRACT;

const App = ({ Component, pageProps }: AppProps) => {
  const { init, setIsWalletStarted, setFtBalance } = nearStore();

  const initApp = useCallback(async () => {
    const wallet = init(USER_CONTRACT_ADDRESS);

    try {
      await wallet?.startUp();
      setIsWalletStarted(true);
    } catch (e) {
      console.error(e);
    }
  }, [init, setIsWalletStarted]);

  useEffect(() => {
    initApp();
  }, [initApp]);

  return (
    <>
      <Head>
        <title>onstage</title>
        <meta name="description" content="Author's Image generate NFT" />
        <link rel="icon" href="/svgs/onstage-logo.svg" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="Web3, AI-Image, Near, Coummunity" />
        <meta name="og:site_name" content="onstage" />
        <meta name="og:title" content="AI NFT App" />
        <meta name="og:description" content="Author's Image generate NFT" />
        <meta
          name="og:url"
          content="https://frontend-onstage-nft.vercel.app/"
        />
        <meta name="og:type" content="website" />
        <meta name="og:image" content="/svgs/onstage-logo.svg" />
      </Head>

      <Component {...pageProps} />
    </>
  );
};

export default App;
