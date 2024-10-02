// import React, { useEffect, useState } from "react";
// import './ConstructionProgress.css';
// import axios from "axios";
// import Navbar from "../Navbar/Navbar";
// import { ToastContainer, toast } from 'react-toastify'; // Import toast
// import 'react-toastify/dist/ReactToastify.css'; // Import CSS cho toast de hien thong bao
// import { useParams } from "react-router-dom";

// const ConstructionProgress = () => {

//     const { constructionOrderId } = useParams(); // lay constructionOrderId từ url
//     const [orders, setOrders] = useState([]);
//     const [staffList, setStaffList] = useState([]);
//     const [isConstructonStaffListOpen, setIsConstructionStaffListOpen] = useState(false);

//     useEffect(() => {
//         const handleTask = async () => { // ham de long lay du lieu tu backend ne ^^;

//             try {
//                 const response = await axios.get(`http://localhost:8080/construction-progress/${constructionOrderId}`);
//                 setOrders([response.data]); // neu la mang se co []
//             } catch (error) {

//                 console.error('Error get task list !!', error);

//                 // hien thi loi cho ng dung
//                 toast.error('Failed to load task list. Please try again later ^^');
//             };
//         }; handleTask();
//     }, [constructionOrderId]);


//     // lay ra du lieu nhan vien 

//     const fetchStaff = async () => {

//         try {
//             const response = await axios.get('http://localhost:8080/construction-staff');
//             setStaffList(response.data);
//         } catch (error) {
//             console.error('Error get staff task ! ^^', error);
//             // hien thi loi cho ng dung
//             toast.error('Failed to load task staff. Please try again later ^^');
//         }

//     };


//     // goi api khi bam mo list nhan vien de assign
//     useEffect(() => {
//         if (isConstructonStaffListOpen === true)
//             fetchStaff();
//     }, [isConstructonStaffListOpen]);


//     // set status cho task
//     const handleStatusChange = async (newStatus, taskId) => {

//         try {
//             await axios.post(`http://localhost:8080/updateTaskStatus/${constructionOrderId}`, {
//                 newStatus: newStatus,
//                 taskId : taskId
//             });
//             // cập nhật giao diện
//             setOrders(prevOrders =>
//                 prevOrders.map(order => ({
//                     ...order,
//                     tasks: order.tasks.map(task =>
//                         task.taskId === taskId ? { ...task, constructionStatus: 'completed' } : task
//                     )
//                 }))
//             );

//             toast.success('Update status COMPLETELY. ^^');
//         } catch (error) {
//             console.error("Error updating task status", error);
//             toast.error('Failed to update task status. Please try again. ^^');
//         }
//     };

//     // set nhan vien cho tung task
//     const handleAssignStaff = async (orderId, taskId, staffId, staffName) => {
//         try {
//             await axios.post('http://localhost:8080/assign-construction-staff', {
//                 constructionOrderId: orderId,
//                 taskId: taskId,
//                 staffId: staffId
//             });
//             setOrders(prevOrders =>
//                 prevOrders.map(order => ({
//                     ...order,
//                     tasks: order.tasks.map(task =>
//                         task.taskId === taskId ? { ...task, assignedStaff: staffName } : task
//                     )
//                 }))
//             );
//             toast.success("Staff assigned SUCCESSFULLY !");
//             setIsConstructionStaffListOpen(false);
//         } catch (error) {
//             console.error('Assign error', error);
//             toast.error("Staff assigned FAIL!");
//         }
//     }


//     return (
//         <>
//             <Navbar />

//             {/* hien thi thong bao thanh cong o day */}
//             <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

//             <div className="container mt-4">
//                 <div className="text-center" style={{ color: 'pink' }}>
//                     <h2>CONSTRUCTION PROGRESS</h2>

//                 </div>
//                 {/* chay qa cac construction order */}
//                 {orders.map(order => (
//                     <div key={order.constructionOrderId}>
//                         <table className="table table-bordered">
//                             <thead>
//                                 <tr>
//                                     <th scope="col">Task Name</th>
//                                     <th scope="col">Status</th>
//                                     <th scope="col">Assign Staff</th>
//                                 </tr>
//                             </thead>
//                             <tbody>
//                                 {order.tasks.map(task => (
//                                     <tr key={task.taskId}>
//                                         <td>{task.content}</td>
//                                         <td className="text-center">
//                                             <select
//                                                 value={task.constructionStatus}
//                                                 onChange={(e) => handleStatusChange(e.target.value, task.taskId)}
//                                                 className="form-select"
//                                             >
//                                                 <option value="inprogressing">In Progressing</option>
//                                                 <option value="completed">Completed</option>
//                                             </select>
//                                         </td>
//                                         <td>
//                                             <select
//                                                  value={staffList.find(staff => staff.name === task.assignedStaff)?.id || ''}
//                                                 onChange={e => {
//                                                     const staffId = e.target.value;
//                                                     const staffName = staffList.find(staff => staff.id === parseInt(staffId))?.name || '';
//                                                     handleAssignStaff(order.constructionOrderId, task.taskId, staffId, staffName);
//                                                 }}
//                                                 className="form-select"
//                                                 onClick={() => setIsConstructionStaffListOpen(true)}
//                                             >
//                                                 <option value="">Assign staff</option>
//                                                 {staffList.map(staff => (
//                                                     <option key={staff.id} value={staff.id}>
//                                                         {staff.name}
//                                                     </option>
//                                                 ))}
//                                             </select>
//                                         </td>
//                                     </tr>
//                                 ))}
//                             </tbody>
//                         </table>
//                     </div>
//                 ))}
//             </div>
//         </>
//     );
// }
// export default ConstructionProgress;


import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import { ToastContainer, toast } from 'react-toastify'; // Import toast
import 'react-toastify/dist/ReactToastify.css'; // Import CSS cho toast de hien thong bao
import { useParams } from "react-router-dom";

const ConstructionProgress = () => {
    const { constructionOrderId } = useParams(); // Lấy constructionOrderId từ URL
    const [orders, setOrders] = useState([]); // Giữ danh sách orders
    const [staffList, setStaffList] = useState([]); // Giữ danh sách nhân viên
    const [isConstructionStaffListOpen, setIsConstructionStaffListOpen] = useState(false);

    // Giả lập việc gọi API để nhận dữ liệu từ backend
    useEffect(() => {
        const mockOrders = [
            {
                constructionOrderId: constructionOrderId,
                tasks: [
                    { taskId: 1, content: 'Bottom and wall concrete of the pond', constructionStatus: 'inprogressing', assignedStaff: '' },
                    { taskId: 2, content: 'Oil tank waterproofing', constructionStatus: 'inprogressing', assignedStaff: '' },
                    { taskId: 3, content: '1 layer cloud-patterned cobblestone revetment', constructionStatus: 'inprogressing', assignedStaff: '' },
                    { taskId: 4, content: '4-compartment rough filter - 75% clean', constructionStatus: 'inprogressing', assignedStaff: '' },
                    { taskId: 5, content: 'Taiwan pump and filter equipment', constructionStatus: 'inprogressing', assignedStaff: '' },
                    { taskId: 6, content: 'Small flowers and basic shrubs', constructionStatus: 'inprogressing', assignedStaff: '' },
                ]
            }
        ];
        setOrders(mockOrders); // Đặt dữ liệu giả vào state
    }, [constructionOrderId]);

    // Giả lập gọi API lấy danh sách nhân viên
    useEffect(() => {
        if (isConstructionStaffListOpen === true) {
            const mockStaffList = [
                { id: 1, name: 'Tú Đặng' },
                { id: 2, name: 'Háo Phù' },
                { id: 3, name: 'Uỗng Dung' },
                { id: 4, name: 'Khoa Nguyễn' },
                { id: 5, name: 'Long Trương' },
            ];
            setStaffList(mockStaffList); // Đặt dữ liệu giả vào state
        }
    }, [isConstructionStaffListOpen]);

    // Hàm xử lý thay đổi trạng thái task (mock)
    const handleStatusChange = async (newStatus, taskId) => {
        // Cập nhật trực tiếp trên frontend
        setOrders(prevOrders =>
            prevOrders.map(order => ({
                ...order,
                tasks: order.tasks.map(task =>
                    task.taskId === taskId ? { ...task, constructionStatus: newStatus } : task
                )
            }))
        );
        toast.success('Update status successfully (Mocked)');
    };

    // Hàm giả lập phân công nhân viên cho task
    const handleAssignStaff = async (orderId, taskId, staffId, staffName) => {
        // Cập nhật trực tiếp trên frontend
        setOrders(prevOrders =>
            prevOrders.map(order => ({
                ...order,
                tasks: order.tasks.map(task =>
                    task.taskId === taskId ? { ...task, assignedStaff: staffName } : task
                )
            }))
        );
        toast.success("Staff assigned successfully (Mocked)!");
        setIsConstructionStaffListOpen(false);
    }

    return (
        <>
            <Navbar />

            {/* Hiển thị thông báo */}
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />

            <div className="container mt-4">
                <div className="text-center" style={{ color: 'pink' }}>
                    <h2>CONSTRUCTION PROGRESS</h2>
                </div>

                {/* Chạy qua các construction orders */}
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
                                                value={task.assignedStaff ? staffList.find(staff => staff.name === task.assignedStaff)?.id : ''}
                                                onChange={e => {
                                                    const staffId = e.target.value;
                                                    const staffName = staffList.find(staff => staff.id === parseInt(staffId))?.name || '';
                                                    handleAssignStaff(order.constructionOrderId, task.taskId, staffId, staffName);
                                                }}
                                                className="form-select"
                                                onClick={() => setIsConstructionStaffListOpen(true)}
                                            >
                                                <option value="">Assign staff</option>
                                                {staffList.map(staff => (
                                                    <option key={staff.id} value={staff.id}>
                                                        {staff.name}
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
            </div>
        </>
    );
}

export default ConstructionProgress;
