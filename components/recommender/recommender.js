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
                console.log(error.message);
                return null;
            });
        setRecManga(res);
    };

    useEffect(() => {
        if (manga === null) {
            setRecManga(null);
            return;
        }
        getRecommendations(manga.mal_id);
    }, [manga]);

    const reshuffleButton =
        manga === null ? null : (
            <div
                className="w-max mx-auto mt-3"
                onClick={() => {
                    getRecommendations(manga.mal_id);
                }}
            >
                <div className="p-3 rounded-2xl bg-pink-500 text-white hover:bg-pink-600 cursor-pointer duration-300 ease-in-out font-bold">
                    Reshuffle
                </div>
            </div>
        );

    return (
        <>
            <div
                id="#recommender"
                className="bg-gray-800 overflow-hidden relative py-12 px-4 min-h-screen"
            >
                <h1 className="text-4xl text-center font-extrabold text-white mb-5">
                    Enter a manga title
                </h1>

                <Search select={setManga} />

                {reshuffleButton}

                <Results manga={manga} rec={recManga} />
            </div>
        </>
    );
}
