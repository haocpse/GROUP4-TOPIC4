import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS cho toast de hien thong bao
import { useNavigate, useParams } from "react-router-dom";
import Navbar from "../Navbar/Navbar";
import { jwtDecode } from "jwt-decode";

const CustomerViewProgress = () => {

    const { constructionOrderId } = useParams(); // lay constructionOrderId từ url
    const [orders, setOrders] = useState({});
    const [constructionList, setConstructionList] = useState([]);
    const [staffList, setStaffList] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {


        const fetchTask = async () => { // ham de long lay du lieu tu backend ne ^^;
            const token = localStorage.getItem('token');
            const decoded = jwtDecode(token)
            const accountId = decoded.sub
            try {
                const response = await axios.get(`http://localhost:8080/customer/${accountId}/constructionOrders/${constructionOrderId}/progress`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token if needed
                    }
                });
                setOrders(response.data.data);
                setConstructionList([response.data.data.listConstructProgressResponses])
                setStaffList(response.data.data.staffNames) // neu la mang se co []
            } catch (error) {

                console.error('Error get task list !!', error);

                // hien thi loi cho ng dung
                toast.error('Failed to load task list. Please try again later ^^');
            };
        };
        fetchTask()
    }, []);

    const handleCompleteProgress = async () => {
        try {
            const token = localStorage.getItem('token');
            const decoded = jwtDecode(token)
            const accountId = decoded.sub
            await axios.put(`http://localhost:8080/customer/${accountId}/constructionOrders/${constructionOrderId}/progress`, {
                status: "FINISHED",
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add token if needed for authentication
                }
            });
            // cập nhật giao diện
            toast.success('Your progress FINISHED, please pay the third PAYMENT. ^^');
        } catch (error) {
            console.error("Error updating task status", error);
            toast.error('Failed to update task status. Please try again. ^^');
        }
    }

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

            <Navbar />
            {/* hien thi thong bao thanh cong o day */}
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

            <div className="container mt-4">
                <div className="text-center" style={{ color: 'black' }}>
                    <h2>Construction Progress</h2>

                </div>
                {/* chay qa cac construction order */}
                {constructionList.map(list => (
                    <div key={orders.constructionOrderId}>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col" className="text-center">No</th>
                                    <th scope="col" className="text-center">Task Name</th>
                                    <th scope="col" className="text-center">Start Date</th>
                                    <th scope="col" className="text-center">End Date</th>
                                    <th scope="col" className="text-center">Status</th>
                                    <th scope="col" className="text-center">Done</th>
                                </tr>
                            </thead>
                            <tbody>
                                {list.map((task, index) => (
                                    <tr key={task.taskId}>
                                        <td>{index + 1}</td>
                                        <td>{task.content}</td>
                                        <td>{formatDate(task.startDate)}</td>
                                        <td>{formatDate(task.endDate)}</td>
                                        <td className="text-center">
                                            {task.status === "DONE" ?
                                                (
                                                    <>COMPLETE</>
                                                ) : (
                                                    <>IN PROGRESS</>
                                                )
                                            }
                                        </td>
                                        <td style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                                            {task.status === "DONE" && (
                                                <i className="fas fa-check-circle" style={{ color: 'green', marginLeft: '10px', fontSize: '2.5em' }}></i>
                                            )}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <div className="mt-4 mb-4">
                            <h4 className="mb-4">Assigned Staff:</h4>
                            {
                                Array.isArray(staffList) && staffList.length > 0 ? (
                                    <ul className="list-group">
                                        {staffList.map((name, index) => (
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
                        <div className="text-end">
                            {orders.status === "CONSTRUCTED" && (
                                <button onClick={() => handleCompleteProgress()} className="btn btn-primary ">
                                    Complete
                                </button>)}
                        </div>
                    </div>
                ))}
                <button onClick={() => navigate(-1)} className="btn btn-secondary ">
                    Back
                </button>
            </div>
        </>
    );
}
export default CustomerViewProgress;

