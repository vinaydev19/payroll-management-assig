import React from 'react';
import Header from '../components/dashboard/Header';
import { Outlet } from 'react-router-dom';

function MainLayout() {
    return (
        <div className="min-h-screen bg-gray-100">
            <Header />
            <main className="p-6">
                <Outlet />
            </main>
        </div>
    );
}

export default MainLayout;
