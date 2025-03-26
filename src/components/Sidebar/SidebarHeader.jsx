// React
import React from "react";

//Component
import Navbar from "../Navbar";

// IconIcon
import { LuLibrary } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";
import { FaSearch, FaArrowRight } from "react-icons/fa";

const categories = [
    { id: "playlists", label: "Playlists"},
    { id: "artists", label: "Artists"},
    { id: "albums", label: "Albums"},
    { id: "chat", label: "Chat"},
];
const SidebarHeader = ({ activeCategory, setActiveCategory }) => {
    return (
        <div className="sticky top-0 left-0 right-0 pt-4 bg-[#121212]">
            <div className="flex items-center gap-2 mb-6">
                <LuLibrary className="w-6 h-6 text-white" />
                <span className="text-white font-bold">Your Library</span>
                <div className="ml-auto flex gap-2">
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-music-btn-bg text-white hover:bg-music-highlight transition-colors">
                        <FaPlus className="w-5 h-5" />
                    </button>
                    <button className="w-8 h-8 flex items-center justify-center rounded-full bg-music-btn-bg text-white hover:bg-music-highlight transition-colors">
                        <FaArrowRight className="w-5 h-5" />
                    </button>
                </div>
            </div>
            <div className="relative group mb-3">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 group-hover:text-green-500 transition-colors" />
                <input
                    type="text"
                    placeholder="Search chats"
                    className="text-white w-full bg-zinc-800/50 rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all placeholder-zinc-500"
                />
            </div>
            {/* Categories */}
            <Navbar
                categories={categories}
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
            />
        </div>
    );
};

export default SidebarHeader;
