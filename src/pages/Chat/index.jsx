import React from "react";
import {
    FaSpotify,
    FaSearch,
    FaPaperPlane,
    FaSmile,
    FaPaperclip,
    FaEllipsisH,
    FaUsers,
    FaUserCircle,
    FaPlay,
    FaMicrophone,
    FaChevronLeft,
} from "react-icons/fa";
const Chat = () => {
    return (
        <div className="flex-1 flex flex-col md:relative fixed inset-0 z-20 bg-[#121212] h-full">
            {/* Chat Header */}
            <div className="p-4 border-b border-zinc-800/50 backdrop-blur-sm flex items-center justify-between bg-zinc-900/90 sticky top-0 z-10">
                <div className="flex items-center space-x-3">
                    <button className="md:hidden p-2 hover:bg-zinc-800/50 rounded-full transition-colors">
                        <FaChevronLeft />
                    </button>
                    <img
                        src="https://images.unsplash.com/photo-1494232410401-ad00d5433cfa?auto=format&fit=crop&w=100&h=100"
                        alt="Chat"
                        className="w-10 h-10 rounded-full object-cover ring-2 ring-zinc-700/50"
                    />
                    <div>
                        <h2 className="font-semibold flex items-center gap-2">
                            Group Chat Name
                            <span className="text-xs text-green-500">
                                ● Online
                            </span>
                        </h2>
                        <p className="text-sm text-zinc-400">
                            5 members • John, Sarah and others
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
                            Hey everyone! How's it going? 🎉
                        </p>
                        <p className="text-xs text-zinc-400 mt-1 text-right">
                            12:30
                        </p>
                    </div>
                </div>

                <div className="flex justify-end">
                    <div className="max-w-[70%] bg-green-500/20 rounded-l-xl rounded-tr-xl p-3 backdrop-blur-sm shadow-lg">
                        <p className="text-sm">
                            Great! Check out this new track!
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
                            placeholder="Type a message..."
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
        </div>
    );
};

export default Chat;
