import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../Navbar/Navbar";
import { jwtDecode } from "jwt-decode";

const CustomerViewDesign = () => {
    const navigate = useNavigate();
    const { constructionOrderId } = useParams();
    const [designDetail, setDesignDetail] = useState({}); // Thay đổi thành object để dễ kiểm tra
    const [accountId, setAccountId] = useState('')

   

    // Lấy thông tin chi tiết thiết kế



    useEffect(() => {
        const token = localStorage.getItem('token');
        const decoded = jwtDecode(token)
        setAccountId(decoded.sub)
        const fetchDesignDetail = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/customer/${accountId}/constructionOrders/${constructionOrderId}/design`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Attach token
                    }
                });
                setDesignDetail(response.data.data);
            } catch (error) {
                console.error("Error fetching design detail", error);
                toast.error("Fail to fetch design detail!");
            }
        };
        fetchDesignDetail();
    }, []); // Thêm id vào dependency array

    const handleApproval = async (status) => {
        const token = localStorage.getItem('token');
        const decoded = jwtDecode(token)
        const accountId = decoded.sub

        try {
            await axios.put(`http://localhost:8080/customer/${accountId}/constructionOrders/${constructionOrderId}/design`, {
                status: status
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Attach token
                }
            });
            toast.success(`Design ${status} successfully!`);
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
    };

    return (
        <>
            <Navbar />
            <div className="container mt-4">
                <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
                <h2 className="text-center" style={{ color: 'black' }}>Design Details</h2>
                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title">Design ID: {designDetail.designId}</h5>
                        <p className="card-text"><strong>Customer Name:</strong> {designDetail.customerName}</p>
                        <p className="card-text"><strong>Customer Request:</strong> {designDetail.customerRequest}</p>

                        <div className="img-design">
                            <h6>Design Images:</h6>
                            <div className="row text-center">
                                <div className="col-md-4 mb-3">
                                    <div>
                                        <div className="overlay">2D Design</div>
                                        <div className="image-container">
                                            <img
                                                src={designDetail.url2dDesign}
                                                alt="2D Design"
                                                className="img-fluid img-thumbnail"
                                                style={{ maxWidth: '100%', height: 'auto', maxHeight: '200px' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div>
                                        <div className="overlay">3D Design</div>
                                        <div className="image-container">
                                            <img
                                                src={designDetail.url3dDesign}
                                                alt="3D Design"
                                                className="img-fluid img-thumbnail"
                                                style={{ maxWidth: '100%', height: 'auto', maxHeight: '200px' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4 mb-3">
                                    <div>
                                        <div className="overlay">Front Design</div>
                                        <div className="image-container">
                                            <img
                                                src={designDetail.urlFrontDesign}
                                                alt="Front Design"
                                                className="img-fluid img-thumbnail"
                                                style={{ maxWidth: '100%', height: 'auto', maxHeight: '200px' }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
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
            </div>
        </>
    );
};

export default CustomerViewDesign;
