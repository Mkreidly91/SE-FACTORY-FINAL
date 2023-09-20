import { useState } from 'react';
import ProjectSearchForm from '../../components/Forms/ProjectSearchForm';
import ProjectCard from '../../components/Common/ProjectCard';
import { motion } from 'framer-motion';
import customerHero from '../../assets/images/customer/customer-hero.png';
import Navbar from '../../components/Navbar';
import Footer from '../../components/Footer';

const CustomerPage = () => {
  const [state, setState] = useState<any[]>();
  console.log(state);
  const variants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        when: 'beforeChildren',
        delayChildren: 0.8,
      },
    },
    hover: {
      scale: 1.2,
    },
    hidden: {
      opacity: 0,
      y: 100,
      transition: {
        when: 'afterChildren',
      },
    },
  };
  return (
    <div>
      <div className="customer-hero w-full h-screen relative flex flex-col">
        <Navbar className=" w-full z-20" />
        <div className=" absolute z-[-1] top-0 left-0 w-full h-full">
          <img
            className="  w-full h-full object-cover"
            src={customerHero}
            alt=""
          />
        </div>

        <div className="flex justify-center items-center text-white h-full ">
          <span className="hero-text-center">
            Your perfect home from miles away{' '}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-center ">
        <div className="p-10 w-fit rounded-md">
          <ProjectSearchForm onSuccess={setState} />
        </div>
      </div>

      <motion.div className="flex flex-wrap gap-5 p-20">
        {state &&
          state.map((p) => (
            <motion.div initial="hidden" animate="visible" variants={variants}>
              <ProjectCard project={p} />
            </motion.div>
          ))}
      </motion.div>
    </div>
  );
};

export default CustomerPage;
