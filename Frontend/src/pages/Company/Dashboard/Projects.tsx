import { useEffect, useState } from 'react';
import ProjectCard from '../../../components/Common/ProjectCard';
import { getProjects } from '../../../api/company.api';
import { Link } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const fetchProjects = async () => {
      const res = await getProjects();
      setProjects(res);
    };
    fetchProjects();
  }, []);

  return (
    <div className="projects-page-container flex flex-col gap-10  w-full h-full monster mt-20 px-10  py-16 ">
      <div className="projecs-page-header flex justify-between">
        <span className=" text-3xl font-light">Projects</span>
        <Link to={'addProject'}>
          <div className="flex items-center gap-2 py-[10px] px-[30px] border border-[#2499E3] rounded-lg">
            <AddIcon sx={{ color: '#2499E3' }} />
            <button className="color-blue-light ">Add New</button>
          </div>
        </Link>
      </div>
      <div className="projects-card-container flex gap-5 ">
        {projects &&
          projects.map((p: any) => {
            const { name, description, thumbnail } = p;
            return (
              <Link to={`addProject/${p._id}`} state={p}>
                <ProjectCard
                  title={name}
                  description={description}
                  img={thumbnail}
                />
              </Link>
            );
          })}
      </div>
    </div>
  );
};

export default Projects;
