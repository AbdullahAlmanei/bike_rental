import { type Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { type AppType } from "next/app";
import { Inter } from "next/font/google";
import Layout from "./layout";
import { api } from "@components/utils/api";

import "@components/styles/globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <main className={`font-sans ${inter.variable}`}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </main>
    </SessionProvider>
  );
};

export default api.withTRPC(MyApp);
