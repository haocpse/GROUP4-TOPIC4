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
