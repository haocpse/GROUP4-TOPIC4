import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const ManagerViewProgess = () => {
    const [constructionOrders, setConstructionOrders] = useState([]);
    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const response = await axios.get('http://localhost:8080/manager/viewProgress', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                setConstructionOrders(response.data.data);
            } catch (error) {
                console.error('Fail fetch construction progress! ^^', error);

                toast.error('Failed to load construction Progress! ^^');
            }
        }; fetchOrder();
    }, []);



    return (
        <>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div className="container mt-4">
                <div className="text-center" style={{ color: 'black' }}>
                    <h2>Construction Progress</h2>
                </div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col" className="text-center">Construction Order ID</th>
                            <th scope="col" className="text-center">Customer Name</th>
                            <th scope="col" className="text-center">Start Date</th>
                            <th scope="col" className="text-center">End Date</th>
                            <th scope="col" className="text-center">Staff Name</th>
                            <th scope="col" className="text-center">Status</th>
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
                                    <td className="text-center align-content-center col-1">{order.constructionOrderId}</td>
                                    <td className="text-center align-content-center col-1">{order.customerName}</td>
                                    <td className="text-center align-content-center col-1">{order.startDate}</td>
                                    <td className="text-center align-content-center col-1">{order.endDate}</td>
                                    <td className="text-center align-content-center col-1">{order.staffName}</td>

                                    {/* thay đổi status nè */}
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


                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ManagerViewProgess;