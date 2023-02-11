import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

import Hero from "@/components/hero/hero";
import Recommender from "@/components/recommender/recommender";

export default function Home() {
    return (
        <>
            <Head>
                <title>Usagi</title>
                <meta
                    name="description"
                    content="Manga Recommendations using AI"
                />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1"
                />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <Hero />
                <Recommender />
            </main>
        </>
    );
}
