import axios from "axios";

const BASE_URL = "http://127.0.0.1:8000/api";

// Thêm biến để theo dõi trạng thái refresh token
let isRefreshing = false;
let refreshSubscribers = [];

// Hàm để thêm các callback chờ refresh token hoàn tất
const subscribeTokenRefresh = (callback) => {
    refreshSubscribers.push(callback);
};

// Hàm để thông báo cho tất cả các callback khi refresh token hoàn tất
const onRefreshed = (token) => {
    refreshSubscribers.forEach((callback) => callback(token));
    refreshSubscribers = [];
};

// Hàm refresh token chung
export const refreshToken = async () => {
    try {
        const refreshTokenValue = localStorage.getItem("refresh_token");

        if (!refreshTokenValue) {
            console.error("Không tìm thấy refresh token");
            return null;
        }

        const response = await axios.post(
            `${BASE_URL}/token/refresh/`,
            {
                refresh: refreshTokenValue,
            },
            {
                // Đảm bảo không sử dụng interceptor cho request này
                _retry: true,
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

// Xử lý khi xác thực hoàn toàn thất bại
export const handleAuthFailure = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    // Thêm code để chuyển hướng người dùng về trang đăng nhập
    // window.location.href = '/login';
    console.error("Phiên đăng nhập hết hạn, vui lòng đăng nhập lại");
};

// Tạo hàm để tạo instance API với interceptors
export const createApiInstance = (baseURL) => {
    const apiInstance = axios.create({
        baseURL,
    });

    // Thêm interceptor để tự động thêm token vào request
    apiInstance.interceptors.request.use(
        async (config) => {
            const token = localStorage.getItem("access_token");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
            return config;
        },
        (error) => Promise.reject(error)
    );

    // Thêm interceptor để tự động xử lý lỗi 401
    apiInstance.interceptors.response.use(
        (response) => response,
        async (error) => {
            const originalRequest = error.config;

            // Nếu lỗi không phải 401 hoặc request đã thử lại, reject luôn
            if (error.response?.status !== 401 || originalRequest._retry) {
                return Promise.reject(error);
            }

            // Đánh dấu request này đã thử refresh
            originalRequest._retry = true;

            // Nếu đang refresh rồi thì đăng ký callback để được gọi lại sau
            if (isRefreshing) {
                return new Promise((resolve) => {
                    subscribeTokenRefresh((token) => {
                        originalRequest.headers.Authorization = `Bearer ${token}`;
                        resolve(axios(originalRequest));
                    });
                });
            }

            // Bắt đầu quá trình refresh
            isRefreshing = true;

            try {
                const token = await refreshToken();
                if (token) {
                    originalRequest.headers.Authorization = `Bearer ${token}`;
                    onRefreshed(token);
                    return axios(originalRequest);
                } else {
                    // Nếu refresh thất bại, chuyển người dùng về trang đăng nhập
                    handleAuthFailure();
                    return Promise.reject(error);
                }
            } catch (refreshError) {
                handleAuthFailure();
                return Promise.reject(refreshError);
            } finally {
                isRefreshing = false;
            }
        }
    );

    return apiInstance;
};
