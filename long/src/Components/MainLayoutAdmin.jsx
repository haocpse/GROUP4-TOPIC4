import React from 'react';
import { Outlet } from 'react-router-dom';
import ManageAdmin from './ManageAdmin/ManageAdmin';
const MainLayoutAdmin = () => {
    return (
        <div style={{ display: 'flex' }}>
            <ManageAdmin />
            <div style={{ marginLeft: '5px', padding: '20px', flex: 1 }}>
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayoutAdmin;
