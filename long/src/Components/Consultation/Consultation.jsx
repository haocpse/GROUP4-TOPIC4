// import React, { useEffect, useState } from "react";
// import './Consultation.css';
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";

// const Consultation = () => {
//     const [requests, setRequests] = useState([]);
//     const [staffList, setStaffList] = useState([]);
//     const [isStaffListOpen, setIsStaffListOpen] = useState(false);
//     const [selectedRequestId, setSelectedRequestId] = useState(null);
//     const statusOptions = ["Requested", "In Progress", "Completed"]; // Các trạng thái có thể chọn


//     // lay du lieu request tu backend
//     useEffect(() => {
//         const fetchRequests = async () => {
//             try {
//                 const response = await axios.get('http://localhost:8080/consultation-request');
//                 setRequests(response.data);
//             } catch (error) {
//                 console.error('Error fetching requests:', error);
//                 toast.error('Failed to load requests. Please try again later.');
//             }
//         };
//         fetchRequests();
//     }, []);

//     // lay du lieu staff tu backend
//     const fetchStaff = async () => {
//         try {
//             const response = await axios.get('http://localhost:8080/consultation-staff');
//             setStaffList(response.data);
//         } catch (error) {
//             console.error('Error fetching staff:', error);
//             toast.error('Failed to load staff. Please try again later.');
//         }
//     };

//     useEffect(() => {
//         if (isStaffListOpen) fetchStaff();
//     }, [isStaffListOpen]);

//     //handle staff
//     const handleAssignStaff = async (requestId, staffId, staffName) => {
//         try {
//             await axios.post('http://localhost:8080/assign-consultation-staff', {
//                 requestId,
//                 staffId
//             });
//             setRequests(prevRequests =>
//                 prevRequests.map(request =>
//                     request.id === requestId ? { ...request, assignedStaff: staffName } : request
//                 )
//             );
//             toast.success("Staff assigned successfully!");
//             setIsStaffListOpen(false);
//             setSelectedRequestId(null);
//         } catch (error) {
//             console.error('Error assigning staff:', error);
//             toast.error("Failed to assign staff. Please try again.");
//         }
//     };

//     // UPDATE STATUS
//     const handleStatusChange = async (requestId, newStatus) => {
//         try {
//             await axios.post('http://localhost:8080/update-request-status', {
//                 requestId,
//                 status: newStatus
//             });
//             setRequests(prevRequests =>
//                 prevRequests.map(request =>
//                     request.id === requestId ? { ...request, status: newStatus } : request
//                 )
//             );
//             toast.success("Status updated successfully!");
//         } catch (error) {
//             console.error('Error updating status:', error);
//             toast.error("Failed to update status. Please try again.");
//         }
//     };


//     return (
//         <div className="container mt-4">
//             <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
//             <h2 className="text-center">Manage Requests</h2>

//             {requests.length === 0 ? (
//                 <p>Your system has no Request ^^ !</p>
//             ) : (

//                 <table className="table table-bordered">
//                     <thead>
//                         <tr>
//                             <th scope="col">Customer</th>
//                             <th scope="col">Date</th>
//                             <th scope="col">Phone</th>
//                             <th scope="col">Address</th>
//                             <th scope="col">Assign To</th>
//                             <th scope="col">Status</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {requests.map(request => (
//                             <tr key={request.id}>
//                                 <td>{request.customerName}</td>
//                                 <td>{request.date}</td>
//                                 <td>{request.phone}</td>
//                                 <td>{request.address}</td>
//                                 <td>
//                                     <select
//                                         className="form-select"
//                                         value={request.assignedStaff || ""} // thuộc tính value sẽ dc gán bằng null nếu chưa gán nhân viên
//                                         onChange={(e) => {
//                                             const selectedStaffId = e.target.value; // lấy id của staff dựa vào sự thay đổi
//                                             const selectedStaff = staffList.find(staff => staff.id === parseInt(selectedStaffId)); // tìm trong stafflist, staff là 1 mãng lưu giá trị của stafflist và tìm trong stafflist có id tương ứng
//                                             if (selectedStaff) {
//                                                 handleAssignStaff(request.id, selectedStaff.id, selectedStaff.name);
//                                             }
//                                         }}
//                                     >
//                                         <option value="" disabled>{request.assignedStaff ? request.assignedStaff : 'Assign Staff'}</option>
//                                         {staffList.map(staff => (
//                                             <option key={staff.id} value={staff.id}>
//                                                 {staff.name}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </td>
//                                 <td>
//                                     <select
//                                         value={request.status}
//                                         onChange={(e) => handleStatusChange(request.id, e.target.value)} // onchange là hàm xử lý sự kiện khi long drop the beat ^^
//                                         className="form-select"
//                                     >
//                                         {statusOptions.map(status => (
//                                             <option key={status} value={status}>
//                                                 {status}
//                                             </option>
//                                         ))}
//                                     </select>
//                                 </td>
//                             </tr>
//                         ))}
//                     </tbody>
//                 </table>
//             )}
//         </div>
//     );
// };

// export default Consultation;

import React, { useEffect, useState } from "react";
import './Consultation.module.css';
import { toast, ToastContainer } from "react-toastify";

const Consultation = () => {
    const mockRequests = [
        { id: 1, customerName: "Đặng Mai Anh Tú", date: "2024-10-01", phone: "0123456789", address: "54/59 Bùi Quang Là", status: "Requested", assignedStaff: null },
        { id: 2, customerName: "Châu Phú Hào", date: "2024-10-02", phone: "0987654321", address: "66/77, Vĩnh Hưng, Long An", status: "Requested", assignedStaff: null },
        { id: 3, customerName: "Nguyễn Minh Khoa", date: "2024-16-07", phone: "0123456789", address: " B3/05 Huỳnh Bá Chánh, ấp 3, xã Tân Kiên, Bình Chánh, TP.HCM", status: "Requested", assignedStaff: null },
        { id: 4, customerName: "Trương Hoàng Long", date: "2024-18-05", phone: "0987654321", address: "1956 Qunag ", status: "Requested", assignedStaff: null },

    ];

    const mockConsultantStaffList = [
        { id: 1, name: "Khoa Nguyễn" },
        { id: 2, name: "Tú Đặng" },
        { id: 3, name: "Háo Phù" },
    ];
    const mockDesignStaffList = [
        { id: 1, name: "Dũng Uông" },
        { id: 2, name: "Độ Phùng" },
        { id: 3, name: "Trấn Thành" },
    ];
    const mockConstructorStaffList = [
        { id: 1, name: "Thuỳ Dương" },
        { id: 2, name: "Trường Giang" },
        { id: 3, name: "Thế Hoàng" },
    ];

    const [requests, setRequests] = useState(mockRequests);
    const [consultantStaffList, setConsultantStaffList] = useState(mockConsultantStaffList);
    const [designStaffList, setDesignStaffList] = useState(mockDesignStaffList);
    const [constructorStaffList, setConstructorStaffList] = useState(mockConstructorStaffList);
    const [isStaffListOpen, setIsStaffListOpen] = useState(false);
    const [selectedRequestId, setSelectedRequestId] = useState(null);

    const statusOptions = ["Requested", "Consulting", "Designing", "Constructing", "Completed"];

    const handleAssignStaff = (requestId, staffName, role) => {
        setRequests(prevRequests =>
            prevRequests.map(request => {
                if (request.id === requestId) {
                    if (role === 'Consultant') {
                        return { ...request, assignedConsultant: staffName };
                    } else if (role === 'Designer') {
                        return { ...request, assignedDesigner: staffName };
                    } else if (role === 'Constructor') {
                        return { ...request, assignedConstructor: staffName };
                    }
                }
                return request;
            })
        );
        toast.success("Staff assigned successfully!");
    };

    const handleStatusChange = (requestId, newStatus) => {
        setRequests(prevRequests =>
            prevRequests.map(request =>
                request.id === requestId ? { ...request, status: newStatus } : request
            )
        );
        toast.success("Status updated successfully!");
    };

    const getStatusIcon = (status) => {
        switch (status) {
            case "Requested":
                return <i className="fas fa-clock text-warning"></i>; // Icon cho trạng thái Requested
            case "Consulting":
                return <i className="fas fa-spinner fa-spin text-info"></i>; // Icon cho trạng thái In Progress
            case "Designing":
                return <i class="fa-solid fa-pen fas text-info"></i>;
            case "Constructing":
                return <i class="fa-solid fa-paint-roller text-danger"></i>;
            case "Completed":
                return <i className="fas fa-check-circle text-success"></i>; // Icon cho trạng thái Completed
            default:
                return null;
        }
    };

    return (
        <div className="container mt-4">
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
            <h2 className="text-center" style={{ color: 'red' }}>Manage Requests</h2>
            <table className="table table-bordered">
                <thead className="table-dark">
                    <tr>
                        <th scope="col">Customer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Address</th>
                        <th scope="col">Assign Consultant</th>
                        <th scope="col">Assign Designer</th>
                        <th scope="col">Assign Constructor</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    {requests.map(request => (
                        <tr key={request.id}>
                            <td>{request.customerName}</td>
                            <td>{request.date}</td>
                            <td>{request.phone}</td>
                            <td>{request.address}</td>

                            {/** Consultant dropdown */}
                            <td>
                                <select
                                    className="form-select"
                                    value={request.assignedConsultant || ''}
                                    onChange={(e) => handleAssignStaff(request.id, e.target.value, 'Consultant')}
                                >
                                    <option value="" disabled>Assign Staff</option>
                                    {consultantStaffList.map(staff => (
                                        <option key={staff.id} value={staff.name}>
                                            {staff.name}
                                        </option>
                                    ))}
                                </select>
                            </td>

                            {/** Designer dropdown */}
                            <td>
                                <select
                                    className="form-select"
                                    value={request.assignedDesigner || ''}
                                    onChange={(e) => handleAssignStaff(request.id, e.target.value, 'Designer')}
                                >
                                    <option value="" disabled>Assign Staff</option>
                                    {designStaffList.map(staff => (
                                        <option key={staff.id} value={staff.name}>
                                            {staff.name}
                                        </option>
                                    ))}
                                </select>
                            </td>

                            {/** Constructor dropdown */}
                            <td>
                                <select
                                    className="form-select"
                                    value={request.assignedConstructor || ''}
                                    onChange={(e) => handleAssignStaff(request.id, e.target.value, 'Constructor')}
                                >
                                    <option value="" disabled>Assign Staff</option>
                                    {constructorStaffList.map(staff => (
                                        <option key={staff.id} value={staff.name}>
                                            {staff.name}
                                        </option>
                                    ))}
                                </select>
                            </td>

                            {/** Status dropdown */}
                            <td>
                                <div className="d-flex align-items-center">
                                    {getStatusIcon(request.status)} {/* Hiện biểu tượng trạng thái */}
                                    <select
                                        value={request.status}
                                        onChange={(e) => handleStatusChange(request.id, e.target.value)}
                                        className="form-select ms-2"
                                    >
                                        {statusOptions.map(status => (
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