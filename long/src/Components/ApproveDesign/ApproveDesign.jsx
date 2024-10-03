// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";

// const ApproveQuotation = () => {
//     const [quotes, setQuotes] = useState([]);
//     const navigate = useNavigate();

//     const fetchQuotes = async () => {
//         try {
//             const response = await axios.get('http://localhost:8080/manage/quotes');
//             setQuotes(response.data);
//         } catch (error) {
//             console.error("Error fetching quotes!", error);

//             toast.error("Error when fetch quote");
//         }
//     };

//     const handleApproval = async (constructionOrderId, status) => {
//         try {
//             await axios.post('http://localhost:8080/manage/approve-quote', {
//                 constructionOrderId: constructionOrderId,
//                 status: status
//             });

//             // Thông báo cho người dùng và cập nhật UI
//             toast.success(`Quote ${status ? "approved" : "rejected"} successfully!`);

//             setQuotes(quotes.filter(quote => quote.constructionOrderId !== constructionOrderId));
//             // phuong thuc filter la tao ra 1 mang chua cac quotes nhma bỏ đi những quotes đã đc update trạng thái
//         } catch (error) {
//             console.error("Error approving/rejecting quote", error);
//             toast.error("Can not update status !");
//         }
//     };

//     const handleViewDetails = () => {
//         navigate('/manage/view-quotation', { state: { quotes } }); // state dc dùng để chứa dữ liệu
//     }

//     useEffect(() => {
//         fetchQuotes();
//     }, []);

//     return (
//         <>
//             <ToastContainer position="top-right" autoClose={5000} />
//             <div className="container mt-4">
//                 <h2 className="text-center" style={{ color: 'blue' }}>Admin - Approve Quotes</h2>
//                 <table className="table table-bordered mt-4">
//                     <thead>
//                         <tr>
//                             <th>Construction Order ID</th>
//                             <th>Customer Name</th>
//                             <th>View Details</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {quotes.length === 0 ? (
//                             <tr>
//                                 <td colSpan="4" className="text-center">No quotes to approve.</td>
//                             </tr>
//                         ) : (
//                             quotes.map(quote => (
//                                 <tr key={quote.constructionOrderId}>
//                                     <td>{quote.constructionOrderId}</td>
//                                     <td>{quote.customerName}</td>
//                                     <td>
//                                         <button
//                                             className="btn btn-primary"
//                                             onClick={() => handleViewDetails(quote)}
//                                         >
//                                             View
//                                         </button>
//                                     </td>

//                                     <td>
//                                         <button
//                                             className="btn btn-success me-2"
//                                             onClick={() => handleApproval(quote.constructionOrderId, true)}
//                                         >
//                                             Approve
//                                         </button>
//                                         <button
//                                             className="btn btn-danger"
//                                             onClick={() => handleApproval(quote.constructionOrderId, false)}
//                                         >
//                                             Reject
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

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const ApproveDesign = () => {
    const [quotes, setQuotes] = useState([]);
    const navigate = useNavigate();

    // Dữ liệu mẫu
    const sampleQuotes = [
        {
            constructionOrderId: "1",
            customerName: "Nguyễn Minh Khoa",
            packageType: "BASIC PACKAGE",
            volume: 100,
            priceStage1: 500000,
            priceStage2: 700000,
            priceStage3: 900000,
            totalPrice: 2100000,
            content: ["Bottom and wall concrete of the pond", " Oil tank waterproofing", " 1 layer cloud-patterned cobblestone revetment", " 4-compartment rough filter - 75% clean", " Taiwan pump and filter equipment", "  Small flowers and basic shrubs"]
        },
        {
            constructionOrderId: "2",
            customerName: "Trương Hoàng Long",
            packageType: "VIP PACKAGE",
            volume: 200,
            priceStage1: 1000000,
            priceStage2: 1200000,
            priceStage3: 1500000,
            totalPrice: 3700000,
            content: ["Bottom and wall concrete of the pond", "Oil tank waterproofing", "Epoxy waterproofing", "3-layer cloud-patterned pebble embankment", "Large ancient stone smoke bridge waterfall", "4-compartment rough filter", "Vertical drum filter - 100% clean", "Set automatic timer equipment", "Japanese filter equipment", "All Japanese pumps", "Floating LED floodlights", "Underwater LED floodlights", "Misting - Automatic smoke spraying", "Small flowers and basic shrubs", "Decorative flying bonsai", "Decorative La Han pine", "Wooden floor of filter pit"]
        },
        {
            constructionOrderId: "3",
            customerName: "Đặng Mai Anh Tú",
            packageType: "ECONOMIC PACKAGE",
            volume: 100,
            priceStage1: 86700,
            priceStage2: 657000,
            priceStage3: 900000,
            totalPrice: 2100000,
            content: ["Công việc 1", "Công việc 2"]
        },
        {
            constructionOrderId: "4",
            customerName: "Châu Phú Hào",
            packageType: "BASIC PACKAGE",
            volume: 100,
            priceStage1: 500000,
            priceStage2: 700000,
            priceStage3: 900000,
            totalPrice: 2100000,
            content: ["Công việc 1", "Công việc 2"]
        },
        {
            constructionOrderId: "5",
            customerName: "Nguyễn Ngọc Khuyên",
            packageType: "ECONOMIC PACKAGE",
            volume: 100,
            priceStage1: 500000,
            priceStage2: 700000,
            priceStage3: 900000,
            totalPrice: 2100000,
            content: ["Công việc 1", "Công việc 2"]
        },
        {
            constructionOrderId: "6",
            customerName: "Phùng Thanh Độ",
            packageType: "VIP PACKAGE",
            volume: 100,
            priceStage1: 500000,
            priceStage2: 700000,
            priceStage3: 900000,
            totalPrice: 2100000,
            content: ["Công việc 1", "Công việc 2"]
        },
        {
            constructionOrderId: "7",
            customerName: "Uông Đình Dũng",
            packageType: "VIP PACKAGE",
            volume: 100,
            priceStage1: 500000,
            priceStage2: 700000,
            priceStage3: 900000,
            totalPrice: 2100000,
            content: ["Công việc 1", "Công việc 2"]
        },
    ];

    // Thay vì gọi API, sử dụng dữ liệu mẫu
    useEffect(() => {
        setQuotes(sampleQuotes);
    }, []);

    const handleApproval = (constructionOrderId, status) => {
        // Cập nhật trạng thái và thông báo cho người dùng
        toast.success(`Quote ${status ? "approved" : "rejected"} successfully!`);
        setQuotes(quotes.filter(quote => quote.constructionOrderId !== constructionOrderId));
    };

    const handleViewDetails = (quote) => {
        navigate('/manage/view-design', { state: { quote } }); // Truyền quote đã chọn
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={5000} />
            <div className="container mt-4">
                <h2 className="text-center" style={{ color: 'blue' }}>Admin - Approve Design</h2>
                <table className="table table-bordered mt-4">
                    <thead>
                        <tr className="table-dark">
                            <th>Construction Order ID</th>
                            <th>Customer Name</th>
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
                                    <td>
                                        <button
                                            className="btn btn-success me-2"
                                            onClick={() => handleApproval(quote.constructionOrderId, true)}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => handleApproval(quote.constructionOrderId, false)}
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
};

export default ApproveDesign;
