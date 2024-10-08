// // Components/CustomerView/CustomerView.js

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./CustomerView.css"; // Import CSS file for styling

// const CustomerView = () => {
//   const [consultantTasks, setConsultantTasks] = useState([]); // State to store tasks from consultants
//   const [designTasks, setDesignTasks] = useState([]); // State to store tasks from design
//   const [loading, setLoading] = useState(true); // Loading state
//   const [error, setError] = useState(""); // Error state
//   const customerId = "123"; // Replace with the actual customer ID

//   // Fetch tasks assigned to the customer
//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         // Fetch consultant tasks
//         const consultantResponse = await axios.get(
//           `http://localhost:8080/customer/${customerId}/consultant-tasks`
//         );
//         setConsultantTasks(consultantResponse.data); // Set consultant tasks

//         // Fetch design tasks
//         const designResponse = await axios.get(
//           `http://localhost:8080/customer/${customerId}/design-tasks`
//         );
//         setDesignTasks(designResponse.data); // Set design tasks
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//         setError("Unable to fetch tasks. Please try again later."); // Set error message
//       } finally {
//         setLoading(false); // Set loading to false after fetching
//       }
//     };

//     fetchTasks();
//   }, [customerId]);

//   return (
//     <div className="customer-view">
//       <h2>My Construction Progress</h2>
//       {loading ? (
//         <p>Loading tasks...</p> // Loading message
//       ) : error ? (
//         <p>{error}</p> // Error message
//       ) : (
//         <>
//           <h3>Consultant Tasks</h3>
//           {consultantTasks.length > 0 ? (
//             <table>
//               <thead>
//                 <tr>
//                   <th>Task Name</th>
//                   <th>Status</th>
//                   <th>Assigned Staff</th>
//                   <th>Start Date</th> {/* Add Start Date column */}
//                   <th>End Date</th> {/* Add End Date column */}
//                 </tr>
//               </thead>
//               <tbody>
//                 {consultantTasks.map((task) => (
//                   <tr key={task.id}>
//                     <td>{task.taskName}</td>
//                     <td>{task.status}</td>
//                     <td>
//                       {task.assignedStaff
//                         ? task.assignedStaff.name
//                         : "Not Assigned"}
//                     </td>
//                     <td>{new Date(task.startDate).toLocaleDateString()}</td>{" "}
//                     {/* Add Start Date data */}
//                     <td>{new Date(task.endDate).toLocaleDateString()}</td>{" "}
//                     {/* Add End Date data */}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <p>No consultant tasks found.</p>
//           )}

//           <h3>Design Tasks</h3>
//           {designTasks.length > 0 ? (
//             <table>
//               <thead>
//                 <tr>
//                   <th>Task Name</th>
//                   <th>Status</th>
//                   <th>Assigned Staff</th>
//                   <th>Start Date</th> {/* Add Start Date column */}
//                   <th>End Date</th> {/* Add End Date column */}
//                 </tr>
//               </thead>
//               <tbody>
//                 {designTasks.map((task) => (
//                   <tr key={task.id}>
//                     <td>{task.taskName}</td>
//                     <td>{task.status}</td>
//                     <td>
//                       {task.assignedStaff
//                         ? task.assignedStaff.name
//                         : "Not Assigned"}
//                     </td>
//                     <td>{new Date(task.startDate).toLocaleDateString()}</td>{" "}
//                     {/* Add Start Date data */}
//                     <td>{new Date(task.endDate).toLocaleDateString()}</td>{" "}
//                     {/* Add End Date data */}
//                   </tr>
//                 ))}
//               </tbody>
//             </table>
//           ) : (
//             <p>No design tasks found.</p>
//           )}
//         </>
//       )}
//     </div>
//   );
// };

// export default CustomerView;

import React, { useEffect, useState } from "react";
import "./CustomerView.css"; // Import CSS file for styling
import Navbar from "../Navbar/Navbar";

const CustomerView = () => {
  const [customerInfo, setCustomerInfo] = useState({
    customerName: "Tú Đặng",
    phone: "0707804907",
    address: "1052 Quang Trung, quận Gò Vấp, TPHCM",
    request: "Thêm sân vườn",
  });

  const [tasks, setTasks] = useState([]); // To store tasks related to customer's construction project

  useEffect(() => {
    // Mock tasks data
    const mockTasks = [
      {
        taskName: "Thiết kế sân vườn",
        status: "Đang tiến hành",
        assignedStaff: { name: "Nguyễn Văn A" },
      },
      {
        taskName: "Lắp đặt hàng rào",
        status: "Chưa bắt đầu",
        assignedStaff: { name: "Trần Thị B" },
      },
      {
        taskName: "Cung cấp vật liệu",
        status: "Đã hoàn thành",
        assignedStaff: { name: "Lê Văn C" },
      },
    ];

    setTasks(mockTasks);
  }, []);

  // Function to handle status change
  const handleStatusChange = (index, newStatus) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, status: newStatus } : task
    );
    setTasks(updatedTasks);
  };

  return (
    <div className="customer-view">
      <Navbar />
      <h2>Thông Tin Khách Hàng</h2>
      <p>
        <strong>Tên:</strong> {customerInfo.customerName}
      </p>
      <p>
        <strong>Điện thoại:</strong> {customerInfo.phone}
      </p>
      <p>
        <strong>Địa chỉ:</strong> {customerInfo.address}
      </p>
      <p>
        <strong>Yêu cầu:</strong> {customerInfo.request}
      </p>

      <h2>Tiến Trình Xây Dựng</h2>
      <table>
        <thead>
          <tr>
            <th>Tên Nhiệm Vụ</th>
            <th>Trạng Thái</th>
            <th>Nhân Viên Giao Nhiệm Vụ</th>
            <th>Thay Đổi Trạng Thái</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <tr key={index}>
                <td>{task.taskName}</td>
                <td>{task.status}</td>
                <td>{task.assignedStaff.name}</td>
                <td>
                  <select
                    value={task.status}
                    onChange={(e) => handleStatusChange(index, e.target.value)}
                  >
                    <option value="Chưa bắt đầu">Chưa bắt đầu</option>
                    <option value="Đang tiến hành">Đang tiến hành</option>
                    <option value="Đã hoàn thành">Đã hoàn thành</option>
                  </select>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4">
                Không tìm thấy nhiệm vụ nào cho dự án của bạn.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerView;
