import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const BlogCRUD = () => {
    const [blogs, setBlogs] = useState([]);
    const [newBlog, setNewBlog] = useState({ title: '', content: '', image: '', thumbnail: '' });
    const navigate = useNavigate();

    // Fetch blogs from the backend API
    useEffect(() => {
        axios.get('/api/blogs') // Adjust this URL based on your backend setup
            .then((response) => setBlogs(response.data))
            .catch((error) => console.error("Error fetching blogs:", error));
    }, []);

    // Handle delete blog
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            axios.delete(`/api/blogs/${id}`)
                .then(() => setBlogs(blogs.filter(blog => blog.id !== id)))
                .catch((error) => console.error("Error deleting blog:", error));
        }
    };

    // Handle edit blog
    const handleEdit = (id) => {
        navigate(`/edit-blog/${id}`);
    };

    // Handle input change for the new blog form
    const handleChange = (e) => {
        const { name, value } = e.target;
        setNewBlog({ ...newBlog, [name]: value });
    };

    // Handle new blog submission
    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('/api/blogs', newBlog)
            .then((response) => setBlogs([...blogs, response.data]))
            .catch((error) => console.error("Error creating new blog:", error));
    };

    return (
        <Container fluid className="mt-4">
            <Row className="mb-3">
                <Col>
                    <h2>Blog Dashboard</h2>
                </Col>
            </Row>

            <Row>
                {blogs.map((blog) => (
                    <Col md={4} key={blog.id} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={blog.thumbnail} />
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
                    </Col>
                ))}
            </Row>

            <hr />

            {/* Form to upload a new blog */}
            <Row className="mt-4">
                <Col md={6}>
                    <h3>Create New Blog</h3>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group controlId="formTitle" className="mb-3">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                name="title"
                                value={newBlog.title}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formContent" className="mb-3">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as="textarea"
                                rows={5}
                                name="content"
                                value={newBlog.content}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formImage" className="mb-3">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control
                                type="text"
                                name="image"
                                value={newBlog.image}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formThumbnail" className="mb-3">
                            <Form.Label>Thumbnail URL</Form.Label>
                            <Form.Control
                                type="text"
                                name="thumbnail"
                                value={newBlog.thumbnail}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                        <Button variant="primary" type="submit">Upload Blog</Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};

export default BlogCRUD;
