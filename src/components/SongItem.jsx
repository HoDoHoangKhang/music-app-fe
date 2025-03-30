import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";

// Library
import "react-contexify/dist/ReactContexify.css";
import { Menu, Item, Submenu, useContextMenu } from "react-contexify";

// Component
import { PlayerContext } from "../context/PlayerContext";

// Icon
import { FaPlay } from "react-icons/fa";
import { FiPlusCircle } from "react-icons/fi";
import { FaRegHeart } from "react-icons/fa6";
import { RiUserLine } from "react-icons/ri";
import { FaHeart } from "react-icons/fa";
import { MdPlaylistAdd } from "react-icons/md";

//api
import { checkSongLikeStatus, toggleSongLike } from "../api/musicService";

const SongItem = ({ name, image, desc, idSong, idArtist }) => {
    const navigate = useNavigate();
    // Tạo menuId riêng cho mỗi bài hát dựa trên idSong
    const menuId = `context-menu-${idSong}`;
    const { show } = useContextMenu({ id: menuId });
    const [isLikeSong, setIsLikeSong] = useState(false);
    const { playWithId } = useContext(PlayerContext);
    const [playlists, setPlaylists] = useState([
        { id: 1, name: "Nhạc Yêu Thích" },
        { id: 2, name: "Playlist của tôi" },
        { id: 3, name: "Nhạc Chill" },
        { id: 4, name: "Workout Music" },
    ]);

    useEffect(() => {
        const fetchData = async () => {
            const likeData = await checkSongLikeStatus(idSong);
            setIsLikeSong(likeData);
        };
        fetchData();
    }, [idSong]);

    const handleAddToPlaylist = (playlistId) => {
        console.log(`Adding song ${idSong} to playlist ${playlistId}`);
        // Thêm logic thêm bài hát vào playlist ở đây
    };

    return (
        <div
            onClick={() => playWithId(idSong)}
            onContextMenu={(e) => show({ event: e, props: { idSong } })}
            key={idSong}
            className="rounded-sm p-3 hover:bg-zinc-700/30 transition-colors group cursor-pointer min-w-[180px] max-w-[180px]"
        >
            <div className="relative">
                <img
                    src={image}
                    alt="Song Image"
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
                    navigate(`/artist/${idArtist}`);
                }}
                className="text-xs text-gray-400 truncate hover:underline cursor-pointer"
            >
                {desc}
            </p>

            {/* Context Menu */}
            <Menu
                id={menuId}
                className="custom-context-menu"
                theme="none"
                animation={false}
            >
                <Item
                    onClick={() => {
                        setIsLikeSong(!isLikeSong);
                        toggleSongLike(idSong);
                    }}
                >
                    {isLikeSong ? (
                        <div className="flex items-center">
                            <FaHeart className="text-lg text-red-500" />
                            <p className="ml-2">Unlike</p>
                        </div>
                    ) : (
                        <div className="flex items-center">
                            <FaRegHeart className="text-lg" />
                            <p className="ml-2">Like</p>
                        </div>
                    )}
                </Item>
                <Submenu
                    label={
                        <div className="flex items-center">
                            <FiPlusCircle className="text-lg" />
                            <p className="ml-2">Add to Playlist</p>
                        </div>
                    }
                >
                    <Item onClick={() => navigate("/create-playlist")}>
                        <div className="flex items-center">
                            <FiPlusCircle className="text-lg" />
                            <p className="ml-2">Tạo playlist mới</p>
                        </div>
                    </Item>
                    {playlists.map((playlist) => (
                        <Item
                            key={playlist.id}
                            onClick={() => handleAddToPlaylist(playlist.id)}
                        >
                            <div className="flex items-center">
                                <MdPlaylistAdd className="text-lg" />
                                <p className="ml-2">{playlist.name}</p>
                            </div>
                        </Item>
                    ))}
                </Submenu>
                <Item onClick={() => navigate(`/artist/${idArtist}`)}>
                    <RiUserLine className="text-lg" />
                    <p className="ml-2">Go to Artist</p>
                </Item>
            </Menu>
        </div>
    );
};

export default SongItem;
