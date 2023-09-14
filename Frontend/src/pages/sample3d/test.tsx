import { Html, OrbitControls, useGLTF } from '@react-three/drei';
import { Canvas, ThreeEvent } from '@react-three/fiber';
import React, { useState, useEffect, FC, Suspense, useRef } from 'react';
import * as THREE from 'three';
import { AnyObject } from 'three/examples/jsm/nodes/Nodes.js';
import V360 from './V360.jsx';
import img from './panorama.jpg';
import bedroom from './bedroom.jpeg';
import owl from '../../assets/icons/logo/logo-owl.svg';
import Model from './apartment.js';
import Marker from '../../components/Marker/Marker.js';
import ThreeSixtyIcon from '@mui/icons-material/ThreeSixty';
import BasicSelect from '../../components/Common/BasicSelect.js';
import HotspotForm from '../../components/Forms/HotspotForm.js';

const Test = () => {
  const aspect = window.innerWidth / window.innerHeight;
  const d = 60;
  const camera = new THREE.OrthographicCamera(
    -d * aspect,
    d * aspect,
    d,
    -d,
    1,
    1000
  );
  camera.position.set(60, 60, 60);
  camera.zoom = 80;
  const { nodes, materials } = useGLTF(
    '/3dModels/IsometricRoom.glb'
  ) as AnyObject;

  const [activeImage, setActiveImage] = useState(img);
  const initialImages = useRef([img, bedroom]);
  const [images, setImages] = useState([img, bedroom]);

  const [markers, setMarkers] = useState([]);
  // console.log(markers);
  console.log(images);

  function placeMarker(e: ThreeEvent<MouseEvent>) {
    if (images[0] && e.normal?.y === 1) {
      const { x, y, z } = e.intersections[0].point;
      setMarkers((prev) => {
        return [...prev, { image: images[0], x, y: y + 0.5, z }];
      });

      setImages((prev) => {
        return prev.slice(1);
      });
    }
  }
  return (
    <div className=" h-fit w-full bg-black flex flex-col py-20">
      <div className="w-[70%] m-auto ">
        <V360 image={activeImage} />
      </div>

      <div className="test-header flex items-center text-center justify-center min-h-[300px]">
        <div className="  text-white text-5xl font-semibold">
          Check out this virtual tour
        </div>
      </div>
      <div
        className="images-preview h-[200px] bg-white
       flex gap-2 items-center justify-center py-5 mb-10"
      >
        <div
          onClick={() => {
            setImages(initialImages.current);
            setMarkers([]);
          }}
          className="reset"
        >
          Reset
        </div>
        {images &&
          images.map((element) => (
            <img className="h-full rounded-md" src={element} />
          ))}
        {/* <img
          src="https://vizi-bucket.s3.eu-west-1.amazonaws.com/bedroom.jpeg"
          alt=""
          className="h-full rounded-md"
        /> */}
      </div>
      <div className="w-[80%] h-[800px] mx-auto">
        <Canvas
          className=" border h-full bg-transparent"
          frameloop="demand"
          camera={camera}
          dpr={window.devicePixelRatio}
        >
          <ambientLight intensity={0.1} />
          <directionalLight color="white" position={[0, 0, 5]} intensity={1} />
          {/* <directionalLight color="white" position={[5, 0, 5]} /> */}
          <pointLight intensity={2} position={[-10, 30, 20]} castShadow />
          <pointLight
            intensity={1}
            position={[20, 30, -10]}
            castShadow
            visible={true}
          />
          {/* <spotLight color="yellow" position={[0, 0, 0]} /> */}

          <OrbitControls makeDefault target={[0, 2, 0]} />
          <Suspense>
            <Model placeMarker={placeMarker}>
              {markers &&
                markers.map((e) => {
                  return <Marker setActiveImage={setActiveImage} marker={e} />;
                })}

              {/* <Html
                occlude={true}
                center
                className="w-[50px] bg-white"
                position={[0, 1, 0]}
              >
                <img src={owl} className="w-full h-full" alt="" />
              </Html> */}
            </Model>
          </Suspense>
        </Canvas>
      </div>
      <HotspotForm />
    </div>
  );
};
useGLTF.preload('3dModels/IsometricRoom.glb');
export default Test;

{
  /* <group
dispose={null}
onPointerDown={(e) => {
  console.log(e.normal);
  placeMarker(e);
}}
>
<mesh
  castShadow
  receiveShadow
  geometry={nodes.Lower_Floor.geometry}
  material={nodes.Lower_Floor.material}
  position={[0, -0.1, 0]}
  userData={{ name: 'lowerFloor' }}
  // onClick={() => {
  //   setActiveImage(img);
  // }}
>
  {markers &&
    markers.map(({ image, x, y, z }) => {
      return (
        <Html
          occlude={true}
          // transform
          center
          // distanceFactor={1000}
          className="w-[50px] bg-white"
          position={[x, y, z]}
        >
          <img
            onClick={() => {
              setActiveImage(image);
            }}
            src={owl}
            className="w-full h-full"
            alt=""
          />
        </Html>
      );
    })}
</mesh>

<mesh
  castShadow
  receiveShadow
  geometry={nodes.Side_wall_Total.geometry}
  material={nodes.Side_wall_Total.material}
  position={[-0.05, 2.5, -2.55]}
/>
<mesh
  castShadow
  receiveShadow
  geometry={nodes.Stairs.geometry}
  material={nodes.Stairs.material}
  position={[1.25, 1.1, -1.1]}
/>
<mesh
  castShadow
  receiveShadow
  geometry={nodes.Handrail.geometry}
  material={nodes.Handrail.material}
  position={[-0.475, 1.415, -0.175]}
/>
<mesh
  castShadow
  receiveShadow
  geometry={nodes.Lower_Wall_Main.geometry}
  material={nodes.Lower_Wall_Main.material}
  position={[-2.55, 2.5, 0]}
/>
<mesh
  castShadow
  receiveShadow
  geometry={nodes.Bedwall_Section.geometry}
  material={nodes.Bedwall_Section.material}
  position={[-2.55, 3.8, -0.625]}
/>
<mesh
  castShadow
  receiveShadow
  geometry={nodes.Upper_Floor.geometry}
  material={nodes.Upper_Floor.material}
  position={[-1.25, 2.3, -0.625]}
  onClick={() => {
    setActiveImage(bedroom);
  }}
/>
<mesh
  castShadow
  receiveShadow
  geometry={nodes.Window_Frames.geometry}
  material={nodes.Window_Frames.material}
  position={[-0.125, 2.95, -0.067]}
/>
</group> */
}
