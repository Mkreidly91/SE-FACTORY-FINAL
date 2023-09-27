// DashboardRoutes.js
import { Route, Routes, useNavigate } from 'react-router-dom';
import Projects from '../../pages/Company/Dashboard/Projects';
import AddOrEditProject from '../../pages/Company/Dashboard/AddOrEditProject';
import EditProfile from '../../pages/Company/Dashboard/EditProfile';
import { getUser } from '../../api/api.helpers';
import { useEffect, useState } from 'react';

const DashboardRoutes = () => {
  return (
    <Routes>
      <Route index path="/projects" element={<Projects />} />
      <Route path="projects/addProject/" element={<AddOrEditProject />} />
      <Route path="projects/addProject/:id" element={<AddOrEditProject />} />

      <Route
        path="projects/addProject/:id/customize"
        element={<AddOrEditProject tab={2} />}
      />
      <Route path="editProfile" element={<EditProfile />} />
    </Routes>
  );
};

export default DashboardRoutes;
