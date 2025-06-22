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
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left Side (2/3 width) */}
      <div className="space-y-6 lg:col-span-2">
        {/* Quick Links */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-3">Quick Links</h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {quickLinks.map((q) => (
              <button
                key={q.label}
                className="flex flex-col items-center p-3 hover:bg-gray-100 rounded-lg transition"
              >
                <img src={q.icon} alt={q.label} className="w-12 h-12 mb-2" />
                <span className="text-sm text-gray-700">{q.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Print Salary-Slip */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-3">Print Salary‑Slip</h3>
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Enter Employee IDs"
              value={empIds}
              onChange={(e) => setEmpIds(e.target.value)}
              className="flex-1 border rounded px-3 py-2 focus:outline-none focus:ring"
            />
            <Button className="cursor-pointer">
              Print
            </Button>
          </div>
          <p className="text-sm text-red-500 mt-2">
          Enter multiple employee IDs, separated by commas (,).
          </p>
        </div>

        {/* Notice Board */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-3">Notice Board</h3>
          <p className="text-gray-700">
            The Salary System is starting in the new web application, so be careful while doing entries...
          </p>
        </div>
      </div>

      {/* Right Side (1/3 width) */}
      <div className="space-y-6 w-full min-w-[320px]">
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-lg font-semibold mb-3">Date & Time</h3>
          <div className="flex items-center mb-4">
            <ClockIcon className="w-6 h-6 text-gray-600 mr-2" />
            <div>
              <p className="text-xl font-medium">
                {date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
              <p className="text-gray-500">
                {date.toLocaleDateString([], {
                  weekday: 'long',
                  month: 'long',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
          <Calendar mode="single" selected={date} onSelect={setDate} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
