import React, { useState, useEffect } from 'react';
import { Container, Card, Image } from 'react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import './BlogDetail.module.css';

const BlogDetail = () => {
    const { blogId } = useParams();  // Lấy blogId từ URL
    const [blog, setBlog] = useState(null);

    // Fetch blog details từ backend API
    useEffect(() => {
        console.log(blogId)
        axios.get(`http://localhost:8080/blogs/${blogId}`)
            .then(response => {
                // Đảm bảo rằng bạn lấy đúng data từ response
                const blogData = response.data?.data;  // Lấy dữ liệu từ response.data.data
                if (blogData) {
                    setBlog(blogData);
                }
            })
            .catch(error => {
                console.error("Error fetching blog details:", error);
            });
    }, [blogId]); // Chạy lại khi blogId thay đổi

    // Nếu dữ liệu chưa được tải về, hiển thị Loading...
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
                        src={blog.headerImageUrl || blog.imageUrl}  // Sử dụng headerImageUrl hoặc imageUrl để hiển thị ảnh
                        alt={blog.title}
                        className="rounded img-fluid my-4 d-block mx-auto"
                    />
                    <Card.Footer className="pt-4 border-0">
                        <small className="text-muted">Created on {new Date(blog.date).toLocaleDateString()}</small> {/* date được sửa lại để phù hợp với dữ liệu trả về */}
                    </Card.Footer>
                </Card>
            </Container>
            <Footer />
        </>
    );
};

export default BlogDetail;