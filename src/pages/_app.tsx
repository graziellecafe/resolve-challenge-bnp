import type { AppProps } from "next/app";
import Head from "next/head";

import "@/styles/globals.css";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import { ToastProvider } from "@/contexts/toast.context"


export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Teste Front-End - BNP</title>
      </Head>
      <ToastContainer />
      <ToastProvider>
        <Component {...pageProps} />
      </ToastProvider>
    </>
  );
}

