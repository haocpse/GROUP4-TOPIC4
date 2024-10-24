// import React, { useEffect, useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';

// const PaymentInfo = () => {
//     const navigate = useNavigate();
//     const [customerData, setCustomerData] = useState({});
//     const [stages, setStages] = useState([]);

//     useEffect(() => {
//         // Fetch customer information and stages data
//         axios.get('/api/customer-info')
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
//                 <p><strong>Tiền phòng:</strong> 687,500đ</p>
//                 <p className="text-success">Đã thanh toán</p>
//             </div>
//         </div>
//     );
// };

// export default PaymentInfo;

import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const PaymentInfo = () => {
    const navigate = useNavigate();
    const [customerData, setCustomerData] = useState({});
    const [stages, setStages] = useState([]);

    useEffect(() => {
        // Fetch customer and payment stages data
        axios.get('http://localhost:8080/payments')
            .then(response => {
                setCustomerData(response.data.customer);
                setStages(response.data.stages);
            })
            .catch(error => {
                console.error('Error fetching data:', error);
            });
    }, []);

    const handlePaymentClick = (stageId) => {
        // Chuyển hướng đến trang Payment Method với id của stage
        navigate(`/payment-method/${stageId}`);
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">CUSTOMER INFORMATION</h2>
            <div className="border p-3 my-3">
                <h5>Thông tin khách hàng</h5>
                <div className="row">
                    <div className="col-6">
                        <p><strong>First Name:</strong> {customerData.firstName}</p>
                        <p><strong>Last Name:</strong> {customerData.lastName}</p>
                        <p><strong>Phone:</strong> {customerData.phone}</p>
                        <p><strong>Address:</strong> {customerData.address}</p>
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
                                    <th>Tên dịch vụ</th>
                                    <th>Giá</th>
                                    <th>Trạng thái</th>
                                </tr>
                            </thead>
                            <tbody>
                                {stages.map(stage => (
                                    <React.Fragment key={stage.id}>
                                        <tr>
                                            <td>{stage.name}</td>
                                            <td>{stage.price}đ</td>
                                            <td>
                                                {stage.isPaid ? (
                                                    <span className="badge bg-success">ĐÃ THANH TOÁN</span>
                                                ) : (
                                                    <button
                                                        className="btn btn-outline-secondary"
                                                        onClick={() => handlePaymentClick(stage.id)}
                                                    >
                                                        THANH TOÁN LIỀN
                                                    </button>
                                                )}
                                            </td>
                                        </tr>
                                        <tr className="table-secondary">
                                            <td colSpan="3"><em>Chi tiết: {stage.details}</em></td>
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

            <div className="text-center">
                <p><strong>Tổng tiền:</strong> {stages.reduce((acc, stage) => acc + stage.price, 0).toLocaleString()}đ</p>
            </div>
        </div>
    );
};

export default PaymentInfo;

