import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

import { api } from "@components/utils/api";
import Link from "next/link";

export default function Layout(props: { children: React.ReactNode }) {
  return (
    <>
      <nav className="fixed start-0 top-0 z-20 w-full border-b border-gray-200  backdrop-blur-md">
        <div className="mx-auto flex max-w-screen-xl flex-wrap items-center justify-around p-2">
          <div className="flex space-x-1 md:order-2 md:space-x-0 rtl:space-x-reverse">
            <Link href={"/"} passHref>
              <Image src="/logo_darr.png" width={200} height={100} alt="Logo" />
            </Link>
          </div>
          <div className="flex space-x-3 md:order-2 justify-center md:w-1/5 md:space-x-0 rtl:space-x-reverse">
            <AuthShowcase />
          </div>
          <div
            className="hidden w-full items-center justify-center md:order-1 md:flex md:w-1/5"
            id="navbar-sticky"
          >
            <ul className="mt-4 flex flex-col rounded-lg border border-gray-100 p-4 font-medium md:mt-0 md:flex-row md:space-x-8 md:border-0 md:p-0 rtl:space-x-reverse dark:border-gray-700">
              <li>
                <Link
                  href="/"
                  className="block rounded px-3 py-2 font-bold hover:bg-gray-100 md:p-0 md:hover:bg-transparent md:hover:text-blue-700 md:dark:text-regal-blue md:dark:hover:text-blue-500"
                  aria-current="page"
                >
                  Home
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <main>{props.children}</main>
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <button
        className="font-archivo-black rounded-full bg-white/10 px-10 py-3 font-bold text-regal-blue no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
