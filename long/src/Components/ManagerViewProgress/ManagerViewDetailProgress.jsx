import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS cho toast de hien thong bao
import { useNavigate, useParams } from "react-router-dom";
// import { jwtDecode } from "jwt-decode";

const ManagerViewDetailProgress = () => {

    const { constructionOrderId } = useParams(); // lay constructionOrderId từ url
    const [orders, setOrders] = useState([]);
    const [progressInfo, setProgressInfo] = useState([]);
    const [staffInfo, setStaffInfo] = useState([]);
    const navigate = useNavigate();


    useEffect(() => {
        // const token = localStorage.getItem('token');
        // const decoded = jwtDecode(token)
        // const accountId = decoded.sub

        const fetchTask = async () => { // ham de long lay du lieu tu backend ne ^^;

            try {
                const response = await axios.get(`http://localhost:8080/progress/${constructionOrderId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token if needed
                    }
                });
                setOrders([response.data.data]); // neu la mang se co []
                setProgressInfo(response.data.data.listConstructProgressResponses)
                setStaffInfo(response.data.data.staffNames)
            } catch (error) {

                console.error('Error get task list !!', error);

                // hien thi loi cho ng dung
                toast.error('Failed to load task list. Please try again later ^^');
            };
        };
        fetchTask()
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return "";
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

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
                            <th scope="col" className="text-center">No</th>
                            <th scope="col" className="text-center">Task Name</th>
                            <th scope="col" className="text-center">Start Date</th>
                            <th scope="col" className="text-center">End Date</th>
                            <th scope="col" className="text-center">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {progressInfo.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center">No construction orders available.</td>
                            </tr>
                        ) : (
                            progressInfo.map(( progressInfo, index) => (
                                <tr key={orders.constructionOrderId}>
                                    <td className="text-center align-content-center">{index+1}</td>
                                    <td className="text-center align-content-center">{progressInfo.content || 'No content'}</td>
                                    <td className="text-center align-content-center">{formatDate(progressInfo.startDate)}</td>
                                    <td className="text-center align-content-center">{formatDate(progressInfo.endDate)}</td>
                                   
                                    {/* thay đổi status nè */}
                                    <td>
                                        {progressInfo.status === "DONE" ? (
                                            <>
                                                <i className="fas fa-check-circle" style={{ color: 'green', marginRight: '10px' }}></i>
                                                {progressInfo.status}
                                            </>
                                        ) : progressInfo.status === "IN_PROGRESS" ? (
                                            <>
                                                <i className="fa-solid fa-hourglass-start" style={{ color: 'orange', marginRight: '10px' }}></i>
                                                {progressInfo.status}
                                            </>
                                        ) : (progressInfo.status)}

                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
                <div className="mt-4 mb-4">
                            <h4 className="mb-4">Assigned Staff:</h4>
                            {
                                Array.isArray(staffInfo) && staffInfo.length > 0 ? (
                                    <ul className="list-group">
                                        {staffInfo.map((name, index) => (
                                            <li key={index + 1} className="list-group-item list-group-item-secondary">
                                                {index + 1}. {name}
                                            </li>
                                        ))}
                                    </ul>
                                ) : (
                                    <h6 className="text-muted">No assigned staff</h6>
                                )
                            }
                        </div>
                <button onClick={() => navigate(-1)} className="btn btn-secondary ">
                    Back
                </button>
            </div>
        </>
    );
}
export default ManagerViewDetailProgress;

