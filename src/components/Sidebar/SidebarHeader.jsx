import React from "react";
import { LuLibrary } from "react-icons/lu";
import { FaPlus } from "react-icons/fa6";

import { FaArrowRight } from "react-icons/fa";
const categories = [
    { id: "playlists", label: "Playlists", active: false },
    { id: "artists", label: "Artists", active: true },
    { id: "albums", label: "Albums", active: false },
    { id: "podcasts", label: "Podcasts & Shows", active: false },
];
const SidebarHeader = ({ activeCategory, setActiveCategory }) => {
    return (
        <div className="sticky top-0 left-0 right-0 pl-4 pr-4 bg-black">
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

            {/* Categories */}
            <div className="flex flex-wrap gap-2 mb-4">
                {categories.map((category) => (
                    <button
                        key={category.id}
                        onClick={() => setActiveCategory(category.id)}
                        className="bg-white px-3 py-1 rounded-4xl"
                    >
                        {category.label}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SidebarHeader;
