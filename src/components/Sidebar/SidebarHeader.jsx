// React
import React, { useState } from "react";

//Component
import Navbar from "../Navbar";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import CreatePlaylistModal from "../../pages/Playlist/CreatePlaylistModal";

// IconIcon
import { LuLibrary } from "react-icons/lu";
import { FaSearch } from "react-icons/fa";
import { Plus } from "lucide-react";
import { PiMusicNotesPlus } from "react-icons/pi";

const categories = [
    { id: "playlists", label: "Playlists" },
    { id: "artists", label: "Artists" },
    { id: "albums", label: "Albums" },
    { id: "chat", label: "Chat" },
];
const SidebarHeader = ({ activeCategory, setActiveCategory }) => {
    const [showPlaylistModal, setShowPlaylistModal] = useState(false);

    const handleCreatePlaylistSuccess = () => {
        // Có thể thêm logic cập nhật danh sách playlist nếu cần
    };

    return (
        <>
            <div className="sticky top-0 left-0 right-0 pt-4 bg-[#121212]">
                <div className="flex items-center gap-2 mb-6">
                    <LuLibrary className="w-6 h-6 text-white" />
                    <span className="text-white font-bold">Your Library</span>
                    <div className="ml-auto flex gap-2">
                        <Menu>
                            <MenuButton className="cursor-pointer flex items-center gap-2 bg-zinc-900 hover:bg-zinc-800 text-white px-4 py-2 rounded-full transition-colors">
                                <Plus size={20} />
                                <span className="font-medium">Create</span>
                            </MenuButton>
                            <MenuItems
                                anchor="bottom start"
                                className={
                                    " text-white p-1 rounded-sm bg-[#1F1F1F] z-999"
                                }
                            >
                                <MenuItem
                                    onClick={() => setShowPlaylistModal(true)}
                                    className="flex items-center p-3  hover:bg-zinc-800 cursor-pointer group rounded-sm"
                                >
                                    <div>
                                        <div className="p-3 rounded-full flex items-center justify-center mr-3 bg-[#3e3e3e]">
                                            <PiMusicNotesPlus
                                                size={30}
                                                className="text-white group-hover:text-[#1ed760] transition-all group-hover:rotate-4"
                                            />
                                        </div>
                                        <div>
                                            <p className="text-white font-medium">
                                                Playlist
                                            </p>
                                            <p className="text-gray-400 text-sm">
                                                Build a playlist with songs
                                            </p>
                                        </div>
                                    </div>
                                </MenuItem>
                            </MenuItems>
                        </Menu>
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

            {/* Sử dụng component CreatePlaylistModal */}
            <CreatePlaylistModal
                isOpen={showPlaylistModal}
                onClose={() => setShowPlaylistModal(false)}
                onSuccess={handleCreatePlaylistSuccess}
            />
        </>
    );
};

export default SidebarHeader;
