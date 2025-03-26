import React from "react";
import { PlayerContext } from "../context/PlayerContext";
import { useContext } from "react";

import {
    FaHeart,
    FaPlay,
    FaRandom,
    FaStepBackward,
    FaStepForward,
    FaRedo,
    FaVolumeUp,
} from "react-icons/fa";
import { IoIosPause } from "react-icons/io";
import { IoPlay } from "react-icons/io5";
const Player = () => {
    const {
        seekBar,
        seekBg,
        playStatus,
        play,
        pause,
        track,
        time,
        previous,
        next,
        seekSong,

        volumeBg,
        volumeBar,
        volume,
        setVolume,
        changeVolume,
    } = useContext(PlayerContext);
    return (
        <div className="h-[14%] bg-[#121212] border-t border-zinc-800 flex items-center px-4">
            <div className="flex items-center min-w-1/3">
                {track && (
                    <>
                        <img
                            src={track.cover_image}
                            alt="Now Playing"
                            className="w-14 h-14 rounded object-cover"
                        />
                        <div className="ml-4">
                            <h4 className="text-sm font-semibold text-white">
                                {track.title}
                            </h4>
                            <p className="text-xs text-gray-400">
                                {track.artist.user.last_name}
                            </p>
                        </div>
                        <button className="ml-4 text-gray-400 hover:text-white cursor-pointer">
                            <FaHeart />
                        </button>
                    </>
                )}
            </div>

            <div className="flex-1 flex flex-col items-center">
                <div className="flex items-center space-x-6">
                    <button className="text-gray-400 cursor-pointer hover:text-white">
                        <FaRandom />
                    </button>
                    <button
                        onClick={previous}
                        className="cursor-pointer text-gray-400 hover:text-white"
                    >
                        <FaStepBackward />
                    </button>
                    {playStatus ? (
                        <button
                            onClick={pause}
                            className="cursor-pointer w-8 h-8 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform"
                        >
                            <IoIosPause />
                        </button>
                    ) : (
                        <button
                            onClick={play}
                            className=" cursor-pointer w-8 h-8 bg-white rounded-full flex items-center justify-center text-black hover:scale-105 transition-transform"
                        >
                            <IoPlay />
                        </button>
                    )}

                    <button
                        onClick={next}
                        className="cursor-pointer text-gray-400 hover:text-white"
                    >
                        <FaStepForward />
                    </button>
                    <button className="cursor-pointer text-gray-400 hover:text-white">
                        <FaRedo />
                    </button>
                </div>
                <div className="flex items-center gap-5 w-[400px] text-[white]">
                    <p>
                        {String(time.currentTime.minute).padStart(2, "0")}:
                        {String(time.currentTime.second).padStart(2, "0")}
                    </p>
                    <div
                        ref={seekBg}
                        onClick={seekSong}
                        className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer"
                    >
                        <hr
                            ref={seekBar}
                            className="h-1 border-none w-0 bg-green-500 rounded-full"
                        />
                    </div>
                    <p>
                        {String(time.totalTime.minute).padStart(2, "0")}:
                        {String(time.totalTime.second).padStart(2, "0")}
                    </p>
                </div>
            </div>

            <div className="w-1/3 flex items-center justify-end space-x-4">
                <FaVolumeUp className="text-gray-400 cursor-pointer" />
                {/* Thanh volume giống seekBar */}
                <div
                    ref={volumeBg}
                    onClick={changeVolume}
                    className="relative w-24 h-1 bg-gray-600 rounded-full cursor-pointer"
                >
                    {/* fill */}
                    <div
                        ref={volumeBar}
                        className="absolute relative h-full bg-gray-200 rounded-full"
                        style={{ width: volume * 100 + "%" }}
                    >
                        <div className="absolute bg-gray-200 rounded-full w-3 h-3 border-3 right-0 top-1/2 transform -translate-y-1/2"></div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Player;
