import React from 'react';
import { Outlet } from 'react-router-dom';
import ManageConstructor from './ManageConstructor/ManageConstructor';

const MainLayoutConstructor = () => {
    return (
        <div style={{ display: 'flex' }}>
            <ManageConstructor />
            <div style={{ marginLeft: '5px', padding: '20px', flex: 1 }}>
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayoutConstructor;
