// React
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// Component
import Navbar from "../../components/Navbar";
import SongItem from "../../components/SongItem";
import VideoItem from "../../components/VideoItem";
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
import { getAllVideos } from "../../api/musicService";

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
    const [videos, setVideos] = useState([]);
    const [videosLoading, setVideosLoading] = useState(true);
    const [videosError, setVideosError] = useState(null);

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

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const response = await getAllVideos();
                if (response) {
                    setVideos(response.data);
                }
            } catch (error) {
                setVideosError(error);
            } finally {
                setVideosLoading(false);
            }
        };

        fetchVideos();
    }, []);

    // Dữ liệu giả cho video
    const mockVideos = [
        {
            id: 1,
            title: "MV Nhạc Trẻ Hay Nhất 2024",
            artist: "Sơn Tùng M-TP",
            cover_image: "https://i.ytimg.com/vi/example1/maxresdefault.jpg",
            duration: 180,
            views: 10000000,
        },
        {
            id: 2,
            title: "Live Concert Đình Đám",
            artist: "Đen Vâu",
            cover_image: "https://i.ytimg.com/vi/example2/maxresdefault.jpg",
            duration: 240,
            views: 5000000,
        },
        {
            id: 3,
            title: "Mashup Nhạc Việt Hot",
            artist: "Hòa Minzy",
            cover_image: "https://i.ytimg.com/vi/example3/maxresdefault.jpg",
            duration: 360,
            views: 3000000,
        },
        {
            id: 4,
            title: "Acoustic Cover",
            artist: "Mỹ Tâm",
            cover_image: "https://i.ytimg.com/vi/example4/maxresdefault.jpg",
            duration: 200,
            views: 2000000,
        },
        {
            id: 5,
            title: "Dance Performance",
            artist: "Suboi",
            cover_image: "https://i.ytimg.com/vi/example5/maxresdefault.jpg",
            duration: 150,
            views: 1500000,
        },
    ];

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

            <div className="mb-4">
                <Title
                    title={"Video Nổi Bật"}
                    onClick={() => navigate(`/videos`)}
                />
                <div className="flex overflow-auto">
                    {videosLoading ? (
                        <div className="flex items-center justify-center w-full h-40">
                            <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
                        </div>
                    ) : videosError ? (
                        <div className="text-red-500">
                            Có lỗi xảy ra khi tải video
                        </div>
                    ) : videos.length > 0 ? (
                        videos.map((video) => (
                            <VideoItem key={video.id} video={video} />
                        ))
                    ) : (
                        <div className="text-gray-500">Không có video nào</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
