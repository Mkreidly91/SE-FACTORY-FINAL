import { Html, useGLTF } from '@react-three/drei';
import Marker from '../../components/Marker/Marker';
import owl from '../../assets/icons/logo/logo-owl.svg';

const Model = ({ placeMarker, children }) => {
  const m = useGLTF(
    'https://vizi-bucket.s3.eu-west-1.amazonaws.com/IsometricRoom.glb'
  );
  return (
    m && (
      <primitive
        onPointerDown={(e) => {
          console.log(e.normal);
          placeMarker(e);
        }}
        object={m.scene}
      >
        {children}
      </primitive>
    )
  );
};

// useGLTF.preload('3dModels/IsometricRoom.glb');
export default Model;
