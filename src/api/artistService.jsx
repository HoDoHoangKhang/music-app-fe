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

const refreshToken = async () => {
    try {
        const response = await axios.post(
            "http://127.0.0.1:8000/api/token/refresh/",
            {
                refresh: localStorage.getItem("refresh_token"),
            }
        );
        localStorage.setItem("access_token", response.data.access);
        return response.data.access;
    } catch (error) {
        console.error("Error refreshing token:", error);
        return null;
    }
};

const withAuth = async (callback) => {
    let token = localStorage.getItem("access_token");
    if (!token) {
        console.log("Access token không tồn tại, thử refresh...");
        token = await refreshToken();
    }
    if (token) {
        console.log("Token hợp lệ: ", token);
        try {
            return await callback(token);
        } catch (error) {
            if (error.response && error.response.status === 401) {
                console.error("Token không hợp lệ, thử refresh lại...");
                token = await refreshToken();
                if (token) {
                    console.log("Token mới hợp lệ: ", token);
                    return await callback(token);
                }
            }
            console.error("Lỗi khi thực hiện callback:", error);
            return null;
        }
    } else {
        console.error("Không thể refresh token");
        return null;
    }
};

export const getFollowStatus = async (id) => {
    if (!id) {
        return null;
    }
    return withAuth(async (token) => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/artists/${id}/follow-status/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data.isFollowing;
        } catch (error) {
            console.error("Error fetching follow status:", error);
            return null;
        }
    });
};

export const toggleFollow = async (id) => {
    return withAuth(async (token) => {
        try {
            const response = await axios.post(
                `${API_BASE_URL}/artists/${id}/follow-toggle/`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data.isFollowing;
        } catch (error) {
            console.error("Error toggling follow status:", error);
            return null;
        }
    });
};
