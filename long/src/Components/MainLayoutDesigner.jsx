import React from 'react';
import { Outlet } from 'react-router-dom';
import ManageDesigner from './ManageDesigner/ManageDesigner';

const MainLayoutDesigner = () => {
    return (
        <div style={{ display: 'flex' }}>
            <ManageDesigner />
            <div style={{ marginLeft: '5px', padding: '20px', flex: 1 }}>
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayoutDesigner;
