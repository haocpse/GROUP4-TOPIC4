import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const ApproveDesign = () => {
  const [designs, setDesigns] = useState([]);
  const navigate = useNavigate();
  const sampleDesigns = [
    {
      designId: 1,
      constructionOrderId: 101,
      customerName: "Nguyễn Văn A",
      phone: "0123-456-789",
      address: "123 Đường ABC, Quận 1",
      leaderName: "Trần Thị B",
    },
    {
      designId: 2,
      constructionOrderId: 102,
      customerName: "Trần Thị C",
      phone: "0987-654-321",
      address: "456 Đường XYZ, Quận 2",
      leaderName: "Nguyễn Văn D",
    },
    {
      designId: 3,
      constructionOrderId: 103,
      customerName: "Lê Văn E",
      phone: "0345-678-910",
      address: "789 Đường MNO, Quận 3",
      leaderName: "Phạm Thị F",
    }
  ];
  

  // Lấy danh sách các design cần phê duyệt
  const fetchDesigns = async () => {
    try {
      const response = await axios.get("http://localhost:8080/manage/designs");
      setDesigns(response.data);
    } catch (error) {
      console.error("Error fetching designs !!", error);
      toast.error("Fail fetching Designs !!");
    }
  };

  // Xử lý phê duyệt hoặc từ chối thiết kế
  const handleApproval = async (designId, status) => {
    try {
      await axios.post("http://localhost:8080/manage/approve-designs", {
        designId,
        status,
      });
      toast.success(`Design ${status ? "approved" : "rejected"} successfully!`);
      setDesigns(designs.filter((design) => design.designId !== designId));
    } catch (error) {
      console.error("Error approving/rejecting design", error);
      toast.error("Can not update status !");
    }
  };

  // Xác nhận trước khi phê duyệt hoặc từ chối
  const confirmApproval = (designId, status) => {
    const action = status ? "approve" : "reject";
    const confirmed = window.confirm(`Are you sure you want to ${action} this design?`);
    if (confirmed) {
      handleApproval(designId, status);
    }
  };

  // Chuyển hướng tới trang chi tiết thiết kế
  const handleViewDetails = (design) => {
    navigate("/manage/view-design", {
      state: { design },
    });
  };

//   useEffect(() => {
//     fetchDesigns();
//   }, []);
useEffect(() => {
    // Sử dụng sampleDesigns làm dữ liệu mẫu cho ApproveDesign
    setDesigns(sampleDesigns);
  }, []);
  

  return (
    <>
      <ToastContainer position="top-right" autoClose={5000} />
      <div className="container mt-4">
        <h2 className="text-center" style={{ color: "black" }}>Admin - Approve Designs</h2>
        <table className="table table-bordered mt-4">
          <thead>
            <tr>
              <th>Construction Order ID</th>
              <th>Design ID</th>
              <th>Customer Name</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Leader Name</th>
              <th>View Details</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {designs.length === 0 ? (
              <tr>
                <td colSpan="8" className="text-center">No Design to approve.</td>
              </tr>
            ) : (
              designs.map((design) => (
                <tr key={design.designId}>
                  <td>{design.constructionOrderId}</td>
                  <td>{design.designId}</td>
                  <td>{design.customerName}</td>
                  <td>{design.phone}</td>
                  <td>{design.address}</td>
                  <td>{design.leaderName}</td>
                  <td>
                    <button
                      className="btn btn-primary"
                      onClick={() => handleViewDetails(design)}
                    >
                      View
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-success me-2"
                      onClick={() => confirmApproval(design.designId, true)}
                    >
                      Approve
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => confirmApproval(design.designId, false)}
                    >
                      Reject
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default ApproveDesign;
