import Image from "next/image";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

import styles from "./search.module.css";

import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Results({ manga, rec }) {
    if (manga) console.log(manga.genres);

    if (manga === null) {
        return null;
    }

    if (rec === null) {
        return <CircularProgress />
    }

    return (
        <>
            <div className="mt-10 w-[max(20rem,60%)] mx-auto flex flex-wrap justify-center gap-10">
                <div className="w-60 flex flex-col items-center">
                    <h3 className="text-3xl font-bold text-center text-white mb-5">
                        If you like
                    </h3>
                    <Image
                        src={manga.image_url}
                        alt="manga_cover"
                        width="300"
                        height="450"
                        className="w-[15rem] h-[22.5rem] object-cover object-center rounded-xl"
                    />
                    <h3 className="mt-3 text-3xl font-bold text-center text-white mb-5">
                        {manga.title}
                    </h3>
                    <div className="flex justify-center gap-1 flex-wrap">
                        {manga.genres.map((e, i) => (
                            <p className="text-sm font-semibold px-3 py-1 bg-pink-500 text-white rounded-full" key={i}>{e}</p>
                        ))}
                    </div>
                </div>
                <div className="w-60 flex flex-col items-center">
                    <h3 className="text-3xl font-bold text-center text-white mb-5">
                        You might like
                    </h3>
                    <Image
                        src={rec.image_url}
                        alt="rec_cover"
                        width="300"
                        height="450"
                        className="w-[15rem] h-[22.5rem] object-cover object-center rounded-xl"
                    />
                    <h3 className="mt-3 text-3xl font-bold text-center text-white mb-5">
                        {rec.title}
                    </h3>
                    <div className="flex justify-center gap-1 flex-wrap">
                        {rec.genres.map((e, i) => (
                            <p className="text-sm font-semibold px-3 py-1 bg-pink-500 text-white rounded-full" key={i}>{e}</p>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}
