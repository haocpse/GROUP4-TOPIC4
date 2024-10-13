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
                const respone = await axios.get(`http://localhost:8080/manage/quotations/${id}`)
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
            await axios.post(`http://localhost:8080/manage/quotations/${id}`, {
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
    if (!quotation) {
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
                                <td>{quotation.customerName}</td>
                                <td>{quotation.packageType}</td>
                                <td>{quotation.volume}</td>
                                <td>{quotation.priceStage1}</td>
                                <td>{quotation.priceStage2}</td>
                                <td>{quotation.priceStage3}</td>
                                <td>{quotation.totalPrice}</td>
                                <td>{quotation.customerRequest}</td>

                            </tr>
                        </tbody>
                    </table>

                    <h3 className="mt-4">Content:</h3>
                    <ul className="list-group">
                        {quotation.content.map((item, index) => (
                            <li key={index} className="list-group-item">{item}</li>
                        ))}
                    </ul>

                    <div className="text-center mt-4">

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


