'use client'

import { useState, useEffect } from 'react';
import { countriesType } from "@/utils/types"
import dynamic from "next/dynamic"


const DynamicMap = dynamic(() => import('./dynamic-map'), { ssr: false })
export default function CustomMap({ data }: { data: countriesType }) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        // This hook only runs in the browser, safely confirming client context
        setIsClient(true);
    }, []);

    // Return a fallback (or null) during server rendering and initial hydration
    if (!isClient) {
        return null;
    }

    return (
        <DynamicMap data={data} />
    )
}