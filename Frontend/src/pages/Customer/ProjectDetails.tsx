import { useParams } from 'react-router-dom';
import { getProjectById } from '../../api/company.api';
import { Suspense, useEffect, useState } from 'react';
import ObjectViewer from '../3d/ObjectViewer';
import PanoEditor from '../3d/PanoEditor';
import { motion } from 'framer-motion';
import { motion as motion3d } from 'framer-motion-3d';

import {
  BathroomOutlined,
  BathtubOutlined,
  BedOutlined,
  LocationCityOutlined,
} from '@mui/icons-material';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';
import { Divider } from '@mui/material';

const ProjectDetails = () => {
  const { id } = useParams();
  const [project, setProject] = useState<any>();

  const fetchProject = async () => {
    if (id) {
      const res = await getProjectById(id);
      if (res) {
        setProject(res);
      }
    }
  };

  useEffect(() => {
    fetchProject();
  }, [id]);

  const { name, url, price, size, bedrooms, bathrooms, panoramas, owner } =
    project || {};

  const { name: ownerName, email, tel, logo, projects } = owner || {};

  return (
    project && (
      <div className="project-wrapper">
        <Navbar variant="black" className="text-black" />

        <div className="p-10 flex flex-col gap-5">
          <div className="flex justify-between gap-5 bg-gray-800 text-white p-10 rounded-lg">
            <section>
              <div className="flex flex-col gap-5">
                <h1 className=" uppercase text-5xl font-semibold">
                  {project?.name}
                </h1>
                <div className="location flex gap-5 items-end">
                  <LocationCityOutlined sx={{ color: 'white' }} />
                  <span className="">{project.location}</span>
                </div>
              </div>
            </section>
            <Divider orientation="vertical" flexItem className="bg-white" />
            <section className="price-size">
              <div className="flex flex-col justify-center gap-5 h-full ">
                <span className="text-2xl font-semibold">
                  ${Number(project.price).toLocaleString()}
                </span>

                <span className="text-xl ">
                  {Number(project.size).toLocaleString()}m&sup2;
                </span>
              </div>
            </section>
            <Divider
              light
              orientation="vertical"
              flexItem
              className="bg-white"
            />

            <div className="flex  gap-5 justify-center items-center w-fit self-center text-2xl ">
              <span className="">
                <BedOutlined sx={{ fontSize: 'inherit' }} /> {project.bedrooms}
              </span>
              <span className="">
                <BathtubOutlined sx={{ fontSize: 'inherit' }} />
                <span> {project.bathrooms}</span>
              </span>
            </div>
          </div>
          <section className="pano">
            <Suspense>
              <div className="w-full m-auto touch-none">
                {panoramas.length > 0 && (
                  <PanoEditor isEdit={false} className="touch-none" />
                )}
              </div>
            </Suspense>
          </section>

          <div className="flex p-10 min-h-[600px] bg-gray-800 rounded-md text-white">
            <div className="flex flex-col w-[40%] justify-center gap-5">
              <section className="description">
                <div className="project-description">
                  <div className="features-title text-lg font-semibold w-[50%] underline underline-offset-8 mb-3">
                    Description
                  </div>
                  {project.description}
                </div>
              </section>

              {project?.features && (
                <section className="features">
                  <div className="features ">
                    <div className="features-title text-lg font-semibold w-1/3 underline underline-offset-8     mb-3">
                      Features
                    </div>

                    {project?.features.join(' | ')}
                  </div>
                </section>
              )}
            </div>
            <Suspense>
              <motion.div className="grow min-w-[300px] w-[300px] relative">
                {url && <ObjectViewer className="border-0" url={url} />}
              </motion.div>
              <span className="text-white italic text-xs top-full">
                Drag to rotate
              </span>
            </Suspense>
          </div>

          <section className="contact py-10">
            <div className="flex ">
              <div className="flex flex-col gap-2 w-1/2 justify-center items-center">
                <span className="text-5xl font-semibold">Interested?</span>
                <span className="text-2xl">Feel free to contact us</span>
              </div>

              <div className=" flex justify-start grow">
                <div className="flex flex-col gap-1  w-fit">
                  <div className="flex gap-5">
                    {logo && <img className="w-[150px]" src={logo} />}
                    <div className="flex flex-col gap-1  justify-center">
                      {ownerName && (
                        <div className="font-semibold">{ownerName}</div>
                      )}
                      {email && <div>{email}</div>}
                      {tel && <div>{owner?.tel}</div>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    )
  );
};

export default ProjectDetails;
