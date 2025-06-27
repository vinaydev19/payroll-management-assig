import React, { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";
import logo from "../../assets/logo2.png";
import { ChevronDown, ChevronRight, Menu } from "lucide-react";
import { Button } from "../ui/button";

const menuItems = [
  {
    title: 'Dashboard',
    link: '/',
  },
  {
    title: 'General Masters',
    link: '/general-masters',
  },
  {
    title: 'Payroll Masters',
    link: '/payroll-masters',
  },
  {
    title: 'Employee Info',
    children: [
      { title: 'Employee Information', link: '/employee/information' },
      { title: 'Employee Attendance', link: '/employee/attendance' },
      { title: 'Apply Allowance', link: '/employee/allowance' },
      { title: 'Loan Issue', link: '/employee/loan-issue' },
      { title: 'Loan Issue Multiple', link: '/employee/loan-multiple' },
      { title: 'Apply Policy', link: '/employee/policy' },
      {
        title: 'Manage Employee',
        children: [
          { title: 'Apply Leave', link: '/employee/manage/apply-leave' },
          { title: 'Approve Leave', link: '/employee/manage/approve-leave' },
          { title: 'Leaves Balance', link: '/employee/manage/leaves-balance' },
          { title: 'Resign', link: '/employee/manage/resign' },
          { title: 'Manage Retirement', link: '/employee/manage/retirement' },
          { title: 'Employee Promotion', link: '/employee/manage/promotion' },
          { title: 'Employee Transfer', link: '/employee/manage/transfer' },
          { title: 'Salary Increment & Decrement', link: '/employee/manage/salary-change' },
          { title: 'Department wise Increment', link: '/employee/manage/department-increment' },
        ],
      },
      {
        title: 'Generate Payslip',
        children: [
          { title: 'Individual Payslip', link: '/employee/payslip/individual' },
          { title: 'Group Detail Payslip', link: '/employee/payslip/group-detail' },
          { title: 'Group Summary Payslip', link: '/employee/payslip/group-summary' },
        ],
      },
      { title: 'Advance Entry', link: '/employee/advance-entry' },
      { title: 'Advance Entry Multiple', link: '/employee/advance-entry-multiple' },
      { title: 'Back Dated Entrys', link: '/employee/back-dated' },
      { title: 'Audit Transactions', link: '/employee/audit' },
      { title: 'Approve Transactions', link: '/employee/approve' },
    ],
  },
  {
    title: 'Report',
    children: [
      {
        title: 'Employee Info Reports',
        children: [
          { title: 'Employee Code List', link: '/report/employee-code' },
          { title: 'Employee Attendance Reports', link: '/report/attendance' },
          { title: 'DepartmentWise Attendance Reports', link: '/report/department-attendance' },
          { title: 'Search Employee Wise', link: '/report/search-employee' },
          { title: 'Position Status List', link: '/report/position-status' },
          { title: 'Seniority Report', link: '/report/seniority' },
          { title: 'Employee Retirement', link: '/report/retirement' },
          { title: 'Employee Increment', link: '/report/increment' },
          { title: 'Increment Letter', link: '/report/increment-letter' },
        ],
      },
      {
        title: 'Department Wise',
        children: [
          { title: 'Employee List', link: '/report/department/employee-list' },
          { title: 'Department Changed List', link: '/report/department/changed' },
          { title: 'Department Strength List', link: '/report/department/strength' },
          { title: 'Ward List', link: '/report/ward-list' },
          { title: 'Department List', link: '/report/department-list' },
          { title: 'Designation List', link: '/report/designation-list' },
        ],
      },
      {
        title: 'Register',
        children: [
          { title: 'Salary Paid List', link: '/register/salary-paid' },
          { title: 'Loan Issue List', link: '/register/loan-issue' },
          { title: 'PF Sub PF Loan Statement', link: '/register/pf-statement' },
          { title: 'Bank Statement', link: '/register/bank-statement' },
          { title: 'Advance List', link: '/register/advance' },
          { title: 'Allowance List', link: '/register/allowance' },
          { title: 'Deduction List', link: '/register/deduction' },
          { title: 'Bank Deduction List', link: '/register/bank-deduction' },
          { title: 'L.I.C- Deduction List', link: '/register/lic-deduction' },
          { title: 'Basic Paid List', link: '/register/basic-paid' },
          { title: 'Bank Loan Deduction Compare', link: '/register/bank-loan-compare' },
          { title: 'GSU List Statement', link: '/register/gsu-statement' },
          { title: 'Post Allotment', link: '/register/post-allotment' },
          { title: 'Salary Generation Statistics', link: '/register/salary-stats' },
        ],
      },
    ],
  },
  {
    title: 'Security',
    children: [
      { title: 'User Master', link: '/security/user-master' },
      { title: 'Change Password', link: '/security/change-password' },
    ],
  },
];

const DropdownItem = ({ item }) => {
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const isActive = item.link && location.pathname === item.link;

  return (
    <li
      className="relative group"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
    >
      <div
        className={`px-4 py-2 flex justify-between items-center hover:bg-slate-100 cursor-pointer ${isActive ? "bg-blue-100 font-semibold" : ""}`}
      >
        {item.link ? (
          <Link to={item.link} className="flex-1">{item.title}</Link>
        ) : (
          <span>{item.title}</span>
        )}
        {item.children && <ChevronRight size={16} className="ml-2" />}
      </div>
      {item.children && open && (
        <ul className="absolute left-full top-0 bg-white text-black shadow-md min-w-[220px] rounded z-50">
          {item.children.map((child, idx) => (
            <DropdownItem key={idx} item={child} />
          ))}
        </ul>
      )}
    </li>
  );
};

function Header() {
  const [openMenuIndex, setOpenMenuIndex] = useState(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const navRef = useRef(null);

  const toggleMenu = (index) => {
    setOpenMenuIndex((prev) => (prev === index ? null : index));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setOpenMenuIndex(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="w-full">
      <header className="w-full bg-slate-900 py-4 px-6 flex items-center justify-between flex-wrap">
        <div className="flex items-center">
          <img src={logo} alt="logo" className="w-32 h-16 mr-4" />
          <h1 className="text-slate-100 text-lg sm:text-2xl font-bold">
            B N C M C
          </h1>
        </div>
        <div className="block sm:hidden">
          <Menu size={28} className="text-white" onClick={() => setMobileOpen(!mobileOpen)} />
        </div>
        <div className="hidden sm:flex flex-col items-end text-slate-100">
          <h4 className="text-base sm:text-lg font-semibold">Welcome, User</h4>
          <div className="flex gap-2 mt-2">
            <Button variant="secondary" className="text-black">My Profile</Button>
            <Button variant="destructive">Logout</Button>
          </div>
        </div>
      </header>

      <nav ref={navRef} className="bg-slate-800 text-white px-6 py-3 shadow-md">
        <ul className={`flex flex-col sm:flex-row ${mobileOpen ? "block" : "hidden sm:flex"} gap-4 sm:gap-6`}>
          {menuItems.map((menu, index) => (
            <li key={index} className="relative">
              <div
                className="flex items-center hover:text-blue-400 cursor-pointer"
                onClick={() => menu.children ? toggleMenu(index) : null}
              >
                {menu.link ? (
                  <Link to={menu.link}>{menu.title}</Link>
                ) : (
                  <span>{menu.title}</span>
                )}
                {menu.children && <ChevronDown size={16} className="ml-1 mt-1" />}
              </div>
              {menu.children && openMenuIndex === index && (
                <ul className="absolute top-full left-0 bg-white text-black shadow-lg rounded mt-2 min-w-[250px] z-50">
                  {menu.children.map((child, idx) => (
                    <DropdownItem key={idx} item={child} />
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

export default Header;
