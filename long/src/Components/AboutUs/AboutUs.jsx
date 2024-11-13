import React from "react";
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import aboutus from '../Assests/background-about-us-e1700469663462.jpg'
import './AboutUs.css'
import HAO from '../Assests/HAO.jpg'
import hocagovap from '../Assests/govap-jgarden.jpg'
import LONG from '../Assests/Long.jpg'
import KHOA from '../Assests/CEOKHOA.jpg'
const AboutUs = () => {
    return (
        <>
            <Navbar />
            <div className="about-us-container">
                {/* Hero Image Section */}
                <div className="hero-image text-center py-5">
                    <h1 className="hero-text">Introduction</h1>
                    <h2 className="breadcrumb">Home » Introduction</h2>
                </div>

                {/* About Us Section */}
                <section className="about-section row align-items-center">

                    <div className="col-md-4 d-flex justify-content-center">

                        <div className="about-image-grid">
                            <img src={aboutus} alt="Company Overview" className="grid-image" style={{ width: '500px' }} />
                        </div>
                    </div>
                    <div className="about-text col-md-8">
                        <h2 className="text-center">About Us</h2>
                        <p>
                            Established on April 30, 1975 with the original name of KOI POND DESIGN CONSULTING AND LANDSCAPE COMPANY LIMITED. In 2019, after accumulating experience and development, we changed our name to KOI POND DESIGN ARCHITECTURE & LANDSCAPE COMPANY LIMITED to better reflect our professional activities.
                        </p>
                        <p>
                            Through the stages of development, in 2021, we restructured the management and operation apparatus, strengthening management capacity to strongly respond to the increasing complexity of the architectural and landscape market.
                        </p>
                    </div>
                </section>

                {/* Our Team Section */}
                <section className="team-section">
                    <h2>Our Team</h2>
                    <div className="team-grid">
                        <div className="team-member">
                            <div className="image-container">
                                <img src={HAO} alt="Team Member 1" />
                                <div className="overlay">CEO Châu Phú Hào</div>
                            </div>
                            <p>Châu Phú Hào</p>
                        </div>
                        <div className="team-member">
                            <div className="image-container">
                                <img src={LONG} alt="Team Member 2" />
                                <div className="overlay">CEO Trương Hoàng Long</div>
                            </div>
                            <p>Trương Hoàng Long</p>
                        </div>
                        <div className="team-member">
                            <div className="image-container">
                                <img src={KHOA} alt="Team Member 3" />
                                <div className="overlay">KFC Nguyễn Minh Khoa</div>
                            </div>
                            <p>Nguyễn Minh Khoa</p>
                        </div>
                        <div className="team-member">
                            <div className="image-container">
                                <img src={LONG} alt="Team Member 4" />
                                <div className="overlay">CEO Trương Hoàng Long</div>
                            </div>
                            <p>Trương Hoàng Long</p>
                        </div> <div className="team-member">
                            <div className="image-container">
                                <img src={HAO} alt="Team Member 5" />
                                <div className="overlay">CEO Châu Phú Hào</div>
                            </div>
                            <p>Châu Phú Hào</p>
                        </div>

                    </div>
                </section>


                <section className="about-ceo-section">
                    <div className="container d-flex align-items-center">
                        <div className="row w-100">
                            <div className="col-lg-6">
                                <div className="quote-icon text-center mb-3">
                                    <i className="fas fa-quote-left fa-3x"></i>
                                </div>
                                <h3 className="text-center font-weight-bold">You give me the space, I give you the space!!!</h3>
                                <p className="mt-4">
                                    I believe that Koi pond is not just a place, it is a way of life. My mission is to bring my clients poetic, peaceful and elegant living spaces, through a Koi ponnd follows the Japanese style design style.
                                </p>
                                <p>
                                    Each of my landscape projects is a unique work, reflecting the success and lifestyle of my clients.
                                </p>
                                <div className="text-start mt-4">
                                    <img src={HAO} className="ceo-image rounded-circle" />
                                    <p className="mt-2 font-weight-bold">CEO CHÂU PHÚ HÀO</p>
                                </div>
                            </div>

                            <div className="col-lg-6">
                                <img src={hocagovap} className="img-fluid rounded" />
                            </div>
                        </div>
                    </div>
                </section>

            </div>
            <Footer />
        </>
    );
};
export default AboutUs;