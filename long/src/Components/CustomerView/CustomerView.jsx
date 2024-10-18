// CustomerView.js
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./CustomerView.css";
import 'bootstrap/dist/css/bootstrap.min.css';

const CustomerView = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.get("http://localhost:8080/myInfo/orders");
        setOrders(response.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
        setError("Unable to fetch orders. Please try again later.");
      } finally {
        setLoading(false);
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
                  <th>Checkout</th>
                </tr>
              </thead>
              <tbody>
                {orders.map((order) => (
                  <tr key={order.ConstructionOrderId}>
                    <td>{order.ConstructionOrderId}</td>
                    <td>{order.Quotation}</td>
                    <td>{order.designId}</td>
                    <td>{order.packageType}</td>
                    <td>{order.startDate}</td>
                    <td>{order.endDate}</td>
                    <td>
                      <Link
                        to={{
                          pathname: "/checkout",
                          state: {
                            OrderId: order.ConstructionOrderId,
                            Design: order.designId,
                            PackageType: order.packageType,
                            StartDate: order.startDate,
                            EndDate: order.endDate,
                          },
                        }}
                        className="btn btn-primary"
                      >
                        Checkout
                      </Link>
                    </td>
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
