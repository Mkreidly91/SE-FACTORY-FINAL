// DashboardRoutes.js
import { Route, Routes } from 'react-router-dom';
import Projects from '../../pages/Company/Dashboard/Projects';
import AddOrEditProject from '../../pages/Company/Dashboard/AddOrEditProject';
import EditProfile from '../../pages/Company/Dashboard/EditProfile';

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
