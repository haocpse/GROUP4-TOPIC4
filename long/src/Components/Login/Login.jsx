import React, { useState } from "react";
import './Login.css';
import logo from '../Assests/logo-navbar.png';
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from '@react-oauth/google';
import { jwtDecode } from "jwt-decode";

const Login = () => {
    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [showHang, setShowHang] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [error, setError] = useState('');

    const navigate = useNavigate();

    function getRoleFromToken() {
        const token = localStorage.getItem('token');
        if (token) {
            const decodedToken = jwtDecode(token);
            const roles = decodedToken.scope || decodedToken.roles || decodedToken.authorities;
            return roles;
        }
        return null;
    }

    const handleSubmit = async (err) => {
        err.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/login', {
                username: account,
                password: password
            });

            localStorage.setItem('token', response.data.data.token);
            const roles = getRoleFromToken(response.data.data.token);

            navigateBasedOnRole(roles);
        } catch (err) {
            if (err.response) {
                // Lỗi từ phía server (status code ngoài khoảng 2xx)
                setError(err.response.data.message || 'Something went wrong. Please try again.');
            } else if (err.request) {
                // Không nhận được phản hồi từ server
                setError('No response from server. Please check your network connection.');
            } else {
                // Các lỗi khác
                setError('An unknown error occurred.');
            }
        }
    };

    const handleGoogleLoginSuccess = async (response) => {
        const token = response.credential;
        const decodedToken = jwtDecode(token);


        try {
            // Gửi token đến backend để xác thực
            const res = await axios.post('http://localhost:8080/login-google',
                {
                    aud: decodedToken.aud,
                    sub: decodedToken.sub,
                    email: decodedToken.email,
                    name: decodedToken.name
                });
            const roles = getRoleFromToken(res.data.data.role);
            localStorage.setItem('token', res.data.data.token)
            navigateBasedOnRole(roles);
        } catch (err) {
            setError('Google login failed. Please try again.');
        }
    };

    const handleGoogleLoginError = () => {
        setError('Google login failed. Please try again.');
    };

    const handleSignUp = () => {
        navigate('/signup');
    };

    const navigateBasedOnRole = (roles) => {
        if (roles === "MANAGER") {
            navigate('/manage');
        } else if (roles === "CONSULTANT") {
            navigate('/consult/ownedTasks');
        } else if (roles === "DESIGNER") {
            navigate('/design/ownedTasks');
        } else if (roles === "CONSTRUCTOR") {
            navigate('/construct/ownedTasks');
        } else if (roles === "ADMIN") {
            navigate('/admin');
        }
        else {
            navigate('/');
        }
    };

    return (
        <div className="container-fluid">
            <div className="row align-items-center vh-100 img-left">
                <div className="col-md-6">
                    <div className="login-form">
                        <form onSubmit={handleSubmit} className="p-4">
                            <h1 className="mb-4 text-center">Sign in to KOI POND DESIGN</h1>
                            {error && <div className="alert alert-danger">{error}</div>}

                            <div className="google-login text-center mb-3">
                                <GoogleLogin
                                    onSuccess={handleGoogleLoginSuccess}
                                    onError={handleGoogleLoginError}
                                />
                            </div>

                            {/* chu or */}
                            <div className="text-center col-12 row">
                                <div className="col-md-5"><hr /></div>
                                <div className="col-md-2">OR</div>
                                <div className="col-md-5"><hr /></div>
                            </div>

                            {/* form login */}
                            <div className="form-group mb-3 position-relative">
                                <input
                                    type="text"
                                    className="form-control input"
                                    value={account}
                                    placeholder="Enter Account"
                                    onChange={(event) => setAccount(event.target.value)}
                                    required
                                />
                                <i className="fa-solid fa-user person"></i>
                            </div>
                            {/* password */}
                            <div className="form-group mb-3 position-relative">
                                <input
                                    type={showHang ? 'text' : 'password'}
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

                            {/* Checkbox Remember Me */}
                            <div className="form-group mb-3">
                                <input
                                    className="box"
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(event) => setRememberMe(event.target.checked)}
                                />
                                <label className="ms-2 remember-me">Remember username</label>
                            </div>
                            <button type="submit" className="btn btn-danger w-100 fw-medium py-2">LOGIN</button>
                            {/* nut sign up de chuyen trang qa sign up*/}
                            <div className="text-center mt-3">
                                <button type="button" className="btn btn-alert" onClick={handleSignUp}>
                                    Don't have an account? Sign Up
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
}

export default Login;
