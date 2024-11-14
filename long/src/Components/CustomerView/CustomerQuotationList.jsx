import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import styles from './CustomerVIewQuotation.module.css';
import Navbar from "../Navbar/Navbar";
import { jwtDecode } from "jwt-decode";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake.vfs;

const CustomerQuotationList = () => {
    const { constructionOrderId } = useParams();
    const [quotations, setQuotations] = useState([]);
    const [quotation, setQuotation] = useState();
    const [tasks, setTasks] = useState([])
    const [newStatus, setNewStatus] = useState()
    const navigate = useNavigate();
    const customerId = "current_customer_id";

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
            setNewStatus(status)
            toast.success(`Design ${status} successfully!`);
            fetchCustomerQuotations()
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
        fetchCustomerQuotations();
    };

    const fetchQuotation = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/quotationPDF/${constructionOrderId}`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Attach token
                }
            });
            setQuotation(response.data.data);
            setTasks(response.data.data.listPackageConstruction)
            generate(quotation, tasks)
        } catch (error) {
            console.error("Error fetching quotation order:", error);
        }
    };

    const generate = (quotation, tasks) => {
        const tableBody = [
            ['Content', 'Price (đ)'], // Đầu bảng
            ...tasks.map(task => [task.content, task.price.toLocaleString()]) // Tạo hàng từ dữ liệu
        ];
        tableBody.push([`Volume Price (${quotation.minVolume}m³ - ${quotation.maxVolume}m³)`, `${quotation.priceVolume.toLocaleString()}`]);
        tableBody.push(['', `${quotation.total.toLocaleString()}`]);

        const docDefinition = {
            pageMargins: [40, 60, 40, 60], // Lề: [trái, trên, phải, dưới]
            content: [
                { text: 'QUOTATION', alignment: 'center', fontSize: 24, bold: true, margin: [0, 0, 0, 10] },
                { text: `Consultant: ${quotation.consultant}`, alignment: 'right', margin: [0, 0, 0, 10] },
                { text: 'Customer Information:', fontSize: 18, bold: true, margin: [0, 20, 0, 5] },
                {
                    table: {
                        widths: ['*', 'auto'],
                        body: [
                            [
                                { text: `Customer name: ${quotation.customerName}`, margin: [0, 0, 0, 5] },
                                { text: `Phone: ${quotation.phone}`, margin: [0, 0, 0, 5] }
                            ]
                        ]
                    },
                    layout: 'noBorders',
                    margin: [0, 0, 0, 20],
                },
                { text: `Address: ${quotation.address}`, margin: [0, 0, 0, 10] },
                { text: 'Customer Request:', fontSize: 18, bold: true, margin: [0, 20, 0, 5] },
                { text: `${quotation.customerRequest}`, margin: [0, 0, 0, 10] },
                { text: 'Construction Information:', fontSize: 18, bold: true, margin: [0, 20, 0, 5] },
                { text: `Volume (m³): ${quotation.volume}`, margin: [0, 0, 0, 5] },
                { text: `Package type: ${quotation.packageType} `, margin: [0, 0, 0, 10] },
                { text: 'Construction Content:', fontSize: 18, bold: true, margin: [0, 20, 0, 5] },
                {
                    table: {
                        widths: ['*', 'auto'],
                        body: tableBody
                    },
                    layout: 'lightHorizontalLines', // Thêm đường kẻ cho bảng
                    margin: [0, 0, 0, 10],
                },
                { text: `Construction Start Date (Excepted): ${formatDate(quotation.constructionStartDate)}`, margin: [0, 0, 0, 5] },
                { text: `Construction End Date (Excepted): ${formatDate(quotation.constructionEndDate)}`, margin: [0, 0, 0, 10] },
                { text: 'Payment Installments:', fontSize: 18, bold: true, margin: [0, 20, 0, 5] },
                { text: `First phase price (20%): ${quotation.priceStage1?.toLocaleString()} đ`, margin: [0, 0, 0, 5] },
                { text: `Second phase price (30%): ${quotation.priceStage2?.toLocaleString()} đ`, margin: [0, 0, 0, 5] },
                { text: `Final phase price (50%): ${quotation.priceStage3?.toLocaleString()} đ`, margin: [0, 0, 0, 10] },
                { text: 'SERVICE COMMITMENT', bold: true, fontSize: 18, margin: [0, 20, 0, 5] },
                {
                    ul: [
                        { text: 'Quality Commitment: We are committed to providing Koi pond construction and installation services that meet high quality standards.', margin: [0, 5, 0, 5] },
                        { text: 'Warranty Policy: The entire project is warranted for 12 months from the date of completion.', margin: [0, 5, 0, 5] },
                        { text: 'Maintenance Policy: After the warranty period expires, we provide periodic maintenance services at preferential costs.', margin: [0, 5, 0, 5] },
                        { text: 'Cancellation and Refund Policy: In case the customer wants to cancel the contract, the customer will be responsible for the cancellation fee.', margin: [0, 5, 0, 5] },
                    ],
                    margin: [0, 0, 0, 15],
                },
                { text: `Ho Chi Minh City, ${formatDateAtEnd(quotation.postedDate)}`, alignment: 'right', margin: [0, 0, 0, 10] },
                {
                    table: {
                        widths: ['*', '*'], // Đặt độ rộng cột
                        body: [
                            [
                                { text: 'COMPANY REPRESENTATIVE SIGNATURE', bold: true, alignment: 'center' },
                                { text: 'CUSTOMER SIGNATURE', bold: true, alignment: 'center' }
                            ],
                        ]
                    },
                    layout: 'noBorders',
                    margin: [0, 0, 0, 0],
                },
            ],
            defaultStyle: {
                font: 'Roboto', // Font mặc định
            },
        };

        pdfMake.createPdf(docDefinition).download("bang_bao_gia.pdf");
    };

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const formatDateAtEnd = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `date ${day} month ${month} year ${year}`;
    };

    return (
        <>
            <Navbar />
            <div className={`${styles.quotationOrderContainer} container mt-5`}>
                <div className="card shadow">
                    <div className={`card-header text-center ${styles.bgRed} text-white`}>
                        <h2 className="text-center">Quotation</h2>
                        <div className="d-flex justify-content-between">
                            <p><strong>Order ID:</strong> {constructionOrderId}</p>
                            <p><strong>Consultant:</strong> {quotations.consultantName}</p>
                        </div>
                    </div>
                    <div className="card-body">
                        <div className="row mb-4 border p-3">
                            <div className="col-md-6">
                                <p><strong>Customer: </strong> {quotations.customerName}</p>
                            </div>


                            <div className="col-md-12">
                                <p><strong>Request: </strong> {quotations.customerRequest}</p>
                            </div>
                        </div>
                        <div className="row mb-4">
                            <div className="col-md-6">
                                <p className="font-weight-bold" style={{ fontSize: '1.5rem' }}>
                                    <strong>Volume:</strong> {quotations.volume} m³
                                </p>
                            </div>
                            <div className="col-md-12">
                                <p><strong>Price Stage 1:</strong> {quotations.priceStage1?.toLocaleString()} VND</p>
                            </div>
                            <div className="col-md-12">
                                <p><strong>Price Stage 2:</strong> {quotations.priceStage2?.toLocaleString()} VND</p>
                            </div>
                            <div className="col-md-12">
                                <p><strong>Price Stage 3:</strong> {quotations.priceStage3?.toLocaleString()} VND</p>
                            </div>
                            <div className="col-md-12">
                                <p className="font-weight-bold"><strong>Total Price:</strong> {quotations.totalPrice?.toLocaleString()} VND</p>
                            </div>
                        </div>
                        <div>
                            <h3 className="mb-3">Construction contents:</h3>
                            <p><strong>Package: </strong>{quotations.packageType}</p>
                            {quotations.content && quotations.content.map((item, index) => (
                                <div key={index} className="mb-2">
                                    <label>{item}</label>
                                </div>
                            ))}
                        </div>
                        <p><strong>Excepted Construction Start Date:</strong> {formatDate(quotations.startDate)} </p>
                        <p><strong>Excepted Construction End Date:</strong> {formatDate(quotations.endDate)} </p>
                    </div>
                </div>
                {quotations.constructionOrderStatus !== "CONFIRMED_QUOTATION" ? (
                    <div className="mt-2">
                        <button
                            className="btn btn-success me-2"
                            onClick={() => confirmApproval("CONFIRMED")}
                        >
                            Approve
                        </button>
                        <button
                            className="btn btn-danger me-2"
                            onClick={() => confirmApproval("REJECTED")}
                        >
                            Reject
                        </button>
                    </div>) : (
                    <div className="mt-2">
                        <button
                            className="btn btn-danger me-2"
                            onClick={fetchQuotation}
                        >
                            Download Quotation
                        </button>
                    </div>
                )
                }
            </div>
        </>
    );

};

export default CustomerQuotationList;
