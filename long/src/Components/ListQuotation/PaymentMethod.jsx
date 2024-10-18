import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import QR from '../Assests/QR_ngan hang.png';
import Back_icon from '../Assests/Bank_icon.png';
import mastercard from '../Assests/mastercard-removebg-preview.png';
const banks = [
    { name: 'Vietcombank', logo: 'https://placehold.co/100x50?text=Vietcombank' },
    { name: 'VietinBank', logo: 'https://placehold.co/100x50?text=VietinBank' },
    { name: 'BIDV', logo: 'https://placehold.co/100x50?text=BIDV' },
    { name: 'Agribank', logo: 'https://placehold.co/100x50?text=Agribank' },
    { name: 'Sacombank', logo: 'https://placehold.co/100x50?text=Sacombank' },
    { name: 'Techcombank', logo: 'https://placehold.co/100x50?text=Techcombank' },
    { name: 'MB Bank', logo: 'https://placehold.co/100x50?text=MB+Bank' },
    { name: 'TPBank', logo: 'https://placehold.co/100x50?text=TPBank' },
    // Add more banks as needed
];

const PaymentMethods = () => {
    const [showBanks, setShowBanks] = useState(false);
    const [search, setSearch] = useState('');
    const navigate = useNavigate();

    const filteredBanks = banks.filter(bank =>
        bank.name.toLowerCase().includes(search.toLowerCase())
    );

    const handleBankSelect = (bank) => {
        navigate('/payment-Card', { state: { bank } });
    };

    const handleVnpayQRSelect = () => {
        navigate('/payment-QR', { state: { paymentMethod: 'VNPAYQR' } });
    };

    return (
        <div className="container mt-4">
            <div className="text-center mb-4">
                <h1>Chọn phương thức thanh toán</h1>
            </div>

            {/* VNPAYQR Payment Method */}
            <div className="card p-3 mb-3 shadow-sm" onClick={handleVnpayQRSelect} style={{ cursor: 'pointer' }}>
                <div className="d-flex justify-content-between align-items-center">
                    <div>Ứng dụng thanh toán hỗ trợ <span className="text-danger">VNPAYQR</span></div>
                    <img src={QR} alt="Logo" className="img-fluid me-2" style={{ width: '50px' }} />
                </div>
            </div>

            {/* Domestic Card & Bank Account Payment Method */}
            <div className="card p-3 mb-3 shadow-sm">
                <div
                    className="d-flex justify-content-between align-items-center"
                    onClick={() => setShowBanks(!showBanks)}
                    style={{ cursor: 'pointer' }}
                >
                    <div>Thẻ nội địa và tài khoản ngân hàng</div>
                    <img src={Back_icon} alt="Logo" className="img-fluid me-2" style={{ width: '50px' }} />
                </div>
            </div>

            {showBanks && (
                <div className="card p-4 mb-3 shadow-sm">
                    <div className="mb-3">
                        <div className="input-group">
                            <span className="input-group-text">
                                <i className="fas fa-search"></i>
                            </span>
                            <input
                                type="text"
                                className="form-control"
                                placeholder="Tìm kiếm..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="row">
                        {filteredBanks.map((bank, index) => (
                            <div
                                className="col-6 col-md-3 mb-3"
                                key={index}
                                onClick={() => handleBankSelect(bank)}
                                style={{ cursor: 'pointer' }}
                            >
                                <div className="border p-3 text-center">
                                    <img src={bank.logo} alt={`${bank.name} Logo`} className="img-fluid" />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* International Card Payment Method */}
            <div className="card p-3 mb-3 shadow-sm">
                <div className="d-flex justify-content-between align-items-center">
                    <div>Thẻ thanh toán quốc tế</div>
                    <div>
                        <img src={mastercard} alt="mastercard" className="me-2" style={{ width: '40px' }} />
                        <img alt="Visa Icon" src="https://placehold.co/50x30?text=Visa" className="me-2" />
                        <img alt="JCB Icon" src="https://placehold.co/50x30?text=JCB" className="me-2" />
                        <img alt="UnionPay Icon" src="https://placehold.co/50x30?text=UnionPay" />
                    </div>
                </div>
            </div>

            {/* VNPAY Wallet Payment Method */}
            <div className="card p-3 mb-3 shadow-sm">
                <div className="d-flex justify-content-between align-items-center">
                    <div>Ví điện tử <span className="text-danger">VNPAY</span></div>
                    <img alt="VNPAY Wallet Icon" src="https://placehold.co/50x50?text=VNPAY+Wallet" />
                </div>
            </div>
        </div>
    );
};

export default PaymentMethods;
