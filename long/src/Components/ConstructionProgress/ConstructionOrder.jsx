// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import Navbar from "../Navbar/Navbar";

// const ConstructionOrder = () => {

//     const [constructionOrders, setConstructionOrders] = useState([]);
//     const navigate = useNavigate();

//     const fetchOrder = async () => {

//         try {
//             const response = await axios.get('http://localhost:8080/construction-orders');
//             setConstructionOrders(response.data);
//         } catch (error) {
//             console.error('Error fetching order list', error);
//             toast.error('Failed to load construction orders');
//         }
//     };

//     const handleStatusChange = async (constructionOrderId, newStatus) => {
//         try {
//             // Gửi yêu cầu cập nhật trạng thái tới backend
//             await axios.post(`http://localhost:8080/construction-orders/${constructionOrderId}/update-status`, {
//                 status: newStatus
//             });

//             // Cập nhật lại danh sách order sau khi thay đổi trạng thái
//             setConstructionOrders(prevOrders =>
//                 prevOrders.map(order =>
//                     order.constructionOrderId === constructionOrderId ? { ...order, status: newStatus } : order)
//             );
//             toast.success('Status updated successfully!');
//         } catch (error) {
//             console.error('Error updating status', error);
//             toast.error('Failed to update status');
//         }
//     };

//     useEffect(() => {
//         fetchOrder();
//     }, []);

//     const handleViewDetails = (constructionOrderId) => {
//         navigate(`/construction-progress/${constructionOrderId}`);
//     }




//     return (
//         <>
//             <Navbar />
//             <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
//             <div className="container mt-4">
//                 <div className="text-center" style={{ color: 'red' }}>
//                     <h2>Construction Orders</h2>
//                 </div>
//                 <table className="table table-bordered">
//                     <thead>
//                         <tr>
//                             <th>Construction Order ID</th>
//                             <th>Customer Name</th>
//                             <th>Status</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {constructionOrders.length === 0 ? (
//                             <tr>
//                                 <td colSpan="4" className="text-center">No construction orders available.</td>
//                             </tr>
//                         ) : (
//                             constructionOrders.map(order => (
//                                 <tr key={order.constructionOrderId}>
//                                     <td>{order.constructionOrderId}</td>
//                                     <td>{order.customerName}</td>

//                                     {/* thay đổi status */}
//                                     <td>
//                                         <select
//                                             value={order.status}
//                                             onChange={(e) => handleStatusChange(order.constructionOrderId, e.target.value)}
//                                             className="form-select"
//                                         >
//                                             <option value="inprogress">In Progress</option>
//                                             <option value="completed">Completed</option>
//                                         </select>
//                                     </td>

//                                     <td>
//                                         <button onClick={() => handleViewDetails(order.constructionOrderId)} className="btn btn-primary">
//                                             View Detail
//                                         </button>
//                                     </td>
//                                 </tr>
//                             ))
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </>
//     );
// }

// export default ConstructionOrder;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../Navbar/Navbar";

const ConstructionOrder = () => {
    const [constructionOrders, setConstructionOrders] = useState([]);
    const navigate = useNavigate();

    const mockData = [
        { constructionOrderId: 1, customerName: "Khoa Nguyễn", status: "inprogress" },
        { constructionOrderId: 2, customerName: "Háo Phù", status: "inprogress" },
        { constructionOrderId: 3, customerName: "Long Trương", status: "inprogress" },
        { constructionOrderId: 4, customerName: "Tú Đặng", status: "inprogress" },
        { constructionOrderId: 5, customerName: "Uỗng Dung", status: "inprogress" },
    ];

    const fetchOrder = () => {
        setConstructionOrders(mockData);
    };

    const handleStatusChange = (constructionOrderId, newStatus) => {
        setConstructionOrders(prevOrders =>
            prevOrders.map(order =>
                order.constructionOrderId === constructionOrderId
                    ? { ...order, status: newStatus }
                    : order
            )
        );
        toast.success('Status updated successfully!');
    };

    useEffect(() => {
        fetchOrder();
    }, []);

    const handleViewDetails = (constructionOrderId) => {
        navigate(`/construction-progress/${constructionOrderId}`);
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "inprogress":
                return <i className="fas fa-spinner fa-spin text-info"></i>; // Icon cho trạng thái In Progress
            case "completed":
                return <i className="fas fa-check-circle text-success"></i>; // Icon cho trạng thái Completed
            default:
                return null;
        }
    };

    return (
        <>
            <Navbar />
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div className="container mt-4">
                <div className="text-center" style={{ color: 'red' }}>
                    <h2>Construction Orders</h2>
                </div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Construction Order ID</th>
                            <th>Customer Name</th>
                            <th>Status</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {constructionOrders.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center">No construction orders available.</td>
                            </tr>
                        ) : (
                            constructionOrders.map(order => (
                                <tr key={order.constructionOrderId}>
                                    <td>{order.constructionOrderId}</td>
                                    <td>{order.customerName}</td>

                                    {/* Thay đổi status */}
                                    <td>
                                        <div className="d-flex align-items-center">
                                            {getStatusIcon(order.status)} {/* Hiện biểu tượng trạng thái */}
                                            <select
                                                value={order.status}
                                                onChange={(e) => handleStatusChange(order.constructionOrderId, e.target.value)}
                                                className="form-select ms-2" // Thêm khoảng cách bên trái cho select
                                            >
                                                <option value="inprogress">In Progress</option>
                                                <option value="completed">Completed</option>
                                            </select>
                                        </div>
                                    </td>

                                    <td>
                                        <button onClick={() => handleViewDetails(order.constructionOrderId)} className="btn btn-primary">
                                            <i className="fas fa-eye"></i> View Detail {/* Biểu tượng cho nút View Detail */}
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default ConstructionOrder;
