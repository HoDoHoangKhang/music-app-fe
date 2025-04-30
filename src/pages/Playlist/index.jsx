// react
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

//component
import SongRow from "../../components/SongRow";

//icon
import { FaPlay } from "react-icons/fa6";
import { FaEllipsisH } from "react-icons/fa";
import { LuClock3 } from "react-icons/lu";
import { getPlaylistDetail } from "../../api/musicService";
import PlaylistDetail from "./PlaylistDetail";
import { getTotalDuration } from "../../utils/format";

const Playlist = () => {
    const { id } = useParams(); // Lấy id từ URL
    const [playlistDetail, setPlaylistDetail] = useState(null);
    const [creatorInfo, setCreatorInfo] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const playlistDetailData = await getPlaylistDetail(id);
                setPlaylistDetail(playlistDetailData);

                // Nếu có thông tin về user/artist creator, lấy thông tin để hiển thị
                if (
                    playlistDetailData?.songs?.length > 0 &&
                    playlistDetailData?.songs[0]?.artist?.user
                ) {
                    setCreatorInfo(playlistDetailData.songs[0].artist.user);
                }
            } catch (error) {
                console.error("Lỗi khi tải thông tin playlist:", error);
            }
        };

        fetchData();
    }, [id]);

    const handleUpdateSuccess = (updatedPlaylist) => {
        setPlaylistDetail(updatedPlaylist);
    };

    const totalDuration = getTotalDuration(playlistDetail?.songs);
    const creatorName = creatorInfo
        ? `${creatorInfo.first_name} ${creatorInfo.last_name}`.trim() ||
          creatorInfo.username
        : "Không xác định";

    return (
        <div className="bg-gradient-to-b from-transparent via-[#4b4b4b] to-[#121212] py-4 flex flex-col h-full">
            <PlaylistDetail
                coverImage={playlistDetail?.cover_image}
                title={playlistDetail?.name}
                artistName={creatorName}
                totalSongs={playlistDetail?.songs?.length || 0}
                totalDuration={totalDuration}
                playlistId={id}
                onUpdateSuccess={handleUpdateSuccess}
            />
            <div className="bg-zinc-900/50 px-4 pt-8 mt-4 flex-[1]">
                <div className="flex gap-2">
                    <button className="hover:cursor-pointer px-5 py-5 bg-green-500 rounded-full hover:bg-green-400 transition-colors flex items-center space-x-2">
                        <FaPlay className="text-black text-xl" />
                    </button>
                    <button className="hover:cursor-pointer px-5 py-5 rounded-full flex items-center justify-center hover:bg-white/10 transition-colors">
                        <FaEllipsisH className="text-xl" />
                    </button>
                </div>
                <div className="grid grid-cols-[16px_minmax(120px,6fr)_minmax(120px,4fr)_minmax(120px,3fr)_minmax(120px,1fr)] gap-2 mt-6 pb-2 p-2 text-[#a7a7a7] font-medium border-b-1 border-[#a4a4a4]">
                    <p>#</p>
                    <p>Tiêu đề</p>
                    <p>Album</p>
                    <p className="hidden sm:block">Date</p>
                    <LuClock3 className="m-auto text-[18px]" />
                </div>
                <div className="mt-3">
                    {playlistDetail?.songs?.map((item, index) => (
                        <SongRow
                            key={index}
                            song={item}
                            albumTitle={item?.album?.title}
                            albumReleaseDate={item?.album?.release_date}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Playlist;
