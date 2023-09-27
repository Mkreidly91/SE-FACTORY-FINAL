import { Link } from 'react-router-dom';
import { useState } from 'react';
import logo from '../assets/icons/logo/logo-full.svg';
import logoBlack from '../assets/icons/logo/logo-full-black.svg';

import { Button as MuiButton } from '@material-tailwind/react';
import Button from './Common/Button';

const Navbar = ({
  className,
  variant,
}: {
  className?: string;
  variant?: string;
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div
      className={`flex justify-between items-center py-6 px-8 md:py-8 md:px-10 bg-transparent z-10 ${className} ${
        variant === 'black' ? 'text-black' : 'text-white'
      }`}
    >
      <Link to={'/'}>
        <img
          src={variant === 'black' ? logoBlack : logo}
          alt=""
          className="w-[75px] md:w-28 pl-5"
        />
      </Link>

      <div className="md:hidden">
        {isMobileMenuOpen ? (
          <button
            onClick={toggleMobileMenu}
            className="text-gray-400 text-xs px-2 py-1 rounded-xl border-1 border-solid border-gray-400 hover:text-blue-200 hover:border-blue-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        ) : (
          <button
            onClick={toggleMobileMenu}
            className="text-gray-400 text-xs px-2 py-1 rounded-xl border-1 border-solid border-gray-400 hover:text-blue-200 hover:border-blue-200"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              />
            </svg>
          </button>
        )}
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-[65px] left-0 right-0 bg-neutral-900 opacity-90 h-screen p-4">
          <div className="flex h-screen justify-center flex-col items-center gap-4 text-3xl space-y-5 tracking-wider font-extralight">
            <Link to="/GetStarted" onClick={toggleMobileMenu}>
              <span className=" font-sora uppercase focus:text-blue-200">
                About
              </span>
            </Link>
            <Link to="/CompanyHome" onClick={toggleMobileMenu}>
              <span className=" font-sora uppercase">Services</span>
            </Link>
            <a href="#bottom" onClick={toggleMobileMenu}>
              <span className=" font-sora uppercase">Contact</span>
            </a>
            <Link to="/login" onClick={toggleMobileMenu}>
              <span className=" font-sora uppercase">Login</span>
            </Link>
          </div>
        </div>
      )}

      {/* Desktop */}
      <div className="md:flex hidden nav-button-container items-center tracking-wider text-sm gap-24">
        <Link to="/GetStarted">
          <Button text="ABOUT" />
        </Link>
        <Link to="/CompanyHome">
          <Button text="SERVICES" />
        </Link>
        <a href="mailto: contact@vizi.com">
          <Button text="CONTACT" />
        </a>
      </div>

      <div className="md:flex hidden">
        <Link to="/login">
          <MuiButton
            variant="gradient"
            className="text-gray-400 text-xs px-5 py-2 rounded-xl border-1 border-solid border-gray-400 hover:text-blue-200 hover:border-blue-200"
            size="lg"
          >
            Login
          </MuiButton>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
