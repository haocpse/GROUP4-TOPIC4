import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './Blog.module.css';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate();

    // Fetch blogs from the backend API
    useEffect(() => {
        axios.get('http://localhost:8080/blogs') // Replace with your actual backend API endpoint
            .then(response => setBlogs(response.data.data.blogList))
            .catch(error => console.error("Error fetching blogs:", error));

    }, []);

    const handleViewBlog = (blogId) => {
        console.log(blogId)
        navigate(`/blogs/${blogId}`);

    };

    return (
        <>
            <Navbar />
            <Container className="mt-4">
                <h2 className="mb-4 text-center">Koi Pond Construction Blogs</h2>
                <Row>
                    {blogs && blogs.map((blog) => (
                        <Col md={6} lg={4} key={blog.blogId} className="mb-4">
                            <Card className="blog-card h-100 shadow-sm rounded" style={{ transition: 'transform 0.2s' }}>
                                <Card.Img variant="top" src={blog.thumbnail} alt={blog.title} className="blog-image" />
                                <Card.Body>
                                    <Card.Title className="text-primary">{blog.title}</Card.Title>
                                    <Card.Text className="text-muted">{blog.content.slice(0, 100)}...</Card.Text>
                                    <Button variant="primary" onClick={() => handleViewBlog(blog.blogId)}>
                                        Read More
                                    </Button>
                                </Card.Body>

                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
            <Footer />
        </>
    );
};

export default Blog;