import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import DashboardPage from './pages/Dashboard/DashboardPage';
import FormPage from './pages/MasterBillPage/FormPage';
import MasterBillPage from './pages/MasterBillPage/MasterBillPage';
import LoginPage from './pages/auth/LoginPage';
import DSummaryPage from './pages/DivisionSummary/DSummaryPage';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Example of how to define a router path */} 
        <Route path="/login" element={<LoginPage/>}/> 
        <Route path="/" element={<Navigate to={"/login"} replace />}/>
        <Route path="/dashboard" element={<DashboardPage/>}/> 
        <Route exact path="/master-bill" element={<FormPage/>}/> 
        <Route path="/master-bill-sheet" element={<MasterBillPage/>}/> 
        <Route path="/d-summary" element={<DSummaryPage/>}/> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
