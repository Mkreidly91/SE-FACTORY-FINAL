import logo from '../assets/icons/logo/logo-full-black.svg';
import Button from './Common/Button';

import facebook from '../assets/icons/socials/Facebook.svg';
import twitter from '../assets/icons/socials/Twitter.svg';
import instagram from '../assets/icons/socials/Instagram.svg';
import linkedIn from '../assets/icons/socials/LinkedIn.svg';
import yt from '../assets/icons/socials/YouTube.svg';

const Footer = ({ className }: { className?: string }) => {
  return (
    <div
      className={`flex justify-between items-center py-6 px-8 md:py-8 md:px-10 text-white bg-transparent z-10 ${className}`}
    >
      <img src={logo} alt="" className=" w-[75px] md:w-[100px] " />
      <div className="socials flex gap-5">
        <img
          src={facebook}
          alt=""
          className="w-[20px] md:w-[30px] cursor-pointer"
        />
        <img
          src={twitter}
          alt=""
          className="w-[20px] md:w-[30px] cursor-pointer"
        />
        <img
          src={instagram}
          alt=""
          className="w-[20px] md:w-[30px] cursor-pointer"
        />
        <img
          src={linkedIn}
          alt=""
          className="w-[20px] md:w-[30px] cursor-pointer"
        />
        <img src={yt} alt="" className="w-[20px] md:w-[30px] cursor-pointer" />
      </div>
    </div>
  );
};

export default Footer;
