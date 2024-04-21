'use client'

import React from "react";
import { useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

interface Props {
    lat: number | undefined
    long: number | undefined
    bike_id: string
  }
  

export const Map = ({lat= 24.7136, long= 46.6753, bike_id}: Props) => {
    const mapRef = React.useRef<HTMLDivElement>(null)
    if(typeof lat === 'undefined')
        {
            lat = 24.7136
        }
    if(typeof long === 'undefined')
        {
            long = 46.6753;
        }
    useEffect(() =>
    {
        const initMap = async () => {
            const loader = new Loader({
                apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY!,
                version: 'quarterly',
            })
            const {Map} = await loader.importLibrary('maps');
            const {Marker} = await loader.importLibrary('marker') 
            const position = {
                lat: lat,
                lng: long
            };

            const mapOptions: google.maps.MapOptions = {
                center: position,
                zoom: 16,
                mapId: bike_id
            };

            const map = new Map(mapRef.current!, mapOptions);
            const marker = new Marker({
                map: map,
                position: position,
            })
        }
        void initMap();
    }, [])

    return(
        <div style={{height: '500px', width: '500px'}} ref={mapRef}></div>
    )
};
