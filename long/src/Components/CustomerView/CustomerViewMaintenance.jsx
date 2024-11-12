import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./CustomerView.css";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import { jwtDecode } from "jwt-decode"; // Corrected import
import Footer from "../Footer/Footer";

const CustomerViewMaintenance = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    const decode = jwtDecode(token);
    const accountId = decode.sub;

    const fetchOrders = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/customer/${accountId}/maintenanceOrders`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setOrders(response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Unable to fetch orders. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const handleViewPayment = (maintenanceOrderId) => {
    navigate(`/myInfo/orders/${maintenanceOrderId}/paymentInfo`);
  };

  const handlePayNow = (maintenanceOrderId) => {
    navigate(`/myInfo/orders/${maintenanceOrderId}/pay`);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  return (
    <>
      <Navbar />
      <div className="container customer-view mt-4" style={{ marginBottom: "90px" }}>
        <h2 className="text-center">My Maintenance Orders</h2>
        {loading ? (
          <p className="text-center">Loading orders...</p>
        ) : error ? (
          <p className="text-center text-danger">{error}</p>
        ) : (
          <>
            <h3 className="mt-4">Orders</h3>
            {orders.length > 0 ? (
              <table className="table table-bordered mt-3">
                <thead className="thead-dark">
                  <tr>
                    <th>Customer</th>
                    <th>Total Price</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((order, index) => (
                    <tr key={order.maintenanceOrderId}>
                      <td>{order.customerName}</td>
                      <td>{order.totalPrice}</td>
                      <td>{order.status}</td>
                      <td>
                        {order.status === "PAYMENT_CREATED" ? (<button className="btn btn-success ms-2" onClick={() => handlePayNow(order.maintenanceOrderId)}>
                          Pay Now
                        </button>) : (null)
                        }
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-center">No data.</p>
            )}
          </>
        )}
      </div>
      <Footer />
    </>
  );
};

export default CustomerViewMaintenance;
