import React, { useState } from "react";
import './Login.css';
import logo from '../Assests/logo-navbar.png'
import axios from "axios";
import { useNavigate } from "react-router-dom";



const Login = () => {
    // create state to store email and passowrd

    const [account, setAccount] = useState('');
    const [password, setPassword] = useState('');
    const [showHang, setShowHang] = useState(false); // state cho nut show hang
    const [rememberMe, setRememberMe] = useState(false); // state cho remember me !! 
    const [error, setError] = useState('');

    const navigate = useNavigate(); // dieu huong trang


    // handle logic

    const handleSubmit = async (err) => {
        err.preventDefault(); // Prevent from reload many time

        try {
            // send post login
            const response = await axios.post('http://localhost:8080/login', {
                account: account,
                password: password
            });

            console.log(response.data); // để truy cập vào nội dung mà API trả về

            if (response.data.token) {
                alert('LOGIN SUCCESSFULLY')


                // neu thanh cong thi luu token vao local storage
                if (rememberMe) {
                    localStorage.setItem('token', response.data.token); //  Lưu vào localStorage nếu "Remember Me"
                } else {
                    sessionStorage.setItem('token', response.data.token);  // Lưu vào sessionStorage nếu không nhớ
                }

                navigate('/'); // chuyen den trang home
            }

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


    // dieu huong den trang dang ki
    const handleSignUp = () => {
        navigate('/signup'); // chuyen trang dang ky 
    };
    return (
        <div className="container-fluid">
            <div className="row align-items-center vh-100 img-left">
                <div className="col-md-6">
                    <div className="login-form">
                        <form onSubmit={handleSubmit} className="p-4">
                            <h1 className="mb-4 text-center">Sign in to KOI POND DESIGN</h1>
                            {error && <div className="alert alert-danger">{error}</div>}
                            {/*  google lgin */}
                            <div className="google-login text-center mb-3">
                                <button className="btn btn-outline-danger">
                                    <i className="fa-brands fa-google"></i> Sign in with Google
                                </button>
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


                            {/* Checkbox Remember Me */}
                            <div className="form-group mb-3">
                                <input
                                    className="box"
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(err) => setRememberMe(err.target.checked)}
                                />
                                <label className="ms-2 remember-me">Remember username</label>
                            </div>
                            <button type="submit" className="btn btn-danger w-100 fw-medium py-2">LOGIN</button>

                            {/* nut sign up de chuyen trang qa sign up*/}
                            <div className="text-center mt-3">
                                <button type="button" className="btn btn-alert" onClick={handleSignUp}>
                                    Don't have an account?      Sign Up
                                </button>
                            </div>
                            <div className="text-center mt-3">

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