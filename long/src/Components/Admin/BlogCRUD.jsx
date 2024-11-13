import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BlogCRUD = () => {
    const [blogs, setBlogs] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        headerImageUrl: '',
        content: '',
    });
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const { id } = useParams();

    useEffect(() => {
        fetchBlogs();
    }, []);

    const fetchBlogs = () => {
        axios.get('http://localhost:8080/blogs')
            .then((response) => {
                setBlogs(response.data.data.blogList);
            })
            .catch((error) => console.error("Error fetching blogs:", error));
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const apiUrl = isEditing ? `http://localhost:8080/updateBlog/${id}` : 'http://localhost:8080/createBlog';
        const requestMethod = isEditing ? axios.put : axios.post;

        requestMethod(apiUrl, formData)
            .then(() => {
                alert(`Blog ${isEditing ? 'updated' : 'created'} successfully!`);
                fetchBlogs();
                setFormData({ title: '', headerImageUrl: '', content: '' });
                setIsCreating(false);
                setIsEditing(false);
            })
            .catch((error) => alert(`Failed to ${isEditing ? 'update' : 'create'} blog. Please try again.`));
    };

    const handleDelete = (blogId) => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            axios.delete(`http://localhost:8080/deleteBlog/${blogId}`)
                .then(() => {
                    setBlogs(blogs.filter(blog => blog.blogId !== blogId));
                })
                .catch((error) => console.error("Error deleting blog:", error));
        }
    };

    const startEditing = (blogId) => {
        axios.get(`http://localhost:8080/blogs/${blogId}`)
            .then((response) => {
                setFormData({
                    title: response.data.data.title,
                    headerImageUrl: response.data.data.headerImageUrl,
                    content: response.data.data.content,
                });
                setIsCreating(true);
                setIsEditing(true);
            })
            .catch((error) => {
                alert("Blog not found!");
                console.error("Error fetching blog:", error);
            });
    };

    return (
        <Container fluid className="mt-4">
            <Row className="mb-3">
                <Col>
                    <h2>{isCreating ? (isEditing ? 'Edit Blog' : 'Create New Blog') : 'Blog List'}</h2>
                    {!isCreating && (
                        <Button variant="success" onClick={() => setIsCreating(true)}>Create New Blog</Button>
                    )}
                </Col>
            </Row>

            {isCreating ? (
                <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col md={6}>
                            <Form.Group controlId="formTitle">
                                <Form.Label>Title</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>

                        <Col md={6}>
                            <Form.Group controlId="formHeaderImageUrl" className="mt-3 mt-md-0">
                                <Form.Label>Header Image URL</Form.Label>
                                <Form.Control
                                    type="text"
                                    name="headerImageUrl"
                                    value={formData.headerImageUrl}
                                    onChange={handleChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Form.Group controlId="formContent" className="mt-3">
                        <Form.Label>Content</Form.Label>
                        <Form.Control
                            as="textarea"
                            rows={5}
                            name="content"
                            value={formData.content}
                            onChange={handleChange}
                            required
                        />
                    </Form.Group>

                    <Row className="mt-3">
                        <Col className="d-flex justify-content-end align-items-center">
                            <Button variant="primary" type="submit">
                                {isEditing ? 'Update Blog' : 'Create Blog'}
                            </Button>
                            <Button variant="secondary" className="ms-2" onClick={() => { setIsCreating(false); setIsEditing(false); }}>
                                Cancel
                            </Button>
                        </Col>
                    </Row>
                </Form>
            ) : (
                <Row>
                    {blogs.map((blog) => (
                        <Col md={4} key={blog.blogId} className="mb-4">
                            <Card>
                                <Card.Img variant="top" src={blog.headerImageUrl || 'default-image.jpg'} />
                                <Card.Body>
                                    <Card.Title>{blog.title}</Card.Title>
                                    <p>{blog.content.slice(0, 100)}...</p>
                                    <small>Created on: {new Date(blog.dateCreated).toLocaleDateString()}</small>
                                </Card.Body>
                                <Card.Footer className="text-left">
                                    <Button variant="warning" size="sm" className="me-2" onClick={() => startEditing(blog.blogId)}>Edit</Button>
                                    <Button variant="danger" size="sm" onClick={() => handleDelete(blog.blogId)}>Delete</Button>
                                </Card.Footer>
                            </Card>
                        </Col>
                    ))}
                </Row>
            )}
        </Container>
    );
};

export default BlogCRUD;