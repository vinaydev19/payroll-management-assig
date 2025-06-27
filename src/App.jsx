import './App.css'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// 👇 All page component imports from src/router/index.js
import {
  AdvanceEntry,
  AdvanceEntryMultiple,
  ApplyAllowance,
  ApplyPolicy,
  ApproveTransactions,
  AuditTransactions,
  BackDatedEntrys,
  EmployeeAttendance,
  EmployeeInformation,
  LoanIssue,
  LoanIssueMultiple,

  GroupDetailPayslip,
  GroupSummaryPayslip,
  IndividualPayslip,

  ApplyLeave,
  ApproveLeave,
  DepartmentWiseIncrement,
  EmployeePromotion,
  EmployeeTransfer,
  LeavesBalance,
  ManageRetirement,
  Resign,
  SalaryIncrementDecrement,

  CreateLetterFormats,
  EmployeeIDCardCreation,
  IDCardSetup,
  Reminder,
  SQLQueryAnalizar,
  ThemesSetup,
  ToDoList,

  BackDatedEntrysReport,
  BlankSheet,
  CompareDBValueRegister,

  DepartmentChangedList,
  DepartmentList,
  DepartmentStrengthList,
  DesignationList,
  EmployeeList,
  WardList,

  DepartmentWseAttendanceReports,
  EmployeeAttendanceReports,
  EmployeeCodeList,
  EmployeeIncrement,
  EmployeeRetirement,
  IncrementLetter,
  PositionStatusList,
  SearchEmployeeWise,
  SeniorityReport,

  AdvanceList,
  AllowanceList,
  BankDeductionList,
  BankLoanDeductionCompare,
  BankStatement,
  BasicPaidList,
  DeductionList,
  GSUListStatement,
  LICDeductionList,
  LoanIssueList,
  PFSubPFLonStatement,
  PostAllotment,
  SalaryGenerationStatistics,
  SalaryPaidList,

  DepartmentwisePensionComtribution,
  DepartmentwisePFReport,
  DepartmentwisePFReportYearly,
  DepartmentWiseSalarySlip,
  GrandSummaryofSalaryBill,
  PaySheetDepartmentWise,
  PaySheetEmployeeWise,
  PaySheetEmployeeWiseYearly,
  SalaryCertificate,
  SalaryRecape,
  SalarySheetSummary,
  Summary,
  TaxCalculation,
  WardWiseSalarySheetSummary,

  ChangePassword,
  UserMaster,

  DashBoardLayout,
  GeneralMasters,
  Login,
  MainLayout,
  PayrollMasters,
} from './router';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<MainLayout />}>
          <Route index element={<DashBoardLayout />} />
          <Route path="/general-masters" element={<GeneralMasters />} />
          <Route path="/payroll-masters" element={<PayrollMasters />} />
          <Route path="/employee/information" element={<EmployeeInformation />} />
          <Route path="/employee/attendance" element={<EmployeeAttendance />} />
          <Route path="/employee/allowance" element={<ApplyAllowance />} />
          <Route path="/employee/loan-issue" element={<LoanIssue />} />
          <Route path="/employee/loan-multiple" element={<LoanIssueMultiple />} />
          <Route path="/employee/policy" element={<ApplyPolicy />} />
          <Route path="/employee/manage/apply-leave" element={<ApplyLeave />} />
          <Route path="/employee/manage/approve-leave" element={<ApproveLeave />} />
          <Route path="/employee/manage/leaves-balance" element={<LeavesBalance />} />
          <Route path="/employee/manage/resign" element={<Resign />} />
          <Route path="/employee/manage/retirement" element={<ManageRetirement />} />
          <Route path="/employee/manage/promotion" element={<EmployeePromotion />} />
          <Route path="/employee/manage/transfer" element={<EmployeeTransfer />} />
          <Route path="/employee/manage/salary-change" element={<SalaryIncrementDecrement />} />
          <Route path="/employee/manage/department-increment" element={<DepartmentWiseIncrement />} />
          <Route path="/employee/payslip/individual" element={<IndividualPayslip />} />
          <Route path="/employee/payslip/group-detail" element={<GroupDetailPayslip />} />
          <Route path="/employee/payslip/group-summary" element={<GroupSummaryPayslip />} />
          <Route path="/employee/advance-entry" element={<AdvanceEntry />} />
          <Route path="/employee/advance-entry-multiple" element={<AdvanceEntryMultiple />} />
          <Route path="/employee/back-dated" element={<BackDatedEntrys />} />
          <Route path="/employee/audit" element={<AuditTransactions />} />
          <Route path="/employee/approve" element={<ApproveTransactions />} />

          <Route path="/report/employee-code" element={<EmployeeCodeList />} />
          <Route path="/report/attendance" element={<EmployeeAttendanceReports />} />
          <Route path="/report/department-attendance" element={<DepartmentWseAttendanceReports />} />
          <Route path="/report/search-employee" element={<SearchEmployeeWise />} />
          <Route path="/report/position-status" element={<PositionStatusList />} />
          <Route path="/report/seniority" element={<SeniorityReport />} />
          <Route path="/report/retirement" element={<EmployeeRetirement />} />
          <Route path="/report/increment" element={<EmployeeIncrement />} />
          <Route path="/report/increment-letter" element={<IncrementLetter />} />

          <Route path="/report/department/employee-list" element={<EmployeeList />} />
          <Route path="/report/department/changed" element={<DepartmentChangedList />} />
          <Route path="/report/department/strength" element={<DepartmentStrengthList />} />
          <Route path="/report/ward-list" element={<WardList />} />
          <Route path="/report/department-list" element={<DepartmentList />} />
          <Route path="/report/designation-list" element={<DesignationList />} />

          <Route path="/register/salary-paid" element={<SalaryPaidList />} />
          <Route path="/register/loan-issue" element={<LoanIssueList />} />
          <Route path="/register/pf-statement" element={<PFSubPFLonStatement />} />
          <Route path="/register/bank-statement" element={<BankStatement />} />
          <Route path="/register/advance" element={<AdvanceList />} />
          <Route path="/register/allowance" element={<AllowanceList />} />
          <Route path="/register/deduction" element={<DeductionList />} />
          <Route path="/register/bank-deduction" element={<BankDeductionList />} />
          <Route path="/register/lic-deduction" element={<LICDeductionList />} />
          <Route path="/register/basic-paid" element={<BasicPaidList />} />
          <Route path="/register/bank-loan-compare" element={<BankLoanDeductionCompare />} />
          <Route path="/register/gsu-statement" element={<GSUListStatement />} />
          <Route path="/register/post-allotment" element={<PostAllotment />} />
          <Route path="/register/salary-stats" element={<SalaryGenerationStatistics />} />

          <Route path="/salary/pay-sheet-employee" element={<PaySheetEmployeeWise />} />
          <Route path="/salary/pay-sheet-department" element={<PaySheetDepartmentWise />} />
          <Route path="/salary/pay-sheet-yearly" element={<PaySheetEmployeeWiseYearly />} />
          <Route path="/salary/recape" element={<SalaryRecape />} />
          <Route path="/salary/slip-department" element={<DepartmentWiseSalarySlip />} />
          <Route path="/salary/summary" element={<SalarySheetSummary />} />
          <Route path="/salary/ward-summary" element={<WardWiseSalarySheetSummary />} />
          <Route path="/salary/grand-summary" element={<GrandSummaryofSalaryBill />} />
          <Route path="/salary/certificate" element={<SalaryCertificate />} />
          <Route path="/salary/pf-report" element={<DepartmentwisePFReport />} />
          <Route path="/salary/pf-yearly" element={<DepartmentwisePFReportYearly />} />
          <Route path="/salary/summary-view" element={<Summary />} />
          <Route path="/salary/pension" element={<DepartmentwisePensionComtribution />} />
          <Route path="/salary/tax" element={<TaxCalculation />} />

          <Route path="/report/backdated" element={<BackDatedEntrysReport />} />
          <Route path="/report/blank" element={<BlankSheet />} />
          <Route path="/report/db-compare" element={<CompareDBValueRegister />} />

          <Route path="/security/user-master" element={<UserMaster />} />
          <Route path="/security/change-password" element={<ChangePassword />} />

          <Route path="/misc/id-card" element={<EmployeeIDCardCreation />} />
          <Route path="/misc/todo" element={<ToDoList />} />
          <Route path="/misc/reminder" element={<Reminder />} />
          <Route path="/misc/id-setup" element={<IDCardSetup />} />
          <Route path="/misc/letters" element={<CreateLetterFormats />} />
          <Route path="/misc/themes" element={<ThemesSetup />} />
          <Route path="/misc/sql-analyzer" element={<SQLQueryAnalizar />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
