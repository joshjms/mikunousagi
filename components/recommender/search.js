import Image from "next/image";

import { useState, useEffect, useRef } from "react";
import axios from "axios";

export default function Search({ select }) {
    const [search, setSearch] = useState("");
    const [showResults, setShowResults] = useState(false);
    const [searchResults, setSearchResults] = useState([]);

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
                return [];
            });
        setSearchResults(res);
    };

    useEffect(() => {
        if (search.length) {
            getSearchResults(search);
        }
    }, [search]);

    const timeoutRef = useRef(null);

    function handleSearchFocus() {
        clearTimeout(timeoutRef.current);
    }

    function handleBlur() {
        timeoutRef.current = setTimeout(() => {
            setShowResults(false);
        }, 200);
    }

    const searchList =
        search.length === 0 || showResults === false ? null : (
            <div className="mt-1 rounded absolute w-full bg-white border" onClick={handleSearchFocus}>
                {searchResults.map((e, i) => (
                    <div
                        className="cursor-pointer flex gap-5 items-center hover:bg-gray-100"
                        key={i}
                        onClick={() => {
                            select(e);
                            setSearch("");
                        }}
                    >
                        <Image
                            src={e.image_url}
                            width={100}
                            height={100}
                            className="h-12 w-12 object-cover rounded"
                            alt="cover"
                        />
                        <p>{e.title}</p>
                    </div>
                ))}
            </div>
        );

    return (
        <>
            <div className="w-full relative">
                <div
                    className={`relative flex py-1 px-2 rounded-full`}
                >
                    <input
                        className="border py-2 px-3 focus:border-black ease-in-out duration-300 focus:outline-none rounded-lg w-full"
                        placeholder="Yuru Yuri"
                        onChange={(e) => {
                            setSearch(e.target.value);
                            setShowResults(true);
                        }}
                        onBlur={handleBlur}
                    ></input>
                </div>

                {searchList}
            </div>
        </>
    );
}
