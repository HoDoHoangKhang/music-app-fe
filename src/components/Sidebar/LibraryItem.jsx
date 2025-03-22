import React from "react";
import { CiHeart } from "react-icons/ci";
import { CiMusicNote1 } from "react-icons/ci";
import { FiUsers } from "react-icons/fi";
import { FiRadio } from "react-icons/fi";
import { PiMicrophoneStageLight } from "react-icons/pi";
export const getTypeIcon = (type) => {
    switch (type) {
        case "playlist":
            return CiMusicNote1;
        case "artist":
            return FiUsers;
        case "podcast":
            return FiRadio;
        case "single":
            return PiMicrophoneStageLight;
        default:
            return null;
    }
};

export const getTypeLabel = (type) => {
    switch (type) {
        case "playlist":
            return "Playlist";
        case "artist":
            return "Artist";
        case "podcast":
            return "Podcast";
        case "single":
            return "Single";
        default:
            return type;
    }
};

const LibraryItem = ({ item, isActive, onClick }) => {
    const TypeIcon = getTypeIcon(item.type);

    return (
        <div
            className={`${
                isActive ? "bg-zinc-700/30" : ""
            } hover:bg-zinc-700/30 flex items-center gap-3 p-2 rounded-sm cursor-pointer transition-all duration-200 ease-in-out`}
            onClick={onClick}
        >
            <div className="w-12 h-12 rounded-md overflow-hidden flex-shrink-0 bg-music-muted">
                {item.id === "1" ? (
                    <div className="w-full h-full bg-gradient-to-br from-indigo-500 to-violet-500 flex items-center justify-center">
                        <CiHeart className="w-5 h-5 text-white" />
                    </div>
                ) : (
                    <img
                        src="https://th.bing.com/th/id/R.0e3b00210e87b56e80e5c739309bd7b3?rik=JBMTwEHoRo%2fv2g&pid=ImgRaw&r=0"
                        alt={item.title}
                        className="w-full h-full object-cover"
                    />
                )}
            </div>
            <div className="min-w-0 flex-1">
                <h3 className="text-sm font-semibold truncate text-white">
                    {item.title}
                </h3>
                <div className="flex items-center gap-1 text-xs text-white/60">
                    {TypeIcon && <TypeIcon className="w-3 h-3 inline mr-0.5" />}
                    <span>
                        {item.subtitle
                            ? `${getTypeLabel(item.type)} • ${item.subtitle}`
                            : getTypeLabel(item.type)}
                    </span>
                </div>
            </div>
        </div>
    );
};

export default LibraryItem;
