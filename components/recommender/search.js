import Image from "next/image";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

import styles from "./search.module.css";

import SearchIcon from "@mui/icons-material/Search";
import CircularProgress from "@mui/material/CircularProgress";

import { useState, useEffect } from "react";
import axios from "axios";

export default function Search({ select }) {
    const [search, setSearch] = useState("");
    const [searchResults, setSearchResults] = useState(null);

    const getSearchResults = async (title) => {
        const res = await axios
            .get(process.env.NEXT_PUBLIC_API_BASE_URL + "/manga", {
                params: {
                    title: title,
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
        setSearchResults(res);
    };

    useEffect(() => {
        if (search.length) {
            getSearchResults(search);
        }
    }, [search]);

    const searchList =
        search.length === 0 ? null : searchResults === null ? (
            <div className="bg-white mt-3 p-4 rounded-2xl absolute z-10 w-full">
                <CircularProgress />
            </div>
        ) : searchResults.length === 0 ? (
            <div className="bg-white mt-3 p-4 rounded-2xl absolute z-10 w-full">
                <p className="font-medium">No results found.</p>
            </div>
        ) : (
            <div className="bg-white mt-3 p-1 rounded-2xl absolute z-10 w-full">
                {searchResults.map((e, i) => (
                    <div
                        className="p-3 hover:bg-pink-500 hover:text-white cursor-pointer rounded-xl"
                        key={i}
                        onClick={() => {
                            select(e);
                            setSearch("");
                        }}
                    >
                        <p className="font-medium">{e.title}</p>
                    </div>
                ))}
            </div>
        );

    return (
        <>
            <div className="w-80 mx-auto relative">
                <div
                    className={`relative flex full bg-white py-1 px-2 rounded-full`}
                >
                    <input
                        tabIndex="0"
                        className={`focus:outline-none ${styles["form-input"]} z-10 relative w-[calc(100%-2.5rem)] rounded-full px-3 font-semibold`}
                        placeholder="Yuru Yuri"
                        value={search}
                        onChange={(e) => {
                            setSearch(e.target.value);
                        }}
                    ></input>
                    <div className="relative z-10 w-10 h-10 rounded-full border border-pink-500 text-pink-500 flex items-center justify-center hover:bg-pink-500 hover:text-white duration-300 ease-in-out cursor-pointer">
                        <SearchIcon />
                    </div>
                    <div
                        className={`absolute top-0 left-0 w-full h-full ${styles["searchbar"]} z-0 rounded-full duration-300`}
                    ></div>
                </div>

                {searchList}
            </div>
        </>
    );
}
