import React from "react";
import Navbar from "../Navbar/Navbar";
import Footer from "../Footer/Footer";
import logo from '../Assests/cakoinhat.jpg';
import hoCa from '../Assests/407.jpg';
import hoCa3 from '../Assests/408.jpg';
import hoCaContent1 from '../Assests/hocaikoi2.jpg';
import hoCaContent2 from '../Assests/409.jpg';
import hoCaContent3 from '../Assests/410.jpg';
import hoca84 from '../Assests/84.jpg';
import hoca43 from '../Assests/43.jpg';
import hoca123 from '../Assests/resize-1729443139855123197freephotoofkhuvntruynthngchauathanhbinhvicuda.jpeg'
import hoca345 from '../Assests/resize-17294425681044573785japanesegarden752918640.jpg'
import hoca3456 from '../Assests/yeah.jpeg'
import hoca34567 from '../Assests/yeah2.jpeg'



import './Main.css';

const Main = () => {
    return (
        <div>
            <>
                <Navbar />

                <section className="project-section text-center p-5 bg-light">

                    <div className="container">
                    
                        <div className="row align-items-center">
                            <div className="col-md-6 text-md-left mb-4 mb-md-0">
                                <h1 className="mb-4 textMain1" style={{ color: '#BDBDBD', fontSize: '80px', fontWeight: '20' }}>PROJECT</h1>
                                <h1 className="mb-4 textMain2" style={{ fontSize: '80px', fontWeight: '20' }}>KOI POND</h1>
                                <button className="btn btn-danger py-2 mt-3 button">VIEW PROJECT</button>
                            </div>

                            {/* Carousel */}
                            <div className="col-md-6">
                                <div id="koiCarousel" className="carousel slide" data-ride="carousel" data-interval="4000">
                                    <div className="carousel-inner">
                                        <div className="carousel-item active">
                                            <img className="d-block w-100 img-fluid rounded" src={logo} alt="Koi Pond 1" />
                                        </div>
                                        <div className="carousel-item">
                                            <img className="d-block w-100 img-fluid rounded" src={hoCaContent3} alt="Koi Pond 2" />
                                        </div>
                                        <div className="carousel-item">
                                            <img className="d-block w-100 img-fluid rounded" src={hoCa3} alt="Koi Pond 3" />
                                        </div>
                                    </div>

                                    {/* Carousel Controls */}
                                    <a className="carousel-control-prev" href="#koiCarousel" role="button" data-slide="prev">
                                        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                        <span className="sr-only">Previous</span>
                                    </a>
                                    <a className="carousel-control-next" href="#koiCarousel" role="button" data-slide="next">
                                        <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                        <span className="sr-only">Next</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <section className="about-section p-5 bg-light">
                    <div className="container">
                        <div className="row align-items-center">

                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-6 mb-3">
                                        <img className="img-fluid rounded " src={hoCaContent2} alt="KOI 1" style={{ height: '200px' }} />
                                    </div>
                                    <div className="col-6 mb-3">
                                        <img className="img-fluid rounded img2" src={hoca345} alt="KOI 2" style={{ height: '200px', width: '90%'}} />
                                    </div>
                                    <div className="col-10">
                                        <img className="img-fluid rounded img3" src={hoCaContent3} alt="KOI 3" />
                                    </div>
                                </div>
                            </div>

                            <div className="col-md-6 text-md-left content">
                                <h2>About Our Koi Ponds</h2>
                                <p>
                                    Our koi ponds are designed with precision and care to bring tranquility and harmony to your outdoor space. The beauty of Koi ponds lies in their ability to blend natural elements with modern design, creating a space of peace and serenity.
                                </p>
                                <p>
                                    With over 20 years of experience, we provide top-notch services from consulting, designing, and maintaining Koi ponds to ensure your Koi live in a healthy and beautiful environment.
                                </p>
                                <button className="btn btn-danger mt-3 button">Read More</button>
                            </div>
                        </div>
                    </div>
                </section>
                {/**working process */}
                <section class="working-process-section text-center py-5">
                    <div class="container">
                        <h1 class=" text-gray mb-5" style={{ fontWeight: '20', fontSize: '50px' }}>WORKING PROCESS</h1>
                        <div class="row">
                            <div class="col-md-4 mb-4">
                                <div class="step-box d-flex">
                                    <div class="step-number">
                                        <span>1</span>
                                    </div>
                                    <div class="step-content text-left">
                                        <h5>Consulting on pond shape and style</h5>
                                        <p>Survey the actual construction style, discuss with customers to understand their wishes and preferences.</p>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-4 mb-4">
                                <div class="step-box d-flex">
                                    <div class="step-number">
                                        <span>2</span>
                                    </div>
                                    <div class="step-content text-left">
                                        <h5>Idea and drawing</h5>
                                        <p>The design team will create a conceptual design file and send it to the customer.</p>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-4 mb-4">
                                <div class="step-box d-flex">
                                    <div class="step-number">
                                        <span>3</span>
                                    </div>
                                    <div class="step-content text-left">
                                        <h5>Construction</h5>
                                        <p>Carrying out construction.</p>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-4 mb-4">
                                <div class="step-box d-flex">
                                    <div class="step-number">
                                        <span>4</span>
                                    </div>
                                    <div class="step-content text-left">
                                        <h5>Hand over</h5>
                                        <p>After completion of construction.</p>
                                    </div>
                                </div>
                            </div>

                            <div class="col-md-4 mb-4">
                                <div class="step-box d-flex">
                                    <div class="step-number">
                                        <span>5</span>
                                    </div>
                                    <div class="step-content text-left">
                                        <h5>Maintenance</h5>
                                        <p>The staff will continue to care for and maintain the KOI's pond.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Projects Section */}
                <section className="projects-section py-5 bg-light">
                    <div className="container">
                        <h3 className=" text-gray text-center mb-5" style={{ fontWeight: '20', fontSize: '50px' }}>Our Projects</h3>
                        <div className="row mt-4">
                            <div className="col-md-6">
                                <div className="project-sample">
                                    <img src={hoca84} alt="Sample Project" className="img-fluid rounded" />
                                    <a href="#" className="btn btn-outline-dark mt-3">View More</a>
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="row">
                                    <div className="col-md-6 mb-3">
                                        <img src={hoca43} alt="Project 1" className="img-fluid rounded" />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <img src={hoca123} alt="Project 2" className="img-fluid rounded" />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <img src={hoca3456} alt="Project 3" className="img-fluid rounded" />
                                    </div>
                                    <div className="col-md-6 mb-3">
                                        <img src={hoca34567} alt="Project 4" className="img-fluid rounded" />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* Contact Section */}
                <section className="contact-section py-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <h3>Contact Information</h3>
                                <p>Koi Pond Design, FPT University</p>
                                <p>Phone: 999.999.9999</p>
                                <p>Email: koipondv@gmail.com</p>
                                <a href="#" classNameName="btn btn-outline-dark">Contact Us</a>
                            </div>
                            <div className="col-md-6">
                                <iframe
                                    src="https://maps.google.com/maps?q=FPT%20University&t=&z=13&ie=UTF8&iwloc=&output=embed"
                                    width="100%"
                                    height="250"
                                    style={{ border: 0 }}
                                    allowFullScreen=""
                                    loading="lazy">
                                </iframe>
                            </div>
                        </div>
                    </div>
                </section>


                <Footer />
            </>

        </div>
    )
}

export default Main;