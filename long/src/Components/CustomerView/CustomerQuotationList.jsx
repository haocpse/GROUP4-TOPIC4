import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../Navbar/Navbar";

const CustomerQuotationList = () => {
    const [quotations, setQuotations] = useState([]);
    const navigate = useNavigate();
    const customerId = "current_customer_id";

    const fetchCustomerQuotations = async () => {
        try {
            const response = await axios.get(`https://localhost:8080/myInfo/orders`);
            setQuotations(response.data);
        } catch (error) {
            console.error("Failed to fetch customer quotations:", error);
            toast.error("Failed to load quotations.");
        }
    };

    useEffect(() => {
        fetchCustomerQuotations();
    }, []);

    const handleViewDetails = (quotation) => {
        navigate('/view-quotation', { state: { quotation } });
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
                                    <td>{quotation.totalPrice.toLocaleString()} VND</td>
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
