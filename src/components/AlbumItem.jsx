// React
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

// Libary
import "react-contexify/dist/ReactContexify.css";
import { Menu, Item, useContextMenu } from "react-contexify";
import { toast } from "react-toastify";

// icon
import { FaPlay } from "react-icons/fa";
import { FaRegHeart } from "react-icons/fa6";
import { FaHeart } from "react-icons/fa";

// Component
import LoginRequiredPopup from "./LoginRequiredPopup";
import { useUser } from "../context/UserContext";

// api
import { checkAlbumLikeStatus, toggleAlbumLike } from "../api/musicService";

const AlbumItem = ({ name, image, id }) => {
    const navigate = useNavigate();
    const menuId = `album-context-menu-${id}`;
    const { show } = useContextMenu({ id: menuId });
    const [isLikeAlbum, setIsLikeAlbum] = useState(false);
    const [showLoginPopup, setShowLoginPopup] = useState(false);
    const { isLoggedIn, user } = useUser();

    useEffect(() => {
        const fetchData = async () => {
            if (isLoggedIn && id) {
                const likeData = await checkAlbumLikeStatus(id);
                setIsLikeAlbum(likeData);
            }
        };
        fetchData();
    }, [isLoggedIn, id]);

    const handleLikeClick = () => {
        if (!isLoggedIn) {
            setShowLoginPopup(true);
            return;
        }
        if (!user || !user.id) {
            setShowLoginPopup(true);
            return;
        }
        setIsLikeAlbum(!isLikeAlbum);
        toggleAlbumLike(id);
        toast.success(
            isLikeAlbum
                ? "Đã xóa album khỏi thư viện"
                : "Đã thêm album vào thư viện"
        );
    };

    return (
        <>
            <div
                onClick={() => navigate(`/album/${id}`)}
                onContextMenu={(e) => show({ event: e })}
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

                {/* Context Menu */}
                <Menu
                    id={menuId}
                    className="custom-context-menu"
                    theme="none"
                    animation={false}
                >
                    <Item onClick={handleLikeClick}>
                        {isLikeAlbum ? (
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
                </Menu>
            </div>
            <LoginRequiredPopup
                isOpen={showLoginPopup}
                onClose={() => setShowLoginPopup(false)}
            />
        </>
    );
};

export default AlbumItem;
