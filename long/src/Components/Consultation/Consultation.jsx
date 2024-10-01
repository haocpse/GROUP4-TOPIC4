// import React, { useEffect, useState } from "react";
// import './Consultation.module.css';
// import axios from "axios";
// import { toast, ToastContainer } from "react-toastify";

// const Consultation = () => {
//     const [requests, setRequests] = useState([]);
//     const [staffList, setStaffList] = useState([]);
//     const [isStaffListOpen, setIsStaffListOpen] = useState(false);
//     const [selectedRequestId, setSelectedRequestId] = useState(null);

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

//     const handleAssignStaff = async (requestId, staffId, staffName) => {
//         try {
//             await axios.post('http://localhost:8080/assign-staff', {
//                 requestId,
//                 staffId,
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

//     return (
//         <div className="container mt-4">
//             <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
//             <h2 className="text-center">Manage Requests</h2>
//             <table className="table table-bordered">
//                 <thead>
//                     <tr>
//                         <th scope="col">Customer</th>
//                         <th scope="col">Date</th>
//                         <th scope="col">Phone</th>
//                         <th scope="col">Address</th>
//                         <th scope="col">Assign To</th>
//                         <th scope="col">Status</th>
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {requests.map(request => (
//                         <tr key={request.id}>
//                             <td>{request.customerName}</td>
//                             <td>{request.date}</td>
//                             <td>{request.phone}</td>
//                             <td>{request.address}</td>
//                             <td>
//                                 <div className="dropdown">
//                                     <button
//                                         className="btn btn-secondary dropdown-toggle"
//                                         type="button"
//                                         onClick={() => {
//                                             setIsStaffListOpen(prev => !prev);
//                                             setSelectedRequestId(request.id);
//                                         }}
//                                     >
//                                         {request.assignedStaff ? request.assignedStaff : 'Assign Staff'}
//                                     </button>
//                                     {isStaffListOpen && selectedRequestId === request.id && (
//                                         <ul className="dropdown-menu">
//                                             {staffList.map(staff => (
//                                                 <li key={staff.id}>
//                                                     <button onClick={() => handleAssignStaff(request.id, staff.id, staff.name)}>
//                                                         {staff.name}
//                                                     </button>
//                                                 </li>
//                                             ))}
//                                         </ul>
//                                     )}
//                                 </div>
//                             </td>
//                             <td>{request.status}</td>
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default Consultation;

import React, { useEffect, useState } from "react";
import './Consultation.css';
import { toast, ToastContainer } from "react-toastify";

const Consultation = () => {
    // Dữ liệu giả cho các yêu cầu và nhân viên
    const mockRequests = [
        { id: 1, customerName: "Nguyễn Văn A", date: "2024-10-01", phone: "0123456789", address: "123 Đường ABC", status: "Pending", assignedStaff: null },
        { id: 2, customerName: "Trần Thị B", date: "2024-10-02", phone: "0987654321", address: "456 Đường XYZ", status: "In Progress", assignedStaff: null },
    ];

    const mockStaffList = [
        { id: 1, name: "Khoa Nguyễn" },
        { id: 2, name: "Tú Đặng" },
        { id: 3, name: "Háo Phù" },
    ];

    const [requests, setRequests] = useState(mockRequests);
    const [staffList, setStaffList] = useState(mockStaffList);
    const [isStaffListOpen, setIsStaffListOpen] = useState(false);
    const [selectedRequestId, setSelectedRequestId] = useState(null);

    const handleAssignStaff = (requestId, staffId, staffName) => {
        // Gán nhân viên cho yêu cầu
        setRequests(prevRequests =>
            prevRequests.map(request =>
                request.id === requestId ? { ...request, assignedStaff: staffName } : request
            )
        );
        toast.success("Staff assigned successfully!");
        setIsStaffListOpen(false);
        setSelectedRequestId(null);
    };

    return (
        <div className="container mt-4">
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
            <h2 className="text-center">Manage Requests</h2>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th scope="col">Customer</th>
                        <th scope="col">Date</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Address</th>
                        <th scope="col">Assign To</th>
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
                            <td>
                                <div className="dropdown">
                                    <button
                                        className="btn btn-secondary dropdown-toggle"
                                        type="button"


                                        onClick={() => {
                                            setIsStaffListOpen(true);
                                            setSelectedRequestId(request.id);
                                        }}
                                    >
                                        {request.assignedStaff ? request.assignedStaff : 'Assign Staff'}
                                    </button >
                                    {isStaffListOpen && selectedRequestId === request.id && (
                                        <ul className="dropdown-menu menu-task">
                                            {staffList.map(staff => (
                                                <li key={staff.id}>
                                                    <button className="py-2 d-flex justify-content-center align-items-center"
                                                        style={{ backgroundColor: 'pink', width: '100%' }} 
                                                        onClick={() => handleAssignStaff(request.id, staff.id, staff.name)}>
                                                            
                                                        {staff.name}
                                                    </button>
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </td>
                            <td>{request.status}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Consultation;
