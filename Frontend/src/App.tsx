import './App.css';
import Landing from './pages/landing/Landing';

import DashBoard from './components/dashboard/Dashboard';
import { Routes, Route } from 'react-router-dom';
import CompanyHome from './pages/company/CompanyHome';
import GetStarted from './pages/company/GetStarted';
import CustomerPage from './pages/customer/Customer';
import LoginPage from './pages/login/LoginPage';
import SignUpPage from './pages/login/SignUpPage';
import ProjectDetails from './pages/customer/ProjectDetails';
import ProtectedRoute from './components/common/ProtectedRoutes';

function App() {
  return (
    <div className="app sora h-full w-full">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/customer" element={<CustomerPage />} />
        <Route path="/customer/project/:id" element={<ProjectDetails />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />
        <Route path="/companyHome" element={<CompanyHome />} />
        <Route path="/getStarted" element={<GetStarted />} />
        <Route
          path="/dashboard/*"
          element={
            <ProtectedRoute>
              <DashBoard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
