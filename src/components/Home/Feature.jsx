import React from "react";
import { FaPlay, FaInstagram, FaTwitter, FaEllipsisH } from "react-icons/fa";
const Feature = () => {
    return (
        <div className="relative h-[50vh] 2xl:h-[40vh]  rounded-sm overflow-hidden mb-4">
            <div className="absolute inset-0 ">
                <img
                    src="https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=1200&h=400"
                    alt="test"
                    className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black"></div>
            </div>

            <div className="relative h-full px-8 flex flex-col justify-end pb-12">
                <div className="flex items-center space-x-4 mb-4">
                    <div className="flex items-center space-x-3">
                        <FaInstagram className="text-xl cursor-pointer hover:text-green-500 transition-colors" />
                        <FaTwitter className="text-xl cursor-pointer hover:text-green-500 transition-colors" />
                    </div>
                    <span className="text-sm text-gray-300">
                        20,794,000 monthly listeners
                    </span>
                </div>

                <h1 className="text-5xl 2xl:text-7xl font-bold mb-8">Daft Punk</h1>

                <div className="flex items-center space-x-4">
                    <button className="hover:cursor-pointer px-8 py-2 bg-green-500 rounded-full hover:bg-green-400 transition-colors flex items-center space-x-2">
                        <FaPlay className="text-black" />
                        <span>Play</span>
                    </button>
                    <button className="hover:cursor-pointer px-8 py-2 bg-transparent border border-white rounded-full hover:bg-white/10 transition-colors">
                        Follow
                    </button>
                    <button className="hover:cursor-pointer w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                        <FaEllipsisH />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Feature;
