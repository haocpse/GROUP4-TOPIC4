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
import axios from 'axios';
import { Container, Row, Col, Card, Dropdown, Table } from 'react-bootstrap';
import { Bar, Pie, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, ArcElement, LineElement, PointElement, Title, Tooltip, Legend, PieController } from 'chart.js';
import './Dashboard.module.css';
import adminAvatar from '../Assests/admin_avt.jpg';

ChartJS.register(CategoryScale, LinearScale, BarElement, ArcElement, LineElement, PointElement, Title, Tooltip, Legend, PieController);

const Dashboard = () => {
    const [visitors, setVisitors] = useState([]);
    const [accounts, setAccounts] = useState([]);
    const [constructions, setConstructions] = useState([]);
    const [adminName, setAdminName] = useState('Admin Name');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const visitorsResponse = await axios.get('/api/visitors');
                const accountsResponse = await axios.get('/api/accounts');
                const constructionsResponse = await axios.get('/api/constructions');
                const adminInfoResponse = await axios.get('/api/admin');

                setVisitors(visitorsResponse.data);
                setAccounts(accountsResponse.data);
                setConstructions(constructionsResponse.data);
                setAdminName(adminInfoResponse.data.name);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };
        fetchData();
    }, []);

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

    const constructionData = {
        labels: constructions.map(c => c.startDate),
        datasets: [
            {
                label: 'In Progress',
                data: constructions.map(c => c.status === 'In Progress' ? 1 : 0),
                backgroundColor: 'rgba(255, 159, 64, 0.6)',
                borderColor: 'rgba(255, 159, 64, 1)',
                borderWidth: 2,
            },
            {
                label: 'Completed',
                data: constructions.map(c => c.status === 'Completed' ? 1 : 0),
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 2,
            }
        ],
    };

    return (
        <Container fluid className="mt-4">
            {/* Render your charts and tables */}
        </Container>
    );
};

export default Dashboard;

