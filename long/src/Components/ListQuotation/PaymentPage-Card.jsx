import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';

const PaymentPageCard = () => {
    const [quotation, setQuotation] = useState(null);
    const [timeLeft, setTimeLeft] = useState(300); // 5 phút = 300 giây
    const location = useLocation();
    const navigate = useNavigate();
    const quotationId = location.state?.quotationId;

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
        if (quotationId) {
            fetchQuotationDetails();
        }
    }, [quotationId]);

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    // Chuyển đổi thời gian còn lại thành phút và giây
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="container mt-4">
            <ToastContainer position="top-right" autoClose={5000} />
            <h1 className="text-center text-primary">Payment Details</h1>

            {quotation ? (
                <div className="row">
                    {/* Order Information */}
                    <div className="col-md-4">
                        <div className="card p-3">
                            <img src="https://placehold.co/150x50?text=VNPAY+VBan" alt="VNPAY Logo" className="mb-3" />
                            <h5>Thông tin đơn hàng</h5>
                            <hr />
                            <div className="mb-2">
                                <div className="d-flex justify-content-between">
                                    <span>Số tiền thanh toán</span>
                                    <strong>{quotation.totalPrice} <span className="text-primary">VND</span></strong>
                                </div>
                            </div>
                            <div className="mb-2">
                                <div className="d-flex justify-content-between">
                                    <span>Giá trị đơn hàng</span>
                                    <strong>{quotation.totalPrice} <span className="text-primary">VND</span></strong>
                                </div>
                            </div>
                            <div className="mb-2">
                                <div className="d-flex justify-content-between">
                                    <span>Phí giao dịch</span>
                                    <strong>0 <span className="text-primary">VND</span></strong>
                                </div>
                            </div>
                            <div className="mb-2">
                                <div className="d-flex justify-content-between">
                                    <span>Mã đơn hàng</span>
                                    <strong>{quotation.id}</strong>
                                </div>
                            </div>
                            <div>
                                <div className="d-flex justify-content-between">
                                    <span>Nhà cung cấp</span>
                                    <strong>MC CTT VNPAY</strong>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Payment Form */}
                    <div className="col-md-8">
                        <div className="card p-4">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h5>Thanh toán qua Ngân hàng ACB</h5>
                                <div className="text-end">
                                    <span>Giao dịch hết hạn sau </span>
                                    <span className="text-dark fs-4">
                                        {minutes.toString().padStart(2, '0')}:{seconds.toString().padStart(2, '0')}
                                    </span>
                                </div>
                            </div>

                            <ul className="nav nav-tabs">
                                <li className="nav-item">
                                    <a className="nav-link active" href="#">Thẻ nội địa</a>
                                </li>
                                <li className="nav-item">
                                    <a className="nav-link" href="#">Internet Banking</a>
                                </li>
                            </ul>

                            <div className="form-group mt-4">
                                <label>Số thẻ</label>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Nhập số thẻ" />
                                    <span className="input-group-text">ACB</span>
                                </div>
                            </div>

                            <div className="form-group">
                                <label>Tên chủ thẻ</label>
                                <input type="text" className="form-control mb-3" placeholder="Nhập tên chủ thẻ (không dấu)" />
                            </div>

                            <div className="form-group">
                                <label>Ngày hết hạn</label>
                                <input type="text" className="form-control mb-3" placeholder="MM/YY" />
                            </div>

                            <div className="form-group">
                                <label>Mã khuyến mại</label>
                                <div className="input-group mb-3">
                                    <input type="text" className="form-control" placeholder="Nhập mã khuyến mại" />
                                    <button className="btn btn-outline-secondary">Chọn hoặc nhập mã</button>
                                </div>
                            </div>

                            <div className="form-group mb-3">
                                <a href="#" className="text-decoration-none">Điều kiện sử dụng dịch vụ</a>
                            </div>

                            <div className="d-flex justify-content-between">
                                <button className="btn btn-outline-danger">Hủy thanh toán</button>
                                <button className="btn btn-primary">Tiếp tục</button>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div className="text-center">Loading quotation details...</div>
            )}

            {/* Footer */}
            <div className="row mt-4">
                <div className="col text-center">
                    <a href="tel:1900555577" className="text-decoration-none me-3">
                        <i className="fas fa-phone-alt"></i> 1900.5555.77
                    </a>
                    <a href="mailto:hotrovnpay@vnpay.vn" className="text-decoration-none">
                        <i className="fas fa-envelope"></i> hotrovnpay@vnpay.vn
                    </a>
                    <div className="mt-3">
                        <img src="https://placehold.co/100x50?text=Secure+GlobalSign" alt="Secure Logo" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PaymentPageCard;
