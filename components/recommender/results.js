import Image from "next/image";
import Link from "next/link";
import { Inter } from "@next/font/google";
import OpenInNewIcon from '@mui/icons-material/OpenInNew';

const inter = Inter({ subsets: ["latin"] });

import styles from "./search.module.css";

import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Results({ manga, rec }) {
    if (manga === null) {
        return null;
    }

    if (rec === null) {
        return null;
    }

    return (
        <>
            <div className="mt-10 w-64 md:w-80 mx-auto flex flex-wrap justify-center">
                <div className="w-32 md:w-40 flex flex-col items-center">
                    <h3 className="md:text-xl font-medium text-center mb-5">
                        If you like
                    </h3>
                    <Image
                        src={manga.image_url}
                        alt="manga_cover"
                        width="300"
                        height="450"
                        className="w-[7.5rem] h-[11.25rem] object-cover object-center border rounded-lg"
                    />
                    <h3 className="mt-3 text-sm text-center mb-2">{manga.title}</h3>
                    <a href={`https://myanimelist.net/manga/${manga.id}`} target="_blank" rel="noreferrer">
                        <div className="text-xs px-3 py-2 rounded-lg border bg-white hover:bg-black hover:text-white cursor-pointer duration-300 ease-in-out">
                            <OpenInNewIcon fontSize="small" />
                        </div>
                    </a>
                </div>
                <div className="w-32 md:w-40 flex flex-col items-center">
                    <h3 className="md:text-xl font-medium text-center mb-5">
                        You might like
                    </h3>
                    <Image
                        src={rec.image_url}
                        alt="rec_cover"
                        width="300"
                        height="450"
                        className="w-[7.5rem] h-[11.25rem] object-cover object-center border rounded-lg"
                    />
                    <h3 className="mt-3 text-sm text-center mb-2">
                        {rec.title}
                    </h3>

                    <a href={`https://myanimelist.net/manga/${rec.id}`} target="_blank" rel="noreferrer">
                        <div className="text-xs px-3 py-2 rounded-lg border bg-white hover:bg-black hover:text-white cursor-pointer duration-300 ease-in-out">
                            <OpenInNewIcon fontSize="small" />
                        </div>
                    </a>
                </div>
            </div>
        </>
    );
}
