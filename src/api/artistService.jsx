import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/users";

export const getSongsFromArtist = async (id) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/artists/${id}/songs/`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching songs from artist:", error);
        return [];
    }
};

export const getAlbumsFromArtist = async (id) => {
    try {
        const response = await axios.get(
            `${API_BASE_URL}/artists/${id}/albums/`
        );
        return response.data;
    } catch (error) {
        console.error("Error fetching albums from artist:", error);
        return [];
    }
};

export const getArtists = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/artists/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching artists:", error);
        return [];
    }
};
export const getArtistDetail = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/artists/${id}/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching artist detail:", error);
        return [];
    }
};

const refreshAccessToken = async () => {
    try {
        const refreshToken = localStorage.getItem("refresh_token");
        if (!refreshToken) {
            console.error("No refresh token found");
            return null;
        }

        const response = await axios.post(`${API_BASE_URL}/auth/refresh/`, {
            refresh: refreshToken,
        });

        const newAccessToken = response.data.access;
        localStorage.setItem("access_token", newAccessToken);
        return newAccessToken;
    } catch (error) {
        console.error("Error refreshing token:", error);
        localStorage.removeItem("access_token");
        localStorage.removeItem("refresh_token");
        window.location.href = "/login"; // Chuyển hướng về trang đăng nhập
        return null;
    }
};
export const getFollowStatus = async (id) => {
    if (id) {
        try {
            const token = localStorage.getItem("access_token"); // Lấy token từ localStorage
            console.log(token);
            const response = await axios.get(
                `${API_BASE_URL}/artists/${id}/follow-status/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Thêm token vào headers
                    },
                }
            );
            return response.data.isFollowing;
        } catch (error) {
            console.error("Error fetching follow status:", error);
            return null;
        }
    }
};

export const toggleFollow = async (id) => {
    try {
        const token = localStorage.getItem("access_token"); // Lấy token từ localStorage
        console.log(token);

        const response = await axios.post(
            `${API_BASE_URL}/artists/${id}/follow-toggle/`,
            {}, // Không có payload, phải truyền object rỗng
            {
                headers: {
                    Authorization: `Bearer ${token}`, // Thêm token vào headers
                },
            }
        );

        return response.data.isFollowing;
    } catch (error) {
        console.error("Error toggling follow status:", error);
        return null;
    }
};
