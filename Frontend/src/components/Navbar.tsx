import logo from '../assets/icons/logo/logo-full.svg';
import Button from './Common/Button';

const Navbar = ({ className }: { className?: string }) => {
  return (
    <div
      className={`flex justify-between items-center py-8 px-10 text-white bg-transparent z-10 ${className}`}
    >
      <img src={logo} alt="" className="w-[100px]" />
      <div className="nav-button-container flex items-center  gap-24">
        <Button text="ABOUT" />
        <Button text="SERVICE" />
        <Button
          text="CONTACT
        "
        />
      </div>

      <Button
        text="Log in"
        className=" text-gray-400  px-[20px] py-[12px] rounded-xl  border-2 border-solid border-gray-400"
      />
    </div>
  );
};

export default Navbar;
