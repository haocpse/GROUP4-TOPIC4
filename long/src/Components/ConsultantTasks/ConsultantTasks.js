// // Components/ConsultantTasks/ConsultantTasks.js

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import "./ConsultantTasks.css"; // Import CSS file for styling

// const ConsultantTasks = () => {
//   const [tasks, setTasks] = useState([]);

//   // Fetch tasks assigned to the consultant
//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await axios.get(
//           "http://localhost:8080/consultant/tasks"
//         ); // Update the URL to your API
//         setTasks(response.data);
//       } catch (error) {
//         console.error("Error fetching tasks:", error);
//       }
//     };

//     fetchTasks();
//   }, []);

//   return (
//     <div className="consultant-tasks">
//       <h1>Assigned Tasks</h1>
//       <table>
//         <thead>
//           <tr>
//             <th>Construction Order ID</th>
//             <th>Customer Name</th>
//             <th>Start Date</th>
//             <th>Phone</th>
//             <th>Address</th>
//             <th>Status</th>
//           </tr>
//         </thead>
//         <tbody>
//           {tasks.length > 0 ? (
//             tasks.map((task) => (
//               <tr key={task.constructionOrderId}>
//                 <td>{task.constructionOrderId}</td>
//                 <td>{task.customerName}</td>
//                 <td>{new Date(task.startDate).toLocaleDateString()}</td>
//                 <td>{task.phone}</td>
//                 <td>{task.address}</td>
//                 <td>{task.status}</td>
//               </tr>
//             ))
//           ) : (
//             <tr>
//               <td colSpan="6">No tasks assigned</td>
//             </tr>
//           )}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default ConsultantTasks;

import React, { useState } from "react";
import "./ConsultantTasks.css"; // Import CSS file for styling
import { toast, ToastContainer } from "react-toastify";

const ConsultantTasks = () => {
  const mockTasks = [
    {
      constructionOrderId: 1,
      customerName: "Nguyễn Văn A",
      startDate: "2024-10-01",
      phone: "0123456789",
      address: "123 Đường ABC, Quận 1",
      status: "In Progress",
    },
    {
      constructionOrderId: 2,
      customerName: "Trần Thị B",
      startDate: "2024-10-02",
      phone: "0987654321",
      address: "456 Đường XYZ, Quận 2",
      status: "Requested",
    },
  ];

  const [tasks, setTasks] = useState(mockTasks);
  const statusOptions = ["Requested", "In Progress", "Completed"];

  const handleStatusChange = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.constructionOrderId === taskId
          ? { ...task, status: newStatus }
          : task
      )
    );
    toast.success("Status updated successfully!");
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Requested":
        return <i className="fas fa-clock text-warning"></i>; // Icon for Requested status
      case "In Progress":
        return <i className="fas fa-spinner fa-spin text-info"></i>; // Icon for In Progress status
      case "Completed":
        return <i className="fas fa-check-circle text-success"></i>; // Icon for Completed status
      default:
        return null;
    }
  };

  return (
    <div className="consultant-tasks">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h1>Assigned Tasks</h1>
      <table>
        <thead>
          <tr>
            <th>Construction Order ID</th>
            <th>Customer Name</th>
            <th>Start Date</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Status</th>
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
                <td>
                  <div className="d-flex align-items-center">
                    {getStatusIcon(task.status)} {/* Status icon */}
                    <select
                      value={task.status}
                      onChange={(e) =>
                        handleStatusChange(
                          task.constructionOrderId,
                          e.target.value
                        )
                      }
                      className="form-select ms-2"
                    >
                      {statusOptions.map((status) => (
                        <option key={status} value={status}>
                          {status}
                        </option>
                      ))}
                    </select>
                  </div>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No tasks assigned</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ConsultantTasks;
