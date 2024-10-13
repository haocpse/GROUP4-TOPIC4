// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";

// const ApproveDesign = () => {

//     const [designs, setDesigns] = useState([]);
//     const navigate = useNavigate();


//     // lay danh sach cac design can up' det^'
//     const fetchDesigns = async () => {
//         try {
//             const response = await axios.get('http://localhost:8080/manage/designs');
//             setDesigns(response.data.data);
//         } catch (error) {
//             console.error("Fail to fetch designs! ^^", error);
//             toast.error("Fail fetching Designs! ^^")
//         }
//     };
//     const handleViewDetails = (id) => {
//         navigate(`/manage/designs/${id}`); // state dc dùng để chứa dữ liệu
//     }


//     useEffect(() => {
//         fetchDesigns();
//     }, []);

//     return (
//         <>
//             <ToastContainer position="top-right" autoClose={5000} />
//             <div className="container mt-4">
//                 <h2 className="text-center" style={{ color: 'black' }}>Approve Designs</h2>
//                 <table className="table table-bordered mt-4">
//                     <thead>
//                         <tr>
//                             <th>Design ID</th>
//                             <th>Customer Name</th>
//                             <th>Phone</th>
//                             <th>Address</th>
//                             <th>View Details</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {designs.length === 0 ? (
//                             <tr>
//                                 <td colSpan="4" className="text-center">No Design to approve.</td>
//                             </tr>
//                         ) : (
//                             designs.map(design => (
//                                 <tr key={design.id}>
//                                     <td>{design.id}</td>
//                                     <td>{design.customerName}</td>
//                                     <td>{design.phone}</td>
//                                     <td>{design.address}</td>
//                                     <td>
//                                         <button
//                                             className="btn btn-primary"
//                                             onClick={() => handleViewDetails(design.id)}
//                                         >
//                                             View
//                                         </button>
//                                     </td>

//                                 </tr>
//                             ))
//                         )}
//                     </tbody>
//                 </table>
//             </div>
//         </>
//     );
// };

// export default ApproveDesign;
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

// Mock data
const mockDesigns = [
    {
        id: 1,
        customerName: "Nguyễn Văn A",
        phone: "0123456789",
        address: "123 Đường ABC, Quận 1, TP.HCM"
    },
    {
        id: 2,
        customerName: "Trần Thị B",
        phone: "0987654321",
        address: "456 Đường XYZ, Quận 2, TP.HCM"
    },
    {
        id: 3,
        customerName: "Lê Văn C",
        phone: "0112233445",
        address: "789 Đường QWE, Quận 3, TP.HCM"
    },
    {
        id: 4,
        customerName: "Phạm Thị D",
        phone: "0988776655",
        address: "159 Đường RST, Quận 4, TP.HCM"
    },
    {
        id: 5,
        customerName: "Huỳnh Văn E",
        phone: "0123456780",
        address: "753 Đường UIO, Quận 5, TP.HCM"
    },
];

const ApproveDesign = () => {
    const [designs, setDesigns] = useState([]);
    const navigate = useNavigate();

    // Sử dụng mock data
    const fetchDesigns = async () => {
        // Thay vì gọi API, sử dụng mock data
        setDesigns(mockDesigns);
    };

    const handleViewDetails = (id) => {
        navigate(`/manage/designs/${id}`);
    };

    useEffect(() => {
        fetchDesigns();
    }, []);

    return (
        <>
            <ToastContainer position="top-right" autoClose={5000} />
            <div className="container mt-4">
                <h2 className="text-center" style={{ color: 'black' }}>Approve Designs</h2>
                <table className="table table-bordered mt-4">
                    <thead>
                        <tr>
                            <th>Design ID</th>
                            <th>Customer Name</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>View Details</th>
                        </tr>
                    </thead>
                    <tbody>
                        {designs.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center">No Design to approve.</td>
                            </tr>
                        ) : (
                            designs.map(design => (
                                <tr key={design.id}>
                                    <td>{design.id}</td>
                                    <td>{design.customerName}</td>
                                    <td>{design.phone}</td>
                                    <td>{design.address}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleViewDetails(design.id)}
                                        >
                                            View
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
