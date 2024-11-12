import React, { useState, useEffect } from 'react';
import { Container, Card, Form, Button, ListGroup, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './BlogDetail.module.css';

const userImages = [
    '/path/to/default-image1.jpg',
    '/path/to/default-image2.jpg',
    '/path/to/default-image3.jpg'
];

const BlogDetail = () => {
    const { id } = useParams();
    const [blog, setBlog] = useState(null);
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

    // Fetch blog details from backend API
    useEffect(() => {
        axios.get(`http://localhost:8080/blog/${id}`) // Replace with actual backend API endpoint
            .then(response => {
                setBlog(response.data);
                setComments(response.data.comments || []);
            })
            .catch(error => console.error("Error fetching blog details:", error));
    }, [id]);

    const handleAddComment = () => {
        if (newComment.trim()) {
            const randomImage = userImages[Math.floor(Math.random() * userImages.length)];
            const updatedComments = [...comments, { text: newComment.trim(), userImage: randomImage }];
            setComments(updatedComments);
            setNewComment('');
        }
    };

    if (!blog) return <p>Loading...</p>;

    return (
        <>
            <Navbar />
            <Container className="mt-5">
                <Card className="blog-detail-card border-0 shadow-sm p-4">
                    <Card.Body>
                        <Card.Title className="display-5 mb-3">{blog.title}</Card.Title>
                        <Card.Text className="text-muted mb-4" style={{ lineHeight: '1.6' }}>
                            {blog.content}
                        </Card.Text>
                    </Card.Body>
                    <Image
                        src={blog.image}
                        alt={blog.title}
                        className="rounded img-fluid my-4 d-block mx-auto"
                    />
                    <Card.Footer className="pt-4 border-0">
                        <h5 className="mb-3">Comments</h5>
                        <ListGroup variant="flush" className="mb-3">
                            {comments.map((comment, index) => (
                                <ListGroup.Item key={index} className="px-0 border-bottom d-flex align-items-center">
                                    <Image
                                        src={comment.userImage}
                                        roundedCircle
                                        width={40}
                                        height={40}
                                        className="me-2"
                                    />
                                    <p className="mb-1">{comment.text}</p>
                                </ListGroup.Item>
                            ))}
                        </ListGroup>
                        <Form className="mt-3">
                            <Form.Group controlId="newComment" className="mb-2">
                                <Form.Control
                                    type="text"
                                    placeholder="Add a comment..."
                                    value={newComment}
                                    onChange={(e) => setNewComment(e.target.value)}
                                    className="rounded"
                                />
                            </Form.Group>
                            <Button
                                variant="primary"
                                onClick={handleAddComment}
                                className="px-4"
                                style={{ borderRadius: '20px' }}
                            >
                                Post Comment
                            </Button>
                        </Form>
                    </Card.Footer>
                </Card>
            </Container>
            <Footer />
        </>
    );
};

export default BlogDetail;
