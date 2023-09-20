import Navbar from '../../components/Navbar';
import InView from '../../components/animation/InView';
import ObjectViewer from '../sample3d/ObjectViewer';
import V360 from '../sample3d/V360';
import lowPoly from '';
import Button from '../../components/Common/Button';
import { NewObjectViewer } from '../sample3d/NewObjectViewer';
import * as THREE from 'three';

import villa1 from '../../assets/images/get-started/villa1.png';
import villa2 from '../../assets/images/get-started/villa2.png';
import villa3 from '../../assets/images/get-started/Rectangle32.png';
import villa4 from '../../assets/images/get-started/Rectangle34.png';
import villa5 from '../../assets/images/get-started/Rectangle32-1.png';
import villa6 from '../../assets/images/get-started/Rectangle34.png';
import Footer from '../../components/Footer';

const GetStarted = () => {
  return (
    <>
      <section className="hero h-[100vh] relative bg-black">
        <div className="overlay absolute w-full h-full  bg-black opacity-60  z-10"></div>
        <Navbar className="  w-full z-[20] relative" />
        <InView
          transform="translateY(100px)"
          className="absolute top-0 left-0 bg-transparent  flex flex-col items-center justify-center w-full h-full  z-10 text-white  "
        >
          <span className="hero-text-center">Unlock new possibilities</span>
        </InView>

        <NewObjectViewer
          className="z-[15] "
          zoom={20}
          position={[0, 0, 0]}
          url="3dModels/low_poly_isometric_rooms.glb"
        />
      </section>
      <section className="py-10  page-h">
        <div className="text-center font-semibold  text-2xl md:text-4xl pb-10">
          Why List With Us?
        </div>
        <div className="  flex  justify-center  items-center  text-center  ">
          <div className="exposure  flex flex-col items-start justify-center text-start   w-[50%]">
            <span className=" text-xl md:text-3xl font-semibold ">
              Unparalleled Exposure
            </span>
            <br />
            <span className="  w-[60%] hidden md:block">
              Gain access to a vast audience of potential clients, investors,
              and partners actively seeking construction services. Our platform
              is designed to put your projects in the spotlight.
            </span>
          </div>
          <div className="w-1/2 flex  ">
            <div className="img-container flex justify-end gap-5">
              <img
                src={villa1}
                className="grow w-1/2 max-w-[300px] max-h-full object-cover rounded-md"
                alt=""
              />

              <img
                src={villa2}
                className="grow w-1/2 max-w-[200px] object-cover mt-5 translate-y-5  rounded-md"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>

      <section className="py-10  page-h bg-gray-800">
        <div className="  flex  justify-center  items-center  text-center  ">
          <div className="w-1/2  flex  ">
            <div className="img-container flex gap-5">
              <img
                src={villa3}
                className="grow w-1/2 max-w-[300px] max-h-full object-cover rounded-md"
                alt=""
              />
              <img
                src={villa4}
                className="w-1/2 max-w-[200px] object-cover mt-5 translate-y-5  rounded-md"
                alt=""
              />
            </div>
          </div>
          <div className="exposure flex items-center justify-end text-start text-white   max-w-[50%]">
            <div className="flex flex-col  w-fit">
              <span className=" text-xl md:text-3xl font-semibold ">
                Cost-Effective Marketing
              </span>
              <br />
              <span className="hidden md:block  w-[60%] ">
                Maximize your marketing budget by harnessing the power of our
                platform. We offer cost-effective advertising options to reach a
                wide and relevant audience.
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-10  page-h">
        <div className="  flex  justify-center  items-center  text-center  ">
          <div className="exposure  flex flex-col items-start justify-center text-start   w-[50%] container">
            <span className=" text-xl md:text-3xl font-semibold ">
              Stay Ahead of the Curve
            </span>
            <br />
            <span className="  w-[60%] hidden md:block">
              Stay updated on industry trends, best practices, and emerging
              technologies through our resourceful content and community
              discussions. Position your business as an industry pioneer.
            </span>
          </div>

          <div className="w-1/2 flex  ">
            <div className="img-container flex justify-end gap-5">
              <img
                src={villa5}
                className="grow w-1/2 max-w-[300px] max-h-full object-cover rounded-md"
                alt=""
              />

              <img
                src={villa6}
                className="grow w-1/2 max-w-[200px] object-cover mt-5 translate-y-5  rounded-md"
                alt=""
              />
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="get-started-footer flex flex-col gap-10 items-center py-10">
          <span className="font-semibold text-xl md:text-4xl  w-[60%] md:w-[50%] text-center">
            Want to learn more?
          </span>
          <Button
            text="Get Started"
            className=" button-gradient button-large-responsive"
          />
        </div>
      </section>
      <Footer />
    </>
  );
};

export default GetStarted;
