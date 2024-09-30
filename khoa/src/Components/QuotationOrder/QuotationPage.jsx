import React from 'react';
import { useLocation } from 'react-router-dom';

const QuotationPage = ({ customer }) => {
  const location = useLocation();
  const { selectedItems } = location.state || { selectedItems: [] };

  const calculateBatch = (batchPercentage) => {
    return selectedItems.reduce((total, item) => total + (item.price * batchPercentage), 0);
  };

  return (
    <div>
      <h1>Quotation for {customer.name}</h1>
      <p>Phone: {customer.phone}</p>
      <p>Address: {customer.address}</p>

      <h3>Selected Items</h3>
      <ul>
        {selectedItems.map((item, index) => (
          <li key={index}>
            {item.name} - ${item.price}
          </li>
        ))}
      </ul>

      <h3>Batch Prices</h3>
      <p>Batch 1 (20%): ${calculateBatch(0.2).toFixed(2)}</p>
      <p>Batch 2 (30%): ${calculateBatch(0.3).toFixed(2)}</p>
      <p>Batch 3 (50%): ${calculateBatch(0.5).toFixed(2)}</p>
    </div>
  );
};

export default QuotationPage;
