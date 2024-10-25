import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS cho toast de hien thong bao
import { useNavigate, useParams } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

const ManagerViewDetailProgress = () => {

    const { constructionOrderId } = useParams(); // lay constructionOrderId từ url
    const [orders, setOrders] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        // const token = localStorage.getItem('token');
        // const decoded = jwtDecode(token)
        // const accountId = decoded.sub

        const fetchTask = async () => { // ham de long lay du lieu tu backend ne ^^;

            try {
                const response = await axios.get(`http://localhost:8080/manage/progressTasks/${constructionOrderId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token if needed
                    }
                });
                setOrders([response.data.data]); // neu la mang se co []
            } catch (error) {

                console.error('Error get task list !!', error);

                // hien thi loi cho ng dung
                toast.error('Failed to load task list. Please try again later ^^');
            };
        };
        fetchTask()
    }, []);

    return (
        <>


            {/* hien thi thong bao thanh cong o day */}
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

            <div className="container mt-4">
                <div className="text-center" style={{ color: 'black' }}>
                    <h2>Construction Progress</h2>

                </div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col" className="text-center">Task Name</th>
                            <th scope="col" className="text-center">Staff Name</th>
                            <th scope="col" className="text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center">No construction orders available.</td>
                            </tr>
                        ) : (
                            orders.map(order => (
                                <tr key={order.constructionOrderId}>
                                    <td className="text-center align-content-center col-1">{order.content || 'No content'}</td>
                                    <td className="text-center align-content-center col-1">{order.staffName || 'Unassigned'}</td>
                                    {/* thay đổi status nè */}
                                    <td>
                                        {order.status === "DONE" ? (
                                            <>
                                                <i className="fas fa-check-circle" style={{ color: 'green', marginRight: '10px' }}></i>
                                                {order.status}
                                            </>
                                        ) : order.status === "IN_PROGRESS" ? (
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
                <button onClick={() => navigate(-1)} className="btn btn-secondary ">
                    Back
                </button>
            </div>
        </>
    );
}
export default ManagerViewDetailProgress;

