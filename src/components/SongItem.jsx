import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
const SongItem = ({ name, image, desc, id, onClick }) => {
    const { playWithId } = useContext(PlayerContext);
    const navigate = useNavigate();
    return (
        <div
            onClick={onClick}
            key={id}
            className="rounded-sm p-3 hover:bg-zinc-700/30 transition-colors group cursor-pointer min-w-[180px] max-w-[180px]"
        >
            <div className="relative">
                <img
                    src={image}
                    alt="Album"
                    className="w-full aspect-square object-cover rounded-sm mb-4"
                />
                <button className="absolute bottom-2 right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all shadow-xl">
                    <FaPlay className="text-black text-sm cursor-pointer" />
                </button>
            </div>
            <h3 className="font-semibold text-sm truncate ">{name}</h3>
            <p
                onClick={(e) => {
                    e.stopPropagation(); // Ngăn sự kiện lan lên phần tử cha
                    navigate(`/artist/${id}`);
                }}
                className="text-xs text-gray-400 truncate hover:underline"
            >
                {desc}
            </p>
        </div>
    );
};

export default SongItem;
