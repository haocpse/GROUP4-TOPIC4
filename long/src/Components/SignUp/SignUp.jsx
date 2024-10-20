import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './SignUp.css';
import logo from "../Assests/logo-navbar.png";
import { toast, ToastContainer } from "react-toastify";


const SignUp = () => {
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showHang, setShowHang] = useState(false); // state cho nut show hang
    const [error, setError] = useState('');


    const navigate = useNavigate(); // chuyen trang

    const handleSubmit = async (err) => {
        err.preventDefault(); // ngan chan reload nhieu lan

        // check pass lan 2 !!
        if (confirmPassword !== password) {
            setError("Password is not match !!!");
            return;
        }
        try {
            // send req den backend
            const response = await axios.post('http://localhost:8080/signup', {
                username: account, // dinh dang du lieu thanh object de gui cho backend ne` ^^
                password: password,
            }
            );
            console.log(response.data);

            // chuyen trang den trang dang nhap
            if (response.data.success) {       // Kiểm tra API /signup ở backend có trả về response success: true hay không để điều hướng trang.
                toast.success('Sign Up Successfully !!!');
                navigate('/login');
            }

        } catch (err) {
            setError(err.response?.data?.messgae || 'Sign Up FAIL, please try again !! .-. ');
        }
    }

    return (
        <div className="container-fluid">
             <ToastContainer position="top-right" autoClose={5000} hideProgressBar={false} closeOnClick pauseOnFocusLoss draggable pauseOnHover />
            <div className="row align-items-center vh-100 img-left">
                <div className="col-md-6">
                    <div className="login-form">
                        <form onSubmit={handleSubmit} className="p-4">
                            <h1 className="mb-4 text-center">Sgin up to KOI POND DESIGN</h1>
                            {error && <div className="alert alert-danger">{error}</div>}
                            {/* form login */}
                            <div className="form-group mb-3 position-relative">
                                <input
                                    type="text"
                                    className="form-control input"
                                    value={account}
                                    placeholder="Enter Account"
                                    onChange={(err) => setAccount(err.target.value)}
                                    required
                                />
                                <i className="fa-solid fa-user person"></i>
                            </div>
                            {/* password */}
                            <div className="form-group mb-3 position-relative">
                                <input
                                    type={showHang ? 'text' : 'password'} // show hang
                                    className="form-control input"
                                    value={password}
                                    placeholder="Enter Password"
                                    onChange={(event) => setPassword(event.target.value)}
                                    required
                                />
                                {/* button show hang */}
                                <button type="button" className="button-show-pass" onClick={() => setShowHang(!showHang)}>
                                    <i className={showHang ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                                </button>
                            </div>
                            {/* confirm password */}
                            <div className="form-group mb-3 position-relative">
                                <input
                                    type={showHang ? 'text' : 'password'} // show hang
                                    className="form-control input"
                                    value={confirmPassword}
                                    placeholder="Confirm Password"
                                    onChange={(event) => setConfirmPassword(event.target.value)}
                                    required
                                />
                                {/* button show hang */}
                                <button type="button" className="button-show-pass" onClick={() => setShowHang(!showHang)}>
                                    <i className={showHang ? 'fas fa-eye-slash' : 'fas fa-eye'}></i>
                                </button>
                            </div>
                            <button type="submit" className="btn btn-danger w-100 fw-medium py-2">SIGN UP</button>


                            {/* Điều hướng về trang đăng nhập */}
                            <div className="text-center mt-3">
                                <button type="button" className="btn btn-alert" onClick={() => navigate('/login')}>
                                    Already have an account? Log In
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
                <div className="col-md-6 d-md-block text-center" style={{ backgroundColor: 'bisque' }}>
                    <label className="KOI-POND">KOI POND DESIGN</label>
                    <img src={logo} alt="Logo" className="img-fluid" />
                </div>
            </div>
        </div>
    );
};

export default SignUp;