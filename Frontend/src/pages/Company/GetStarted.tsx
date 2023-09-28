import Navbar from '../../components/Navbar';
import InView from '../../components/animation/InView';
import { NewObjectViewer } from '../../components/3d/DemoObjectViewer';
import { Suspense } from 'react';

import villa1 from '../../assets/images/get-started/villa1.png';
import villa2 from '../../assets/images/get-started/villa2.png';
import villa3 from '../../assets/images/get-started/Rectangle32.png';
import villa4 from '../../assets/images/get-started/Rectangle34.png';
import villa5 from '../../assets/images/get-started/Rectangle32-1.png';
import villa6 from '../../assets/images/get-started/Rectangle34-1.png';
import Footer from '../../components/Footer';
import { Link } from 'react-router-dom';
import { Button } from '@material-tailwind/react';

const GetStarted = () => {
  return (
    <div id="top">
      <section className="hero h-[100vh] relative bg-black">
        <div className="overlay absolute w-full h-full  bg-black opacity-60  z-10"></div>
        <Navbar className="  w-full z-[20] relative" />
        <InView
          transform="translateY(100px)"
          className="absolute top-0 left-0 bg-transparent flex flex-col items-center justify-center w-full h-full  z-10 text-white  "
        >
          <span className="hero-text-center">Unlock new possibilities</span>
        </InView>
        <Suspense>
          <NewObjectViewer
            className="z-[15] "
            zoom={20}
            position={[0, 0, 0]}
            url="3dModels/low_poly_isometric_rooms.glb"
          />
        </Suspense>
      </section>
      <section className="py-10 page-h">
        <div className="font-semibold text-xl md:text-4xl text-center pb-20">
          Why List With Us?
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center  w-11/12 md:w-full mx-auto text-center font-sora md:text-lg text-base font-light tracking-wide">
          <div className="exposure flex flex-col items-center gap-5 md:w-1/2 w-full text-center md:text-left">
            <span className="font-semibold w-8/12 text-xl md:text-3xl ">
              Unparalleled Exposure
            </span>

            <span className="md:w-8/12 font-sora text-base font-light">
              Gain access to a vast audience of potential clients, investors,
              and partners actively seeking construction services. Our platform
              is designed to put your projects in the spotlight.
            </span>
          </div>
          <div className="flex justify-center items-center space-x-2 w-1/2 grow md:gap-2 md:space-x-0 md:mt-5 ">
            <InView
              className="grow w-1/2 max-w-[350px] max-h-full object-cover rounded-md"
              transform="translateX(-50px)"
            >
              <img src={villa1} className=" -translate-y-4" alt="" />
            </InView>

            <InView
              transform="translateY(-50px)"
              className=" w-1/2 max-w-[150px] object-cover mt-5 rounded-md"
            >
              <img src={villa2} alt="" />
            </InView>
          </div>
        </div>
      </section>

      <section className="py-10  page-h bg-gradient-to-r from-neutral-800 to-neutral-950 ">
        <div className="flex flex-col md:flex-row items-center justify-center  w-11/12 md:w-full mx-auto text-center font-sora md:text-lg text-base font-light tracking-wide text-white">
          <div className="flex justify-center items-center space-x-2 w-1/2 grow md:gap-2 md:space-x-0 md:mt-5">
            <InView
              className="grow w-1/2 max-w-[350px] max-h-full object-cover rounded-md"
              transform="translateX(-50px)"
            >
              <img src={villa3} className=" -translate-y-4" alt="" />
            </InView>
            <InView
              transform="translateY(-50px)"
              className=" w-1/2 max-w-[150px] object-cover mt-5 rounded-md"
            >
              <img src={villa4} alt="" />
            </InView>
          </div>
          <div className="exposure flex flex-col items-center gap-5 md:w-1/2 w-full text-center md:text-left">
            <span className="font-semibold w-8/12 text-xl md:text-3xl ">
              Cost-Effective Marketing
            </span>

            <span className="md:w-8/12 font-sora text-base font-light">
              Maximize your marketing budget by harnessing the power of our
              platform. We offer cost-effective advertising options to reach a
              wide and relevant audience.
            </span>
          </div>
        </div>
      </section>

      <section className="py-10  page-h">
        <div className="flex flex-col md:flex-row items-center justify-center  w-11/12 md:w-full mx-auto text-center font-sora md:text-lg text-base font-light tracking-wide">
          <div className="exposure flex flex-col items-center gap-5 md:w-1/2 w-full text-center md:text-left">
            <span className="font-semibold w-8/12 text-xl md:text-3xl ">
              Stay Ahead of the Curve
            </span>

            <span className="md:w-8/12 font-sora text-base font-light">
              Stay updated on industry trends, best practices, and emerging
              technologies through our resourceful content and community
              discussions. Position your business as an industry pioneer.
            </span>
          </div>
          <div className="flex justify-center items-center space-x-2 w-1/2 grow md:gap-2 md:space-x-0 md:mt-5">
            <InView
              className="grow w-1/2 max-w-[350px] max-h-full object-cover rounded-md"
              transform="translateX(-50px)"
            >
              <img src={villa5} className="-translate-y-4" alt="" />
            </InView>
            <InView
              transform="translateY(-50px)"
              className=" w-1/2 max-w-[150px] object-cover mt-5 rounded-md"
            >
              <img src={villa6} alt="" />
            </InView>
          </div>
        </div>
      </section>
      <section>
        <div className="get-started-footer flex flex-col gap-10 items-center py-10">
          <span className="font-semibold text-xl md:text-4xl  w-[60%] md:w-[50%] text-center">
            Ready to get started?
          </span>

          <Link to="/signup">
            <Button
              variant="gradient"
              className="bg-gradient-to-r from-slate-700 to-slate-500 p-4 font-sora font-normal uppercase tracking-wider px-10"
              size="lg"
            >
              Sign Up
            </Button>
          </Link>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default GetStarted;
