import React, { useState, useEffect } from "react";
import LibraryItem from "./LibraryItem";
import { CiHeart } from "react-icons/ci";
import {
    getCurrentUserPlaylists,
    getLikedAlbums,
} from "../../api/musicService";
import { getFollowingArtists } from "../../api/userService";

const LibraryItems = ({ activeItem, setActiveItem }) => {
    const [libraryItems, setLibraryItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchLibraryItems = async () => {
            try {
                setLoading(true);
                let allItems = [];

                // Lấy playlists
                const playlists = await getCurrentUserPlaylists();
                const playlistItems = playlists.map((playlist) => ({
                    id: playlist.id,
                    title: playlist.name,
                    type: "Playlist",
                    subtitle: `${playlist.songs?.length || 0} bài hát`,
                    imagePath: playlist.coverImage || "default-playlist.png",
                }));
                allItems = [...allItems, ...playlistItems];

                // Lấy albums
                const albums = await getLikedAlbums();
                const albumItems = albums.map((album) => ({
                    id: album.id,
                    title: album.title,
                    type: "Album",
                    subtitle: album.artist.user.first_name + " " + album.artist.user.last_name,
                    imagePath: album.coverImage || "default-album.png",
                }));
                allItems = [...allItems, ...albumItems];

                // Lấy artists
                const artistsData = await getFollowingArtists();
                const artistItems =
                    artistsData?.following_artists?.map((artist) => ({
                        id: artist.id,
                        title: artist.user.first_name + " " + artist.user.last_name,
                        type: "Artist",
                        subtitle: `${artist.followers || 0} người theo dõi`,
                        imagePath: artist.avatar || "default-artist.png",
                    })) || [];
                allItems = [...allItems, ...artistItems];

                setLibraryItems(allItems);
            } catch (error) {
                console.error("Lỗi khi tải dữ liệu thư viện:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchLibraryItems();
    }, []);

    if (loading) {
        return (
            <div className="flex-1 sidebar-scroll flex items-center justify-center">
                <div className="text-white/60">Đang tải...</div>
            </div>
        );
    }

    return (
        <div className="flex-1 sidebar-scroll">
            {libraryItems.map((item) => (
                <LibraryItem
                    key={item.id}
                    item={item}
                    isActive={item.id === activeItem}
                    onClick={() => setActiveItem(item.id)}
                />
            ))}
            {libraryItems.length === 0 && (
                <div className="text-center text-white/60 py-8">
                    Không có nội dung nào trong thư viện
                </div>
            )}
        </div>
    );
};

export default LibraryItems;
