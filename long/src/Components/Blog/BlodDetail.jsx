import React, { useState } from 'react';
import { Container, Card, Form, Button, ListGroup, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import './BlogDetail.module.css';
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
        description: `Koi ponds have become a popular addition to residential backyards, offering tranquility and beauty in outdoor spaces. This design seamlessly integrates natural stones, water lilies, and underwater lighting, creating a serene atmosphere. Koi ponds not only enhance aesthetic appeal but also promote relaxation through the calming effect of flowing water. This particular design is ideal for small and large gardens alike, as the layout is customizable based on the available space. The pond’s depth is perfect for koi, allowing them to thrive in a balanced ecosystem. The addition of seating around the pond invites guests to spend time in nature, providing a unique entertainment space for gatherings.`,
        comments: [
            { text: 'Amazing design!', userImage: userImages[0] },
            { text: 'I want this in my garden!', userImage: userImages[1] },
            { text: 'So relaxing to look at!', userImage: userImages[2] },
            { text: 'Perfect for meditation!', userImage: userImages[0] },
            { text: 'A masterpiece!', userImage: userImages[1] },
            // Additional comments...
        ],
    }, {
        id: 2,
        title: 'DIY Koi Pond Installation',
        image: KoiPond2,
        description: `Building a koi pond in your backyard is a rewarding DIY project. This guide provides a step-by-step process on everything from digging and lining the pond to selecting koi-friendly plants.`,
        comments: [
            { text: 'Great guide for beginners!', userImage: userImages[0] },
            { text: 'Easy to follow!', userImage: userImages[1] },
        ],
        views: 200, // Added views property
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
        views: 120, // Added views property
    },
];
// Additional sample blogs


const BlogDetail = () => {
    const { id } = useParams();
    const blog = blogs.find((blog) => blog.id === parseInt(id));
    const [comments, setComments] = useState(blog.comments);
    const [newComment, setNewComment] = useState('');

    const handleAddComment = () => {
        if (newComment.trim()) {
            const randomImage = userImages[Math.floor(Math.random() * userImages.length)];
            setComments([...comments, { text: newComment.trim(), userImage: randomImage }]);
            setNewComment('');
        }
    };

    return (
        <>
            <Navbar />
            <Container className="mt-5">
                <Card className="blog-detail-card border-0 shadow-sm p-4">
                    <Card.Body>
                        <Card.Title className="display-5 mb-3">{blog.title}</Card.Title>
                        <Card.Text className="text-muted mb-4" style={{ lineHeight: '1.6' }}>
                            {blog.description}
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
            <Footer/>
        </>
    );
};

export default BlogDetail;
