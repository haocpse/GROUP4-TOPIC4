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
