import { Route, Routes, useLocation } from "react-router-dom";
import DisplayHome from "./Home";
import DisplayAlbum from "./Album";
import Cart from "./Cart";
import { useEffect, useRef } from "react";
import { albumsData } from "../assets/assets";
import Artist from "./Artist";
import Chat from "./Chat";
import Premium from "./Premium";
import Liked from "./Liked";
import ProfileSettings from "./ProfileSettings.jsx";
import EditProfile from "./ProfileSettings.jsx/EditProfile.jsx";

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
                <Route path="/" element={<DisplayHome />} />
                <Route path="/album/:id" element={<DisplayAlbum />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/artist/:id" element={<Artist />} />
                <Route path="/chat" element={<Chat />} />

                <Route path="/premium" element={<Premium />} />
                <Route path="/liked" element={<Liked />} />
                <Route path="/profile" element={<ProfileSettings />} />
                <Route path="/edit-profile" element={<EditProfile />} />
            </Routes>
        </div>
    );
};

export default Display;
