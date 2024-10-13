import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const ApproveQuotation = () => {
    const [quotes, setQuotes] = useState([]);
    const navigate = useNavigate();

    const fetchQuotes = async () => {
        try {
            const response = await axios.get('http://localhost:8080/manage/quotations');
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

    return (
        <>
            <ToastContainer position="top-right" autoClose={5000} />
            <div className="container-fuild mt-4">
                <h2 className="text-center" style={{ color: 'black' }}>Approve Quotes</h2>
                <table className="table table-bordered mt-4">
                    <thead>
                        <tr>
                            <th scope="col" className="text-center">Order ID</th>
                            <th scope="col" className="text-center">Quotation ID</th>
                            <th scope="col" className="text-center">Customer Name</th>
                            <th scope="col" className="text-center">Package Type</th>
                            <th scope="col" className="text-center">Volume</th>
                            <th scope="col" className="text-center">Total Price</th>
                            <th scope="col" className="text-center">View Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quotes.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center">No quotes to approve.</td>
                            </tr>
                        ) : (
                            quotes.map(quote => (
                                <tr key={quote.id}>
                                    <td className="text-center align-content-center">{quote.constructionOrderId}</td>
                                    <td className="text-center align-content-center">{quote.id}</td>
                                    <td className="text-center align-content-center">{quote.customerName}</td>
                                    <td className="text-center align-content-center">{quote.packageType}</td>
                                    <td className="text-center align-content-center">{quote.volume}</td>
                                    <td className="text-center align-content-center">{quote.totalPrice.toLocaleString()}</td>
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


