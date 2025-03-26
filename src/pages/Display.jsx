// React
import { useEffect, useRef } from "react";
import { Route, Routes, useLocation } from "react-router-dom";

// Data
import { albumsData } from "../assets/assets.js";

// Component
import Home from "./Home";
import Album from "./Album";
import Artist from "./Artist";
import Chat from "./Chat";
import Premium from "./Premium";
import Liked from "./Liked";
import Settings from "./Settings";
import Profile from "./Profile";

const Display = () => {
    const displayRef = useRef();
    const location = useLocation();
    const isAlbum = location.pathname.includes("album");
    const albumId = isAlbum ? location.pathname.slice(-1) : "";
    const bgColor = albumsData[Number(albumId)].bgColor;

    useEffect(() => {
        if (isAlbum) {
            displayRef.current.style.background = `linear-gradient(${bgColor},#121212)`;
        } else {
            displayRef.current.style.background = "#121212";
        }
    });
    return (
        <div
            ref={displayRef}
            className="h-[100%] rounded bg-[#121212] text-white overflow-auto border border-zinc-800 "
        >
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/album/:id" element={<Album />} />
                <Route path="/artist/:id" element={<Artist />} />
                <Route path="/chat" element={<Chat />} />

                <Route path="/premium" element={<Premium />} />
                <Route path="/liked" element={<Liked />} />
                <Route path="/settings" element={<Settings />} />
                <Route path="/profile/:id" element={<Profile />} />
            </Routes>
        </div>
    );
};

export default Display;
