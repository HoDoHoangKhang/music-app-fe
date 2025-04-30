import { useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import CreatePlaylistModal from "../pages/Playlist/CreatePlaylistModal";

// Library
import "react-contexify/dist/ReactContexify.css";
import { Menu, Item, Submenu, useContextMenu } from "react-contexify";
import { toast } from "react-toastify";

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
import {
    checkSongLikeStatus,
    toggleSongLike,
    getCurrentUserPlaylists,
    addSongToPlaylist,
} from "../api/musicService";

const SongItem = ({ name, image, desc, idSong, idArtist }) => {
    const navigate = useNavigate();
    // Tạo menuId riêng cho mỗi bài hát dựa trên idSong
    const menuId = `context-menu-${idSong}`;
    const { show } = useContextMenu({ id: menuId });
    const [isLikeSong, setIsLikeSong] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const { playWithId } = useContext(PlayerContext);
    const { isLoggedIn, user } = useUser();
    const [playlists, setPlaylists] = useState([]);
    const [showCreatePlaylistModal, setShowCreatePlaylistModal] =
        useState(false);

    useEffect(() => {
        const fetchData = async () => {
            if (isLoggedIn) {
                const likeData = await checkSongLikeStatus(idSong);
                setIsLikeSong(likeData);

                // Lấy danh sách playlist của user
                const userPlaylists = await getCurrentUserPlaylists();
                if (userPlaylists) {
                    setPlaylists(userPlaylists);
                }
            }
        };
        fetchData();
    }, [idSong, isLoggedIn]);

    const handleAddToPlaylist = (playlistId) => {
        if (!isLoggedIn) {
            setShowLoginPopup(true);
            return;
        }

        // Hiển thị thông báo đang xử lý
        const loadingToast = toast.loading("Đang thêm bài hát vào playlist...");

        addSongToPlaylist(playlistId, idSong)
            .then((response) => {
                // Cập nhật thông báo thành công
                toast.update(loadingToast, {
                    render: `Đã thêm bài hát "${name}" vào playlist thành công`,
                    type: "success",
                    isLoading: false,
                    autoClose: 3000,
                });
                console.log(
                    `Đã thêm bài hát ${idSong} vào playlist ${playlistId}`,
                    response
                );
            })
            .catch((error) => {
                // Hiển thị thông báo lỗi
                toast.update(loadingToast, {
                    render:
                        error.response?.data?.message ||
                        "Lỗi khi thêm bài hát vào playlist",
                    type: "error",
                    isLoading: false,
                    autoClose: 3000,
                });
                console.error("Lỗi khi thêm bài hát vào playlist:", error);
            });
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

    const handleAddToPlaylistClick = (playlistId) => {
        if (!isLoggedIn) {
            setShowLoginPopup(true);
            return;
        }
        handleAddToPlaylist(playlistId);
    };

    const handleCreatePlaylistSuccess = (newPlaylist) => {
        // Kiểm tra nếu newPlaylist hợp lệ trước khi thêm vào danh sách
        if (newPlaylist && newPlaylist.id && newPlaylist.name) {
            // Cập nhật danh sách playlist khi tạo mới
            setPlaylists((prevPlaylists) => [...prevPlaylists, newPlaylist]);

            // Hiển thị thông báo thành công
            toast.success(`Đã tạo playlist "${newPlaylist.name}" thành công`);

            // Tải lại danh sách playlist
            const fetchPlaylists = async () => {
                const userPlaylists = await getCurrentUserPlaylists();
                if (userPlaylists) {
                    setPlaylists(userPlaylists);
                }
            };
            fetchPlaylists();
        }
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
                                onClick={() =>
                                    handleAddToPlaylistClick(playlist.id)
                                }
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
