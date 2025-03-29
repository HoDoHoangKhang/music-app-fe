import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/music";

export const getAlbums = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/albums/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching albums:", error);
        return [];
    }
};

export const getSongs = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/songs/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching songs:", error);
        return [];
    }
};

export const getSongsFromAlbum = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/albums/${id}/songs/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching songs from album:", error);
        return [];
    }
};
export const getAlbumFromId = async (id) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/albums/${id}/`);
        return response.data;
    } catch (error) {
        console.error("Error fetching album from id:", error);
        return [];
    }
};

const refreshToken = async () => {
    try {
        const refreshTokenValue = localStorage.getItem("refresh_token");

        if (!refreshTokenValue) {
            console.error("Không tìm thấy refresh token");
            return null;
        }

        const response = await axios.post(
            "http://127.0.0.1:8000/api/token/refresh/",
            {
                refresh: refreshTokenValue,
            }
        );

        if (response.data && response.data.access) {
            localStorage.setItem("access_token", response.data.access);
            console.log("Token mới đã được lưu trữ");
            return response.data.access;
        } else {
            console.error(
                "Phản hồi refresh token không hợp lệ:",
                response.data
            );
            return null;
        }
    } catch (error) {
        console.error("Lỗi khi refresh token:", error);
        // Nếu refresh token đã hết hạn, xóa token để người dùng đăng nhập lại
        if (
            error.response &&
            (error.response.status === 401 || error.response.status === 400)
        ) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");
            console.error("Refresh token đã hết hạn, cần đăng nhập lại");
        }
        return null;
    }
};

const withAuth = async (callback) => {
    try {
        // Lấy token từ localStorage
        let token = localStorage.getItem("access_token");

        // Nếu không có token, thử refresh
        if (!token) {
            console.log("Access token không tồn tại, thử refresh...");
            token = await refreshToken();
            if (!token) {
                console.error("Không thể refresh token");
                // Có thể chuyển hướng về trang đăng nhập ở đây
                return null;
            }
        }

        console.log("Sử dụng token: ", token);

        try {
            // Thử thực hiện yêu cầu với token hiện tại
            return await callback(token);
        } catch (error) {
            // Nếu gặp lỗi 401, thử refresh token và gọi lại
            if (error.response && error.response.status === 401) {
                console.log("Token hết hạn, đang refresh...");
                token = await refreshToken();

                if (token) {
                    console.log(
                        "Đã refresh token thành công, thử lại yêu cầu..."
                    );
                    // Thử lại yêu cầu với token mới
                    return await callback(token);
                } else {
                    console.error("Refresh token thất bại, cần đăng nhập lại");
                    // Xóa các token hiện tại vì đã không còn hợp lệ
                    localStorage.removeItem("access_token");
                    localStorage.removeItem("refresh_token");
                    // Có thể thêm mã chuyển hướng về trang đăng nhập
                    return null;
                }
            } else {
                // Xử lý các lỗi khác không phải 401
                console.error("Lỗi khi thực hiện yêu cầu:", error);
                throw error;
            }
        }
    } catch (error) {
        console.error("Lỗi trong withAuth:", error);
        return null;
    }
};

export const checkSongLikeStatus = async (songId) => {
    return withAuth(async (token) => {
        try {
            const response = await axios.get(
                `${API_BASE_URL}/likes/check/${songId}/`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            return response.data.liked;
        } catch (error) {
            console.error("Error checking like status:", error);
            return false;
        }
    });
};
