import React, { useState } from 'react';
import ItemsList from './ItemsList';

const QuotationForm = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const [batchPrice, setBatchPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [batch, setBatch] = useState(1);

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
        ? [...prevItems, itemPrice]
        : prevItems.filter((price) => price !== itemPrice)
    );
  };

  const calculateTotal = () => {
    const total = selectedItems.reduce((sum, price) => sum + price, 0);
    setTotalPrice(total);

    let batchPercentage = 0;
    if (batch === "1") {
      batchPercentage = 0.2;
    } else if (batch === "2") {
      batchPercentage = 0.3;
    } else if (batch === "3") {
      batchPercentage = 0.5;
    }

    setBatchPrice(total * batchPercentage);
  };

  return (
    <div>
      <label htmlFor="volume">Select Volume:</label>
      <select id="volume">
        <option value="0">Select volume</option>
        <option value="1">1 unit</option>
        <option value="2">2 units</option>
        <option value="3">3 units</option>
      </select>

      <label htmlFor="package-select">Select Package:</label>
      <select id="package-select">
        <option value="">Select a package</option>
        <option value="package1">Package 1</option>
        <option value="package2">Package 2</option>
        <option value="package3">Package 3</option>
      </select>

      <ItemsList items={items} handleItemChange={handleItemChange} />

      <p>Total Price: ${totalPrice}</p>

      <label htmlFor="batch-select">Select Batch:</label>
      <select id="batch-select" value={batch} onChange={(e) => setBatch(e.target.value)}>
        <option value="1">Batch 1 (20%)</option>
        <option value="2">Batch 2 (30%)</option>
        <option value="3">Batch 3 (50%)</option>
      </select>

      <p>Batch Price: ${batchPrice.toFixed(2)}</p>

      <button type="button" onClick={calculateTotal}>Calculate Total</button>
    </div>
  );
};

export default QuotationForm;
