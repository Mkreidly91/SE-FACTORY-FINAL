import { Html } from '@react-three/drei';
import owl from '../../assets/icons/logo/logo-owl.svg';
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';

const Marker = ({ marker, setActiveImage }) => {
  const { image, x, y, z } = marker;
  return (
    <Html
      occlude={true}
      center
      className="w-[50px] text-[100px] bg-transparent flex items-center justify-center"
      position={[x, y, z]}
    >
      <ThreeSixtyIcon
        fontSize="inherit"
        htmlColor="blue"
        className=" fill-red-200 bg-transparent"
      />
      {/* <img
        onClick={() => {
          setActiveImage(image);
        }}
        src={owl}
        className="w-full h-full"
        alt=""
      /> */}
    </Html>
  );
};

export default Marker;
