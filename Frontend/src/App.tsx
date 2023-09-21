import './App.css';
import TestRHF from './pages/TestRHF';
import Landing from './pages/landing/Landing';
import Test from './pages/sample3d/test';
import DashBoard from './components/Dashboard/Dashboard';
import DashboardRoutes from './components/Dashboard/DashboardRoutes';
import { Routes, Route } from 'react-router-dom';
import CompanyHome from './pages/Company/CompanyHome';
import LoginForm from './components/Forms/LoginForm';
import SignupForm from './components/Forms/SignupForm';
import ProjectSearchForm from './components/Forms/ProjectSearchForm';
import GetStarted from './pages/Company/GetStarted';
import CustomerPage from './pages/Customer/Customer';
import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import Wobble from './pages/sample3d/WobbleTest';

function App() {
  return (
    <div className="app sora h-full w-full">
      {/* <Landing /> */}

      {/* <TestRHF /> */}

      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/customer" element={<CustomerPage />} />
        <Route path="/test" element={<Test />} />
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/companyHome" element={<CompanyHome />} />
        <Route path="/getStarted" element={<GetStarted />} />
        <Route
          path="/wobble"
          element={
            <Canvas>
              <ambientLight intensity={2} />
              <Wobble />
            </Canvas>
          }
        />
        <Route path="/dashboard/*" element={<DashBoard />} />
      </Routes>
    </div>
  );
}

export default App;
