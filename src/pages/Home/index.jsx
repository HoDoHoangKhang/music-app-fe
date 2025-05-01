// React
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Component
import Navbar from "../../components/Navbar";
import SongItem from "../../components/SongItem";
import Feature from "./Feature";
import Title from "../../components/Title";
import AlbumItem from "../../components/AlbumItem";
import { useGetSongs } from "../../hooks/musics/use-get-songs";
import { useGetAlbums } from "../../hooks/musics/use-get-albums";
import { useUser } from "../../context/UserContext";
import { getCurrentUserPlaylists } from "../../api/musicService";
import PlaylistItem from "../../components/PlaylistItem";
import ArtistItem from "../../components/ArtistItem";
import { useGetArtists } from "../../hooks/users/use-get-artists";

const categories = [
    { id: "all", label: "All" },
    { id: "music", label: "Music" },
    { id: "podcasts", label: "Podcasts" },
];

const Home = () => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState("all");
    const [userPlaylists, setUserPlaylists] = useState([]);
    const { isLoggedIn } = useUser();

    const {
        data: songs,
        isLoading: songsLoading,
        error: songsError,
    } = useGetSongs();

    const {
        data: albums,
        isLoading: albumsLoading,
        error: albumsError,
    } = useGetAlbums();

    const {
        data: artists,
        isLoading: artistsLoading,
        error: artistsError,
    } = useGetArtists();

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (isLoggedIn) {
                    const playlists = await getCurrentUserPlaylists();
                    if (playlists) {
                        setUserPlaylists(playlists);
                    }
                }
            } catch (error) {
                console.error("Lỗi khi lấy dữ liệu:", error);
            }
        };

        fetchData();
    }, [isLoggedIn]);

    if (albumsLoading || songsLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }

    if (songsError || albumsError) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-red-500">
                    Có lỗi xảy ra: {songsError?.message || albumsError?.message}
                </div>
            </div>
        );
    }
    return (
        <div className="p-4">
            <Feature />
            <Navbar
                categories={categories}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
            />
            <div className="mb-4">
                <Title
                    title={"Featured Charts"}
                    onClick={() => navigate(`/`)}
                />
                <div className="flex overflow-auto">
                    {albums?.length > 0 ? (
                        albums?.map((album) => (
                            <AlbumItem
                                key={album.id}
                                name={album.title}
                                id={album.id}
                                image={album.cover_image}
                            />
                        ))
                    ) : (
                        <div className="text-gray-500">No albums available</div>
                    )}
                </div>
            </div>
            <div className="mb-4">
                <Title
                    title={"Today biggest hits"}
                    onClick={() => navigate(`/`)}
                />
                <div className="flex overflow-auto over">
                    {songs?.length > 0 ? (
                        songs?.map((song) => {
                            const fullName = [
                                song.artist.user.first_name,
                                song.artist.user.last_name,
                            ]
                                .filter(Boolean)
                                .join(" ");

                            return (
                                <SongItem
                                    key={song.id}
                                    name={song.title}
                                    desc={fullName}
                                    idSong={song.id}
                                    idArtist={song.artist.id}
                                    image={song.cover_image}
                                    isPremium={song.is_premium}
                                />
                            );
                        })
                    ) : (
                        <div className="text-gray-500">No songs available</div>
                    )}
                </div>
            </div>

            <div className="mb-4">
                <Title
                    title={"My Playlists"}
                    onClick={() => navigate(`/playlists`)}
                />
                <div className="flex overflow-auto">
                    {userPlaylists?.length > 0 ? (
                        userPlaylists?.map((playlist) => (
                            <PlaylistItem
                                key={playlist.id}
                                name={playlist.name}
                                image={playlist.cover_image}
                                songCount={playlist.songs.length}
                                idPlaylist={playlist.id}
                            />
                        ))
                    ) : (
                        <div className="text-gray-500">
                            {isLoggedIn
                                ? "Bạn chưa có playlist nào"
                                : "Vui lòng đăng nhập để xem playlist"}
                        </div>
                    )}
                </div>
            </div>

            <div className="mb-4">
                <Title
                    title={"Nghệ sĩ nổi bật"}
                    onClick={() => navigate(`/artists`)}
                />
                <div className="flex overflow-auto">
                    {artists.length > 0 ? (
                        artists.map((artist) => (
                            <ArtistItem
                                key={artist.id}
                                id={artist.id}
                                avatar={artist?.user?.avatar}
                                name={artist?.user?.last_name}
                            />
                        ))
                    ) : (
                        <div className="text-gray-500">
                            No artists available
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
