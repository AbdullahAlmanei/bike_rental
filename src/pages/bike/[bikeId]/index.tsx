import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import { Map } from "@components/pages/components/map";
import { useRouter } from "next/router";
import redBike from "public/bike_image.png";
import Image from "next/image";

import { api } from "@components/utils/api";
import { datesOverlap } from "@components/utils/helpers";
import { useEffect, useState } from "react";

export default function Bike() {
  const router = useRouter();
  const bikeId = router.query.bikeId as string;
  const [startDate, setStart] = useState("");
  const [endDate, setEnd] = useState("");
  const [busy, setBusy] = useState(false);
  const createResv =  api.reservation.create.useMutation();
  const { data: sessionData } = useSession();

  const {
    data: bikeData,
    error: bikeError,
    isLoading: loadingBike,
  } = api.bike.getById.useQuery({ bikeId: bikeId });
  const {
    data: resvData,
    error: resvError,
    isLoading: loadingResv,
  } = api.reservation.getBikeReservations.useQuery({ bikeId: bikeId });

  function handleClick() {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const rangeNow = {
      startDate: start,
      endDate: end,
    };
    const someOverlap = resvData?.some((resv) =>
      datesOverlap(rangeNow, {
        startDate: resv.startDate,
        endDate: resv.endDate,
      }),
    );
    if (someOverlap) {
      console.log("overlap");
    } else {
      createResv.mutate({startDate: start, endDate: end, userId: typeof sessionData?.user === 'string' ? sessionData?.user : "none", bikeId: typeof bikeData?.id === 'string' ? bikeData?.id : 'none'}) // BAD PRACTICE
    }
  }
  useEffect(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const rangeNow = {
      startDate: start,
      endDate: end,
    };
    const someOverlap = resvData?.some((resv) =>
      datesOverlap(rangeNow, {
        startDate: resv.startDate,
        endDate: resv.endDate,
      }),
    );
    if (someOverlap) {
      setBusy(true);
    } else setBusy(false);
  }, [endDate, startDate]);

  return (
    <>
      <Head>
        <title>Bike Rentals!</title>
        <meta name="Your go-to destination for bike rentals! " />
        <link rel="icon" href="/bike.ico" />
      </Head>
      <main className=" flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#DAC0A3] to-[#EADBC8]	">
        <div className=" mt-12 container flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          <h1 className="font-archivo-black text-5xl font-bold tracking-tight text-white sm:text-[5rem]">
            Take <span className="text-[#795458]">ME</span> for a spin!
          </h1>
          <div className="items-center mb-20 flex">
            <div className="flex  max-w-fit flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20">
              <div className="flex max-w-xl flex-col items-center gap-4 rounded-xl text-white">
                <Image
                  height={200}
                  width={200}
                  alt={"bike"}
                  src={redBike}
                ></Image>
                <a>
                  <h2 className="font-archivo-black mb-8 text-9xl font-bold tracking-tight text-white sm:text-[3rem]">
                    {loadingBike ? (
                      <div className=" h-48 w-48 flex-col gap-4 rounded-xl bg-white/10 p-4 text-center text-white hover:bg-white/20">
                        {" "}
                        Loading{" "}
                      </div>
                    ) : (
                      <h3 className="font-bold">
                        {bikeData?.color + " " + bikeData?.model}
                      </h3>
                    )}
                  </h2>
                </a>
              </div>
              <div className="flex flex-row">
                <p className="text-xl font-bold">
                  You can take this beautiful bike on a ride around your area!{" "}
                </p>
              </div>
              <div className=" flex items-center justify-center space-x-6">
                <div className="flex flex-col">
                  <p className="text-xl font-bold">Start Time</p>
                  <input
                    onChange={(e) => {
                      setStart(e.currentTarget.value);
                    }}
                    type="datetime-local"
                    className="bg-[#DAC0A3]"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-xl font-bold">End Time</p>
                  <input
                    onChange={(e) => {
                      setEnd(e.currentTarget.value);
                    }}
                    type="datetime-local"
                    className="bg-[#DAC0A3]"
                  />
                </div>
                <button disabled={busy ? true : false}
                  className={busy ? "-mb-6 rounded-full bg-[#5a5147] px-10 py-3 font-semibold text-white no-underline transition" : "-mb-6 rounded-full bg-[#DAC0A3] px-10 py-3 font-semibold text-white no-underline transition hover:bg-white/20"}
                  onClick={handleClick}
                >
                  {!busy ? "Reserve" : "Not Available "}
                </button>
              </div>
            </div>
          </div>
          <div>
            <h2 className="font-archivo-black mb-8 text-5xl font-bold tracking-tight text-white sm:text-[3rem]">
              Where to <span className="text-[#795458]">find</span> me...
            </h2>
            {bikeData?.lat ? <Map lat={bikeData?.lat} long={bikeData?.lng} bike_id={bikeData?.id} />: <></>}
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
    { enabled: sessionData?.user !== undefined },
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
