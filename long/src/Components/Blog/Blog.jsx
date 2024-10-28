import React from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './Blog.module.css';
import KoiPond from '../Assests/ho-ca-koi-dep.jpg';
import KoiPond2 from '../Assests/hocaikoi2.jpg';
import KoiPond3 from '../Assests/backyard-koi-pond-neave-group-outdoor-solutions_8685.jpg';
import Footer from '../Footer/Footer';

const userImages = [KoiPond, KoiPond2, KoiPond3];

const blogs = [
    {
        id: 1,
        title: 'Beautiful Koi Pond Design',
        image: KoiPond,
        description: `Koi ponds have become a popular addition to residential backyards, offering tranquility and beauty in outdoor spaces. This design seamlessly integrates natural stones, water lilies, and underwater lighting, creating a serene atmosphere.`,
        comments: [
            { text: 'Amazing design!', userImage: userImages[0] },
            { text: 'I want this in my garden!', userImage: userImages[1] },
            { text: 'So relaxing to look at!', userImage: userImages[2] },
        ],
        views: 150,
    },
    {
        id: 2,
        title: 'DIY Koi Pond Installation',
        image: KoiPond2,
        description: `Building a koi pond in your backyard is a rewarding DIY project. This guide provides a step-by-step process on everything from digging and lining the pond to selecting koi-friendly plants.`,
        comments: [
            { text: 'Great guide for beginners!', userImage: userImages[0] },
            { text: 'Easy to follow!', userImage: userImages[1] },
        ],
        views: 200,
    },
    {
        id: 3,
        title: 'Maintaining Your Koi Pond',
        image: KoiPond3,
        description: `A healthy koi pond requires regular maintenance to keep water quality optimal and ensure koi well-being. This includes weekly water testing and checking for algae buildup.`,
        comments: [
            { text: 'Essential advice!', userImage: userImages[0] },
            { text: 'My koi have never been healthier!', userImage: userImages[1] },
        ],
        views: 120,
    },
];

const Blog = () => {
    const navigate = useNavigate();

    const handleViewBlog = (id) => {
        navigate(`/blog/${id}`);
    };

    return (
        <>
            <Navbar />
            <Container className="mt-4">
                <h2 className="mb-4 text-center">Koi Pond Construction Blogs</h2>
                <Row>
                    {blogs.map((blog) => (
                        <Col md={6} lg={4} key={blog.id} className="mb-4">
                            <Card className="blog-card h-100 shadow-sm rounded" style={{ transition: 'transform 0.2s' }}>
                                <Card.Img variant="top" src={blog.image} alt={blog.title} className="blog-image" />
                                <Card.Body>
                                    <Card.Title className="text-primary">{blog.title}</Card.Title>
                                    <Card.Text className="text-muted">{blog.description}</Card.Text>
                                    <Button variant="primary" onClick={() => handleViewBlog(blog.id)}>
                                        Read More
                                    </Button>
                                </Card.Body>
                                <Card.Footer className="d-flex justify-content-between">
                                    <Row className="mt-2 w-100">
                                        <Col xs={6} className="text-start">
                                            <small>
                                                <i className="fas fa-eye"></i> {blog.views} Views
                                            </small>
                                        </Col>
                                        <Col xs={6} className="text-end">
                                            <small>
                                                <i className="fas fa-comment"></i> {blog.comments.length} Comments
                                            </small>
                                        </Col>
                                </Row>
                            </Card.Footer>
                        </Card>
                        </Col>
                    ))}
            </Row>
        </Container >
        <Footer/>
        </>
    );
};

export default Blog;
