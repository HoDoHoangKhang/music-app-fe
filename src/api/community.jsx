import axios from "axios";
const API_BASE_URL = "http://127.0.0.1:8000/api/community";

// Lấy danh sách fandom đã tham gia
export const getJoinedFandoms = async () => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/fandoms/joined/`,
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
                },
            }
        );
        return response.data;
    } catch (error) {
        console.error("Lỗi khi lấy danh sách fandom:", error);
        throw error;
    }
};
