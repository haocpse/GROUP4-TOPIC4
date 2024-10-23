import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const ApproveMaintenanceQuotation = () => {
    const [maintenanceQuotes, setMaintenanceQuotes] = useState([]);
    const navigate = useNavigate();

    const fetchMaintenanceQuotes = async () => {
        try {
            const response = await axios.get('http://localhost:8080/manage/maintenance-quotations',{
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Attach token
                }
            });
            setMaintenanceQuotes(response.data.data);
        } catch (error) {
            console.error("Fail to fetch quotes! ^^", error);

            toast.error("Fail to fetch quotes! ^^");
        }
    };

    const handleViewDetails = (id) => {
        navigate(`/manage/maintenance-quotations/${id}`);
    }

    useEffect(() => {
        fetchMaintenanceQuotes();
    }, []);

    return (
        <>
            <ToastContainer position="top-right" autoClose={5000} />
            <div className="container-fuild mt-4">
                <h2 className="text-center" style={{ color: 'black' }}>Approve Maintenance Quotes</h2>
                <table className="table table-bordered mt-4">
                    <thead>
                        <tr>
                            <th scope="col" className="text-center">Order ID</th>
                            <th scope="col" className="text-center">Quotation ID</th>
                            <th scope="col" className="text-center">Customer Name</th>
                            <th scope="col" className="text-center">Total Price</th>
                            <th scope="col" className="text-center">View Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {maintenanceQuotes.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center">No quotes to approve.</td>
                            </tr>
                        ) : (
                            maintenanceQuotes.map(Maintenancequote => (
                                <tr key={Maintenancequote.id}>
                                    <td className="text-center align-content-center">{Maintenancequote.constructionOrderId}</td>
                                    <td className="text-center align-content-center">{Maintenancequote.id}</td>
                                    <td className="text-center align-content-center">{Maintenancequote.customerName}</td>
                                    <td className="text-center align-content-center">{Maintenancequote.totalPrice.toLocaleString()}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleViewDetails(Maintenancequote.id)}
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
}
export default ApproveMaintenanceQuotation;


