import { useNavigate } from "react-router-dom";

// Icon
import { FaPlay } from "react-icons/fa";
import { BsMusicNoteBeamed } from "react-icons/bs";

const PlaylistItem = ({ name, image, songCount, idPlaylist }) => {
    const navigate = useNavigate();

    return (
        <div
            onClick={() => navigate(`/playlist/${idPlaylist}`)}
            className="rounded-sm p-3 hover:bg-zinc-700/30 transition-colors group cursor-pointer min-w-[180px] max-w-[180px]"
        >
            <div className="relative">
                {image ? (
                    <img
                        src={image}
                        alt="Playlist Image"
                        className="w-full aspect-square object-cover rounded-sm mb-4"
                    />
                ) : (
                    <div className="w-full aspect-square rounded shadow-[0_4px_12px_0_#0000004d] bg-neutral-800 flex items-center justify-center mb-4">
                        <BsMusicNoteBeamed className="text-neutral-400 text-5xl" />
                    </div>
                )}
                <button className="cursor-pointer absolute bottom-2 right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all shadow-xl">
                    <FaPlay className="text-black text-sm" />
                </button>
            </div>
            <h3 className="font-semibold text-sm truncate">{name}</h3>
            <p className="text-xs text-gray-400 truncate">
                {songCount} bài hát
            </p>
        </div>
    );
};

export default PlaylistItem;
