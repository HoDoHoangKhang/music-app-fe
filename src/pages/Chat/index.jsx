import React, { useState, useEffect } from "react";
import {
    FaSearch,
    FaPaperPlane,
    FaSmile,
    FaPaperclip,
    FaEllipsisH,
    FaPlay,
} from "react-icons/fa";
import { getJoinedFandoms } from "../../api/community";

const Chat = () => {
    const [fandoms, setFandoms] = useState([]);
    const [selectedFandom, setSelectedFandom] = useState(null);
    const [searchQuery, setSearchQuery] = useState("");

    useEffect(() => {
        const fetchFandoms = async () => {
            try {
                const data = await getJoinedFandoms();
                setFandoms(data);
                if (data.length > 0) {
                    setSelectedFandom(data[0]);
                }
            } catch (error) {
                console.error("Lỗi khi tải danh sách fandom:", error);
            }
        };

        fetchFandoms();
    }, []);

    const filteredFandoms = fandoms.filter((fandom) =>
        fandom.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <div className="flex h-full">
            {/* Fandom List - 30% */}
            <div className="w-[20%] border-r border-zinc-800/50 bg-[#121212] overflow-y-auto">
                <div className="p-[18px] border-b border-zinc-800/50 backdrop-blur-sm bg-zinc-900/90 sticky top-0 z-10">
                    <div className="relative group">
                        <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 group-hover:text-green-500 transition-colors" />
                        <input
                            type="text"
                            placeholder="Tìm kiếm fandom..."
                            className="text-white w-full bg-zinc-800/50 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all placeholder-zinc-500"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                </div>
                <div className="p-2">
                    {/* Fandom List Items */}
                    <div className="space-y-2">
                        {filteredFandoms.map((fandom) => (
                            <div
                                key={fandom.id}
                                className={`flex items-center space-x-3 p-3 hover:bg-zinc-800/50 rounded-lg cursor-pointer transition-colors ${
                                    selectedFandom?.id === fandom.id
                                        ? "bg-zinc-800/50"
                                        : ""
                                }`}
                                onClick={() => setSelectedFandom(fandom)}
                            >
                                <img
                                    src={
                                        fandom.avatar ||
                                        "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?auto=format&fit=crop&w=100&h=100"
                                    }
                                    alt={fandom.name}
                                    className="w-12 h-12 rounded-full object-cover ring-2 ring-zinc-700/50"
                                />
                                <div>
                                    <h3 className="font-semibold text-white">
                                        {fandom.name}
                                    </h3>
                                    <p className="text-sm text-zinc-400">
                                        {fandom.member_count} thành viên
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Chat Area - 70% */}
            <div className="flex-1 flex flex-col bg-[#121212]">
                {selectedFandom ? (
                    <>
                        {/* Chat Header */}
                        <div className="p-4 border-b border-zinc-800/50 backdrop-blur-sm flex items-center justify-between bg-zinc-900/90 sticky top-0 z-10">
                            <div className="flex items-center space-x-3">
                                <img
                                    src={
                                        selectedFandom.avatar ||
                                        "https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?auto=format&fit=crop&w=100&h=100"
                                    }
                                    alt={selectedFandom.name}
                                    className="w-10 h-10 rounded-full object-cover ring-2 ring-zinc-700/50"
                                />
                                <div>
                                    <h2 className="font-semibold flex items-center gap-2">
                                        {selectedFandom.name}
                                        <span className="text-xs text-green-500">
                                            ● Online
                                        </span>
                                    </h2>
                                    <p className="text-sm text-zinc-400">
                                        {selectedFandom.member_count} thành viên
                                    </p>
                                </div>
                            </div>
                            <button className="p-2 hover:bg-zinc-800/50 rounded-full transition-colors">
                                <FaEllipsisH className="text-zinc-400" />
                            </button>
                        </div>

                        {/* Messages Area */}
                        <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar">
                            {/* Example Messages */}
                            <div className="flex justify-start">
                                <div className="max-w-[70%] bg-zinc-800/50 rounded-r-xl rounded-tl-xl p-3 backdrop-blur-sm shadow-lg">
                                    <p className="text-sm font-semibold text-green-500 mb-1">
                                        John
                                    </p>
                                    <p className="text-sm">
                                        Chào mọi người! Mọi người thế nào? 🎉
                                    </p>
                                    <p className="text-xs text-zinc-400 mt-1 text-right">
                                        12:30
                                    </p>
                                </div>
                            </div>

                            <div className="flex justify-end">
                                <div className="max-w-[70%] bg-green-500/20 rounded-l-xl rounded-tr-xl p-3 backdrop-blur-sm shadow-lg">
                                    <p className="text-sm">
                                        Tuyệt vời! Nghe thử bài hát mới này nhé!
                                    </p>
                                    <div className="mt-2">
                                        <div className="relative group">
                                            <img
                                                src="https://images.unsplash.com/photo-1459749411175-04bf5292ceea?auto=format&fit=crop&w=300&h=200"
                                                alt="attachment"
                                                className="rounded-lg w-full object-cover max-h-48"
                                            />
                                            <button className="absolute inset-0 flex items-center justify-center bg-black/50 group-hover:bg-black/70 transition-colors">
                                                <FaPlay className="text-white text-2xl" />
                                            </button>
                                        </div>
                                    </div>
                                    <p className="text-xs text-zinc-400 mt-1 text-right">
                                        12:31
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* Message Input */}
                        <form className="p-4 border-t border-zinc-800/50 backdrop-blur-sm bg-zinc-900/90 sticky bottom-0">
                            <div className="flex items-center space-x-3">
                                <button
                                    type="button"
                                    className="p-2 hover:bg-zinc-800/50 rounded-full transition-colors relative group"
                                >
                                    <FaSmile className="text-zinc-400 group-hover:text-green-500 transition-colors" />
                                </button>
                                <button
                                    type="button"
                                    className="p-2 hover:bg-zinc-800/50 rounded-full transition-colors group"
                                >
                                    <FaPaperclip className="text-zinc-400 group-hover:text-green-500 transition-colors" />
                                    <input
                                        type="file"
                                        className="hidden"
                                        multiple
                                        accept="image/*,video/*,audio/*"
                                    />
                                </button>
                                <div className="flex-1 relative">
                                    <input
                                        type="text"
                                        placeholder="Nhập tin nhắn..."
                                        className="w-full bg-zinc-800/50 rounded-full py-2 px-4 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all placeholder-zinc-500"
                                    />
                                </div>
                                <button
                                    type="button"
                                    className="p-3 bg-green-500/90 hover:bg-green-500 rounded-full transition-all duration-300 transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-green-500/50"
                                >
                                    <FaPaperPlane className="text-white" />
                                </button>
                            </div>
                        </form>
                    </>
                ) : (
                    <div className="flex items-center justify-center h-full">
                        <p className="text-zinc-400">
                            Chọn một fandom để bắt đầu trò chuyện
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Chat;
