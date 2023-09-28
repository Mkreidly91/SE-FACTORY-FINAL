import SignupForm from '../../../components/Forms/SignupForm';
import Left from '@mui/icons-material/KeyboardDoubleArrowLeft';
import BreathingDots from '../../../components/3d/Dots';
import { Link } from 'react-router-dom';
const SignUpPage = () => {
  return (
    <div className="w-full h-full flex items-center justify-center gap-5 neutral-gradient ">
      <Link to="/companyHome">
        <Left
          className="absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer"
          sx={{ color: 'white', fontSize: '60px' }}
        />
      </Link>

      <div className="w-[80%] flex  bg-white rounded-2xl">
        <div className=" w-fit p-5 z-10 grow rounded-2xl">
          <SignupForm className="bg-white p-3  w-3/4" />
        </div>
        <div className="w-1/2 neutral-gradient rounded-r-2xl relative flex justify-center items-center">
          <span className="absolute text-5xl font-semibold text-white z-50 text-center">
            Elevate your status
          </span>
          <BreathingDots color={'#525252'} />
        </div>
      </div>
    </div>
  );
};

export default SignUpPage;
