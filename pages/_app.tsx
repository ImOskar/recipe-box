import "../styles/globals.css";
import type { AppProps } from "next/app";
import Layout from "../components/layout/Layout";
import { Analytics } from "@vercel/analytics/react";
import { SessionProvider } from "next-auth/react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";

TimeAgo.addDefaultLocale(en);

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider session={session}>
      <Layout>
        <Component {...pageProps} />
        <Analytics />
      </Layout>
    </SessionProvider>
  );
}
