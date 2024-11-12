// src/Dashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Pie, Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement, PointElement, LineElement);


// Component UserStatistics
const UserStatistics = ({ actualMakeProjectPercentage, cancelPercentage, returnPercentage }) => {
    // Dữ liệu và cấu hình cho biểu đồ
    const chartData = {
        labels: ['Actual Make Project', 'Cancel', 'Return'],
        datasets: [
            {
                label: 'Percentage',
                data: [actualMakeProjectPercentage, cancelPercentage, returnPercentage],
                backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(255, 99, 132, 0.6)', 'rgba(75, 192, 192, 0.6)'],
            },
        ],
    };

    const chartOptions = {
        responsive: true,
        plugins: {
            legend: { display: false },
            title: { display: true, text: 'User Statistics' },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                title: { display: true, text: 'Percentage (%)' },
            },
        },
    };

    return (
        <div className="p-3 mb-3 border rounded shadow-sm bg-light">
            <Bar data={chartData} options={chartOptions} />
        </div>
    );
};




// Component FinanceStatistics
const FinanceStatistics = () => {
    const [isMonthly, setIsMonthly] = useState(true);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
    const [monthlyRevenuesByYear, setMonthlyRevenuesByYear] = useState({});
    const [yearlyRevenues, setYearlyRevenues] = useState([]);
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalRevenueByYear, setTotalRevenueByYear] = useState(0);
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();// Lấy tháng hiện tại (0-11)


    const formattedTotalRevenue = new Intl.NumberFormat('vi-VN', {
        style: 'currency',
        currency: 'VND',
    }).format(totalRevenue);

    useEffect(() => {
        const fetchMonthlyRevenue = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/dashboard/monthlyRevenue?year=${selectedYear}`);
                const monthlyData = response.data.data.monthlyRevenueInfoDashboardResponseList.reduce((acc, item) => {
                    acc[item.month - 1] = item.revenue; // Adjust month index (0-11)
                    return acc;
                }, Array(12).fill(0));
                setTotalRevenueByYear(response.data.data.total)
                setMonthlyRevenuesByYear(prev => ({ ...prev, [selectedYear]: monthlyData }));
            } catch (error) {
                console.error("Error fetching monthly revenue:", error);
            }
        };
        fetchMonthlyRevenue();
    }, [selectedYear]);

    // Fetch yearly revenue data when the component mounts
    useEffect(() => {
        const fetchYearlyRevenue = async () => {
            try {
                const response = await axios.get('http://localhost:8080/dashboard/yearlyRevenue');
                const yearlyData = response.data.data.yearlyRevenueInfoDashboardResponseList.map(item => item.totalRevenue);
                setYearlyRevenues(yearlyData);
                setTotalRevenue(response.data.data.total);
            } catch (error) {
                console.error("Error fetching yearly revenue:", error);
            }
        };
        fetchYearlyRevenue();
    }, []);

    // Cấu hình dữ liệu cho biểu đồ doanh thu hàng tháng
    const monthlyData = {
        labels: Array.from({ length: 12 }, (_, i) => `Month ${i + 1}`),
        datasets: [
            {
                label: 'Monthly Revenue',
                data: selectedYear === currentYear
                    ? monthlyRevenuesByYear[selectedYear]?.slice(0, currentMonth + 1).concat(Array(11 - currentMonth).fill(0))
                    : monthlyRevenuesByYear[selectedYear] || Array(12).fill(0),
                backgroundColor: 'rgba(106, 90, 205)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    const yearlyData = {
        labels: yearlyRevenues.map((_, i) => `Year ${currentYear - yearlyRevenues.length + i + 1}`),
        datasets: [
            {
                label: 'Yearly Revenue',
                data: yearlyRevenues,
                backgroundColor: 'rgba(106, 90, 205)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
        ],
    };

    const calculateTotalRevenueForSelectedYear = () => {
        const yearIndex = currentYear - selectedYear;
        return yearIndex >= 0 && yearIndex < yearlyRevenues.length ? yearlyRevenues[yearIndex] : 0;
    };
    const totalRevenueForSelectedYear = calculateTotalRevenueForSelectedYear();

    const toggleDisplay = () => {
        setIsMonthly(prev => !prev);
    };

    return (
        <div className="p-3 mb-3 border rounded shadow-sm bg-light row">
            {/* Input để chọn năm */}
            {isMonthly && (
                <div className="col-md-12 mb-3 text-center">
                    <label htmlFor="yearSelect" style={{ marginRight: '10px' }}>Select Year:</label>
                    <input
                        type="number"
                        id="yearSelect"
                        value={selectedYear}
                        onChange={(e) => setSelectedYear(e.target.value)}
                        min="2020" // Giới hạn năm bắt đầu
                        max={currentYear} // Giới hạn năm là năm hiện tại
                        className="form-control"
                        style={{ width: '200px', display: 'inline-block' }}
                    />
                </div>
            )}

            {/* Biểu đồ doanh thu */}
            {isMonthly ? (
                <div className='col-11'>
                    <div className="col-md-6 mb-3 text-center">
                        <div className="p-4 border rounded" style={{ backgroundColor: '#e7f3fe', color: '#0c5460', fontSize: '1.5rem', fontWeight: 'bold' }}>
                            <strong>Filtered Total Revenue for {selectedYear}:</strong> {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(totalRevenueByYear)}
                        </div>
                    </div>

                    <h6>Monthly Revenue</h6>
                    <Bar data={monthlyData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
                </div>
            ) : (
                <div className='col-11'>
                    <div className="col-md-6 mb-3 text-center">
                        <div className="p-4 border rounded" style={{ backgroundColor: '#e7f3fe', color: '#0c5460', fontSize: '1.5rem', fontWeight: 'bold' }}>
                            <strong>Total Revenue:</strong> {formattedTotalRevenue} <br />
                        </div>
                    </div>

                    <h6>Yearly Revenue</h6>
                    <Bar data={yearlyData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
                </div>
            )}
            <div className="col-12 mt-5">
                <button
                    onClick={toggleDisplay}
                    className={`btn ${isMonthly ? 'btn-success' : 'btn-outline-success'} mb-3`}
                    style={{ transition: 'all 0.3s ease' }}
                >
                    <i className={`fas ${isMonthly ? 'fa-calendar-alt' : 'fa-calendar'} mr-2`}></i>
                    {isMonthly ? 'Show Yearly Revenue' : 'Show Monthly Revenue'}
                </button>
            </div>
        </div>
    );
};

// Component ProjectStatistics
const ProjectStatistics = () => {
    const [isShowingCurrentProgress, setIsShowingCurrentProgress] = useState(false);
    const [projectData, setProjectData] = useState({
        totalProjects: 0,
        successPercentage: 0,
        failedPercentage: 0,
        inProgressPercentage: 0,
        packageData: [],
    });
    const [projects, setProjects] = useState([]);
    const [inProgressProjects, setInProgressProjects] = useState([]);
    const [statusList, setStatusList] = useState([]) // New state
    const currentYear = new Date().getFullYear();
    const currentMonth = new Date().getMonth();// Lấy tháng hiện tại (0-11)
    const [yearlyRequests, setYearlyRequests] = useState([]);
    const [monthlyRequests, setMonthlyRequests] = useState([]);
    const [isYearlyView, setIsYearlyView] = useState(true);
    const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });


    const fetchProjectYearData = async () => {
        try {

            const response = await axios.get('http://localhost:8080/dashboard/projects/year');
            setProjectData({
                totalProjects: response.data.data.totalProjects,
                successPercentage: response.data.data.successPercentage * 100,
                failedPercentage: response.data.data.failedPercentage * 100,
                inProgressPercentage: response.data.data.inProgressPercentage * 100,
                packageData: response.data.data.packageDashboardResponses,
            });
            setYearlyRequests(response.data.data.projectInfoBaseTimeResponses);
        } catch (error) {
            console.error("Error fetching project data:", error);
        }
    };

    const fetchProjectMonthData = async () => {
        try {
            const response = await axios.get(`http://localhost:8080/dashboard/projects/month?year=${selectedYear}`);
            setProjectData({
                totalProjects: response.data.data.totalProjects,
                successPercentage: response.data.data.successPercentage * 100,
                failedPercentage: response.data.data.failedPercentage * 100,
                inProgressPercentage: response.data.data.inProgressPercentage * 100,
                packageData: response.data.data.packageDashboardResponses,
            });
            setMonthlyRequests(response.data.data.projectInfoBaseTimeResponses);
            const monthlyData = Array(12).fill(0); // Khởi tạo mảng cho 12 tháng

            // Lấy dữ liệu số yêu cầu từ projectInfoBaseTimeResponses
            response.data.data.projectInfoBaseTimeResponses.forEach(item => {
                const monthIndex = item.time - 1; // Thay đổi từ 1-12 thành 0-11 cho chỉ số mảng
                monthlyData[monthIndex] = item.numberOfRequest; // Lưu số yêu cầu cho từng tháng
            });

            // Cập nhật cột x với tên tháng
            const labels = [
                'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
                'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
            ];
            console.log(monthlyData)
            const chartData = {
                labels: labels,
                datasets: [
                    {
                        label: 'Monthly Requests',
                        data: monthlyData,
                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    },
                ],
            };

            setChartData(chartData);

        } catch (error) {
            console.error("Error fetching project data:", error);
        }
    };

    useEffect(() => {
        // Initial fetch for project dashboard data
        if (isYearlyView) {
            fetchProjectYearData();
        } else {
            fetchProjectMonthData();
        }
    }, [isYearlyView, selectedYear]);

    // New function to fetch in-progress projects
    const fetchInProgressProjects = async () => {
        try {
            const response = await axios.get('http://localhost:8080/dashboard/inProgressProjects');
            setInProgressProjects(response.data.data.projectInfoDashboardResponseList);
            setStatusList(response.data.data.statusList)
        } catch (error) {
            console.error("Error fetching in-progress projects:", error);
        }
    };

    // Toggle display and fetch in-progress data if needed
    const toggleDisplay = () => {
        if (!isShowingCurrentProgress) {
            fetchInProgressProjects();
        }
        setIsShowingCurrentProgress(prev => !prev);
    };

    const pieData = {
        labels: ['Success', 'Fail', 'In Progress'],
        datasets: [{
            data: [
                projectData.successPercentage,
                projectData.failedPercentage,
                projectData.inProgressPercentage,
            ],
            backgroundColor: [
                'rgba(135, 201, 71)',
                'rgba(255, 99, 132, 0.6)',
                'rgba(255, 206, 86, 0.6)',
            ],
            borderWidth: 1,
        }]
    };

    const barPackageData = {
        labels: projectData.packageData.map(pkg => pkg.packageType),
        datasets: [{
            label: 'Use Percentage',
            data: projectData.packageData.map(pkg => pkg.usePercentage * 100),
            backgroundColor: 'rgba(75, 192, 192, 0.6)',
        }]
    };

    const yearlyData = {
        labels: yearlyRequests.map((_, i) => `Year ${currentYear - yearlyRequests.length + i + 1}`),
        datasets: [
            {
                label: 'Yearly Revenue',
                data: yearlyRequests.map(request => request.numberOfRequest),
                backgroundColor: 'rgba(106, 90, 205)',
                borderColor: 'rgba(153, 102, 255, 1)',
                borderWidth: 1,
            },
        ],
    };

    const toggleDisplayData = () => {
        setIsYearlyView(prev => !prev);
    };

    return (
        <div className="p-3 mb-3 border rounded shadow-sm bg-light row">
            <div className='d-flex'>
                <div className="col-md-2 mb-3 text-center">
                    <div className="p-2 border rounded" style={{ backgroundColor: '#e7f3fe', color: '#0c5460', fontSize: '1.5rem', fontWeight: 'bold' }}>
                        <strong>Total Requests:</strong> <span>{projectData.totalProjects}</span>
                    </div>
                </div>
                <div className='d-flex'>
                    <button
                        onClick={toggleDisplayData}
                        className={`btn ${isYearlyView ? 'btn-success' : 'btn-outline-success'} mb-3`}
                        style={{ transition: 'all 0.3s ease' }}
                    >
                        <i className={`fas ${isYearlyView ? 'fa-calendar-alt' : 'fa-calendar'} mr-2`}></i>
                        {isYearlyView ? 'Yearly' : 'Monthly'}
                    </button>
                </div>
                {!isYearlyView ? (
                    <div className='d-flex align-items-center ml-3'>
                        <input
                            type="number"
                            className="form-control"
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            min="2000"
                            max={currentYear}
                            placeholder="Enter year"
                            style={{ width: '120px' }}
                        />
                    </div>) : (<div></div>)
                }
            </div>
            {isShowingCurrentProgress ? (
                <div className="col-md-12">
                    <h5 className="mb-5" style={{ color: '#0c5460' }}>Current Project Progress</h5>
                    {inProgressProjects.map((project, index) => (
                        <div key={index} className="mb-5">
                            <h6>{project.nameOfOrder}</h6>
                            <div className="progress mb-2" style={{ height: '30px', display: 'flex', gap: '3px' }}>
                                {statusList.map((status, idx) => {
                                    // Determine the color for each status based on its relation to the current status
                                    let statusClass = "bg-secondary"; // Default: Upcoming (grey)
                                    if (idx < statusList.indexOf(project.status)) {
                                        statusClass = "bg-success"; // Completed (green)
                                    } else if (status === project.status) {
                                        statusClass = "bg-info"; // Current (blue)
                                    }

                                    return (
                                        <div
                                            key={idx}
                                            className={`progress-bar ${statusClass}`}
                                            style={{
                                                width: `${100 / statusList.length}%`,
                                                color: 'white',
                                                textAlign: 'center',
                                                fontWeight: 'bold',
                                            }}
                                        >
                                            {status}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>
            ) : (
                <div className="row">
                    {isYearlyView ? (
                        <div className='col-7 d-flex align-items-end'>
                            <Bar data={yearlyData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
                        </div>) : (
                        <div className='col-7 d-flex align-items-end'>
                            <Bar data={chartData} options={{ responsive: true, plugins: { legend: { position: 'top' } } }} />
                        </div>
                    )}
                    <div className='col-1'></div>
                    <div className='col-4 row d-flex justify-content-end'>
                        <div className="col-md-10 mb-5">
                            <Pie data={pieData} options={{ responsive: true }} />
                        </div>
                        <div className="col-md-10 d-flex align-items-end">
                            <Bar data={barPackageData} options={{
                                responsive: true,
                                scales: {
                                    y: {
                                        max: 100,
                                    }
                                }
                            }} />
                        </div>
                    </div>
                </div>
            )}

            <div className="col-12 mt-5">
                <button
                    onClick={toggleDisplay}
                    className={`btn ${isShowingCurrentProgress ? 'btn-outline-primary' : 'btn-primary'} mb-3`}
                    style={{ transition: 'all 0.3s ease' }}
                >
                    {isShowingCurrentProgress ? 'Show Overview' : 'Show Current Progress'}
                </button>
            </div>
        </div>
    );
};

// Main Dashboard Component
const Dashboard = () => {
    // Trạng thái để theo dõi phần nào đang được hiển thị
    const [activeTab, setActiveTab] = useState('projects');

    // Dữ liệu giả lập
    const userStats = {
        actualMakeProjectPercentage: 75,
        cancelPercentage: 10,
        returnPercentage: 15,
    };

    const renderActiveTab = () => {
        switch (activeTab) {
            case 'projects':
                return <ProjectStatistics />;
            case 'finance':
                return <FinanceStatistics />;
            case 'users':
                return <UserStatistics {...userStats} />;
            default:
                return null;
        }
    };

    return (
        <div className="mt-4">
            <h1>Dashboard</h1>
            {/* Navbar */}

            <div className="container-fluid">
                <button className={`btn ${activeTab === 'projects' ? 'btn-outline-primary' : 'btn-light'}`} onClick={() => setActiveTab('projects')}>
                    Project Statistics
                </button>
                <button className={`btn ${activeTab === 'finance' ? 'btn-outline-primary' : 'btn-light'}`} onClick={() => setActiveTab('finance')}>
                    Finance Statistics
                </button>
                <button className={`btn ${activeTab === 'users' ? 'btn-outline-primary' : 'btn-light'}`} onClick={() => setActiveTab('users')}>
                    User Statistics
                </button>
            </div>

            <div className="d-flex flex-column">
                <div className="mb-4 col-12">
                    {renderActiveTab()}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
