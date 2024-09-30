import React, { useState } from 'react';
import ItemsList from './ItemsList';
import { useNavigate } from 'react-router-dom';

const QuotationForm = () => {
  const [selectedItems, setSelectedItems] = useState([]);
  const navigate = useNavigate();

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
    // Chuyển sang trang Quotation, truyền thông tin items đã chọn
    navigate('/quotation', { state: { selectedItems } });
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

      <ItemsList items={items} handleItemChange={handleItemChange} />

      <button type="button" onClick={handleExport}>Export Quotation</button>
    </div>
  );
};

export default QuotationForm;
