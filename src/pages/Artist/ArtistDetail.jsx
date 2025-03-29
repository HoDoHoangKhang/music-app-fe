// React
import React, { useEffect, useState } from "react";

// Icon
import { HiOutlineDotsHorizontal } from "react-icons/hi";
import { HiCheckBadge } from "react-icons/hi2";
import { FaPlay } from "react-icons/fa";
import { getFollowStatus, toggleFollow } from "../../api/artistService";

const ArtistDetail = ({ backropImage, name, id }) => {
    const [isFollow, setIsFollow] = useState(false);
    useEffect(() => {
        const fetchData = async () => {
            const [isFollowData] = await Promise.all([getFollowStatus(id)]);
            setIsFollow(isFollowData);
            console.log(isFollow);
        };

        fetchData();
    }, [id]);
    return (
        <div>
            <div className="h-[40vh] relative overflow-hidden flex items-end ">
                <div className="absolute inset-0">
                    <img
                        src={backropImage}
                        alt=""
                        className="absolute inset-0 w-full h-full object-cover "
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/60 to-black"></div>
                </div>

                <div className="absolute inset-0 bg-black/40"></div>
                <div className="px-6 z-10 mb-10">
                    <div className="flex items-center mb-2">
                        <HiCheckBadge className="text-2xl text-[#73c3ff]" />
                        <p className="text-[12px]">Nghệ sĩ được xác minh</p>
                    </div>
                    <p className="text-6xl font-black mb-6">{name}</p>
                    <p>100.000 người nghe hằng tháng</p>
                </div>
            </div>
            <div className="flex items-center pb-3 px-5 gap-4 border-[rgb(39,39,42)] border-b-1 bg-black ">
                <button className="bg-[#1ED760] p-4 text-l rounded-full text-[black] cursor-pointer">
                    <FaPlay></FaPlay>
                </button>
                <button
                    onClick={() => {
                        setIsFollow(!isFollow);
                        toggleFollow(id);
                    }}
                    className="border-[1px] rounded-full px-3 py-1 font-bold text-[12px] cursor-pointer"
                >
                    {isFollow ? "Following" : "Follow"}
                </button>
                <button className="text-2xl cursor-pointer">
                    <HiOutlineDotsHorizontal></HiOutlineDotsHorizontal>
                </button>
            </div>
        </div>
    );
};

export default ArtistDetail;
