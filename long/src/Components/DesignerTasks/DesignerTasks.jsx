import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./DesignerTasks.css";
import Navbar from "../Navbar/Navbar";
import axios from "axios";

const DesignerTasks = () => {
  const [tasks, setTasks] = useState([]);
  const navigate = useNavigate();

  // Fetch tasks assigned to the consultant from an API
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get("YOUR_API_URL_HERE"); // Replace with your API URL
        setTasks(response.data); // Assuming the API returns the tasks in the data property
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };

    fetchTasks();
  }, []);

  const handleUploadClick = async (constructionOrderId) => {
    // Fetch order details and then navigate to DesignUpload
    try {
      const response = await axios.get(
        `http://localhost:8080/design/ownedTasks/${constructionOrderId}`
      );
      const orderDetails = response.data;

      // Navigate to DesignUpload with order details passed as state
      navigate(`/designer-tasks/design-upload/${constructionOrderId}`, {
        state: orderDetails,
      });
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="container mt-5">
        <h1 className="text-center text-primary">Designer Tasks</h1>
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Construction Order ID</th>
              <th>Customer Name</th>
              <th>Start Date</th>
              <th>Staff Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Customer Request</th>
              <th>Upload</th>
            </tr>
          </thead>
          <tbody>
            {tasks.length > 0 ? (
              tasks.map((task) => (
                <tr key={task.constructionOrderId}>
                  <td>{task.constructionOrderId}</td>
                  <td>{task.customerName}</td>
                  <td>{new Date(task.startDate).toLocaleDateString()}</td>
                  <td>{task.staffName}</td>
                  <td>{task.phone}</td>
                  <td>{task.address}</td>
                  <td>{task.customerRequest}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() =>
                        handleUploadClick(task.constructionOrderId)
                      }
                    >
                      Upload
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
