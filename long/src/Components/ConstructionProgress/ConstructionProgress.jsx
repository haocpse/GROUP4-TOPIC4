import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS cho toast de hien thong bao
import { useNavigate, useParams } from "react-router-dom";

const ConstructionProgress = () => {

    const { constructionOrderId } = useParams(); // lay constructionOrderId từ url
    const [orders, setOrders] = useState([]);
    const [staffList, setStaffList] = useState([]);
    const navigate = useNavigate();

    // lay ra du lieu nhan vien 

    const fetchStaff = async () => {

        try {
            const response = await axios.get(`http://localhost:8080/construct/ownedTasks/${constructionOrderId}/constructors`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token if needed
                }
            });
            setStaffList(response.data.data);
        } catch (error) {
            console.error('Error get staff task ! ^^', error);
            // hien thi loi cho ng dung
            toast.error('Failed to load task staff. Please try again later ^^');
            toast.success('Complete fetch Staff ^^');
        }

    };


    useEffect(() => {
        const fetchTask = async () => { // ham de long lay du lieu tu backend ne ^^;

            try {
                const response = await axios.get(`http://localhost:8080/construct/ownedTasks/${constructionOrderId}`, {
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
        fetchStaff()
    }, []);


    // set status cho task
    const handleStatusChange = async (newStatus, taskId) => {

        try {
            await axios.put(`http://localhost:8080/construct/ownedTasks/${constructionOrderId}`, {
                status: newStatus,
                taskId: taskId
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add token if needed for authentication
                }
            });
            // cập nhật giao diện
            setOrders(prevOrders =>
                prevOrders.map(order => ({
                    ...order,
                    constructTaskStatusResponses: order.constructTaskStatusResponses.map(task =>
                        task.taskId === taskId ? { ...task, status: newStatus } : task
                    )
                }))
            );

            toast.success('Update status COMPLETELY. ^^');
        } catch (error) {
            console.error("Error updating task status", error);
            toast.error('Failed to update task status. Please try again. ^^');
        }
    };

    // set nhan vien cho tung task
    const handleAssignStaff = async (taskId, staffId) => {
        try {
            await axios.put(`http://localhost:8080/construct/ownedTasks/${constructionOrderId}/constructors`, {
                taskId: taskId,
                staffId: staffId
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token if needed
                }
            });
            setOrders(prevOrders =>
                prevOrders.map(order => ({
                    ...order,
                    constructTaskStatusResponses: order.constructTaskStatusResponses.map(task =>
                        task.taskId === taskId ? { ...task, staffId: staffId } : task
                    )
                }))
            );
            toast.success("Staff assigned SUCCESSFULLY !");
        } catch (error) {
            console.error('Assign error', error);
            toast.error("Staff assigned FAIL!");
        }
    }


    return (
        <>


            {/* hien thi thong bao thanh cong o day */}
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

            <div className="container mt-4">
                <div className="text-center" style={{ color: 'black' }}>
                    <h2>Constructor - Construction Progress</h2>

                </div>
                {/* chay qa cac construction order */}
                {orders.map(order => (
                    <div key={order.constructionOrderId}>
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Task Name</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Assign Staff</th>
                                    <th scope="col">Complete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.constructTaskStatusResponses.map(task => (
                                    <tr key={task.taskId}>
                                        <td>{task.content}</td>
                                        <td className="text-center">
                                            <select
                                                value={task.constructionStatus}
                                                onChange={(e) => handleStatusChange(e.target.value, task.taskId)}
                                                className="form-select"
                                            >
                                                <option value="IN_PROGRESS">In Progressing</option>
                                                <option value="DONE">Completed</option>
                                            </select>
                                        </td>
                                        <td>
                                            <select
                                                className="form-select mt-2"
                                                onChange={(e) => {
                                                    handleAssignStaff(task.taskId, e.target.value)
                                                }}
                                                value={task.staffId ? task.staffId : ""}

                                            >
                                                <option value="" disabled>Assign staff</option>
                                                {staffList && staffList.map(staff => (
                                                    <option key={staff.staffId} value={staff.staffId}>
                                                        {staff.staffName}
                                                    </option>
                                                ))}
                                            </select>
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
                    </div>
                ))}
                <button onClick={() => navigate(-1)} className="btn btn-secondary ">
                    Back
                </button>
            </div>
        </>
    );
}
export default ConstructionProgress;

