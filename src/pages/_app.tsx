import type { AppProps } from "next/app";
import Head from "next/head";

import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Teste Front-End - BNP</title>
      </Head>
      <ToastContainer />
        <Component {...pageProps} />

    </>
  );
}

