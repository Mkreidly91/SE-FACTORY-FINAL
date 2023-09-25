import { Link } from 'react-router-dom';
import logo from '../assets/icons/logo/logo-full.svg';
import logoBlack from '../assets/icons/logo/logo-full-black.svg';
import Button from './Common/Button';

const Navbar = ({
  className,
  variant,
}: {
  className?: string;
  variant?: string;
}) => {
  return (
    <div
      className={`flex justify-between items-center  py-6 px-8 md:py-8 md:px-10 ${
        variant === 'black' ? 'text-black' : 'text-white'
      }  bg-transparent z-10 ${className}`}
    >
      <Link to={'/'}>
        <img
          src={variant === 'black' ? logoBlack : logo}
          alt=""
          className="w-[75px] md:w-[100px]"
        />
      </Link>
      <div className="nav-button-container flex items-center  gap-24">
        <Button text="ABOUT" />
        <Button text="SERVICE" />
        <Button
          text="CONTACT
        "
        />
      </div>
      <Link to="/login">
        <Button
          text="Log in"
          className=" text-gray-400  px-[20px] py-[12px] rounded-xl  border-2 border-solid border-gray-400 cursor-pointer"
        />
      </Link>
    </div>
  );
};

export default Navbar;
