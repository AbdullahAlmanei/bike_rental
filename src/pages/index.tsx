import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";

import { api } from "@components/utils/api";
import { useState } from "react";

export default function Home() {
  const { data: sessionData } = useSession();
  const dltBike = api.bike.delete.useMutation();
  const [color, setColor] = useState("");
  const [model, setModel] = useState("");
  const [lat, setLat] = useState(0);
  const [long, setLong] = useState(0);
  const createBike =  api.bike.create.useMutation();


  const {
    data: userData,
    error: userError,
    isLoading: loadingUser,
  } = api.user.getById.useQuery({
    userId:
      typeof sessionData?.user.id === "string" ? sessionData?.user.id : "erorr",
  });

  const {
    data: bikeData,
    error: bikeError,
    isLoading: loadingBikes,
  } = api.bike.getAll.useQuery();
  function deleteBike(bike_id: string) {
    dltBike.mutate({ bikeId: bike_id });
  }

  return (
    <>
      <Head>
        <title>Bike Rentals!</title>
        <meta name="Your go-to destination for bike rentals! " />
        <link rel="icon" href="/bike.ico" />
      </Head>
      <main className=" flex min-h-screen flex-col items-center justify-start bg-gradient-to-b from-[#DAC0A3] to-[#EADBC8]	">
        <div className=" container mt-12 flex flex-col items-center justify-center gap-12 px-4 py-16 ">
          {userData?.Admin ? (
            <div className="flex flex-col justify-center items-center ">
              <div className="flex flex-row items-start justify-start space-x-6 mb-2">
                <p>Model: </p>
                <input type="text" onChange={(e) => {
                      setModel(e.currentTarget.value);
                    }}  className=" max-w-40"/>
                <p>Color: </p>
                <input type="text" onChange={(e) => {
                      setColor(e.currentTarget.value);
                    }} className=" max-w-40"/>
              </div>
              <div className="flex flex-row items-start space-x-6 mb-6">
              <p>Latitude: </p>
                <input type="number" onChange={(e) => {
                      setLat(Number(e.currentTarget.value));
                    }} className=" max-w-40"/>
                <p>Longitude: </p>
                <input type="number" onChange={(e) => {
                      setLong(Number(e.currentTarget.value));
                    }} className=" max-w-40"/>
                
              </div>
              <button disabled={(color === "" || model === "" || lat === 0 || long === 0) ? true : false} onClick={()=> createBike.mutate({color: color, model: model, lat: lat, lng: long})}className={ (color === "" || model === "" || lat === 0 || long === 0) ?"-mb-6 rounded-full bg-[#312f2c] px-10 py-3 font-semibold text-white no-underline transition ": "-mb-6 max-w-xs rounded-full bg-[#5a5147] px-10 py-3 font-semibold text-white no-underline transition hover:bg-[#86745e]"  }>
                Create Bike
              </button>
            </div>
          ) : (
            <></>
          )}
          <h1 className="font-archivo-black text-5xl font-bold tracking-tight text-white sm:text-[5rem]">
            Rent <span className="text-[#795458]">YOUR</span> bike today!
          </h1>
          <div className="grid grid-cols-5 gap-1 sm:grid-cols-4 md:gap-8">
              {loadingBikes ? (
                <div className=" h-48 w-48 flex-col gap-4 rounded-xl bg-white/10 p-4 text-center text-white hover:bg-white/20">
                  {" "}
                  Loading{" "}
                </div>
              ) : (
                bikeData?.map((bike) => (
                  <div className="flex max-w-xs flex-col gap-4 rounded-xl" key={bike.id}>
                    <Link
                      key={bike.id}
                      className="flex max-w-xs flex-col gap-4 rounded-xl  bg-white/10 p-4 text-white hover:bg-white/20"
                      href={{
                        pathname: "/bike/[bikeId]",
                        query: { bikeId: bike.id },
                      }}
                    >
                      <h3 className="text-2xl font-bold">{bike.model}</h3>
                      <div className="text-lg">{bike.color}</div>
                    </Link>
                    {userData?.Admin ? (
                      <button
                        onClick={() => deleteBike(bike.id)}
                        className="-mb-6 rounded-full bg-[#5a5147] px-10 py-3 font-semibold text-white no-underline transition hover:bg-[#86745e]"
                      >
                        Delete
                      </button>
                    ) : (
                      <></>
                    )}
                  </div>
                ))
              )}
          </div>
        </div>
      </main>
    </>
  );
}
