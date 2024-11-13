import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Form, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BlogCRUD = () => {
    const [blogs, setBlogs] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        content: '',
    });
    const [headerImages, setHeaderImages] = useState([]); // Array for storing selected images
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

    const handleImageChange = (e) => {
        const files = Array.from(e.target.files);
        setHeaderImages([]);

        // Read files and set them in state for preview
        files.forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setHeaderImages((prevImages) => [...prevImages, { file, preview: reader.result }]);
            };
            reader.readAsDataURL(file);
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const formDataObj = new FormData();
        formDataObj.append('title', formData.title);
        formDataObj.append('content', formData.content);

        // Append each image file to formData for uploading
        headerImages.forEach((image, index) => {
            formDataObj.append(`images`, image.file);
        });

        const apiUrl = isEditing ? `http://localhost:8080/updateBlog/${id}` : 'http://localhost:8080/createBlog';
        const requestMethod = isEditing ? axios.put : axios.post;

        requestMethod(apiUrl, formDataObj, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        })
            .then(() => {
                alert(`Blog ${isEditing ? 'updated' : 'created'} successfully!`);
                fetchBlogs();
                setFormData({ title: '', content: '' });
                setHeaderImages([]);
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
                    content: response.data.data.content,
                });
                setHeaderImages(response.data.data.headerImages.map((url) => ({ preview: url })));
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
                            <Form.Group controlId="formHeaderImages" className="mt-3 mt-md-0">
                                <Form.Label>Upload Header Images</Form.Label>
                                <Form.Control
                                    type="file"
                                    multiple
                                    onChange={handleImageChange}
                                    required
                                />
                            </Form.Group>
                        </Col>
                    </Row>

                    <Row className="mt-3">
                        <Col>
                            <Form.Group controlId="formContent">
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
                        </Col>
                    </Row>

                    <Row className="mt-3">
                        <Col>
                            <h5>Image Preview</h5>
                            <div className="d-flex flex-wrap">
                                {headerImages.map((image, index) => (
                                    <Image
                                        key={index}
                                        src={image.preview}
                                        alt={`preview-${index}`}
                                        thumbnail
                                        className="me-2 mb-2"
                                        style={{ width: '150px', height: '150px' }}
                                    />
                                ))}
                            </div>
                        </Col>
                    </Row>

                    <Row className="mt-3">
                        <Col className="d-flex justify-content-end">
                            <Button variant="primary" type="submit">
                                {isEditing ? 'Update Blog' : 'Create Blog'}
                            </Button>
                            <Button variant="secondary" className="ms-2" onClick={() => { setIsCreating(false); setIsEditing(false); setHeaderImages([]); }}>
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
                                <Card.Img variant="top" src={blog.headerImages[0] || 'default-image.jpg'} />
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
