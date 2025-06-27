import React from 'react';
import { Calendar } from '../ui/calendar';
import { ClockIcon } from 'lucide-react';
import employeeIcon from "../../assets/user_emp.png";
import attendanceIcon from "../../assets/db_attendance.png";
import paymentIcon from "../../assets/db_GPayment.png";
import paySheetIcon from "../../assets/db_Payslip.png";
import { Button } from '../ui/button';

const quickLinks = [
  { label: 'Employee Info', icon: employeeIcon },
  { label: 'Monthly Attendance', icon: attendanceIcon },
  { label: 'Generate Payment', icon: paymentIcon },
  { label: 'Pay Sheet', icon: paySheetIcon },
];

function Dashboard() {
  const [date, setDate] = React.useState(new Date());
  const [empIds, setEmpIds] = React.useState('');

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 p-4">
      {/* Left Section */}
      <div className="space-y-6 lg:col-span-2">
        {/* Quick Links */}
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-lg font-semibold mb-4">Quick Links</h2>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {quickLinks.map((link) => (
              <button
                key={link.label}
                className="flex flex-col items-center justify-center p-3 hover:bg-slate-100 rounded-lg transition"
              >
                <img src={link.icon} alt={link.label} className="w-12 h-12 mb-2" />
                <span className="text-sm text-gray-800 text-center">{link.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Salary Slip Printing */}
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-lg font-semibold mb-4">Print Salary-Slip</h2>
          <div className="flex flex-col sm:flex-row gap-3">
            <input
              type="text"
              value={empIds}
              onChange={(e) => setEmpIds(e.target.value)}
              placeholder="Enter Employee IDs"
              className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring focus:ring-blue-300"
            />
            <Button>Print</Button>
          </div>
          <p className="text-sm text-red-500 mt-2">
            Enter multiple employee IDs, separated by commas (,).
          </p>
        </div>

        {/* Notice Board */}
        <div className="bg-white rounded-xl shadow p-5">
          <h2 className="text-lg font-semibold mb-4">Notice Board</h2>
          <p className="text-gray-700">
            The Salary System is starting in the new web application, so be careful while doing entries...
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="space-y-6">
        <div className="bg-white rounded-xl shadow p-5 w-full">
          <h2 className="text-lg font-semibold mb-4">Date & Time</h2>
          <div className="flex items-center mb-4">
            <ClockIcon className="w-6 h-6 text-gray-600 mr-3" />
            <div>
              <p className="text-xl font-medium">
                {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
              <p className="text-gray-500 text-sm">
                {date.toLocaleDateString([], {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
          <div className="w-full overflow-x-auto">
            <div className="w-full min-w-[280px] max-w-[100%]">
              <Calendar mode="single" selected={date} onSelect={setDate} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
