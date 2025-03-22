import React, { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";
// Nếu dùng React Router để quay về trang cũ
import { useNavigate } from "react-router-dom";

const EditProfile = () => {
    // Giả lập state cho form
    const [displayName, setDisplayName] = useState("User Name");
    const [email, setEmail] = useState("user.name@gmail.com");
    const [birthdate, setBirthdate] = useState("1995-05-10");
    const [gender, setGender] = useState("male");
    const [country, setCountry] = useState("VN");
    const [avatar, setAvatar] = useState(null); // nếu muốn upload ảnh

    const navigate = useNavigate();

    // Xử lý Save
    const handleSave = (e) => {
        e.preventDefault();
        // Gửi dữ liệu lên server, v.v.
        console.log({
            displayName,
            email,
            birthdate,
            gender,
            country,
            avatar,
        });
        // Giả sử lưu xong quay về Profile
        navigate("/profile");
    };

    // Xử lý Cancel
    const handleCancel = () => {
        navigate("/profile");
    };

    // Giả lập upload ảnh
    const handleAvatarChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setAvatar(URL.createObjectURL(file));
        }
    };

    return (
        <div className="bg-[#121212] text-white min-h-screen font-sans">
            {/* HEADER */}
            <header className="bg-gradient-to-b from-purple-800 to-black px-6 md:px-10 py-6 flex items-center gap-4">
                <button
                    onClick={() => navigate("/profile")}
                    className="text-gray-200 hover:text-white transition"
                >
                    <IoIosArrowBack size={24} />
                </button>
                <h1 className="text-2xl md:text-3xl font-extrabold">
                    Edit Profile
                </h1>
            </header>

            {/* BODY */}
            <div className="px-6 md:px-10 py-8 max-w-3xl mx-auto">
                <form onSubmit={handleSave} className="space-y-6">
                    {/* Avatar Upload */}
                    <div className="flex items-center gap-4">
                        <div className="relative w-20 h-20 bg-gray-500 rounded-full flex items-center justify-center overflow-hidden">
                            {avatar ? (
                                <img
                                    src={avatar}
                                    alt="Avatar"
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <FaUserCircle className="text-5xl text-gray-200" />
                            )}
                        </div>
                        <div>
                            <label className="block mb-1 text-sm text-gray-300">
                                Profile Photo
                            </label>
                            <input
                                type="file"
                                accept="image/*"
                                onChange={handleAvatarChange}
                                className="text-sm text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-gray-700 file:text-gray-200 hover:file:bg-gray-600 cursor-pointer"
                            />
                        </div>
                    </div>

                    {/* Display Name */}
                    <div>
                        <label
                            className="block mb-1 text-sm text-gray-300"
                            htmlFor="name"
                        >
                            Display Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            value={displayName}
                            onChange={(e) => setDisplayName(e.target.value)}
                            className="w-full bg-[#2a2a2a] text-gray-100 rounded px-3 py-2 focus:outline-none"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div>
                        <label
                            className="block mb-1 text-sm text-gray-300"
                            htmlFor="email"
                        >
                            Email
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full bg-[#2a2a2a] text-gray-100 rounded px-3 py-2 focus:outline-none"
                            required
                        />
                    </div>

                    {/* Date of Birth */}
                    <div>
                        <label
                            className="block mb-1 text-sm text-gray-300"
                            htmlFor="birthdate"
                        >
                            Date of Birth
                        </label>
                        <input
                            id="birthdate"
                            type="date"
                            value={birthdate}
                            onChange={(e) => setBirthdate(e.target.value)}
                            className="bg-[#2a2a2a] text-gray-100 rounded px-3 py-2 focus:outline-none"
                        />
                    </div>

                    {/* Gender */}
                    <div>
                        <label className="block mb-1 text-sm text-gray-300">
                            Gender
                        </label>
                        <div className="flex items-center gap-4">
                            <label className="inline-flex items-center gap-1">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="male"
                                    checked={gender === "male"}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="bg-[#2a2a2a] border-none focus:ring-0"
                                />
                                <span className="text-sm text-gray-200">
                                    Male
                                </span>
                            </label>
                            <label className="inline-flex items-center gap-1">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="female"
                                    checked={gender === "female"}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="bg-[#2a2a2a] border-none focus:ring-0"
                                />
                                <span className="text-sm text-gray-200">
                                    Female
                                </span>
                            </label>
                            <label className="inline-flex items-center gap-1">
                                <input
                                    type="radio"
                                    name="gender"
                                    value="other"
                                    checked={gender === "other"}
                                    onChange={(e) => setGender(e.target.value)}
                                    className="bg-[#2a2a2a] border-none focus:ring-0"
                                />
                                <span className="text-sm text-gray-200">
                                    Other
                                </span>
                            </label>
                        </div>
                    </div>

                    {/* Country */}
                    <div>
                        <label
                            className="block mb-1 text-sm text-gray-300"
                            htmlFor="country"
                        >
                            Country
                        </label>
                        <select
                            id="country"
                            value={country}
                            onChange={(e) => setCountry(e.target.value)}
                            className="bg-[#2a2a2a] text-gray-100 rounded px-3 py-2 focus:outline-none w-full"
                        >
                            <option value="US">United States</option>
                            <option value="VN">Vietnam</option>
                            <option value="GB">United Kingdom</option>
                            <option value="JP">Japan</option>
                            {/* Thêm các quốc gia khác tuỳ ý */}
                        </select>
                    </div>

                    {/* Buttons */}
                    <div className="flex justify-end gap-4">
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="px-4 py-2 text-sm rounded bg-gray-700 hover:bg-gray-600 transition"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 text-sm rounded bg-green-500 text-black font-semibold hover:bg-green-600 transition"
                        >
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditProfile;
