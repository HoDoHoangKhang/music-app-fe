import React from 'react'
import { FaSpotify } from "react-icons/fa";
import { GoHomeFill } from "react-icons/go";
import { assets } from "../assets/assets";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
//icon
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
import { IoLogoVk } from "react-icons/io5";
import { IoLogoSlack } from "react-icons/io";
import { RxStitchesLogo } from "react-icons/rx";

//Tippy
import Tippy from "@tippyjs/react";

const Header = () => {
  return (
      <div className="text-white h-[10%] flex px-2 justify-between">
          <div className="flex items-center gap-2">
              <div className="p-[6px] text-2xl bg-pink-500/30 cursor-pointer text-pink-500 rounded-full">
                  <IoLogoSlack className=""></IoLogoSlack>
              </div>
              <button className="text-xl bg-[#242424] p-2 rounded-full cursor-pointer">
                  <GoHomeFill />
              </button>
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
      </div>
  );
}

export default Header
