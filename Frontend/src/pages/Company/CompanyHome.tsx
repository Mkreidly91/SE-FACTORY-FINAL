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
import Footer from '../../components/Footer';
const CompanyHome = () => {
  return (
    <>
      <section className="hero h-[100vh] relative ">
        <Navbar className="absolute top-0  w-full z-50" />
        <img
          src={companyHero}
          alt=""
          className="w-full h-full object-cover absolute top-0 left-0 z-0"
        />

        <InView
          transform="translateY(100px)"
          className="hero-text flex flex-col items-center justify-center w-full h-full  gap-10 z-10 text-white relative mx-auto
           "
        >
          <span className="  text-center text-2xl md:text-6xl w-[80%] font-semibold max-w-[800px] ">
            Showcase Your Construction Projects with Immersive 3D Tours
          </span>

          <Button
            text="Get Started"
            className="button-gradient px-5 py-2.5 md:px-10 md:py-5 rounded-xl md:text-xl font-light text-white"
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

        <div className="laptop flex   items-center justify-center text-center   md:flex  ">
          <div className=" w-fit flex flex-col items-center md:flex-row ">
            <InView transform="translateY(100px) w-fit" delay="0.5">
              <div className=" w-fit laptop-text flex flex-col items-center  justify-center">
                <span className=" text-2xl md:text-5xl font-semibold w-[70%]">
                  Unlock the power of 3D virual tours
                </span>
                <br />
                <span className="w-[70%] hidden md:block">
                  Live Virtual Experience – search, explore, and discuss with
                  friends or family in real time.
                </span>
              </div>
            </InView>
            <InView transform="translateX(100px)" delay="0.8">
              <img src={laptop} alt="" />
            </InView>
          </div>
        </div>
      </section>
      <section className="flex flex-col h-[50vh]  w-full  justify-center items-center  relative md:h-[100vh]  ">
        <InView delay="1.2" className="w-[80%]     ">
          <V360 className={'rounded-2xl m-auto border-none'} />
        </InView>
        <div className="pano-bg  h-full w-full z-[-1] absolute  ">
          <div className="white-bg h-[25vh] w-full bg-white md:h-[50vh]"></div>
          <div className="grey-bg h-[25vh] w-full bg-gray-800 md:h-[50vh] "></div>
        </div>
      </section>

      <section className="bg-gray-800 py-10">
        <div className="pano-text flex flex-col items-center  gap-14 text-white mt-[-5%]">
          <span className="font-semibold  text-center  text-2xl md:text-4xl md:w-[60%]">
            Immerse Your Audience with Interactive Panoramas
          </span>
          <span className="w-[80%] text-center">
            Our panoramic images redefine property presentations. Seamlessly
            integrate hotspots and floor plans to give clients a comprehensive
            view. Elevate your listings and captivate your audience in the world
            of real estate. Welcome to the future of property presentation
          </span>
          <div className="features display flex flex-col gap-10 w-full  pb-16">
            <span className="features-title text-center font-semibold  text-2xl md:text-4xl">
              Features
            </span>

            <div className="features-wrapper flex gap-5 items-center justify-center font-light md:text-2xl md:gap-40">
              <div className="flex flex-col gap-20 ">
                <span className=" underline underline-offset-8">
                  1. Company portfolio
                </span>
                <span className=" underline underline-offset-8">
                  2. Curated 3D tours
                </span>
              </div>
              <div className="flex flex-col gap-20">
                <span className=" underline underline-offset-8">
                  3. Search homes
                </span>
                <span className=" underline underline-offset-8">
                  4. Apply digitally
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section>
        <div className="get-started-footer flex flex-col gap-10 items-center py-10">
          <span className="font-semibold text-xl md:text-4xl  w-[60%] md:w-[50%] text-center">
            Transform your presence with a 3D edge
          </span>
          <Button
            text="Get Started"
            className="button-gradient px-5 py-2.5 md:px-10 md:py-5 rounded-xl md:text-xl font-light text-white"
          />
        </div>
      </section>

      <Footer />
    </>
  );
};

export default CompanyHome;
