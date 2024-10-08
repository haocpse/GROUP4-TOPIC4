import axios from "axios";
import React from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ViewQuotation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const { quotationId } = useParams();
    const quote = location.state?.quote;

    const handleApproval = async (status) => {
        try {
            await axios.post(`http://localhost:8080/manage/quotation/${quotationId}`, {
                status: status
            });
            toast.success(`Quotation ${status === "approve" ? "approve" : "reject"} successfully!`);
            navigate("/manage/quotations");
            // fetchDesigns();
        } catch (error) {
            console.error("Error approving/rejecting quotation", error);
            toast.error("Fail to update status! ^^");
        }

    };
    const confirmApproval = (status) => {
        const action = status ? "approve" : "reject";
        const confirmed = window.confirm(`Are you sure to want to ${action} this quote?`);
        if (confirmed) {
            handleApproval(status);
        }
    };


    // kt xem co quote hay hok
    if (!quote) {
        return (
            <div className="container mt-4">
                <div className="alert alert-danger" role="alert">
                    No quotation details available.
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h2 className="text-center text-primary mb-4">Quotation Details</h2>
            <div className="card">
                <div className="card-body">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Customer Name</th>
                                <th>Package Type</th>
                                <th>Volume (m³)</th>
                                <th>Price Stage 1 (VND)</th>
                                <th>Price Stage 2 (VND)</th>
                                <th>Price Stage 3 (VND)</th>
                                <th>Total Price (VND)</th>
                                <th>Customer Request</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{quote.customerName}</td>
                                <td>{quote.packageType}</td>
                                <td>{quote.volume}</td>
                                <td>{quote.priceStage1}</td>
                                <td>{quote.priceStage2}</td>
                                <td>{quote.priceStage3}</td>
                                <td>{quote.totalPrice}</td>
                                <td>{quote.customerRequest}</td>

                            </tr>
                        </tbody>
                    </table>

                    <h3 className="mt-4">Content:</h3>
                    <ul className="list-group">
                        {quote.content.map((item, index) => (
                            <li key={index} className="list-group-item">{item}</li>
                        ))}
                    </ul>

                    <div className="text-center mt-4">

                        <button
                            className="btn btn-success me-2"
                            onClick={() => confirmApproval("approve")}
                        >
                            Approve
                        </button>
                        <button
                            className="btn btn-danger me-2"
                            onClick={() => confirmApproval("reject")}
                        >
                            Reject
                        </button>

                        <button className="btn btn-danger" onClick={() => navigate(-1)}>
                            Back to Quotations
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewQuotation;

// import React from "react";
// import { useLocation, useNavigate, useParams } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";

// const ViewQuotation = () => {
//     const location = useLocation();
//     const navigate = useNavigate();
//     const { quotationId } = useParams();

//     // Mock data for testing purposes
//     const mockQuote = {
//         quotationId: "Q001",
//         customerName: "John Doe",
//         packageType: "Basic",
//         volume: 150,
//         priceStage1: 1000000,
//         priceStage2: 2000000,
//         priceStage3: 3000000,
//         totalPrice: 6000000,
//         customerRequest: "Please deliver as soon as possible.",
//         content: ["Task 1: Foundation", "Task 2: Roof installation", "Task 3: Painting"]
//     };

//     // Use mock data instead of location.state
//     const quote = mockQuote;

//     const handleApproval = (status) => {
//         // Simulate API call success using setTimeout
//         setTimeout(() => {
//             toast.success(`Design ${status === "approve" ? "approved" : "rejected"} successfully!`);
//             navigate("/manage/quotations");
//         }, 1000); // 1-second delay to simulate the API response
//     };

//     const confirmApproval = (status) => {
//         const action = status === "approve" ? "approve" : "reject";
//         const confirmed = window.confirm(`Are you sure you want to ${action} this quotation?`);
//         if (confirmed) {
//             handleApproval(status);
//         }
//     };

//     // Check if quote is available (for now, always true with mock data)
//     if (!quote) {
//         return (
//             <div className="container mt-4">
//                 <div className="alert alert-danger" role="alert">
//                     No quotation details available.
//                 </div>
//             </div>
//         );
//     }

//     return (
//         <div className="container mt-4">
//             <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
//             <h2 className="text-center text-primary mb-4">Quotation Details</h2>
//             <div className="card">
//                 <div className="card-body">
//                     <table className="table table-bordered table-striped">
//                         <thead>
//                             <tr>
//                                 <th>Customer Name</th>
//                                 <th>Package Type</th>
//                                 <th>Volume (m³)</th>
//                                 <th>Price Stage 1 (VND)</th>
//                                 <th>Price Stage 2 (VND)</th>
//                                 <th>Price Stage 3 (VND)</th>
//                                 <th>Total Price (VND)</th>
//                                 <th>Customer Request</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr>
//                                 <td>{quote.customerName}</td>
//                                 <td>{quote.packageType}</td>
//                                 <td>{quote.volume}</td>
//                                 <td>{quote.priceStage1}</td>
//                                 <td>{quote.priceStage2}</td>
//                                 <td>{quote.priceStage3}</td>
//                                 <td>{quote.totalPrice}</td>
//                                 <td>{quote.customerRequest}</td>
//                             </tr>
//                         </tbody>
//                     </table>

//                     <h3 className="mt-4">Content:</h3>
//                     <ul className="list-group">
//                         {quote.content.map((item, index) => (
//                             <li key={index} className="list-group-item">{item}</li>
//                         ))}
//                     </ul>

//                     <div className="text-center mt-4">
//                         <button
//                             className="btn btn-success me-2"
//                             onClick={() => confirmApproval("approve")}
//                         >
//                             Approve
//                         </button>
//                         <button
//                             className="btn btn-danger me-2"
//                             onClick={() => confirmApproval("reject")}
//                         >
//                             Reject
//                         </button>

//                         <button className="btn btn-danger" onClick={() => navigate(-1)}>
//                             Back to Quotations
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ViewQuotation;
