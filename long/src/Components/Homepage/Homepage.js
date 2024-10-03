import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "./homepage.css";
import Header from "../Header/header";

const Homepage = () => {
  const [requests, setRequests] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8080/consultation-request"
        );
        setRequests(response.data); // Lưu dữ liệu vào state
      } catch (error) {
        console.error("Error fetching consultation requests:", error);
        toast.error(
          "Failed to load consultation requests. Please try again later."
        );
      }
    };
    fetchRequests();
  }, []); // Chỉ gọi một lần khi component được render

  return (
    <div className="homepage">
      <div className="containe">
        <div className="content">
          <div className="text-section">
            <h1>PROJECT</h1>
            <h2>KOI POND</h2>
            <div className="navigation">
              <i className="fas fa-arrow-left"></i>
              <i className="fas fa-arrow-right"></i>
              <div className="page-number">
                01
                <span>/ 02</span>
              </div>
            </div>
          </div>
          {/* Phần ảnh có thể click để điều hướng */}
          <div className="image-section" onClick={() => navigate("/Project")}>
            <img
              alt="A beautiful koi pond with a small bridge and lush greenery"
              height="400"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRiJbA569eqfAjIs2fpYhx9nThBOERCZweA0g&s"
              width="400"
            />
            <div className="text">
              VIEW PROJECT
              <i className="fas fa-arrow-right"> </i>
            </div>
          </div>
        </div>
      </div>
      <div className="container-1">
        <div className="images-1">
          <img
            alt="Koi Fish 1"
            src="https://www.shutterstock.com/image-photo/koi-fish-swimming-pond-fancy-600nw-2477987663.jpg"
          />
          <img
            alt="Koi Fish 2"
            src="https://nonbo.net.vn/wp-content/uploads/2019/02/mot-so-hinh-anh-thiet-ke-thi-cong-ho-ca-koi-dep_02.jpg"
          />
        </div>
        <div className="content-1">
          <h1>About</h1>
          <p>
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry's standard dummy text
            ever since the 1500s, when an unknown printer took a galley of type
            and scrambled it to make a type specimen book. It has survived not
            only five centuries, but also the leap into electronic typesetting,
            remaining essentially unchanged.
          </p>
          <a className="read-more" href="#">
            READ MORE
            <i className="fas fa-arrow-right"></i>
          </a>
        </div>
      </div>
      <div className="container-2">
        <div className="title">WORKING PROCESS</div>
        <div className="process">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <div className="step-title">
                Consulting on pond shape and style
              </div>
              <div className="step-description">
                Survey the actual construction site, discuss with customers to
                understand their wishes and preferences.
              </div>
            </div>
          </div>
          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <div className="step-title">Idea and drawing</div>
              <div className="step-description">
                The design team will create a conceptual design file and send it
                to the customer.
              </div>
            </div>
          </div>
          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <div className="step-title">Construction</div>
              <div className="step-description">Carrying out construction.</div>
            </div>
          </div>
          <div className="step">
            <div className="step-number">4</div>
            <div className="step-content">
              <div className="step-title">Hand over</div>
              <div className="step-description">
                After completion of construction.
              </div>
            </div>
          </div>
          <div className="step">
            <div className="step-number">5</div>
            <div className="step-content">
              <div className="step-title">Maintenance</div>
              <div className="step-description">
                The staff will continue to care for and maintain the KOI’s pond.
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container-3">
        <div className="header-1">OUR PROJECT</div>
        <div className="projects">
          <div className="project">
            <img
              alt="Project-img"
              height="200"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTXINnC0UT0fvnSGIIXHujsIz_1YRmVxoEbmA&s"
              width="400"
            />
            <div className="overlay">
              <h2>Sample Project</h2>
              VIEW MORE
              <i className="fas fa-arrow-right"></i>
            </div>
          </div>
          <div className="project">
            <img
              alt="Project-img"
              height="200"
              src="https://honnonbomiennam.vn/wp-content/uploads/2022/05/47.jpg"
              width="400"
            />
          </div>
          <div className="project">
            <img
              alt="Project-img"
              height="200"
              src="https://glid.vn//upload/images/thi-cong-hoi-phu-tho0.jpg"
              width="400"
            />
          </div>
          <div className="project">
            <img
              alt="Project-img"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT7T35G7u4UIWbAvKB7gyiTW_RM41e8cVlcJA&s"
            />
          </div>
        </div>
        <div className="all-projects">
          ALL PROJECTS
          <i className="fas fa-arrow-right"></i>
        </div>
      </div>
      <div className="container-4">
        <div className="contact">
          <div className="contact-info">
            <h1>Contact</h1>
            <h2>Information</h2>
            <p>
              KOI Pond Design
              <br />
              FPT University
            </p>
            <p>999.999.9999</p>
            <p className="email">koipondy@gmail.com</p>
            <button className="read-more-btn">CONTACT US</button>
          </div>
          <div className="map">
            <img
              alt="Map showing the location of FPT University"
              height="300"
              src="https://oaidalleapiprodscus.blob.core.windows.net/private/org-LmQ09WWGIGwOeeA4ArnRw0x5/user-uJPET5fjNenSso8wCETWVNOp/img-ZPk7IE9dOfqazGrMDYOHeVLX.png?st=2024-09-22T16%3A05%3A35Z&amp;se=2024-09-22T18%3A05%3A35Z&amp;sp=r&amp;sv=2024-08-04&amp;sr=b&amp;rscd=inline&amp;rsct=image/png&amp;skoid=d505667d-d6c1-4a0a-bac7-5c84a87759f8&amp;sktid=a48cca56-e6da-484e-a814-9c849652bcb3&amp;skt=2024-09-21T23%3A20%3A31Z&amp;ske=2024-09-22T23%3A20%3A31Z&amp;sks=b&amp;skv=2024-08-04&amp;sig=awTB8VUYgCFJiMGU0qA3nA1w01nt1eO1r1IpO0Ucw0E%3D"
              width="500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Homepage;
