import React from 'react';
import Dashboard from '@/components/dashboard/Dashboard';

function DashBoardLayout() {
    return (
        <div className="min-h-screen w-full bg-gray-100 px-4 py-6 sm:px-6 lg:px-8">
            <div className="max-w-screen-2xl mx-auto">
                <Dashboard />
            </div>
        </div>
    );
}

export default DashBoardLayout;
