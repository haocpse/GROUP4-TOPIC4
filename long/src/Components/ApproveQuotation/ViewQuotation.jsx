import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ViewQuotation = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const quote = location.state?.quote;

    // kt xem co quote hay hok
    if (!quote) {
        return (
            <div className="container mt-4">
                <div className="alert alert-danger" role="alert">
                    No quotation details available.
                </div>
            </div>
        );
    }

    return (
        <div className="container mt-4">
            <h2 className="text-center text-primary mb-4">Quotation Details</h2>
            <div className="card">
                <div className="card-body">
                    <table className="table table-bordered table-striped">
                        <thead>
                            <tr>
                                <th>Customer Name</th>
                                <th>Package Type</th>
                                <th>Volume (m³)</th>
                                <th>Price Stage 1 (VND)</th>
                                <th>Price Stage 2 (VND)</th>
                                <th>Price Stage 3 (VND)</th>
                                <th>Total Price (VND)</th>
                                <th>Customer Request</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{quote.customerName}</td>
                                <td>{quote.packageType}</td>
                                <td>{quote.volume}</td>
                                <td>{quote.priceStage1}</td>
                                <td>{quote.priceStage2}</td>
                                <td>{quote.priceStage3}</td>
                                <td>{quote.totalPrice}</td>
                                <td>{quote.customerRequest}</td>

                            </tr>
                        </tbody>
                    </table>

                    <h3 className="mt-4">Content:</h3>
                    <ul className="list-group">
                        {quote.content.map((item, index) => (
                            <li key={index} className="list-group-item">{item}</li>
                        ))}
                    </ul>

                    <div className="text-center mt-4">
                        <button className="btn btn-danger" onClick={() => navigate(-1)}>
                            Back to Quotations
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewQuotation;
