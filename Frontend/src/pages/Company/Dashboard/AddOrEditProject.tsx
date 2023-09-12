import React, { useEffect, useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import ProjectForm from '../../../components/Forms/ProjectForm';
import ObjectViewer from '../../sample3d/ObjectViewer';
import ModelsAndPanoramaForm from '../../../components/Forms/ModelsAndPanoramaForm';
import { useParams } from 'react-router-dom';
import { getProjectById } from '../../../api/company.api';
import { ProjectFormSchemaType } from '../../../validation/company.validation';
import MarkersAndHotspots from './MarkersAndHotspots';

const AddOrEditProject = () => {
  const [activeTab, setActiveTab] = useState(0);
  const [state, setState] = useState();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      const fetchProject = async () => {
        const res = await getProjectById(id);
        setState(res);
      };
      fetchProject();
    }
  }, [id]);

  return (
    <div className="w-full p-5">
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
            sx={{ marginRight: '20px' }}
            value={0}
            label={<span className="monster">Project Details</span>}
          />
          <Tab
            sx={{ marginRight: '20px' }}
            value={1}
            label={<span className="monster">Listing Details</span>}
            disabled={id ? false : true}
          />
          <Tab
            value={2}
            label={<span className="monster">Customize</span>}
            disabled={id ? false : true}
          />
        </Tabs>
      </div>

      <div className="w-full" role="tabpanel" hidden={activeTab !== 0}>
        {activeTab === 0 && <ProjectForm initialValues={state} id={id} />}
      </div>

      <div role="tabpanel" hidden={activeTab !== 1}>
        {activeTab === 1 && (
          // <ObjectViewer url="https://vizi-bucket.s3.eu-west-1.amazonaws.com/newTable.glb" />
          <ModelsAndPanoramaForm />
        )}
      </div>
      <div role="tabpanel" hidden={activeTab !== 2}>
        {activeTab === 2 && state && (
          // <ObjectViewer url="https://vizi-bucket.s3.eu-west-1.amazonaws.com/newTable.glb" />
          <MarkersAndHotspots initialState={state} />
        )}
      </div>
    </div>
  );
};

export default AddOrEditProject;
