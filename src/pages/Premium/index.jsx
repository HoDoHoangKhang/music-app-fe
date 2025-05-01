import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { checkPremiumStatus, handlePurchase } from "../../api/paymentsService";

const Premium = () => {
    const [premiumStatus, setPremiumStatus] = useState(null);
    const [loading, setLoading] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedPackage, setSelectedPackage] = useState(null);

    useEffect(() => {
        checkPremiumStatus()
            .then((data) => {
                setPremiumStatus(data);
            })
            .catch((error) => {
                console.error("Error checking premium status:", error);
            });
    }, []);

    const handlePurchaseClick = async (paymentMethod) => {
        if (!selectedPackage) return;
        setLoading(true);

        try {
            await handlePurchase(selectedPackage, paymentMethod);
            toast.success("Mua gói premium thành công!");
            setShowPaymentModal(false);
            const newStatus = await checkPremiumStatus();
            setPremiumStatus(newStatus);
        } catch (error) {
            toast.error(
                error.response?.data?.error ||
                    "Có lỗi xảy ra khi mua gói premium"
            );
        } finally {
            setLoading(false);
        }
    };

    // Modal chọn phương thức thanh toán
    const PaymentModal = () => (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-[#282828] p-6 rounded-lg w-96 max-w-[90%]">
                <h3 className="text-xl font-bold mb-4">
                    Chọn phương thức thanh toán
                </h3>
                <div className="space-y-3">
                    <button
                        onClick={() => handlePurchaseClick("credit_card")}
                        disabled={loading}
                        className="w-full bg-[#1DB954] hover:bg-[#1ed760] py-3 rounded-full font-bold transition disabled:opacity-50"
                    >
                        Thẻ tín dụng
                    </button>
                    <button
                        onClick={() => handlePurchaseClick("bank_transfer")}
                        disabled={loading}
                        className="w-full bg-[#1DB954] hover:bg-[#1ed760] py-3 rounded-full font-bold transition disabled:opacity-50"
                    >
                        Chuyển khoản ngân hàng
                    </button>
                    <button
                        onClick={() => handlePurchaseClick("paypal")}
                        disabled={loading}
                        className="w-full bg-[#1DB954] hover:bg-[#1ed760] py-3 rounded-full font-bold transition disabled:opacity-50"
                    >
                        PayPal
                    </button>
                    <button
                        onClick={() => setShowPaymentModal(false)}
                        className="w-full border border-white hover:bg-white hover:text-black py-3 rounded-full font-bold transition"
                    >
                        Hủy
                    </button>
                </div>
            </div>
        </div>
    );

    // Hiển thị thông báo nếu đang có gói premium
    if (premiumStatus?.status === "active") {
        return (
            <div className="min-h-screen bg-[#121212] text-white p-8">
                <div className="bg-gradient-to-r from-[#1DB954] to-[#1ed760] p-6 rounded-lg text-center">
                    <h2 className="text-2xl font-bold mb-2">
                        Bạn đang sử dụng Premium!
                    </h2>
                    <p>
                        Gói của bạn sẽ hết hạn vào:{" "}
                        {new Date(
                            premiumStatus.subscription.expired_at
                        ).toLocaleDateString("vi-VN")}
                    </p>
                </div>
            </div>
        );
    }

    const premiumPlans = [
        {
            id: "FREE",
            name: "Dùng thử",
            price: "0đ",
            duration: "7 ngày",
            color: "from-green-400 to-green-600",
            features: [
                "Nghe nhạc không quảng cáo",
                "Chất lượng âm thanh cao",
                "Nghe offline",
            ],
        },
        {
            id: "MONTHLY",
            name: "Gói Tháng",
            price: "299.000đ",
            duration: "1 tháng",
            color: "from-purple-400 to-purple-600",
            features: [
                "Tất cả tính năng premium",
                "Chất lượng âm thanh cao nhất",
                "Nghe offline không giới hạn",
                "Hủy bất cứ lúc nào",
            ],
        },
        {
            id: "YEARLY",
            name: "Gói Năm",
            price: "999.000đ",
            duration: "1 năm",
            color: "from-blue-400 to-blue-600",
            features: [
                "Tất cả tính năng premium",
                "Tiết kiệm 67%",
                "Thanh toán 1 lần",
                "Hủy bất cứ lúc nào",
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-[#121212] text-white font-sans">
            {/* Header */}
            <header className="bg-gradient-to-b from-[#1DB954] to-black pt-12 pb-16 px-4 text-center">
                <h1 className="text-3xl md:text-4xl font-extrabold mb-4">
                    Nâng cấp lên Premium
                </h1>
                <p className="text-lg mb-8">
                    Trải nghiệm âm nhạc không giới hạn
                </p>
            </header>

            {/* Premium Plans */}
            <div className="max-w-7xl mx-auto px-4 -mt-8">
                <div className="grid md:grid-cols-3 gap-6">
                    {premiumPlans.map((plan) => (
                        <div
                            key={plan.id}
                            className="bg-[#282828] rounded-lg overflow-hidden"
                        >
                            <div
                                className={`bg-gradient-to-r ${plan.color} p-6`}
                            >
                                <h3 className="text-2xl font-bold mb-2">
                                    {plan.name}
                                </h3>
                                <p className="text-3xl font-bold mb-1">
                                    {plan.price}
                                </p>
                                <p className="text-sm opacity-90">
                                    {plan.duration}
                                </p>
                            </div>
                            <div className="p-6">
                                <ul className="space-y-3">
                                    {plan.features.map((feature, index) => (
                                        <li
                                            key={index}
                                            className="flex items-center gap-2"
                                        >
                                            <svg
                                                className="w-5 h-5 text-[#1DB954]"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                                <button
                                    onClick={() => {
                                        setSelectedPackage(plan.id);
                                        setShowPaymentModal(true);
                                    }}
                                    className="w-full bg-[#1DB954] hover:bg-[#1ed760] text-black font-bold py-3 rounded-full mt-6 transition"
                                >
                                    {plan.id === "FREE"
                                        ? "Dùng thử ngay"
                                        : "Đăng ký ngay"}
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Payment Methods */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="text-center mb-8">
                    <h2 className="text-2xl font-bold mb-4">
                        Chấp nhận thanh toán qua
                    </h2>
                    <div className="flex justify-center items-center gap-6 flex-wrap">
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/5/5e/Visa_Inc._logo.svg"
                            alt="Visa"
                            className="h-8"
                        />
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/2/2a/Mastercard-logo.svg"
                            alt="Mastercard"
                            className="h-8"
                        />
                        <img
                            src="https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg"
                            alt="PayPal"
                            className="h-8"
                        />
                    </div>
                </div>
            </div>

            {/* Payment Modal */}
            {showPaymentModal && <PaymentModal />}
        </div>
    );
};

export default Premium;
