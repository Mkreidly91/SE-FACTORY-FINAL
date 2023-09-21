import { FC } from 'react';
import Navbar from '../../components/Navbar';
import landingImg from '../../assets/images/landing-page/landingImage.jpeg';
import './Landing.css';
import Button from '../../components/Common/Button';
import { Link } from 'react-router-dom';
const Landing = () => {
  return (
    <div className={`landing h-full w-full flex flex-col`}>
      <Navbar />
      <img
        src={landingImg}
        alt=""
        className="landing-background w-full h-full absolute top-0 left-0 z-[-1]"
      />

      <div className="landing-hero-text flex flex-col w-full h-full justify-center  z-30 gap-10 p-10 text-white ">
        <h1 className="font-medium  text-6xl">
          Explore the Future <br /> of Construction
        </h1>
        <p className="font-extralight text-4xl">
          <span className=" font-normal">Immersive 3D Tours</span> <br /> for
          Home Buyers <br /> and Construction Companies
        </p>
        <div className="button-container flex gap-10">
          <Link to="/customer">
            <Button
              className="button-gradient  w-[160px] px-[36px] py-[24px] rounded-xl "
              text="Looking for a home"
            />
          </Link>
          <Link to="/companyHome">
            <Button
              className="button-gradient text-center  w-[160px] px-[36px] py-[24px] rounded-xl "
              text="Join us"
            />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Landing;
