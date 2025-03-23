import React, { useState } from "react";
import SidebarHeader from "./SidebarHeader";
import LibraryItems from "./LibraryItems";

export const MusicSidebar = () => {
    const [activeCategory, setActiveCategory] = useState("playlists");
    const [activeItem, setActiveItem] = useState("1");
    
    return (
        <div className="border border-zinc-800 flex flex-col h-full  animate-fade-in min-w-[260px] overflow-auto bg-[#121212] px-4 pb-4  rounded-sm">
            {/* Header */}
            <SidebarHeader
                activeCategory={activeCategory}
                setActiveCategory={setActiveCategory}
            />
            {/* <SidebarSearch /> */}
            <LibraryItems
                activeItem={activeItem}
                setActiveItem={setActiveItem}
            />
            {/* <MiniPlayer /> */}
        </div>
    );
};

export default MusicSidebar;
