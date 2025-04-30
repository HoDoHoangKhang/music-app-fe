import React, { useState } from "react";
import { BsMusicNoteBeamed } from "react-icons/bs";
import EditPlaylistModal from "./EditPlaylistModal";

const PlaylistDetail = ({
    coverImage,
    title,
    artistName,
    totalSongs,
    totalDuration,
    totalPlays,
    playlistId,
    onUpdateSuccess,
}) => {
    const [showEditModal, setShowEditModal] = useState(false);

    return (
        <>
            <div className="px-4 flex gap-8 flex-col md:flex-row md:items-end">
                {coverImage ? (
                    <img
                        onClick={() => setShowEditModal(true)}
                        className="w-48 h-48 rounded shadow-[0_4px_12px_0_#0000004d] object-cover cursor-pointer hover:opacity-90 transition-opacity"
                        src={coverImage}
                        alt=""
                    />
                ) : (
                    <div
                        onClick={() => setShowEditModal(true)}
                        className="w-48 h-48 rounded shadow-[0_4px_12px_0_#0000004d] bg-neutral-800 flex items-center justify-center cursor-pointer hover:opacity-90 transition-opacity"
                    >
                        <BsMusicNoteBeamed className="text-neutral-400 text-5xl" />
                    </div>
                )}
                <div className="flex flex-col">
                    <p className="font-medium">Playlist</p>
                    <h2
                        onClick={() => setShowEditModal(true)}
                        className="text-5xl font-bold mb-4 md:text-7xl cursor-pointer hover:text-gray-300 transition-colors"
                    >
                        {title}
                    </h2>
                    <p className="mt-1 text-[#a7a7a7] font-normal flex gap-1 items-center">
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
            <EditPlaylistModal
                isOpen={showEditModal}
                onClose={() => setShowEditModal(false)}
                playlistId={playlistId}
                currentName={title}
                currentImage={coverImage}
                onSuccess={onUpdateSuccess}
            />
        </>
    );
};

export default PlaylistDetail;
