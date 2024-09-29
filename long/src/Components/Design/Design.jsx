import React,{ useEffect, useState } from "react";
import './Design.css';
import logo from '../Assests/logo-navbar.png';
import axios from "axios";

const Design = () => {
    const [request, setRequset] = useState([]);
    const [staffList, setStaffList] = useState([]); // tao ra 1 list de luu nhan vien
    const [isStaffListOpen, setIsStaffListOpen] = useState(false); // dong mo cai list
    const [selectedRequest, setSelectedRequest] = useState(null); // gan rq dc chon


    // fetch du lieu api neee ^^
    const fetchRequest = async () => {
        try {
            const respone = await axios.get('http://localhost:8080/manage/design');
            setRequset(respone.data); // luu du lieu vao state
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    }


    // fetch du lieu staff
    const fetchStaff = async () => {
        try {
            const respone = await axios.get('http://localhost:8080/staff');
            setStaffList(respone.data);
        } catch (error) {
            console.error("Error fetching staff:", error);
        }
    }
    // su dung khi component dc mount
    useEffect(() => {
        fetchRequest(); // Gọi hàm fetchRequests để lấy dữ liệu khi component được hiển thị
    }, []);  // Mảng rỗng [] nghĩa là hàm chỉ chạy một lần khi component được mount

    // Gọi fetchStaff khi modal mở
    useEffect(() => {
        if (isStaffListOpen === true) {
            fetchStaff();
        }
    }, [isStaffListOpen]);

    const handleAssignStaffClick = (request) => {
        setSelectedRequest(request);
        setIsStaffListOpen(true);
    };

    const handleSelectedStaff = async (staffId) => {
        if (selectedRequest) {
            try {
                await axios.post('http://localhost:8080/manage/assign', {
                    requestId: selectedRequest.id,
                    staffId: staffId
                });
            } catch (error) {
                console.error("Error assigning staff:", error);
            }
        }
        setIsStaffListOpen(false); // Đóng lít 
    }




    return (
        <div className="container">
            <div className="content">
                <div className="header">
                    <div />
                    <div className="manager">MANAGER #1</div>
                    <img src={logo} alt="Logo" className="logo" />
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Request ID</th>
                            <th>Customer</th>
                            <th>Date</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>Assign To</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                    {request.length > 0 ? (
                        request.map((request, index) => ( // duyet qua tung yeu cau
                            <tr key={request.id}> {/* new 1 dong moi roi su dung rq id lam key ! */}

                                <td>{index}</td>
                                <td>{request.customerName}</td>
                                <td>{request.startDate}</td>
                                <td>{request.phone}</td>
                                <td>{request.address}</td>
                                <td>
                                    <button className="assign-button" onClick={() => handleAssignStaffClick(request)} >Assign</button>
                                </td>
                                <td>{request.status}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="7">No requests found</td>
                        </tr>
                    )}
                </tbody>
            </table>
            {isStaffListOpen && (
                <div className="list">
                    <div className="list-content">
                        <h2>Select Staff</h2>
                        <ul>
                            {staffList.map(staff => (
                                <li key={staff.staffId} onClick={() => handleSelectedStaff(staff.staffId)}>
                                    {staff.staffName}
                                </li>
                            )
                            )}
                        </ul>
                        <button onClick={() => setIsStaffListOpen(false)} >close</button>
                    </div>
                </div>
            )}
        </div>
            </div>
        
    );
};

export default Design;
