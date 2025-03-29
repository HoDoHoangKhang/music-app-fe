import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { FaPlay, FaInstagram, FaTwitter, FaEllipsisH } from "react-icons/fa";
import { getArtists } from "../../api/artistService";


const Feature = () => {
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            const [artistsData] = await Promise.all([getArtists()]);
            setArtists(artistsData);
        };
        fetchData();
    }, []);
    return (
        <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={30}
            slidesPerView={1}
            pagination={{ clickable: true }}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            className="relative h-[50vh] 2xl:h-[40vh] rounded-sm overflow-hidden mb-4"
        >
            {artists.map((artist) => (
                <SwiperSlide key={artist.id}>
                    <div className="relative h-full">
                        <img
                            src={artist.backdrop_img}
                            className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black"></div>
                        <div className="absolute bottom-12 left-8">
                            <div className="flex items-center space-x-4 mb-4">
                                <div className="flex items-center space-x-3">
                                    <FaInstagram className="text-xl cursor-pointer hover:text-green-500 transition-colors" />
                                    <FaTwitter className="text-xl cursor-pointer hover:text-green-500 transition-colors" />
                                </div>
                                <span className="text-sm text-gray-300">
                                    Test
                                </span>
                            </div>
                            <h1 className="text-5xl 2xl:text-7xl font-bold mb-8">
                                {artist.user.username}
                            </h1>
                            <div className="flex items-center space-x-4">
                                <button className="px-8 py-2 bg-green-500 rounded-full hover:bg-green-400 transition-colors flex items-center space-x-2">
                                    <FaPlay className="text-black" />
                                    <span>Play</span>
                                </button>
                                <button className="px-8 py-2 bg-transparent border border-white rounded-full hover:bg-white/10 transition-colors">
                                    Follow
                                </button>
                                <button className="w-10 h-10 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                                    <FaEllipsisH />
                                </button>
                            </div>
                        </div>
                    </div>
                </SwiperSlide>
            ))}
        </Swiper>
        
    );
};

export default Feature;
