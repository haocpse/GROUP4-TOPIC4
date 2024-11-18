import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DesignerTasks.css";
import axios from "axios";
import { jwtDecode } from "jwt-decode";

const ListDesign = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  // Fetch tasks assigned to the consultant from an API
  useEffect(() => {

    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token)
    const accountId = decoded.sub

    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/staffs/${accountId}/designs`, {
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

  const handleUpdateDesign = (designId) => {
    navigate(`/design/designs/${designId}`);
  };

  const handleViewDesign = (designId) => {
    navigate(`/design/ownedTasks/${designId}/design`);
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
    <>
      <div className="container mt-4">
        <h1 className="text-center mb-4" style={{ color: 'blue' }}>Designs</h1>
        <table className="table table-bordered mt-4">
          <thead className="thead-light">
            <tr>
              <th>Design</th>
              <th>Customer Name</th>
              <th>Post Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task, index) => (
                <tr key={task.constructionOrderId}>
                  <td>{index + 1}</td>
                  <td>tam</td>
                  <td>{formatDate(task.postedDate)}</td>
                  <td>{task.designStatus}</td>
                  <td>
                    {console.log(task)}
                    <button
                      className="btn btn-primary"
                      onClick={
                        task.designStatus === 'REJECTED'
                          ? () => handleUpdateDesign(task.designId)
                          : () => handleViewDesign(task.designId)
                      }
                    >
                      {task.designStatus === 'REJECTED' ? 'Update Design' : 'View Design'}
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

export default ListDesign;
