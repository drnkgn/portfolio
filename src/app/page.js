"use client"

import Image from "next/image";
import Card from "@/components/Card"
import { useState, useEffect, useRef } from "react"

function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}

export default function Home() {
    const [rotations, setRotations] = useState([])
    const deckRef = useRef(null)

    useEffect(() => {
        setRotations(Array.from({ length: 5 }, (_) => getRandomArbitrary(-10, 10)))
    }, [])

    return (
        <div className="absolute w-full h-full overflow-hidden">
            <div className="m-auto h-full w-4/5 flex flex-col">
                <header className="p-10">
                    <Image src="/portfolio/logo.svg" width={202} height={96} alt="Logo" />
                </header>
                <div className="w-full h-7/8">
                </div>
                <div ref={deckRef} className="w-full h-1/8">
                    {rotations.map((it, idx) => {
                        const rect = deckRef.current.getBoundingClientRect()

                        return (
                            <span key={idx}>
                                <Card
                                    sticky
                                    position={{ x: rect.width/6 * (idx+1), y: rect.y }}
                                    rotation={it} title={`Card ${idx}`} />
                            </span>
                        )
                    })}
                </div>
            </div>
        </div>
    );
}
