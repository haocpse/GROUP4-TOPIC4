import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styles from './QuotationOrder.module.css';

const ViewQuotationAfterCreate = () => {


    const { constructionOrderId } = useParams();
    const [infoquotation, setInfoQuotation] = useState([]);
    useEffect(() => {
        const fetcInfoQuotaion = async () => {
            const response = await axios.get(`http://localhost:8080/consult/ownedTasks/${constructionOrderId}/quotation`)
            setInfoQuotation(response.data.data)
        }

        fetcInfoQuotaion()
    },[]);

    return (
        <div className={`${styles.quotationOrderContainer} container mt-5`}>
            <div className="card shadow">
                <div className="card-header text-center bg-primary text-white">
                    <h2>Quotation Order Details</h2>
                    <p>Order ID: {constructionOrderId}</p>
                </div>
                <div className="card-body">
                    <div className="row mb-3  border">
                        <div className="col-md-6">
                            <p><strong>Customer: </strong> {infoquotation.customerName}</p>
                        </div>
                        <div className="col-md-6">
                            <p><strong>Consultant: </strong> {infoquotation.consultantName}</p>
                        </div>
                        <div className="col-md-12">
                            <p><strong>Request: </strong> {infoquotation.customerRequest}</p>
                        </div>
                    </div>
                    <div className="row mb-3">
                        <div className="col-md-6">
                            <p><strong>Volume:</strong> {infoquotation.volume} m³</p>
                        </div>
                        <div className="col-md-6">
                            <p> <strong>Package: </strong>{infoquotation.packageType}</p>
                        </div>
                        <div className="col-md-12">
                            <p><strong>Price Stage 1:</strong> {infoquotation.priceStage1} VND</p>
                        </div>
                        <div className="col-md-12">
                            <p><strong>Price Stage 2:</strong> {infoquotation.priceStage2} VND</p>
                        </div>
                        <div className="col-md-12">
                            <p><strong>Price Stage 3:</strong> {infoquotation.priceStage3} VND</p>
                        </div>
                        <div className="col-md-12">
                            <p><strong>Total Price:</strong> {infoquotation.totalPrice} VND</p>
                        </div>
                    </div>
                    <div>
                        <h3>Construction contents:</h3>
                        {infoquotation.content && infoquotation.content.map((item, index) => (
                            <div key={index}>
                                <label>{item}</label>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ViewQuotationAfterCreate;