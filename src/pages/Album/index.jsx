// react
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

//component
import SongRow from "../../components/SongRow";
import AlbumDetail from "./AlbumDetail";
import { getTotalDuration } from "../../utils/format";
import { useGetAlbum } from "../../hooks/musics/use-get-album";
import { useGetSongs } from "../../hooks/musics/use-get-songs";

//icon
import { FaPlay } from "react-icons/fa6";
import { FaEllipsisH } from "react-icons/fa";
import { LuClock3 } from "react-icons/lu";

const Album = () => {
    const { id } = useParams(); // Lấy id từ URL
    const [artist, setArtist] = useState();
    const {
        data: songs,
        isLoading: songsLoading,
        error: songsError,
    } = useGetSongs({
        album: id,
    });

    const {
        data: albumDetail,
        isLoading: albumLoading,
        error: albumError,
    } = useGetAlbum({
        id: id,
    });
    useEffect(() => {
        setArtist(albumDetail?.artist?.user);
    }, [albumDetail]);

    console.log(artist);
    const fullName = [artist?.first_name, artist?.last_name]
        .filter(Boolean)
        .join(" ");
    const totalDuration = getTotalDuration(songs);

    if (albumLoading || songsLoading) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
            </div>
        );
    }
    if (albumError || songsError) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <div className="text-red-500">
                    Có lỗi xảy ra: {albumError?.message || songsError?.message}
                </div>
            </div>
        );
    }
    return (
        <div className="py-4 flex flex-col h-full">
            <AlbumDetail
                coverImage={albumDetail?.cover_image}
                title={albumDetail?.title}
                artistName={fullName}
                totalSongs={songs?.length}
                totalDuration={totalDuration}
                artistAvatar={artist?.avatar}
            />
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
                    <LuClock3 className="m-auto text-[18px]" />
                </div>
                <div className="mt-3">
                    {songs.length > 0 ? (
                        songs.map((item, index) => (
                            <SongRow
                                key={index}
                                song={item}
                                albumTitle={item.album.title}
                                albumReleaseDate={item.album.release_date}
                                index={index}
                            />
                        ))
                    ) : (
                        <div className="text-gray-500">No songs available</div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Album;
