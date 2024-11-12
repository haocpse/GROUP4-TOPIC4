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
            toast.success("Fetch designs SUCCESSFULLY ^^")
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


    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const hours = String(date.getHours()).padStart(2, '0');
        const minutes = String(date.getMinutes()).padStart(2, '0');
        const seconds = String(date.getSeconds()).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
        const year = date.getFullYear();
        return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
    };
    return (
        <>
            <ToastContainer position="top-right" autoClose={5000} />
            <div className="container mt-4">
                <h2 className="text-center" style={{ color: 'black' }}>Approve Designs</h2>
                <table className="table table-bordered mt-4">
                    <thead>
                        <tr>
                            <th scope="col" className="text-center">No</th>
                            <th scope="col" className="text-center">Designer</th>
                            <th scope="col" className="text-center">Post Date</th>
                            <th scope="col" className="text-center">Customer Name</th>
                            <th scope="col" className="text-center">Status</th>
                            <th scope="col" className="text-center">View Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {designs.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center">No Design to approve.</td>
                            </tr>
                        ) : (
                            designs.map((design, index) => (
                                <tr key={design.id}>
                                    <td className="text-center">{index + 1}</td>
                                    <td className="text-center">{design.leaderName}</td>
                                    <td className="text-center">{formatDate(design.postedDate)}</td>
                                    <td className="text-center">{design.customerName}</td>
                                    <td className="text-center">{design.status}</td>
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
