import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Kiểm tra token và user data trong localStorage
        const token = localStorage.getItem("access_token");
        const userId = localStorage.getItem("user_id");
        if (token && userId) {
            setIsLoggedIn(true);
            // Lấy thông tin user từ API
            const fetchUser = async () => {
                try {
                    const response = await axios.get(
                        `http://localhost:8000/api/users/users/${userId}/`,
                        {
                            headers: {
                                Authorization: `Bearer ${token}`,
                            },
                        }
                    );
                    // Thêm isPremium vào user data
                    setUser({
                        ...response.data,
                        isPremium: response.data.is_premium || false,
                    });
                } catch (error) {
                    console.error("Lỗi khi lấy user:", error);
                    logout();
                }
            };
            fetchUser();
        } else {
            setIsLoggedIn(false);
            setUser(null);
        }
    }, []);

    const login = (token, userData) => {
        localStorage.setItem("access_token", token);
        localStorage.setItem("user_id", userData.id);
        localStorage.setItem("username", userData.username);
        localStorage.setItem("role", userData.role);
        setIsLoggedIn(true);
        // Thêm isPremium vào user data khi login
        setUser({
            ...userData,
            isPremium: userData.is_premium || false,
        });
    };

    const logout = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("user_id");
        localStorage.removeItem("username");
        localStorage.removeItem("role");
        localStorage.removeItem("refresh_token");
        setIsLoggedIn(false);
        setUser(null);
    };

    const updateUser = async () => {
        const userId = localStorage.getItem("user_id");
        const token = localStorage.getItem("access_token");
        if (!userId || !token) {
            logout();
            return;
        }

        try {
            const response = await axios.get(
                `http://localhost:8000/api/users/users/${userId}/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            // Thêm isPremium vào user data khi update
            setUser({
                ...response.data,
                isPremium: response.data.is_premium || false,
            });
        } catch (error) {
            console.error("Lỗi khi lấy user:", error);
            logout();
        }
    };

    const contextValue = {
        isLoggedIn,
        user,
        setUser,
        login,
        logout,
        updateUser,
    };

    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};
export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error("useUser must be used within a UserContextProvider");
    }
    return context;
};
export default UserContextProvider;
