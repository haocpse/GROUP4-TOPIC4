import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import './DesignerTasks.css';
import Navbar from "../Navbar/Navbar";

const DesignerTasks = () => {
    const [tasks, setTasks] = useState([]);
    const navigate = useNavigate(); // Sử dụng useNavigate để điều hướng

    // Fetch tasks assigned to the consultant (mocked for testing)
    useEffect(() => {
        const mockTasks = [
            {
                constructionOrderId: 1,
                customerName: "Tú Đặng",
                startDate: "2024-09-10T00:00:00",
                phone: "123-456-7890",
                address: "123 Main St",
                status: "Designing"
            },
            {
                constructionOrderId: 2,
                customerName: "Háo Phù",
                startDate: "2024-10-01T00:00:00",
                phone: "987-654-3210",
                address: "456 Oak Ave",
                status: "Designing"
            },
        ];

        setTasks(mockTasks);
    }, []);

    // Hàm xử lý khi nhấn nút Upload
    const handleUploadClick = (constructionOrderId) => {
        // Điều hướng đến trang uploadDesign với ID của đơn hàng xây dựng
        navigate(`/uploadDesign/${constructionOrderId}`);
    };

    return (
        <>
            <Navbar />
            <div className="consultant-tasks">
                <h1 className="text-center mt-4" style={{color : 'blue'}}>Designer Tasks</h1>
                <table className="table">
                    <thead>
                        <tr>
                            <th>Construction Order ID</th>
                            <th>Customer Name</th>
                            <th>Start Date</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Status</th>
                            <th>Upload</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tasks.length > 0 ? (
                            tasks.map((task) => (
                                <tr key={task.constructionOrderId}>
                                    <td>{task.constructionOrderId}</td>
                                    <td>{task.customerName}</td>
                                    <td>{new Date(task.startDate).toLocaleDateString()}</td>
                                    <td>{task.phone}</td>
                                    <td>{task.address}</td>
                                    <td>{task.status}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => navigate('./design-upload')}
                                        >
                                            Upload
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="7">No tasks assigned</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
};

export default DesignerTasks;
