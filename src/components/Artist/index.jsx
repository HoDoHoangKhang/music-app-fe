import React from "react";
import { albumsData, assets, songsData } from "../../assets/assets";

import { HiCheckBadge } from "react-icons/hi2";
import { FaPlay } from "react-icons/fa";
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import SongItem from "../SongItem";
import ArtistItem from "./ArtistItem";
const Artist = () => {
    return (
        <div className="pb-4">
            <div className="h-[40vh] relative overflow-hidden flex items-end ">
                <div className="absolute inset-0">
                    <img
                        src="https://media-cdn-v2.laodong.vn/storage/newsportal/2024/10/19/1409990/Rhyder-7.jpg"
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover "
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black"></div>
                </div>

                <div className="absolute inset-0 bg-black/40"></div>
                <div className="px-6 z-10 mb-10">
                    <div className="flex items-center mb-2">
                        <HiCheckBadge className="text-2xl text-[#73c3ff]" />
                        <p className="text-[12px]">Nghệ sĩ được xác minh</p>
                    </div>
                    <p className="text-6xl font-black mb-6">Tăng Duy Tân</p>
                    <p>100.000 người nghe hằng tháng</p>
                </div>
            </div>
            <div>
                <div className="flex items-center pb-3 px-5 gap-4 border-[rgb(39,39,42)] border-b-1 bg-black ">
                    <button className="bg-[#1ED760] p-4 text-l rounded-full text-[black] cursor-pointer">
                        <FaPlay></FaPlay>
                    </button>
                    <button className="border-[1px] rounded-full px-3 py-1 font-bold text-[12px] cursor-pointer">
                        Đang theo dõi
                    </button>
                    <button className="text-2xl cursor-pointer">
                        <HiOutlineDotsHorizontal></HiOutlineDotsHorizontal>
                    </button>
                </div>
                <div className="px-6">
                    <h1 className="my-5 font-bold text-2xl">Popular</h1>

                    {songsData.map((item, index) => (
                        <div
                            onClick={() => playWithId(item.id)}
                            key={item.id}
                            className="hover:bg-zinc-700/30 transition-colors  grid grid-cols-3 sm:grid-cols-3 gap-2 p-2 items-center text-[#a7a7a7] rounded-sm cursor-pointer"
                        >
                            <div className="text-white text-[14px] flex items-center">
                                <b className="mr-4 text-[#a7a7a7]">
                                    {index + 1}
                                </b>
                                <img
                                    className="inline w-10 mr-5 rounded-sm"
                                    src={item.image}
                                    alt={item.name}
                                />
                                <div className="inline-block">
                                    <div>{item.name.slice(0, 20)}</div>
                                    <div className="text-[#a7a7a7]">
                                        {item.desc.slice(0, 20)}
                                    </div>
                                </div>
                            </div>
                            <p className="text-[12px] hidden sm:block">
                                10.000.000
                            </p>
                            <p className="text-[12px] text-center">
                                {item.duration}
                            </p>
                        </div>
                    ))}
                    <button className=" mt-2 font-bold text-gray-400 hover:text-white cursor-pointer">
                        See more
                    </button>
                </div>
                <div className="px-6">
                    <div className="flex items-center justify-between">
                        <h1 className="my-5 font-bold text-2xl">Albums</h1>
                        <button className="font-bold hover:underline hover:cursor-pointer">
                            Show all
                        </button>
                    </div>
                    <div className="flex overflow-auto over">
                        {songsData.map((item, index) => (
                            <SongItem
                                key={index}
                                name={item.name}
                                desc={item.desc}
                                id={item.id}
                                image={item.image}
                            />
                        ))}
                    </div>
                </div>
                <div className="px-6">
                    <div className="flex items-center justify-between">
                        <h1 className="my-5 font-bold text-2xl">
                            Fans also like
                        </h1>
                        <button className="font-bold hover:underline hover:cursor-pointer">
                            Show all
                        </button>
                    </div>
                    <div className="flex overflow-auto over">

                    <ArtistItem/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Artist;
