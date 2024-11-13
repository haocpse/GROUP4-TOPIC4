import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { jwtDecode } from "jwt-decode";


const CustomerUpdate = () => {
    const { id } = useParams();
    const [customerInfo, setCustomerInfo] = useState({
        firstName: '',
        lastName: '',
        phone: '',
        address: ''
    });

    useEffect(() => {
        const fetchCustomerInfo = async () => {
            const token = localStorage.getItem('token')
            const decode = jwtDecode(token)
            const accountId = decode.sub
            try {
                const response = await axios.get(`http://localhost:8080/myInfo/${accountId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                setCustomerInfo(response.data.data)
                toast.success("fecth INFOMATION SUCCCESS ^^")

            } catch (error) {
                console.error('FAIL fecth info:', error);
                toast.error("FAIL TO FETCH ^^")
            }
        }
        fetchCustomerInfo()
    }, [id])


    const handleChange = (e) => {
        const { name, value } = e.target;
        setCustomerInfo((prevInfo) => ({
            ...prevInfo,
            [name]: value
        }));
    };


    const handleUpdate = async () => {
        const token = localStorage.getItem('token')
        const decode = jwtDecode(token)
        const accountId = decode.sub
        try {
            await axios.put(`http://localhost:8080/myInfo/${accountId}`, {
                customerInfo
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });

            toast.success("Update succesfully ^^");
            window.location.reload();

        } catch (error) {
            console.error("FAIL UPDATE", error);
            toast.error("Fail to update ! ^^");
        }

    };

    return (
        <>
            <Navbar />

            <h1 className="text-center mb-4">Customer Profile</h1>
            <div className="container mb-5">
                <div className="row gutters">
                    <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="account-settings">
                                    <div className="user-profile text-center">
                                        <h2 className="text-primary">AVATAR</h2>
                                        <div className="user-avatar">
                                            <img src={customerInfo.avatarUrl} alt={customerInfo.firstName} className="img-fluid rounded-circle" />
                                        </div>
                                    </div>
                                    <div className="about mt-3">
                                        <h5 className="text-center">Customer</h5>
                                    </div>
                                    <div className="d-flex mt-5">
                                        <h3>Points:</h3>
                                        <h3 className="ml-2 mr-2"> {customerInfo.point}</h3>
                                        <i className="fa-solid fa-star shake" style={{ color: 'red', fontSize: '30px' }}></i>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-9 col-lg-9 col-md-12 col-sm-12 col-12">
                        <div className="card h-100">
                            <div className="card-body">
                                <h6 className="mb-2 text-primary mb-4" style={{ fontSize: '40px' }}>Personal Details:</h6>
                                <div className="row gutters">
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label>First Name:</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={customerInfo.firstName}
                                                onChange={handleChange}
                                                className="form-control"
                                                placeholder="Enter first name"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label>Last Name:</label>
                                            <input
                                                type="text"
                                                name="lastName"
                                                value={customerInfo.lastName}
                                                onChange={handleChange}
                                                className="form-control"
                                                placeholder="Enter last name"
                                            />
                                        </div>
                                    </div>
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label>Phone:</label>
                                            <input
                                                type="text"
                                                name="phone"
                                                value={customerInfo.phone}
                                                onChange={handleChange}
                                                className="form-control"
                                                placeholder="Enter phone number"
                                            />
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                            <h6 className="mt-3 mb-2 text-primary" style={{ fontSize: '40px' }}>Address:</h6>
                            <div className="form-group">
                                <label>Address:</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={customerInfo.address}
                                    onChange={handleChange}
                                    className="form-control"
                                    placeholder="Enter address"
                                />
                            </div>
                            <div className="text-right mt-4">
                                <button type="button" className="btn btn-primary mr-3" onClick={handleUpdate}>
                                    Update
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default CustomerUpdate;




