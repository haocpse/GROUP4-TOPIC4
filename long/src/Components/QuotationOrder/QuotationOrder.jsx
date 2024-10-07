import React, { useState } from 'react';
import CustomerInfo from './CustomerInfo';
import QuotationForm from './QuotationForm';
import QuotationPage from './QuotationPage';
import styles from './QuotationOrder.module.css'; // Import CSS module

function QuotationOrder() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({ selectedItems: [], selectedPackage: '' });

  const customer = {
    name: "Nguyen Van A",
    phone: "0987654321",
    address: "123 Street, Hanoi"
  };

  const handleFormSubmit = (data) => {
    setFormData(data); // Lưu cả items và package
    setIsFormSubmitted(true);
  };

  return (
    <div className={styles.quotationOrderContainer}>
      <h1 className={styles.header}>Quotation Order</h1>
      {!isFormSubmitted ? (
        <>
          <CustomerInfo name={customer.name} phone={customer.phone} address={customer.address} />
          <QuotationForm onFormSubmit={handleFormSubmit} />
        </>
      ) : (
        <QuotationPage customer={customer} formData={formData} />
      )}
    </div>
  );
}

export default QuotationOrder;
// QuotationOrder.jsx
// QuotationOrder.jsx

// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { useParams } from "react-router-dom";

// const QuotationOrder = () => {
//   const { constructionOrderId } = useParams(); // Lấy constructionOrderId từ URL
//   const [quotation, setQuotation] = useState(null);
//   const [loading, setLoading] = useState(true);

//   // Gọi API để lấy dữ liệu QuotationOrder
//   useEffect(() => {
//     const fetchQuotationOrder = async () => {
//       try {
//         const response = await axios.get(
//           `http://localhost:8080/consult/ownedTasks/${constructionOrderId}`
//         ); // Chỉnh URL phù hợp với API thực tế của bạn
//         setQuotation(response.data);
//         setLoading(false);
//       } catch (error) {
//         console.error("Error fetching quotation order:", error);
//         setLoading(false);
//       } 
//     };

//     fetchQuotationOrder();
//   }, [constructionOrderId]);

//   // Xử lý trường hợp đang tải hoặc không tìm thấy dữ liệu
//   if (loading) {
//     return <div>Loading...</div>;
//   }

//   if (!quotation) {
//     return <div>No quotation data found.</div>;
//   }

//   return (
//     <div className="quotation-order">
//       <h2>Quotation Order Details for {constructionOrderId}</h2>
//       <p><strong>Customer Name:</strong> {quotation.customerName}</p>
//       <p><strong>Volume:</strong> {quotation.volume}</p>
//       <p><strong>Package:</strong> {quotation.package}</p>
//       <p><strong>Address:</strong> {quotation.address}</p>
//       <p><strong>Status:</strong> {quotation.status}</p>
//       <p><strong>Total Price:</strong> {quotation.totalPrice}</p>
//       {/* Add more fields as necessary */}
//     </div>
//   );
// };

// export default QuotationOrder;
