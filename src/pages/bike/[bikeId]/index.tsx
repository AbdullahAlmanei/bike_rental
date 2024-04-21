import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import { Map } from "@components/pages/components/map";
import { useRouter } from 'next/router';
import {bikeInterface} from '@components/server/api/routers/bike'

import { api } from "@components/utils/api";
import { useEffect, useState } from "react";



export default  function Bike() {
  const router = useRouter();
  const bikeId  = router.query.bikeId as string;
  const {data: bikeData, error: bikeError, isLoading: loadingBike } = api.bike.getById.useQuery({bikeId: bikeId});
  


  // const [bike, setBike] = useState<bikeInterface>({id: '0', model: '',
  // color: '',
  // available: false,
  // rating: 0,
  // lat: 0,
  // lng: 0});
  
  // useEffect(() => {
  //   if(typeof bikeId === 'string'){
  //     const {data: bikeData, error: bikeError, isLoading: loadingBike } = api.bike.getById.useQuery({bikeId: bikeId});
  //     if(bikeData)
  //     setBike(bikeData)
  //   }
  // }, [bikeId])

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
            Take <span className="text-[#795458]">ME</span> for a spin!
          </h1>
          <div className="grid grid-cols-5 gap-1 sm:grid-cols-4 md:gap-8">
            {<div>
              {loadingBike ? <div className=" text-center w-48 h-48 flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"> Loading </div> :        
              <Link  key={bikeData?.id}
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href='/bike'
            ><h3 className="text-2xl font-bold">{bikeData?.color}</h3>
            <div className="text-lg">
              {bikeData?.model}
            </div></Link>}
            </div> }

          </div>
          <div>
            <h2 className="text-5xl font-archivo-black font-bold tracking-tight mb-8 text-white sm:text-[3rem]">
              Where to <span className="text-[#795458]">find</span> me...
            </h2>
            <Map lat={bikeData?.lat} long={bikeData?.lng} bike_id={"mewo"}/>
          </div>
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
