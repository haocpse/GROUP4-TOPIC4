import React, { useEffect, useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Ensure Bootstrap is imported

const CustomerView = ({ customerId }) => {
  const [customerOrders, setCustomerOrders] = useState([]); // Lưu trữ yêu cầu xây dựng của khách hàng
  const [loadingOrders, setLoadingOrders] = useState(true); // Trạng thái đang tải yêu cầu
  const [customerInfo, setCustomerInfo] = useState({}); // Thông tin khách hàng
  const [feedbackMessage, setFeedbackMessage] = useState(""); // Tin nhắn phản hồi

  // Hàm fetch để lấy dữ liệu của khách hàng từ API
  const fetchCustomerOrders = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8080/customer/construction-progress/${customerId}`
      ); // Gọi API lấy dữ liệu
      setCustomerOrders(response.data.orders); // Lưu dữ liệu yêu cầu xây dựng vào state
      setCustomerInfo(response.data.customer); // Lưu thông tin khách hàng vào state
    } catch (error) {
      console.error("Lỗi khi lấy dữ liệu khách hàng:", error);
      setFeedbackMessage("Lỗi khi tải dữ liệu khách hàng.");
    } finally {
      setLoadingOrders(false); // Đặt trạng thái không còn tải
    }
  };

  // Sử dụng useEffect để gọi hàm fetchCustomerOrders khi component được mount
  useEffect(() => {
    fetchCustomerOrders(); // Gọi hàm fetch dữ liệu khách hàng
  }, [customerId]);

  return (
    <div className="container mt-4">
      {/* Display feedback messages */}
      {feedbackMessage && (
        <div className="alert alert-danger" role="alert">
          {feedbackMessage}
        </div>
      )}

      <div className="row">
        {/* Left-side Customer Information */}
        <div className="col-md-4">
          <div className="card mb-4">
            <div className="card-header">
              <h5>Thông tin khách hàng</h5>
            </div>
            <div className="card-body">
              {loadingOrders ? (
                <p>Đang tải thông tin khách hàng...</p>
              ) : (
                <div>
                  <p>
                    <strong>Tên khách hàng:</strong>{" "}
                    {customerInfo.customerName || "N/A"}
                  </p>
                  <p>
                    <strong>Số điện thoại:</strong>{" "}
                    {customerInfo.phone || "N/A"}
                  </p>
                  <p>
                    <strong>Địa chỉ:</strong> {customerInfo.address || "N/A"}
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Right-side Construction Progress Table */}
        <div className="col-md-8">
          <div className="card">
            <div className="card-header">
              <h5>Tiến độ xây dựng</h5>
            </div>
            <div className="card-body">
              {loadingOrders ? (
                <p>Đang tải dữ liệu xây dựng của bạn...</p>
              ) : customerOrders.length > 0 ? (
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Construction ID</th>
                      <th>Request</th>
                      <th>Start Date</th>
                      <th>Staff Name</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {customerOrders.map((order) => (
                      <tr key={order.id}>
                        <td>{order.id}</td>
                        <td>{order.request}</td>
                        <td>
                          {new Date(order.startDate).toLocaleDateString()}
                        </td>
                        <td>{order.staffName || "Chưa gán"}</td>
                        <td>{order.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              ) : (
                <p>Không có dữ liệu xây dựng nào cho khách hàng.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerView;
