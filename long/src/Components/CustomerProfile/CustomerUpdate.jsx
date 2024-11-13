import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import { jwtDecode } from "jwt-decode";


const CustomerUpdate = () => {
    const { id } = useParams();
    const [customerInfo, setCustomerInfo] = useState({});
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const navigate = useNavigate();


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

    const handleUpdate = async () => {
        const token = localStorage.getItem('token')
        const decode = jwtDecode(token)
        const accountId = decode.sub
        try {
            await axios.put(`http://localhost:8080/myInfo/${accountId}`, {
                firstName: firstName || customerInfo.firstName,
                lastName: lastName || customerInfo.lastName,
                phone: phone || customerInfo.phone,
                address: address,
            }, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            });

            toast.success("Update succesfully ^^");
        } catch (error) {
            console.error("FAIL UPDATE", error);
            toast.error("Fail to update ! ^^");
        }

    };

    return (
        <>
            <Navbar />

            <h1 className="text-center mb-4">Customer Profile</h1>
            <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />

            <div className="container mb-5">
                <div className="row gutters">
                    <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                        <div className="card h-100">
                            <div className="card-body">
                                <div className="account-settings">
                                    <div className="user-profile text-center">
                                        <h2 className="text-primary">AVATAR</h2>
                                        <div className="user-avatar">
                                            <img src="https://bootdey.com/img/Content/avatar/avatar7.png" alt="Customer" class="rounded-circle" width="150" />
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
                                <h6 className="mb-2 text-primary mb-4" style={{ fontSize: '35px' }}>Personal Details:</h6>
                                <div className="row gutters">
                                    <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                        <div className="form-group">
                                            <label>First Name:</label>
                                            <input
                                                type="text"
                                                name="firstName"
                                                value={firstName || customerInfo.firstName || ""}
                                                onChange={(event) => setFirstName(event.target.value)}
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
                                                value={lastName || customerInfo.lastName || ""}
                                                onChange={(event) => setLastName(event.target.value)}
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
                                                value={phone || customerInfo.phone || ""}
                                                onChange={(event) => setPhone(event.target.value)}
                                                className="form-control"
                                                placeholder="Enter phone number"
                                            />
                                        </div>
                                    </div>

                                </div>
                            </div>
                            <h6 className="mt-3 mb-2 ml-2 text-primary" style={{ fontSize: '35px' }}>Address:</h6>
                            <div className="form-group ml-2">
                                <label>Address:</label>
                                <input
                                    type="text"
                                    name="address"
                                    value={address || customerInfo.address || ""}
                                    onChange={(event) => setAddress(event.target.value)}
                                    className="form-control"
                                    placeholder="Enter address"
                                />
                            </div>
                            <div className="d-flex justify-content-end mt-4 mb-2">
                                <div className="text-right mt-3 mb-2">
                                    <button type="button" className="btn btn-primary mr-3" onClick={handleUpdate}>
                                        Update
                                    </button>
                                </div>
                                <div className="text-right mt-3 mb-2">
                                    <button className="btn btn-secondary mr-3" onClick={() => navigate(-1)}>Go Back</button>
                                </div>
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




