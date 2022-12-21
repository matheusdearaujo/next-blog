import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import "../styles/globals.css";
import "bytemd/dist/index.css";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Component {...pageProps} />
    </SessionProvider>
  );
}
