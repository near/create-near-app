import "@/styles/globals.css";

import type { AppProps } from "next/app";
import { Navigation } from "@/components/navigation";
import { NearProvider } from "@/hooks/useNear";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <NearProvider>
      <Navigation />
      <Component {...pageProps} />
    </NearProvider>
  );
}