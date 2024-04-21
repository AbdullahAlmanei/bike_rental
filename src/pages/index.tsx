import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { Map } from "@components/pages/components/map";

import { api } from "@components/utils/api";
import {datesOverlap} from "@components/utils/helpers";

export default function Home() {
  const hello = api.post.hello.useQuery({ text: "from tRPC" });
  const {data: bikeData, error: bikeError, isLoading: loadingBikes } = api.bike.getAll.useQuery()
  const {data: resvData, error: resvError, isLoading: loadingResv } = api.reservation.getBikeReservations.useQuery({bikeId: "sd"});

  function handleClick(){
    const now = new Date()
    const tmrw = new Date()

    const rangeNow = {
      startDate: now,
      endDate: tmrw
    }
    const someOverlap = resvData?.some(resv => datesOverlap(rangeNow, {startDate: resv.startDate, endDate: resv.endDate} ))
    if(someOverlap)
      {
        console.log("overlap")
      }
    else console.log("meow")

  }
  return (
    <>
      <Head>
        <title>Bike Rentals!</title>
        <meta name="Your go-to destination for bike rentals! " />
        <link rel="icon" href="/bike.ico" />
      </Head>
      <main className=" flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#DAC0A3] to-[#EADBC8] mt-12	">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="text-5xl font-archivo-black font-bold tracking-tight text-white sm:text-[5rem]">
            Rent <span className="text-[#795458]">YOUR</span> bike today!
          </h1>
          <div className="grid grid-cols-5 gap-1 sm:grid-cols-4 md:gap-8">
            <div>
              {loadingBikes || loadingResv ? <div className=" text-center w-48 h-48 flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"> Loading </div> : bikeData?.map((bike) =>           
              <Link onClick={handleClick} key={bike.id}
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href={{ pathname: '/bike/[bikeId]', query: { bikeId: bike.id } }}
            ><h3 className="text-2xl font-bold">{bike.color}</h3>
            <div className="text-lg">
              {bike.model}
            </div></Link>)}
            </div>



          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-white">
              {hello.data ? hello.data.greeting : "Loading tRPC query..."}
            </p>
            <AuthShowcase />
          </div>
          <Map lat={24.7136} long={46.6753} bike_id={"mewo"}/>
        </div>
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
        className="rounded-full bg-white/10 px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"
        onClick={sessionData ? () => void signOut() : () => void signIn()}
      >
        {sessionData ? "Sign out" : "Sign in"}
      </button>
    </div>
  );
}
