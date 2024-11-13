import React, { useEffect, useState } from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Profile.css"


const CustomerProfile = () => {
    const [customerInfo, setCustomerInfo] = useState(null);
    const navigate = useNavigate();


    const token = localStorage.getItem('token')
    const decode = jwtDecode(token)
    const accountId = decode.sub
    useEffect(() => {

        const fetchCustomerInfo = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/myInfo/${accountId}`, {
                    headers: {
                        'Authorization': `Bearer ${localStorage.getItem('token')}`,
                    }
                });
                setCustomerInfo(response.data.data)
                toast.success("Fetch successly ^^")
            }
            catch (error) {
                console.error('FAIL fecth info:', error);
                toast.error("Fail fetch custoemr info ^^");
            }

        }
        fetchCustomerInfo()
    }, []);

    const handleClickUpdate = () => {
        navigate(`/myInfo/${accountId}/update`);
    }
    const handleClickOrders = () => {
        navigate('/myInfo/orders');
    }

    return (
        <>
            <Navbar />
            <h1 className="text-center mb-4">Customer Profile</h1>
            <div className="container mb-5">
                {customerInfo ? (
                    <div className="row gutters">
                        <div className="col-xl-3 col-lg-3 col-md-12 col-sm-12 col-12">
                            <div className="card h-100">
                                <div className="card-body">
                                    <div className="account-settings">
                                        <div className="user-profile text-center">
                                            <h2 className="text-primary">Avatar</h2>
                                            <div className="user-avatar">
                                                <img src={customerInfo.avatarUrl} alt={customerInfo.firstName} className="img-fluid rounded-circle" />
                                            </div>
                                        </div>
                                        <div className="about mt-3">
                                            <h5 className="text-center">Customer</h5>

                                        </div>
                                        <div className="d-flex mt-5">
                                            <h3>
                                                Point:
                                            </h3>
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
                                    <div className="row gutters border-bottom">
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <h6 className="mb-2 text-primary mb-4" style={{ fontSize: '35px' }}>Personal Details:</h6>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div className="form-group d-flex">
                                                <h4 className="firstName">First Name: </h4>
                                                <h4 className="form-control-static ml-2 fw-lighter" id="firstName">{customerInfo.firstName}</h4>
                                            </div>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div className="form-group d-flex">
                                                <h4 className="lastName">Last Name: </h4>
                                                <h4 className="form-control-static ml-2 fw-lighter" id="lastName">{customerInfo.lastName}</h4>
                                            </div>
                                        </div>

                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div className="form-group d-flex">
                                                <h4 className="phone">Phone:</h4>
                                                <h4 className="form-control-static ml-2 fw-lighter" id="phone">{customerInfo.phone}</h4>
                                            </div>
                                        </div>


                                    </div>
                                    <div className="row gutters">
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <h6 className="mt-3 mb-2 text-primary mb-4" style={{ fontSize: '35px' }}>Address:</h6>
                                        </div>
                                        <div className="col-xl-6 col-lg-6 col-md-6 col-sm-6 col-12">
                                            <div className="form-group d-flex">
                                                <h4 className="street">Address: </h4>
                                                <h4 className="form-control-static ml-2 fw-lighter" id="street"> {customerInfo.address}</h4>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row gutters d-flex">
                                        <div className="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                                            <div className="text-right mb-2">
                                                <button type="button" className="btn btn-primary mr-3" onClick={handleClickUpdate}>
                                                    Update Information
                                                </button>
                                                <button type="button" className="btn btn-danger" onClick={handleClickOrders}>
                                                    View Orders
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                ) : (
                    <p>Please Wait</p>
                )}
            </div >
            <Footer />
        </>
    )
}

export default CustomerProfile;


