import React, { useState } from 'react';
import './Contact.css';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import logo from '../Assests/logo-navbar.png'
import axios from 'axios';

const Contact = () => {
    const [formData, setFormData] = useState({ // luu thong tin lien he cua khach hang
        service: '',
        firstName: '',
        lastName: '',
        address: '',
        phone: '',
        customerRequest: ''
    });

    const [file, setFile] = useState(null);
    const [submitted, setSubmitted] = useState(false);
    const [error, setError] = useState('');

    // handle gia tri ng dung nhap vao form
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData(prev => ({ ...prev, [name]: value })); //prev la gia tri ban dau, ..prev la sao chep gia tri hien tai
        // [name]: value cap nhat gia tri cho truong tuong ung (email, name) dua vao thuoc tinh name
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        setFile(file);
    };



    const handleSubmit = async (event) => {
        event.preventDefault(); // ngan chan reload
        setError('');
        setSubmitted(false);

        console.log('form: ', formData);
        console.log('file:', file); // kt file anh

        // tao FormData de gui du lieu va file cho backend

        const dataToSend = new FormData();
        dataToSend.append('service', formData.service);
        dataToSend.append('firstName', formData.firstName);
        dataToSend.append('lastName', formData.lastName);
        dataToSend.append('address', formData.address); // service, firstname, lastname, address, contactNumber, customRequest
        dataToSend.append('phone', formData.phone);
        dataToSend.append('customerRequest', formData.customerRequest);
        if (file) {
            dataToSend.append('file', file);
        }

        try {
            const response = await axios.post('http://localhost:8080/contactUs', dataToSend);
            console.log(response.data);

            if (response.status === 200) {
                setSubmitted(true);
            }

        } catch (error) {
            setError('FAIL, please try again !!');
            console.error(error);
        }

    };

    return (
        <>
            {/* Navbar ở đầu trang */}
            <Navbar />

            <div className="container mb-5">
                <h1 className="text-center my-4" style={{ color: 'red' }}>Contact us</h1>
                <div className="row">
                    <div className="col-md-6">
                        {/* check xem la form dc submit hong */}
                        {submitted ? (
                            // SUCCESS !!!
                            <div className="notification alert-success">
                                <div className="success-icon">
                                    <i className="fa-solid fa-check"></i>
                                </div>
                                <div className="success-text">
                                    SUBMIT SUCCESSFULLY !
                                </div>
                            </div>


                        ) : ( // FAIL !
                            <form onSubmit={handleSubmit} className="bg-light p-4 rounded shadow-lg" >
                                {error && <div className="notification-error alert-danger">{error}</div>}
                                <div className="text-center label-upload">
                                    <label> Contact Form </label>
                                </div>

                                <div className="form-group mb-6">

                                    <label>Select Service</label>
                                    <select
                                        name="service"
                                        className="form-control"
                                        value={formData.service}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">-- Choose a Service -- </option>
                                        <option value="MAINTENANCE_SERVICE">Maintenance</option>
                                        <option value="CONSTRUCTION_SERVICE">Build Koi Pond</option>
                                    </select>
                                </div>
                                <div className="form-group mb-6">
                                    <label>First Name</label>
                                    <input type="text" className="form-control" name="firstName"
                                        value={formData.firstName}
                                        onChange={handleChange}
                                        required />
                                </div>

                                <div className="form-group mb-6">
                                    <label>Last Name</label>
                                    <input type="text" className="form-control" name="lastName"
                                        value={formData.lastName}
                                        onChange={handleChange}
                                        required />
                                </div>

                                <div className="form-group mb-6">
                                    <label>Address</label>
                                    <input type="text" className="form-control" name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required />
                                </div>

                                <div className="form-group mb-6">
                                    <label>Phone</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="form-group mb-6">
                                    <label>Detail</label>
                                    <textarea
                                        className="form-control"
                                        name="customerRequest"
                                        rows="4"
                                        value={formData.customerRequest}
                                        onChange={handleChange}
                                        required
                                    ></textarea>
                                </div>

                                <button type="submit" className="btn btn-danger py-3 w-100 fw-boild py-1 mt-3">
                                    Submit request
                                </button>
                            </form>
                        )}
                    </div>

                    {!submitted && ( // Chỉ hiển thị form upload nếu chưa gửi
                        <div className="col-md-6 bg-light p-4 shadow-lg">
                            <div className="form-group mb-6 text-center ">
                                <label className="label-upload">Upload Image of Your Idea</label>
                                <input
                                    type="file"
                                    name='file'
                                    className="form-control input-upload"
                                    onChange={handleFileChange}
                                    accept="image/*"
                                />
                                <img className="logo-contact" src={logo} alt="" />
                            </div>
                        </div>
                    )}
                </div >
            </div>

            {/* Footer ở cuối trang */}
            <Footer />
        </>
    );

};

export default Contact;
