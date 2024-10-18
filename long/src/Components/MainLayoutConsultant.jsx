import React from 'react';
import { Outlet } from 'react-router-dom';
import ManageConsultant from './ManageConsultant/ManageConsultant';

const MainLayoutConsultant = () => {
    return (
        <div style={{ display: 'flex' }}>
            <ManageConsultant />
            <div style={{ marginLeft: '5px', padding: '20px', flex: 1 }}>
                <Outlet />
            </div>
        </div>
    );
};

export default MainLayoutConsultant;
