import { Route, Routes, useLocation } from "react-router-dom";
import DisplayHome from "./DisplayHome";
import DisplayAlbum from "./DisplayAlbum";
import Cart from "./Cart";
import { useEffect, useRef } from "react";
import { albumsData } from "../assets/assets";
import Header from "./Header";
import Artist from "./Artist";
import Login from "./Ath/Login";

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
            displayRef.current.style.background =
                "linear-gradient(#212121,#121212)";
        }
    });
    return (
        <div
            ref={displayRef}
            className="h-[100%] rounded bg-[#121212] text-white overflow-auto"
        >
            <Routes>
                <Route path="/" element={<DisplayHome />} />
                <Route path="/album/:id" element={<DisplayAlbum />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/artist/:id" element={<Artist />} />
            </Routes>
        </div>
    );
};

export default Display;
