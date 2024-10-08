import React from "react";
import { useLocation } from "react-router-dom";

const ViewPayment = () => {
    const location = useLocation();
    const { stage, amount, paymentStatus, paymentMethod, description } = location.state || {};

    if (!stage) {
        return <div>No payment details available.</div>;
    }

    return (
        <div className="container mt-4">
            <h2 className="text-center" style={{ color: 'green' }}>Payment Details for {stage}</h2>
            <table className="table table-bordered mt-4">
                <tbody>
                    <tr>
                        <th>Description</th>
                        <td>{description}</td>
                    </tr>
                    <tr>
                        <th>Amount (VND)</th>
                        <td>{amount}</td>
                    </tr>
                    <tr>
                        <th>Payment Method</th>
                        <td>{paymentMethod}</td>
                    </tr>
                    <tr>
                        <th>Payment Status</th>
                        <td>{paymentStatus}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
};

export default ViewPayment;
