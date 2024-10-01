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
