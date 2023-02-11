import Image from "next/image";
import { Inter } from "@next/font/google";

const inter = Inter({ subsets: ["latin"] });

import styles from "./hero.module.css";

export default function Hero() {
    return (
        <>
            <div id="#hero" className="bg-white overflow-hidden relative h-[500px]">
                <div className="text-start lg:w-1/2 flex items-center h-full px-4 sm:px-6 lg:py-16 lg:px-8 z-20">
                    <h2 className="text-6xl font-extrabold text-black">
                        <span className="block mb-3">
                            Never run out of manga again.
                        </span>
                        <span className="block text-pink-500">
                            Find sauce!
                        </span>
                    </h2>
                </div>

                <Image
                    src="/images/yuruyuri.jpg"
                    alt="yuruyuri"
                    width={6012}
                    height={4082}
                    className={
                        "absolute top-0 right-0 hidden h-full max-w-[50%] lg:block object-cover z-2 m-10 rounded-2xl shadow-xl border-4 shadow-pink-800 border-pink-500"
                    }
                />
            </div>
        </>
    );
}
