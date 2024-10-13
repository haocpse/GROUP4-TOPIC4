// Components/ConsultantTasks/ConsultantTasks.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import "./ConsultantTasks.css"; // Import CSS file for custom styling

const ConsultantTasks = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  // Fetch tasks assigned to the consultant
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/consult/ownedTasks"
        );
        setTasks(response.data.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  // Handle view quotation for specific constructionOrderId
  const handleExportQuotation = (constructionOrderId) => {
    navigate(`/consult/ownedTasks/${constructionOrderId}`);
  };

  const handleViewQuotation = (constructionOrderId) => {
    navigate(`/consult/ownedTasks/${constructionOrderId}/quotation`);
  };

  return (
    <div className="consultant-tasks container mt-4">
      <h1 className="text-center mb-4" style={{ color: 'blue' }}>Consultant Tasks</h1>
      <table className="table table-bordered mt-4">
        <thead className="thead-light">
          <tr>
            <th>Construction Order ID</th>
            <th>Customer Name</th>
            <th>Phone</th>
            <th>Address</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task) => (
              <tr key={task.constructionOrderId}>
                <td>{task.constructionOrderId}</td>
                <td>{task.customerName}</td>
                <td>{task.phone}</td>
                <td>{task.address}</td>
                <td>{task.status}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={
                      task.status === 'CONSULTING'
                        ? () => handleExportQuotation(task.constructionOrderId)
                        : () => handleViewQuotation(task.constructionOrderId)
                    }
                  >
                    {task.status === 'CONSULTING' ? 'Export Quotation' : 'View Quotation'}
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