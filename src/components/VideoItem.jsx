import React from "react";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const VideoItem = ({ video }) => {
    const navigate = useNavigate();

    const handlePlay = () => {
        navigate(`/video/${video.id}`);
    };

    // Format thời lượng video
    const formatDuration = (duration) => {
        if (!duration) return "00:00";
        const [hours, minutes, seconds] = duration.split(":");
        if (hours === "00") {
            return `${minutes}:${seconds}`;
        }
        return duration;
    };

    // Format số lượt xem
    const formatViews = (views) => {
        if (views >= 1000000) {
            return `${(views / 1000000).toFixed(1)}M`;
        } else if (views >= 1000) {
            return `${(views / 1000).toFixed(1)}K`;
        }
        return views;
    };

    return (
        <div className="rounded-sm p-3 hover:bg-zinc-700/30 transition-colors group cursor-pointer min-w-[180px] max-w-[180px]">
            <div className="relative">
                <img
                    src={video.cover_image}
                    alt={video.title}
                    className="w-full aspect-square object-cover rounded-sm mb-4"
                />
                <div className="absolute bottom-2 left-2 bg-black/70 text-white text-xs px-2 py-1 rounded">
                    {formatDuration(video.duration)}
                </div>
                <button
                    onClick={handlePlay}
                    className="cursor-pointer absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-xl"
                >
                    <FaPlay className="text-black text-lg" />
                </button>
            </div>
            <div>
                <h3 className="font-semibold text-sm truncate">
                    {video.title}
                </h3>
                <p className="text-xs text-gray-400 truncate">
                    {video.artist_name}
                </p>
                <p className="text-xs text-gray-400 mt-1">
                    {formatViews(video.views)} lượt xem
                </p>
            </div>
        </div>
    );
};

export default VideoItem;
