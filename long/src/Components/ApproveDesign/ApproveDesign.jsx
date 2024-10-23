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
            const response = await axios.get('http://localhost:8080/manage/designs', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, 
                }
            });
            setDesigns(response.data.data);
        } catch (error) {
            console.error("Fail to fetch designs! ^^", error);
            toast.error("Fail fetching Designs! ^^")
        }
    };
    const handleViewDetails = (id) => {
        navigate(`/manage/designs/${id}`); // state dc dùng để chứa dữ liệu
    }


    useEffect(() => {
        fetchDesigns();
    }, []);

    return (
        <>
            <ToastContainer position="top-right" autoClose={5000} />
            <div className="container mt-4">
                <h2 className="text-center" style={{ color: 'black' }}>Approve Designs</h2>
                <table className="table table-bordered mt-4">
                    <thead>
                        <tr>
                            <th scope="col" className="text-center">Design ID</th>
                            <th scope="col" className="text-center">Customer Name</th>
                            <th scope="col" className="text-center">Phone</th>
                            <th scope="col" className="text-center">Address</th>
                            <th scope="col" className="text-center">View Details</th>
                            <th scope="col" className="text-center">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {designs.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center">No Design to approve.</td>
                            </tr>
                        ) : (
                            designs.map(design => (
                                <tr key={design.id}>
                                    <td className="text-center">{design.id}</td>
                                    <td className="text-center">{design.customerName}</td>
                                    <td className="text-center">{design.phone}</td>
                                    <td className="text-center">{design.address}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleViewDetails(design.id)}
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
};

export default ApproveDesign;
