// import React from 'react';
// import styles from './QuotationPage.module.css'; // Import CSS module

// const QuotationPage = ({ customer, formData }) => {
//   const { selectedItems, selectedPackage } = formData;

//   const calculateBatch = (batchPercentage) => {
//     return selectedItems.reduce((total, item) => total + (item.price * batchPercentage), 0);
//   };

//   return (
//     <div className={styles.quotationPageContainer}>
//       <h1 className={styles.header}>Quotation for {customer.name}</h1>
//       <p>Phone: {customer.phone}</p>
//       <p>Address: {customer.address}</p>

//       {/* Hiển thị thông tin package */}
//       <h3>Selected Package: {selectedPackage}</h3>

//       <h3>Selected Items</h3>
//       <ul className={styles.itemList}>
//         {selectedItems.map((item, index) => (
//           <li key={index}>
//             {item.name} - ${item.price}
//           </li>
//         ))}
//       </ul>

//       <div className={styles.batchPrices}>
//         <h3>Batch Prices</h3>
//         <p>Batch 1 (20%): ${calculateBatch(0.2).toFixed(2)}</p>
//         <p>Batch 2 (30%): ${calculateBatch(0.3).toFixed(2)}</p>
//         <p>Batch 3 (50%): ${calculateBatch(0.5).toFixed(2)}</p>
//       </div>
//     </div>
//   );
// };

// export default QuotationPage;
// QuotationPage.jsx
// QuotationPage.jsx
// QuotationPage.jsx

import React from 'react';
import styles from './QuotationPage.module.css';

const QuotationPage = ({ customer, formData }) => {
  const { selectedItems, selectedPackage, volume } = formData;

  return (
    <div className={styles.quotationPageContainer}>
      <h1 className={styles.header}>Quotation for {customer.name}</h1>
      <p>Phone: {customer.phone}</p>
      <p>Address: {customer.address}</p>
      <p>Volume: {volume}</p> {/* Hiển thị Volume */}
      <h3>Selected Package: {selectedPackage}</h3>
      {/* Các nội dung khác */}
    </div>
  );
};

export default QuotationPage;
