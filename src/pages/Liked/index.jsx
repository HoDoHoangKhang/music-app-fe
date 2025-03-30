import React, { useEffect, useState } from "react";
// Cài đặt react-icons nếu cần: npm install react-icons
import { FaHeart } from "react-icons/fa";

import { FaPlay } from "react-icons/fa6";
import { FaEllipsisH } from "react-icons/fa";
import { LuClock3 } from "react-icons/lu";
import SongRow from "../../components/SongRow";

const Liked = () => {
    // const [likedSongs, setLikedSongs] = useState([]);
    // useEffect(() => {
    //     const fetchData = async () => {
    //         const [likedSongsData] = await Promise.all([getLikedSongs()]);
    //         setLikedSongs(likedSongsData);
    //     };
    //     fetchData();
    // }, []);
    return (
        <div className="min-h-screen bg-[#121212] text-white">
            {/* Header */}
            <div className="bg-gradient-to-b from-purple-700 to-black p-6 md:p-10 flex items-end gap-6">
                {/* Icon hoặc ảnh bìa */}
                <div className="w-40 h-40 bg-[#282828] rounded-md flex items-center justify-center">
                    {/* Icon trái tim lớn */}
                    <FaHeart className="text-[4rem] text-white" />
                </div>
                {/* Thông tin playlist */}
                <div>
                    <p className="uppercase text-sm font-bold text-gray-200 mb-1">
                        Playlist
                    </p>
                    <h1 className="text-2xl md:text-4xl font-extrabold mb-2">
                        Liked Songs
                    </h1>
                    <p className="text-sm text-gray-300">50 liked songs</p>
                    <p className="text-sm text-gray-400">User Name • 3h 20m</p>
                </div>
            </div>

            {/* Bảng danh sách bài hát */}
            {/* <div className="bg-zinc-900/50 px-4 pt-8 mt-4 flex-[1] ">
                <div className="flex gap-2">
                    <button className="hover:cursor-pointer px-5 py-5 bg-green-500 rounded-full hover:bg-green-400 transition-colors flex items-center space-x-2">
                        <FaPlay className="text-black text-xl" />
                    </button>
                    <button className="hover:cursor-pointer px-5 py-5  rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                        <FaEllipsisH className="text-xl" />
                    </button>
                </div>
                <div className="grid grid-cols-[16px_minmax(120px,6fr)_minmax(120px,4fr)_minmax(120px,3fr)_minmax(120px,1fr)] gap-2 mt-6 pb-2 p-2 text-[#a7a7a7] font-medium border-b-1 border-[#a4a4a4]">
                    <p>#</p>
                    <p>Title</p>
                    <p>Album</p>
                    <p className="hidden sm:block">Date Added</p>
                    <LuClock3 className="m-auto text-[18px]" />
                </div>
                <div className="mt-3">
                    {likedSongs.map((item, index) => (
                        <SongRow
                            key={index}
                            song={item}
                            albumTitle={"test"}
                            albumReleaseDate={"test"}
                            index={index}
                        />
                    ))}
                </div>
            </div> */}
        </div>
    );
};

export default Liked;
