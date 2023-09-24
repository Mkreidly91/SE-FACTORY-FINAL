import SignupForm from '../../../components/Forms/SignupForm';
import Left from '@mui/icons-material/KeyboardDoubleArrowLeft';
import BreathingDots from './Dots';
import { Link } from 'react-router-dom';
import Wobble from '../../sample3d/WobbleTest';
import LoginForm from '../../../components/Forms/LoginForm';

const LoginPage = () => {
  return (
    <div className="w-full h-full flex items-center justify-center gap-5 neutral-gradient">
      <Link
        to="/companyHome"
        className="absolute left-0 top-1/2 -translate-y-1/2 cursor-pointer"
      >
        <Left className="" sx={{ color: 'white', fontSize: '60px' }} />
      </Link>

      <div className="w-[80%] h-[80%] flex bg-white rounded-2xl">
        <div className="w-1/2 neutral-gradient rounded-l-2xl relative flex justify-center items-center">
          <div className="wobble-container w-full h-full z-50s">
            <Wobble />
          </div>

          <span className="absolute text-5xl font-semibold text-white z-50 text-center flex">
            Transform user experience
          </span>
        </div>
        <div className=" w-fit  z-10 grow rounded-2xl self-center ">
          <LoginForm className="bg-white w-3/4" />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
