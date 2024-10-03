// import React, { useEffect, useState } from "react";
// import axios from "axios";

// const Construction = () => {
//   const [constructionRequests, setConstructionRequests] = useState([]); // Lưu trữ yêu cầu xây dựng
//   const [staffList, setStaffList] = useState([]); // Lưu trữ danh sách nhân viên
//   const [isStaffListOpen, setIsStaffListOpen] = useState(false); // Trạng thái mở/đóng danh sách nhân viên
//   const [selectedRequest, setSelectedRequest] = useState(null); // Lưu yêu cầu đang chọn
//   const [loadingRequests, setLoadingRequests] = useState(true); // Trạng thái đang tải yêu cầu
//   const [loadingStaff, setLoadingStaff] = useState(false); // Trạng thái đang tải danh sách nhân viên
//   const [feedbackMessage, setFeedbackMessage] = useState(""); // Tin nhắn phản hồi

//   const fetchConstructionRequests = async () => {
//     try {
//       const response = await axios.get(
//         "http://localhost:8080/manage/constructions"
//       ); // Gọi API lấy dữ liệu
//       setConstructionRequests(response.data); // Lưu dữ liệu vào state
//       setLoadingRequests(false); // Đặt trạng thái không còn tải
//     } catch (error) {
//       console.error("Lỗi khi lấy yêu cầu xây dựng:", error);
//       setLoadingRequests(false); // Đặt trạng thái không còn tải
//     }
//   };

//   // Hàm fetch để lấy danh sách nhân viên từ API
//   const fetchStaff = async () => {
//     setLoadingStaff(true); // Đặt trạng thái đang tải
//     try {
//       const response = await axios.get("http://localhost:8080/staff"); // Gọi API lấy dữ liệu
//       setStaffList(response.data); // Lưu dữ liệu vào state
//     } catch (error) {
//       console.error("Lỗi khi lấy danh sách nhân viên:", error);
//     } finally {
//       setLoadingStaff(false); // Đặt trạng thái không còn tải
//     }
//   };

//   // Sử dụng useEffect để gọi hàm fetchConstructionRequests khi component được mount
//   useEffect(() => {
//     fetchConstructionRequests(); // Gọi hàm fetch yêu cầu xây dựng
//   }, []);

//   // Sử dụng useEffect để gọi hàm fetchStaff khi danh sách nhân viên được mở
//   useEffect(() => {
//     if (isStaffListOpen) {
//       // Nếu danh sách nhân viên đang mở
//       fetchStaff(); // Gọi hàm fetch danh sách nhân viên
//     }
//   }, [isStaffListOpen]);

//   // Hàm xử lý khi nhấn nút gán nhân viên
//   const handleAssignStaffClick = (request) => {
//     setSelectedRequest(request); // Lưu yêu cầu đang chọn
//     setIsStaffListOpen(true); // Mở danh sách nhân viên
//   };

//   // Hàm xử lý khi chọn nhân viên
//   const handleSelectedStaff = async (staffId) => {
//     if (selectedRequest) {
//       try {
//         await axios.post("http://localhost:8080/manage/assign", {
//           // Gọi API để gán nhân viên
//           requestId: selectedRequest.id, // ID yêu cầu
//           staffId: staffId, // ID nhân viên
//         });
//         setFeedbackMessage("Gán nhân viên thành công!"); // Hiển thị tin nhắn thành công
//       } catch (error) {
//         console.error("Lỗi khi gán nhân viên:", error);
//         setFeedbackMessage("Lỗi khi gán nhân viên."); // Hiển thị tin nhắn lỗi
//       }
//     }
//     setIsStaffListOpen(false); // Đóng danh sách nhân viên
//   };

//   return (
//     <div className="table-container">
//       {loadingRequests ? ( // Kiểm tra trạng thái đang tải yêu cầu
//         <p>Đang tải yêu cầu xây dựng...</p>
//       ) : (
//         <table>
//           <thead>
//             <tr>
//               <th>Request ID</th>
//               <th>Customer</th>
//               <th>Date</th>
//               <th>Phone</th>
//               <th>Assign To</th>
//               <th>Status</th>
//             </tr>
//           </thead>
//           <tbody>
//             {constructionRequests.length > 0 ? ( // Kiểm tra có yêu cầu nào không
//               constructionRequests.map(
//                 (
//                   request // Duyệt qua từng yêu cầu
//                 ) => (
//                   <tr key={request.id}>
//                     <td>{request.id}</td>
//                     <td>{request.customerName}</td>
//                     <td>{request.date}</td> {/* Cập nhật trường Date */}
//                     <td>{request.phone}</td> {/* Cập nhật trường Phone */}
//                     <td>
//                       <button
//                         className="assign-button"
//                         onClick={() => handleAssignStaffClick(request)}
//                       >
//                         Gán
//                       </button>
//                       {" " /* Nút gán nhân viên */}
//                     </td>
//                     <td>{request.status}</td>
//                   </tr>
//                 )
//               )
//             ) : (
//               <tr>
//                 <td colSpan="6">Không tìm thấy yêu cầu xây dựng</td>
//               </tr>
//             )}
//           </tbody>
//         </table>
//       )}
//       {feedbackMessage && <p>{feedbackMessage}</p>}
//       {" " /* Hiển thị tin nhắn phản hồi nếu có */}
//       {isStaffListOpen && ( // Nếu danh sách nhân viên đang mở
//         <div className="list">
//           <div className="list-content">
//             <h2>Chọn Nhân Viên</h2>
//             {loadingStaff ? ( // Kiểm tra trạng thái đang tải danh sách nhân viên
//               <p>Đang tải nhân viên...</p>
//             ) : (
//               <ul>
//                 {staffList.map(
//                   (
//                     staff // Duyệt qua từng nhân viên
//                   ) => (
//                     <li
//                       key={staff.staffId}
//                       onClick={() => handleSelectedStaff(staff.staffId)}
//                     >
//                       {staff.staffName} {/* Hiển thị tên nhân viên */}
//                     </li>
//                   )
//                 )}
//               </ul>
//             )}
//             <button onClick={() => setIsStaffListOpen(false)}>Đóng</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Construction;

import React, { useEffect, useState } from "react";
import "./Consultation.module.css";
import { toast, ToastContainer } from "react-toastify";

const Consultation = () => {
  const mockRequests = [
    {
      id: 1,
      customerName: "Đặng Mai Anh Tú",
      date: "2024-10-01",
      phone: "0123456789",
      address: "54/59 Bùi Quang Là",
      status: "Requested",
      assignedStaff: null,
    },
    {
      id: 2,
      customerName: "Châu Phú Hào",
      date: "2024-10-02",
      phone: "0987654321",
      address: "66/77, Vĩnh Hưng, Long An",
      status: "Requested",
      assignedStaff: null,
    },
  ];

  const mockStaffList = [
    { id: 1, name: "Khoa Nguyễn" },
    { id: 2, name: "Tú Đặng" },
    { id: 3, name: "Háo Phù" },
  ];

  const [requests, setRequests] = useState(mockRequests);
  const [staffList, setStaffList] = useState(mockStaffList);
  const statusOptions = ["Requested", "In Progress", "Completed"];

  const handleAssignStaff = (requestId, staffId, staffName) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === requestId
          ? { ...request, assignedStaff: staffName }
          : request
      )
    );
    toast.success("Staff assigned successfully!");
  };

  const handleStatusChange = (requestId, newStatus) => {
    setRequests((prevRequests) =>
      prevRequests.map((request) =>
        request.id === requestId ? { ...request, status: newStatus } : request
      )
    );
    toast.success("Status updated successfully!");
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case "Requested":
        return <i className="fas fa-clock text-warning"></i>;
      case "In Progress":
        return <i className="fas fa-spinner fa-spin text-info"></i>;
      case "Completed":
        return <i className="fas fa-check-circle text-success"></i>;
      default:
        return null;
    }
  };

  return (
    <div className="container mt-4">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <h2 className="text-center" style={{ color: "red" }}>
        Manage Requests
      </h2>
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th scope="col">Request ID</th> {/* Thêm Request ID */}
            <th scope="col">Customer</th>
            <th scope="col">Date</th>
            <th scope="col">Phone</th>
            <th scope="col">Address</th>
            <th scope="col">Assign To</th>
            <th scope="col">Status</th>
          </tr>
        </thead>
        <tbody>
          {requests.map((request) => (
            <tr key={request.id}>
              <td>{request.id}</td> {/* Hiển thị Request ID */}
              <td>{request.customerName}</td>
              <td>{request.date}</td>
              <td>{request.phone}</td>
              <td>{request.address}</td>
              <td>
                <select
                  className="form-select"
                  value={request.assignedStaff || ""}
                  onChange={(e) => {
                    const selectedStaff = staffList.find(
                      (staff) => staff.name === e.target.value
                    );
                    handleAssignStaff(
                      request.id,
                      selectedStaff.id,
                      selectedStaff.name
                    );
                  }}
                >
                  <option value="" disabled>
                    Assign Staff
                  </option>
                  {staffList.map((staff) => (
                    <option key={staff.id} value={staff.name}>
                      {staff.name}
                    </option>
                  ))}
                </select>
              </td>
              <td>
                <div className="d-flex align-items-center">
                  {getStatusIcon(request.status)}
                  <select
                    value={request.status}
                    onChange={(e) =>
                      handleStatusChange(request.id, e.target.value)
                    }
                    className="form-select ms-2"
                  >
                    {statusOptions.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Consultation;
