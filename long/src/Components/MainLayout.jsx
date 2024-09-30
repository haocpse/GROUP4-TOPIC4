import React from 'react';
import { Outlet } from 'react-router-dom';
import Manage from './Manage/Manage';

const MainLayout = () => {
    return (
        <div style={{ display: 'flex' }}>
            <Manage />
            <div style={{ marginLeft: '5px', padding: '20px', flex: 1 }}>
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayout;
