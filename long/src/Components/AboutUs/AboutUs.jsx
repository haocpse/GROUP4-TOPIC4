import React from "react";
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import aboutus from '../Assests/background-about-us-e1700469663462.jpg'
import './AboutUs.css'
import HAO from '../Assests/HAO.jpg'
import hocagovap from '../Assests/govap-jgarden.jpg'
import LONG from '../Assests/Long.jpg'
const AboutUs = () => {
    return (
        <>
            <Navbar />
            <div className="about-us-container">
                {/* Hero Image Section */}
                <div className="hero-image text-center py-5">
                    <h1 className="hero-text">Giới Thiệu</h1>
                    <h2 className="breadcrumb">Trang chủ » Giới Thiệu</h2>
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
                            Được thành lập từ 30/4/1975 với tên gọi ban đầu là CÔNG TY TNHH TƯ VẤN THIẾT KẾ VÀ CẢNH QUAN KOI POND DESIGN. Đến năm 2019, sau khi trải qua quá trình tích lũy kinh nghiệm và phát triển, chúng tôi đổi tên thành CÔNG TY TNHH KIẾN TRÚC & CẢNH QUAN KOI POND DESIGN để phản ánh rõ hơn về chuyên môn hoạt động của mình.
                        </p>
                        <p>
                            Trải qua các giai đoạn phát triển, năm 2021, chúng tôi đã tiến hành tái cơ cấu bộ máy điều hành và vận hành, tăng cường năng lực quản lý để đáp ứng mạnh mẽ với sự phức tạp ngày càng tăng của thị trường kiến trúc và cảnh quan.
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
                                <img src={HAO} alt="Team Member 3" />
                                <div className="overlay">CEO Châu Phú Hào</div>
                            </div>
                            <p>Châu Phú Hào</p>
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
                                <h3 className="text-center font-weight-bold">Bạn cho tôi không gian, tôi tặng bạn không gian!!!</h3>
                                <p className="mt-4">
                                    Tôi tin rằng không gian cảnh quan không chỉ là nơi, nó là cách bạn trải nghiệm cuộc sống. Sứ mệnh của tôi là mang đến cho khách hàng những không gian sống nên thơ, yên bình và thanh lịch, qua phong cách thiết kế tinh tế và đầy triết lý Nhật.
                                </p>
                                <p>
                                    Mỗi công trình cảnh quan của tôi là một tác phẩm độc đáo, phản ánh sự thành công và phong cách sống của khách hàng.
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