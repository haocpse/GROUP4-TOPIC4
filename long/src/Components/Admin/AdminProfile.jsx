import React, { useState } from 'react';
import { Container, Row, Col, Card, Button, Modal, Form } from 'react-bootstrap';
import './AdminProfile.module.css'; // Custom CSS
import avt from '../Assests/admin_avt.jpg'; // Import ảnh cục bộ

const AdminProfile = () => {
    const [adminInfo, setAdminInfo] = useState({
        name: 'John Doe',
        email: 'admin@example.com',
        phone: '123-456-7890',
        avatar: avt // Sử dụng ảnh cục bộ làm avatar mặc định
    });

    const [showEditModal, setShowEditModal] = useState(false);
    const [editForm, setEditForm] = useState({ ...adminInfo });

    // Handle input change in form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditForm({ ...editForm, [name]: value });
    };

    // Save changes
    const handleSaveChanges = () => {
        setAdminInfo(editForm); // Update admin info
        setShowEditModal(false); // Close modal
    };

    // Open modal for editing
    const handleEdit = () => setShowEditModal(true);

    return (
        <Container fluid className="mt-4">
            <Row className="justify-content-center">
                <Col lg={8}>
                    <Card className="mb-4 profile-card shadow-lg rounded">
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center">
                                <div className="text-center">
                                    <h2 className="text-primary">Admin Profile</h2>
                                </div>
                                <Button variant="outline-primary" onClick={handleEdit}>
                                    Edit Admin
                                </Button>
                            </div>
                            <div className="text-center mt-4">
                                <img
                                    src={adminInfo.avatar}
                                    alt="Admin Avatar"
                                    className="profile-avatar img-fluid rounded-circle shadow"
                                    style={{ width: '150px', height: '150px', objectFit: 'cover' }}
                                />
                                <h4 className="mt-3 text-dark">{adminInfo.name}</h4>
                                <p className="text-muted">Email: {adminInfo.email}</p>
                                <p className="text-muted">Phone: {adminInfo.phone}</p>
                            </div>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Edit Modal */}
            <Modal show={showEditModal} onHide={() => setShowEditModal(false)} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Admin Info</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group controlId="formAdminName">
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                name="name"
                                value={editForm.name}
                                onChange={handleInputChange}
                                placeholder="Enter name"
                                className="shadow-sm"
                            />
                        </Form.Group>

                        <Form.Group controlId="formAdminEmail" className="mt-3">
                            <Form.Label>Email</Form.Label>
                            <Form.Control
                                type="email"
                                name="email"
                                value={editForm.email}
                                onChange={handleInputChange}
                                placeholder="Enter email"
                                className="shadow-sm"
                            />
                        </Form.Group>

                        <Form.Group controlId="formAdminPhone" className="mt-3">
                            <Form.Label>Phone</Form.Label>
                            <Form.Control
                                type="text"
                                name="phone"
                                value={editForm.phone}
                                onChange={handleInputChange}
                                placeholder="Enter phone number"
                                className="shadow-sm"
                            />
                        </Form.Group>

                        <Form.Group controlId="formAdminAvatar" className="mt-3">
                            <Form.Label>Avatar URL</Form.Label>
                            <Form.Control
                                type="text"
                                name="avatar"
                                value={editForm.avatar}
                                onChange={handleInputChange}
                                placeholder="Enter avatar URL"
                                className="shadow-sm"
                            />
                        </Form.Group>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-secondary" onClick={() => setShowEditModal(false)}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
};

export default AdminProfile;
