import Header from "@/components/header";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: "400" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${roboto.className}`}>
      <Header />
      <Component {...pageProps} />
    </div>
  );
}
