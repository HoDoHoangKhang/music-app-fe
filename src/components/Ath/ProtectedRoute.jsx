import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const isAuthenticated = localStorage.getItem("user_id"); // Kiểm tra trạng thái đăng nhập

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;
