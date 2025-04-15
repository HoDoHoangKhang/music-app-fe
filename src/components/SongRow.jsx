import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { formatDuration } from "../utils/format";

const SongRow = ({ song, albumTitle, albumReleaseDate, index }) => {
    const { playWithId } = useContext(PlayerContext);

    return (
        <div
            onClick={() => playWithId(song.id)}
            className="grid grid-cols-[16px_minmax(120px,6fr)_minmax(120px,4fr)_minmax(120px,3fr)_minmax(120px,1fr)] gap-2 p-2 items-center text-[#a7a7a7] rounded-sm hover:bg-zinc-700/30 transition-colors cursor-pointer"
        >
            <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
            <div className="text-white text-sm md:text-[14px] flex items-center">
                <img
                    className="inline w-10 mr-3 rounded-sm"
                    src={song.cover_image}
                    alt={song.title}
                />
                <div className="inline-block">
                    <div>{song.title}</div>
                    <div className="text-[#a7a7a7] text-[14px]">
                        {song.artist?.user?.last_name?.slice(0, 20)}
                    </div>
                </div>
            </div>
            <p className="text-[12px]">{albumTitle}</p>
            <p className="text-[12px] hidden sm:block">{albumReleaseDate}</p>
            <p className="text-[12px] text-center">
                {formatDuration(song.duration)}
            </p>
        </div>
    );
};

export default SongRow;
