import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import React, { useContext } from "react";
import { useUser } from "../../context/UserContext";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();
    const { login } = useUser();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        try {
            const response = await axios.post(
                "http://localhost:8000/api/login/",
                {
                    username,
                    password,
                }
            );

            const data = response.data;
            login(data.access_token, {
                id: data.user_id,
                username: data.username,
                role: data.role,
            });
            navigate("/");
        } catch (err) {
            setError(err.response?.data?.error || "Đăng nhập thất bại");
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <form
                onSubmit={handleSubmit}
                className="bg-white p-6 rounded-lg shadow-md w-96"
            >
                <h2 className="text-2xl font-semibold text-center mb-4">
                    Đăng nhập
                </h2>
                {error && <p className="text-red-500 text-center">{error}</p>}
                <div className="mb-4">
                    <label className="block text-gray-700">Tên đăng nhập</label>
                    <input
                        type="text"
                        className="w-full px-3 py-2 border rounded-lg"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-gray-700">Mật khẩu</label>
                    <input
                        type="password"
                        className="w-full px-3 py-2 border rounded-lg"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600"
                >
                    Đăng nhập
                </button>
            </form>
        </div>
    );
};

export default Login;
