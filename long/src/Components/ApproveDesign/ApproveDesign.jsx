import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const ApproveDesign = () => {

    const [designs, setDesigns] = useState([]);
    const navigate = useNavigate();


    // lay danh sach cac design can up' det^'
    const fetchDesigns = async () => {
        try {
            const response = await axios.get('http://localhost:8080/manage/designs');
            setDesigns(response.data);
        } catch (error) {
            console.error("Fail to fetch designs! ^^", error);
            toast.error("Fail fetching Designs! ^^")
        }
    };
    const handleViewDetails = (design) => {
        navigate(`/manage/designs/${design.designId}`, { state: { design } }); // state dc dùng để chứa dữ liệu
    }


    useEffect(() => {
        fetchDesigns();
    }, []);

    return (
        <>
            <ToastContainer position="top-right" autoClose={5000} />
            <div className="container mt-4">
                <h2 className="text-center" style={{ color: 'black' }}>Admin - Approve Designs</h2>
                <table className="table table-bordered mt-4">
                    <thead>
                        <tr>
                            <th>Design ID</th>
                            <th>Construction Order ID</th>
                            <th>Customer Name</th>
                            <th>Phone</th>
                            <th>Address</th>
                            <th>View Details</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {designs.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center">No Design to approve.</td>
                            </tr>
                        ) : (
                            designs.map(design => (
                                <tr key={design.designId}>
                                    <td>{design.designId}</td>
                                    <td>{design.constructionOrderId}</td>
                                    <td>{design.customerName}</td>
                                    <td>{design.phone}</td>
                                    <td>{design.address}</td>
                                    <td>
                                        <button
                                            className="btn btn-primary"
                                            onClick={() => handleViewDetails(design)}
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

// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";

// const ApproveDesign = () => {
//     const [designs, setDesigns] = useState([]);
//     const navigate = useNavigate();

//     // Dữ liệu giả cho testing
//     const mockDesigns = [
//         {
//             designId: "D001",
//             constructionOrderId: "CO001",
//             customerName: "Alice",
//             phone: "0123456789",
//             address: "123 Main St, City A"
//         },
//         {
//             designId: "D002",
//             constructionOrderId: "CO002",
//             customerName: "Bob",
//             phone: "9876543210",
//             address: "456 Side St, City B"
//         },
//         {
//             designId: "D003",
//             constructionOrderId: "CO003",
//             customerName: "Charlie",
//             phone: "1112223333",
//             address: "789 Another St, City C"
//         }
//     ];

//     // Hàm để lấy danh sách thiết kế
//     const fetchDesigns = () => {
//         // Thay thế cuộc gọi API bằng dữ liệu giả
//         setDesigns(mockDesigns);
//     };

//     const handleViewDetails = (design) => {
//         navigate(`/manage/designs/${design.designId}`, { state: { design } });
//     };

//     useEffect(() => {
//         fetchDesigns(); // Gọi hàm để lấy dữ liệu
//     }, []);

//     return (
//         <>
//             <ToastContainer position="top-right" autoClose={5000} />
//             <div className="container mt-4">
//                 <h2 className="text-center" style={{ color: 'black' }}>Admin - Approve Designs</h2>
//                 <table className="table table-bordered mt-4">
//                     <thead>
//                         <tr>
//                             <th>Design ID</th>
//                             <th>Construction Order ID</th>
//                             <th>Customer Name</th>
//                             <th>Phone</th>
//                             <th>Address</th>
//                             <th>Designer Leader Name</th>
//                             <th>View Details</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {designs.length === 0 ? (
//                             <tr>
//                                 <td colSpan="6" className="text-center">No Design to approve.</td>
//                             </tr>
//                         ) : (
//                             designs.map(design => (
//                                 <tr key={design.designId}>
//                                     <td>{design.designId}</td>
//                                     <td>{design.constructionOrderId}</td>
//                                     <td>{design.customerName}</td>
//                                     <td>{design.phone}</td>
//                                     <td>{design.address}</td>
//                                     <td>{design.designerLeaderName}</td>
//                                     <td>
//                                         <button
//                                             className="btn btn-primary"
//                                             onClick={() => handleViewDetails(design)}
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

