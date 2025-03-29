// React
import { useNavigate } from "react-router-dom";

// Libary
import "react-contexify/dist/ReactContexify.css";

// icon
import { FaPlay } from "react-icons/fa";

const AlbumItem = ({ name, image, id}) => {
    const navigate = useNavigate();
    return (
        <div
            onClick={() => navigate(`/album/${id}`)}
            key={id}
            className="rounded-sm p-3 hover:bg-zinc-700/30 transition-colors group cursor-pointer min-w-[180px] max-w-[180px]"
        >
            <div className="relative">
                <img
                    src={image}
                    alt="Album"
                    className="w-full aspect-square object-cover rounded-sm mb-4"
                />
                <button className="cursor-pointer absolute bottom-2 right-2 w-10 h-10 bg-green-500 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all shadow-xl">
                    <FaPlay className="text-black text-sm" />
                </button>
            </div>
            <h3 className="font-semibold text-sm truncate">{name}</h3>
            <p className="text-xs text-gray-400 truncate">Album</p>
        </div>
    );
};

export default AlbumItem;
