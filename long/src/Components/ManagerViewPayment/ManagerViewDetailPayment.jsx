import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ManagerViewDetailPayment = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [payment, setPayment] = useState([]);
    const [paymentInfo, setPaymentInfo] = useState([]);


    useEffect(() => {
        const fetchPayment = async () => {
            try {
                const respone = await axios.get(`http://localhost:8080/payments/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                setPayment(respone.data.data)
                setPaymentInfo(respone.data.data.paymentInfoResponseList)
                console.log(payment)
            } catch (error) {
                console.error('Error payments:', error);
                toast.error('Failed payments ^^');
            }
        }
        fetchPayment()
    }, [id])



    // kt xem co payment hay hok
    if (!payment) {
        return (
            <div className="container mt-4">
                <div className="alert alert-danger" role="alert">
                    No paymaent details available.
                </div>
            </div>
        );
    }

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
        <div className="container mt-4">
            <h2 className="text-center text-primary mb-4">Payment Details</h2>
            <div className="card">
                <div className="card-body">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th className="text-center align-content-center" >Customer Name</th>
                                <th className="text-center align-content-center">Phone</th>
                                <th className="text-center align-content-center">Address</th>
                                <th className="text-center align-content-center">Total Price (VND)</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-center align-content-center">{payment.customerName}</td>
                                <td className="text-center align-content-center">{payment.phone}</td>
                                <td className="text-center align-content-center">{payment.address}</td>
                                <td className="text-center align-content-center">{payment.totalPrice?.toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="col-12 mt-5">
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
                                {paymentInfo && paymentInfo.map(payment => (
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
                                                    <span className="badge bg-danger">Not yet</span>
                                                )}
                                            </td>
                                        </tr>
                                    </React.Fragment>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="text-center mt-4">
                        <button className="btn btn-danger" onClick={() => navigate(-1)}>
                            Back to Payment List
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ManagerViewDetailPayment;


