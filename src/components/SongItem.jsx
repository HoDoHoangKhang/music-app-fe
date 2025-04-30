import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import CreatePlaylistModal from "../pages/Playlist/CreatePlaylistModal";

// Library
import "react-contexify/dist/ReactContexify.css";
import { Menu, Item, Submenu, useContextMenu } from "react-contexify";

// Component
import { PlayerContext } from "../context/PlayerContext";
import LoginRequiredPopup from "./LoginRequiredPopup";
import { useUser } from "../context/UserContext";

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
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const { playWithId } = useContext(PlayerContext);
    const { isLoggedIn, user } = useUser();
    const [playlists, setPlaylists] = useState([
        { id: 1, name: "Nhạc Yêu Thích" },
        { id: 2, name: "Playlist của tôi" },
        { id: 3, name: "Nhạc Chill" },
        { id: 4, name: "Workout Music" },
    ]);
    const [showCreatePlaylistModal, setShowCreatePlaylistModal] =
        useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (isLoggedIn) {
                const likeData = await checkSongLikeStatus(idSong);
                setIsLikeSong(likeData);
            }
        };
        fetchData();
    }, [idSong, isLoggedIn]);

    const handleAddToPlaylist = (playlistId) => {
        console.log(`Adding song ${idSong} to playlist ${playlistId}`);
        // Thêm logic thêm bài hát vào playlist ở đây
    };

    const handleLikeClick = () => {
        if (!isLoggedIn) {
            setShowLoginPopup(true);
            return;
        }
        if (!user || !user.id) {
            setShowLoginPopup(true);
            return;
        }
        setIsLikeSong(!isLikeSong);
        toggleSongLike(idSong);
    };

    const handleAddToPlaylistClick = () => {
        if (!isLoggedIn) {
            setShowLoginPopup(true);
            return;
        }
        // Logic thêm vào playlist
    };

    const handleCreatePlaylistSuccess = () => {
        // Có thể thêm logic cập nhật danh sách playlist ở đây
    };

    return (
        <>
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
                    <Item onClick={handleLikeClick}>
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
                        <Item
                            onClick={() => {
                                setShowCreatePlaylistModal(true);
                                console.log(idSong);
                            }}
                        >
                            <div className="flex items-center">
                                <FiPlusCircle className="text-lg" />
                                <p className="ml-2">Tạo playlist mới</p>
                            </div>
                        </Item>
                        {playlists.map((playlist) => (
                            <Item
                                key={playlist.id}
                                onClick={handleAddToPlaylistClick}
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
            <LoginRequiredPopup
                isOpen={showLoginPopup}
                onClose={() => setShowLoginPopup(false)}
            />
            <CreatePlaylistModal
                isOpen={showCreatePlaylistModal}
                onClose={() => setShowCreatePlaylistModal(false)}
                onSuccess={handleCreatePlaylistSuccess}
                songId={idSong}
            />
        </>
    );
};

export default SongItem;
