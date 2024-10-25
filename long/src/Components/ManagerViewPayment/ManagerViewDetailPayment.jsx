import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ManagerViewDetailPayment = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [payment, setPayment] = useState([]);


    useEffect(() => {
        const fetchPayment = async () => {
            try {
                const respone = await axios.get(`http://localhost:8080/manage/payments/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                setPayment(respone.data.data)
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
                                <th className="text-center align-content-center">Price Stage 1 (VND)</th>
                                <th className="text-center align-content-center">Price Stage 2 (VND)</th>
                                <th className="text-center align-content-center">Price Stage 3 (VND)</th>
                                <th className="text-center align-content-center">Total Price (VND)</th>

                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="text-center align-content-center">{payment.customerName}</td>
                                <td className="text-center align-content-center">{payment.phone}</td>
                                <td className="text-center align-content-center">{payment.address}</td>
                                <td className="text-center align-content-center">{payment.priceStage1.toLocaleString()}</td>
                                <td className="text-center align-content-center">{payment.priceStage2.toLocaleString()}</td>
                                <td className="text-center align-content-center">{payment.priceStage3.toLocaleString()}</td>
                                <td className="text-center align-content-center">{payment.totalPrice.toLocaleString()}</td>
                            </tr>
                        </tbody>
                    </table>
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


