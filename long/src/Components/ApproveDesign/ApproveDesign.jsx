import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const ApproveDesign = () => {

    const [designs, setDesigns] = useState([]);
    const navigate = useNavigate();


    // lay danh sach cac design can up' det^'
    const fetchDesigns = async () => {
        try {
            const response = await axios.get('http://localhost:8080/manage/designs');
            setDesigns(response.data);
        } catch (error) {
            console.error("Error fetching designs !!", error);
            toast.error("Fail fetching Designs !!")
        }
    };

    // xu ly approve

    const handleApproval = async (designId, status) => {
        try {
            await axios.post('http://localhost:8080/manage/approve-designs', {
                designId: designId,
                status: status
            });
            toast.success(`Design ${status ? "approved" : "rejected"} successfully!`);
            setDesigns(designs.filter(design => design.designId !== designId));
            // fetchDesigns();
        } catch (error) {
            console.error("Error approving/rejecting design", error);
            toast.error("Can not update status !");
        }

    };
    const confirmApproval = (designId, status) => {
        const action = status ? "approve" : "reject";
        const confirmed = window.confirm(`Are you sure you want to ${action} this design?`);
        if (confirmed) {
            handleApproval(designId, status);
        }
    };
    const handleViewDetails = (design) => {
        navigate('/manage/view-design', { state: { design } }); // state dc dùng để chứa dữ liệu
    }


    useEffect(() => {
        fetchDesigns();
    }, []);

    return (
        <>
            <ToastContainer position="top-right" autoClose={5000} />
            <div className="container mt-4">
                <h2 className="text-center" style={{ color: 'black' }}>Admin - Approve Designs</h2>
                <table className="table table-bordered mt-4">
                    <thead>
                        <tr>
                            <th>Design ID</th>
                            <th>Customer Name</th>
                            <th>View Details</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {designs.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center">No Design to approve.</td>
                            </tr>
                        ) : (
                            designs.map(design => (
                                <tr key={design.designId}>
                                    <td>{design.designId}</td>
                                    <td>{design.customerName}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleViewDetails(design)}
                                        >
                                            View
                                        </button>
                                    </td>

                                    <td>
                                        <button
                                            className="btn btn-success me-2"
                                            onClick={() => confirmApproval(design.designId, true)}
                                        >
                                            Approve
                                        </button>
                                        <button
                                            className="btn btn-danger"
                                            onClick={() => confirmApproval(design.designId, false)}
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
