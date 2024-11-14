import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { redirect, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer'

const PaymentInfo = () => {
    const navigate = useNavigate();
    const [paymentInfo, setPaymentInfo] = useState({});
    const [payments, setPayments] = useState([]);
    const [url, setURL] = useState({});
    const { constructionOrderId } = useParams()

    useEffect(() => {

        const token = localStorage.getItem('token');
        const decoded = jwtDecode(token)
        const accountId = decoded.sub

        // Fetch customer information and stages data
        axios.get(`http://localhost:8080/customer/${accountId}/constructionOrders/${constructionOrderId}/payments`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // Attach token
            }
        })
            .then(response => {
                setPaymentInfo(response.data.data);
                setPayments(response.data.data.paymentInfoResponseList)
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handlePaymentClick = async (price, paymentId) => {
        // Chuyển hướng đến trang Payment Method với id của stage
        const response = await axios.post(`http://localhost:8080/payments/${paymentId}/vnpay?amount=${price}`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // Attach token
            }
        });
        console.log(response.data.data)
        window.location.href = response.data.data;

    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
    };

    return (
        <>
        <Navbar/>
        <div className="container mt-5">
            <h2 className="text-center">CUSTOMER INFORMATION</h2>
            <div className="border p-3 my-3">
                <h5>Thông tin khách hàng</h5>
                <div className="row">
                    <div className="col-6">
                        <p><strong>Customer Name:</strong> {paymentInfo.customerName}</p>
                        <p><strong>Phone:</strong> {paymentInfo.phone}</p>
                        <p><strong>Address:</strong> {paymentInfo.address}</p>
                    </div>
                </div>
            </div>

            <div className="border p-3 my-3">
                <h5>Construction Information</h5>
                <div className="row">
                    <div className="col-12">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th>Service</th>
                                    <th>Price</th>
                                    <th>Payment Date</th>
                                    <th>Due Date</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {payments && payments.map(payment => (
                                    <React.Fragment key={payment.paymentId}>
                                        <tr>
                                            <td>{payment.paymentTitle}</td>
                                            <td>{payment.price.toLocaleString()}</td>
                                            <td>{formatDate(payment.paidDate)}</td>
                                            <td>{formatDate(payment.dueDate)}</td>
                                            <td>
                                                {payment.paymentStatus === "SUCCESS" ? (
                                                    <span className="badge bg-success">Paid</span>
                                                ) : (
                                                    <button
                                                        className="btn btn-outline-secondary"
                                                        onClick={() => handlePaymentClick(payment.price, payment.paymentId)}
                                                    >
                                                        Pay Now
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <button
                className="btn btn-outline-secondary mb-4"
                onClick={() => navigate("/myInfo/orders")}
            >
                Back
            </button>
        </div>
        <Footer/>
        </>
    );
};

export default PaymentInfo;

// import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const PaymentInfo = () => {
//     const navigate = useNavigate();
//     const [customerData, setCustomerData] = useState({});
//     const [stages, setStages] = useState([]);

//     useEffect(() => {
//         // Fetch customer and payment stages data
//         axios.get('/api/customer-payment-info')
//             .then(response => {
//                 setCustomerData(response.data.customer);
//                 setStages(response.data.stages);
//             })
//             .catch(error => {
//                 console.error('Error fetching data:', error);
//             });
//     }, []);

//     const handlePaymentClick = (stageId) => {
//         // Chuyển hướng đến trang Payment Method với id của stage
//         navigate(`/payment-method/${stageId}`);
//     };

//     return (
//         <div className="container mt-5">
//             <h2 className="text-center">CUSTOMER INFORMATION</h2>
//             <div className="border p-3 my-3">
//                 <h5>Thông tin khách hàng</h5>
//                 <div className="row">
//                     <div className="col-6">
//                         <p><strong>First Name:</strong> {customerData.firstName}</p>
//                         <p><strong>Last Name:</strong> {customerData.lastName}</p>
//                         <p><strong>Phone:</strong> {customerData.phone}</p>
//                         <p><strong>Address:</strong> {customerData.address}</p>
//                     </div>
//                 </div>
//             </div>

//             <div className="border p-3 my-3">
//                 <h5>Construction Information</h5>
//                 <div className="row">
//                     <div className="col-12">
//                         <table className="table">
//                             <thead>
//                                 <tr>
//                                     <th>Tên dịch vụ</th>
//                                     <th>Giá</th>
//                                     <th>Trạng thái</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {stages.map(stage => (
//                                     <React.Fragment key={stage.id}>
//                                         <tr>
//                                             <td>{stage.name}</td>
//                                             <td>{stage.price}đ</td>
//                                             <td>
//                                                 {stage.isPaid ? (
//                                                     <span className="badge bg-success">ĐÃ THANH TOÁN</span>
//                                                 ) : (
//                                                     <button
//                                                         className="btn btn-outline-secondary"
//                                                         onClick={() => handlePaymentClick(stage.id)}
//                                                     >
//                                                         THANH TOÁN LIỀN
//                                                     </button>
//                                                 )}
//                                             </td>
//                                         </tr>
//                                         <tr className="table-secondary">
//                                             <td colSpan="3"><em>Chi tiết: {stage.details}</em></td>
//                                         </tr>
//                                     </React.Fragment>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 </div>
//             </div>

//             <div className="text-center">
//                 <p><strong>Tổng tiền:</strong> {stages.reduce((acc, stage) => acc + stage.price, 0).toLocaleString()}đ</p>
//             </div>
//         </div>
//     );
// };

// export default PaymentInfo;

