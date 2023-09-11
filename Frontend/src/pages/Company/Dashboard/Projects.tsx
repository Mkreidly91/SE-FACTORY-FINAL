import { useEffect, useState } from 'react';
import ProjectCard from '../../../components/Common/ProjectCard';
import { getProjects } from '../../../api/company.api';

const Projects = () => {
  console.log('Projects rendered');
  const [projects, setProjects] = useState([]);
  useEffect(() => {
    const fetchProjects = async () => {
      const res = await getProjects();
      setProjects(res);
    };
    fetchProjects();
  }, []);

  console.log(projects);
  return (
    <>
      <span>Hello</span>
      {projects &&
        projects.map(
          (p: { name: string; description: string; thumbnail: string }) => {
            const { name, description, thumbnail } = p;
            return (
              <ProjectCard
                title={name}
                description={description}
                img={thumbnail}
              />
            );
          }
        )}
    </>
  );
};

export default Projects;
