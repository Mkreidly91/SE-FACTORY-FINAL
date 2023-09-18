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

const GetStarted = () => {
  return (
    <>
      <section className="hero h-[100vh] relative bg-black">
        <div className="overlay absolute w-full h-full  bg-black opacity-60  z-10"></div>
        <Navbar className="  w-full z-[20] relative" />
        <InView
          transform="translateY(100px)"
          className="absolute top-0 left-0 bg-transparent hero-text flex flex-col items-center justify-center w-full h-full  z-10 text-white  "
        >
          <span className="  text-center text-2xl w-[80%] font-semibold max-w-[800px] md:text-6xl">
            Unlock new possibilities
          </span>
        </InView>

        {/* <NewObjectViewer
        className="z-[15] "
        zoom={20}
        position={[0, 0, 0]}
        url="3dModels/low_poly_isometric_rooms.glb"
      /> */}
      </section>
      <section className="py-5">
        <div className="laptop flex   items-center  text-center md:flex  ">
          <div className=" w-[50%] flex flex-col  md:flex-row ">
            <InView transform="translateY(100px) w-[50%] " delay="0.5">
              <div className=" w-[50%] laptop-text flex flex-col items-center  justify-center">
                <span className=" text-2xl md:text-5xl font-semibold ">
                  Unparalleled Exposure
                </span>
                <br />
                <span className="w-[50%] hidden md:block">
                  Gain access to a vast audience of potential clients,
                  investors, and partners actively seeking construction
                  services. Our platform is designed to put your projects in the
                  spotlight.
                </span>
              </div>
            </InView>
            <InView transform="translateX(100px)" delay="0.8">
              <div className="flex justify-center gap-3">
                <img
                  src={villa1}
                  className="w-[100px] h-full object-cover"
                  alt=""
                />
                <img
                  src={villa2}
                  className="w-[100px] h-full object-cover"
                  alt=""
                />
              </div>
            </InView>
          </div>
        </div>
      </section>
    </>
  );
};

export default GetStarted;
