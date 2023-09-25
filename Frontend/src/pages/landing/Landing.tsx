import Navbar from '../../components/Navbar';
// import landingImg from "../../assets/images/landing-page/landingImage.jpeg";
import landingImgMobile from '../../assets/images/landing-page/landing-page-mobile.jpeg';
import Pan from '../../components/animation/Pan';
import './Landing.css';
// import Button from "../../components/Common/Button";
import { Link } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import interiorPan from '../../assets/images/landing-page/InteriorLanding.png';

const Landing = () => {
  return (
    <div
      className={`landing h-screen w-full flex flex-col bg-gradient-to-r from-neutral-800 to-neutral-950 overflow-hidden`}
    >
      <Navbar />
      <div className="flex items-center grow">
        <div className="landing-hero-text flex flex-col justify-center gap-5 pl-10 text-white  z-30">
          <h1 className="font-medium text-4xl md:text-6xl md:w-3/5  md:text-left text-center pl-4">
            Explore the Future of Real Estate
          </h1>
          <p className="font-extralight text-xl md:text-3xl md:text-left text-center pl-4">
            <span className="font-normal">Immersive 3D Tours</span> <br /> for
            Home Buyers <br /> and Construction Companies
          </p>
          <div className="button-container flex gap-10">
            <div className="flex gap-6 pt-6 pl-4">
              <Link to="/customer">
                <Button
                  variant="gradient"
                  className="bg-gradient-to-r from-slate-700 to-slate-500 p-4 font-sora font-normal uppercase tracking-wider px-10"
                  size="lg"
                >
                  Looking for a Home
                </Button>
              </Link>
              <Link to="/companyHome">
                <Button
                  variant="gradient"
                  className="bg-gradient-to-r from-slate-700 to-slate-500 p-4 font-sora font-normal uppercase tracking-wider px-10"
                  size="lg"
                >
                  Looking to Showcase
                </Button>
              </Link>
            </div>
          </div>
        </div>

        <div className="landing-images">
          {/* <img
          src={landingImg}
          alt=""
          className="landing-background hidden md:block w-full fixed h-full top-0 min-h-[50%] min-w-[50%] z-[-1]"
        /> */}
          <div className="  hidden md:block">
            <Pan className=" w-11/12 h-full" img={interiorPan} />
          </div>
          <img
            src={landingImgMobile}
            alt="mobileImage"
            className=" top-0 md:hidden bg-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
