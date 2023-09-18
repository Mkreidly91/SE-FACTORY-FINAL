import companyHero from '../../assets/images/common/company-home.png';
import Button from '../../components/Common/Button';
import Navbar from '../../components/Navbar';

import logo1 from '../../assets/images/company-home/Vector-1.png';
import logo2 from '../../assets/images/company-home/Vector-4.png';
import logo3 from '../../assets/images/company-home/Vector-5.png';
import logo4 from '../../assets/images/company-home/Vector.png';
import laptop from '../../assets/images/company-home/Laptop.png';
import InViews from '../../components/animation/InView';
import InView from '../../components/animation/InView';
import V360 from '../sample3d/V360';
const CompanyHome = () => {
  return (
    <>
      <section className="hero h-[100vh] relative ">
        <Navbar className="absolute top-0  w-full" />
        <img
          src={companyHero}
          alt=""
          className="w-full h-full object-cover absolute top-0 left-0 z-0"
        />

        <InView
          transform="translateY(100px)"
          className="hero-text flex flex-col items-center justify-center w-full h-full  gap-10 z-10 text-white relative "
        >
          <span className=" text-6xl text-center font-semibold max-w-[800px]">
            Showcase Your Construction Projects with Immersive 3D Tours
          </span>

          <Button
            text="Get Started"
            className="button-gradient px-10 py-5 rounded-xl text-xl font-light"
          />
        </InView>
      </section>
      <section className="hero h-fit relative p-5 ">
        <div className="clients flex flex-col text-gray-600">
          <div className="flex flex-col gap-3 items-center text-center">
            <span className=" text-3xl font-semibold">Our Clients</span>
            <span className="">
              We have been working with some fortune 500 clients
            </span>
          </div>
        </div>

        <div className="company-logos flex gap-20 justify-center py-10">
          <img src={logo1} alt="" className="object-contain" />
          <img src={logo2} alt="" className="object-contain" />
          <img src={logo3} alt="" className="object-contain" />
          <img src={logo4} alt="" className="object-contain" />
        </div>

        <div className="laptop flex items-center justify-center text-center ">
          <InView transform="translateY(100px)" delay="0.5">
            <div className="laptop-text flex flex-col items-center ">
              <span className=" text-2xl md:text-5xl font-semibold w-[70%]">
                Unlock the power of 3D virual tours
              </span>
              <br />
              <span className="w-[70%]">
                Live Virtual Experience – search, explore, and discuss with
                friends or family in real time.
              </span>
            </div>
          </InView>

          <InView transform="translateX(100px)" delay="0.8">
            <img src={laptop} alt="" />
          </InView>
        </div>
      </section>
      <section className="flex flex-col items-center gap-5 relative">
        <InView delay="1.2" className="w-[80%]  ">
          <V360 className={'rounded-2xl m-auto border-none'} />
        </InView>
        <div className="pano-text flex flex-col gap-5">
          <span className="text-2xl">
            Immerse Your Audience with Interactive Panoramas
          </span>
          <span>
            Our panoramic images redefine property presentations. Seamlessly
            integrate hotspots and floor plans to give clients a comprehensive
            view. Elevate your listings and captivate your audience in the world
            of real estate. Welcome to the future of property presentation
          </span>
        </div>
      </section>
    </>
  );
};

export default CompanyHome;
