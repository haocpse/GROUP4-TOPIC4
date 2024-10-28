import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const ApproveQuotation = () => {
    const [quotes, setQuotes] = useState([]);
    const navigate = useNavigate();

    const fetchQuotes = async () => {
        try {
            const response = await axios.get('http://localhost:8080/quotations', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Attach token
                }
            });
            setQuotes(response.data.data);
        } catch (error) {
            console.error("Fail to fetch quotes! ^^", error);

            toast.error("Fail to fetch quotes! ^^");
        }
    };

    const handleViewDetails = (id) => {
        navigate(`/manage/quotations/${id}`); // state dc dùng để chứa dữ liệu
    }

    useEffect(() => {
        fetchQuotes();
    }, []);

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
            <ToastContainer position="top-right" autoClose={5000} />
            <div className="container-fuild mt-4">
                <h2 className="text-center" style={{ color: 'black' }}>Approve Quotes</h2>
                <table className="table table-bordered mt-4">
                    <thead>
                        <tr>
                            <th scope="col" className="text-center">No</th>
                            <th scope="col" className="text-center">Consultant</th>
                            <th scope="col" className="text-center">Post Date</th>
                            <th scope="col" className="text-center">Customer Name</th>
                            <th scope="col" className="text-center">Package Type</th>
                            <th scope="col" className="text-center">Volume (m³)</th>
                            <th scope="col" className="text-center">Total Price</th>
                            <th scope="col" className="text-center">Status</th>
                            <th scope="col" className="text-center">View Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quotes.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center">No quotes to approve.</td>
                            </tr>
                        ) : (
                            quotes.map((quote, index) => (
                                <tr key={quote.id}>
                                    <td className="text-center align-content-center">{index + 1}</td>
                                    <td className="text-center align-content-center">{quote.leaderName}</td>
                                    <td className="text-center align-content-center">{formatDate(quote.postedDate)}</td>
                                    <td className="text-center align-content-center">{quote.customerName}</td>
                                    <td className="text-center align-content-center">{quote.packageType}</td>
                                    <td className="text-center align-content-center">{quote.volume}</td>
                                    <td className="text-center align-content-center">{quote.totalPrice.toLocaleString()}</td>
                                    <td className="text-center align-content-center">{quote.status}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleViewDetails(quote.id)}
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
}
export default ApproveQuotation;


