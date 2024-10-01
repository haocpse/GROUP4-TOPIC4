// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast, ToastContainer } from "react-toastify";
// import Navbar from "../Navbar/Navbar";

// const ConstructionOrder = () => {

//     const [constructionOrders, setConstructionOrders] = useState([]);
//     const navigate = useNavigate();

//     const fetchOrder = async () => {

//         try {
//             const response = await axios.get('http://localhost:8080/construction-orders');
//             setConstructionOrders(response.data);
//         } catch (error) {
//             console.error('Error fetching order list');
//             toast.error('Failed to load construction orders');
//         }
//     };

//     useEffect(() => {
//         fetchOrder();
//     }, []);

//     const handleViewDetails = (constructionOrderId) => {
//         navigate(`/construction-progress/${constructionOrderId}`);
//     }




//     return (
//         <>
//             <Navbar />
//             <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
//             <div className="container mt-4">
//                 <div className="text-center" style={{ color: 'blue' }}>
//                     <h2>Construction Orders</h2>
//                 </div>
//                 <table className="table table-bordered">
//                     <thead>
//                         <tr>
//                             <th>Construction Order ID</th>
//                             <th>Actions</th>
//                         </tr>
//                     </thead>
//                     <tbody>
//                         {constructionOrders.length === 0 ? (
//                             <tr>
//                                 <td colSpan="2" className="text-center">No construction orders available.</td>
//                             </tr>
//                         ) : (
//                             constructionOrders.map(order => (
//                                 <tr key={order.constructionOrderId}>
//                                     <td>{order.constructionOrderId}</td>
//                                     <td>
//                                         <button onClick={() => handleViewDetails(order.constructionOrderId)} className="btn btn-primary">
//                                             View Detail
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
// }

// export default ConstructionOrder;

import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../Navbar/Navbar";

const ConstructionOrder = () => {

    // Sử dụng mock data thay vì lấy dữ liệu từ API
    const [constructionOrders, setConstructionOrders] = useState([]);
    const navigate = useNavigate();

    // Mock data cho các construction orders
    const mockOrders = [
        { constructionOrderId: "CO001", customerName: "Khoa Nguyen" },
        { constructionOrderId: "CO002", customerName: "Phu Hao" },
        { constructionOrderId: "CO003", customerName: "Hoang Long" }
    ];

    // Giả lập việc lấy dữ liệu từ API bằng cách set mock data
    useEffect(() => {
        // Thay vì gọi API, sử dụng mock data
        setConstructionOrders(mockOrders);
    }, []);

    const handleViewDetails = (constructionOrderId) => {
        navigate(`/construction-progress/${constructionOrderId}`);
    };

    return (
        <>
            <Navbar />
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div className="container mt-4">
                <div className="text-center" style={{ color: 'blue' }}>
                    <h2>Construction Orders</h2>
                </div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Construction Order ID</th>
                            <th>Customer Name</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {constructionOrders.length === 0 ? (
                            <tr>
                                <td colSpan="2" className="text-center">No construction orders available.</td>
                            </tr>
                        ) : (
                            constructionOrders.map(order => (
                                <tr key={order.constructionOrderId}>
                                    <td>{order.constructionOrderId}</td>
                                    <td>{order.customerName}</td>
                                    <td>
                                        <button onClick={() => handleViewDetails(order.constructionOrderId)} className="btn btn-primary">
                                            View Detail
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
}

export default ConstructionOrder;
