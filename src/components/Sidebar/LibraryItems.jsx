import React from "react";
import LibraryItem from "./LibraryItem";
import { CiHeart } from "react-icons/ci";
const musicLibrary = [
    {
        id: "1",
        title: "Liked Songs",
        type: "playlist",
        subtitle: "20 songs",
        imagePath: "lovable-uploads/6f4e31fa-9da5-42e0-aa0b-8af4133cdd37.png",
        icon: CiHeart,
        iconColor: "rgb(139, 115, 255)",
    },
    {
        id: "2",
        title: "HIEUTHUHAI",
        type: "artist",
        imagePath: "lovable-uploads/6f4e31fa-9da5-42e0-aa0b-8af4133cdd37.png",
    },
    {
        id: "3",
        title: "Mukbang music",
        type: "playlist",
        subtitle: "Hồ Đỗ Hoàng Khang",
        imagePath: "lovable-uploads/6f4e31fa-9da5-42e0-aa0b-8af4133cdd37.png",
    },
    {
        id: "4",
        title: "Dù Cho Tàn Thế",
        type: "single",
        subtitle: "ERIK",
        imagePath: "lovable-uploads/6f4e31fa-9da5-42e0-aa0b-8af4133cdd37.png",
    },
    {
        id: "5",
        title: "Giang ơi Radio",
        type: "podcast",
        subtitle: "Giang ơi Radio",
        imagePath: "lovable-uploads/6f4e31fa-9da5-42e0-aa0b-8af4133cdd37.png",
    },
    {
        id: "6",
        title: "Chilies",
        type: "artist",
        imagePath: "lovable-uploads/6f4e31fa-9da5-42e0-aa0b-8af4133cdd37.png",
    },
    {
        id: "7",
        title: "W/N",
        type: "artist",
        imagePath: "lovable-uploads/6f4e31fa-9da5-42e0-aa0b-8af4133cdd37.png",
    },
    {
        id: "8",
        title: "Sơn Tùng M-TP",
        type: "artist",
        imagePath: "lovable-uploads/6f4e31fa-9da5-42e0-aa0b-8af4133cdd37.png",
    },
    {
        id: "9",
        title: "Đen",
        type: "artist",
        imagePath: "lovable-uploads/6f4e31fa-9da5-42e0-aa0b-8af4133cdd37.png",
    },
    {
        id: "10",
        title: "RAP VIỆT",
        type: "artist",
        imagePath: "lovable-uploads/6f4e31fa-9da5-42e0-aa0b-8af4133cdd37.png",
    },
    {
        id: "11",
        title: "RPT MCK",
        type: "artist",
        imagePath: "lovable-uploads/6f4e31fa-9da5-42e0-aa0b-8af4133cdd37.png",
    },
    {
        id: "12",
        title: "Đâm Tinh",
        type: "single",
        subtitle: "kis",
        imagePath: "lovable-uploads/6f4e31fa-9da5-42e0-aa0b-8af4133cdd37.png",
    },
];


const LibraryItems = ({ activeItem, setActiveItem }) => {
    return (
        <div className="px-2 flex-1 sidebar-scroll">
            {musicLibrary.map((item) => (
                <LibraryItem
                    key={item.id}
                    item={item}
                    isActive={item.id === activeItem}
                    onClick={() => setActiveItem(item.id)}
                />
            ))}
        </div>
    );
};

export default LibraryItems;
