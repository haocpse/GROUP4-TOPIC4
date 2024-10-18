import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap for styling
import QR from '../Assests/QR_ngan hang.png'; // Ensure the path is correct
import logo from '../Assests/logo-navbar.png';

const PaymentPageQR = () => {
    const [quotation, setQuotation] = useState(null);
    const [timeLeft, setTimeLeft] = useState(300); // 5 phút = 300 giây
    const location = useLocation();
    const navigate = useNavigate();
    const quotationId = location.state?.quotationId; // Lấy ID của đơn hàng

    const fetchQuotationDetails = async () => {
        try {
            const response = await axios.get(`https://localhost:8080/myInfo/orders/${quotationId}`);
            setQuotation(response.data);
        } catch (error) {
            console.error("Failed to fetch quotation details:", error);
            toast.error("Failed to load quotation details.");
        }
    };

    useEffect(() => {
        fetchQuotationDetails(); // Lấy thông tin đơn hàng

        // Đếm ngược thời gian
        const timer = setInterval(() => {
            setTimeLeft(prev => {
                if (prev <= 1) {
                    clearInterval(timer);
                    return 0;
                }
                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer); // Dọn dẹp khi component unmount
    }, []);

    const formatTime = (time) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes < 10 ? '0' : ''}${minutes} : ${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const handleCancelPayment = () => {
        navigate("/Payment-method"); // Chuyển đến trang Payment-method
    };

    return (
        <div className="container mt-4">
            <ToastContainer position="top-right" autoClose={5000} />
            <div className="d-flex justify-content-between align-items-center mb-3">
                <img src={logo} alt="Logo" className="img-fluid me-2" style={{ width: '30px' }} />
                <div className="timer">
                    Giao dịch hết hạn sau <span className="font-weight-bold">{formatTime(timeLeft)}</span>
                </div>
            </div>

            <div className="alert alert-warning">
                Quý khách vui lòng không tắt trình duyệt cho đến khi nhận được kết quả giao dịch trên website. Trường hợp đã thanh toán nhưng chưa nhận kết quả giao dịch, vui lòng bấm "<a href="#" className="alert-link">Tại đây</a>" để nhận kết quả. Xin cảm ơn!
            </div>

            <div className="row">
                <div className="col-md-6">
                    <div className="card p-3">
                        <h5 className="card-title">Thông tin đơn hàng</h5>
                        <p className="card-text">Số tiền thanh toán: <strong>{quotation?.totalPrice} VND</strong></p>
                        <p className="card-text">Giá trị đơn hàng: <strong>{quotation?.totalPrice} VND</strong></p>
                        <p className="card-text">Phí giao dịch: <strong>0 VND</strong></p>
                        <p className="card-text">Mã đơn hàng: <strong>{quotation?.id}</strong></p>
                        <p className="card-text">Nhà cung cấp: <strong>MC CTT VNPAY</strong></p>
                    </div>
                </div>

                <div className="col-md-6 text-center">
                    <div className="card p-3">
                        <h5 className="card-title">Quét mã qua ứng dụng Ngân hàng/ Ví điện tử</h5>
                        <img
                            alt="QR Code"
                            height="250"
                            width="250"
                            src={QR}
                            className="mx-auto d-block"
                        />
                        <p className="mt-2">Scan to Pay</p>
                        <button className="btn btn-outline-danger" onClick={handleCancelPayment}>Hủy thanh toán</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPageQR;
