import Navbar from "./Navbar";
import { albumsData } from "../assets/assets";
import AlbumItem from "./AlbumItem";
import { songsData } from "../assets/assets";
import SongItem from "./SongItem";
import { useEffect, useState } from "react";
import axios from "axios";

const DisplayHome = () => {
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
        <div className="px-4 pt-1">
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
                        <AlbumItem
                            key={album.id}
                            name={album.title}
                            desc={""}
                            id={album.id}
                            image={album.cover_image}
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
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default DisplayHome;
