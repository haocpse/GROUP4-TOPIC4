import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const ViewQuotation = () => {
    const navigate = useNavigate();
    const { id } = useParams();
    const [quotation, setQuotation] = useState([]);


    useEffect(() => {
        const fetchQuotation = async () => {
            try {
                const respone = await axios.get(`http://localhost:8080/quotations/${id}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Attach token
                    }
                });
                setQuotation(respone.data.data)
                console.log(quotation)
            } catch (error) {
                console.error('Error quotation:', error);
                toast.error('Failed quotation ^^');
            }
        }
        fetchQuotation()
    }, [id])
    const handleApproval = async (status) => {
        try {
            await axios.put(`http://localhost:8080/quotations/${id}`, {
                status: status
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Attach token
                }
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
    if (!quotation) {
        return (
            <div className="container mt-4">
                <div className="alert alert-danger" role="alert">
                    No quotation details available.
                </div>
            </div>
        );
    }

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };


    return (
        <div className="container mt-4">
            <h2 className="text-center text-primary mb-4">Quotation Details</h2>
            <div className="card">
                <div className="card-body">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th className="text-center align-content-center" >Customer Name</th>
                                <th className="text-center align-content-center">Package Type</th>
                                <th className="text-center align-content-center">Volume (m³)</th>
                                <th className="text-center align-content-center">Price Stage 1 (VND)</th>
                                <th className="text-center align-content-center">Price Stage 2 (VND)</th>
                                <th className="text-center align-content-center">Price Stage 3 (VND)</th>
                                <th className="text-center align-content-center">Total Price (VND)</th>
                            </tr>
                        </thead>
                        <tbody>{quotation &&
                            <tr>
                                <td className="text-center align-content-center">{quotation.customerName}</td>
                                <td className="text-center align-content-center">{quotation.packageType}</td>
                                <td className="text-center align-content-center">{quotation.volume}</td>
                                <td className="text-center align-content-center">{quotation.priceStage1.toLocaleString()}</td>
                                <td className="text-center align-content-center">{quotation.priceStage2.toLocaleString()}</td>
                                <td className="text-center align-content-center">{quotation.priceStage3.toLocaleString()}</td>
                                <td className="text-center align-content-center">{quotation.totalPrice.toLocaleString()}</td>
                            </tr>}

                        </tbody>
                    </table>
                    <h6 className="mt-4 fw-light">Excepted Construction Start Date: {formatDate(quotation.startDate)} </h6>
                    <h6 className="mt-4 fw-light">Excepted Construction End Date: {formatDate(quotation.endDate)} </h6>
                    <h3 className="mt-4">Customer request:</h3> {quotation.customerRequest}

                    <h3 className="mt-4">Content:</h3>
                    <ul className="list-group">
                        {quotation.content && quotation.content.map((item, index) => (
                            <li key={index} className="list-group-item">{item}</li>
                        ))}
                    </ul>

                    <div className="text-center mt-4 d-flex ">
                        {quotation.quotationStatus && quotation.quotationStatus !== "CONFIRMED" ?
                            <div>
                                <button
                                    className="btn btn-success me-2"
                                    onClick={() => confirmApproval("APPROVED")}
                                >
                                    Approve
                                </button>
                                <button
                                    className="btn btn-danger me-2"
                                    onClick={() => confirmApproval("REJECTED")}
                                >
                                    Reject
                                </button>
                            </div>
                            : null}
                        <button className="btn btn-secondary" onClick={() => navigate(-1)}>
                            Back to Quotations
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewQuotation;


