import Image from "next/image";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

import { useEffect, useState } from "react";

import Search from "./search";
import Results from "./results";

import axios from "axios";

export default function Recommender() {
    const [manga, setManga] = useState(null);
    const [recManga, setRecManga] = useState(null);

    const getRecommendations = async (id) => {
        const res = await axios
            .get(process.env.NEXT_PUBLIC_API_BASE_URL + "/rec", {
                params: {
                    id: id,
                },
            })
            .then((response) => {
                if (response.status === 200) {
                    return response.data;
                }
            })
            .catch((error) => {
                return null;
            });
        setRecManga(res);
    };

    useEffect(() => {
        if (manga === null) {
            setRecManga(null);
            return;
        }
        getRecommendations(manga.id);
    }, [manga]);

    const reshuffleButton =
        manga === null ? null : (
            <div
                className="w-max mx-auto mt-3 text-sm"
                onClick={() => {
                    getRecommendations(manga.id);
                }}
            >
                <div className="px-3 py-2 rounded-lg border bg-white hover:bg-black hover:text-white cursor-pointer duration-300 ease-in-out">
                    Reshuffle
                </div>
            </div>
        );

    return (
        <>
            <div
                id="#recommender"
                className="w-80 md:w-96 mx-auto overflow-hidden relative py-12 px-4 min-h-screen bg-gray-100"
            >
                <h1 className="text-3xl font-bold text-center mb-5">Usagi</h1>
                <Search select={setManga} />

                {reshuffleButton}

                <Results manga={manga} rec={recManga} />
            </div>
        </>
    );
}
