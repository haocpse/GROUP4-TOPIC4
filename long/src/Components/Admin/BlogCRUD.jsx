import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Button, Badge } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

const Blog = () => {
    const [blogs, setBlogs] = useState([]);
    const navigate = useNavigate(); // Sử dụng để điều hướng

    // Mock data for blogs
    const mockBlogs = [
        {
            id: 1,
            title: "Blog 1",
            image: "https://via.placeholder.com/150",
            views: 120,
            comments: 15,
            status: "Published",
        },
        {
            id: 2,
            title: "Blog 2",
            image: "https://via.placeholder.com/150",
            views: 80,
            comments: 5,
            status: "Draft",
        },
        {
            id: 3,
            title: "Blog 3",
            image: "https://via.placeholder.com/150",
            views: 95,
            comments: 12,
            status: "Published",
        },
    ];

    // Simulate fetching data
    useEffect(() => {
        setBlogs(mockBlogs);
    }, []);

    // Xử lý xóa blog
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this blog?")) {
            const updatedBlogs = blogs.filter(blog => blog.id !== id);
            setBlogs(updatedBlogs); // Cập nhật danh sách blog
        }
    };

    // Chuyển hướng đến trang chỉnh sửa blog
    const handleEdit = (id) => {
        navigate(`/edit-blog/${id}`); // Điều hướng đến trang chỉnh sửa
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
    );
};

export default Blog;
