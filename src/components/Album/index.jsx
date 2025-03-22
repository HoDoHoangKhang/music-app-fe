import { useParams } from "react-router-dom";
import Navbar from "../Home/Navbar";
import { albumsData, assets, songsData } from "../../assets/assets";
import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import axios from "axios";

const DisplayAlbum = () => {
    const { id } = useParams(); // Lấy id từ URL
    const [songs, setSongs] = useState([]);
    const [albumData, setAlbumData] = useState([]);
    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/music/albums/${id}/songs/`
                );
                setSongs(response.data); // Giả sử API trả về một mảng các bài hát
                setAlbumData(response.data[0].album);
            } catch (error) {
                console.error("Error fetching songs:", error);
            }
        };

        fetchSongs();
    }, []);
    const { playWithId } = useContext(PlayerContext);
    return (
        <div className="px-4 pt-1">
            <Navbar />
            <div className="mt-10 flex gap-8 flex-col md:flex-row md:items-end">
                <img
                    className="w-48 rounded"
                    src={`http://127.0.0.1:8000${albumData.cover_image}`}
                    alt=""
                />
                <div className="flex flex-col">
                    <p>Playlist</p>
                    <h2 className="text-5xl font-bold mb-4 md:text-7xl">
                        {albumData.title}
                    </h2>
                    {/* <h4>{songs && songs[0].artist.user.last_name}</h4> */}
                    <p className="mt-1">
                        <img
                            className="inline-block w-5"
                            src={assets.spotify_logo}
                            alt=""
                        />
                        <b> Spotify </b>
                        <b>• 1,232,123 saves </b>• <b>50 songs,</b>
                        <span className="text-[#a7a7a7]">
                            {" "}
                            about 2hr 30 min
                        </span>
                    </p>
                </div>
            </div>
            <div className="grid grid-cols-3 sm:grid-cols-4 mt-10 mb-4 pl-2 text-[#a7a7a7] font-bold">
                <p>
                    <b className="mr-4">#</b>Title
                </p>
                <p>Album</p>
                <p className="hidden sm:block">Date Added</p>
                <img className="m-auto w-4" src={assets.clock_icon} alt="" />
            </div>
            <hr />
            {songs.map((item, index) => (
                <div
                    onClick={() => playWithId(item.id)}
                    key={item.id}
                    className="grid grid-cols-3 sm:grid-cols-4 gap-2 p-2 items-center text-[#a7a7a7] hover:bg-[#ffffff2b] cursor-pointer"
                >
                    <div className="text-white text-sm md:text-[14px] flex items-center">
                        <b className="mr-4 text-[#a7a7a7]">{index + 1}</b>
                        <img
                            className="inline w-10 mr-5 rounded-sm"
                            src={`http://127.0.0.1:8000${item.cover_image}`}
                            alt={item.title}
                        />
                        <div className="inline-block">
                            <div>{item.title}</div>
                            <div className="text-[#a7a7a7] text-[14px]">
                                {item.artist.user.last_name.slice(0, 20)}
                            </div>
                        </div>
                    </div>
                    <p className="text-[12px]">{albumData.title}</p>
                    <p className="text-[12px] hidden sm:block">5 days ago</p>
                    <p className="text-[12px] text-center">{item.duration}</p>
                </div>
            ))}
        </div>
    );
};

export default DisplayAlbum;
