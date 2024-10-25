import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const ManagerViewPayment = () => {
    const [paymentInfo, setPaymentInfo] = useState({});
    const [payments, setPayments] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        // Fetch customer information and stages data
        axios.get(`http://localhost:8080/manage/viewPayments`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // Attach token
            }
        })
            .then(response => {
                setPaymentInfo(response.data.data);
                setPayments(response.data.data.paymentInfoResponseList)
            })
            .catch(error => {
                toast.error("ERROR fetch Payment ^^")
                console.error('Error fetching data:', error);
            });
    }, []);

    const handleViewDetails = (id) => {
        navigate(`/manage/viewPayment/${id}`);
    }



    return (
        <>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div className="container mt-4">
                <div className="text-center" style={{ color: 'black' }}>
                    <h2>Payment List</h2>
                </div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col" className="text-center">Payment ID</th>
                            <th scope="col" className="text-center">Customer Name</th>
                            <th scope="col" className="text-center">Address</th>
                            <th scope="col" className="text-center">Phone</th>
                            <th scope="col" className="text-center">Total Price</th>
                            <th scope="col" className="text-center">Status</th>
                            <th scope="col" className="text-center">View Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {payments.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center">No Payment available.</td>
                            </tr>
                        ) : (
                            payments.map(payment => (
                                <tr key={payment.paymentId}>
                                    <td className="text-center align-content-center col-1">{payment.paymentId}</td>
                                    <td className="text-center align-content-center col-1">{payment.customerName}</td>
                                    <td className="text-center align-content-center col-1">{payment.address}</td>
                                    <td className="text-center align-content-center col-1">{payment.phone}</td>
                                    <td className="text-center align-content-center col-1">{payment.totalPrice}</td>
                                    <td className="text-center align-content-center col-1">{payment.status}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleViewDetails(payment.paymentId)}
                                        >
                                            View
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};
export default ManagerViewPayment;