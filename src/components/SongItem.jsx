import { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";

const SongItem = ({ name, image, desc, id }) => {
    const { playWithId } = useContext(PlayerContext);

    return (
        <div
            onClick={() => playWithId(id)}
            className="min-w-[180px] p-2 rounded cursor-pointer hover:bg-[#ffffff26] transition-all duration-200 ease-in-out"
        >
            <img className="rounded" src={image} alt="" />
            <p onClick={() => {}} className="font-bold mt-2 mb-1">
                {name}
            </p>
            <p className="text-slate-200 text-sm">{desc}</p>
        </div>
    );
};

export default SongItem;
