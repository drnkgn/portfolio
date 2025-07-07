"use client"

import Image from "next/image";
import Card from "@/components/Card"

export default function Home() {
    return (
        <div className="absolute w-full h-full overflow-hidden">
            <div className="m-auto h-full w-4/5">
                <header className="p-10">
                    <Image src="/portfolio/logo.svg" width={202} height={96} alt="Logo" />
                </header>
                <Card title="Card 1" />
            </div>
        </div>
    );
}
