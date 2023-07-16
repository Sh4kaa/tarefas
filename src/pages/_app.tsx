import Header from "@/components/header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";
import { SessionProvider } from "next-auth/react";

const roboto = Roboto({ subsets: ["latin"], weight: "400" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <SessionProvider session={pageProps.session}>
      <div className={`${roboto.className}`}>
        <Header />
        <Component {...pageProps} />
      </div>
    </SessionProvider>
  );
}
