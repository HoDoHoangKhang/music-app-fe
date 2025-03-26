// React
import { useEffect, useState } from "react";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";

// Component
import Navbar from "../../components/Navbar";
import SongItem from "../../components/SongItem";
import Feature from "./Feature";
import { PlayerContext } from "../../context/PlayerContext";
import Title from "../../components/Title";
import { getAlbums, getSongs } from "../../api/musicService";

const categories = [
    { id: "all", label: "All" },
    { id: "music", label: "Music" },
    { id: "podcasts", label: "Podcasts" },
];

const Home = () => {
    const navigate = useNavigate();
    const { playWithId } = useContext(PlayerContext);
    const [songs, setSongs] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [activeCategory, setActiveCategory] = useState("all");

    useEffect(() => {
        const fetchData = async () => {
            const [albumsData, songsData] = await Promise.all([
                getAlbums(),
                getSongs(),
            ]);
            setAlbums(albumsData);
            setSongs(songsData);
        };

        fetchData();
    }, []);
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
                    {albums.map((album) => (
                        <SongItem
                            key={album.id}
                            name={album.title}
                            desc={"Album"}
                            id={album.id}
                            image={album.cover_image}
                            onClick={() => navigate(`/album/${album.id}`)}
                        />
                    ))}
                </div>
            </div>
            <div className="mb-4">
                <Title
                    title={"Today biggest hits"}
                    onClick={() => navigate(`/`)}
                />
                <div className="flex overflow-auto over">
                    {songs.map((song) => {
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
                                id={song.artist.id}
                                image={song.cover_image}
                                onClick={() => playWithId(song.id)}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Home;
