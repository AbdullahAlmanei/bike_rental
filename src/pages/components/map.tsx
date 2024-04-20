'use client'

import React from "react";
import { useEffect } from "react";
import { Loader } from "@googlemaps/js-api-loader";

interface Props {
    lat: number
    long: number
    bike_id: string
  }
  

export const Map = ({lat, long, bike_id}: Props) => {
    const mapRef = React.useRef<HTMLDivElement>(null)
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
        <div style={{height: '600px', width: '600px'}} ref={mapRef}></div>
    )
};
