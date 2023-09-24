import SignupForm from '../../../components/Forms/SignupForm';
import Navbar from '../../../components/Navbar';
import BreathingDots from './Dots';
const SignUpPage = () => {
  return (
    <div className="w-full h-full flex items-center justify-center gap-5 neutral-gradient">
      <div className="w-[80%] flex bg-black  bg-white rounded-2xl">
        <div className=" w-fit p-5 z-10 grow rounded-2xl">
          <SignupForm className="bg-white p-5 " />
        </div>
        <div className="w-1/2 neutral-gradient rounded-r-2xl relative flex justify-center items-center">
          <span className="absolute text-5xl font-semibold text-white z-50 text-center">
            Elevate your status
          </span>
          {/* <BreathingDots color={'#525252'} /> */}
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
