import React from "react";
import { GoHomeFill } from "react-icons/go";
import { assets } from "../assets/assets";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
//icon
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { IoLogoSlack } from "react-icons/io";
import { useNavigate } from "react-router-dom";

//Tippy
import Tippy from "@tippyjs/react";

const Header = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        localStorage.removeItem("user_id");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        navigate("/login");
    };
    return (
        <div className="text-white h-[10%] flex px-4 justify-between">
            <div className="flex items-center gap-2">
                <div
                    onClick={() => navigate("/")}
                    className="p-[6px] text-2xl bg-pink-500/30 cursor-pointer text-pink-500 rounded-full"
                >
                    <IoLogoSlack className=""></IoLogoSlack>
                </div>
                <button
                    onClick={() => navigate("/")}
                    className="text-xl bg-[#242424] p-2 rounded-full cursor-pointer"
                >
                    <GoHomeFill />
                </button>
            </div>
            <div className="flex-1 px-8">
                <div className="relative max-w-md mx-auto">
                    <input
                        type="search"
                        placeholder="Search songs, artists, or albums..."
                        className="w-full bg-muted/50 pl-8 pr-4 py-2 rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    />
                </div>
            </div>
            <div className="flex justify-between items-center font-semibold">
                <div className="flex items-center gap-4">
                    <div className="bg-white text-black rounded-full cursor-pointer px-3 py-1  border-[#ffffff26] flex items-center justify-center">
                        Cart
                    </div>
                    <Menu>
                        <MenuButton className="w-10 h-10 rounded-full bg-[#ffffff26] flex items-center justify-center">
                            <p className="w-8 h-8 bg-purple-500 text-black rounded-full flex items-center justify-center cursor-pointer">
                                B
                            </p>
                        </MenuButton>
                        <MenuItems
                            anchor="bottom end"
                            className={
                                "bg-[#282828] text-white p-1 w-[190px] rounded-sm"
                            }
                        >
                            <MenuItem>
                                <a
                                    className="rounded-sm px-3 py-2 data-[focus]:bg-[#ffffff26] flex justify-between items-center"
                                    href="/settings"
                                >
                                    <span>Account</span>
                                    <FaArrowUpRightFromSquare />
                                </a>
                            </MenuItem>
                            <MenuItem>
                                <a
                                    className="block rounded-sm px-3 py-2 data-[focus]:bg-[#ffffff26]"
                                    href="/profile"
                                >
                                    Profile
                                </a>
                            </MenuItem>
                            <MenuItem>
                                <button
                                    onClick={handleLogout}
                                    className="block rounded-sm px-3 py-2 data-[focus]:bg-[#ffffff26]"
                                >
                                    Logout
                                </button>
                            </MenuItem>
                        </MenuItems>
                    </Menu>
                </div>
            </div>
        </div>
    );
};

export default Header;
