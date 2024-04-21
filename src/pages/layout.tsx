import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";

import { api } from "@components/utils/api";
import Link from "next/link";

export default function Layout(props: { children: React.ReactNode }) {


  return (
    <>
      <nav className='fixed w-full z-20 top-0 start-0 border-b border-gray-200  backdrop-blur-md'>
        <div className='max-w-screen-xl flex flex-wrap items-center justify-around mx-auto p-2'>
          <div className='flex md:order-2 space-x-1 md:space-x-0 rtl:space-x-reverse'>
            <Link href={"/"} passHref>
              <Image src="/logo_darr.png" width={200} height={100} alt="Logo" />
            </Link>
          </div>
          <div className='flex md:order-2 md:w-1/5 space-x-3 md:space-x-0 rtl:space-x-reverse'>
            <AuthShowcase/>

          </div>
          <div
            className='items-center justify-between hidden w-full md:flex md:w-1/5 md:order-1'
            id='navbar-sticky'
          >
            <ul className='flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg md:space-x-8 rtl:space-x-reverse md:flex-row md:mt-0 md:border-0   dark:border-gray-700'>
              <li>
                <Link
                  href='/'
                  className='block py-2 px-3 rounded font-bold hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 md:dark:text-regal-blue'
                  aria-current='page'
                >
                  Home
                </Link>
              </li>
              <li>
                <a
                  href={process.env.NEXT_PUBLIC_URL}
                  className='block py-2 px-3  rounded font-bold hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-regal-blue  dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                >
                  About
                </a>
              </li>
              <li>
                <Link
                  href='/'
                  className='block py-2 px-3 text-gray-900 rounded font-bold hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-regal-blue dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent dark:border-gray-700'
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href='/'
                  className='block py-2 px-3 text-gray-900 rounded font-bold hover:bg-gray-100 md:hover:bg-transparent md:hover:text-blue-700 md:p-0 md:dark:hover:text-blue-500 dark:text-regal-blue dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent '
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

            <main>
                {props.children}
            </main>
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.post.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-white">
        {sessionData && <span>Logged in as {sessionData.user?.name}</span>}
        {secretMessage && <span> - {secretMessage}</span>}
      </p>
      <button
        className="rounded-full bg-white/10 px-10 py-3 text-regal-blue font-archivo-black font-bold no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
