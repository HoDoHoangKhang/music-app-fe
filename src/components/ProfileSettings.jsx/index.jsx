import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoIosArrowForward } from "react-icons/io";

const ProfileSettings = () => {
    // Ví dụ state cho toggle cài đặt
    const [enableNotifications, setEnableNotifications] = useState(true);
    const [enableExplicitContent, setEnableExplicitContent] = useState(false);
    const [language, setLanguage] = useState("English");
    const [audioQuality, setAudioQuality] = useState("High");
    const [themeColor, setThemeColor] = useState("Dark");

    return (
        <div className="bg-[#121212] text-white min-h-screen font-sans">
            {/* ===== HEADER ===== */}
            <header className="bg-gradient-to-b from-purple-800 to-black px-6 md:px-10 py-8 flex items-center gap-6">
                {/* Avatar (giả lập) */}
                <div className="w-20 h-20 rounded-full bg-gray-500 flex items-center justify-center">
                    <FaUserCircle className="text-5xl text-gray-200" />
                </div>
                {/* Thông tin người dùng */}
                <div>
                    <h1 className="text-2xl md:text-3xl font-extrabold mb-1">
                        User Name
                    </h1>
                    <p className="text-gray-300 text-sm">user.name@gmail.com</p>
                </div>
            </header>

            {/* ===== BODY ===== */}
            <div className="px-6 md:px-10 py-8">
                {/* ==== Profile Overview ==== */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-3">Profile</h2>
                    <div className="bg-[#1c1c1c] p-4 rounded-md flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-300">
                                Account Overview
                            </p>
                            <p className="text-sm text-gray-500">
                                Premium plan • Joined 2023 • Payment method:
                                VISA ****1234
                            </p>
                        </div>
                        <button className="text-sm text-gray-300 flex items-center gap-1 hover:text-white">
                            Edit profile <IoIosArrowForward />
                        </button>
                    </div>
                </section>

                {/* ==== Settings Section ==== */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-3">Settings</h2>

                    {/* Notifications */}
                    <div className="bg-[#1c1c1c] p-4 rounded-md mb-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-300">
                                Notifications
                            </p>
                            <label className="inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={enableNotifications}
                                    onChange={() =>
                                        setEnableNotifications(
                                            !enableNotifications
                                        )
                                    }
                                />
                                <div className="w-9 h-5 bg-gray-600 peer-focus:outline-none rounded-full peer-checked:bg-green-500 transition-all relative">
                                    <div className="dot absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-4" />
                                </div>
                            </label>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            Receive notifications about new releases, playlist
                            updates, and more.
                        </p>
                    </div>

                    {/* Explicit Content */}
                    <div className="bg-[#1c1c1c] p-4 rounded-md mb-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-300">
                                Allow explicit content
                            </p>
                            <label className="inline-flex items-center cursor-pointer">
                                <input
                                    type="checkbox"
                                    className="sr-only peer"
                                    checked={enableExplicitContent}
                                    onChange={() =>
                                        setEnableExplicitContent(
                                            !enableExplicitContent
                                        )
                                    }
                                />
                                <div className="w-9 h-5 bg-gray-600 peer-focus:outline-none rounded-full peer-checked:bg-green-500 transition-all relative">
                                    <div className="dot absolute top-0.5 left-0.5 w-4 h-4 bg-white rounded-full transition-all peer-checked:translate-x-4" />
                                </div>
                            </label>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            Allow songs and podcasts with explicit content.
                        </p>
                    </div>

                    {/* Language */}
                    <div className="bg-[#1c1c1c] p-4 rounded-md mb-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-300">Language</p>
                            <select
                                className="bg-[#2a2a2a] text-gray-200 text-sm rounded px-2 py-1 focus:outline-none"
                                value={language}
                                onChange={(e) => setLanguage(e.target.value)}
                            >
                                <option value="English">English</option>
                                <option value="Vietnamese">Tiếng Việt</option>
                                <option value="Spanish">Español</option>
                                <option value="French">Français</option>
                            </select>
                        </div>
                    </div>

                    {/* Audio Quality */}
                    <div className="bg-[#1c1c1c] p-4 rounded-md mb-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-300">
                                Audio Quality
                            </p>
                            <select
                                className="bg-[#2a2a2a] text-gray-200 text-sm rounded px-2 py-1 focus:outline-none"
                                value={audioQuality}
                                onChange={(e) =>
                                    setAudioQuality(e.target.value)
                                }
                            >
                                <option value="Low">Low</option>
                                <option value="Normal">Normal</option>
                                <option value="High">High</option>
                                <option value="Very High">Very High</option>
                            </select>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                            Higher quality uses more data.
                        </p>
                    </div>

                    {/* Theme (Dark / Light) - minh họa */}
                    <div className="bg-[#1c1c1c] p-4 rounded-md mb-4">
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-gray-300">Theme</p>
                            <select
                                className="bg-[#2a2a2a] text-gray-200 text-sm rounded px-2 py-1 focus:outline-none"
                                value={themeColor}
                                onChange={(e) => setThemeColor(e.target.value)}
                            >
                                <option value="Dark">Dark</option>
                                <option value="Light">Light</option>
                            </select>
                        </div>
                    </div>
                </section>

                {/* ==== Spotify Wrapped / Stats (minh họa) ==== */}
                <section className="mb-8">
                    <h2 className="text-xl font-bold mb-3">Spotify Wrapped</h2>
                    <div className="bg-[#1c1c1c] p-4 rounded-md">
                        <p className="text-sm text-gray-300 mb-2">
                            Here's a quick look at your recent stats:
                        </p>
                        <ul className="text-sm text-gray-200 space-y-1">
                            <li>- Top artist: The Weeknd</li>
                            <li>- Top genre: Pop</li>
                            <li>- Minutes listened: 12,345</li>
                            <li>- Favorite decade: 2010s</li>
                        </ul>
                        <button className="mt-4 px-4 py-2 bg-green-500 text-black font-semibold rounded hover:bg-green-600 transition">
                            View Full Wrapped
                        </button>
                    </div>
                </section>
            </div>

        </div>
    );
};

export default ProfileSettings;
