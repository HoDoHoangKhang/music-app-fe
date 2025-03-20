import { useContext } from "react";
import { assets } from "../assets/assets";
import { PlayerContext } from "../context/PlayerContext";

//Tippy
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css"; // optional

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
    } = useContext(PlayerContext);
    return (
        <div
            className="h-[10%] bg-black flex justify-between items-center
    text-white px-4"
        >
            <div className="hidden lg:flex items-center gap-4 w-[350px]">
                <img
                    className="w-12 rounded-full"
                    src={track.image}
                    alt="song_Data"
                />
                <div>
                    <p>{track.name}</p>
                    <p className="">{track.desc.slice(0, 43)}</p>
                </div>
            </div>
            <div className="flex flex-col items-center gap-1 m-auto flex-1">
                <div className="flex gap-4">
                    <Tippy content="Shuffle">
                        <img
                            className="w-4 cursor-pointer"
                            src={assets.shuffle_icon}
                            alt=""
                        />
                    </Tippy>
                    <Tippy content="Previous">
                        <img
                            onClick={previous}
                            className="w-4 cursor-pointer"
                            src={assets.prev_icon}
                            alt=""
                        />
                    </Tippy>
                    {playStatus ? (
                        <Tippy content="Pause">
                            <img
                                onClick={pause}
                                className="w-4 cursor-pointer"
                                src={assets.pause_icon}
                                alt=""
                            />
                        </Tippy>
                    ) : (
                        <Tippy content="Play">
                            <img
                                onClick={play}
                                className="w-4 cursor-pointer"
                                src={assets.play_icon}
                                alt=""
                            />
                        </Tippy>
                    )}
                    <Tippy content="Next">
                        <img
                            onClick={next}
                            className="w-4 cursor-pointer"
                            src={assets.next_icon}
                            alt=""
                        />
                    </Tippy>
                    <Tippy content="Loop">
                        <img
                            className="w-4 cursor-pointer"
                            src={assets.loop_icon}
                            alt=""
                        />
                    </Tippy>
                </div>
                <div className="flex items-center gap-5">
                    <p>
                        {time.currentTime.minute}:{time.currentTime.second}
                    </p>
                    <div
                        ref={seekBg}
                        onClick={seekSong}
                        className="w-[60vw] max-w-[500px] bg-gray-300 rounded-full cursor-pointer"
                    >
                        <hr
                            ref={seekBar}
                            className="h-1 border-none w-0 bg-green-800 rounded-full"
                        />
                    </div>
                    <p>
                        {time.totalTime.minute}:{time.totalTime.second}
                    </p>
                </div>
            </div>
            <div className="hidden lg:flex items-center gap-4 opacity-75">
                <img className="w-4" src={assets.plays_icon} alt="" />
                <img className="w-4" src={assets.mic_icon} alt="" />
                <img className="w-4" src={assets.queue_icon} alt="" />
                {/* <img className="w-4" src={assets.speaker_icon} alt="" /> */}
                <img className="w-4" src={assets.volume_icon} alt="" />
                <div className="w-20 bg-slate-50 h-1 rounded"></div>
                <img className="w-4" src={assets.mini_player_icon} alt="" />
                <img className="w-4" src={assets.zoom_icon} alt="" />
            </div>
        </div>
    );
};

export default Player;
