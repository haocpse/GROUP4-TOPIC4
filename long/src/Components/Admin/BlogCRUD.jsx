import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
<<<<<<< Updated upstream
import KoiPond from '../Assests/ho-ca-koi-dep.jpg';
import KoiPond2 from '../Assests/hocaikoi2.jpg';
import KoiPond3 from '../Assests/backyard-koi-pond-neave-group-outdoor-solutions_8685.jpg';
=======
import Navbar from '../Navbar/Navbar';
>>>>>>> Stashed changes

const BlogCRUD = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    // New blog data with actual images
    const newBlogs = [
        {
            id: 1,
            title: "Beautiful Koi Pond Design",
            image: KoiPond, // Actual image imported
            views: 120,
            comments: 15,
            status: "Published",
        },
        {
            id: 2,
            title: "DIY Koi Pond Installation",
            image: KoiPond2, // Actual image imported
            views: 80,
            comments: 5,
            status: "Draft",
        },
        {
            id: 3,
            title: "Maintaining Your Koi Pond",
            image: KoiPond3, // Actual image imported
            views: 95,
            comments: 12,
            status: "Published",
        },
    ];

    // Simulate fetching data
    useEffect(() => {
        setBlogs(newBlogs);
    }, []);

    // Handle delete blog
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            const updatedBlogs = blogs.filter(blog => blog.id !== id);
            setBlogs(updatedBlogs);
        }
    };

    // Handle edit blog
    const handleEdit = (id) => {
        navigate(`/edit-blog/${id}`);
    };

    return (
        <>
            <Navbar />
            <Container fluid className="mt-4">

<<<<<<< Updated upstream
            <Row>
                {blogs.map((blog) => (
                    <Col md={4} key={blog.id} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={blog.image} />
                            <Card.Body>
                                <Card.Title>{blog.title}</Card.Title>
                                <Badge bg={blog.status === "Published" ? "success" : "secondary"} className="mb-2">
                                    {blog.status}
                                </Badge>
                                <Row className="mt-2">
                                    <Col xs={6} className="text-left">
                                        <small><i className="fas fa-eye"></i> {blog.views} Views</small>
                                    </Col>
                                    <Col xs={6} className="text-right">
                                        <small><i className="fas fa-comments"></i> {blog.comments} Comments</small>
                                    </Col>
                                </Row>
                            </Card.Body>
                            <Card.Footer className="text-left">
                                <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(blog.id)}>Edit</Button>
                                <Button variant="danger" size="sm" onClick={() => handleDelete(blog.id)}>Delete</Button>
                            </Card.Footer>
                        </Card>
=======
                <Row className="mb-3">
                    <Col>
                        <h2>Blog Dashboard</h2>
>>>>>>> Stashed changes
                    </Col>
                </Row>

                <Row>
                    {blogs.map((blog) => (
                        <Col md={4} key={blog.id} className="mb-4">
                            <Card>
                                <Card.Img variant="top" src={blog.image} />
                                <Card.Body>
                                    <Card.Title>{blog.title}</Card.Title>

                                    {/* Blog Status */}
                                    <Badge bg={blog.status === "Published" ? "success" : "secondary"} className="mb-2">
                                        {blog.status}
                                    </Badge>

                                    {/* Views and Comments */}
                                    <Row className="mt-2">
                                        <Col xs={6} className="text-left">
                                            <small><i className="fas fa-eye"></i> {blog.views} Views</small>
                                        </Col>
                                        <Col xs={6} className="text-right">
                                            <small><i className="fas fa-comments"></i> {blog.comments} Comments</small>
                                        </Col>
                                    </Row>
                                </Card.Body>

                                {/* Admin Actions */}
                                <Card.Footer className="text-left">
                                    <Button variant="warning" size="sm" className="me-2" onClick={() => handleEdit(blog.id)}>Edit</Button>
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(blog.id)}>Delete</Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </>
    );
};

export default BlogCRUD;
