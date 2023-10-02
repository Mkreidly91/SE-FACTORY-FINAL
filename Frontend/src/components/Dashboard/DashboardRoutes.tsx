// DashboardRoutes.js
import { Route, Routes } from 'react-router-dom';
import Projects from '../../pages/company/Dashboard/Projects';
import AddOrEditProject from '../../pages/company/Dashboard/AddOrEditProject';
import EditProfile from '../../pages/company/Dashboard/EditProfile';

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route index path="/projects" element={<Projects />} />
      <Route path="projects/addProject/" element={<AddOrEditProject />} />
      <Route path="projects/addProject/:id" element={<AddOrEditProject />} />
      <Route path="editProfile" element={<EditProfile />} />
    </Routes>
  );
};

export default DashboardRoutes;
