// // Components/CustomerView/CustomerView.js

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CustomerView.css"; // Import CSS file for styling
import 'bootstrap/dist/css/bootstrap.min.css';
import './CustomerView.css'; // Import custom styles

const CustomerView = () => {
  const [orders, setOrders] = useState([]); // State to store orders
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state

  // Mock data for testing
  useEffect(() => {
    const mockData = [
      {
        orderId: "ORD001",
        Quotation: "QTN001",
        Design: "DSN001",
        packageType: "Standard",
        startDate: "2023-09-01",
        endDate: "2023-09-15",
      },
      {
        orderId: "ORD002",
        Quotation: "QTN002",
        Design: "DSN002",
        packageType: "Premium",
        startDate: "2023-09-05",
        endDate: "2023-09-20",
      },
      {
        orderId: "ORD003",
        Quotation: "QTN003",
        Design: "DSN003",
        packageType: "Basic",
        startDate: "2023-09-10",
        endDate: "2023-09-25",
      },
      {
        orderId: "ORD004",
        Quotation: "QTN004",
        Design: "DSN004",
        packageType: "Luxury",
        startDate: "2023-09-15",
        endDate: "2023-09-30",
      },
    ];

    // Simulate an API call delay
    setTimeout(() => {
      setOrders(mockData);
      setLoading(false);
    }, 1000);
  }, []);

  return (
    <div className="container customer-view mt-4">
      <h2 className="text-center">My Construction Progress</h2>
      {loading ? (
        <p className="text-center">Loading orders...</p> // Loading message
      ) : error ? (
        <p className="text-center text-danger">{error}</p> // Error message
      ) : (
        <>
          <h3 className="mt-4">Orders</h3>
          {orders.length > 0 ? (
            <table className="table table-bordered mt-3">
              <thead className="thead-light">
                <tr>
                  <th>Order ID</th>
                  <th>Quotation</th>
                  <th>Design</th>
                  <th>Package Type</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.orderId}>
                    <td>{order.orderId}</td>
                    <td>
                      <Link 
                        to={`/quotation/${order.Quotation}`} 
                        className="quotation-link"
                      >
                        {order.Quotation}
                      </Link>
                    </td>
                    <td>
                      <Link 
                        to={`/design/${order.Design}`} 
                        className="design-link"
                      >
                        {order.Design}
                      </Link>
                    </td>
                    <td>{order.packageType}</td>
                    <td>{new Date(order.startDate).toLocaleDateString()}</td>
                    <td>{new Date(order.endDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center">No orders found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default CustomerView;





// import React, { useEffect, useState } from "react";
// import "./CustomerView.css"; // Import CSS file for styling
// import Navbar from "../Navbar/Navbar";

// const CustomerView = () => {
//   const [customerInfo, setCustomerInfo] = useState({
//     customerName: "Tú Đặng",
//     phone: "0707804907",
//     address: "1052 Quang Trung, quận Gò Vấp, TPHCM",
//     request: "Thêm sân vườn",
//   });

//   const [tasks, setTasks] = useState([]); // To store tasks related to customer's construction project

//   useEffect(() => {
//     // Mock tasks data
//     const mockTasks = [
//       {
//         taskName: "Thiết kế sân vườn",
//         status: "Đang tiến hành",
//         assignedStaff: { name: "Nguyễn Văn A" },
//       },
//       {
//         taskName: "Lắp đặt hàng rào",
//         status: "Chưa bắt đầu",
//         assignedStaff: { name: "Trần Thị B" },
//       },
//       {
//         taskName: "Cung cấp vật liệu",
//         status: "Đã hoàn thành",
//         assignedStaff: { name: "Lê Văn C" },
//       },
//     ];

//     setTasks(mockTasks);
//   }, []);

//   // Function to handle status change
//   const handleStatusChange = (index, newStatus) => {
//     const updatedTasks = tasks.map((task, i) =>
//       i === index ? { ...task, status: newStatus } : task
//     );
//     setTasks(updatedTasks);
//   };

//   return (
//     <div className="customer-view">
//       <Navbar />
//       <h2>Thông Tin Khách Hàng</h2>
//       <p>
//         <strong>Tên:</strong> {customerInfo.customerName}
//       </p>
//       <p>
//         <strong>Điện thoại:</strong> {customerInfo.phone}
//       </p>
//       <p>
//         <strong>Địa chỉ:</strong> {customerInfo.address}
//       </p>
//       <p>
//         <strong>Yêu cầu:</strong> {customerInfo.request}
//       </p>

//       <h2>Tiến Trình Xây Dựng</h2>
//       <table>
//         <thead>
//           <tr>
//             <th>Tên Nhiệm Vụ</th>
//             <th>Trạng Thái</th>
//             <th>Nhân Viên Giao Nhiệm Vụ</th>
//             <th>Thay Đổi Trạng Thái</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tasks.length > 0 ? (
//             tasks.map((task, index) => (
//               <tr key={index}>
//                 <td>{task.taskName}</td>
//                 <td>{task.status}</td>
//                 <td>{task.assignedStaff.name}</td>
//                 <td>
//                   <select
//                     value={task.status}
//                     onChange={(e) => handleStatusChange(index, e.target.value)}
//                   >
//                     <option value="Chưa bắt đầu">Chưa bắt đầu</option>
//                     <option value="Đang tiến hành">Đang tiến hành</option>
//                     <option value="Đã hoàn thành">Đã hoàn thành</option>
//                   </select>
//                 </td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="4">
//                 Không tìm thấy nhiệm vụ nào cho dự án của bạn.
//               </td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default CustomerView;
