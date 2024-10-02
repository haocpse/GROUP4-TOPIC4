import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom"; // Import useLocation

const Customer = () => {
  const location = useLocation(); // Khởi tạo useLocation
  const { services } = location.state || {}; // Nhận thông tin dịch vụ đã chọn từ state
  const [customers, setCustomers] = useState([]); // Lưu trữ danh sách khách hàng
  const [loadingCustomers, setLoadingCustomers] = useState(true); // Trạng thái đang tải danh sách khách hàng
  const [feedbackMessage, setFeedbackMessage] = useState(""); // Tin nhắn phản hồi
  const [selectedCustomer, setSelectedCustomer] = useState(null); // Khách hàng đang chọn
  const [isDetailOpen, setIsDetailOpen] = useState(false); // Trạng thái mở/đóng chi tiết khách hàng

  // Hàm để lấy danh sách khách hàng từ API
  const fetchCustomers = async () => {
    try {
      const response = await axios.get("http://localhost:8080/customers"); // Gọi API lấy dữ liệu
      setCustomers(response.data); // Lưu dữ liệu vào state
    } catch (error) {
      console.error("Lỗi khi lấy danh sách khách hàng:", error);
      setFeedbackMessage("Lỗi khi lấy danh sách khách hàng."); // Hiển thị tin nhắn lỗi
    } finally {
      setLoadingCustomers(false); // Đặt trạng thái không còn tải
    }
  };

  // Sử dụng useEffect để gọi hàm fetchCustomers khi component được mount
  useEffect(() => {
    fetchCustomers(); // Gọi hàm fetch danh sách khách hàng
  }, []);

  // Hàm xử lý khi nhấn nút xem chi tiết khách hàng
  const handleViewDetailsClick = (customer) => {
    setSelectedCustomer(customer); // Lưu khách hàng đang chọn
    setIsDetailOpen(true); // Mở chi tiết khách hàng
  };

  // Tính tổng giá của các dịch vụ đã chọn
  const totalPrice = services
    ? services.reduce(
        (total, service) =>
          total + parseInt(service.price.replace(/[^0-9]/g, "")),
        0
      ) // Chuyển đổi giá từ chuỗi sang số
    : 0;

  return (
    <div className="table-container">
      <h2>Thông Tin Dịch Vụ Đã Chọn</h2>
      {services && services.length > 0 ? ( // Kiểm tra nếu có dịch vụ đã chọn
        <div>
          {services.map((service) => (
            <p key={service.id}>
              <strong>Dịch Vụ:</strong> {service.name} - <strong>Giá:</strong>{" "}
              {service.price}
            </p>
          ))}
          <p>
            <strong>Tổng Giá:</strong> {totalPrice.toLocaleString()} VNĐ{" "}
            {/* Hiển thị tổng giá */}
          </p>
        </div>
      ) : (
        <p>Không có dịch vụ nào đã chọn.</p> // Thông báo nếu không có dịch vụ nào
      )}
      {loadingCustomers ? ( // Kiểm tra trạng thái đang tải danh sách khách hàng
        <p>Đang tải danh sách khách hàng...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Tên</th>
              <th>Email</th>
              <th>Điện Thoại</th>
              <th>Địa Chỉ</th>
              <th>Hành Động</th>
            </tr>
          </thead>
          <tbody>
            {customers.length > 0 ? ( // Kiểm tra có khách hàng nào không
              customers.map((customer) => (
                <tr key={customer.id}>
                  <td>{customer.id}</td>
                  <td>{customer.name}</td>
                  <td>{customer.email}</td>
                  <td>{customer.phone}</td>
                  <td>{customer.address}</td>
                  <td>
                    <button
                      className="view-details-button"
                      onClick={() => handleViewDetailsClick(customer)}
                    >
                      Xem Chi Tiết
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">Không tìm thấy khách hàng nào.</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      {feedbackMessage && <p>{feedbackMessage}</p>}{" "}
      {/* Hiển thị tin nhắn phản hồi nếu có */}
      {isDetailOpen &&
        selectedCustomer && ( // Nếu chi tiết khách hàng đang mở
          <div className="customer-detail">
            <h2>Chi Tiết Khách Hàng</h2>
            <p>
              <strong>ID:</strong> {selectedCustomer.id}
            </p>
            <p>
              <strong>Tên:</strong> {selectedCustomer.name}
            </p>
            <p>
              <strong>Email:</strong> {selectedCustomer.email}
            </p>
            <p>
              <strong>Điện Thoại:</strong> {selectedCustomer.phone}
            </p>
            <p>
              <strong>Địa Chỉ:</strong> {selectedCustomer.address}
            </p>
            <button onClick={() => setIsDetailOpen(false)}>Đóng</button>{" "}
            {/* Nút để đóng chi tiết */}
          </div>
        )}
    </div>
  );
};

export default Customer;
