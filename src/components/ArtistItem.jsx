import React from "react";
import {useNavigate } from "react-router-dom";

const ArtistItem = ({id, avatar, name }) => {
    const navigate = useNavigate();
    return (
        <div
        onClick={()=>{
            navigate(`/artist/${id}`);
        }}
        className="rounded-sm p-3 hover:bg-zinc-700/30 transition-colors group cursor-pointer  min-w-[180px] max-w-[180px]">
            <img
                src={avatar}
                alt=""
                className="aspect-square rounded-full object-cover mb-2"
            />
            <div>
                <h3 className="font-semibold text-sm truncate ">{name}</h3>
                <p className="text-xs text-gray-400 truncate">Artist</p>
            </div>
        </div>
    );
};

export default ArtistItem;
