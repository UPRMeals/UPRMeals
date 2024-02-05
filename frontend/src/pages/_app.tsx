import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  console.log("now this should print all of the time");
  return <Component {...pageProps} />;
}
