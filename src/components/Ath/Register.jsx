import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
    FaSpotify,
    FaEnvelope,
    FaLock,
    FaEye,
    FaEyeSlash,
    FaUser,
    FaHeart,
    FaCompactDisc,
    FaBroadcastTower,
} from "react-icons/fa";

function Register() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle registration logic here
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-zinc-900 via-black to-zinc-900">
            <div className="min-h-screen flex items-center justify-center p-4">
                <div className="flex w-full max-w-6xl bg-zinc-800/50 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-sm">
                    {/* Registration Form Section */}
                    <div className="w-full md:w-1/2 p-8 md:p-12">
                        <div className="flex items-center justify-center mb-8">
                            <FaSpotify className="w-12 h-12 text-green-500" />
                            <h1 className="text-3xl font-bold text-white ml-2">
                                Spotify Clone
                            </h1>
                        </div>

                        <div className="space-y-6">
                            <h2 className="text-2xl font-bold text-white text-center">
                                Tạo tài khoản mới
                            </h2>

                            <form onSubmit={handleSubmit} className="space-y-6">
                                <div>
                                    <label
                                        htmlFor="name"
                                        className="block text-sm font-medium text-gray-200 mb-2"
                                    >
                                        Họ và tên
                                    </label>
                                    <div className="relative group">
                                        <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-green-500 transition-colors h-5 w-5" />
                                        <input
                                            type="text"
                                            id="name"
                                            value={name}
                                            onChange={(e) =>
                                                setName(e.target.value)
                                            }
                                            className="w-full pl-10 pr-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                            placeholder="Nhập họ và tên của bạn"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block text-sm font-medium text-gray-200 mb-2"
                                    >
                                        Email
                                    </label>
                                    <div className="relative group">
                                        <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-green-500 transition-colors h-5 w-5" />
                                        <input
                                            type="email"
                                            id="email"
                                            value={email}
                                            onChange={(e) =>
                                                setEmail(e.target.value)
                                            }
                                            className="w-full pl-10 pr-4 py-3 bg-zinc-900/50 border border-zinc-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                            placeholder="name@example.com"
                                            required
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="password"
                                        className="block text-sm font-medium text-gray-200 mb-2"
                                    >
                                        Mật khẩu
                                    </label>
                                    <div className="relative group">
                                        <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-green-500 transition-colors h-5 w-5" />
                                        <input
                                            type={
                                                showPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            id="password"
                                            value={password}
                                            onChange={(e) =>
                                                setPassword(e.target.value)
                                            }
                                            className="w-full pl-10 pr-12 py-3 bg-zinc-900/50 border border-zinc-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                            placeholder="••••••••"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-500 transition-colors"
                                        >
                                            {showPassword ? (
                                                <FaEyeSlash className="h-5 w-5" />
                                            ) : (
                                                <FaEye className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <div>
                                    <label
                                        htmlFor="confirmPassword"
                                        className="block text-sm font-medium text-gray-200 mb-2"
                                    >
                                        Xác nhận mật khẩu
                                    </label>
                                    <div className="relative group">
                                        <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-green-500 transition-colors h-5 w-5" />
                                        <input
                                            type={
                                                showConfirmPassword
                                                    ? "text"
                                                    : "password"
                                            }
                                            id="confirmPassword"
                                            value={confirmPassword}
                                            onChange={(e) =>
                                                setConfirmPassword(
                                                    e.target.value
                                                )
                                            }
                                            className="w-full pl-10 pr-12 py-3 bg-zinc-900/50 border border-zinc-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                                            placeholder="••••••••"
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() =>
                                                setShowConfirmPassword(
                                                    !showConfirmPassword
                                                )
                                            }
                                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-green-500 transition-colors"
                                        >
                                            {showConfirmPassword ? (
                                                <FaEyeSlash className="h-5 w-5" />
                                            ) : (
                                                <FaEye className="h-5 w-5" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full py-3 px-4 bg-green-500 hover:bg-green-400 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-zinc-800"
                                >
                                    Đăng ký
                                </button>

                                <div className="text-center">
                                    <p className="text-gray-300">
                                        Đã có tài khoản?{" "}
                                        <Link
                                            to="/"
                                            className="text-green-500 hover:text-green-400 font-semibold transition-colors"
                                        >
                                            Đăng nhập
                                        </Link>
                                    </p>
                                </div>
                            </form>
                        </div>
                    </div>

                    {/* Decorative Right Panel */}
                    <div className="hidden md:flex md:w-1/2 bg-gradient-to-br from-green-500/20 to-zinc-900 p-12 relative overflow-hidden">
                        <div className="relative z-10 flex flex-col items-center justify-center w-full h-full text-white">
                            <div className="space-y-8 text-center">
                                <div className="animate-float-slow">
                                    <FaHeart className="w-16 h-16 mx-auto text-green-500 mb-4" />
                                    <h3 className="text-2xl font-bold mb-2">
                                        Âm nhạc không giới hạn
                                    </h3>
                                    <p className="text-gray-300">
                                        Thưởng thức âm nhạc mọi lúc, mọi nơi.
                                    </p>
                                </div>
                                <div className="animate-float-medium">
                                    <FaCompactDisc className="w-16 h-16 mx-auto text-green-400 mb-4" />
                                    <h3 className="text-2xl font-bold mb-2">
                                        Chất lượng cao
                                    </h3>
                                    <p className="text-gray-300">
                                        Trải nghiệm âm thanh chất lượng cao
                                        nhất.
                                    </p>
                                </div>
                                <div className="animate-float-fast">
                                    <FaBroadcastTower className="w-16 h-16 mx-auto text-green-300 mb-4" />
                                    <h3 className="text-2xl font-bold mb-2">
                                        Radio & Podcast
                                    </h3>
                                    <p className="text-gray-300">
                                        Khám phá nội dung độc đáo mỗi ngày.
                                    </p>
                                </div>
                            </div>
                        </div>
                        {/* Decorative circles */}
                        <div className="absolute top-0 left-0 w-full h-full">
                            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-green-500/20 rounded-full blur-2xl"></div>
                            <div className="absolute bottom-1/4 right-1/4 w-40 h-40 bg-green-400/20 rounded-full blur-2xl"></div>
                            <div className="absolute top-1/2 left-1/2 w-36 h-36 bg-green-300/20 rounded-full blur-2xl"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
