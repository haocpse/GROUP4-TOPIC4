import React, { useEffect, useState } from "react";
import axios from "axios";

const Construction = () => {
  const [constructionRequests, setConstructionRequests] = useState([]); // Lưu trữ yêu cầu xây dựng
  const [staffList, setStaffList] = useState([]); // Lưu trữ danh sách nhân viên
  const [isStaffListOpen, setIsStaffListOpen] = useState(false); // Trạng thái mở/đóng danh sách nhân viên
  const [selectedRequest, setSelectedRequest] = useState(null); // Lưu yêu cầu đang chọn
  const [loadingRequests, setLoadingRequests] = useState(true); // Trạng thái đang tải yêu cầu
  const [loadingStaff, setLoadingStaff] = useState(false); // Trạng thái đang tải danh sách nhân viên
  const [feedbackMessage, setFeedbackMessage] = useState(""); // Tin nhắn phản hồi

  const fetchConstructionRequests = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/manage/constructions"
      ); // Gọi API lấy dữ liệu
      setConstructionRequests(response.data); // Lưu dữ liệu vào state
      setLoadingRequests(false); // Đặt trạng thái không còn tải
    } catch (error) {
      console.error("Lỗi khi lấy yêu cầu xây dựng:", error);
      setLoadingRequests(false); // Đặt trạng thái không còn tải
    }
  };

  // Hàm fetch để lấy danh sách nhân viên từ API
  const fetchStaff = async () => {
    setLoadingStaff(true); // Đặt trạng thái đang tải
    try {
      const response = await axios.get("http://localhost:8080/staff"); // Gọi API lấy dữ liệu
      setStaffList(response.data); // Lưu dữ liệu vào state
    } catch (error) {
      console.error("Lỗi khi lấy danh sách nhân viên:", error);
    } finally {
      setLoadingStaff(false); // Đặt trạng thái không còn tải
    }
  };

  // Sử dụng useEffect để gọi hàm fetchConstructionRequests khi component được mount
  useEffect(() => {
    fetchConstructionRequests(); // Gọi hàm fetch yêu cầu xây dựng
  }, []);

  // Sử dụng useEffect để gọi hàm fetchStaff khi danh sách nhân viên được mở
  useEffect(() => {
    if (isStaffListOpen) {
      // Nếu danh sách nhân viên đang mở
      fetchStaff(); // Gọi hàm fetch danh sách nhân viên
    }
  }, [isStaffListOpen]);

  // Hàm xử lý khi nhấn nút gán nhân viên
  const handleAssignStaffClick = (request) => {
    setSelectedRequest(request); // Lưu yêu cầu đang chọn
    setIsStaffListOpen(true); // Mở danh sách nhân viên
  };

  // Hàm xử lý khi chọn nhân viên
  const handleSelectedStaff = async (staffId) => {
    if (selectedRequest) {
      try {
        await axios.post("http://localhost:8080/manage/assign", {
          // Gọi API để gán nhân viên
          requestId: selectedRequest.id, // ID yêu cầu
          staffId: staffId, // ID nhân viên
        });
        setFeedbackMessage("Gán nhân viên thành công!"); // Hiển thị tin nhắn thành công
      } catch (error) {
        console.error("Lỗi khi gán nhân viên:", error);
        setFeedbackMessage("Lỗi khi gán nhân viên."); // Hiển thị tin nhắn lỗi
      }
    }
    setIsStaffListOpen(false); // Đóng danh sách nhân viên
  };

  return (
    <div className="table-container">
      {loadingRequests ? ( // Kiểm tra trạng thái đang tải yêu cầu
        <p>Đang tải yêu cầu xây dựng...</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>Request ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Phone</th>
              <th>Assign To</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {constructionRequests.length > 0 ? ( // Kiểm tra có yêu cầu nào không
              constructionRequests.map(
                (
                  request // Duyệt qua từng yêu cầu
                ) => (
                  <tr key={request.id}>
                    <td>{request.id}</td>
                    <td>{request.customerName}</td>
                    <td>{request.date}</td> {/* Cập nhật trường Date */}
                    <td>{request.phone}</td> {/* Cập nhật trường Phone */}
                    <td>
                      <button
                        className="assign-button"
                        onClick={() => handleAssignStaffClick(request)}
                      >
                        Gán
                      </button>
                      {" " /* Nút gán nhân viên */}
                    </td>
                    <td>{request.status}</td>
                  </tr>
                )
              )
            ) : (
              <tr>
                <td colSpan="6">Không tìm thấy yêu cầu xây dựng</td>
              </tr>
            )}
          </tbody>
        </table>
      )}
      {feedbackMessage && <p>{feedbackMessage}</p>}
      {" " /* Hiển thị tin nhắn phản hồi nếu có */}
      {isStaffListOpen && ( // Nếu danh sách nhân viên đang mở
        <div className="list">
          <div className="list-content">
            <h2>Chọn Nhân Viên</h2>
            {loadingStaff ? ( // Kiểm tra trạng thái đang tải danh sách nhân viên
              <p>Đang tải nhân viên...</p>
            ) : (
              <ul>
                {staffList.map(
                  (
                    staff // Duyệt qua từng nhân viên
                  ) => (
                    <li
                      key={staff.staffId}
                      onClick={() => handleSelectedStaff(staff.staffId)}
                    >
                      {staff.staffName} {/* Hiển thị tên nhân viên */}
                    </li>
                  )
                )}
              </ul>
            )}
            <button onClick={() => setIsStaffListOpen(false)}>Đóng</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Construction;
