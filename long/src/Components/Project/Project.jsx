import React from 'react';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import KoiPond from '../Assests/ho-ca-koi-dep.jpg';
import KoiPond2 from '../Assests/hocaikoi2.jpg';
import KoiPond3 from '../Assests/backyard-koi-pond-neave-group-outdoor-solutions_8685.jpg';
import styles from './ProjectPage.module.css'; // Ensure this is imported correctly
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

const projects = [
    {
        title: "Zen Garden Oasis",
        description: "A tranquil koi pond surrounded by lush greenery, designed to bring peace and balance to any backyard setting.",
        image: KoiPond,
        price: "$5000",
        packageName: "Basic Package",
        icon: "fa-star",

    },
    {
        title: "Modern Waterfall Feature",
        description: "A sleek, modern design featuring a cascading waterfall, adding a touch of elegance and sophistication to the outdoor space.",
        image: KoiPond2,
        price: "$7500",
        packageName: "Economic Package",
        icon: "fa-scale-balanced",

    },
    {
        title: "Japanese-Inspired Koi Sanctuary",
        description: "Inspired by traditional Japanese aesthetics, this koi pond project creates a serene escape with carefully selected plants and vibrant koi fish.",
        image: KoiPond3,
        price: "$12000",
        packageName: "VIP Package",
        icon: "fa-crown",

    }
];

const ProjectPage = () => {
    return (
        <>
            <Navbar />
            <Container className="mt-5">
                <h2 className="text-center">Our Projects</h2>
                {projects.map((project, index) => (
                    <Row key={index} className={`mb-5 align-items-center ${styles.projectRow}`}>
                        <Col md={6}>
                            <div className="image-container position-relative">
                                <img src={project.image} alt={project.title} className={`img-fluid ${styles.projectImage}`} />
                                <span className={`badge ${styles.badge}`}>
                                    <i className={`fa-solid ${project.icon}`}></i>
                                    &nbsp;&nbsp;{project.badge}
                                </span>
                            </div>
                        </Col>
                        <Col md={6}>
                            <Card className="border-0">
                                <Card.Body>
                                    <div className="d-flex align-items-center">
                                        <div className={styles.fireEffect}>
                                            <i className={`fa-solid ${project.icon} ${styles.projectIcon}`}></i>
                                        </div>
                                        <Card.Title className={`${styles.projectTitle} ms-2`}>
                                            <div className={styles.packageInfo}>
                                                {project.packageName} - {project.price}
                                            </div>
                                            {project.title}
                                        </Card.Title>
                                    </div>
                                    <Card.Text>{project.description}</Card.Text>
                                    <Button variant="outline-dark" className={styles.viewMoreBtn}>
                                        View More →
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                ))}
            </Container>
            <Footer />
        </>
    );
};

export default ProjectPage;
