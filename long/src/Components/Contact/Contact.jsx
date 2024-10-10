import React, { useState } from 'react';
import './Contact.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import logo from '../Assests/logo-navbar.png'
import axios from 'axios';

const Contact = () => {
    const [service, setService] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [customerRequest, setCustomerRequest] = useState('');
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');


    const handleSubmit = async (event) => {
        event.preventDefault(); // ngan chan reload
        setError('');
        setSubmitted(false);

        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(phone)) {
            setError('Invalid phone number. Please enter a 10-digit number.');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/contactUs', {
                service: service,
                firstName: firstName,
                lastName: lastName,
                address: address,
                phone: phone,
                customerRequest: customerRequest
            });
            console.log(response.data);

            if (response.status === 200) {
                setSubmitted(true);
            }

        } catch (error) {
            setError('FAIL, please try again !!',error);
            console.error(error);
        }

    };
    return (
        <>
            <Navbar />
            <div className="container mb-5">
                <h1 className="text-center my-4" style={{ color: 'red' }}>Contact us</h1>
                <div className="row">
                    <div className="col-md-6">
                        {submitted ? (
                            <div className="notification alert-success">
                                <div className="success-icon">
                                    <i className="fa-solid fa-check"></i>
                                </div>
                                <div className="success-text">
                                    SUBMIT SUCCESSFULLY !
                                </div>
                            </div>
                        ) : (
                            <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-lg">
                                {error && <div className="notification-error alert-danger">{error}</div>}

                                <div className="text-center label-upload">
                                    <label> Contact Form </label>
                                </div>

                                <div className="form-group mb-6">
                                    <label>Select Service</label>
                                    <select
                                        name="service"
                                        className="form-control"
                                        value={service}
                                        onChange={(e) => setService(e.target.value)}
                                        required
                                    >
                                        <option value="">-- Choose a Service -- </option>
                                        <option value="MAINTENANCE_SERVICE">Maintenance</option>
                                        <option value="CONSTRUCTION_SERVICE">Build Koi Pond</option>
                                    </select>
                                </div>

                                <div className="form-group mb-6">
                                    <label>First Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="firstName"
                                        value={firstName}
                                        onChange={(e) => setFirstName(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group mb-6">
                                    <label>Last Name</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="lastName"
                                        value={lastName}
                                        onChange={(e) => setLastName(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group mb-6">
                                    <label>Address</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="address"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group mb-6">
                                    <label>Phone</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="phone"
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group mb-6">
                                    <label>Detail</label>
                                    <textarea
                                        className="form-control"
                                        name="customerRequest"
                                        rows="4"
                                        value={customerRequest}
                                        onChange={(e) => setCustomerRequest(e.target.value)}
                                        required
                                    ></textarea>
                                </div>

                                <button type="submit" className="btn btn-danger py-3 w-100 fw-bold py-1 mt-3">
                                    Submit request
                                </button>
                            </form>
                        )}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};



export default Contact;
