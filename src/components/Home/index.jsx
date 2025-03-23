import Navbar from "./Navbar";
import SongItem from "../SongItem";
import { useEffect, useState } from "react";
import axios from "axios";
import Feature from "./Feature";
import { useContext } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import { useNavigate } from "react-router-dom";

const DisplayHome = () => {
    const navigate = useNavigate();
    const { playWithId } = useContext(PlayerContext);
    const [songs, setSongs] = useState([]);
    const [albums, setAlbums] = useState([]);
    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await axios.get(
                    "http://127.0.0.1:8000/api/music/albums/"
                );
                setAlbums(response.data); // Giả sử API trả về một mảng các bài hát
            } catch (error) {
                console.error("Error fetching songs:", error);
            }
        };

        fetchSongs();
    }, []);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await axios.get(
                    "http://127.0.0.1:8000/api/music/songs/"
                );
                setSongs(response.data); // Giả sử API trả về một mảng các bài hát
            } catch (error) {
                console.error("Error fetching songs:", error);
            }
        };

        fetchSongs();
    }, []);
    return (
        <div className="p-4">
            <Feature />
            <Navbar />
            <div className="mb-4">
                <div className="flex items-center justify-between">
                    <h1 className="my-5 font-bold text-2xl">Featured Charts</h1>
                    <button className="font-bold hover:underline hover:cursor-pointer">
                        Show all
                    </button>
                </div>
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
                <div className="flex items-center justify-between">
                    <h1 className="my-5 font-bold text-2xl">
                        Today&apos;s biggest hits
                    </h1>
                    <button className="font-bold hover:underline hover:cursor-pointer">
                        Show all
                    </button>
                </div>
                <div className="flex overflow-auto over">
                    {songs.map((song) => {
                        let fullName = song.artist.user.last_name
                            ? song.artist.user.first_name +
                              " " +
                              song.artist.user.last_name
                            : song.artist.user.first_name +
                              song.artist.user.last_name;

                        return (
                            <SongItem
                                key={song.id}
                                name={song.title}
                                desc={fullName}
                                id={song.id}
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

export default DisplayHome;
