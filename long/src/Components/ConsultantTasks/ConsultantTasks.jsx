// Components/ConsultantTasks/ConsultantTasks.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./ConsultantTasks.css";

const ConsultantTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [filteredTasks, setFilteredTasks] = useState([]);
  const [statusFilter, setStatusFilter] = useState("All");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("http://localhost:8080/consult/ownedTasks");
        setTasks(response.data);
        setFilteredTasks(response.data); // Initialize with full data set
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleSort = (field, order) => {
    const sortedTasks = [...filteredTasks].sort((a, b) => {
      if (field === "startDate") {
        return order === "asc"
          ? new Date(a.startDate) - new Date(b.startDate)
          : new Date(b.startDate) - new Date(a.startDate);
      }
      if (order === "asc") {
        return a[field].localeCompare(b[field]);
      } else {
        return b[field].localeCompare(a[field]);
      }
    });
    setFilteredTasks(sortedTasks);
  };

  const handleStatusFilter = (status) => {
    setStatusFilter(status);
    setFilteredTasks(
      status === "All" ? tasks : tasks.filter(task => task.status === status)
    );
  };

  const handleViewQuotation = (constructionOrderId) => {
    navigate(`/quotation-order/${constructionOrderId}`);
  };

  return (
    <div className="consultant-tasks container mt-4">
      <h1 className="text-center mb-4" style={{ color: 'blue' }}>Consultant Tasks</h1>

      <div className="row mb-3">
        <div className="col">
          <button
            className="btn btn-outline-primary mr-2"
            onClick={() => handleSort("customerName", "asc")}
          >
            Sort by Name (A-Z)
          </button>
          <button
            className="btn btn-outline-primary mr-2"
            onClick={() => handleSort("customerName", "desc")}
          >
            Sort by Name (Z-A)
          </button>
        </div>
        <div className="col">
          <button
            className="btn btn-outline-primary mr-2"
            onClick={() => handleSort("startDate", "desc")}
          >
            Sort by Latest Date
          </button>
          <button
            className="btn btn-outline-primary"
            onClick={() => handleSort("startDate", "asc")}
          >
            Sort by Earliest Date
          </button>
        </div>
        <div className="col">
          <select
            className="form-select"
            value={statusFilter}
            onChange={(e) => handleStatusFilter(e.target.value)}
          >
            <option value="All">All Status</option>
            <option value="Consulting">Consulting</option>
            <option value="Completed">Completed</option>
            <option value="Pending">Pending</option>
          </select>
        </div>
      </div>

      <table className="table table-bordered mt-4">
        <thead className="thead-light">
          <tr>
            <th>Construction Order ID</th>
            <th>Customer Name</th>
            <th>Start Date</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {filteredTasks.length > 0 ? (
            filteredTasks.map((task) => (
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
                    onClick={() => handleViewQuotation(task.constructionOrderId)}
                  >
                    View Quotation
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="text-center">No tasks assigned</td>
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
