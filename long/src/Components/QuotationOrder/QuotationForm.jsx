// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import ItemsList from './ItemsList';
// import styles from './QuotationForm.module.css';

// const QuotationForm = ({ onFormSubmit }) => {
//   const [selectedItems, setSelectedItems] = useState([]);
//   const [selectedPackage, setSelectedPackage] = useState(''); // Package đã chọn
//   const [packages, setPackages] = useState([]); // Danh sách packages từ API
//   const [items, setItems] = useState([]); // Danh sách items từ API
//   const [volume, setVolume] = useState(''); // Volume mới thêm

//   // Gọi API lấy danh sách packages khi component mount
//   useEffect(() => {
//     axios.get('http://localhost:8080/consultant/quotations/packages')
//       .then(response => {
//         setPackages(response.data);
//       })
//       .catch(error => {
//         console.error("There was an error fetching the packages!", error);
//       });
//   }, []);

//   // Gọi API lấy danh sách items dựa trên package đã chọn
//   useEffect(() => {
//     if (selectedPackage) {
//       axios.get(`http://localhost:8080/quotations/packages/${selectedPackage}/items`)
//         .then(response => {
//           setItems(response.data);
//         })
//         .catch(error => {
//           console.error("There was an error fetching the items!", error);
//         });
//     }
//   }, [selectedPackage]);

//   const handleItemChange = (event) => {
//     const itemPrice = parseFloat(event.target.value);
//     const isChecked = event.target.checked;

//     setSelectedItems((prevItems) =>
//       isChecked
//         ? [...prevItems, { price: itemPrice, name: event.target.nextSibling.textContent }]
//         : prevItems.filter((item) => item.price !== itemPrice)
//     );
//   };

//   const handleExport = () => {
//     if (!selectedPackage || !volume) {
//       alert("Please select a package and enter a volume before exporting the quotation.");
//       return;
//     }
//     // Chuyển package, các item đã chọn và volume qua `QuotationPage`
//     onFormSubmit({ selectedItems, selectedPackage, volume });
//   };

//   return (
//     <div className={styles.quotationFormContainer}>
//       <label className={styles.label} htmlFor="package">Select Package:</label>
//       <select
//         id="package"
//         className={styles.selectBox}
//         value={selectedPackage}
//         onChange={(e) => setSelectedPackage(e.target.value)}
//       >
//         <option value="">Select package</option>
//         {packages.map((pkg, index) => (
//           <option key={index} value={pkg.name}>
//             {pkg.name} - ${pkg.price}
//           </option>
//         ))}
//       </select>

//       <label className={styles.label} htmlFor="volume">Enter Volume:</label>
//       <input
//         type="number"
//         id="volume"
//         className={styles.inputBox}
//         value={volume}
//         onChange={(e) => setVolume(e.target.value)}
//         placeholder="Enter volume"
//       />

//       {/* Hiển thị danh sách item dựa trên package đã chọn */}
//       <ItemsList items={items} handleItemChange={handleItemChange} />

//       <div className={styles.submitButtonContainer}>
//         <button type="button" className={styles.submitButton} onClick={handleExport}>
//           Export Quotation
//         </button>
//       </div>
//     </div>
//   );
// };

// export default QuotationForm;

import React, { useState } from 'react';
import ItemsList from './ItemsList';
import styles from './QuotationForm.module.css'; // Import CSS module

const QuotationForm = ({ onFormSubmit }) => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [selectedPackage, setSelectedPackage] = useState(''); // State để lưu package đã chọn

  const items = [
    { name: "Thiết kế hồ cá koi", description: "Lên bản vẽ thiết kế hồ...", price: 500 },
    { name: "Đào đất và tạo nền móng", description: "Đào đất theo kích thước...", price: 1000 },
    { name: "Thi công hệ thống ống...", description: "Lắp đặt hệ thống ống...", price: 1500 },
    { name: "Thi công hệ thống lọc nước", description: "Lắp đặt hệ thống lọc...", price: 2000 },
    { name: "Xây dựng hồ", description: "Đổ bê tông, gia cố hồ...", price: 3000 },
    { name: "Thi công hệ thống ánh sáng", description: "Lắp đặt đèn chiếu sáng...", price: 800 },
    { name: "Thi công hệ thống tạo cảnh quan", description: "Bố trí cây cảnh...", price: 1200 },
    { name: "Kiểm tra và vận hành hệ thống lọc", description: "Chạy thử hệ thống lọc...", price: 600 },
    { name: "Thả cá và hoàn thiện hồ", description: "Cân chỉnh môi trường nước...", price: 900 }
  ];

  const handleItemChange = (event) => {
    const itemPrice = parseFloat(event.target.value);
    const isChecked = event.target.checked;

    setSelectedItems((prevItems) =>
      isChecked
        ? [...prevItems, { price: itemPrice, name: event.target.nextSibling.textContent }]
        : prevItems.filter((item) => item.price !== itemPrice)
    );
  };

  const handleExport = () => {
    if (!selectedPackage) {
      alert("Please select a package before exporting the quotation.");
      return;
    }
    // Chuyển package và các item đã chọn qua `QuotationPage`
    onFormSubmit({ selectedItems, selectedPackage });
  };

  return (
    <div className={styles.quotationFormContainer}>
      <label className={styles.label} htmlFor="volume">Select Volume:</label>
      <select id="volume" className={styles.selectBox}>
        <option value="0">Select volume</option>
        <option value="1">1 unit</option>
        <option value="2">2 units</option>
        <option value="3">3 units</option>
      </select>

      {/* Thêm lựa chọn package */}
      <div className={styles.packageSelection}>
        <label className={styles.label} htmlFor="package">Select Package:</label>
        <select
          id="package"
          className={styles.selectBox}
          value={selectedPackage}
          onChange={(e) => setSelectedPackage(e.target.value)}
        >
          <option value="">Select package</option>
          <option value="Standard">Standard</option>
          <option value="Premium">Premium</option>
          <option value="Deluxe">Deluxe</option>
        </select>
      </div>

      <ItemsList items={items} handleItemChange={handleItemChange} />

      <div className={styles.submitButtonContainer}>
        <button type="button" className={styles.submitButton} onClick={handleExport}>
          Export Quotation
        </button>
      </div>
    </div>
  );
};

export default QuotationForm;

