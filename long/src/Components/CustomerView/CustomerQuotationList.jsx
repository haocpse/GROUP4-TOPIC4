import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../Navbar/Navbar";
import { jwtDecode } from "jwt-decode";

const CustomerQuotationList = () => {
    const [quotations, setQuotations] = useState([]);
    const navigate = useNavigate();
    const customerId = "current_customer_id";
    
    const [accountId, setAccountId] = useState('')



    const fetchCustomerQuotations = async (accountId) => {
        try {
            const response = await axios.get(`http://localhost:8080/customer/${accountId}/constructionOrders/${constructionOrderId}/quotation`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Attach token
                }
            });
            setQuotations(response.data.data);
        } catch (error) {
            console.error("Failed to fetch customer quotations:", error);
            toast.error("Failed to load quotations.");
        }
    };

    useEffect(() => {
        const token = localStorage.getItem('token');
        const decoded = jwtDecode(token)
        fetchCustomerQuotations(decoded.sub);
    }, []);

    const handleApproval = async (status) => {

        const token = localStorage.getItem('token');
        const decoded = jwtDecode(token)
        const accountId = decoded.sub

        try {
            await axios.put(`http://localhost:8080/customer/${accountId}/constructionOrders/${constructionOrderId}/quotation`, {
                status: status
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Attach token
                }
            });
            toast.success(`Design ${status} successfully!`);
        } catch (error) {
            console.error("Error approving/rejecting design", error);
            toast.error(`Fail to update status! ${error.response ? error.response.data.message : ''}`);
        }
    };

    const confirmApproval = (status) => {
        const action = status ? "CONFIRMED" : "REJECTED";
        const confirmed = window.confirm(`Are you sure to want to ${action} this design?`);
        if (confirmed) {
            handleApproval(status);
        }
    };

    return (
        <> 
        <Navbar />
            <ToastContainer position="top-right" autoClose={5000} />
            <div className="container mt-4">
                <h1 className="text-center text-primary">Your Quotations</h1>
                <table className="table table-striped table-hover mt-4">
                    <thead className="thead-dark">
                        <tr>
                            <th>Quotation ID</th>
                            <th>Package Type</th>
                            <th>Total Price</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quotations.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center">No quotations found.</td>
                            </tr>
                        ) : (
                            quotations.map((quotation) => (
                                <tr key={quotation.id}>
                                    <td>{quotation.id}</td>
                                    <td>{quotation.packageType}</td>
                                    <td>{quotation.totalPrice} VND</td>
                                    <td>
                                        <span
                                            className={`badge ${
                                                quotation.status === "Pending"
                                                    ? "badge-warning"
                                                    : quotation.status === "Finished"
                                                    ? "badge-success"
                                                    : "badge-danger"
                                            }`}
                                        >
                                            {quotation.status}
                                        </span>
                                    </td>
                                    <td>
                                        <button
                                            className="btn btn-outline-primary"
                                            onClick={() => handleViewDetails(quotation)}
                                        >
                                            View Details
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

export default CustomerQuotationList;
