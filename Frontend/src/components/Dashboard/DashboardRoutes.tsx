// DashboardRoutes.js
import { Route, Routes } from 'react-router-dom';
import Projects from '../../pages/company/dashboard/Projects';
import AddOrEditProject from '../../pages/company/dashboard/AddOrEditProject';
import EditProfile from '../../pages/company/dashboard/EditProfile';

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
