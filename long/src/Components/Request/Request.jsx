import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";

const Request = () => {
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
    const handleAssignStaff = async (constructionOrderId, staffId, staffName, staffType) => {
        try {
            // xac dinh trang thai moi dua tren loai nhan vien
            let newStatus;
            switch (staffType) {
                case "consultant":
                    newStatus = "consulting";
                    break;
                case "designerLeader":
                    newStatus = "designing";
                    break;
                case "constructorLeader":
                    newStatus = "constructing";
                    break;
                default:
                    newStatus = "requested"; // Trạng thái mặc định
                    break;
            }

            await axios.put('http://localhost:8080/manager/requests', {
                constructionOrderId,
                consultant: staffType === 'consultant' ? staffId : null,
                designerLeader: staffType === 'designerLeader' ? staffId : null,
                constructorLeader: staffType === 'constructorLeader' ? staffId : null,
                status: newStatus
            });
            setRequests(prevRequests =>
                prevRequests.map(request =>
                    request.id === constructionOrderId
                        ? {
                            ...request,
                            status: newStatus,
                            consultant: staffType === 'consultant' ? staffName : request.assignedConsultant,
                            designerLeader: staffType === 'designerLeader' ? staffName : request.assignedDesigner,
                            constructorLeader: staffType === 'constructorLeader' ? staffName : request.assignedConstructor
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

    //handle status change
    const handleStatusChange = async (statusTab) => {
        try {
            const respone = await axios.get(`http://localhost:8080/manager/requests/${statusTab}`);
            setRequests(respone.data)
        } catch (error) {
            console.error('Error fetching Status:', error);
            toast.error('Failed to load Status. ^^');
        }

    }

    return (
        <div className="container mt-4">
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
            <h2 className="text-center">Admin - Manage Requests</h2>
            <div>
                <nav className="nav justify-content-center mb-2">
                    <div className="nav-item">
                        <button className="btn btn-outline-primary mx-1" onClick={() => handleStatusChange("all")}>All</button>
                    </div>
                    <div className="nav-item">
                        <button className="btn btn-outline-primary mx-1" onClick={() => handleStatusChange("requested")}>Requested</button>
                    </div>
                    <div className="nav-item">
                        <button className="btn btn-outline-primary mx-1" onClick={() => handleStatusChange("consulting")}>Consulting</button>
                    </div>
                    <div className="nav-item">
                        <button className="btn btn-outline-primary mx-1" onClick={() => handleStatusChange("designing")}>Designing</button>
                    </div>
                    <div className="nav-item">
                        <button className="btn btn-outline-primary mx-1" onClick={() => handleStatusChange("constructing")}>Constructing</button>
                    </div>
                    <div className="nav-item">
                        <button className="btn btn-outline-primary mx-1" onClick={() => handleStatusChange("completed")}>Complete</button>
                    </div>
                </nav>
            </div>
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
                    {requests.length === 0 ? (
                        <tr>
                            <td colSpan="10" className="text-center">
                                Your system has no Request ^^ !
                            </td>
                        </tr>
                    ) : (
                        requests.map(request => (
                            <tr key={request.id}>
                                <td>{request.customerName}</td>
                                <td>{request.phone}</td>
                                <td>{request.address}</td>
                                <td>{request.startDate}</td>
                                <td>{request.endDate}</td>
                                <td>{request.totalPrice}</td>
                                <td>
                                    <button onClick={() => {
                                        fetchConsultants();
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
                                        fetchDesigners();
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
                                                handleAssignStaff(request.id, selectedStaff.id, selectedStaff.name, "designerLeader");
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
                                        fetchConstructors();
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
                                                handleAssignStaff(request.id, selectedStaff.id, selectedStaff.name, "constructorLeader");
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
                                <td>{request.status}</td>
                            </tr>
                        ))
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default Request;

