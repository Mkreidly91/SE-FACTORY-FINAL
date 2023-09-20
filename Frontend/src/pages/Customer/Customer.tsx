import { useState } from 'react';
import ProjectSearchForm from '../../components/Forms/ProjectSearchForm';
import ProjectCard from '../../components/Common/ProjectCard';

const CustomerPage = () => {
  const [state, setState] = useState<any[]>();
  console.log(state);
  return (
    <div>
      <ProjectSearchForm onSuccess={setState} />
      <div className="flex flex-wrap gap-5 p-20">
        {state && state.map((p) => <ProjectCard project={p} />)}
      </div>
    </div>
  );
};

export default CustomerPage;
