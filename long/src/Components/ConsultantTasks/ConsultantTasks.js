// Components/ConsultantTasks/ConsultantTasks.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./ConsultantTasks.css"; // Import CSS file for styling

const ConsultantTasks = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  // Fetch tasks assigned to the consultant
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "http:/localhost:8080/consult/ownedTasks "
        ); // Update the URL to your API
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  // Handle view quotation for specific constructionOrderId
  const handleViewQuotation = (constructionOrderId) => {
    navigate(`/quotation-order/${constructionOrderId}`);
  };

  return (
    <div className="consultant-tasks">
      <h1>Assigned Tasks</h1>
      <table>
        <thead>
          <tr>
            <th>Construction Order ID</th>
            <th>Customer Name</th>
            <th>Staff Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Customer Request</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task.constructionOrderId}>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={() => handleViewQuotation(task.constructionOrderId)}
                  >
                    {task.constructionOrderId}
                  </button>
                </td>
                <td>{task.customerName}</td>
                <td>{task.staffName}</td>
                <td>{task.phone}</td>
                <td>{task.address}</td>
                <td>{task.customerRequest}</td>
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


// import React, { useEffect, useState } from "react";
// import "./ConsultantTasks.css"; // Import CSS file for styling
// import { useNavigate } from "react-router-dom";

// const ConsultantTasks = () => {
//   const [tasks, setTasks] = useState([]);
//   const navigate = useNavigate();

//   // Hàm chuyển hướng đến trang QuotationOrder
//   const handleViewQuotation = (constructionOrderId) => {
//     navigate(`${constructionOrderId}`);
//   };

//   // Giả lập dữ liệu để thử nghiệm
//   useEffect(() => {
//     const mockTasks = [
//       {
//         constructionOrderId: 1,
//         customerName: "Đặng Mai Anh Tú",
//         startDate: "2024-09-10T00:00:00",
//         phone: "123-456-7890",
//         address: "123 Main St",
//         status: "Consulting"
//       },
//       {
//         constructionOrderId: 2,
//         customerName: "Háo Phù",
//         startDate: "2024-10-01T00:00:00",
//         phone: "987-654-3210",
//         address: "456 Oak Ave",
//         status: "Consulting"
//       },
//     ];

//     setTasks(mockTasks);
//   }, []);

//   return (
//     <>
//       <div className="consultant-tasks container mt-4">
//         <h1 className="text-center" style={{ color: 'blue' }}>Consultant Tasks</h1>
//         <table className="table table-bordered mt-4">
//           <thead className="thead-light">
//             <tr>
//               <th>Construction Order ID</th>
//               <th>Customer Name</th>
//               <th>Start Date</th>
//               <th>Phone</th>
//               <th>Address</th>
//               <th>Status</th>
//               <th>Action</th>
//             </tr>
//           </thead>
//           <tbody>
//             {tasks.length > 0 ? (
//               tasks.map((task) => (
//                 <tr key={task.constructionOrderId}>
//                   <td>{task.constructionOrderId}</td>
//                   <td>{task.customerName}</td>
//                   <td>{new Date(task.startDate).toLocaleDateString()}</td>
//                   <td>{task.phone}</td>
//                   <td>{task.address}</td>
//                   <td>{task.status}</td>
//                   <td>
//                     <button
//                       className="btn btn-primary"
//                       onClick={() => handleViewQuotation(task.constructionOrderId)}
//                     >
//                       View Quotation
//                     </button>
//                   </td>
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="7" className="text-center">No tasks assigned</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default ConsultantTasks;
