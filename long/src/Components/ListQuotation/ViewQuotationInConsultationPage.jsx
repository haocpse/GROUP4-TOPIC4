import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';

const ViewQuotation = () => {
  const location = useLocation();
  const { quote } = location.state;
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:8080/consultant/quotations/${quote.constructionOrderId}/payments`)
      .then(response => {
        setPayments(response.data);
      })
      .catch(error => {
        console.error("There was an error fetching the payments!", error);
      });
  }, [quote.constructionOrderId]);

  return (
    <div>
      <h2>Quotation Details for {quote.customerName}</h2>
      {/* Render thông tin báo giá */}
      
      <h3>Payment Details</h3>
      <ul>
        {payments.map((payment, index) => (
          <li key={index}>
            Amount: {payment.amount}, Method: {payment.method}, Status: {payment.status}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ViewQuotation;
