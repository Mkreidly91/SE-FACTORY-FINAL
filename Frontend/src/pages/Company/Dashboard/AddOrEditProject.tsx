import { useEffect, useState } from 'react';
import { Tabs, Tab } from '@mui/material';
import ProjectForm from '../../../components/Forms/ProjectForm';
import { useParams } from 'react-router-dom';
import { getProjectById } from '../../../api/company.api';
import MarkersAndHotspots from './MarkersAndHotspots';

const AddOrEditProject = ({ tab = 0 }: { tab?: number }) => {
  const [activeTab, setActiveTab] = useState(tab || 0);
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
  }, [id, activeTab]);

  return (
    <div className="w-full p-5 ">
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
            value={2}
            label={<span className="monster">3D tour</span>}
            disabled={id ? false : true}
          />
        </Tabs>
      </div>

      <div className="w-full" role="tabpanel" hidden={activeTab !== 0}>
        {activeTab === 0 && <ProjectForm initialValues={state} id={id} />}
      </div>

      <div role="tabpanel" hidden={activeTab !== 2}>
        {activeTab === 2 && state && (
          <MarkersAndHotspots initialState={state} />
        )}
      </div>
    </div>
  );
};

export default AddOrEditProject;
