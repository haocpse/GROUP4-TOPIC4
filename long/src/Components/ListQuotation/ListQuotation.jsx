import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import styles from "./ListQuotation.module.css";
import Navbar from "../Navbar/Navbar";

const ListQuotation = () => {
    const [quotes, setQuotes] = useState([]);
    const navigate = useNavigate();

    // Hàm gọi API để lấy danh sách báo giá
    const fetchQuotations = async () => {
        try {
            const response = await axios.get("http://localhost:8080/consultant/quotations"); // Chỉnh sửa URL này theo API thực tế của bạn
            setQuotes(response.data);
        } catch (error) {
            console.error("Failed to fetch quotations:", error);
            toast.error("Failed to load quotations.");
        }
    };

    useEffect(() => {
        fetchQuotations();
    }, []);

    const handleApproval = (constructionOrderId, status) => {
        toast.success(`Quote ${status ? "approved" : "rejected"} successfully!`);
        setQuotes(quotes.filter(quote => quote.constructionOrderId !== constructionOrderId));
    };

    const handleViewDetails = (quote) => {
        navigate('/checkout', { state: { quote } });
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={5000} />
            <div className="container mt-4">
                <h1 className="text-center mt-4" style={{ color: 'blue' }}>List Quotation</h1>
                <table className="table table-bordered mt-4">
                    <thead>
                        <tr>
                            <th>Construction Order ID</th>
                            <th>Customer Name</th>
                            <th>View Details</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quotes.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center">No quotes to approve.</td>
                            </tr>
                        ) : (
                            quotes.map(quote => (
                                <tr key={quote.constructionOrderId}>
                                    <td>{quote.constructionOrderId}</td>
                                    <td>{quote.customerName}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleViewDetails(quote)}
                                        >
                                            View
                                        </button>
                                    </td>
                                    <td>{quote.status}</td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default ListQuotation;
