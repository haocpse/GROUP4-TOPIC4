import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const ApproveQuotation = () => {
    const [quotes, setQuotes] = useState([]);
    const navigate = useNavigate();

    const fetchQuotes = async () => {
        try {
            const response = await axios.get('http://localhost:8080/manage/quotes');
            setQuotes(response.data);
        } catch (error) {
            console.error("Fail to fetch quotes! ^^", error);

            toast.error("Fail to fetch quotes! ^^");
        }
    };

    const handleApproval = async (quotationId, status) => {
        try {
            await axios.post('http://localhost:8080/manage/approve-quotes', {
                quotationId: quotationId,
                status: status
            });

            // Thông báo cho người dùng và cập nhật UI
            toast.success(`Quote ${status ? "approved" : "rejected"} successfully!`);
            // phuong thuc filter la tao ra 1 mang chua cac quotes nhma bỏ đi những quotes đã đc update trạng thái
            setQuotes(quotes.filter(quote => quote.quotationId !== quotationId));

            // fetchQuotes();

        } catch (error) {
            console.error("Fail to approve/reject quote ^^", error);
            toast.error("Fail to update status! ^^");
        }
    };

    const confirmApproval = (quotationId, status) => {
        const action = status ? "approve" : "reject";
        const confirmed = window.confirm(`Are you sure to want to ${action} this quote?`);
        if (confirmed) {
            handleApproval(quotationId, status);
        }
    };

    const handleViewDetails = (quote) => {
        navigate('/manage/view-quotation', { state: { quote } }); // state dc dùng để chứa dữ liệu
    }

    useEffect(() => {
        fetchQuotes();
    }, []);

    return (
        <>
            <ToastContainer position="top-right" autoClose={5000} />
            <div className="container mt-4">
                <h2 className="text-center" style={{ color: 'black' }}>Admin - Approve Quotes</h2>
                <table className="table table-bordered mt-4">
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Quotation ID</th>
                            <th>Customer Name</th>
                            <th>Package Type</th>
                            <th>Volume</th>
                            <th>Total Price</th>
                            <th>View Details</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quotes.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center">No quotes to approve.</td>
                            </tr>
                        ) : (
                            quotes.map(quote => (
                                <tr key={quote.quotationId}>
                                    <td>{quote.constructionOrderId}</td>
                                    <td>{quote.quotationId}</td>
                                    <td>{quote.customerName}</td>
                                    <td>{quote.packageType}</td>
                                    <td>{quote.volume}</td>
                                    <td>{quote.totalPrice}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleViewDetails(quote)}
                                        >
                                            View
                                        </button>
                                    </td>

                                    <td>
                                        <button
                                            className="btn btn-success me-2"
                                            onClick={() => confirmApproval(quote.quotationId, true)}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => confirmApproval(quote.quotationId, false)}
                                        >
                                            Reject
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

