import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const ConstructionOrder = () => {

    const [constructionOrders, setConstructionOrders] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchOrder = async () => {

            try {
                const response = await axios.get('http://localhost:8080/construct/ownedTasks', {
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

