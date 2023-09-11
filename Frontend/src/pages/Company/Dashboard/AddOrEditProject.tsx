import React, { useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import ProjectForm from '../../../components/Forms/ProjectForm';
import ObjectViewer from '../../sample3d/ObjectViewer';
import ModelsAndPanoramaForm from '../../../components/Forms/ModelsAndPanoramaForm';

const AddOrEditProject = () => {
  const [activeTab, setActiveTab] = useState(0);
  console.log(activeTab);
  return (
    <div>
      <div className="tabs-wrapper flex justify-center">
        <Tabs
          className="w-fit"
          value={activeTab}
          onChange={(event, newValue) => setActiveTab(newValue)}
          indicatorColor="primary"
          textColor="primary"
          sx={{ width: 'fit' }}
        >
          <Tab
            value={0}
            label={<span className="monster">Project Details</span>}
          />
          <Tab
            value={1}
            label={<span className="monster">Listing Details</span>}
          />
        </Tabs>
      </div>

      <div role="tabpanel" hidden={activeTab !== 0}>
        {activeTab === 0 && <ProjectForm />}
      </div>

      <div role="tabpanel" hidden={activeTab !== 1}>
        {activeTab === 1 && (
          // <ObjectViewer url="https://vizi-bucket.s3.eu-west-1.amazonaws.com/newTable.glb" />
          <ModelsAndPanoramaForm />
        )}
      </div>
    </div>
  );
};

export default AddOrEditProject;
