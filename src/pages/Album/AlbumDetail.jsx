import React from "react";

const AlbumDetail = ({coverImage,
    title,
    artistName,
    totalSongs,
    totalDuration,
    artistAvatar,
    totalPlays}) => {
    
        return (
            <div className="px-4 flex gap-8 flex-col md:flex-row md:items-end">
                <img
                    className="w-48 h-48 rounded shadow-[0_4px_12px_0_#0000004d] object-cover"
                    src={coverImage}
                    alt=""
                />
                <div className="flex flex-col">
                    <p className="font-medium">Album</p>
                    <h2 className="text-5xl font-bold mb-4 md:text-7xl">
                        {title}
                    </h2>
                    <p className="mt-1 text-[#a7a7a7] font-normal flex gap-1 items-center">
                        <img
                            className="inline-block w-6 h-6 object-cover rounded-full"
                            src={artistAvatar}
                            alt=""
                        />
                        <b className="text-white font-bold"> {artistName} </b>•{" "}
                        <b>
                            {totalSongs} {"songs"}
                        </b>
                        •{" "}
                        <span className="text-[#a7a7a7] font-medium">
                            {" "}
                            {totalDuration}
                        </span>
                    </p>
                </div>
            </div>
        );
};

export default AlbumDetail;
