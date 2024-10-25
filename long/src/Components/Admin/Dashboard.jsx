// import React, { useState, useEffect } from 'react';
// import { Container, Row, Col, Card, Dropdown, Table } from 'react-bootstrap';
// import { Bar, Pie, Line } from 'react-chartjs-2';
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, LineElement, PointElement, Title, Tooltip, Legend, PieController } from 'chart.js';
// import axios from 'axios';  // Sử dụng axios để gọi API
// import './Dashboard.css';

// // Register necessary components with Chart.js
// ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, LineElement, PointElement, Title, Tooltip, Legend, PieController);

// // Component Chart.js config
// const BarChart = ({ chartData }) => <Bar data={chartData} options={{ responsive: true }} />;
// const PieChart = ({ chartData }) => <Pie data={chartData} options={{ responsive: true }} />;
// const LineChart = ({ chartData }) => <Line data={chartData} options={{ responsive: true }} />;

// const Dashboard = () => {
//     const [visitors, setVisitors] = useState([]);
//     const [accounts, setAccounts] = useState([]);
//     const [constructions, setConstructions] = useState([]);
//     const [adminName, setAdminName] = useState('Admin Name');

//     // Gọi API để lấy dữ liệu từ backend
//     useEffect(() => {
//         // Lấy dữ liệu visitors từ backend
//         axios.get('/api/visitors')
//             .then(response => {
//                 setVisitors(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching visitors:', error);
//             });

//         // Lấy dữ liệu accounts từ backend
//         axios.get('/api/accounts')
//             .then(response => {
//                 setAccounts(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching accounts:', error);
//             });

//         // Lấy dữ liệu constructions từ backend
//         axios.get('/api/constructions')
//             .then(response => {
//                 setConstructions(response.data);
//             })
//             .catch(error => {
//                 console.error('Error fetching constructions:', error);
//             });

//         // Lấy thông tin admin từ backend
//         axios.get('/api/admin-info')
//             .then(response => {
//                 setAdminName(response.data.name);
//             })
//             .catch(error => {
//                 console.error('Error fetching admin info:', error);
//             });
//     }, []);

//     // Data for the charts
//     const visitorData = {
//         labels: visitors.map(v => v.date),
//         datasets: [
//             {
//                 label: 'Số người truy cập',
//                 data: visitors.map(v => v.count),
//                 backgroundColor: 'rgba(75, 192, 192, 0.6)',
//             },
//         ],
//     };

//     const accountData = {
//         labels: accounts.map(acc => acc.createdDate),
//         datasets: [
//             {
//                 label: 'Tài khoản mới',
//                 data: accounts.map(() => 1), // Giả định mỗi account là 1 điểm cho mục đích demo
//                 backgroundColor: 'rgba(153, 102, 255, 0.6)',
//             },
//         ],
//     };

//     const constructionData = {
//         labels: constructions.map(c => c.id),
//         datasets: [
//             {
//                 label: 'Công trình đang thi công',
//                 data: constructions.map(c => c.status === "In Progress" ? 1 : 0), // Số liệu nhị phân cho demo
//                 backgroundColor: 'rgba(255, 159, 64, 0.6)',
//             },
//         ],
//     };

//     const pieData = {
//         labels: ['Active', 'Inactive'],
//         datasets: [
//             {
//                 label: 'Trạng thái tài khoản',
//                 data: [
//                     accounts.filter(acc => acc.status === 'Active').length,
//                     accounts.filter(acc => acc.status === 'Inactive').length
//                 ],
//                 backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)']
//             }
//         ]
//     };

//     return (
//         <Container fluid className="mt-4">
//             {/* Title and Admin Name */}
//             <Row className="mb-3">
//                 <Col>
//                     <h2>Admin Dashboard</h2>
//                 </Col>
//                 <Col className="text-right">
//                     <Dropdown align="end">
//                         <Dropdown.Toggle variant="secondary" id="dropdown-basic">
//                             {adminName}
//                         </Dropdown.Toggle>
//                         <Dropdown.Menu>
//                             <Dropdown.Item href="#/profile">Profile</Dropdown.Item>
//                             <Dropdown.Item href="#/logout">Logout</Dropdown.Item>
//                         </Dropdown.Menu>
//                     </Dropdown>
//                 </Col>
//             </Row>

//             <Row>
//                 {/* Sidebar Menu */}
//                 <Col lg={2} className="bg-light p-3">
//                     <h5>Menu</h5>
//                     <ul className="list-unstyled">
//                         <li><a href="#/products" className="h6">Product</a></li>
//                         <li><a href="#/blogs" className="h6">Blog</a></li>
//                         <li><a href="#/accounts" className="h6">Account</a></li>
//                         <li><a href="#/constructions" className="h6">Construction</a></li>
//                     </ul>
//                 </Col>

//                 {/* Charts */}
//                 <Col lg={10}>
//                     <Row>
//                         <Col lg={4}>
//                             <Card className="mb-4">
//                                 <Card.Body>
//                                     <h5 className="card-title">Số Người Truy Cập</h5>
//                                     <BarChart chartData={visitorData} />
//                                 </Card.Body>
//                             </Card>
//                         </Col>

//                         <Col lg={4}>
//                             <Card className="mb-4">
//                                 <Card.Body>
//                                     <h5 className="card-title">Tài Khoản Hệ Thống</h5>
//                                     <PieChart chartData={pieData} />
//                                 </Card.Body>
//                             </Card>
//                         </Col>

//                         <Col lg={4}>
//                             <Card className="mb-4">
//                                 <Card.Body>
//                                     <h5 className="card-title">Công Trình Đang Thi Công</h5>
//                                     <LineChart chartData={constructionData} />
//                                 </Card.Body>
//                             </Card>
//                         </Col>
//                     </Row>

//                     {/* Content Section */}
//                     <Card className="mt-4">
//                         <Card.Body>
//                             <h5>Tài Khoản</h5>
//                             <Table striped bordered hover className="rounded-table">
//                                 <thead>
//                                     <tr>
//                                         <th>Loại Tài Khoản</th>
//                                         <th>Trạng Thái</th>
//                                         <th>Số Điện Thoại</th>
//                                         <th>Ngày Tạo</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {accounts.map((account, index) => (
//                                         <tr key={index}>
//                                             <td>{account.type}</td>
//                                             <td>
//                                                 <span className={`badge ${account.status === 'Active' ? 'bg-success' : 'bg-danger'}`}>
//                                                     {account.status}
//                                                 </span>
//                                             </td>
//                                             <td>{account.phone}</td>
//                                             <td>{account.createdDate}</td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </Table>

//                             <h5 className="mt-4">Tiến Độ Công Trình</h5>
//                             <Table striped bordered hover className="rounded-table">
//                                 <thead>
//                                     <tr>
//                                         <th>ID Công Trình</th>
//                                         <th>Ngày Bắt Đầu</th>
//                                         <th>Ngày Kết Thúc</th>
//                                         <th>Trạng Thái</th>
//                                     </tr>
//                                 </thead>
//                                 <tbody>
//                                     {constructions.map((construction, index) => (
//                                         <tr key={index}>
//                                             <td>{construction.id}</td>
//                                             <td>{construction.startDate}</td>
//                                             <td>{construction.endDate}</td>
//                                             <td>
//                                                 <span className={`badge ${construction.status === "In Progress" ? 'bg-success' : 'bg-danger'}`}>
//                                                     {construction.status}
//                                                 </span>
//                                             </td>
//                                         </tr>
//                                     ))}
//                                 </tbody>
//                             </Table>
//                         </Card.Body>
//                     </Card>
//                 </Col>
//             </Row>
//         </Container>
//     );
// };

// export default Dashboard;


import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, Dropdown, Table } from 'react-bootstrap';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, LineElement, PointElement, Title, Tooltip, Legend, PieController } from 'chart.js';
import './Dashboard.module.css'; // Import file CSS
import adminAvatar from '../Assests/admin_avt.jpg'; // Đường dẫn đến avatar admin

// Register necessary components with Chart.js
ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, LineElement, PointElement, Title, Tooltip, Legend, PieController);

// Component Chart.js config
const BarChart = ({ chartData }) => <Bar data={chartData} options={{ responsive: true }} />;
const PieChart = ({ chartData }) => <Pie data={chartData} options={{ responsive: true }} />;
const LineChart = ({ chartData }) => <Line data={chartData} options={{ responsive: true }} />;

const Dashboard = () => {
    const [visitors, setVisitors] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [constructions, setConstructions] = useState([]);
    const [adminName, setAdminName] = useState('Admin Name');

    // Mock data
    const mockVisitors = [
        { date: "2024-10-10", count: 50 },
        { date: "2024-10-11", count: 70 },
        { date: "2024-10-12", count: 65 },
        { date: "2024-10-13", count: 90 },
        { date: "2024-10-14", count: 100 }
    ];

    const mockAccounts = [
        { user: 'John Doe', type: 'Consultant', status: 'Active', phone: '1234567890', createdDate: "2024-09-10" },
        { user: 'Jane Smith', type: 'Manager', status: 'Active', phone: '0987654321', createdDate: "2024-09-11" },
        { user: 'Alice Brown', type: 'Customer', status: 'Inactive', phone: '1122334455', createdDate: "2024-09-12" },
        { user: 'Bob White', type: 'Constructor', status: 'Active', phone: '2233445566', createdDate: "2024-09-13" }
    ];

    const mockConstructions = [
        { name: "Công Trình A", startDate: "2024-10-01", endDate: "2024-10-30", status: "In Progress" },
        { name: "Công Trình B", startDate: "2024-09-15", endDate: "2024-10-15", status: "Completed" },
        { name: "Công Trình C", startDate: "2024-10-05", endDate: "2024-11-05", status: "In Progress" }
    ];

    const mockAdminInfo = { name: "John Doe" };

    // Simulate fetching data
    useEffect(() => {
        setVisitors(mockVisitors);
        setAccounts(mockAccounts);
        setConstructions(mockConstructions);
        setAdminName(mockAdminInfo.name);
    }, []);

    // Handle delete account
    const handleDelete = (index) => {
        const newAccounts = accounts.filter((_, i) => i !== index);
        setAccounts(newAccounts);
    };

    // Data for the charts
    const visitorData = {
        labels: visitors.map(v => v.date),
        datasets: [
            {
                label: 'Số người truy cập',
                data: visitors.map(v => v.count),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
            },
        ],
    };

    const accountData = {
        labels: accounts.map(acc => acc.createdDate),
        datasets: [
            {
                label: 'Tài khoản mới',
                data: accounts.map(acc => 1),
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
            },
        ],
    };

    const constructionData = {
        labels: constructions.map(c => c.startDate), // Ngày bắt đầu thi công làm nhãn cho trục X
        datasets: [
            {
                label: 'In Progress', // Trạng thái "In Progress"
                data: constructions.map(c => c.status === 'In Progress' ? 1 : 0), // Đếm các công trình đang thi công
                backgroundColor: 'rgba(255, 159, 64, 0.6)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 2,
            },
            {
                label: 'Completed', // Trạng thái "Completed"
                data: constructions.map(c => c.status === 'Completed' ? 1 : 0), // Đếm các công trình đã hoàn thành
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
            },
            {
                label: 'Other Status', // Các trạng thái khác nếu có
                data: constructions.map(c => (c.status !== 'In Progress' && c.status !== 'Completed') ? 1 : 0),
                backgroundColor: 'rgba(153, 102, 255, 0.6)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 2,
            }
        ],
    };


    const pieData = {
        labels: ['Active', 'Inactive'],
        datasets: [
            {
                label: 'Trạng thái tài khoản',
                data: [
                    accounts.filter(acc => acc.status === 'Active').length,
                    accounts.filter(acc => acc.status === 'Inactive').length
                ],
                backgroundColor: ['rgba(75, 192, 192, 0.6)', 'rgba(255, 99, 132, 0.6)']
            }
        ]
    };

    return (
        <Container fluid className="mt-4">
            {/* Title and Admin Name */}
            <Row className="mb-3">
                <Col>
                    <h2>Admin Dashboard</h2>
                </Col>
                <Col className="text-right">
                    <Dropdown align="end">
                        <Dropdown.Toggle variant="secondary" id="dropdown-basic">
                            <img src={adminAvatar} alt="Admin Avatar" style={{ width: '30px', borderRadius: '50%', marginRight: '5px' }} />
                            {adminName}
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item href="/profile">Profile</Dropdown.Item>
                            <Dropdown.Item href="/logout">Logout</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>

            <Row>
                {/* Sidebar Menu */}
                <Col lg={2} className="bg-light p-3 sidebar-menu shadow-sm">
                    <h5 className="mb-4">Menu</h5>
                    <div className="menu-cards">
                        {[
                            { name: 'Package', icon: 'box' }, // Icon cho Package
                            { name: 'Blog', icon: 'file-earmark-post' },
                            { name: 'Account', icon: 'person' },
                            { name: 'Construction', icon: 'tools' }, // Icon cho Construction
                        ].map((item, index) => (
                            <Card key={index} className="mb-2 menu-card">
                                <Card.Body className="d-flex align-items-center menu-item">
                                    <i className={`bi bi-${item.icon}`} style={{ fontSize: '20px', marginRight: '10px' }}></i>
                                    <a href={`/${item.name.toLowerCase()}`} className="text-decoration-none">{item.name}</a>
                                </Card.Body>
                            </Card>
                        ))}
                    </div>
                </Col>

                {/* Charts */}
                <Col lg={10}>
                    <Row>
                        <Col lg={4}>
                            <Card className="mb-4">
                                <Card.Body>
                                    <h5 className="card-title">Số Người Truy Cập</h5>
                                    <BarChart chartData={visitorData} />
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={4}>
                            <Card className="mb-4">
                                <Card.Body>
                                    <h5 className="card-title">Tài Khoản Hệ Thống</h5>
                                    <PieChart chartData={pieData} />
                                </Card.Body>
                            </Card>
                        </Col>

                        <Col lg={4}>
                            <Card className="mb-4">
                                <Card.Body>
                                    <h5 className="card-title">Công Trình thi công</h5>
                                    <LineChart chartData={constructionData} />
                                </Card.Body>
                            </Card>
                        </Col>

                    </Row>

                    {/* Content Section */}
                    <Card className="mt-4">
                        <Card.Body>
                            <h5>Tài Khoản</h5>
                            <Table striped bordered hover className="rounded-table">
                                <thead>
                                    <tr>
                                        <th>User</th>
                                        <th>Loại Tài Khoản</th>
                                        <th>Trạng Thái</th>
                                        <th>Số Điện Thoại</th>
                                        <th>Ngày Tạo</th>
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {accounts.map((account, index) => (
                                        <tr key={index}>
                                            <td>{account.user}</td>
                                            <td>{account.type}</td>
                                            <td>
                                                <span className={`badge ${account.status === 'Active' ? 'bg-success' : 'bg-danger'} pill-status`}>
                                                    {account.status}
                                                </span>
                                            </td>
                                            <td>{account.phone}</td>
                                            <td>{account.createdDate}</td>
                                            <td>
                                                <button onClick={() => handleDelete(index)} className="btn btn-danger btn-sm">Xóa</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>

                    {/* Constructions Section */}
                    <Card className="mt-4">
                        <Card.Body>
                            <h5>Công Trình</h5>
                            <Table striped bordered hover className="rounded-table">
                                <thead>
                                    <tr>
                                        <th>Tên Công Trình</th>
                                        <th>Ngày Bắt Đầu</th>
                                        <th>Ngày Kết Thúc</th>
                                        <th>Trạng Thái</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {constructions.map((construction, index) => (
                                        <tr key={index}>
                                            <td>{construction.name}</td>
                                            <td>{construction.startDate}</td>
                                            <td>{construction.endDate}</td>
                                            <td>
                                                <span className={`badge ${construction.status === 'In Progress' ? 'bg-warning' : 'bg-success'} pill-status`}>
                                                    {construction.status}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </Table>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    );
};

export default Dashboard;


