import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./Pricing.css"; // Nhập CSS

const servicesData = [
  { id: 1, name: "Dịch Vụ Xây Dựng", price: "10,000,000 VNĐ" },
  { id: 2, name: "Dịch Vụ Bảo Trì", price: "2,000,000 VNĐ" },
  { id: 3, name: "Dịch Vụ Thiết Kế", price: "5,000,000 VNĐ" },
];

const Pricing = () => {
  const navigate = useNavigate(); // Khởi tạo useNavigate
  const [selectedServices, setSelectedServices] = useState([]); // Lưu trữ dịch vụ đã chọn

  const handleServiceChange = (serviceId) => {
    setSelectedServices(
      (prevSelected) =>
        prevSelected.includes(serviceId)
          ? prevSelected.filter((id) => id !== serviceId) // Bỏ chọn dịch vụ nếu đã được chọn
          : [...prevSelected, serviceId] // Thêm dịch vụ vào danh sách đã chọn
    );
  };

  const handleProceed = () => {
    const selected = servicesData.filter((service) =>
      selectedServices.includes(service.id)
    );
    navigate("/customer", { state: { services: selected } }); // Điều hướng đến trang Customer với dịch vụ đã chọn
  };

  return (
    <div className="pricing-container">
      <h2>Bảng Giá Dịch Vụ</h2>
      <table>
        <thead>
          <tr>
            <th>Dịch Vụ</th>
            <th>Giá</th>
            <th>Chọn</th>
          </tr>
        </thead>
        <tbody>
          {servicesData.map((service) => (
            <tr key={service.id}>
              <td>{service.name}</td>
              <td>{service.price}</td>
              <td>
                <input
                  type="checkbox"
                  checked={selectedServices.includes(service.id)}
                  onChange={() => handleServiceChange(service.id)}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={handleProceed} disabled={selectedServices.length === 0}>
        Tiếp Tục
      </button>
    </div>
  );
};

export default Pricing;
