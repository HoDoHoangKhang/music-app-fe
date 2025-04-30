import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/users";

const getAuthHeaders = () => {
    const token = localStorage.getItem("access_token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getFollowStatus = async (artistId) => {
    if (!artistId) return null;

    try {
        const response = await axios.get(
            `${API_BASE_URL}/artists/${artistId}/follow-status/`,
            {
                headers: getAuthHeaders(),
            }
        );
        return response.data.isFollowing;
    } catch (error) {
        if (error.response?.status === 401) {
            console.warn(
                "Chưa đăng nhập! Không thể kiểm tra trạng thái follow."
            );
            return null;
        }
        console.error("Error fetching follow status:", error);
        return null;
    }
};

export const toggleFollow = async (artistId) => {
    if (!artistId) return null;

    try {
        const response = await axios.post(
            `${API_BASE_URL}/artists/${artistId}/follow-toggle/`,
            {},
            {
                headers: getAuthHeaders(),
            }
        );
        return response.data.isFollowing;
    } catch (error) {
        if (error.response?.status === 401) {
            console.warn("Chưa đăng nhập! Không thể follow/unfollow.");
            return null;
        }
        console.error("Error toggling follow status:", error);
        return null;
    }
};

export const getFollowingArtists = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/following-artists/`, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        if (error.response?.status === 401) {
            console.warn(
                "Chưa đăng nhập! Không thể lấy danh sách nghệ sĩ đã follow."
            );
            return null;
        }
        console.error("Error fetching following artists:", error);
        return null;
    }
};

