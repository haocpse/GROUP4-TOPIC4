import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import styles from "./ListQuotation.module.css";
import Navbar from "../Navbar/Navbar";

const ListQuotation = () => {
    const [quotes, setQuotes] = useState([]);
    const navigate = useNavigate();

    // Các trạng thái có thể
    const statusOptions = ["Pending", "Finished", "Rejected"];

    // Dữ liệu mẫu với trạng thái ngẫu nhiên
    const sampleQuotes = [
        {
            constructionOrderId: "1",
            customerName: "Đặng Mai Anh Tú",
            packageType: "BASIC PACKAGE",
            volume: 100,
            priceStage1: 500000,
            priceStage2: 700000,
            priceStage3: 900000,
            totalPrice: 2100000,
            content: ["Bottom and wall concrete of the pond", " Oil tank waterproofing", " 1 layer cloud-patterned cobblestone revetment", " 4-compartment rough filter - 75% clean", " Taiwan pump and filter equipment", "  Small flowers and basic shrubs"],
            status: getRandomStatus()
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
            content: ["Công việc 3", "Công việc 4"],
            status: getRandomStatus()
        },
        {
            constructionOrderId: "3",
            customerName: "Tấn Nhàn",
            packageType: "ECONOMIC PACKAGE",
            volume: 100,
            priceStage1: 86700,
            priceStage2: 657000,
            priceStage3: 900000,
            totalPrice: 2100000,
            content: ["Công việc 1", "Công việc 2"],
            status: getRandomStatus()
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
            content: ["Công việc 1", "Công việc 2"],
            status: getRandomStatus()
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
            content: ["Công việc 1", "Công việc 2"],
            status: getRandomStatus()
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
            content: ["Công việc 1", "Công việc 2"],
            status: getRandomStatus()
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
            content: ["Công việc 1", "Công việc 2"],
            status: getRandomStatus()
        },
        // Các báo giá khác
    ];

    // Hàm chọn ngẫu nhiên trạng thái
    function getRandomStatus() {
        return statusOptions[Math.floor(Math.random() * statusOptions.length)];
    }

    useEffect(() => {
        setQuotes(sampleQuotes);
    }, []);

    const handleApproval = (constructionOrderId, status) => {
        toast.success(`Quote ${status ? "approved" : "rejected"} successfully!`);
        setQuotes(quotes.filter(quote => quote.constructionOrderId !== constructionOrderId));
    };

    const handleViewDetails = (quote) => {
        navigate('/view-Quotation', { state: { quote } });
    };

    return (
        <>
            <Navbar />
            <ToastContainer position="top-right" autoClose={5000} />
            <div className="container mt-4">
                <h1 className="text-center mt-4" style={{color: 'blue'}}>List Quotation</h1>
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
