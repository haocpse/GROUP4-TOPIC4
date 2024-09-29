import React, { useEffect, useState } from "react";
import './ConstructionProgress.css';
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { ToastContainer, toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS cho toast de hien thong bao

const ConstructionProgress = () => {

    const [tasks, setTasks] = useState([]);

    const handleTask = async () => { // ham de long lay du lieu tu backend ne ^^;

        try {
            const respone = await axios.get('http://localhost:8080/construction-progress');
            setTasks(respone.data);
        } catch (error) {

            console.error('Error get task list', error);

            // hien thi loi cho ng dung
            toast.error('Failed to load task list. Please try again later.');
        };
    };

    // con nay la lay du lieu luon khi component nó statr ne
    useEffect(() => {
        ;
        handleTask();
    }, []);


    // set status cho task
    const handleStatusChange = async (taskId, newStatus) => {

        try {
            await axios.post('http://localhost/updateTaskStatus', {
                taskId: taskId,
                status: newStatus
            });

            // cap nhat status
            setTasks(prevTasks => //truyền tham số vào arrow function, pretasks là 1 cái mảng chứa tất cả các ták chưa đc úp đết
                prevTasks.map(task => task.taskId === taskId ? { ...task, status: newStatus } : task));
            //. map để duyệt qa tất cả các thằng trong prev

            // hiển thị thông báo thành công
            toast.success(`Task status updated to ${newStatus === 'completed' ? 'Done' : 'In Progressing'}`);


        } catch (error) {
            console.error("Error updating status !!", error);

            // hien thi loi cho ng dung
            toast.error('Failed to update task status. Please try again.');
        }


    };


    return (
        <>
            <Navbar />,

            {/* hien thi thong bao thanh cong o day */}
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

            <div className="container mt-4">
                <div className="text-center" style={{ color: 'pink' }}>
                    <h2>CONSTRUCTION PROGRESS</h2>

                </div>
                <hr />
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Task Name</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.map(task => (
                            <tr key={task.taskId}>
                                <td>{task.taskName}</td>
                                <td className="text-center">
                                    <div className="dropdown">

                                        <button
                                            className="btn btn-secondary dropdown-toggle"
                                            type="button"
                                            id={`dropdown-${task.taskId}`} // dropdown của taskid nào ^^
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            {task.status === 'completed' ? 'Done' : 'In Progressing'} {/** duoi back end gui len status cho long, vi chi co 1 status la inprocessing th nhma lam luon cho truong hop done */}
                                        </button>
                                        {/*liên kết danh sách này với nút bấm có id tương ứng aria-labelledby */}
                                        <ul className="dropdown-menu" aria-labelledby={`dropdown-${task.taskId}`}>

                                            <li>
                                                <button
                                                    onClick={() => handleStatusChange(task.taskId, 'completed')}
                                                >
                                                    Done
                                                </button>
                                            </li>
                                            <li>
                                                <button
                                                    onClick={() => handleStatusChange(task.taskId, 'inprogress')}
                                                >
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
            </div></>
    );
}
export default ConstructionProgress;