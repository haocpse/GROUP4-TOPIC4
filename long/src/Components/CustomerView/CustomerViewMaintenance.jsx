import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./CustomerView.css";
import axios from "axios";
import Navbar from "../Navbar/Navbar";
import jwtDecode from "jwt-decode";
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
                const response = await axios.get(`http://localhost:8080/customer/${accountId}/constructionOrders`, {
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
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

    const handleLogout = () => {
        localStorage.removeItem("token");
        window.location.reload();
    };

    const handleView = (constructionOrderId, Type) => {
        if (Type === "QUOTATION") {
            navigate(`/myInfo/orders/${constructionOrderId}/quotation`);
        } else if (Type === "DESIGN") {
            navigate(`/myInfo/orders/${constructionOrderId}/design`);
        } else if (Type === "PAYMENT") {
            navigate(`/myInfo/orders/${constructionOrderId}/payments`);
        } else if (Type === "PAY_NOW") {
            navigate(`/myInfo/orders/${constructionOrderId}/paymentInfo`);
        } else {
            navigate(`/myInfo/orders/${constructionOrderId}/progress`);
        }
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
                                <thead className="thead-dark">
                                    <tr>
                                        <th>Order ID</th>
                                        <th>Customer</th>
                                        <th>Quotation</th>
                                        <th>Design</th>
                                        <th>Progress</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Payment</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order, index) => (
                                        <tr key={order.constructionOrderId}>
                                            <td>{index + 1}</td>
                                            <td>{order.customerName}</td>
                                            <td>
                                                {order.quotationId && (
                                                    <button
                                                        className="btn btn-primary"
                                                        onClick={() => handleView(order.constructionOrderId, "QUOTATION")}
                                                    >
                                                        View Quotation
                                                    </button>
                                                )}
                                            </td>
                                            <td>
                                                {order.designId && (
                                                    <button
                                                        className="btn btn-primary"
                                                        onClick={() => handleView(order.constructionOrderId, "DESIGN")}
                                                    >
                                                        View Design
                                                    </button>
                                                )}
                                            </td>
                                            <td>
                                                {order.designId && (
                                                    <button
                                                        className="btn btn-primary"
                                                        onClick={() => handleView(order.constructionOrderId, "CONSTRUCTION")}
                                                    >
                                                        View Progress
                                                    </button>
                                                )}
                                            </td>
                                            <td>{formatDate(order.startDate)}</td>
                                            <td>{formatDate(order.endDate)}</td>
                                            <td>
                                                <button
                                                    className="btn btn-primary"
                                                    onClick={() => handleView(order.constructionOrderId, "PAYMENT")}
                                                >
                                                    View Payment
                                                </button>
                                            </td>
                                            <td>
                                                <button
                                                    className="btn btn-success"
                                                    onClick={() => handleView(order.constructionOrderId, "PAY_NOW")}
                                                >
                                                    Pay Now
                                                </button>
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
                <div className="button-container d-flex flex-column justify-content-end" style={{ height: "100%" }}>
                    <button onClick={handleLogout} className="nav-link d-flex align-items-center sidebar-link bg-transparent border-0">
                        <i className="fa-solid fa-right-from-bracket"></i>
                    </button>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CustomerViewMaintenance;
