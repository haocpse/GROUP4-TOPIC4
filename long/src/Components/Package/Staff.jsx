import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Staff = () => {
    const [formData, setFormData] = useState({
        staffName: '',
        username: '',
        password: '',
        role: '',
    });
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const [staffList, setStaffList] = useState([]);
    const [isCreating, setIsCreating] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setMessage('');

        try {
            const response = await axios.post('http://localhost:8080/staff', formData, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Attach token
                }
            });
            setMessage(`Staff registered successfully: ${response.data.data.username}`);
            setFormData({
                staffName: '',
                username: '',
                password: '',
                role: '',
            });
            fetchStaffList();
        } catch (error) {
            setMessage('Failed to register staff. Please try again.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchStaffList = async () => {
        try {
            const response = await axios.get('http://localhost:8080/staffs', {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`, // Attach token
                }
            });
            setStaffList(response.data.data);
        } catch (error) {
            console.error('Failed to fetch staff list:', error);
        }
    };

    useEffect(() => {
        fetchStaffList();
    }, []);

    return (
        <div className="container mt-5">
            <h2 className="text-center mb-4">Staff Management</h2>
            {message && <div className="alert alert-info text-center">{message}</div>}
            <div className="text-center mb-3">
                <button
                    className="btn btn-secondary"
                    onClick={() => setIsCreating(!isCreating)}
                >
                    {isCreating ? 'Cancel' : 'Create New Staff'}
                </button>
            </div>

            {isCreating && (
                <div className="card shadow-sm p-4 mb-5">
                    <form onSubmit={handleSubmit}>
                        <h5 className="mb-4 text-center">Add New Staff Member</h5>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="staffName" className="form-label">Staff Name</label>
                                <input
                                    type="text"
                                    id="staffName"
                                    name="staffName"
                                    className="form-control rounded-pill"
                                    value={formData.staffName}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="username" className="form-label">Username</label>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    className="form-control rounded-pill"
                                    value={formData.username}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        </div>
                        <div className="row mb-3">
                            <div className="col-md-6">
                                <label htmlFor="password" className="form-label">Password</label>
                                <input
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="form-control rounded-pill"
                                    value={formData.password}
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            <div className="col-md-6">
                                <label htmlFor="role" className="form-label">Role</label>
                                <select
                                    id="role"
                                    name="role"
                                    className="form-select rounded-pill"
                                    value={formData.role}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="" disabled>Select Role</option>
                                    <option value="CONSULTANT">Consultant</option>
                                    <option value="DESIGNER">Designer</option>
                                    <option value="CONSTRUCTOR">Constructor</option>
                                    <option value="MANAGER">Manager</option>
                                </select>
                            </div>
                        </div>
                        <div className="text-center">
                            <button type="submit" className="btn btn-primary rounded-pill" disabled={loading}>
                                {loading ? 'Creating...' : 'Create Staff'}
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <h3 className="text-center mt-5">Staff Members</h3>
            {staffList.length === 0 ? (
                <p className="text-center">No staff members found.</p>
            ) : (
                <div className="table-responsive">
                    <table className="table table-hover mt-3 shadow-sm">
                        <thead className="table-secondary">
                            <tr>
                                <th>Staff ID</th>
                                <th>Staff Name</th>
                                <th>Role</th>
                            </tr>
                        </thead>
                        <tbody>
                            {staffList.map((staff) => (
                                <tr key={staff.staffId} className="align-middle">
                                    <td>{staff.staffId}</td>
                                    <td>{staff.staffName}</td>
                                    <td>{staff.role}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};

export default Staff;
