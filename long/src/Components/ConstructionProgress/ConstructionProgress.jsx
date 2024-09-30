import React, { useEffect, useState } from "react";
import './ConstructionProgress.css';
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { ToastContainer, toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS cho toast de hien thong bao

const ConstructionProgress = () => {

    const [orders, setOrders] = useState([]);

    const handleTask = async () => { // ham de long lay du lieu tu backend ne ^^;

        try {
            const respone = await axios.get('http://localhost:8080/construction-progress');
            setOrders(respone.data);
        } catch (error) {

            console.error('Error get task list', error);

            // hien thi loi cho ng dung
            toast.error('Failed to load task list. Please try again later ^^');
        };
    };

    // con nay la lay du lieu luon khi component nó statr ne
    useEffect(() => {
        ;
        handleTask();
    }, []);


    // set status cho task
    const handleStatusChange = async (orderId, taskName, newStatus) => {

        try {
            await axios.post('http://localhost/updateTaskStatus', {
                constructionOrderId: orderId,
                taskName: taskName,
                status: newStatus
            });

            // cap nhat status cho tung construction id
            setOrders(prevOrders =>
                prevOrders.map(order => ({
                    ...order, // ... để sao chép tất cả, đảm bảo gằng là các thuộc tính cũ vẫn sẽ giữ nguyên và thay đổi thuộc tính mới
                    tasks: order.tasks.map(task =>
                        task.taskName === taskName ? { ...task, status: newStatus } : task // duyệt qa nếu task.tâskName hiện tại mà === với task naem trong ds muốn update thì sẽ update
                    )
                }))
            );

            toast.success(`Task status updated to ${newStatus === 'constructed' ? 'Done' : 'In Progressing'}`);
        } catch (error) {
            console.error("Error updating task status", error);
            toast.error('Failed to update task status. Please try again. ^^');
        }
    };


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
                        <h3>Construction Order ID: {order.constructionOrderId}</h3> {/* show id của constructionOrder ne` */}
                        <table className="table table-bordered">
                            <thead>
                                <tr>
                                    <th scope="col">Task Name</th>
                                    <th scope="col">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {/* chay qa tat ca cac phan tu trong mang */}
                                {order.tasks.map(task => (
                                    <tr key={task.taskName}>
                                        <td>{task.taskName}</td>
                                        <td className="text-center">
                                            <div className="dropdown">
                                                <button
                                                    className="btn btn-secondary dropdown-toggle"
                                                    type="button"
                                                    id={`dropdown-${order.constructionOrderId}-${task.taskName}`}
                                                    data-bs-toggle="dropdown"
                                                    aria-expanded="false"
                                                >
                                                    {task.status === 'constructed' ? 'Done' : 'In Progressing'}
                                                </button>
                                                <ul className="dropdown-menu" aria-labelledby={`dropdown-${order.constructionOrderId}-${task.taskName}`}>
                                                    <li>
                                                        {/** truyen vao ham handle id cung nhu la taskName de biet dang thay doi thang nao */}
                                                        <button onClick={() => handleStatusChange(order.constructionOrderId, task.taskName, 'constructed')}>
                                                            Done
                                                        </button>
                                                    </li>
                                                    <li>
                                                        <button onClick={() => handleStatusChange(order.constructionOrderId, task.taskName, 'constructing')}>
                                                            In Progressing
                                                        </button>
                                                    </li>
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