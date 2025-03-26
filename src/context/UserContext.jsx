import axios from "axios";
import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext();

const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const fetchUser = async () => {
            const userId = localStorage.getItem("user_id");
            console.log(userId);
            if (!userId) return;

            try {
                const response = await axios.get(
                    `http://localhost:8000/api/users/users/${userId}/`
                );
                console.log(user);
            } catch (error) {
                console.error("Lỗi khi lấy user:", error);
            }
        };
        fetchUser();
    }, [user]);

    const contextValue = {
        user,
        setUser,
    };
    return (
        <UserContext.Provider value={contextValue}>
            {children}
        </UserContext.Provider>
    );
};
export default UserContextProvider;
