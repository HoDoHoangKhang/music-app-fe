import { useNavigate } from "react-router-dom";

const LoginRequiredPopup = ({ isOpen, onClose }) => {
    const navigate = useNavigate();

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-zinc-800 p-6 rounded-lg max-w-md w-full mx-4">
                <h2 className="text-xl font-semibold text-white mb-4">
                    Yêu cầu đăng nhập
                </h2>
                <p className="text-gray-300 mb-6">
                    Bạn cần đăng nhập để thực hiện thao tác này. Vui lòng đăng
                    nhập để tiếp tục.
                </p>
                <div className="flex justify-end space-x-4">
                    <button
                        onClick={onClose}
                        className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                    >
                        Hủy
                    </button>
                    <button
                        onClick={() => {
                            navigate("/login");
                            onClose();
                        }}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
                    >
                        Đăng nhập
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginRequiredPopup;
