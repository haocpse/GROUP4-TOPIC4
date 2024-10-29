import axios from "axios";
import { jwtDecode } from "jwt-decode";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const ConstructionOrder = () => {
    const [constructionOrders, setConstructionOrders] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const decoded = jwtDecode(token)
        const accountId = decoded.sub

        const fetchOrder = async () => {

            try {
                const response = await axios.get(`http://localhost:8080/staffs/${accountId}/orders`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Attach token
                    }
                });
                setConstructionOrders(response.data.data);
            } catch (error) {
                console.error('Fail fetch order list! ^^', error);

                toast.error('Failed to load construction orders! ^^');
            }
        }; fetchOrder();
    }, []);



    const handleViewDetails = (constructionOrderId) => {
        navigate(`${constructionOrderId}`);
    }


    return (
        <>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div className="container mt-4">
                <div className="text-center" style={{ color: 'blue' }}>
                    <h2>Construction Tasks</h2>
                </div>
                <table className="table table-bordered">
                    <thead className="thead-light">
                        <tr>
                            <th>Tasks</th>
                            <th>Customer Name</th>
                            <th>Phone</th>
                            <th>Address</th>
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
                            constructionOrders.map((order, index) => (
                                <tr key={order.constructionOrderId}>
                                    <td>{index + 1}</td>
                                    <td>{order.customerName}</td>
                                    <td>{order.phone}</td>
                                    <td>{order.address}</td>

                                    {/* thay đổi status */}
                                    <td>
                                        {order.status === "CONSTRUCTED" ? (
                                            <>
                                                <i className="fas fa-check-circle" style={{ color: 'green', marginRight: '10px' }}></i>
                                                {order.status}
                                            </>
                                        ) : order.status === "CONSTRUCTING" ? (
                                            <>
                                                <i className="fa-solid fa-hourglass-start" style={{ color: 'orange', marginRight: '10px' }}></i>
                                                {order.status}
                                            </>
                                        ) : (order.status)}

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

