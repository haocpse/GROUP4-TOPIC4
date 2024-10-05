import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const ConstructionOrder = () => {

    const [constructionOrders, setConstructionOrders] = useState([]);
    const navigate = useNavigate();

    const fetchOrder = async () => {

        try {
            const response = await axios.get('http://localhost:8080/construction-orders');
            setConstructionOrders(response.data);
        } catch (error) {
            console.error('Error fetching order list', error);
            
            toast.error('Failed to load construction orders');
        }
    };

    const handleStatusChange = async (constructionOrderId, newStatus) => {
        try {
            // gửi yêu cầu cập nhật trạng thái tới backend ^^
            await axios.post(`http://localhost:8080/construction-orders/${constructionOrderId}/update-status`, {
                status: newStatus
            });

            // cập nhật lại danh sách order sau khi thay đổi trạng thái
            setConstructionOrders(prevOrders =>
                prevOrders.map(order =>
                    order.constructionOrderId === constructionOrderId ? { ...order, status: newStatus } : order)
            );
            toast.success('Status updated successfully!');
        } catch (error) {
            console.error('Error updating status', error);
            toast.error('Failed to update status');
        }
    };

    useEffect(() => {
        fetchOrder();
    }, []);

    const handleViewDetails = (constructionOrderId) => {
        navigate(`/construction-progress/${constructionOrderId}`);
    }




    return (
        <>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div className="container mt-4">
                <div className="text-center" style={{ color: 'black' }}>
                    <h2>Constructor - Construction Orders</h2>
                </div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Construction Order ID</th>
                            <th>Customer Name</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {constructionOrders.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center">No construction orders available.</td>
                            </tr>
                        ) : (
                            constructionOrders.map(order => (
                                <tr key={order.constructionOrderId}>
                                    <td>{order.constructionOrderId}</td>
                                    <td>{order.customerName}</td>
                                    <td>{order.startDate}</td>
                                    <td>{order.endDate}</td>

                                    {/* thay đổi status */}
                                    <td>
                                        <select
                                            value={order.status}
                                            onChange={(e) => handleStatusChange(order.constructionOrderId, e.target.value)}
                                            className="form-select"
                                        >
                                            <option value="inprogress">In Progress</option>
                                            <option value="completed">Completed</option>
                                        </select>
                                    </td>

                                    <td>
                                        <button onClick={() => handleViewDetails(order.constructionOrderId)} className="btn btn-primary">
                                            View Detail
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

export default ConstructionOrder;

