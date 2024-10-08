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
            setQuotes(response.data);
        } catch (error) {
            console.error("Fail to fetch quotes! ^^", error);

            toast.error("Fail to fetch quotes! ^^");
        }
    };

    const handleViewDetails = (quote) => {
        navigate(`/manage/quotations/${quote.quotationId}`, { state: { quote } }); // state dc dùng để chứa dữ liệu
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


// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { ToastContainer } from "react-toastify";

// const ApproveQuotation = () => {
//     const [quotes, setQuotes] = useState([]);
//     const navigate = useNavigate();

//     // Mock data để thay thế cho việc fetch từ API
//     const mockQuotes = [
//         {
//             constructionOrderId: '123',
//             quotationId: 'Q001',
//             customerName: 'John Doe',
//             packageType: 'Basic',
//             volume: 100,
//             totalPrice: 5000000
//         },
//         {
//             constructionOrderId: '124',
//             quotationId: 'Q002',
//             customerName: 'Jane Smith',
//             packageType: 'Premium',
//             volume: 150,
//             totalPrice: 7500000
//         }
//     ];

//     const fetchQuotes = async () => {
//         // Thay vì gọi API, bạn chỉ cần set mock data vào state
//         setQuotes(mockQuotes);
//     };

//     const handleViewDetails = (quote) => {
//         navigate(`/manage/quotations/${quote.quotationId}`, { state: { quote } });
//     }

//     useEffect(() => {
//         fetchQuotes(); // Dùng mock data
//     }, []);

//     return (
//         <>
//             <ToastContainer position="top-right" autoClose={5000} />
//             <div className="container mt-4">
//                 <h2 className="text-center" style={{ color: 'black' }}>Admin - Approve Quotes</h2>
//                 <table className="table table-bordered mt-4">
//                     <thead>
//                         <tr>
//                             <th>Order ID</th>
//                             <th>Quotation ID</th>
//                             <th>Customer Name</th>
//                             <th>Package Type</th>
//                             <th>Volume</th>
//                             <th>Total Price</th>
//                             <th>View Details</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {quotes.length === 0 ? (
//                             <tr>
//                                 <td colSpan="8" className="text-center">No quotes to approve.</td>
//                             </tr>
//                         ) : (
//                             quotes.map(quote => (
//                                 <tr key={quote.quotationId}>
//                                     <td>{quote.constructionOrderId}</td>
//                                     <td>{quote.quotationId}</td>
//                                     <td>{quote.customerName}</td>
//                                     <td>{quote.packageType}</td>
//                                     <td>{quote.volume}</td>
//                                     <td>{quote.totalPrice}</td>
//                                     <td>
//                                         <button
//                                             className="btn btn-primary"
//                                             onClick={() => handleViewDetails(quote)}
//                                         >
//                                             View
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </>
//     );
// }
// export default ApproveQuotation;
