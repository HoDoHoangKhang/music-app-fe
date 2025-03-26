import React from "react";
// Cài đặt react-icons nếu cần: npm install react-icons
import { FaHeart } from "react-icons/fa";

const Liked = () => {
    // Giả lập danh sách bài hát đã thích
    const likedSongs = [
        {
            id: 1,
            title: "Song Title 1",
            artist: "Artist 1",
            album: "Album 1",
            dateAdded: "2023-01-10",
            duration: "3:45",
        },
        {
            id: 2,
            title: "Song Title 2",
            artist: "Artist 2",
            album: "Album 2",
            dateAdded: "2023-01-12",
            duration: "4:12",
        },
        {
            id: 3,
            title: "Song Title 3",
            artist: "Artist 3",
            album: "Album 3",
            dateAdded: "2023-02-05",
            duration: "2:58",
        },
        {
            id: 4,
            title: "Song Title 4",
            artist: "Artist 4",
            album: "Album 4",
            dateAdded: "2023-02-14",
            duration: "3:50",
        },
        {
            id: 5,
            title: "Song Title 5",
            artist: "Artist 5",
            album: "Album 5",
            dateAdded: "2023-03-01",
            duration: "4:05",
        },
    ];

    return (
        <div className="min-h-screen bg-[#121212] text-white">
            {/* Header */}
            <div className="bg-gradient-to-b from-purple-700 to-black p-6 md:p-10 flex items-end gap-6">
                {/* Icon hoặc ảnh bìa */}
                <div className="w-40 h-40 bg-[#282828] rounded-md flex items-center justify-center">
                    {/* Icon trái tim lớn */}
                    <FaHeart className="text-[4rem] text-white" />
                </div>
                {/* Thông tin playlist */}
                <div>
                    <p className="uppercase text-sm font-bold text-gray-200 mb-1">
                        Playlist
                    </p>
                    <h1 className="text-2xl md:text-4xl font-extrabold mb-2">
                        Liked Songs
                    </h1>
                    <p className="text-sm text-gray-300">50 liked songs</p>
                    <p className="text-sm text-gray-400">User Name • 3h 20m</p>
                </div>
            </div>

            {/* Bảng danh sách bài hát */}
            <div className="px-4 md:px-8 py-6">
                <table className="w-full text-left border-separate [border-spacing:0]">
                    <thead className="text-gray-400 border-b border-gray-700 text-sm uppercase tracking-wider">
                        <tr>
                            <th className="pl-2 pb-3 hidden md:table-cell w-8">
                                #
                            </th>
                            <th className="pb-3">Title</th>
                            <th className="pb-3 hidden md:table-cell">Album</th>
                            <th className="pb-3 hidden lg:table-cell">
                                Date added
                            </th>
                            <th className="pb-3 pr-2 text-right">Duration</th>
                        </tr>
                    </thead>
                    <tbody>
                        {likedSongs.map((song, index) => (
                            <tr
                                key={song.id}
                                className="group text-sm hover:bg-[#2a2a2a] transition-colors"
                            >
                                <td className="pl-2 py-3 hidden md:table-cell align-middle text-gray-400 w-8">
                                    {index + 1}
                                </td>
                                <td className="py-3 flex flex-col md:flex-row md:items-center gap-2">
                                    {/* Nếu có ảnh bìa cho mỗi bài hát, bạn có thể thêm ở đây */}
                                    <span className="font-semibold">
                                        {song.title}
                                    </span>
                                    <span className="text-gray-400 text-xs md:text-sm">
                                        {song.artist}
                                    </span>
                                </td>
                                <td className="py-3 hidden md:table-cell align-middle text-gray-400">
                                    {song.album}
                                </td>
                                <td className="py-3 hidden lg:table-cell align-middle text-gray-400">
                                    {song.dateAdded}
                                </td>
                                <td className="py-3 pr-2 align-middle text-right text-gray-400">
                                    {song.duration}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Liked;
