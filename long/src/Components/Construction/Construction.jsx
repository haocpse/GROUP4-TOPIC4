import React, { useEffect, useState } from "react";
import axios from "axios";

const Construction = () => {
  const [constructionRequests, setConstructionRequests] = useState([]);
  const [staffList, setStaffList] = useState([]);
  const [isStaffListOpen, setIsStaffListOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [loadingRequests, setLoadingRequests] = useState(true);
  const [loadingStaff, setLoadingStaff] = useState(false);
  const [feedbackMessage, setFeedbackMessage] = useState("");

  const fetchConstructionRequests = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/manage/constructions"
      );
      setConstructionRequests(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy yêu cầu xây dựng:", error);
      setFeedbackMessage("Lỗi khi tải yêu cầu xây dựng.");
    } finally {
      setLoadingRequests(false);
    }
  };

  const fetchStaff = async () => {
    setLoadingStaff(true);
    try {
      const response = await axios.get("http://localhost:8080/staff");
      setStaffList(response.data);
    } catch (error) {
      console.error("Lỗi khi lấy danh sách nhân viên:", error);
      setFeedbackMessage("Lỗi khi tải danh sách nhân viên.");
    } finally {
      setLoadingStaff(false);
    }
  };

  // Sử dụng useEffect để gọi hàm fetchConstructionRequests khi component được mount
  useEffect(() => {
    fetchConstructionRequests();
  }, []);

  useEffect(() => {
    if (isStaffListOpen) {
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
        const response = await axios.post(
          "http://localhost:8080/manage/assign",
          {
            // Gọi API để gán nhân viên
            requestId: selectedRequest.id, // ID yêu cầu
            staffId: staffId, // ID nhân viên
          }
        );

        if (response.status === 200) {
          setFeedbackMessage("Gán nhân viên thành công!"); // Hiển thị tin nhắn thành công
        } else {
          setFeedbackMessage("Gán nhân viên thất bại.");
        }
      } catch (error) {
        console.error("Lỗi khi gán nhân viên:", error);
        setFeedbackMessage("Lỗi khi gán nhân viên.");
      } finally {
        setIsStaffListOpen(false);
      }
    }
  };

  return (
    <div className="table-container">
      {loadingRequests ? (
        <p>Đang tải yêu cầu xây dựng...</p>
      ) : constructionRequests.length > 0 ? (
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
            {constructionRequests.map((request) => (
              <tr key={request.id}>
                <td>{request.id}</td>
                <td>{request.customerName}</td>
                <td>{new Date(request.date).toLocaleDateString()}</td>{" "}
                {/* Định dạng lại ngày */}
                <td>{request.phone}</td>
                <td>
                  <button
                    className="assign-button"
                    onClick={() => handleAssignStaffClick(request)}
                    disabled={isStaffListOpen || loadingStaff} // Disable when loading staff
                  >
                    Gán
                  </button>
                </td>
                <td>{request.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>Không tìm thấy yêu cầu xây dựng.</p>
      )}
      {feedbackMessage && <p>{feedbackMessage}</p>} {/* Tin nhắn phản hồi */}
      {isStaffListOpen && (
        <div className="list">
          <div className="list-content">
            <h2>Chọn Nhân Viên</h2>
            {loadingStaff ? (
              <p>Đang tải nhân viên...</p>
            ) : (
              <ul>
                {staffList.map((staff) => (
                  <li
                    key={staff.staffId}
                    onClick={() => handleSelectedStaff(staff.staffId)}
                  >
                    {staff.staffName}
                  </li>
                ))}
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
