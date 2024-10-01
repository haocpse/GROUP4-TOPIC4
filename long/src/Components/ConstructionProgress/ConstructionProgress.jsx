import React, { useEffect, useState } from "react";
import './ConstructionProgress.css';
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { ToastContainer, toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS cho toast de hien thong bao
import { useParams } from "react-router-dom";

const ConstructionProgress = () => {

    const { constructionOrderId } = useParams(); // lay constructionOrderId từ url
    const [orders, setOrders] = useState([]);
    const [staffList, setStaffList] = useState([]);
    const [isConstructonStaffListOpen, setIsConstructionStaffListOpen] = useState(false);

    useEffect(() => {
        const handleTask = async () => { // ham de long lay du lieu tu backend ne ^^;

            try {
                const response = await axios.get(`http://localhost:8080/construction-progress/${constructionOrderId}`);
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
            const response = await axios.get('http://localhost:8080/construction-staff');
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
    const handleStatusChange = async (orderId, taskId) => {

        try {
            await axios.post('http://localhost:8080/updateTaskStatus', {
                constructionOrderId: orderId,
                taskId: taskId
            });
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
            await axios.post('http://localhost:8080/assign-construction-staff', {
                constructionOrderId: orderId,
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
            <Navbar />

            {/* hien thi thong bao thanh cong o day */}
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

            <div className="container mt-4">
                <div className="text-center" style={{ color: 'pink' }}>
                    <h2>CONSTRUCTION PROGRESS</h2>

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
                                {/* chay qa tat ca cac phan tu trong mang */}
                                {order.tasks.map(task => (
                                    <tr key={task.taskId}>
                                        <td>{task.content}</td>
                                        <td className="text-center">
                                            <div className="dropdown">
                                                <button
                                                    className="btn btn-secondary dropdown-toggle"
                                                    type="button"
                                                    id={`dropdown-${order.constructionOrderId}-${task.taskId}`}
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    {task.constructionStatus === 'completed' ? 'Completed' : 'In Progressing'}
                                                </button>
                                                <ul className="dropdown-menu" aria-labelledby={`dropdown-${order.constructionOrderId}-${task.taskId}`}>
                                                    <li>
                                                        {/** truyen vao ham handle id cung nhu la taskName de biet dang thay doi thang nao */}
                                                        <button onClick={() => handleStatusChange(order.constructionOrderId, task.taskId)}>
                                                            Done
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button onClick={() => handleStatusChange(order.constructionOrderId, task.taskId)}>
                                                            In Progressing
                                                        </button>
                                                    </li>
                                                </ul>
                                            </div>
                                        </td>
                                        <td>
                                            {/**assign task ở đây */}
                                            <div className="dropdown">
                                                <button
                                                    className="btn btn-secondary dropdown-toggle"
                                                    type="button"
                                                    id={`dropdown-staff-${order.constructionOrderId}-${task.taskId}`}
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                    onClick={() => setIsConstructionStaffListOpen(true)}
                                                >
                                                    {task.assignedStaff ? task.assignedStaff : 'Assign staff'}
                                                </button>
                                                <ul className="dropdown-menu" aria-labelledby={`dropdown-staff-${order.constructionOrderId}-${task.taskId}`}>
                                                    {staffList.map(staff => (
                                                        <li key={staff.id}>
                                                            <button onClick={() => handleAssignStaff(order.constructionOrderId, staff.id, staff.name)}>
                                                                {staff.name}
                                                            </button>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ))}
            </div>
        </>
    );
}
export default ConstructionProgress;