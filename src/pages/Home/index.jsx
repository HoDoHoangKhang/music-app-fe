// React
import { useState } from "react";
import { useNavigate } from "react-router-dom";

// Component
import Navbar from "../../components/Navbar";
import SongItem from "../../components/SongItem";
import Feature from "./Feature";
import Title from "../../components/Title";
import AlbumItem from "../../components/AlbumItem";
import { useGetSongs } from "../../hooks/musics/use-get-songs";
import { useGetAlbums } from "../../hooks/musics/use-get-albums";

const categories = [
    { id: "all", label: "All" },
    { id: "music", label: "Music" },
    { id: "podcasts", label: "Podcasts" },
];

const Home = () => {
    const navigate = useNavigate();
    const [activeCategory, setActiveCategory] = useState("all");

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
                                />
                            );
                        })
                    ) : (
                        <div className="text-gray-500">No songs available</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
