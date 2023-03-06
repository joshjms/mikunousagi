import Head from "next/head";
import Image from "next/image";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

import Recommender from "@/components/recommender/recommender";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
    const [ready, setReady] = useState(false);
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");

    const getResponse = async () => {
        const res = await axios
            .get(process.env.NEXT_PUBLIC_API_BASE_URL + "/test")
            .then((response) => {
                if (response.status === 200) {
                    setReady(true);
                }
            })
            .catch((error) => {
                setError(true);
                setErrorMessage(error.message);
            });
    };

    useEffect(() => {
        getResponse();
    }, []);

    if (error) {
        return (
            <>
                <Head>
                    <title>Error</title>
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
                    <div className="w-full h-screen flex items-center justify-center flex-col flex-wrap">
                        <h1 className="text-3xl font-bold mb-3">
                            An Error Occurred
                        </h1>
                        <p>Please report to joshjms1607@gmail.com</p>

                        <p className="text-red-600">Err: {errorMessage}</p>
                    </div>
                </main>
            </>
        );
    }

    if (!ready) {
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
                    <div className="w-full h-screen flex items-center justify-center flex-col flex-wrap">
                        <Image
                            src="/images/akarin.gif"
                            alt="Loading"
                            width={200}
                            height={310}
                        />
                    </div>
                </main>
            </>
        );
    }

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
            <main
                style={{
                    backgroundImage: "linear-gradient(rgba(4,9,30,0.5), rgba(4,9,30,0.7)), url(/images/yuruyuri.jpg)",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                }}
                className="bg-center bg-no-repeat bg-cover"
            >
                <Recommender />
            </main>

            <div className="bg-black text-white p-3">
                Joshua James @ NTU, 2023
            </div>
        </>
    );
}
