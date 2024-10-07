import React, { useEffect, useState } from "react";
import './Consultation.module.css';
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Consultation = () => {
    const [requests, setRequests] = useState([]);
    const [consultantList, setConsultantList] = useState([]);
    const [designerList, setDesignerList] = useState([]);
    const [constructorList, setConstructorList] = useState([]);
    const [selectedConsultantId, setSelectedConsultantId] = useState(null);
    const [selectedDesignerId, setSelectedDesignerId] = useState(null);
    const [selectedConstructorId, setSelectedConstructorId] = useState(null);
    const statusOptions = ["Requested", "Consulting", "Designing", "Constructing", "Completed"]; // Các trạng thái có thể chọn


    // lay du lieu request tu backend
    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await axios.get('http://localhost:8080/manager/requests');
                setRequests(response.data);
            } catch (error) {
                console.error('Error fetching requests:', error);
                toast.error('Failed to load requests. ^^');
            }
        };
        fetchRequests();
    }, []);

    // lay du lieu consultant staff tu backend
    const fetchConsultants = async () => {
        try {
            const response = await axios.get('http://localhost:8080/manager/requests/consultants');
            setConsultantList(response.data);
        } catch (error) {
            console.error('Error fetching consultants:', error);
            toast.error('Failed to load consultants. ^^');
        }
    };

    // lay du lieu desginer staff tu backend
    const fetchDesigners = async () => {
        try {
            const response = await axios.get('http://localhost:8080/manager/requests/designers');
            setDesignerList(response.data);
        } catch (error) {
            console.error('Error fetching designers:', error);
            toast.error('Failed to load designers. Please try again later.');
        }
    };

    // lay du lieu constructor staff tu backend
    const fetchConstructors = async () => {
        try {
            const response = await axios.get('http://localhost:8080/manager/requests/constructors');
            setConstructorList(response.data);
        } catch (error) {
            console.error('Error fetching constructors:', error);
            toast.error('Failed to load constructors. ^^');
        }
    };

    //handle staff assignment
    const handleAssignStaff = async (constructionOrderId, consultant, designerLeader, constructorLeader, staffName, staffType) => {
        try {
            // Xác định trạng thái mới dựa trên loại nhân viên
            let newStatus;
            switch (staffType) {
                case "consultant":
                    newStatus = "consulting";
                    break;
                case "designer":
                    newStatus = "designing";
                    break;
                case "constructor":
                    newStatus = "constructing";
                    break;
                default:
                    newStatus = "requested"; // Trạng thái mặc định
                    break;
            }

            await axios.put('http://localhost:8080/manager/requests', {
                constructionOrderId,
                consultant,
                designerLeader,
                constructorLeader,
                status: newStatus
            });
            setRequests(prevRequests =>
                prevRequests.map(request =>
                    request.id === constructionOrderId
                        ? {
                            ...request,
                            status: newStatus,
                            consultant: staffType === 'consultant' ? staffName : request.consultant,
                            designerLeader: staffType === 'designer' ? staffName : request.designerLeader,
                            constructorLeader: staffType === 'constructor' ? staffName : request.constructorLeader
                        }
                        : request
                )
            );

            toast.success("Assign staff and status successfully!");
        } catch (error) {
            console.error('Error assigning staff:', error);
            toast.error("Failed to assign staff or status. Please try again.");
        }
    };

    return (
        <div className="container mt-4">
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
            <h2 className="text-center">Admin - Manage Requests</h2>

            {requests.length === 0 ? (
                <p>Your system has no Request ^^ !</p>
            ) : (
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th scope="col">Customer</th>
                            <th scope="col">Phone</th>
                            <th scope="col">Address</th>
                            <th scope="col">Start Date</th>
                            <th scope="col">End Date</th>
                            <th scope="col">Total Price</th>
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
                                <td>{request.phone}</td>
                                <td>{request.address}</td>
                                <td>{request.startDate}</td>
                                <td>{request.endDate}</td>
                                <td>{request.totalPrice}</td>
                                <td>
                                    <button onClick={() => {
                                        fetchConsultants(); // Lấy danh sách consultant
                                        setSelectedConsultantId(request.id);
                                    }}>
                                        Assign Consultant
                                    </button>
                                    <select
                                        className="form-select mt-2"
                                        value={request.assignedConsultant || ""}
                                        onChange={(e) => {
                                            const selectedStaffId = e.target.value;
                                            const selectedStaff = consultantList.find(consultant => consultant.id === parseInt(selectedStaffId));
                                            if (selectedStaff) {
                                                handleAssignStaff(request.id, selectedStaff.id, selectedStaff.name, "consultant");
                                            }
                                        }}
                                    >
                                        <option value="" disabled>Select Consultant</option>
                                        {consultantList.map(staff => (
                                            <option key={staff.id} value={staff.id}>
                                                {staff.name}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <button onClick={() => {
                                        fetchDesigners(); // Lấy danh sách designer
                                        setSelectedDesignerId(request.id);
                                    }}>
                                        Assign Designer
                                    </button>
                                    <select
                                        className="form-select mt-2"
                                        value={request.assignedDesigner || ""}
                                        onChange={(e) => {
                                            const selectedStaffId = e.target.value;
                                            const selectedStaff = designerList.find(designerLeader => designerLeader.id === parseInt(selectedStaffId));
                                            if (selectedStaff) {
                                                handleAssignStaff(request.id, selectedStaff.id, selectedStaff.name, "designer");
                                            }
                                        }}
                                    >
                                        <option value="" disabled>Select Designer</option>
                                        {designerList.map(staff => (
                                            <option key={staff.id} value={staff.id}>
                                                {staff.name}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <button onClick={() => {
                                        fetchConstructors(); // Lấy danh sách constructor
                                        setSelectedConstructorId(request.id);
                                    }}>
                                        Assign Constructor
                                    </button>
                                    <select
                                        className="form-select mt-2"
                                        value={request.assignedConstructor || ""}
                                        onChange={(e) => {
                                            const selectedStaffId = e.target.value;
                                            const selectedStaff = constructorList.find(constructorLeader => constructorLeader.id === parseInt(selectedStaffId));
                                            if (selectedStaff) {
                                                handleAssignStaff(request.id, selectedStaff.id, selectedStaff.name, "constructor");
                                            }
                                        }}
                                    >
                                        <option value="" disabled>Select Constructor</option>
                                        {constructorList.map(staff => (
                                            <option key={staff.id} value={staff.id}>
                                                {staff.name}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                                <td>
                                    <select
                                        value={request.status}
                                        onChange={(e) => handleAssignStaff(request.id, e.target.value)}
                                        className="form-select"
                                    >
                                        {statusOptions.map(status => (
                                            <option key={status} value={status}>
                                                {status}
                                            </option>
                                        ))}
                                    </select>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Consultation;


