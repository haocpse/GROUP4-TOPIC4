// Components/ConsultantTasks/ConsultantTasks.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { jwtDecode } from "jwt-decode";

const ConsultantQuotations = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  // Fetch tasks assigned to the consultant
  useEffect(() => {

    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token)
    const accountId = decoded.sub

    const fetchTasks = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/staffs/${accountId}/quotations`,
          {
              headers: {
                  'Authorization': `Bearer ${localStorage.getItem('token')}`, // Attach token
              }
          }
      );
        setTasks(response.data.data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  // Handle view quotation for specific constructionOrderId
  const handleUpdateQuotation = (quotationId) => {
    navigate(`/consult/quotations/${quotationId}`);
  };

  const handleViewQuotation = (constructionOrderId) => {
    navigate(`/consult/ownedTasks/${constructionOrderId}/quotation`);
  };


  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = date.getFullYear();
    return `${hours}:${minutes}:${seconds} ${day}/${month}/${year}`;
};


  return (
    <div className="consultant-tasks container mt-4">
      <h1 className="text-center mb-4" style={{ color: 'blue' }}>Quotations</h1>
      <table className="table table-bordered mt-4">
        <thead className="thead-light">
          <tr>
            <th>Quotation</th>
            <th>Customer Name</th>
            <th>Posted Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length > 0 ? (
            tasks.map((task, index) => (
              <tr key={task.constructionOrderId}>
                <td>{index+1}</td>
                <td>{task.customerName}</td>
                <td>{formatDate(task.postedDate)}</td>
                <td>{task.quotationStatus}</td>
                <td>
                  <button
                    className="btn btn-primary"
                    onClick={
                      task.quotationStatus === 'REJECTED'
                        ? () => handleUpdateQuotation(task.quotationId)
                        : () => handleViewQuotation(task.constructionOrderId)
                    }
                  >
                    {task.quotationStatus === 'REJECTED' ? 'Update Quotation' : 'View Quotation'}
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

export default ConsultantQuotations;
