// DashboardRoutes.js
import React from 'react';
import { Route, Routes } from 'react-router-dom';
import ProjectForm from '../Forms/ProjectForm';
import Projects from '../../pages/Company/Dashboard/Projects';
import AddOrEditProject from '../../pages/Company/Dashboard/AddOrEditProject';

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route index path="/projects" element={<Projects />} />
      <Route path="projects/addProject/" element={<AddOrEditProject />} />
      <Route path="projects/addProject/:id" element={<AddOrEditProject />} />
      {/* <Route path="/dashboard/settings" element={DashboardSettings} /> */}
      {/* Add more dashboard-specific routes */}
    </Routes>
  );
};

export default DashboardRoutes;
