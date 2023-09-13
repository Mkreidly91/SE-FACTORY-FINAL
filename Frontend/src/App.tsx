import './App.css';
import TestRHF from './pages/TestRHF';
import Landing from './pages/landing/Landing';
import Test from './pages/sample3d/test';
import DashBoard from './components/Dashboard/Dashboard';
import DashboardRoutes from './components/Dashboard/DashboardRoutes';
import { Routes, Route } from 'react-router-dom';
import CompanyHome from './pages/Company/CompanyHome';
function App() {
  return (
    <div className="app sora h-full w-full">
      {/* <Landing /> */}

      {/* <TestRHF /> */}

      <Routes>
        <Route path="/test" element={<Test />} />
        <Route path="/companyHome" element={<CompanyHome />} />
        <Route
          path="/dashboard/*"
          element={
            <DashBoard>
              {/* <DashboardRoutes />
              <ProjectForm /> */}
            </DashBoard>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
