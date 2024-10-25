import axios from "axios";
import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const formatCurrency = (value) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(value).replace('₫', '').trim();
};

const ConstructionMaintenance = () => {

    const [maintenanceOrders, setMaintenanceOrders] = useState([]);
    const [totalPrice, setTotalPrice] = useState({});
    useEffect(() => {
        const fetchOrder = async () => {

            try {
                const response = await axios.get('http://localhost:8080/maintenance/ownedTasks', {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`, // Attach token
                    }
                });
                setMaintenanceOrders(response.data.data);
            } catch (error) {
                console.error('Fail fetch order list! ^^', error);

                toast.error('Failed to load construction orders! ^^');
            }
        }; fetchOrder();
    }, []);


    const handlePriceChange = (maintenanceOrderId, value) => {
        // setTotalPrice(prevPrice => ({ ...prevPrice, [maintenanceOrderId]: value }));

        const valueVND = value.replace(/\D/g, '');
        setTotalPrice(prevPrice => ({ ...prevPrice, [maintenanceOrderId]: valueVND }));
    }



    const handleSubmit = async (maintenanceOrderId) => {
        try {
            const price = totalPrice[maintenanceOrderId];

            if (price === undefined) {
                toast.error("Please enter price !!!");
                return;
            }

            const response = await axios.post('http://localhost:8080/maintenance/totalPrice', {
                maintenanceOrderId,
                totalPrice: Number(price)
            },
                {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
            console.log(response.data);
            toast.success("Successfully!");
        } catch (error) {
            toast.error("Error when sụp mít !");
        }
    };

    return (
        <>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
            <div className="container mt-4">
                <div className="text-center" style={{ color: 'black' }}>
                    <h2>Constructor - Maintenance Orders</h2>
                </div>
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Maintenance Order ID</th>
                            <th>Customer Name</th>
                            <th>Start Date</th>
                            <th>End Date</th>
                            <th>Total (VND)</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {maintenanceOrders.length === 0 ? (
                            <tr>
                                <td colSpan="4" className="text-center">No construction orders available.</td>
                            </tr>
                        ) : (
                            maintenanceOrders.map(order => (
                                <tr key={order.maintenanceOrderId}>
                                    <td>{order.maintenanceOrderId}</td>
                                    <td>{order.customerName}</td>
                                    <td>{order.startDate}</td>
                                    <td>{order.endDate}</td>

                                    {/* total */}
                                    <td>
                                        {/* <input type="number"
                                            value={totalPrice[order.maintenanceOrderId] || ''}
                                            onChange={(e) => handlePriceChange(order.maintenanceOrderId, e.target.value)}
                                            placeholder="Enter Price" /> */}
                                        <input
                                            type="text"
                                            value={totalPrice[order.maintenanceOrderId] ? formatCurrency(totalPrice[order.maintenanceOrderId]) : ''}
                                            onChange={(e) => handlePriceChange(order.maintenanceOrderId, e.target.value)}
                                            placeholder="Enter Price"
                                        />

                                    </td>

                                    <td>
                                        <button onClick={() => handleSubmit(order.maintenanceOrderId)} className="btn btn-danger">
                                            Submit
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

export default ConstructionMaintenance;

