// Components/ConsultantTasks/ConsultantTasks.js

import React, { useEffect, useState } from "react";
import axios from "axios";
import "./ConsultantTasks.css"; // Import CSS file for styling

const ConsultantTasks = () => {
  const [tasks, setTasks] = useState([]);

  // Fetch tasks assigned to the consultant
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/consultant/tasks"
        ); // Update the URL to your API
        setTasks(response.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  return (
    <div className="consultant-tasks">
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
                <td>{task.status}</td>
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


// const ConsultantTasks = () => {
//   const [tasks, setTasks] = useState([]);

//   // Fetch tasks assigned to the consultant (mocked for testing)
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
//       // Add more mock data here if needed
//     ];

//     setTasks(mockTasks);
//   }, []);

//   return (
//     <>
      
//       <div className="consultant-tasks">
//         <h1 className="text-center mt-4" style={{ color: 'blue' }}>Consultant Tasks</h1>
//         <table>
//           <thead>
//             <tr>
//               <th>Construction Order ID</th>
//               <th>Customer Name</th>
//               <th>Start Date</th>
//               <th>Phone</th>
//               <th>Address</th>
//               <th>Status</th>
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
//                 </tr>
//               ))
//             ) : (
//               <tr>
//                 <td colSpan="6">No tasks assigned</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       </div>
//     </>
//   );
// };

// export default ConsultantTasks;
