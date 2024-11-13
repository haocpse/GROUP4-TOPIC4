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
    const [staffList, setStaffList] = useState([]); // State for storing staff list
    const [isCreating, setIsCreating] = useState(false); // State to toggle creation form visibility

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
            const response = await axios.post('http://localhost:8080/staff', formData);
            setMessage(`Staff registered successfully: ${response.data.data.username}`);
            setFormData({
                staffName: '',
                username: '',
                password: '',
                role: '',
            });
            fetchStaffList(); // Refresh the staff list after adding a new staff member
        } catch (error) {
            setMessage('Failed to register staff. Please try again.');
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    // Fetch staff list function
    const fetchStaffList = async () => {
        try {
            const response = await axios.get('http://localhost:8080/staffs');
            // Assuming response.data.data is an array of StaffResponse objects
            setStaffList(response.data.data);
        } catch (error) {
            console.error('Failed to fetch staff list:', error);
        }
    };

    // useEffect to fetch staff list on component mount
    useEffect(() => {
        fetchStaffList();
    }, []);

    return (
        <div className="container mt-5">
            <h2>Staff List</h2>
            {message && <div className="alert alert-info">{message}</div>}
            <button
                className="btn btn-secondary mb-3"
                onClick={() => setIsCreating(!isCreating)}
            >
                {isCreating ? 'Cancel' : 'Create Staff'}
            </button>

            {isCreating && (
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="staffName" className="form-label">Staff Name:</label>
                        <input
                            type="text"
                            id="staffName"
                            name="staffName"
                            className="form-control"
                            value={formData.staffName}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            className="form-control"
                            value={formData.username}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password:</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            className="form-control"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="role" className="form-label">Role:</label>
                        <select
                            id="role"
                            name="role"
                            className="form-select"
                            value={formData.role}
                            onChange={handleChange}
                            required
                        >
                            <option value="" disabled>Select Role</option>
                            <option value="CONSULTANT">Consultant</option>
                            <option value="DESIGNER">Designer</option>
                            <option value="CONSTRUCTOR">Constructor</option>
                            <option value="MANAGER">Manager</option>
                            {/* Add more roles as needed */}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary" disabled={loading}>
                        {loading ? 'Creating...' : 'Create Staff'}
                    </button>
                </form>
            )}

            {/* Display Staff List */}
            <h3 className="mt-5">Staff Members</h3>
            {staffList.length === 0 ? (
                <p>No staff members found.</p>
            ) : (
                <table className="table mt-3">
                    <thead>
                        <tr>
                            <th>Staff ID</th>
                            <th>Staff Name</th>
                            <th>Role</th>
                        </tr>
                    </thead>
                    <tbody>
                        {staffList.map((staff) => (
                            <tr key={staff.staffId}>
                                <td>{staff.staffId}</td>
                                <td>{staff.staffName}</td>
                                <td>{staff.role}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
};

export default Staff;
