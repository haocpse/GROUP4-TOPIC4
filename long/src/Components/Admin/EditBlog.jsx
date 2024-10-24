import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Form, Button, Row, Col } from 'react-bootstrap';

const EditBlog = () => {
    const { id } = useParams(); // Lấy ID blog từ URL
    const navigate = useNavigate();
    const [blog, setBlog] = useState(null);

    // Mock dữ liệu với description
    const mockBlogs = [
        {
            id: 1,
            title: "Blog 1",
            image: "https://via.placeholder.com/150",
            views: 120,
            comments: 15,
            status: "Published",
            description: "This is the description for Blog 1.",
        },
        {
            id: 2,
            title: "Blog 2",
            image: "https://via.placeholder.com/150",
            views: 80,
            comments: 5,
            status: "Draft",
            description: "This is the description for Blog 2.",
        },
        {
            id: 3,
            title: "Blog 3",
            image: "https://via.placeholder.com/150",
            views: 95,
            comments: 12,
            status: "Published",
            description: "This is the description for Blog 3.",
        },
    ];

    // Fetch blog data based on id
    useEffect(() => {
        const foundBlog = mockBlogs.find(blog => blog.id === parseInt(id));
        if (foundBlog) {
            setBlog(foundBlog);
        } else {
            alert("Blog not found!");
            navigate('/'); // Điều hướng về trang chủ nếu không tìm thấy blog
        }
    }, [id, navigate]);

    // Xử lý khi form được submit
    const handleSubmit = (e) => {
        e.preventDefault();
        alert("Blog updated successfully!");
        navigate('/'); // Điều hướng về trang chính sau khi cập nhật
    };

    if (!blog) {
        return <div>Loading...</div>; // Hiển thị loading khi chưa có dữ liệu
    }

    return (
        <Container className="mt-4">
            <h2>Edit Blog: {blog.title}</h2>
            <Form onSubmit={handleSubmit}>
                <Row>
                    <Col md={6}>
                        <Form.Group controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control type="text" defaultValue={blog.title} required />
                        </Form.Group>
                    </Col>

                    <Col md={6}>
                        <Form.Group controlId="formImage" className="mt-3 mt-md-0">
                            <Form.Label>Image URL</Form.Label>
                            <Form.Control type="text" defaultValue={blog.image} required />
                        </Form.Group>
                    </Col>
                </Row>

                <Form.Group controlId="formDescription" className="mt-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control as="textarea" rows={5} defaultValue={blog.description} required />
                </Form.Group>

                <Row className="mt-3">
                    <Col md={6}>
                        <Form.Group controlId="formStatus">
                            <Form.Label>Status</Form.Label>
                            <Form.Select defaultValue={blog.status}>
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
