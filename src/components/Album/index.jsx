import { useParams } from "react-router-dom";
import Navbar from "../Home/Navbar";
import { albumsData, assets, songsData } from "../../assets/assets";
import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import axios from "axios";
import { FaEllipsisH } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";
import SongRow from "./SongRow";

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
        <div className="py-4 flex flex-col h-full">
            <div className="px-4 flex gap-8 flex-col md:flex-row md:items-end">
                <img
                    className="w-48 rounded shadow-[0_4px_12px_0_#0000004d]"
                    src={`http://127.0.0.1:8000${albumData.cover_image}`}
                    alt=""
                />
                <div className="flex flex-col">
                    <p>Playlist</p>
                    <h2 className="text-5xl font-bold mb-4 md:text-7xl">
                        {albumData.title}
                    </h2>
                    {/* <h4>{songs && songs[0].artist.user.last_name}</h4> */}
                    <p className="mt-1 text-[#a7a7a7] font-medium">
                        <img
                            className="inline-block w-5"
                            src={assets.spotify_logo}
                            alt=""
                        />
                        <b className="text-white "> Name </b>
                        <b>• 1,232,123 saves </b>• <b>50 songs,</b>
                        <span className="text-[#a7a7a7] font-medium">
                            {" "}
                            about 2hr 30 min
                        </span>
                    </p>
                </div>
            </div>
            <div className="bg-zinc-900/50 px-4 pt-8 mt-4 flex-[1] ">
                <div className="flex gap-2">
                    <button className="hover:cursor-pointer px-5 py-5 bg-green-500 rounded-full hover:bg-green-400 transition-colors flex items-center space-x-2">
                        <FaPlay className="text-black text-xl" />
                    </button>
                    <button className="hover:cursor-pointer px-5 py-5  rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                        <FaEllipsisH className="text-xl" />
                    </button>
                </div>
                <div className="grid grid-cols-[16px_minmax(120px,6fr)_minmax(120px,4fr)_minmax(120px,3fr)_minmax(120px,1fr)] gap-2 mt-6 pb-2 p-2 text-[#a7a7a7] font-medium border-b-1 border-[#a4a4a4]">
                    <p>#</p>
                    <p>Title</p>
                    <p>Album</p>
                    <p className="hidden sm:block">Date Added</p>
                    <img
                        className="m-auto w-4"
                        src={assets.clock_icon}
                        alt=""
                    />
                </div>
                <div className="mt-3">
                    {songs.map((item, index) => (
                        <SongRow key={index} song={item} album={albumData} index={index}/>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default DisplayAlbum;
