import React, { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS cho toast de hien thong bao
import { useNavigate, useParams } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Modal from 'react-modal';

const ConstructionProgress = () => {

    const { constructionOrderId } = useParams(); // lay constructionOrderId từ url
    const [orders, setOrders] = useState([]);
    const [staffList, setStaffList] = useState([]);
    const [selectedStaff, setSelectedStaff] = useState([]);
    const [assignedStaffNames, setAssignedStaffNames] = useState([]);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    const [listTask, setListTask] = useState([]);
    const navigate = useNavigate();

    // lay ra du lieu nhan vien 

    const fetchStaff = async () => {

        try {
            const response = await axios.get(`http://localhost:8080/staffs/workers`, {
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

        const token = localStorage.getItem('token');
        const decoded = jwtDecode(token)
        const accountId = decoded.sub

        const fetchTask = async () => { // ham de long lay du lieu tu backend ne ^^;

            try {
                const response = await axios.get(`http://localhost:8080/staffs/${accountId}/tasks/${constructionOrderId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token if needed
                    }
                });
                setOrders([response.data.data]); // neu la mang se co []
                const assignedStaffs = response.data.data.staffs || [];
                const assignedIds = assignedStaffs.map(staff => staff.staffId); // lay ra staff IDs
                const assignedNames = assignedStaffs.map(staff => staff.staffName); // lay ra Staff names
                setListTask(response.data.data.constructTaskStatusResponses);
                setAssignedStaffNames(assignedNames)
                setSelectedStaff(assignedIds);
                console.log(response.data.data.staffs)
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


        const token = localStorage.getItem('token');
        const decoded = jwtDecode(token)
        const accountId = decoded.sub


        try {
            await axios.put(`http://localhost:8080/staffs/${accountId}/construction/${constructionOrderId}/status`, {
                status: newStatus,
                taskId: taskId
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Add token if needed for authentication
                }
            });
            // cap nhat giao dien 
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

    // set nhan vien cho constructionOrderId
    const handleAssignStaff = async () => {

        const token = localStorage.getItem('token');
        const decoded = jwtDecode(token)
        const accountId = decoded.sub
        try {
            const response = await axios.put(`http://localhost:8080/staffs/${accountId}/construction/${constructionOrderId}/worker`, {
                constructionOrderId: constructionOrderId,
                staffIds: selectedStaff
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Include token if needed
                }
            });
            // Cập nhật giao diện hoặc hiển thị thông báo thành công
            toast.success("Staff assigned SUCCESSFULLY!");

            // Hiển thị tên các staff được gán bên dưới bảng
            const assignedStaffNames = staffList
                .filter(staff => selectedStaff.includes(staff.staffId))
                .map(staff => staff.staffName)
                .join(", ");

            setAssignedStaffNames(assignedStaffNames); // Biến này sẽ lưu trữ tên staff để hiển thị
        } catch (error) {
            console.error('Assign error', error);
            toast.error("Staff assigned FAIL!");
        }
    }

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => {
        setSelectedStaff([]); // Clear selected staff when closing
        setIsModalOpen(false);
    };
    // Handle staff selection
    const handleStaffSelection = (staffId) => {
        if (selectedStaff.includes(staffId)) {
            // Nếu đã chọn nhân viên này, bỏ chọn
            setSelectedStaff(prev => prev.filter(id => id !== staffId));
        } else {
            if (selectedStaff.length >= 5) {
                // Hiển thị thông báo nếu số lượng vượt quá giới hạn
                toast.warning("You can assign a maximum of 5 staff members.");
                return;
            }
            // Nếu chưa đạt giới hạn, thêm nhân viên mới
            setSelectedStaff(prev => [...prev, staffId]);
        }
    };


    const updateDeadline = async (taskId, newStartDate, newEndDate) => {
        const token = localStorage.getItem('token');
        const decoded = jwtDecode(token);
        const accountId = decoded.sub;

        try {
            await axios.put(`http://localhost:8080/staffs/${accountId}/construction/${constructionOrderId}/date`, {
                taskId,
                startDate: newStartDate,
                endDate: newEndDate
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });
            setOrders(prevOrders =>
                prevOrders.map(order => ({
                    ...order,
                    constructTaskStatusResponses: order.constructTaskStatusResponses.map(task =>
                        task.taskId === taskId
                            ? { ...task, startDate: newStartDate, endDate: newEndDate }
                            : task
                    )
                }))
            );

            toast.success('Dates updated successfully');
        } catch (error) {
            console.error("Error updating dates:", error);
            toast.error('Failed to update dates. Please try again.');
        }
    };


    return (
        <>


            {/* hien thi thong bao thanh cong o day */}
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

            <div className="container mt-4">
                <div className="text-center" style={{ color: 'blue' }}>
                    <h2>Construction Progress</h2>
                </div>
                <div className="d-flex justify-content-end">
                    <button onClick={openModal} className="btn btn-primary mb-3">
                        Assign Staff
                    </button>
                </div>
                {/* chay qa cac construction order */}
                {orders.map(order => (
                    <div key={order.constructionOrderId}>
                        <table className="table table-bordered">
                            <thead className="thead-light">
                                <tr>
                                    <th scope="col">Task Name</th>
                                    <th scope="col">Status</th>
                                    <th scope="col">Start Date</th>
                                    <th scope="col">End Date</th>
                                    <th scope="col">Complete</th>
                                </tr>
                            </thead>
                            <tbody>
                                {order.constructTaskStatusResponses.map(task => (
                                    <tr key={task.taskId}>
                                        <td>{task.content}</td>
                                        <td className="text-center">
                                            <select
                                                value={task.status ? task.status : ""}
                                                onChange={(e) => handleStatusChange(e.target.value, task.taskId)}
                                                className="form-select"
                                            >
                                                <option value="IN_PROGRESS">In Progressing</option>
                                                <option value="DONE">Completed</option>
                                            </select>
                                        </td>
                                        <td>
                                            <input
                                                type="date" lang="vi"
                                                className="form-control"
                                                value={task.startDate ? task.startDate.split("T")[0] : ""}
                                                onChange={(e) => updateDeadline(task.taskId, e.target.value, task.endDate)}
                                            />
                                        </td>
                                        <td>
                                            <input
                                                type="date"
                                                className="form-control"
                                                value={task.endDate ? task.endDate.split("T")[0] : ""}
                                                onChange={(e) => updateDeadline(task.taskId, task.startDate, e.target.value)}
                                            />
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

                        {/* Modal for multi-select staff assignment */}
                        <Modal isOpen={isModalOpen} onRequestClose={closeModal} contentLabel="Assign Staff Modal">
                            <h3>Select Staff for Tasks</h3>
                            <ul>
                                {staffList.map(staff => (
                                    <li key={staff.staffId}>
                                        <label>
                                            <input
                                                type="checkbox"
                                                style={{ width: "20px", height: "20px", marginRight: "8px" }}
                                                checked={selectedStaff.includes(staff.staffId)}
                                                onChange={() => handleStaffSelection(staff.staffId)}
                                                // de vo hieu hoa chck box neu du 5 ng va cac staff da co
                                                disabled={selectedStaff.length >= 5 && !selectedStaff.includes(staff.staffId)}
                                            />
                                            {staff.staffName}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                            <button onClick={handleAssignStaff} className="btn btn-success mt-3">
                                Confirm Assignment
                            </button>
                            <button onClick={closeModal} className="btn btn-secondary mt-3">
                                Cancel
                            </button>
                        </Modal>

                    </div>
                ))}
                <div className="mt-4 mb-4">
                    <h4 className="mb-4">Assigned Staff:</h4>
                    {
                        assignedStaffNames && assignedStaffNames.length > 0 ? (
                            <ul className="list-group">
                                {assignedStaffNames.map((name, index) => (
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
export default ConstructionProgress;

