import { FaPlay } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { Menu, Item, useContextMenu } from "react-contexify";
import "react-contexify/dist/ReactContexify.css";
import { FiPlusCircle } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa6";
import { RiUserLine } from "react-icons/ri";
const MENU_ID = "context-menu";

const SongItem = ({ name, image, desc, id, onClick }) => {
    const navigate = useNavigate();
    const { show } = useContextMenu({ id: MENU_ID });

    return (
        <div
            onClick={onClick}
            onContextMenu={(e) => show({ event: e, props: { id } })}
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
            <p
                onClick={(e) => {
                    e.stopPropagation();
                    navigate(`/artist/${id}`);
                }}
                className="text-xs text-gray-400 truncate hover:underline"
            >
                {desc}
            </p>

            {/* Context Menu */}
            <Menu
                id={MENU_ID}
                className="custom-context-menu"
                theme="none"
                animation={false}
            >
                <Item onClick={() => console.log(`Like ${id}`)}>
                    <FaRegHeart className="text-lg" />
                    <p className="ml-2">Like</p>
                </Item>
                <Item onClick={() => console.log(`Add song ${id} to playlist`)}>
                    <FiPlusCircle className="text-lg" />
                    <p className="ml-2"> Add to Playlist</p>
                </Item>
                <Item onClick={() => navigate(`/artist/${id}`)}>
                    <RiUserLine className="text-lg" />
                    <p className="ml-2">Go to Artist</p>
                </Item>
            </Menu>
        </div>
    );
};

export default SongItem;
