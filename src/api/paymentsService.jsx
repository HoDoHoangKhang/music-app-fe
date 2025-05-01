import axios from "axios";

const API_BASE_URL = "http://127.0.0.1:8000/api/payments";

const getAuthHeaders = () => {
    const token = localStorage.getItem("access_token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const createPayment = async (paymentData) => {
    try {
        const response = await axios.post(
            `${API_BASE_URL}/create/`,
            paymentData,
            {
                headers: getAuthHeaders(),
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error creating payment:", error);
        throw error;
    }
};

export const getPaymentHistory = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/history/`, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching payment history:", error);
        throw error;
    }
};

export const checkPremiumStatus = async () => {
    try {
        const response = await axios.get(`${API_BASE_URL}/premium/status/`, {
            headers: getAuthHeaders(),
        });
        return response.data;
    } catch (error) {
        console.error("Error checking premium status:", error);
        throw error;
    }
};

export const handlePurchase = async (packageType, paymentMethod) => {
    if (!packageType) return;

    try {
        const response = await axios.post(
            `${API_BASE_URL}/premium/purchase/`,
            {
                package_type: packageType,
                payment_method: paymentMethod,
            },
            {
                headers: getAuthHeaders(),
            }
        );
        return response.data;
    } catch (error) {
        console.error("Error purchasing premium package:", error);
        throw error;
    }
};
