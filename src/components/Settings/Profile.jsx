import { useParams } from "react-router-dom";
import { albumsData, assets, songsData } from "../../assets/assets";
import { useContext, useEffect, useState } from "react";
import { PlayerContext } from "../../context/PlayerContext";
import axios from "axios";
import { FaEllipsisH } from "react-icons/fa";
import { FaPlay } from "react-icons/fa6";
import SongRow from "../Album/SongRow";
import ArtistItem from "../Artist/ArtistItem";

const Profile = () => {
    const { id } = useParams(); // Lấy id từ URL
    const [songs, setSongs] = useState([]);
    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await axios.get(
                    `http://127.0.0.1:8000/api/music/songs/`
                );
                setSongs(response.data); // Giả sử API trả về một mảng các bài hát
            } catch (error) {
                console.error("Error fetching songs:", error);
            }
        };

        fetchSongs();
    }, []);
    const { playWithId } = useContext(PlayerContext);
    return (
        <div className="py-4 flex flex-col h-full bg-gradient-to-b from-orange-700 to-transparent">
            <div className="px-4 flex gap-8 flex-col md:flex-row md:items-end">
                <img
                    className="w-48 rounded-full shadow-[0_4px_12px_0_#0000004d]"
                    src="https://images.genius.com/a7c69b14897ffc5feb3febaa21f945c3.1000x1000x1.jpg"
                    alt=""
                />
                <div className="flex flex-col">
                    <p>Profile</p>
                    <h2 className="text-5xl font-bold mb-4 md:text-7xl">
                        AJSASDHASD
                    </h2>
                    {/* <h4>{songs && songs[0].artist.user.last_name}</h4> */}
                    <p className="mt-1 text-[#a7a7a7] font-medium">
                        <b>2 Public Playlist </b>•{" "}
                        <b className="text-white">7 Following</b>
                    </p>
                </div>
            </div>
            <div className="bg-zinc-900/50 px-4 pt-8 mt-4 flex-[1]">
                <button className="hover:cursor-pointer px-5 py-5  rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                    <FaEllipsisH className="text-xl" />
                </button>

                <div>
                    <div className="flex items-center justify-between">
                        <h1 className="my-5 font-bold text-2xl">
                            Following
                            <p className="text-white/50 text-sm font-medium">
                                Only visible to you
                            </p>
                        </h1>
                        <button className="font-bold hover:underline hover:cursor-pointer">
                            Show all
                        </button>
                    </div>

                    <div className="flex overflow-auto over">
                        <ArtistItem />
                        <ArtistItem />
                        <ArtistItem />
                        <ArtistItem />
                        <ArtistItem />
                        <ArtistItem />
                        <ArtistItem />
                    </div>
                </div>

                <div>
                    <div className="mt-3">
                        {songs.map((item, index) => (
                            <SongRow
                                key={index}
                                song={item}
                                album={albumData}
                                index={index}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Profile;
