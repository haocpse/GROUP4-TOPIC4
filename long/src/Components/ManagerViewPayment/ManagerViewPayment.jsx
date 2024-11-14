import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const ManagerViewPayment = () => {
    const [paymentInfo, setPaymentInfo] = useState([]);
    const [payments, setPayments] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        // Fetch customer information and stages data
        axios.get(`http://localhost:8080/payments`, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`, // Attach token
            }
        })
            .then(response => {
                setPaymentInfo(response.data.data);
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
                            <th scope="col" className="text-center">No</th>
                            <th scope="col" className="text-center">Customer Name</th>
                            <th scope="col" className="text-center">Address</th>
                            <th scope="col" className="text-center">Phone</th>
                            <th scope="col" className="text-center">Total Price</th>
                            <th scope="col" className="text-center">View Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {paymentInfo && paymentInfo.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center">No Payment available.</td>
                            </tr>
                        ) : (
                            paymentInfo && paymentInfo.map((payment, index) => (
                                <tr key={payment.constructionOrderId}>
                                    <td className="text-center align-content-center ">{index+1}</td>
                                    <td className="text-center align-content-center ">{payment.customerName}</td>
                                    <td className="text-center align-content-center ">{payment.address}</td>
                                    <td className="text-center align-content-center ">{payment.phone}</td>
                                    <td className="text-center align-content-center ">{payment.total?.toLocaleString()}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleViewDetails(payment.constructionOrderId)}
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