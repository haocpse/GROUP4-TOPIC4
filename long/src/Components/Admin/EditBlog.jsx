import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';
import axios from 'axios';

const EditBlog = () => {
    const { id } = useParams(); // Get blog ID from URL
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);
    const [formData, setFormData] = useState({
        title: '',
        image: '',
        description: '',
        status: '',
    });

    // Fetch blog data from API based on id
    useEffect(() => {
        const fetchBlog = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/updateBlog/${id}`);
                const { title, image, description, status } = response.data;
                setBlog(response.data);
                setFormData({ title, image, description, status });
            } catch (error) {
                alert("Blog not found!");
                navigate('/'); // Redirect to homepage if blog not found
            }
        };

        fetchBlog();
    }, [id, navigate]);

    // Handle form input change
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`http://localhost:8080/updateBlog/${id}`, formData);
            alert("Blog updated successfully!");
            navigate('/'); // Redirect to main page after updating
        } catch (error) {
            alert("Failed to update blog. Please try again.");
        }
    };

    if (!blog) {
        return <div>Loading...</div>; // Display loading until data is fetched
    }

    return (
        <Container className="mt-4">
            <h2>Edit Blog: {formData.title}</h2>
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
                        <Form.Group controlId="formImage" className="mt-3 mt-md-0">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control
                                type="text"
                                name="image"
                                value={formData.image}
                                onChange={handleChange}
                                required
                            />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId="formDescription" className="mt-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={5}
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                    />
                </Form.Group>

                <Row className="mt-3">
                    <Col md={6}>
                        <Form.Group controlId="formStatus">
                            <Form.Label>Status</Form.Label>
                            <Form.Select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                required
                            >
                                <option value="Published">Published</option>
                                <option value="Draft">Draft</option>
                            </Form.Select>
                        </Form.Group>
                    </Col>

                    <Col md={6} className="mt-3 mt-md-0 d-flex justify-content-end align-items-center">
                        <Button variant="primary" type="submit">
                            Update Blog
                        </Button>
                    </Col>
                </Row>
            </Form>
        </Container>
    );
};

export default EditBlog;
