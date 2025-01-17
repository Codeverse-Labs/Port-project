import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from './pages/Dashboard/DashboardPage';
import FormPage from './pages/MasterBillPage/FormPage';
import MasterBillPage from './pages/MasterBillPage/MasterBillPage';
import LoginPage from './pages/auth/LoginPage';
import DSummaryPage from './pages/DivisionSummary/DSummaryPage';
import DepartmentsPage from './pages/Departments/DepartmentsPage';
import UsersPage from './pages/Users/UsersPage';
import UserMobilePage from './pages/UserMobile/UserMobilePage';
import UserMobileVecantPage from './pages/UserMobileVecant/UserMobileVecantPage';
import TeleNumberPage from './pages/Telecom/TeleNumber/TeleNumberPage';
import TelecomBillPage from './pages/Telecom/TelecomBills/TelecomBillPage';
import DSummaryHomePage from './pages/DivisionSummary/DSummaryHomePage';
import TelecomMonthlyBillPage from './pages/Telecom/TelecomBills/TelecomMonthlyBillPage';
import TelecomDSummaryHomePage from './pages/Telecom/DivisionSummary/TelecomDSummaryHomePage';
import TelecomDSummaryPage from './pages/Telecom/DivisionSummary/TelecomDSummaryPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Example of how to define a router path */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<Navigate to={'/login'} replace />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route exact path="/mobitel/master-bill" element={<FormPage />} />
        <Route path="/mobitel/master-bill-sheet" element={<MasterBillPage />} />
        <Route path="/mobitel/d-summary" element={<DSummaryHomePage />} />
        <Route path="/mobitel/d-summary-sheet" element={<DSummaryPage />} />
        <Route path="/mobitel/divisions" element={<DepartmentsPage />} />
        <Route exact path="/mobitel/users" element={<UsersPage />} />
        <Route exact path="/mobitel/usermobile" element={<UserMobilePage />} />
        <Route exact path="/mobitel/usermobile/vecant" element={<UserMobileVecantPage />} />
        <Route exact path="/telecom/numbers" element={<TeleNumberPage />} />
        <Route exact path="/telecom/master-bill" element={<TelecomBillPage />} />
        <Route exact path="/telecom/master-bill-sheet" element={<TelecomMonthlyBillPage />} />
        <Route path="/telecom/d-summary" element={<TelecomDSummaryHomePage />} />
        <Route path="/telecom/d-summary-sheet" element={<TelecomDSummaryPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
