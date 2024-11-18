import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DesignerTasks.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const DesignerTasks = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  // Fetch tasks assigned to the consultant from an API
  useEffect(() => {

    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token)
    const accountId = decoded.sub

    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/staffs/${accountId}/orders`, {
          headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`, // Attach token
          }
      });
        setTasks(response.data.data); // Assuming the API returns the tasks in the data property
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleUploadDesign = (constructionOrderId) => {
      navigate(`/design/ownedTasks/${constructionOrderId}`); 
  };

  const handleViewDesign = (constructionOrderId) => {
    navigate(`/design/ownedTasks/${constructionOrderId}/design`);
  };

  return (
    <>
      <div className="container mt-4">
        <h1 className="text-center mb-4" style={{ color: 'blue' }}>Tasks</h1>
        <table className="table table-bordered mt-4">
          <thead className="thead-light">
            <tr>
              <th>Task</th>
              <th>Customer Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <tr key={task.constructionOrderId}>
                  <td>{index+1}</td>
                  <td>tam</td>
                  <td>{task.phone}</td>
                  <td>{task.address}</td>
                  <td>{task.status}</td>
                  <td>
                  <button
                    className="btn btn-primary"
                    onClick={
                      task.status === 'DESIGNING'
                        ? () => handleUploadDesign(task.constructionOrderId)
                        : () => handleViewDesign(task.constructionOrderId)
                    }
                  >
                    {task.status === 'DESIGNING' ? 'Upload Design' : 'View Design'}
                  </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center">
                  No tasks assigned
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default DesignerTasks;
