// // Components/CustomerView/CustomerView.js

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CustomerView.css"; // Import CSS file for styling
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomerView = () => {
  const [orders, setOrders] = useState([]); // State to store orders
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(""); // Error state

  // Fetch data from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        // Fetch data from the API
        const response = await fetch("http://localhost:8080/myInfo/orders");
        if (!response.ok) {
          throw new Error("Failed to fetch orders");
        }
        const data = await response.json();
        setOrders(data); // Set the orders data
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Unable to fetch orders. Please try again later."); // Set error message
      } finally {
        setLoading(false); // Set loading to false after fetching
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="container customer-view mt-4">
      <h2 className="text-center">My Construction Progress</h2>
      {loading ? (
        <p className="text-center">Loading orders...</p>
      ) : error ? (
        <p className="text-center text-danger">{error}</p>
      ) : (
        <>
          <h3 className="mt-4">Orders</h3>
          {orders.length > 0 ? (
            <table className="table table-bordered mt-3">
              <thead className="thead-light">
                <tr>
                  <th>Order ID</th>
                  <th>Quotation</th>
                  <th>Design</th>
                  <th>Package Type</th>
                  <th>Start Date</th>
                  <th>End Date</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.orderId}>
                    <td>{order.orderId}</td>
                    <td>
                      <Link 
                        to={`/customer-quotation/${order.Quotation}`} 
                        className="quotation-link"
                      >
                        {order.Quotation}
                      </Link>
                    </td>
                    <td>
                      <Link 
                        to={`/design/${order.Design}`} 
                        className="design-link"
                      >
                        {order.Design}
                      </Link>
                    </td>
                    <td>{order.packageType}</td>
                    <td>{new Date(order.startDate).toLocaleDateString()}</td>
                    <td>{new Date(order.endDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center">No orders found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default CustomerView;





