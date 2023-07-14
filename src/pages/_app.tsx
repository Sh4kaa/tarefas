import "@/styles/globals.css";
import styles from '@/styles/home.module.css'
import type { AppProps } from "next/app";
import { Roboto } from "next/font/google";

const roboto = Roboto({ subsets: ["latin"], weight: "400" });

export default function App({ Component, pageProps }: AppProps) {
  return (
    <div className={`${roboto.className} ${styles.container}`}>
      <Component {...pageProps} />
    </div>
  );
}
