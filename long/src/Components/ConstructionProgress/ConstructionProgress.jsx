import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { ToastContainer, toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS cho toast de hien thong bao
import { useNavigate, useParams } from "react-router-dom";

const ConstructionProgress = () => {

    const { constructionOrderId } = useParams(); // lay constructionOrderId từ url
    const [orders, setOrders] = useState([]);
    const [staffList, setStaffList] = useState([]);
    const [isConstructonStaffListOpen, setIsConstructionStaffListOpen] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const handleTask = async () => { // ham de long lay du lieu tu backend ne ^^;

            try {
                const response = await axios.get(`http://localhost:8080//ownedTasks/${constructionOrderId}`);
                setOrders([response.data]); // neu la mang se co []
            } catch (error) {

                console.error('Error get task list !!', error);

                // hien thi loi cho ng dung
                toast.error('Failed to load task list. Please try again later ^^');
            };
        }; handleTask();
    }, [constructionOrderId]);


    // lay ra du lieu nhan vien 

    const fetchStaff = async () => {

        try {
            const response = await axios.get(`http://localhost:8080/ownedTasks/${constructionOrderId}/constructors`);
            setStaffList(response.data);
        } catch (error) {
            console.error('Error get staff task ! ^^', error);
            // hien thi loi cho ng dung
            toast.error('Failed to load task staff. Please try again later ^^');
        }

    };


    // goi api khi bam mo list nhan vien de assign
    useEffect(() => {
        if (isConstructonStaffListOpen === true)
            fetchStaff();
    }, [isConstructonStaffListOpen]);


    // set status cho task
    const handleStatusChange = async (newStatus, taskId) => {

        try {
            await axios.post(`http://localhost:8080/ownedTasks/${constructionOrderId}`, {
                status: newStatus,
                taskId: taskId
            });
            // cập nhật giao diện
            setOrders(prevOrders =>
                prevOrders.map(order => ({
                    ...order,
                    tasks: order.tasks.map(task =>
                        task.taskId === taskId ? { ...task, constructionStatus: 'completed' } : task
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
    const handleAssignStaff = async (orderId, taskId, staffId, staffName) => {
        try {
            await axios.post(`http://localhost:8080/ownedTasks/${constructionOrderId}/constructors`, {
                taskId: taskId,
                staffId: staffId
            });
            setOrders(prevOrders =>
                prevOrders.map(order => ({
                    ...order,
                    tasks: order.tasks.map(task =>
                        task.taskId === taskId ? { ...task, assignedStaff: staffName } : task
                    )
                }))
            );
            toast.success("Staff assigned SUCCESSFULLY !");
            setIsConstructionStaffListOpen(false);
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
                                </tr>
                            </thead>
                            <tbody>
                                {order.tasks.map(task => (
                                    <tr key={task.taskId}>
                                        <td>{task.content}</td>
                                        <td className="text-center">
                                            <select
                                                value={task.constructionStatus}
                                                onChange={(e) => handleStatusChange(e.target.value, task.taskId)}
                                                className="form-select"
                                            >
                                                <option value="inprogressing">In Progressing</option>
                                                <option value="completed">Completed</option>
                                            </select>
                                        </td>
                                        <td>
                                            <select
                                                value={staffList.find(staff => staff.staffName === task.assignedStaff)?.id || ''}
                                                onChange={e => {
                                                    const staffId = e.target.value;
                                                    const staffName = staffList.find(staff => staff.staffId === parseInt(staffId))?.staffName || '';
                                                    handleAssignStaff(order.constructionOrderId, task.taskId, staffId, staffName);
                                                }}
                                                className="form-select"
                                                onClick={() => setIsConstructionStaffListOpen(true)}
                                            >
                                                <option value="">Assign staff</option>
                                                {staffList.map(staff => (
                                                    <option key={staff.staffId} value={staff.staffId}>
                                                        {staff.staffName}
                                                    </option>
                                                ))}
                                            </select>
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

