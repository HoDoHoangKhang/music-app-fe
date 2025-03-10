import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
//icon
import { FaArrowUpRightFromSquare } from "react-icons/fa6";

const Navbar = () => {
    const naviagte = useNavigate();
    return (
        <>
            <div className="w-full flex justify-between items-center font-semibold">
                <div className="flex items-center gap-2">
                    <img
                        className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
                        src={assets.arrow_left}
                        alt=""
                        onClick={() => naviagte(-1)}
                    />
                    <img
                        className="w-8 bg-black p-2 rounded-2xl cursor-pointer"
                        src={assets.arrow_right}
                        alt=""
                        onClick={() => naviagte(+1)}
                    />
                </div>
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
                                    href="/support"
                                >
                                    Profile
                                </a>
                            </MenuItem>
                            <MenuItem>
                                <a
                                    className="block rounded-sm px-3 py-2 data-[focus]:bg-[#ffffff26]"
                                    href="/license"
                                >
                                    Logout
                                </a>
                            </MenuItem>
                        </MenuItems>
                    </Menu>
                </div>
            </div>
            <div className="flex items-center gap-2 mt-4">
                <p className="bg-white text-black px-4 py-1 rounded-2xl">All</p>
                <p className="bg-[#242424] cursor-pointer  px-4 py-1 rounded-2xl">
                    Music
                </p>
                <p className="bg-[#242424] cursor-pointer  px-4 py-1 rounded-2xl">
                    Podcasts
                </p>
            </div>
        </>
    );
};

export default Navbar;
