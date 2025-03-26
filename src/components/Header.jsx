import React, { useContext } from "react";
import { GoHomeFill } from "react-icons/go";
import {assets} from "../assets/assets"

import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
//icon
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import {UserContext} from "../context/UserContext";
//Tippy

const Header = () => {
    const { user } = useContext(UserContext);
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
        <div className="text-white h-[10%] flex px-4 justify-between items-center">
            <div className="flex items-center gap-2">
                <div
                    onClick={() => navigate("/")}
                    className="p-[6px] text-2xl cursor-pointer rounded-sm"
                >
                    {/* <IoLogoSlack className=""></IoLogoSlack> */}
                    <img
                        src="https://i.pinimg.com/736x/8d/5d/e0/8d5de0333bfe2a779fa7363753a0aba9.jpg"
                        alt=""
                        className="w-10 rounded-sm"
                    />
                </div>
                <button
                    onClick={() => navigate("/")}
                    className="text-xl bg-[#242424] p-2 rounded-full cursor-pointer"
                >
                    <GoHomeFill />
                </button>
            </div>
            <div className="relative group min-w-lg">
                <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-zinc-400 group-hover:text-green-500 transition-colors" />
                <input
                    type="text"
                    placeholder="Search chats"
                    className="text-white w-full bg-[#1f1f1f] rounded-full py-2 pl-10 pr-4 focus:outline-none focus:ring-2 focus:ring-green-500/50 transition-all placeholder-zinc-500"
                />
            </div>
            <div className="flex justify-between items-center font-semibold">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate("/premium")}
                        className="px-4 py-1.5 text-sm font-semibold rounded-full bg-white cursor-pointer text-black hover:scale-105 transition-transform"
                    >
                        Premium
                    </button>
                    <Menu>
                        <MenuButton className="w-12 h-12 rounded-full bg-[#ffffff26] p-2 flex items-center justify-center cursor-pointer">
                            <img
                                className="aspect-square rounded-full object-fill"
                                src={user?.avatar || assets.avtDefault}
                                alt=""
                            />
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
