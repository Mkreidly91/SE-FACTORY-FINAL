import { FC } from 'react';
import Navbar from '../../components/Navbar';
import landingImg from '../../assets/images/landing-page/landingImage.jpeg';
import './Landing.css';
import Button from '../../components/Common/Button';
const Landing: FC = () => {
  return (
    <div className={`landing h-full w-full max-h-[100vh] `}>
      <Navbar />
      <img
        src={landingImg}
        alt=""
        className="landing-background w-full h-full fixed top-0  min-h-[50%] min-w-[50%]  z-[-1]"
      />

      <div className="landing-hero-text flex flex-col justify-center gap-10 p-10  text-white ">
        <h1 className="font-medium  text-6xl mt-[200px]">
          Explore the Future <br /> of Construction
        </h1>
        <p className="font-extralight text-4xl">
          <span className=" font-normal">Immersive 3D Tours</span> <br /> for
          Home Buyers <br /> and Construction Companies
        </p>
        <div className="button-container flex gap-10">
          <Button
            className="button-gradient w-fit px-[36px] py-[24px] rounded-xl "
            text="Looking for a home"
          />
          <Button
            className="button-gradient w-fit px-[36px] py-[24px] rounded-xl "
            text="Looking for a home"
          />
        </div>
      </div>
    </div>
  );
};

export default Landing;
