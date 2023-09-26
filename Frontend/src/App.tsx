import './App.css';
import Landing from './pages/landing/Landing';

import DashBoard from './components/Dashboard/Dashboard';
import { Routes, Route } from 'react-router-dom';
import CompanyHome from './pages/Company/CompanyHome';
import GetStarted from './pages/Company/GetStarted';
import CustomerPage from './pages/Customer/Customer';
import LoginPage from './pages/Login/SignUp/LoginPage';
import SignUpPage from './pages/Login/SignUp/SignUpPage';
import ProjectDetails from './pages/Customer/ProjectDetails';

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
        <Route path="/dashboard/*" element={<DashBoard />} />
      </Routes>
    </div>
  );
}

export default App;
